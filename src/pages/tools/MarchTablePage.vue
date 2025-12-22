<template>
  <q-page class="q-pa-md flex row">
    <div class="march-main-container q-mx-auto" style="width:100%;max-width:1500px;">
      <BackNav color="black" parentPath="/tools" />
      <div class="text-h5 text-center q-mb-md flex items-center justify-center">
        Tabela marszu
        <q-btn flat round dense icon="info_outline" class="q-ml-sm" @click="showInfoDialog = true" aria-label="Instrukcja" />
      </div>
      <div class="row items-start justify-center">
        <div class="col-7 flex column q-mr-xs" :class="isMobile ? 'col-12' : ''">
          <div class="q-mb-md">
            <q-input v-model="search" label="Wyszukaj teren (nazwa lub MGRS)" outlined dense @keyup.enter="searchArea" />
            <q-btn label="Pokaż teren" color="primary" class="q-my-sm" @click="searchArea" />
            <q-checkbox v-model="showMgrsGrid" label="Grid MGRS (test)" color="green" class="q-ml-md" />
          </div>
          <div id="march-map" :style="isMobile ? 'height: 400px' : 'height: 600px' " style="width:100%;border-radius:8px;overflow:hidden;" class="q-mb-md"></div>
          <div class="q-mb-md row wrap items-center justify-center justify-between q-gutter-sm">
            <q-btn label="Dodaj punkt" color="green-7" @click="enablePinMode" :disable="pinMode" />
            <q-btn label="Dodaj pkt spec." color="blue-7" @click="showSpecialDialog = true" :disable="pinMode" />
                  <q-dialog v-model="showSpecialDialog">
                    <q-card style="min-width:320px;max-width:95vw;">
                      <q-card-section class="text-h6">Dodaj punkt specjalny</q-card-section>
                      <q-card-section>
                        <q-select
                          v-model="specialType"
                          :options="specialTypes"
                          label="Typ punktu"
                          dense outlined emit-value map-options
                        />
                        <q-input
                          v-if="specialType === 'INNY'"
                          v-model="specialCustomName"
                          label="Nazwa własna punktu"
                          dense outlined class="q-mt-md"
                        />
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn flat label="Anuluj" color="primary" v-close-popup />
                        <q-btn flat label="OK" color="primary" @click="handleSpecialDialogOk" />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
            <q-btn label="Usuń ostatni" color="red-9" @click="removeLastPin" :disable="pins.length === 0" />
            <q-btn icon="file_download" color="primary" label="GPX" @click="exportGPX" :disable="pins.length < 2" />
            <q-btn icon="access_time" color="secondary" @click="showEtaDialog = true" />
            <q-btn icon="picture_as_pdf" color="grey-9" @click="showPdfDialog = true" />
            <q-btn icon="delete" color="negative" @click="clearAll" />
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
            class="march-table-bg shadow-1 q-mb-md"
          />

          <q-table
            v-if="specialPoints.length > 0"
            :rows="specialPointsTable"
            :columns="specialColumns"
            row-key="__rowKey"
            flat
            dense
            class="march-table-bg shadow-1"
            title="Punkty specjalne"
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

      <q-dialog v-model="showPdfDialog">
        <q-card style="min-width:320px;max-width:95vw;">
          <q-card-section class="text-h6">Eksport PDF</q-card-section>
          <q-card-section>
<q-option-group
  v-model="pdfOptions"
  :options="[
    { label: 'Załącz mapę', value: 'map' },
    { label: 'Siatka MGRS (1km)', value: 'mgrsGrid' },
    { label: 'Nadaj nazwę', value: 'name' },
    ...(specialPoints.length > 0 ? [{ label: 'Dodaj punkty specjalne', value: 'specialPoints' }] : []),
    ...(routeTable.length > 0 ? [{ label: 'Dodaj trasę', value: 'routeTable' }] : [])
  ]"
  type="checkbox"
/>
            <div v-if="pdfOptions.includes('name')" class="q-mt-md">
              <q-input
                v-model="pdfCustomName"
                label="Nazwa trasy (własna)"
                dense outlined
                @input="onCustomNameInput"
                :disable="pdfSelectedName !== ''"
                class="q-mb-sm"
              />
              <q-select
                v-model="pdfSelectedName"
                :options="predefinedRouteNames"
                label="Wybierz nazwę trasy"
                dense outlined emit-value map-options
                @update:model-value="onDropdownSelect"
                :disable="pdfCustomName !== ''"
              />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Anuluj" color="primary" v-close-popup />
            <q-btn flat label="OK" color="primary" @click="handlePdfExport" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="showInfoDialog">
        <q-card style="min-width:340px;max-width:95vw;">
          <q-card-section class="text-h6">Instrukcja korzystania z Tabeli marszu</q-card-section>
          <q-card-section style="max-height:60vh;overflow:auto;">
            <ol style="padding-left: 1.2em;">
              <li><b>Dodawanie punktów trasy:</b> Kliknij „Dodaj punkt”, a następnie wskaż miejsce na mapie. Punkty wyznaczają trasę marszu.</li>
              <li><b>Dodawanie punktów specjalnych:</b> Kliknij „Dodaj pkt spec.”, wybierz typ punktu (np. PZPR, MEDEVAC, OP, BAZA lub INNY), a następnie wskaż miejsce na mapie.</li>
              <li><b>Usuwanie punktów:</b> Kliknij „Usuń ostatni”, aby usunąć ostatnio dodany punkt (trasy lub specjalny).</li>
              <li><b>Czyszczenie wszystkiego:</b> Kliknij ikonę kosza, aby usunąć wszystkie punkty i wyczyścić tabelę.</li>
              <li><b>Eksport danych:</b>
                <ul>
                  <li><b>GPX:</b> Pobierz trasę do pliku GPX.</li>
                  <li><b>PDF:</b> Kliknij ikonę PDF, aby wygenerować dokument. Przed eksportem zaznacz, które elementy mają znaleźć się w pliku PDF (np. trasę, punkty specjalne, mapę, nazwę trasy), a następnie kliknij „Eksportuj”.</li>
                </ul>
              </li>
              <li><b>Wyszukiwanie terenu:</b> Wpisz nazwę miejsca lub współrzędne MGRS i kliknij „Pokaż teren”.</li>
              <li><b>Obliczanie czasu marszu:</b> Kliknij ikonę zegara, aby zobaczyć szacowany czas przejścia trasy.</li>
            </ol>
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
import { ref, onMounted, reactive, computed, watchEffect, watch } from 'vue'
import { useQuasar, Loading } from 'quasar'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as mgrs from 'mgrs'
import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import leafletImage from 'leaflet-image'
import * as utm from 'utm'

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
const iconPzpr = L.icon({
  iconUrl: '/icons/pzpr.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconMedevac = L.icon({
  iconUrl: '/icons/medevac.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconOp = L.icon({
  iconUrl: '/icons/op.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconBaza = L.icon({
  iconUrl: '/icons/baza.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconOther = L.icon({
  iconUrl: '/icons/other.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})

const search = ref('')
const map = ref(null)
const pins = ref([])
const markers = ref([])
const polylines = ref([])
// Stack historii: każdy wpis to { type: 'pin'|'special', marker, idx }
const pointHistory = ref([])
const pinMode = ref(false)
const routeTable = ref([])

const showInfoDialog = ref(false)
// --- Special Points State ---
const showSpecialDialog = ref(false)
const specialType = ref('')
const specialCustomName = ref('')
const specialTypes = [
  { label: 'PZPR', value: 'PZPR' },
  { label: 'MEDEVAC', value: 'MEDEVAC' },
  { label: 'OP', value: 'OP' },
  { label: 'BAZA', value: 'BAZA' },
  { label: 'INNY', value: 'INNY' }
]
const specialPoints = ref([]) // {lat, lng, type, name}
let addSpecialMode = false

function handleSpecialDialogOk () {
  showSpecialDialog.value = false
  addSpecialMode = true
}

const columns = [
  { name: 'lp', label: 'Lp.', field: 'lp', align: 'left' },
  { name: 'mgrs', label: 'MGRS', field: 'mgrs', align: 'left' },
  { name: 'azymut', label: 'Azymut', field: 'azymut', align: 'left' },
  { name: 'odleglosc', label: 'Odległość (m)', field: 'odleglosc', align: 'left' }
]

// Columns for special points table
const specialColumns = [
  { name: 'type', label: 'Typ', field: 'type', align: 'left' },
  { name: 'mgrs', label: 'MGRS', field: 'mgrs', align: 'left' }
]

// Compute display rows for special points table
const specialPointsTable = computed(() => {
  return specialPoints.value.map((pt, idx) => {
    // MGRS conversion
    let mgrsStr = ''
    try {
      mgrsStr = mgrs.forward([pt.lng, pt.lat], 5)
    } catch (e) {}
    return {
      __rowKey: pt.__rowKey,
      type: pt.type,
      name: pt.name,
      mgrs: mgrsStr,
      azymut: '-',
      odleglosc: '-'
    }
  })
})

// Add a unique row key for q-table
function addSpecialPointRowKey () {
  specialPoints.value.forEach((pt, idx) => {
    pt.__rowKey = idx + '-' + pt.type + '-' + pt.name + '-' + pt.lat + '-' + pt.lng
  })
}

watchEffect(() => {
  addSpecialPointRowKey()
})

const isMobile = computed(() => $q.screen.width < 600)

const showEtaDialog = ref(false)
const showPdfDialog = ref(false)
const pdfOptions = ref([])
const pdfCustomName = ref('')
const pdfSelectedName = ref('')
const predefinedRouteNames = [
  'Trasa A',
  'Trasa B',
  'Trasa C',
  'Trasa powrotna A',
  'Trasa powrotna B',
  'Trasa powrotna C'
]

function onCustomNameInput (val) {
  if (val && pdfSelectedName.value) {
    pdfSelectedName.value = ''
  }
}
function onDropdownSelect (val) {
  if (val && pdfCustomName.value) {
    pdfCustomName.value = ''
  }
}
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
  // Usuń wszystkie markery z mapy
  pointHistory.value.forEach(entry => {
    if (entry.marker && map.value) {
      try { map.value.removeLayer(entry.marker) } catch (e) {}
    }
  })
  pins.value = []
  specialPoints.value = []
  routeTable.value = []
  markers.value = []
  polylines.value.forEach(l => map.value && map.value.removeLayer(l))
  polylines.value = []
  pointHistory.value = []
}

function calculateRoute () {
  // Rysuj linie między pinezkami
  polylines.value.forEach(l => map.value && map.value.removeLayer(l))
  polylines.value = []
  if (pins.value.length > 1 && map.value) {
    for (let i = 1; i < pins.value.length; i++) {
      const prev = pins.value[i - 1]
      const curr = pins.value[i]
      const polyline = L.polyline([[prev.lat, prev.lng], [curr.lat, curr.lng]], { color: 'red', weight: 4, renderer: L.canvas() }).addTo(map.value)
      polylines.value.push(polyline)
    }
  }
  if (pins.value.length < 1) {
    routeTable.value = []
    return
  }
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

// Eksport PDF

function handlePdfExport () {
  showPdfDialog.value = false
  Loading.show({ message: 'Generowanie PDF...' })
  let routeName = ''
  if (pdfOptions.value.includes('name')) {
    routeName = pdfCustomName.value || pdfSelectedName.value || 'Tabela marszu'
  }
  // Dodaj/usuń siatkę MGRS na mapie przed eksportem
  let gridLayers = []
  const forPdf = pdfOptions.value.includes('map')
  // Dodaj siatkę MGRS do mapy TYLKO jeśli nie jest już aktywna
  if (pdfOptions.value.includes('mgrsGrid') && map.value && !map.value._mgrsGridLayer) {
    gridLayers = drawMgrsGrid(map.value, forPdf)
  }
  // Force redraw of all overlays (rectangles, polylines)
  if (pdfOptions.value.includes('map') && map.value) {
    map.value.invalidateSize()
    map.value.setZoom(map.value.getZoom()) // force repaint
    map.value.eachLayer(l => {
      if (l.redraw) l.redraw()
    })
    polylines.value.forEach(l => l.redraw && l.redraw())
    gridLayers.forEach(l => l.redraw && l.redraw())
    // Wait for two animation frames and a longer timeout to ensure overlays are painted
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          leafletImage(map.value, function (err, canvas) {
            let mapImgData = null
            let mapImgDims = null
            if (!err && canvas) {
              // Zawsze dorysuj siatkę MGRS na canvasie PDF jeśli wybrano opcję
              if (pdfOptions.value.includes('mgrsGrid')) {
                drawMgrsGridOnCanvas(canvas, map.value, map.value.getBounds())
              }
              mapImgData = canvas.toDataURL('image/png')
              mapImgDims = { width: canvas.width, height: canvas.height }
            }
            // Usuń siatkę po eksporcie
            if (gridLayers.length) gridLayers.forEach(l => map.value.removeLayer(l))
            exportPDF(routeName, mapImgData, mapImgDims)
            Loading.hide()
          })
        }, 400)
      })
    })
  } else {
    // Usuń siatkę jeśli była dodana
    if (gridLayers.length && map.value) gridLayers.forEach(l => map.value.removeLayer(l))
    exportPDF(routeName, null, null)
    Loading.hide()
  }
}

// Helper to draw MGRS grid on a canvas
function drawMgrsGridOnCanvas (canvas, map, bounds) {
  const ctx = canvas.getContext('2d')
  ctx.font = 'bold 14px Arial'
  ctx.fillStyle = '#008800'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // Use UTM grid for true MGRS alignment
  const sw = bounds.getSouthWest()
  const ne = bounds.getNorthEast()
  const utmSW = utm.fromLatLon(sw.lat, sw.lng)
  const utmNE = utm.fromLatLon(ne.lat, ne.lng)
  const zoneNum = utmSW.zoneNum
  const zoneLetter = utmSW.zoneLetter
  // Round easting/northing to 1km
  const minE = Math.floor(Math.min(utmSW.easting, utmNE.easting) / 1000) * 1000
  const maxE = Math.ceil(Math.max(utmSW.easting, utmNE.easting) / 1000) * 1000
  const minN = Math.floor(Math.min(utmSW.northing, utmNE.northing) / 1000) * 1000
  const maxN = Math.ceil(Math.max(utmSW.northing, utmNE.northing) / 1000) * 1000
  const maxSquares = 50
  // Draw vertical grid lines (easting)
  let eCount = 0
  for (let e = minE; e <= maxE && eCount < maxSquares; e += 1000, eCount++) {
    const latlng1 = utm.toLatLon(e, minN, zoneNum, zoneLetter)
    const latlng2 = utm.toLatLon(e, maxN, zoneNum, zoneLetter)
    const p1 = map.latLngToContainerPoint([latlng1.latitude, latlng1.longitude])
    const p2 = map.latLngToContainerPoint([latlng2.latitude, latlng2.longitude])
    ctx.save()
    ctx.strokeStyle = '#008800'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
    ctx.restore()
    // Label: pierwsze dwie cyfry easting (km)
    const label = String(Math.floor(e / 1000)).padStart(2, '0').slice(0, 2)
    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText(label, p1.x, p1.y - 12)
    ctx.restore()
    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(label, p2.x, p2.y + 12)
    ctx.restore()
  }
  // Draw horizontal grid lines (northing)
  let nCount = 0
  for (let n = minN; n <= maxN && nCount < maxSquares; n += 1000, nCount++) {
    const latlng1 = utm.toLatLon(minE, n, zoneNum, zoneLetter)
    const latlng2 = utm.toLatLon(maxE, n, zoneNum, zoneLetter)
    const p1 = map.latLngToContainerPoint([latlng1.latitude, latlng1.longitude])
    const p2 = map.latLngToContainerPoint([latlng2.latitude, latlng2.longitude])
    ctx.save()
    ctx.strokeStyle = '#008800'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
    ctx.restore()
    // Label: pierwsze dwie cyfry northing (km)
    const label = String(Math.floor(n / 1000)).padStart(2, '0').slice(0, 2)
    ctx.save()
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, p1.x - 12, p1.y)
    ctx.restore()
    ctx.save()
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, p2.x + 12, p2.y)
    ctx.restore()
  }
}

// Custom Leaflet layer for MGRS grid (with full MGRS labels at intersections)
const MGRSGridLayer = L.Layer.extend({
  initialize: function (options) {
    L.setOptions(this, options)
  },
  onAdd: function (map) {
    this._map = map
    this._canvas = L.DomUtil.create('canvas', 'leaflet-mgrs-grid')
    this._canvas.width = map.getSize().x
    this._canvas.height = map.getSize().y
    this._canvas.style.position = 'absolute'
    this._canvas.style.top = '0'
    this._canvas.style.left = '0'
    this._canvas.style.pointerEvents = 'none'
    this._canvas.style.zIndex = '200'
    map.getPanes().markerPane.appendChild(this._canvas)
    console.log('[MGRSGridLayer] Canvas added to overlayPane', this._canvas)
    this._redrawHandler = this._draw.bind(this)
    map.on('moveend zoomend resize', this._redrawHandler)
    this._draw()
  },
  onRemove: function (map) {
    if (this._canvas && this._canvas.parentNode) {
      this._canvas.parentNode.removeChild(this._canvas)
    }
    map.off('moveend zoomend resize', this._redrawHandler)
  },
  _draw: function () {
    const map = this._map
    // Ensure canvas matches map size
    const size = map.getSize()
    if (this._canvas.width !== size.x || this._canvas.height !== size.y) {
      this._canvas.width = size.x
      this._canvas.height = size.y
    }
    const ctx = this._canvas.getContext('2d')
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    console.log('[MGRSGridLayer] _draw called, canvas size:', this._canvas.width, this._canvas.height)
    // --- UTM-based grid for true MGRS alignment ---
    const bounds = map.getBounds()
    const sw = bounds.getSouthWest()
    const ne = bounds.getNorthEast()
    const utmSW = utm.fromLatLon(sw.lat, sw.lng)
    const utmNE = utm.fromLatLon(ne.lat, ne.lng)
    console.log('[MGRSGridLayer] utmSW', utmSW, 'utmNE', utmNE, 'sw', sw, 'ne', ne)
    const zoneNum = utmSW.zoneNum
    const zoneLetter = utmSW.zoneLetter
    const minE = Math.floor(Math.min(utmSW.easting, utmNE.easting) / 1000) * 1000
    let maxE = Math.ceil(Math.max(utmSW.easting, utmNE.easting) / 1000) * 1000
    const minN = Math.floor(Math.min(utmSW.northing, utmNE.northing) / 1000) * 1000
    let maxN = Math.ceil(Math.max(utmSW.northing, utmNE.northing) / 1000) * 1000
    const maxSquares = 50
    console.log('[MGRSGridLayer] minE', minE, 'maxE', maxE, 'minN', minN, 'maxN', maxN)
    // Wymuś zakres jeśli za mały (np. dla bardzo małego widoku)
    if (maxE - minE < 1000) maxE = minE + 1000
    if (maxN - minN < 1000) maxN = minN + 1000
    ctx.font = 'bold 14px Arial'
    ctx.fillStyle = '#000000'
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 1
    console.log('[MGRSGridLayer] Drawing grid: canvas', this._canvas.width, this._canvas.height, 'bounds', bounds.toBBoxString())
    // Draw grid lines and full MGRS labels at intersections
    let eCount = 0
    for (let e = minE; e <= maxE && eCount < maxSquares; e += 1000, eCount++) {
      let nCount = 0
      for (let n = minN; n <= maxN && nCount < maxSquares; n += 1000, nCount++) {
        // Draw vertical line (only once per easting)
        if (n === minN) {
          const latlng1 = utm.toLatLon(e, minN, zoneNum, zoneLetter)
          const latlng2 = utm.toLatLon(e, maxN, zoneNum, zoneLetter)
          const p1 = map.latLngToContainerPoint([latlng1.latitude, latlng1.longitude])
          const p2 = map.latLngToContainerPoint([latlng2.latitude, latlng2.longitude])
          ctx.save()
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
          ctx.restore()
          // Etykieta: pierwsze dwie cyfry easting (km)
          const label = String(Math.floor(e / 1000)).padStart(2, '0').slice(0, 2)
          ctx.save()
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillStyle = '#008800'
          ctx.font = 'bold 12px Arial'
          ctx.fillText(label, p1.x, p1.y - 12)
          ctx.textBaseline = 'bottom'
          ctx.fillText(label, p2.x, p2.y + 12)
          ctx.restore()
        }
        // Draw horizontal line (only once per northing)
        if (e === minE) {
          const latlng1 = utm.toLatLon(minE, n, zoneNum, zoneLetter)
          const latlng2 = utm.toLatLon(maxE, n, zoneNum, zoneLetter)
          const p1 = map.latLngToContainerPoint([latlng1.latitude, latlng1.longitude])
          const p2 = map.latLngToContainerPoint([latlng2.latitude, latlng2.longitude])
          ctx.save()
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
          ctx.restore()
          // Etykieta: pierwsze dwie cyfry northing (km)
          const label = String(Math.floor(n / 1000)).padStart(2, '0').slice(0, 2)
          ctx.save()
          ctx.textAlign = 'right'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = '#008800'
          ctx.font = 'bold 12px Arial'
          ctx.fillText(label, p1.x - 12, p1.y)
          ctx.textAlign = 'left'
          ctx.fillText(label, p2.x + 12, p2.y)
          ctx.restore()
        }
        // (Nie rysujemy pełnego MGRS na przecięciu)
      }
    }
  }
})

// Replace drawMgrsGrid to use the custom layer
function drawMgrsGrid (map, forPdf = false) {
  if (map._mgrsGridLayer) {
    map.removeLayer(map._mgrsGridLayer)
    map._mgrsGridLayer = null
  }
  const gridLayer = new MGRSGridLayer()
  gridLayer.addTo(map)
  map._mgrsGridLayer = gridLayer
  return [gridLayer]
}

function exportPDF (routeName = '', mapImgData = null, mapImgDims = null) {
  // Use Roboto if available, else fallback to helvetica
  const doc = new JsPDF()
  try {
    doc.setFont('Roboto', 'normal')
  } catch (e) {
    doc.setFont('helvetica', 'normal')
  }
  let y = 16
  // Dodaj nazwę jeśli wybrano
  if (pdfOptions.value.includes('name')) {
    doc.text(routeName || 'Tabela marszu', 14, y)
    y += 8
  }
  // Dodaj trasę jeśli wybrano
  if (pdfOptions.value.includes('routeTable') && routeTable.value.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [columns.map(col => col.name !== 'odleglosc' ? col.label : 'Dystans (m)')],
      body: routeTable.value.map(row => columns.map(col => row[col.field])),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [45, 62, 47] }
    })
    y = doc.lastAutoTable.finalY + 8
  }
  // Dodaj punkty specjalne jeśli wybrano
  if (pdfOptions.value.includes('specialPoints') && specialPointsTable.value.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [specialColumns.map(col => col.label)],
      body: specialPointsTable.value.map(row => specialColumns.map(col => row[col.field])),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [45, 62, 47] },
      margin: { left: 14, right: 14 }
    })
    y = doc.lastAutoTable.finalY + 8
  }
  // Dodaj mapę jeśli wybrano i jest screenshot
  if (pdfOptions.value.includes('map') && mapImgData && mapImgDims) {
    // Szerokość PDF: 210mm, marginesy 14px, szerokość mapy ~180mm
    const pdfWidth = doc.internal.pageSize.getWidth()
    const imgWidth = pdfWidth - 28
    // Zachowaj proporcje mapy
    const aspect = mapImgDims.height / mapImgDims.width
    const imgHeight = imgWidth * aspect
    doc.addImage(mapImgData, 'PNG', 14, y, imgWidth, imgHeight)
    y += imgHeight + 8
  }
  doc.save((routeName ? routeName.replace(/\s+/g, '-') : 'tabela-marszu') + '.pdf')
}

onMounted(() => {
  map.value = L.map('march-map').setView([52.2297, 21.0122], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19
  }).addTo(map.value)
  map.value.on('click', (e) => {
    if (addSpecialMode) {
      // Add special point
      const type = specialType.value
      const name = type === 'INNY' ? specialCustomName.value : type
      specialPoints.value.push({ lat: e.latlng.lat, lng: e.latlng.lng, type, name })
      let icon = iconOther
      if (type === 'PZPR') icon = iconPzpr
      else if (type === 'MEDEVAC') icon = iconMedevac
      else if (type === 'OP') icon = iconOp
      else if (type === 'BAZA') icon = iconBaza
      const marker = L.marker([e.latlng.lat, e.latlng.lng], { icon }).addTo(map.value)
      pointHistory.value.push({ type: 'special', marker, idx: specialPoints.value.length - 1 })
      addSpecialMode = false
      specialType.value = ''
      specialCustomName.value = ''
      return
    }
    if (!pinMode.value) return
    pins.value.push({ lat: e.latlng.lat, lng: e.latlng.lng })
    const marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: iconPin }).addTo(map.value)
    markers.value.push(marker)
    pointHistory.value.push({ type: 'pin', marker, idx: pins.value.length - 1 })
    updateMarkerIcons()
    pinMode.value = false
    calculateRoute()
  })
})

function removeLastPin () {
  if (pointHistory.value.length === 0) return
  const last = pointHistory.value.pop()
  if (last.type === 'pin' && pins.value.length > 0) {
    pins.value.splice(last.idx, 1)
    if (last.marker && map.value) {
      try { map.value.removeLayer(last.marker) } catch (e) {}
    }
    markers.value.splice(last.idx, 1)
    updateMarkerIcons()
    polylines.value.forEach(l => map.value && map.value.removeLayer(l))
    polylines.value = []
    calculateRoute()
  } else if (last.type === 'special' && specialPoints.value.length > 0) {
    specialPoints.value.splice(last.idx, 1)
    if (last.marker && map.value) {
      try { map.value.removeLayer(last.marker) } catch (e) {}
    }
    // Wymuś odświeżenie tabeli jeśli nie ma już żadnych punktów specjalnych
    if (specialPoints.value.length === 0) {
      // Trik: Vue czasem nie odświeża computed, więc wymuszamy re-render
      specialPoints.value = []
    }
  }
}

const showMgrsGrid = ref(false)

watch(showMgrsGrid, (val) => {
  if (!map.value) return
  // Usuwamy starą warstwę jeśli istnieje
  if (map.value._mgrsGridLayer) {
    map.value.removeLayer(map.value._mgrsGridLayer)
    map.value._mgrsGridLayer = null
  }
  if (val) {
    console.log('Adding MGRS grid layer')
    // Dodajemy nową warstwę
    const layers = drawMgrsGrid(map.value, true)
    if (layers && layers.length > 0) {
      map.value._mgrsGridLayer = layers[0]
    }
  }
})
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
.leaflet-mgrs-grid {
  z-index: 1500 !important;
  pointer-events: none;
}
</style>
