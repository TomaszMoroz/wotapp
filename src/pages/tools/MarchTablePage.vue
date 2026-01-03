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
            <q-btn flat dense icon="my_location" label="Moje położenie" color="primary" class="q-ml-sm" @click="centerOnUserLocation" :disable="locating" aria-label="Ustaw na moją lokalizację" />
              <q-toggle
                v-model="inputMode"
                :label="inputMode === 'map' ? 'punkty na mapie' : 'wpisz gridy'"
                true-value="map"
                false-value="grid"
                color="primary"
                class="q-ml-md"
              />
            <!-- <q-btn flat dense icon="explore" color="primary" class="q-ml-sm" @click="resetNorthUp" aria-label="Północ u góry" /> -->
          </div>
          <div id="march-map" :style="isMobile ? 'height: 400px' : 'height: 600px' " style="width:100%;border-radius:8px;overflow:hidden;" class="q-mb-md"></div>
          <div class="q-mb-md row wrap items-center justify-center justify-between q-gutter-sm">
              <q-btn label="Dodaj punkt" color="green-7" @click="handleAddPoint" :disable="false" />
              <q-dialog v-model="showGridDialog">
                <q-card style="min-width:320px;max-width:95vw;">
                  <q-card-section class="text-h6">Dodaj punkt przez grid MGRS</q-card-section>
                  <q-card-section>
                      <div class="q-mb-md">
                        <q-input v-model="mgrsPrefix" label="Prefix MGRS (np. 34UEC)" dense outlined readonly />
                      </div>
                      <div class="q-mb-md">
                        <q-input v-model="mgrsEasting" label="Easting (2–5 cyfr)" dense outlined maxlength="5" />
                      </div>
                      <div class="q-mb-md">
                        <q-input v-model="mgrsNorthing" label="Northing (2–5 cyfr)" dense outlined maxlength="5" />
                      </div>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn flat label="Anuluj" color="primary" v-close-popup @click="showGridDialog = false" />
                    <q-btn flat label="OK" color="primary" @click="addGridPoint" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <q-btn label="Dodaj pkt spec." color="blue-7" @click="showSpecialDialog = true" :disable="false" />
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
                          <div v-if="inputMode === 'grid'">
                              <q-input v-model="specialMgrsPrefix" label="Prefix MGRS (np. 34UEC)" dense outlined readonly class="q-mt-md" />
                              <q-input v-model="specialMgrsEasting" label="Easting (2–5 cyfr)" dense outlined maxlength="5" class="q-mt-md" />
                              <q-input v-model="specialMgrsNorthing" label="Northing (2–5 cyfr)" dense outlined maxlength="5" class="q-mt-md" />
                          </div>
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn flat label="Anuluj" color="primary" v-close-popup />
                        <q-btn flat label="OK" color="primary" @click="handleSpecialDialogOk"
                          :disable="inputMode === 'grid' && (!specialType || specialMgrsPrefix.length !== 5 || specialMgrsEasting.length < 2 || specialMgrsEasting.length > 5 || specialMgrsNorthing.length < 2 || specialMgrsNorthing.length > 5)"
                        />
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
                { label: 'Nadaj nazwę', value: 'name' },
                ...(specialPoints.length > 0 ? [{ label: 'Dodaj punkty specjalne', value: 'specialPoints' }] : []),
                ...(routeTable.length > 0 ? [{ label: 'Dodaj tabelę', value: 'routeTable' }] : [])
              ]"
              type="checkbox"
            />
            <div v-if="pdfOptions.includes('map')">
              <q-option-group
                v-model="pdfMapOptions"
                :options="[
                  { label: 'Dodaj linie trasy', value: 'routeLines' },
                  { label: 'Dodaj punkty trasy', value: 'routeMarkers' },
                  { label: 'Dodaj siatkę MGRS', value: 'mgrsGrid' }
                ]"
                type="checkbox"
              />
            </div>
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
              <li><b>Tryby dodawania punktów:</b> Po prawej stronie przycisku „MOJE POŁOŻENIE” znajduje się przełącznik trybu:
                <ul>
                  <li><b>Punkty na mapie:</b> Domyślny tryb. Kliknij „Dodaj punkt”, a następnie wskaż miejsce na mapie.</li>
                  <li><b>Wpisz gridy (MGRS):</b> Przełącz tryb, kliknij „Dodaj punkt” i wpisz współrzędne MGRS w dialogu. Punkt zostanie dodany do trasy i wyświetlony na mapie.</li>
                </ul>
                Możesz przełączać tryby w dowolnym momencie. Wszystkie punkty są uwzględniane w trasie i eksporcie do PDF.
              </li>
              <li><b>Dodawanie punktów specjalnych:</b> Kliknij „Dodaj pkt spec.”, wybierz typ punktu (np. PZPR, MEDEVAC, OP, BAZA lub INNY), a następnie wskaż miejsce na mapie lub wpisz grid w zależności od trybu.</li>
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
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-rotate'
import { ref, onMounted, reactive, computed, watchEffect, watch } from 'vue'
import { useQuasar, Loading } from 'quasar'
import * as mgrs from 'mgrs'
import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import leafletImage from 'leaflet-image'
import * as utm from 'utm'

const $q = useQuasar()

// Ikony SVG z public/icons/
// Dialog do wpisywania gridów
const showGridDialog = ref(false)
const mgrsPrefix = ref('')
const mgrsEasting = ref('')
const mgrsNorthing = ref('')

function handleAddPoint () {
  if (inputMode.value === 'map') {
    enablePinMode()
  } else {
    // Wyciągnij prefix MGRS z centralnego punktu mapy
    if (map.value) {
      const center = map.value.getCenter()
      // Prefix MGRS: pierwsze 5 znaków
      const mgrsFull = mgrs.forward([center.lng, center.lat], 5)
      mgrsPrefix.value = mgrsFull.slice(0, 5)
    } else {
      mgrsPrefix.value = ''
    }
    mgrsEasting.value = ''
    mgrsNorthing.value = ''
    showGridDialog.value = true
  }
}
// Dodaje punkt do trasy i aktualizuje mapę/tabelę
function addPinToRoute (lat, lng) {
  pins.value.push({ lat, lng })
  if (map.value) {
    const marker = L.marker([lat, lng], { icon: iconPin }).addTo(map.value)
    markers.value.push(marker)
    pointHistory.value.push({ type: 'pin', marker, idx: pins.value.length - 1 })
    if (typeof updateMarkerIcons === 'function') updateMarkerIcons()
  }
  calculateRoute()
}

function addGridPoint () {
  if (!mgrsPrefix.value || mgrsPrefix.value.length !== 5 || mgrsEasting.value.length < 2 || mgrsEasting.value.length > 5 || mgrsNorthing.value.length < 2 || mgrsNorthing.value.length > 5) {
    $q.notify({ type: 'negative', message: 'Wypełnij wszystkie pola MGRS! Prefix musi mieć 5 znaków, easting i northing od 2 do 5 cyfr.' })
    return
  }
  const mgrsFull = mgrsPrefix.value.slice(0, 5) + mgrsEasting.value + mgrsNorthing.value
  try {
    const [lng, lat] = mgrs.toPoint(mgrsFull)
    addPinToRoute(lat, lng)
    showGridDialog.value = false
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Nieprawidłowy adres MGRS!' })
  }
}
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

// Tryb dodawania punktów: 'map' (domyślnie) lub 'grid'
const inputMode = ref('map')
function handleSpecialDialogOk () {
  if (inputMode.value === 'grid') {
    if (!specialMgrsPrefix.value || specialMgrsPrefix.value.length !== 5 || specialMgrsEasting.value.length < 2 || specialMgrsEasting.value.length > 5 || specialMgrsNorthing.value.length < 2 || specialMgrsNorthing.value.length > 5) {
      $q.notify({ type: 'negative', message: 'Wypełnij wszystkie pola MGRS! Prefix musi mieć 5 znaków, easting i northing od 2 do 5 cyfr.' })
      return
    }
    const mgrsFull = specialMgrsPrefix.value.slice(0, 5) + specialMgrsEasting.value + specialMgrsNorthing.value
    try {
      const [lng, lat] = mgrs.toPoint(mgrsFull)
      specialPoints.value.push({ lat, lng, type: specialType.value, name: specialCustomName.value || specialType.value })
      if (map.value) {
        let icon = iconOther
        if (specialType.value === 'PZPR') icon = iconPzpr
        else if (specialType.value === 'MEDEVAC') icon = iconMedevac
        else if (specialType.value === 'OP') icon = iconOp
        else if (specialType.value === 'BAZA') icon = iconBaza
        const marker = L.marker([lat, lng], { icon }).addTo(map.value)
        pointHistory.value.push({ type: 'special', marker, idx: specialPoints.value.length - 1 })
      }
      showSpecialDialog.value = false
      addSpecialMode = false
      return
    } catch (e) {
      $q.notify({ type: 'negative', message: 'Nieprawidłowy adres MGRS!' })
      return
    }
  }
  showSpecialDialog.value = false
  addSpecialMode = true
}
// Inputy do dialogu punktu specjalnego (grid)
const specialMgrsPrefix = ref('')
const specialMgrsEasting = ref('')
const specialMgrsNorthing = ref('')

watch(showSpecialDialog, (val) => {
  if (val && inputMode.value === 'grid' && map.value) {
    const center = map.value.getCenter()
    const mgrsFull = mgrs.forward([center.lng, center.lat], 5)
    specialMgrsPrefix.value = mgrsFull.slice(0, 5)
    specialMgrsEasting.value = ''
    specialMgrsNorthing.value = ''
  }
})

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
const pdfMapOptions = ref([])
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

const locating = ref(false)

function centerOnUserLocation () {
  if (!map.value) return
  locating.value = true
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        map.value.setView([latitude, longitude], 15, { animate: false })
        // Wymuś przeliczenie rozmiaru mapy i ponowne rysowanie siatki po centrowaniu
        setTimeout(() => {
          map.value.invalidateSize()
          const overlayPane = map.value.getPanes().overlayPane
          if (overlayPane) {
            overlayPane.style.transform = 'none'
          }
          // Reset transformacji canvasu siatki MGRS
          if (map.value._mgrsGridLayer && map.value._mgrsGridLayer._canvas) {
            map.value._mgrsGridLayer._canvas.style.transform = 'none'
            console.log('[centerOnUserLocation] Reset transformacji canvasu:', map.value._mgrsGridLayer._canvas.style.transform)
          }
          if (map.value._mgrsGridLayer && typeof map.value._mgrsGridLayer._draw === 'function') {
            map.value._mgrsGridLayer._draw()
          }
        }, 400)
        locating.value = false
        $q.notify({ type: 'positive', message: 'Ustawiono widok na Twoją lokalizację.' })
      },
      (err) => {
        locating.value = false
        $q.notify({ type: 'negative', message: `${err.message}` })
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  } else {
    locating.value = false
    $q.notify({ type: 'negative', message: 'Geolokalizacja nie jest obsługiwana.' })
  }
}

function calculateRoute () {
  // Remove existing polylines from the map
  polylines.value.forEach(l => map.value && map.value.removeLayer(l))
  polylines.value = []
  // Draw new polylines between pins
  if (pins.value.length > 1 && map.value) {
    const latlngs = pins.value.map(p => [p.lat, p.lng])
    const polyline = L.polyline(latlngs, { color: '#888', weight: 2 }).addTo(map.value)
    polylines.value.push(polyline)
    // Add grey points on the line
    pins.value.forEach(p => {
      const greyDot = L.circleMarker([p.lat, p.lng], {
        radius: 4,
        color: 'grey',
        fillColor: 'grey',
        fillOpacity: 1,
        weight: 0
      }).addTo(map.value)
      polylines.value.push(greyDot)
    })
  }
  // Update route table
  routeTable.value = []
  for (let i = 0; i < pins.value.length; i++) {
    let azymut = '-'
    let odleglosc = '-'
    let mgrsStr = ''
    try {
      mgrsStr = mgrs.forward([pins.value[i].lng, pins.value[i].lat], 5)
    } catch (e) {}
    if (i > 0) {
      const prev = pins.value[i - 1]
      const curr = pins.value[i]
      // Calculate azimuth (bearing)
      const dLon = (curr.lng - prev.lng) * Math.PI / 180
      const y = Math.sin(dLon) * Math.cos(curr.lat * Math.PI / 180)
      const x = Math.cos(prev.lat * Math.PI / 180) * Math.sin(curr.lat * Math.PI / 180) -
        Math.sin(prev.lat * Math.PI / 180) * Math.cos(curr.lat * Math.PI / 180) * Math.cos(dLon)
      let brng = Math.atan2(y, x) * 180 / Math.PI
      brng = (brng + 360) % 360
      azymut = Math.round(brng)
      // Calculate distance (meters)
      const R = 6371000
      const dLat = (curr.lat - prev.lat) * Math.PI / 180
      const dLng = (curr.lng - prev.lng) * Math.PI / 180
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(prev.lat * Math.PI / 180) * Math.cos(curr.lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      odleglosc = Math.round(R * c)
    }
    routeTable.value.push({
      lp: i + 1,
      mgrs: mgrsStr,
      azymut,
      odleglosc: i === 0 ? '-' : odleglosc
    })
  }
}

// Eksport PDF
// Rysowanie linii trasy na canvasie PDF
function ctxDrawRouteLinesOnCanvas (canvas, map, pins) {
  if (!pins || pins.length < 2) return
  const ctx = canvas.getContext('2d')
  ctx.save()
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 4
  ctx.beginPath()
  for (let i = 1; i < pins.length; i++) {
    const prev = map.latLngToContainerPoint([pins[i - 1].lat, pins[i - 1].lng])
    const curr = map.latLngToContainerPoint([pins[i].lat, pins[i].lng])
    ctx.moveTo(prev.x, prev.y)
    ctx.lineTo(curr.x, curr.y)
  }
  ctx.stroke()
  ctx.restore()
}

// Rysowanie markerów trasy na canvasie PDF
function ctxDrawRouteMarkersOnCanvas (canvas, map, pins) {
  if (!pins || pins.length === 0) return
  const ctx = canvas.getContext('2d')
  ctx.save()
  ctx.fillStyle = 'grey'
  for (let i = 0; i < pins.length; i++) {
    const p = map.latLngToContainerPoint([pins[i].lat, pins[i].lng])
    ctx.beginPath()
    ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI)
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()
  }
  ctx.restore()
}
function handlePdfExport () {
  showPdfDialog.value = false
  Loading.show({ message: 'Generowanie PDF...' })
  let routeName = ''
  if (pdfOptions.value.includes('name')) {
    routeName = pdfCustomName.value || pdfSelectedName.value || 'Tabela marszu'
  }
  if (pdfOptions.value.includes('map') && map.value) {
    // Tymczasowo ukryj linie trasy i markery jeśli nie są zaznaczone
    const showLines = pdfMapOptions.value.includes('routeLines')
    const showMarkers = pdfMapOptions.value.includes('routeMarkers')
    // Ukryj linie trasy
    polylines.value.forEach(l => {
      if (!showLines) l.setStyle({ opacity: 0 })
      else l.setStyle({ opacity: 1 })
    })
    // Ukryj markery
    markers.value.forEach(m => {
      if (!showMarkers) m.setOpacity(0)
      else m.setOpacity(1)
    })
    map.value.invalidateSize()
    map.value.setZoom(map.value.getZoom()) // force repaint
    map.value.eachLayer(l => {
      if (l.redraw) l.redraw()
    })
    polylines.value.forEach(l => l.redraw())
    // Wait for two animation frames and a longer timeout to ensure overlays are painted
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          leafletImage(map.value, function (err, canvas) {
            let mapImgData = null
            let mapImgDims = null
            if (!err && canvas) {
              // Rysuj siatkę MGRS tylko jeśli wybrano checkbox
              if (pdfMapOptions.value.includes('mgrsGrid')) {
                drawMgrsGridOnCanvas(canvas, map.value, map.value.getBounds())
              }
              // Rysuj linie trasy tylko jeśli wybrano checkbox
              if (pdfMapOptions.value.includes('routeLines')) {
                ctxDrawRouteLinesOnCanvas(canvas, map.value, pins.value)
              }
              // Rysuj markery trasy tylko jeśli wybrano checkbox
              if (pdfMapOptions.value.includes('routeMarkers')) {
                ctxDrawRouteMarkersOnCanvas(canvas, map.value, pins.value)
              }
              mapImgData = canvas.toDataURL('image/png')
              mapImgDims = { width: canvas.width, height: canvas.height }
            }
            // Przywróć widoczność linii i markerów
            polylines.value.forEach(l => l.setStyle({ opacity: 1 }))
            markers.value.forEach(m => m.setOpacity(1))
            exportPDF(routeName, mapImgData, mapImgDims)
            Loading.hide()
            pdfMapOptions.value = []
          })
        }, 400)
      })
    })
  } else {
    // (Brak gridLayers do usuwania w tym bloku)
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
    map.getPanes().overlayPane.appendChild(this._canvas)
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
    // (Usunięto rotację overlayPane – cała mapa obracana przez leaflet-rotate)
    // Pobierz rogi bounds mapy do nowej siatki
    const bounds = this._map.getBounds()
    const sw = bounds.getSouthWest()
    const ne = bounds.getNorthEast()
    this._canvas.style.transform = 'none'
    // Ensure canvas matches map size
    const size = this._map.getSize()
    if (this._canvas.width !== size.x || this._canvas.height !== size.y) {
      this._canvas.width = size.x
      this._canvas.height = size.y
    }
    const ctx = this._canvas.getContext('2d')
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    console.log('[MGRSGridLayer] _draw called, canvas size:', this._canvas.width, this._canvas.height)

    // --- STARA PĘTLA RYSUJĄCA SIATKĘ MGRS (UTM) ---
    /*
    let eCount = 0
    for (let e = minE; e <= maxE && eCount < maxSquares; e += 1000, eCount++) {
      let nCount = 0
      _draw: function () {
        // Draw vertical line (only once per easting)
        if (n === minN) {
          const latlng1 = utm.toLatLon(e, minN)
          const latlng2 = utm.toLatLon(e, maxN)
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
          _draw: function () {
            const zoom = this._map.getZoom();
            if (zoom >= 13 && (eastingLines.length < 6 || northingLines.length < 6)) {
          ctx.fillText(label, p2.x, p2.y + 12)
          ctx.restore()
        }
        // Draw horizontal line (only once per northing)
            _draw: function () {
              const zoom = this._map.getZoom();
              if (zoom >= 13 && (eastingLines.length < 6 || northingLines.length < 6)) {
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
    */

    // --- NOWA SIATKA: linie w zakresie bounds mapy (lat/lng) ---
    // Nowa siatka: linie co 1000m w układzie UTM
    // Ustal strefę UTM na podstawie środka mapy
    const center = this._map.getCenter()
    const utmCenter = utm.fromLatLon(center.lat, center.lng)
    const zoneNum = utmCenter.zoneNum
    const zoneLetter = utmCenter.zoneLetter
    // Przelicz rogi mapy do tej samej strefy UTM co środek
    const utmSW = utm.fromLatLon(sw.lat, sw.lng, zoneNum)
    const utmNE = utm.fromLatLon(ne.lat, ne.lng, zoneNum)
    const minE = Math.floor(Math.min(utmSW.easting, utmNE.easting) / 1000) * 1000
    const maxE = Math.ceil(Math.max(utmSW.easting, utmNE.easting) / 1000) * 1000
    const minN = Math.floor(Math.min(utmSW.northing, utmNE.northing) / 1000) * 1000
    const maxN = Math.ceil(Math.max(utmSW.northing, utmNE.northing) / 1000) * 1000
    const maxSquares = 50
    // pionowe linie (easting)
    const minEasting = 100000, maxEasting = 900000
    const minNorthing = 0, maxNorthing = 10000000
    let eCount = 0
    const zoom = this._map.getZoom()
    const eastingLines = []
    for (let e = minE; e < maxE && eCount < maxSquares; e += 1000, eCount++) {
      if (e < minEasting || e > maxEasting) continue
      eastingLines.push(e)
      // Rysuj pionową linię
      const latlng1 = utm.toLatLon(e, minN, zoneNum, zoneLetter)
      const latlng2 = utm.toLatLon(e, maxN, zoneNum, zoneLetter)
      if (!latlng1 || !latlng2 || isNaN(latlng1.latitude) || isNaN(latlng1.longitude) || isNaN(latlng2.latitude) || isNaN(latlng2.longitude)) continue
      const p1 = this._map.latLngToContainerPoint([latlng1.latitude, latlng1.longitude])
      const p2 = this._map.latLngToContainerPoint([latlng2.latitude, latlng2.longitude])
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
      ctx.restore()
    }
    let nCount = 0
    const northingLines = []
    for (let n = minN; n < maxN && nCount < maxSquares; n += 1000, nCount++) {
      if (n < minNorthing || n > maxNorthing) continue
      northingLines.push(n)
      // Rysuj poziomą linię
      const latlng1 = utm.toLatLon(minE, n, zoneNum, zoneLetter)
      const latlng2 = utm.toLatLon(maxE, n, zoneNum, zoneLetter)
      if (!latlng1 || !latlng2 || isNaN(latlng1.latitude) || isNaN(latlng1.longitude) || isNaN(latlng2.latitude) || isNaN(latlng2.longitude)) continue
      const p1 = this._map.latLngToContainerPoint([latlng1.latitude, latlng1.longitude])
      const p2 = this._map.latLngToContainerPoint([latlng2.latitude, latlng2.longitude])
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
      ctx.restore()
    }

    // Etykiety na środkach boków kwadratu tylko jeśli liczba linii < 6
    if (zoom >= 13 && (eastingLines.length < 6 || northingLines.length < 6)) {
      for (let i = 0; i < eastingLines.length - 1; i++) {
        for (let j = 0; j < northingLines.length - 1; j++) {
          const e1 = eastingLines[i]
          const e2 = eastingLines[i + 1]
          const n1 = northingLines[j]
          const n2 = northingLines[j + 1]
          // Środek dolnej krawędzi
          const latlngBottom = utm.toLatLon((e1 + e2) / 2, n1, zoneNum, zoneLetter)
          const pBottom = this._map.latLngToContainerPoint([latlngBottom.latitude, latlngBottom.longitude])
          // Środek górnej krawędzi
          const latlngTop = utm.toLatLon((e1 + e2) / 2, n2, zoneNum, zoneLetter)
          const pTop = this._map.latLngToContainerPoint([latlngTop.latitude, latlngTop.longitude])
          // Środek lewej krawędzi
          const latlngLeft = utm.toLatLon(e1, (n1 + n2) / 2, zoneNum, zoneLetter)
          const pLeft = this._map.latLngToContainerPoint([latlngLeft.latitude, latlngLeft.longitude])
          // Środek prawej krawędzi
          const latlngRight = utm.toLatLon(e2, (n1 + n2) / 2, zoneNum, zoneLetter)
          const pRight = this._map.latLngToContainerPoint([latlngRight.latitude, latlngRight.longitude])
          // Etykieta dolna: n1
          const labelN1 = String(Math.floor(n1 / 1000)).padStart(2, '0').slice(-2)
          ctx.save()
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillStyle = '#008800'
          ctx.font = 'bold 12px Arial'
          ctx.fillText(labelN1, pBottom.x, pBottom.y + 2)
          ctx.restore()
          // Etykieta górna: n2
          const labelN2 = String(Math.floor(n2 / 1000)).padStart(2, '0').slice(-2)
          ctx.save()
          ctx.textAlign = 'center'
          ctx.textBaseline = 'bottom'
          ctx.fillStyle = '#008800'
          ctx.font = 'bold 12px Arial'
          ctx.fillText(labelN2, pTop.x, pTop.y - 2)
          ctx.restore()
          // Etykieta lewa: e1
          const labelE1 = String(Math.floor(e1 / 1000)).padStart(2, '0').slice(-2)
          ctx.save()
          ctx.textAlign = 'right'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = '#008800'
          ctx.font = 'bold 12px Arial'
          ctx.fillText(labelE1, pLeft.x - 12, pLeft.y)
          ctx.restore()
          // Etykieta prawa: e2
          const labelE2 = String(Math.floor(e2 / 1000)).padStart(2, '0').slice(-2)
          ctx.save()
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = '#008800'
          ctx.font = 'bold 12px Arial'
          ctx.fillText(labelE2, pRight.x + 12, pRight.y)
          ctx.restore()
        }
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

// Ustawia orientację mapy na północ (jeśli obsługiwane)
// function resetNorthUp () {
//   if (!map.value) return
//   // Leaflet domyślnie nie obsługuje rotacji mapy, ale jeśli jest plugin do rotacji:
//   if (typeof map.value.setBearing === 'function') {
//     map.value.setBearing(0)
//     $q.notify({ type: 'positive', message: 'Północ ustawiona u góry.' })
//   } else {
//     $q.notify({ type: 'info', message: 'Mapa jest już zorientowana na północ (Leaflet).' })
//   }
// }

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
  map.value = L.map('march-map', { renderer: L.canvas() }).setView([52.2297, 21.0122], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19
  }).addTo(map.value)

  // Funkcja do automatycznego ustawiania bearing mapy zgodnie z kierunkiem UTM
  function updateMapBearingToUtm () {
    const center = map.value.getCenter()
    const utmCenter = utm.fromLatLon(center.lat, center.lng)
    // Punkt 1km na północ w tej samej strefie
    const utmNorthEasting = utmCenter.easting
    const utmNorthNorthing = utmCenter.northing + 1000
    const latlngNorth = utm.toLatLon(utmNorthEasting, utmNorthNorthing, utmCenter.zoneNum, utmCenter.zoneLetter)
    const dLat = latlngNorth.latitude - center.lat
    const dLng = latlngNorth.longitude - center.lng
    const angleRad = Math.atan2(dLng, dLat)
    const angleDeg = -angleRad * 180 / Math.PI
    if (typeof map.value.setBearing === 'function') {
      map.value.setBearing(angleDeg)
      // Opcjonalnie: log do debugowania
      console.log('[Leaflet.Rotate] Ustawiono bearing mapy:', angleDeg)
    }
  }

  // Ustaw bearing na starcie i po każdym ruchu/zoomie
  map.value.on('moveend zoomend', updateMapBearingToUtm)
  // Ustaw od razu po inicjalizacji
  setTimeout(updateMapBearingToUtm, 500)
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
  // Prosta funkcja debounce
  function debounce (fn, delay) {
    let timeout
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => fn.apply(this, args), delay)
    }
  }

  // Debounce dla generowania siatki MGRS po zoomend/moveend/resize
  const debouncedMgrsGrid = debounce(() => {
    if (showMgrsGrid.value && map.value) {
      // Usuwamy starą warstwę jeśli istnieje
      if (map.value._mgrsGridLayer) {
        map.value.removeLayer(map.value._mgrsGridLayer)
        map.value._mgrsGridLayer = null
      }
      // Dodajemy nową warstwę, która pokrywa cały widoczny obszar mapy
      const layers = drawMgrsGrid(map.value, true)
      if (layers && layers.length > 0) {
        map.value._mgrsGridLayer = layers[0]
      }
    }
  }, 200)
  map.value.on('zoomend moveend resize', debouncedMgrsGrid)
})

// Add this function if missing
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

watch(showPdfDialog, (val) => {
  if (val) {
    pdfMapOptions.value = []
  }
})

// Resetowanie trybu po zmianie inputMode
watch(inputMode, (val, oldVal) => {
  if (val !== oldVal) {
    pinMode.value = false
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
