<template>
  <q-page class="q-pa-md" style="background:#000;min-height:100vh;">
    <div class="q-gutter-md">
      <q-card class="q-pa-lg">
        <div class="text-h5 q-mb-md">Detektor ruchu (Motion Detector)</div>
        <div class="q-mb-md">
          <q-btn :label="usingCamera ? 'Przełącz na wideo' : 'Przełącz na kamerę'" @click="toggleSource" color="primary" class="q-mr-md" />
          <q-btn :label="freezeFrame ? 'Opóźniona klatka' : 'Zamroź klatkę'" @click="toggleFreezeFrame" color="secondary" class="q-mr-md" />
        </div>
        <div v-if="!usingCamera" class="q-mb-md">
          <input type="file" accept="video/*" @change="onVideoUpload" />
          <div v-if="videoLoaded" class="q-mt-sm">
            <q-btn label="Restartuj wideo" @click="restartVideo" color="primary" class="q-mr-sm" />
            <q-btn label="Zatrzymaj wideo" @click="stopVideo" color="negative" />
          </div>
        </div>
        <div class="q-mb-md">
          <q-slider v-model="resolution" :min="320" :max="1920" :step="100" label="Rozdzielczość" :label-always="true" />
          <div class="text-caption">Aktualna rozdzielczość: {{ resolution }} px</div>
        </div>
        <div class="q-mb-md" v-show="!freezeFrame">
          <q-input v-model.number="delay" type="number" label="Opóźnienie między klatkami (ms)" :min="50" :step="50" style="max-width:200px" />
        </div>
        <div class="q-mb-md motion-preview-container" :class="{ fullscreen: isFullscreen }">
          <video ref="video" autoplay playsinline muted style="display:none"></video>
          <canvas ref="canvas" style="display:none"></canvas>
          <img :src="snapshot" alt="Podgląd" class="motion-preview-img" :style="imgStyle" />
          <q-btn v-if="!isFullscreen" icon="fullscreen" color="primary" class="fullscreen-btn" @click.stop="enterFullscreen" round flat size="lg" />
          <q-btn v-if="isFullscreen" icon="fullscreen_exit" color="negative" class="exit-fullscreen-btn" @click.stop="exitFullscreen" round flat size="lg" />
          <div v-if="isFullscreen" class="zoom-controls">
            <q-btn icon="zoom_in" @click.stop="zoomIn" round flat color="white" size="md" style="margin:4px;" />
            <q-btn icon="zoom_out" @click.stop="zoomOut" round flat color="white" size="md" style="margin:4px;" />
          </div>
        </div>
        <q-banner v-if="cameraError" class="bg-red-2 text-red-10 q-mt-md">Dostęp do kamery został zablokowany przez przeglądarkę.</q-banner>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
const isFullscreen = ref(false)
const zoom = ref(1)
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
function zoomIn () {
  zoom.value = Math.min(zoom.value + 0.2, 3)
}
function zoomOut () {
  zoom.value = Math.max(zoom.value - 0.2, 1)
}
onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
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

function invertColors (imageData) {
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]
    data[i + 1] = 255 - data[i + 1]
    data[i + 2] = 255 - data[i + 2]
  }
  return imageData
}

function cancelOutColors (prev, curr) {
  const blended = new ImageData(prev.width, prev.height)
  for (let i = 0; i < prev.data.length; i += 4) {
    blended.data[i] = (prev.data[i] + curr.data[i]) / 2
    blended.data[i + 1] = (prev.data[i + 1] + curr.data[i + 1]) / 2
    blended.data[i + 2] = (prev.data[i + 2] + curr.data[i + 2]) / 2
    blended.data[i + 3] = 255
  }
  return blended
}

function captureFrame () {
  if (!video.value || !canvas.value || !video.value.videoWidth || !video.value.videoHeight) return
  const aspect = video.value.videoWidth / video.value.videoHeight
  const width = resolution.value
  const height = width / aspect
  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return
  ctx.drawImage(video.value, 0, 0, video.value.videoWidth, video.value.videoHeight)
  const currentImage = ctx.getImageData(0, 0, video.value.videoWidth, video.value.videoHeight)
  if (previousImage) {
    const inverted = invertColors(ctx.getImageData(0, 0, video.value.videoWidth, video.value.videoHeight))
    const blended = cancelOutColors(previousImage, inverted)
    ctx.putImageData(blended, 0, 0)
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

function toggleSource () {
  usingCamera.value = !usingCamera.value
  if (usingCamera.value) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (video.value) {
          video.value.srcObject = stream
          video.value.play()
          cameraError.value = false
          videoLoaded.value = false
        }
      })
      .catch(() => {
        cameraError.value = true
        usingCamera.value = false
      })
  } else {
    if (video.value) {
      video.value.srcObject = null
      video.value.pause()
      videoLoaded.value = false
    }
    cameraError.value = false
  }
}

function onVideoUpload (e) {
  const input = e.target
  const file = input.files && input.files[0]
  if (file && video.value) {
    const url = URL.createObjectURL(file)
    video.value.src = url
    video.value.play()
    videoLoaded.value = true
    startCapturing()
  }
}

function restartVideo () {
  if (video.value && video.value.src) {
    video.value.currentTime = 0
    video.value.play()
  }
}

function stopVideo () {
  if (video.value && video.value.src) {
    video.value.pause()
  }
}

onMounted(() => {
  startCapturing()
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
