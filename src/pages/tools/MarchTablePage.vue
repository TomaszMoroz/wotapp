<template>
  <q-page class="q-pa-md flex row">
    <div class="march-main-container q-mx-auto" style="width:100%;max-width:1500px;">
      <BackNav color="black" parentPath="/tools" />
      <div class="text-h5 text-center q-mb-md">Tabela marszu</div>
      <div class="row items-start justify-center">
        <div class="col-7 flex column q-mr-xs" :class="isMobile ? 'col-12' : ''">
          <div class="q-mb-md">
            <q-input v-model="search" label="Wyszukaj teren (nazwa lub MGRS)" outlined dense @keyup.enter="searchArea" />
            <q-btn label="Pokaż teren" color="primary" class="q-my-sm" @click="searchArea" />
          </div>
          <div id="march-map" :style="isMobile ? 'height: 400px' : 'height: 600px' " style="width:100%;border-radius:8px;overflow:hidden;" class="q-mb-md"></div>
          <div class="q-mb-md row wrap items-center justify-center justify-between q-gutter-sm">
            <q-btn label="Dodaj punkt" color="green-7" @click="enablePinMode" :disable="pinMode" />
            <q-btn label="Usuń ostatni" color="red-9" @click="removeLastPin" :disable="pins.length === 0" />
            <q-btn icon="file_download" color="primary" label="GPX" @click="exportGPX" :disable="pins.length < 2" />
            <q-btn icon="delete" color="negative" @click="clearAll" />
            <q-btn icon="access_time" color="secondary" @click="showEtaDialog = true" />
          </div>
        </div>
        <div class="col-4 flex column q-ml-sm" :class="isMobile ? 'col-12' : ''">
          <q-table
            v-if="routeTable.length > 0"
            :rows="routeTable"
            :columns="columns"
            row-key="id"
            flat
            dense
            class="march-table-bg shadow-1"
          />
        </div>
      </div>
      <q-dialog v-model="showEtaDialog">
        <q-card style="min-width:320px;max-width:95vw;">
          <q-card-section class="text-h6">Szacowanie czasu marszu</q-card-section>
          <q-card-section>
            <div v-for="(seg, i) in etaSegments" :key="i" class="q-mb-sm">
              <div class="row items-center q-gutter-sm">
                <div class="text-caption">Odcinek {{ i+1 }} ({{ seg.distance }} m):</div>
                <q-option-group
                  v-model="seg.terrain"
                  :options="terrainTypes.map(t => ({ label: t, value: t }))"
                  type="radio"
                  inline
                />
              </div>
            </div>
            <div class="row q-gutter-md q-mt-md">
              <q-select v-model="breakEvery" :options="breakEveryOptions" label="Przerwa co (min)" dense outlined style="min-width:120px;" />
              <q-select v-model="breakLength" :options="breakLengthOptions" label="Długość przerwy (min)" dense outlined style="min-width:120px;" />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Zamknij" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div v-if="routeTable.length > 0" class="q-mt-md text-h6 text-center">ETA: {{ formatEta(etaResult) }}</div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { ref, onMounted, reactive, computed, watchEffect } from 'vue'
import { useQuasar } from 'quasar'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as mgrs from 'mgrs'

const $q = useQuasar()

// Ikony SVG z public/icons/
const iconHome = L.icon({
  iconUrl: '/icons/home.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconFlag = L.icon({
  iconUrl: '/icons/flag.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconPin = L.icon({
  iconUrl: '/icons/pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})

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

const isMobile = computed(() => $q.screen.width < 600)

const showEtaDialog = ref(false)
const terrainTypes = ['ciężki', 'średni', 'łatwy']
const terrainSpeeds = { ciężki: 1.5, średni: 3, łatwy: 5 }
const etaSegments = reactive([])
const breakEvery = ref(60)
const breakLength = ref(10)
const breakEveryOptions = [30, 45, 60, 90]
const breakLengthOptions = [5, 10, 15]

// Synchronizuj etaSegments z routeTable
watchEffect(() => {
  etaSegments.length = 0
  for (let i = 1; i < routeTable.value.length; i++) {
    etaSegments.push({
      idx: i,
      terrain: 'średni',
      distance: parseFloat(routeTable.value[i].odleglosc)
    })
  }
})

const etaResult = computed(() => {
  let totalDist = 0
  let totalTime = 0 // w minutach
  let timeSinceBreak = 0
  etaSegments.forEach(seg => {
    const speed = terrainSpeeds[seg.terrain] // km/h
    const distKm = seg.distance / 1000
    const time = distKm / speed * 60 // min
    totalDist += distKm
    totalTime += time
    timeSinceBreak += time
    if (timeSinceBreak >= breakEvery.value) {
      totalTime += breakLength.value
      timeSinceBreak = 0
    }
  })
  return { totalTime, totalDist }
})

function formatEta (result) {
  const minutes = result.totalTime
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  return `${h > 0 ? h + 'h ' : ''}${m}min (${result.totalDist.toFixed(2)} km)`
}

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

function updateMarkerIcons () {
  markers.value.forEach((marker, idx) => {
    if (idx === 0) {
      marker.setIcon(iconHome)
    } else if (idx === markers.value.length - 1) {
      marker.setIcon(iconFlag)
    } else {
      marker.setIcon(iconPin)
    }
  })
}

// Eksport GPX
function exportGPX () {
  if (pins.value.length < 2) return
  const gpxHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="WOT PWA" xmlns="http://www.topografix.com/GPX/1/1">\n<trk><name>Tabela marszu</name><trkseg>'
  const gpxPoints = pins.value.map(p => `<trkpt lat="${p.lat}" lon="${p.lng}"></trkpt>`).join('\n')
  const gpxFooter = '</trkseg></trk></gpx>'
  const gpxContent = `${gpxHeader}\n${gpxPoints}\n${gpxFooter}`
  const blob = new Blob([gpxContent], { type: 'application/gpx+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'tabela-marszu.gpx'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

onMounted(() => {
  map.value = L.map('march-map').setView([52.2297, 21.0122], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19
  }).addTo(map.value)
  map.value.on('click', (e) => {
    if (!pinMode.value) return
    pins.value.push({ lat: e.latlng.lat, lng: e.latlng.lng })
    // Dodaj marker z domyślną ikoną, potem zaktualizuj wszystkie
    const marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: iconPin }).addTo(map.value)
    markers.value.push(marker)
    updateMarkerIcons()
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
  // Zaktualizuj ikony markerów
  updateMarkerIcons()
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
.march-table-bg {
  background: var(--military-light, #F5F5F5) !important;
}
/* Poprawa rozmieszczenia przycisków na mobile */
.march-btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
.march-btn {
  min-width: 140px;
}
@media (max-width: 600px) {
  .march-btn {
    flex: 1 1 100%;
    min-width: 0;
    max-width: 100%;
  }
}

/* Leaflet marker SVG na czarno */
.leaflet-marker-icon[src$='.svg'] {
  filter: invert(1) grayscale(1);
}
</style>
