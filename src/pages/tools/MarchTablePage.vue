<template>
  <q-page class="q-pa-md column items-center">
    <div class="full-width" style="max-width:900px;">
      <div class="text-h5 text-center q-mb-md">Tabela marszu</div>
      <div class="q-mb-md">
        <q-input v-model="search" label="Wyszukaj teren (nazwa lub MGRS)" outlined dense @keyup.enter="searchArea" />
        <q-btn label="Pokaż teren" color="primary" class="q-my-sm" @click="searchArea" />
      </div>
      <div id="march-map" class="q-mb-md" style="height:400px;width:100%;border-radius:8px;overflow:hidden;"></div>
      <div class="q-mb-md">
        <q-btn label="Dodaj pinezkę" color="blue-7" @click="enablePinMode" :disable="pinMode" />
        <q-btn label="Usuń ostatnią pinezkę" color="red-4" class="q-ml-sm" @click="removeLastPin" :disable="pins.length === 0" />
        <!-- <q-btn label="Oblicz trasę" color="primary" class="q-ml-sm" @click="calculateRoute" :disable="pins.length < 2" /> -->
        <q-btn label="Wyczyść" color="negative" class="q-ml-sm" @click="clearAll" />
      </div>
      <q-table
        v-if="routeTable.length > 0"
        :rows="routeTable"
        :columns="columns"
        row-key="id"
        flat
        dense
        class="bg-white shadow-1"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as mgrs from 'mgrs'

const search = ref('')
const map = ref(null)
const pins = ref([])
const markers = ref([])
const polylines = ref([])
const pinMode = ref(false)
const routeTable = ref([])

const columns = [
  { name: 'lp', label: 'Lp.', field: 'lp', align: 'left' },
  { name: 'mgrs', label: 'MGRS', field: 'mgrs', align: 'left' },
  { name: 'azymut', label: 'Azymut', field: 'azymut', align: 'left' },
  { name: 'odleglosc', label: 'Odległość (m)', field: 'odleglosc', align: 'left' }
]

async function searchArea () {
  if (!search.value) return
  // Jeśli wpis wygląda na MGRS (np. 33UXP04)
  const mgrsPattern = /^[0-9]{1,2}[C-HJ-NP-X][A-HJ-NP-Z]{2}\d{2,10}$/i
  if (mgrsPattern.test(search.value.replace(/\s+/g, ''))) {
    try {
      const [lng, lat] = mgrs.toPoint(search.value.replace(/\s+/g, ''))
      if (map.value) map.value.setView([lat, lng], 15)
      return
    } catch (e) {
      // Możesz dodać powiadomienie o błędnym MGRS
      return
    }
  }
  // Wyszukiwanie po nazwie przez Nominatim
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search.value)}`
  try {
    const res = await fetch(url)
    const data = await res.json()
    if (data && data.length > 0) {
      const { lat, lon } = data[0]
      if (map.value) map.value.setView([parseFloat(lat), parseFloat(lon)], 13)
    } else {
      // Możesz dodać powiadomienie o braku wyników
    }
  } catch (e) {
    // Możesz dodać obsługę błędów
  }
}

function enablePinMode () {
  pinMode.value = true
}

function clearAll () {
  pins.value = []
  routeTable.value = []
  // Usuń markery
  markers.value.forEach(m => map.value && map.value.removeLayer(m))
  markers.value = []
  // Usuń linie
  polylines.value.forEach(l => map.value && map.value.removeLayer(l))
  polylines.value = []
}

function calculateRoute () {
  // Rysuj linie między pinezkami
  polylines.value.forEach(l => map.value && map.value.removeLayer(l))
  polylines.value = []
  if (pins.value.length > 1 && map.value) {
    for (let i = 1; i < pins.value.length; i++) {
      const prev = pins.value[i - 1]
      const curr = pins.value[i]
      const polyline = L.polyline([[prev.lat, prev.lng], [curr.lat, curr.lng]], { color: 'red', weight: 4 }).addTo(map.value)
      polylines.value.push(polyline)
    }
  }
  if (pins.value.length < 1) return
  const table = []
  // Punkt startowy
  const start = pins.value[0]
  table.push({ lp: 0, mgrs: mgrs.forward([start.lng, start.lat], 5), azymut: '-', odleglosc: '-' })
  for (let i = 1; i < pins.value.length; i++) {
    const prev = pins.value[i - 1]
    const curr = pins.value[i]
    const azymut = getAzimuth(prev, curr)
    const odleglosc = getDistance(prev, curr)
    table.push({ lp: i, mgrs: mgrs.forward([curr.lng, curr.lat], 5), azymut: azymut.toFixed(1), odleglosc: odleglosc.toFixed(1) })
  }
  routeTable.value = table
}

function getAzimuth (a, b) {
  const dLon = (b.lng - a.lng) * Math.PI / 180
  const lat1 = a.lat * Math.PI / 180
  const lat2 = b.lat * Math.PI / 180
  const y = Math.sin(dLon) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)
  let brng = Math.atan2(y, x) * 180 / Math.PI
  brng = (brng + 360) % 360
  return brng
}

function getDistance (a, b) {
  const R = 6371000
  const dLat = (b.lat - a.lat) * Math.PI / 180
  const dLon = (b.lng - a.lng) * Math.PI / 180
  const lat1 = a.lat * Math.PI / 180
  const lat2 = b.lat * Math.PI / 180
  const x = dLon * Math.cos((lat1 + lat2) / 2)
  const y = dLat
  return Math.sqrt(x * x + y * y) * R
}

onMounted(() => {
  map.value = L.map('march-map').setView([52.2297, 21.0122], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19
  }).addTo(map.value)
  map.value.on('click', (e) => {
    if (!pinMode.value) return
    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map.value)
    pins.value.push({ lat: e.latlng.lat, lng: e.latlng.lng })
    markers.value.push(marker)
    pinMode.value = false
    calculateRoute()
  })
})

function removeLastPin () {
  if (pins.value.length === 0) return
  pins.value.pop()
  // Usuń marker
  const marker = markers.value.pop()
  if (marker && map.value) map.value.removeLayer(marker)
  // Usuń linie i narysuj od nowa
  polylines.value.forEach(l => map.value && map.value.removeLayer(l))
  polylines.value = []
  calculateRoute()
}
</script>

<style scoped>
#march-map { min-height: 300px; min-width: 100%; }
.text-h5 {
  color: var(--military-primary, #2D3E2F);
}
</style>
