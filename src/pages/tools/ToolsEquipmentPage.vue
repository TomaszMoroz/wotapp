<template>
  <q-page class="equipment-bg q-pa-md">
    <BackNav />
    <div class="text-center q-mb-xl">
      <div class="hero-section q-pa-lg rounded-borders">
        <div class="text-h3 text-weight-bold text-primary q-mb-sm">Pobrany sprzęt</div>
        <div class="text-body1 text-grey-4">Dodaj i zarządzaj pobranym sprzętem</div>
      </div>
    </div>

    <div class="q-mb-xl" style="max-width: 420px; margin: 0 auto;">
      <q-form @submit.prevent="addEquipment">
        <q-select
          v-model="selectedType"
          :options="equipmentOptions"
          label="Wybierz sprzęt"
          outlined
          dense
          class="q-mb-md bg-grey-2 text-black"
          input-class="text-black"
          label-color="black"
          color="black"
        />
        <div class="q-mb-md row items-center q-gutter-x-md">
          <q-radio v-model="snMode" val="manual" label="Wpisz SN" color="white" class="text-white" label-color="white" />
          <q-radio v-model="snMode" val="scan" label="Skanuj SN" color="white" class="text-white" label-color="white" />
        </div>
        <q-input
          v-if="snMode === 'manual'"
          v-model="serialNumber"
          label="Numer seryjny"
          outlined
          dense
          class="q-mb-md bg-grey-2 text-black"
          input-class="text-black"
          label-color="black"
          color="black"
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
          v-if="selectedType && (serialNumber || cropPreviewUrl)"
          label="Dodaj sprzęt"
          color="primary"
          icon="add"
          type="submit"
          class="full-width"
        />
      </q-form>
    </div>

    <q-list bordered separator class="bg-grey-10 text-white q-mt-xl" style="max-width: 600px; margin: 50px auto">
      <q-item-label v-if="equipmentList.length > 0" header class="text-h6 flex items-center justify-center q-gutter-x-sm" style="color:#fff;">
        <span style="color:#fff;">{{ todayDate }}</span>
        <span style="color:#fff; font-size:0.95em;">({{ equipmentList.length }} el.)</span>
        <q-btn flat dense round icon="delete" color="red-4" size="sm" @click="showDeleteListDialog = true" />
      </q-item-label>

      <q-item v-for="(item, idx) in equipmentList" :key="item.id" class="q-my-md q-py-md">
        <q-item-section>
          <div class="text-h6">{{ item.type }}</div>
          <div class="text-h6">SN: {{ item.sn }}</div>
          <div v-if="item.snImage" class="q-mt-sm">
            <img :src="item.snImage" alt="Podgląd SN" style="width:100%; max-width:480px; max-height:120px; border:1.5px solid #21c521; background:#222; object-fit:contain; display:block;" />
          </div>
        </q-item-section>
        <q-item-section side>
          <q-btn flat icon="edit" color="blue-5" @click="editItem(idx)" />
          <q-btn flat icon="delete" color="red-5" @click="confirmRemoveItem(idx)" />
        </q-item-section>
      </q-item>
      <q-item v-if="equipmentList.length === 0">
        <q-item-section class="text-grey-6">Brak sprzętu na liście</q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="showDeleteListDialog">
        <q-card>
          <q-card-section class="row items-center">
            <q-icon name="warning" color="red-5" size="md" class="q-mr-md" />
            <div class="text-h6">Czy na pewno usunąć całą listę sprzętu?</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Anuluj" color="grey" v-close-popup />
            <q-btn flat label="Usuń listę" color="red-5" @click="deleteEquipmentList" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

        <!-- Potwierdzenie usuwania -->
    <q-dialog v-model="confirmDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="red-5" size="md" class="q-mr-md" />
          <div class="text-h6">Czy na pewno usunąć ten sprzęt?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Anuluj" color="grey" @click="cancelRemoveItem" />
          <q-btn flat label="Usuń" color="red-5" @click="doRemoveItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Edycja sprzętu dialog -->
    <q-dialog v-model="editDialog" persistent>
      <q-card style="min-width:320px">
        <q-card-section>
          <div class="text-h6">Edytuj sprzęt</div>
        </q-card-section>
        <q-card-section>
          <q-select v-model="editType" :options="equipmentOptions" label="Sprzęt" outlined dense class="bg-grey-2 text-black" input-class="text-black" label-color="black" color="black" />
          <q-input v-model="editSN" label="Numer seryjny" outlined dense class="q-mt-md bg-grey-2 text-black" input-class="text-black" label-color="black" color="black" borderless />
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
            <video ref="video" autoplay playsinline width="320" height="240" style="max-width:320px; display:block; background:#111;" />
            <div
              class="scan-rect"
              style="position:absolute; left:0; right:0; width:320px; height:80px; top:80px; border:2px solid #21c521; box-sizing:border-box; pointer-events:none; z-index:2;"
            ></div>
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
          <q-btn flat label="Przechwyć" color="primary" @click="captureSN" :disable="!video" />
          <q-btn flat label="Użyj numeru" color="positive" :disable="!ocrText" v-show="ocrText" @click="acceptOCRText" />
          <q-btn flat label="Użyj wycinka" color="secondary" :disable="!cropPreviewUrl" v-show="cropPreviewUrl && !ocrText" @click="acceptCropOnly" />

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
import { ref, onMounted, watch } from 'vue'
// Dialog kasowania całej listy
const showDeleteListDialog = ref(false)

function deleteEquipmentList () {
  equipmentList.value = []
  localStorage.removeItem(STORAGE_KEY)
}
// Dzisiejsza data jako tytuł listy
const todayDate = new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' })
// Prostokąt do wizualizacji obszaru skanowania (cała szerokość, 80px wysokości, wyśrodkowany)
// const scanRectHeight = 80
// const scanRectStyle = computed(() => {
//   const h = video.value?.videoHeight || 240
//   const top = (h - scanRectHeight) / 2
//   return {
//     top: top + 'px',
//     height: scanRectHeight + 'px',
//     width: '100%',
//     left: 0,
//     right: 0,
//     border: '2px solid #21c521',
//     position: 'absolute',
//     boxSizing: 'border-box',
//     pointerEvents: 'none',
//     zIndex: 2
//   }
// })
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

// Potwierdzenie usuwania
const confirmDialog = ref(false)
const removeIdx = ref(-1)

function confirmRemoveItem (idx) {
  removeIdx.value = idx
  confirmDialog.value = true
}
function doRemoveItem () {
  if (removeIdx.value >= 0) {
    equipmentList.value.splice(removeIdx.value, 1)
    saveEquipment()
  }
  confirmDialog.value = false
  removeIdx.value = -1
}
function cancelRemoveItem () {
  confirmDialog.value = false
  removeIdx.value = -1
}

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
    sn: serialNumber.value,
    snImage: cropPreviewUrl.value || null
  })
  saveEquipment()
  selectedType.value = null
  serialNumber.value = ''
  cropPreviewUrl.value = ''
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

function acceptCropOnly () {
  // Dodaj sprzęt z samym wycinkiem (bez SN)
  equipmentList.value.push({
    id: Date.now(),
    type: selectedType.value,
    sn: '',
    snImage: cropPreviewUrl.value || null
  })
  saveEquipment()
  selectedType.value = null
  serialNumber.value = ''
  cropPreviewUrl.value = ''
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
