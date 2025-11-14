<template>
  <q-page class="equipment-bg q-pa-md">
    <BackNav color="black" />
    <div class="text-center q-mb-xl">
      <div class="hero-section q-pa-lg rounded-borders">
        <div class="text-h3 text-weight-bold text-primary q-mb-sm">Pobrany sprzęt</div>
        <div class="text-body1 text-grey-4">Dodaj i zarządzaj pobranym sprzętem</div>
      </div>
    </div>

    <div class="q-mb-lg" style="max-width: 420px; margin: 0 auto;">
      <q-form @submit.prevent="addEquipment">
        <q-select
          v-model="selectedType"
          :options="equipmentOptions"
          label="Wybierz sprzęt"
          outlined
          dense
          class="q-mb-md text-white bg-transparent border-white"
          input-class="text-white"
          label-color="white"
          color="white"
          borderless
        />
        <div class="q-mb-md row items-center q-gutter-x-md">
          <q-radio v-model="snMode" val="manual" label="Wpisz SN" color="white" />
          <q-radio v-model="snMode" val="scan" label="Skanuj SN" color="white" />
        </div>
        <q-input
          v-if="snMode === 'manual'"
          v-model="serialNumber"
          label="Numer seryjny"
          outlined
          dense
          class="q-mb-md text-white bg-transparent border-white"
          input-class="text-white"
          label-color="white"
          color="white"
          borderless
          :disable="!selectedType"
        />
        <div v-else class="q-mb-md">
          <q-btn
            label="Skanuj SN kamerą"
            color="primary"
            icon="photo_camera"
            :disable="!selectedType"
            @click="selectedType ? cameraDialog = true : null"
          />
          <div v-if="serialNumber" class="q-mt-sm text-grey-4">SN: {{ serialNumber }}</div>
        </div>
        <q-btn
          label="Dodaj sprzęt"
          color="primary"
          icon="add"
          type="submit"
          :disable="!selectedType || !serialNumber"
          class="full-width"
        />
      </q-form>
    </div>

    <q-list bordered separator class="bg-grey-10 text-white" style="max-width: 520px; margin: 0 auto;">
      <q-item-label header class="text-grey-4">Lista pobranego sprzętu</q-item-label>
      <q-item v-for="(item, idx) in equipmentList" :key="item.id">
        <q-item-section>
          <div class="text-weight-bold">{{ item.type }}</div>
          <div class="text-caption">SN: {{ item.sn }}</div>
        </q-item-section>
        <q-item-section side>
          <q-btn flat icon="edit" color="primary" @click="editItem(idx)" />
          <q-btn flat icon="delete" color="negative" @click="removeItem(idx)" />
        </q-item-section>
      </q-item>
      <q-item v-if="equipmentList.length === 0">
        <q-item-section class="text-grey-6">Brak sprzętu na liście</q-item-section>
      </q-item>
    </q-list>

    <!-- Edycja sprzętu dialog -->
    <q-dialog v-model="editDialog">
      <q-card style="min-width:320px">
        <q-card-section>
          <div class="text-h6">Edytuj sprzęt</div>
        </q-card-section>
        <q-card-section>
          <q-select v-model="editType" :options="equipmentOptions" label="Sprzęt" outlined dense class="text-white bg-transparent border-white" input-class="text-white" label-color="white" color="white" borderless />
          <q-input v-model="editSN" label="Numer seryjny" outlined dense class="q-mt-md text-white bg-transparent border-white" input-class="text-white" label-color="white" color="white" borderless />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Anuluj" color="grey" v-close-popup />
          <q-btn flat label="Zapisz" color="primary" @click="saveEdit" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Kamera do skanowania SN -->
    <q-dialog v-model="cameraDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Skanuj numer seryjny</div>
        </q-card-section>
        <q-card-section>
          <div style="position: relative; display: flex; justify-content: center;">
            <video ref="video" autoplay playsinline width="100%" style="max-width:320px; display:block;" />
            <div
              class="scan-rect"
              v-bind:style="scanRectStyle"
            ></div>
          </div>
          <div class="q-mt-md text-caption text-grey-7">
            Ustaw numer w zielonym prostokącie i kliknij „Przechwyć”.<br>
            <b>Dbaj o ostrość i dobre oświetlenie.</b> Unikaj cieni i odblasków.<br>
            Numer powinien być na jasnym, jednolitym tle.<br>
            System automatycznie poprawia kontrast i jasność przed rozpoznaniem.<br>
            Jeśli rozpoznanie się nie uda, spróbuj ponownie lub wpisz numer ręcznie.
          </div>

          <div v-if="cropPreviewUrl" class="q-mt-md flex flex-center column items-center">
            <div class="text-caption text-grey-6">Podgląd wycinka do OCR:</div>
            <img :src="cropPreviewUrl" alt="Podgląd wycinka" style="border:1px solid #21c521; max-width:320px; max-height:80px; margin-top:4px; background:#222;" />
          </div>

          <div v-if="ocrText" class="q-mt-md flex flex-center column items-center">
            <div class="text-caption text-grey-4">Rozpoznany tekst (na żywo):</div>
            <div class="text-body2 text-white bg-grey-8 q-pa-sm rounded-borders q-mt-xs">{{ ocrText }}</div>
          </div>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Anuluj" color="grey" v-close-popup @click="stopCamera" />
          <q-btn flat label="Przechwyć" color="primary" @click="captureSN" />
          <q-btn flat label="Zaakceptuj" color="green" v-if="ocrText" @click="acceptOCRText" />
        </q-card-actions>
      </q-card>
    </q-dialog>
          <!-- <q-card-section v-if="ocrText" class="q-mt-md">
            <div class="text-caption text-grey-4">Rozpoznany tekst:</div>
            <div class="text-body2 text-white bg-grey-8 q-pa-sm rounded-borders q-mt-xs">{{ ocrText }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Anuluj" color="grey" v-close-popup @click="stopCamera" />
            <q-btn flat label="Przechwyć" color="primary" @click="captureSN" />
            <q-btn flat label="Użyj numeru" color="positive" :disable="!ocrText" @click="acceptOCRText" />
          </q-card-actions> -->
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
// Prostokąt do wizualizacji obszaru skanowania (cała szerokość, 80px wysokości, wyśrodkowany)
const scanRectHeight = 80
const scanRectStyle = computed(() => {
  const h = video.value?.videoHeight || 240
  const top = (h - scanRectHeight) / 2
  return {
    top: top + 'px',
    height: scanRectHeight + 'px',
    width: '100%',
    left: 0,
    right: 0,
    border: '2px solid #21c521',
    position: 'absolute',
    boxSizing: 'border-box',
    pointerEvents: 'none',
    zIndex: 2
  }
})
import BackNav from 'components/BackNav.vue'

const equipmentOptions = [
  'Grot', 'Bor', 'Tor', 'Vis', 'Rubin', 'Brom', 'Gryf', 'Maska p-gaz', 'FOO'
]

const selectedType = ref(null)
const serialNumber = ref('')
const snMode = ref('manual')
const equipmentList = ref([])

// Edycja
const editDialog = ref(false)
const editIdx = ref(-1)
const editType = ref('')
const editSN = ref('')

// Kamera
const cameraDialog = ref(false)
const video = ref(null)
let stream = null
const ocrText = ref('')
const cropPreviewUrl = ref('')

// LocalStorage obsługa
const STORAGE_KEY = 'equipmentList-v1'

function loadEquipment () {
  const data = localStorage.getItem(STORAGE_KEY)
  equipmentList.value = data ? JSON.parse(data) : []
}
function saveEquipment () {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(equipmentList.value))
}

function addEquipment () {
  equipmentList.value.push({
    id: Date.now(),
    type: selectedType.value,
    sn: serialNumber.value
  })
  saveEquipment()
  selectedType.value = null
  serialNumber.value = ''
}

function removeItem (idx) {
  equipmentList.value.splice(idx, 1)
  saveEquipment()
}

function editItem (idx) {
  editIdx.value = idx
  editType.value = equipmentList.value[idx].type
  editSN.value = equipmentList.value[idx].sn
  editDialog.value = true
}
function saveEdit () {
  if (editIdx.value >= 0) {
    equipmentList.value[editIdx.value].type = editType.value
    equipmentList.value[editIdx.value].sn = editSN.value
    saveEquipment()
    editDialog.value = false
  }
}

// Kamera i skanowanie SN
function stopCamera () {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
}

async function startCamera () {
  stopCamera()
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    if (video.value) {
      video.value.srcObject = stream
      await video.value.play()
    }
  } catch (e) {
    stopCamera()
  }
}

async function captureSN () {
  // Parametry wycinka (środek kadru, szerokość 320, wysokość 80)
  const cropWidth = 320
  const cropHeight = 80
  const cropX = Math.max(0, (video.value.videoWidth - cropWidth) / 2)
  const cropY = Math.max(0, (video.value.videoHeight - cropHeight) / 2)
  const canvas = document.createElement('canvas')
  canvas.width = cropWidth
  canvas.height = cropHeight
  const ctx = canvas.getContext('2d')
  // Wytnij tylko obszar zielonego prostokąta
  ctx.drawImage(
    video.value,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  )
  // Podgląd wycinka do OCR
  cropPreviewUrl.value = canvas.toDataURL('image/png')
  // Popraw kontrast, jasność i konwertuj do szarości
  try {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    const contrast = 1.6 // >1 = większy kontrast
    const brightness = 32 // 0 = bez zmian
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      // Szarość
      let gray = 0.299 * r + 0.587 * g + 0.114 * b
      // Kontrast
      gray = (gray - 128) * contrast + 128
      // Jasność
      gray = gray + brightness
      gray = Math.max(0, Math.min(255, gray))
      data[i] = data[i + 1] = data[i + 2] = gray
    }
    ctx.putImageData(imageData, 0, 0)
  } catch (e) {
    // Jeśli przetwarzanie się nie powiedzie, kontynuuj bez niego
  }
  // Dynamiczne ładowanie Tesseract.js z CDN jeśli nie ma w window
  if (!window.Tesseract) {
    await new Promise(resolve => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.0.1/dist/tesseract.min.js'
      script.onload = resolve
      document.body.appendChild(script)
    })
  }
  const worker = await window.Tesseract.createWorker('eng', {
    logger: m => console.log(m)
  })
  await worker.setParameters({
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/', // typowe znaki SN
    tessedit_pageseg_mode: '7', // pojedyncza linia
    preserve_interword_spaces: '1'
  })
  const { data: { text } } = await worker.recognize(canvas, 'eng', {
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/',
    tessedit_pageseg_mode: '7',
    preserve_interword_spaces: '1'
  })
  await worker.terminate()
  ocrText.value = text.trim()
}

function acceptOCRText () {
  serialNumber.value = ocrText.value.replace(/\s/g, '')
  cameraDialog.value = false
  stopCamera()
  ocrText.value = ''
}

watch(cameraDialog, (val) => {
  if (val) {
    startCamera()
    ocrText.value = ''
    cropPreviewUrl.value = ''
  } else {
    stopCamera()
    ocrText.value = ''
    cropPreviewUrl.value = ''
  }
})

onMounted(() => {
  loadEquipment()
})
watch(equipmentList, saveEquipment, { deep: true })
</script>

<style scoped>
.equipment-bg {
  background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
  min-height: 100vh;
}
.hero-section {
  background: #232b23;
  border: 1px solid #384c38;
  color: #f5f7fa;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 16px rgba(44,62,47,0.13);
}
.hero-section .text-h3,
.hero-section .text-h4,
.hero-section .text-h5,
.hero-section .text-h6 {
  color: #f5f7fa !important;
}

.q-select, .q-input {
  --q-primary: #fff;
  --q-field-label: #fff;
  --q-field-border: #fff;
  color: #fff;
}
.q-select .q-field__control, .q-input .q-field__control {
  border-color: #fff !important;
  color: #fff !important;
}
.q-select .q-field__native, .q-input .q-field__native,
.q-select .q-field__input, .q-input .q-field__input {
  color: #fff !important;
}
.q-select .q-field__label, .q-input .q-field__label {
  color: #fff !important;
}
.q-select .q-field__marginal, .q-input .q-field__marginal {
  color: #fff !important;
}
</style>
