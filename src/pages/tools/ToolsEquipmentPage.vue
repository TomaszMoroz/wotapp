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
        <q-option-group
          v-model="snMode"
          :options="snModeOptions"
          type="toggle"
          color="white"
          text-color="white"
          inline
          class="q-mb-md"
        />
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
            label="Skanuj SN kamery"
          color="primary"
          icon="add"
          type="submit"
          :disable="!selectedType || !serialNumber"
          class="full-width"
        />
        </div>
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
          <q-select v-model="editType" :options="equipmentOptions" label="Sprzęt" outlined dense />
          <q-input v-model="editSN" label="Numer seryjny" outlined dense class="q-mt-md" />
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
          <video ref="video" autoplay playsinline width="100%" style="max-width:320px;" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Anuluj" color="grey" v-close-popup @click="stopCamera" />
          <q-btn flat label="Przechwyć" color="primary" @click="captureSN" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import BackNav from 'components/BackNav.vue'

const equipmentOptions = [
  'Grot', 'Bor', 'Tor', 'Vis', 'Rubin', 'Brom', 'Gryf', 'Maska p-gaz', 'FOO'
]

const snModeOptions = [
  { label: 'Wpisz SN', value: 'manual' }
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
async function captureSN () {
  const canvas = document.createElement('canvas')
  canvas.width = video.value.videoWidth
  canvas.height = video.value.videoHeight
  canvas.getContext('2d').drawImage(video.value, 0, 0)
  stopCamera()
  cameraDialog.value = false
  // Dynamiczne ładowanie Tesseract.js z CDN jeśli nie ma w window
  if (!window.Tesseract) {
    await new Promise(resolve => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.0.1/dist/tesseract.min.js'
      script.onload = resolve
      document.body.appendChild(script)
    })
  }
  const worker = await window.Tesseract.createWorker('eng')
  const { data: { text } } = await worker.recognize(canvas)
  await worker.terminate()
  serialNumber.value = text.replace(/\s/g, '')
}

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
