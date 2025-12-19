<template>
  <q-page class="q-pa-md">
    <BackNav color="black" parentPath="/tools" />
    <div class="text-h4 q-mt-md q-mb-md">LifeReco – Rozpoznawanie sprzętu rosyjskiej armii (AI)</div>
    <div class="q-mb-md">Włącz kamerę i skieruj ją na pojazd lub sprzęt wojskowy. Model AI wykryje rosyjski sprzęt na obrazie.</div>
    <div class="q-mb-md">
      <q-btn color="primary" label="Włącz kamerę" @click="startCamera" :disable="cameraActive" />
      <q-btn color="negative" label="Wyłącz kamerę" @click="stopCamera" v-if="cameraActive" class="q-ml-sm" />
    </div>
    <div v-if="error" class="text-negative q-mb-md">{{ error }}</div>
    <div v-if="cameraActive" style="position:relative;max-width:480px;">
      <video ref="video" autoplay playsinline style="width:100%;border-radius:8px;" />
      <canvas ref="canvas" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;" />
    </div>
    <div v-if="loading" class="q-mt-md">Wykrywanie...</div>
    <div v-if="detections.length" class="q-mt-md">
      <div class="text-h6">Wyniki detekcji:</div>
      <ul>
        <li v-for="(det, i) in detections" :key="i">
          {{ getLabel(det.class) }} (pewność: {{ (det.score * 100).toFixed(1) }}%)
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onUnmounted, nextTick } from 'vue'
import BackNav from 'components/BackNav.vue'
import * as tf from '@tensorflow/tfjs'

// Przykładowe etykiety klas (uzupełnij zgodnie z modelem)
const CLASS_LABELS = [
  'T-72', 'T-80', 'T-90', 'BMP-2', 'BMP-3', 'BTR-80', 'BTR-82', '2S19', 'Ural', 'Kamaz', 'GAZ', 'MT-LB', 'Tigr', 'Iskander', 'Pantsir', 'BMD-4'
]

const video = ref(null)
const canvas = ref(null)
const cameraActive = ref(false)
const loading = ref(false)
const error = ref('')
const detections = ref([])
let model = null
let stream = null
let intervalId = null

function getLabel (classId) {
  return CLASS_LABELS[classId] || `ID: ${classId}`
}

async function loadModel () {
  if (!model) {
    loading.value = true
    try {
      model = await tf.loadGraphModel('/model_tfjs/model.json')
    } catch (e) {
      error.value = 'Nie udało się załadować modelu.'
    }
    loading.value = false
  }
}

async function startCamera () {
  error.value = ''
  if (cameraActive.value) return
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    video.value.srcObject = stream
    cameraActive.value = true
    await loadModel()
    await nextTick()
    startDetection()
  } catch (e) {
    error.value = 'Brak dostępu do kamery.'
  }
}

function stopCamera () {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
  cameraActive.value = false
  detections.value = []
  loading.value = false
  if (intervalId) clearInterval(intervalId)
}

onUnmounted(stopCamera)

function startDetection () {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(runDetection, 1200)
}

async function runDetection () {
  if (!model || !video.value || video.value.readyState !== 4) return
  loading.value = true
  error.value = ''
  const videoEl = video.value
  const inputTensor = tf.browser.fromPixels(videoEl).toFloat()
  const resized = tf.image.resizeBilinear(inputTensor, [640, 640]).div(255.0).expandDims(0)
  let output
  try {
    output = await model.executeAsync(resized)
  } catch (e) {
    error.value = 'Błąd podczas inferencji: ' + e
    loading.value = false
    return
  }
  const data = Array.isArray(output) ? output[0].arraySync() : output.arraySync()
  if (Array.isArray(output)) output.forEach(t => t.dispose())
  else output.dispose()
  const boxes = []
  for (const det of data[0]) {
    const [x, y, w, h, score, ...classScores] = det
    const classId = classScores.indexOf(Math.max(...classScores))
    const classScore = classScores[classId]
    if (score > 0.3 && classScore > 0.3) {
      boxes.push({
        x: x - w / 2,
        y: y - h / 2,
        width: w,
        height: h,
        score: score * classScore,
        class: classId
      })
    }
  }
  detections.value = boxes
  drawDetections()
  loading.value = false
}

function drawDetections () {
  if (!canvas.value || !video.value) return
  const ctx = canvas.value.getContext('2d')
  const videoEl = video.value
  canvas.value.width = videoEl.videoWidth
  canvas.value.height = videoEl.videoHeight
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.strokeStyle = '#ff0000'
  ctx.lineWidth = 2
  ctx.font = '18px Arial'
  ctx.fillStyle = '#ff0000'
  detections.value.forEach(det => {
    ctx.strokeRect(det.x * videoEl.videoWidth / 640, det.y * videoEl.videoHeight / 640, det.width * videoEl.videoWidth / 640, det.height * videoEl.videoHeight / 640)
    ctx.fillText(getLabel(det.class), det.x * videoEl.videoWidth / 640, det.y * videoEl.videoHeight / 640 - 4)
  })
}
</script>

<style scoped>
video, canvas {
  max-width: 100%;
  height: auto;
}
</style>
