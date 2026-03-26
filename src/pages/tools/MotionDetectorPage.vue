<template>
  <q-page class="q-pa-md" style="background:#000;min-height:100vh;">
    <div class="q-gutter-md">
      <q-card class="q-pa-lg">
        <div class="text-h5 q-mb-md">Detektor ruchu (Motion Detector)</div>
        <div class="q-mb-md">
          <q-btn :label="usingCamera ? 'Wyłącz kamerę' : 'Włącz kamerę'" @click="toggleSource" color="primary" class="q-mr-md" />
          <q-btn :label="freezeFrame ? 'Opóźniona klatka' : 'Zamroź klatkę'" @click="toggleFreezeFrame" color="secondary" class="q-mr-md" />
          <q-select
  v-if="usingCamera && cameraListReady"
  v-model="selectedDeviceId"
  :options="availableCameras.map(cam => ({ label: cam.label || 'Kamera ' + cam.deviceId.slice(-4), value: cam.deviceId }))"
  label="Wybierz kamerę"
  dense
  style="max-width:220px;display:inline-block;vertical-align:middle;margin-left:8px;"
  @update:model-value="switchCameraByDevice"
/>
        </div>
        <div class="q-mb-md">
          <q-slider v-model="resolution" :min="320" :max="1920" :step="100" :label-always="true">
            <template v-slot:label>Rozdzielczość</template>
          </q-slider>
          <div class="text-caption">Aktualna rozdzielczość: {{ resolution }} px</div>
        </div>
        <div class="q-mb-md" v-show="!freezeFrame">
          <q-input v-model.number="delay" type="number" label="Opóźnienie między klatkami (ms)" :min="50" :step="50" style="max-width:200px" />
        </div>
        <div class="q-mb-md motion-preview-container" :class="{ fullscreen: isFullscreen }">
          <video ref="video" autoplay playsinline muted style="display:none"></video>
          <canvas ref="canvas" style="display:none"></canvas>
          <img :src="snapshot" alt="Podgląd" class="motion-preview-img" :style="imgStyle" />
          <q-btn v-if="!isFullscreen && !isIOS" icon="fullscreen" color="primary" class="fullscreen-btn" @click.stop="enterFullscreen" round flat size="lg" />
          <q-btn v-if="isFullscreen && !isIOS" icon="fullscreen_exit" color="negative" class="exit-fullscreen-btn" @click.stop="exitFullscreen" round flat size="lg" />
          <div v-if="isFullscreen" class="zoom-controls">
            <q-btn icon="zoom_in" @click.stop="zoomIn" round flat color="white" size="md" style="margin:4px;" />
            <q-btn icon="zoom_out" @click.stop="zoomOut" round flat color="white" size="md" style="margin:4px;" />
          </div>
        </div>
        <q-banner v-if="cameraError" class="bg-red-2 text-red-10 q-mt-md">
          Dostęp do kamery został zablokowany przez przeglądarkę.
          <span v-if="typeof cameraError === 'string'" style="font-size:0.9em;"> ({{ cameraError }})</span>
        </q-banner>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'

const availableCameras = ref([])
const selectedDeviceId = ref(null)
const cameraListReady = ref(false)
const isFullscreen = ref(false)
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
const zoom = ref(1)
const maxZoom = ref(1)
const minZoom = ref(1)
const supportsCameraZoom = ref(false)
let videoTrack = null
function isMobileDevice () {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
const selectedFacingMode = ref(isMobileDevice() ? 'environment' : 'user')
// const cameraOptions = [
//   { label: 'Tylna', value: 'environment' },
//   { label: 'Przednia', value: 'user' }
// ]
const imgStyle = computed(() => ({
  background: '#000',
  width: `${zoom.value * 100}%`,
  maxWidth: '100vw',
  transition: 'width 0.2s',
  borderRadius: '10px',
  border: '1px solid #222',
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  margin: '20px 0 40px 0',
  display: 'block'
}))

async function updateCameraList () {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    availableCameras.value = devices.filter(d => d.kind === 'videoinput')
    cameraListReady.value = availableCameras.value.length > 1
  } catch (e) {
    availableCameras.value = []
    cameraListReady.value = false
  }
}
function enterFullscreen () {
  const el = document.querySelector('.motion-preview-container')
  if (el.requestFullscreen) {
    el.requestFullscreen()
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen()
  }
}
function exitFullscreen () {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}
function handleFullscreenChange () {
  isFullscreen.value = !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement
  )
}
async function zoomIn () {
  if (supportsCameraZoom.value && videoTrack) {
    const newZoom = Math.min(zoom.value + 0.2, maxZoom.value)
    await videoTrack.applyConstraints({ advanced: [{ zoom: newZoom }] })
    zoom.value = newZoom
  } else {
    zoom.value = Math.min(zoom.value + 0.2, 3)
  }
}
async function zoomOut () {
  if (supportsCameraZoom.value && videoTrack) {
    const newZoom = Math.max(zoom.value - 0.2, minZoom.value)
    await videoTrack.applyConstraints({ advanced: [{ zoom: newZoom }] })
    zoom.value = newZoom
  } else {
    zoom.value = Math.max(zoom.value - 0.2, 1)
  }
}
onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  // Na iOS domyślnie tryb fullscreen (bez API)
  if (isIOS) {
    isFullscreen.value = true
  }
  // Automatyczne żądanie kamery przy wejściu na stronę
  if (!usingCamera.value) {
    usingCamera.value = true
    startCamera(selectedFacingMode.value)
  }
})
onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
})

const resolution = ref(520)
const delay = ref(50)
const freezeFrame = ref(false)
const usingCamera = ref(false)
const cameraError = ref(false)
const snapshot = ref('')
const videoLoaded = ref(false)
let captureInterval = null
let previousImage = null
const video = ref(null)
const canvas = ref(null)

// function invertColors (imageData) {
//   const data = imageData.data
//   for (let i = 0; i < data.length; i += 4) {
//     data[i] = 255 - data[i]
//     data[i + 1] = 255 - data[i + 1]
//     data[i + 2] = 255 - data[i + 2]
//   }
//   return imageData
// }

// function cancelOutColors (prev, curr) {
//   const blended = new ImageData(prev.width, prev.height)
//   for (let i = 0; i < prev.data.length; i += 4) {
//     blended.data[i] = (prev.data[i] + curr.data[i]) / 2
//     blended.data[i + 1] = (prev.data[i + 1] + curr.data[i + 1]) / 2
//     blended.data[i + 2] = (prev.data[i + 2] + curr.data[i + 2]) / 2
//     blended.data[i + 3] = 255
//   }
//   return blended
// }

function captureFrame () {
  if (!video.value || !canvas.value || !video.value.videoWidth || !video.value.videoHeight) return
  const aspect = video.value.videoWidth / video.value.videoHeight
  const width = resolution.value
  const height = width / aspect
  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return
  // Wymuś czarne tło przed rysowaniem
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.drawImage(video.value, 0, 0, video.value.videoWidth, video.value.videoHeight)
  const currentImage = ctx.getImageData(0, 0, video.value.videoWidth, video.value.videoHeight)
  if (previousImage) {
    // Detekcja ruchu: różnica absolutna, kontury na szaro (#888), reszta czarna
    const curr = ctx.getImageData(0, 0, video.value.videoWidth, video.value.videoHeight)
    const diff = ctx.createImageData(curr.width, curr.height)
    for (let i = 0; i < curr.data.length; i += 4) {
      const d = Math.abs(curr.data[i] - previousImage.data[i]) +
                Math.abs(curr.data[i + 1] - previousImage.data[i + 1]) +
                Math.abs(curr.data[i + 2] - previousImage.data[i + 2])
      if (d > 40) { // próg czułości
        diff.data[i] = 68 // #444
        diff.data[i + 1] = 68
        diff.data[i + 2] = 68
        diff.data[i + 3] = 255
      } else {
        diff.data[i] = 0
        diff.data[i + 1] = 0
        diff.data[i + 2] = 0
        diff.data[i + 3] = 255
      }
    }
    ctx.putImageData(diff, 0, 0)
  }
  if (!freezeFrame.value) {
    previousImage = currentImage
  }
  // Scale and display
  const offscreen = document.createElement('canvas')
  offscreen.width = width
  offscreen.height = height
  const offCtx = offscreen.getContext('2d')
  if (!offCtx) return
  offCtx.drawImage(canvas.value, 0, 0, width, height)
  snapshot.value = offscreen.toDataURL('image/png')
}

function startCapturing () {
  if (captureInterval) clearInterval(captureInterval)
  captureInterval = window.setInterval(captureFrame, delay.value)
}

function stopCapturing () {
  if (captureInterval) clearInterval(captureInterval)
  captureInterval = null
}

function toggleFreezeFrame () {
  freezeFrame.value = !freezeFrame.value
}

async function toggleSource () {
  usingCamera.value = !usingCamera.value
  if (usingCamera.value) {
    await startCamera(selectedFacingMode.value)
  } else {
    stopCamera()
  }
}

// async function switchCamera () {
//   if (usingCamera.value) {
//     await startCamera(selectedFacingMode.value)
//   }
// }

async function startCamera (facingMode) {
  stopCamera()
  try {
    let constraints
    if (selectedDeviceId.value) {
      constraints = { video: { deviceId: { exact: selectedDeviceId.value } } }
    } else {
      constraints = { video: { facingMode: { exact: facingMode } } }
    }
    let stream
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints)
    } catch (e1) {
      // fallback na drugą kamerę jeśli wybrana nie jest dostępna
      if (!selectedDeviceId.value) {
        try {
          const fallback = facingMode === 'environment' ? 'user' : 'environment'
          selectedFacingMode.value = fallback
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: fallback } } })
        } catch (e2) {
          // Ostateczny fallback: { video: true }
          try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true })
          } catch (e3) {
            cameraError.value = e3 && e3.name ? e3.name : true
            usingCamera.value = false
            return
          }
        }
      } else {
        // deviceId wybrany, nie próbuj fallbacków
        cameraError.value = e1 && e1.name ? e1.name : true
        usingCamera.value = false
        return
      }
    }
    if (video.value) {
      video.value.srcObject = stream
      video.value.play()
      cameraError.value = false
      videoLoaded.value = false
      videoTrack = stream.getVideoTracks()[0]
      const capabilities = videoTrack.getCapabilities ? videoTrack.getCapabilities() : {}
      if (capabilities.zoom) {
        supportsCameraZoom.value = true
        minZoom.value = capabilities.zoom.min
        maxZoom.value = capabilities.zoom.max
        zoom.value = videoTrack.getSettings().zoom || capabilities.zoom.min
      } else {
        supportsCameraZoom.value = false
        minZoom.value = 1
        maxZoom.value = 3
        zoom.value = 1
      }
    }
    if (!cameraListReady.value) {
      await updateCameraList()
    }
  } catch (e) {
    cameraError.value = e && e.name ? e.name : true
    usingCamera.value = false
  }
}

async function switchCameraByDevice () {
  if (usingCamera.value && selectedDeviceId.value) {
    await startCamera(selectedFacingMode.value)
  }
}
function stopCamera () {
  if (video.value) {
    if (video.value.srcObject) {
      const tracks = video.value.srcObject.getTracks()
      tracks.forEach(track => track.stop())
    }
    video.value.srcObject = null
    video.value.pause()
    videoLoaded.value = false
  }
  cameraError.value = false
  supportsCameraZoom.value = false
  minZoom.value = 1
  maxZoom.value = 3
  zoom.value = 1
  videoTrack = null
}

onMounted(() => {
  startCapturing()
  // Automatyczne żądanie kamery przy wejściu na stronę
  if (!usingCamera.value) {
    usingCamera.value = true
    startCamera(selectedFacingMode.value)
  }
})

onBeforeUnmount(() => {
  stopCapturing()
  if (video.value && video.value.srcObject && typeof video.value.srcObject.getTracks === 'function') {
    const tracks = video.value.srcObject.getTracks()
    tracks.forEach(track => track.stop())
  }
})

watch([delay, resolution], () => {
  startCapturing()
})
</script>

<style scoped>
.q-card {
  max-width: 600px;
  margin: 0 auto;
}
.motion-preview-container {
  position: relative;
  background: #000 !important;
  border-radius: 10px;
  overflow: hidden;
}
.motion-preview-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  background: #000 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.motion-preview-img {
  background: #000 !important;
}
.fullscreen-btn, .exit-fullscreen-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2010;
}
.zoom-controls {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 2010;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
