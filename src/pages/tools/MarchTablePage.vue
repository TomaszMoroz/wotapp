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
            <div class="row q-gutter-sm q-mb-sm">
              <div class="col-5">
                <q-input v-model="search" label="Wyszukaj teren (nazwa lub MGRS)" outlined dense @keyup.enter="searchArea" />
              </div>
              <div class="col-5">
                <q-select
                  v-model="selectedMapLayer"
                  :options="mapLayers"
                  label="Warstwa mapy"
                  dense outlined emit-value map-options
                  style="width:100%;"
                />
              </div>
            </div>
            <q-btn label="Pokaż teren" color="primary" class="q-my-sm" @click="searchArea" />
            <q-checkbox v-model="showMgrsGrid" label="Grid MGRS" color="green" class="q-ml-md" />
            <q-btn flat dense icon="my_location" label="Moje położenie" color="primary" class="q-ml-sm" @click="centerOnUserLocation" :disable="locating" aria-label="Ustaw na moją lokalizację" />
            <q-toggle
              v-model="inputMode"
              :label="inputMode === 'map' ? 'punkty na mapie' : 'wpisz gridy'"
              true-value="map"
              false-value="grid"
              color="primary"
              class="q-ml-md"
            />
              <q-btn dense flat icon="palette" class="color-btn q-ml-sm" @click="showGridColorDialog = true" :style="'color:' + gridColor.value" title="Kolor siatki MGRS" />
              <q-btn dense flat icon="timeline" class="color-btn q-ml-xs" @click="showRouteColorDialog = true" :style="'color:' + routeColor.value" title="Kolor linii trasy" />
              <q-btn dense flat icon="place" class="color-btn q-ml-xs" @click="showMarkerColorDialog = true" :style="'color:' + markerColor.value" title="Kolor markerów" />
              <q-dialog v-model="showGridColorDialog">
                <q-card style="min-width:260px;max-width:95vw;padding:16px 8px;">
                  <q-card-section class="text-h6">Kolor siatki MGRS</q-card-section>
                  <q-card-section class="q-pa-md flex flex-center">
                    <q-color v-model="gridColor" format="hex" style="min-width:180px;" />
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <q-dialog v-model="showRouteColorDialog">
                <q-card style="min-width:260px;max-width:95vw;padding:16px 8px;">
                  <q-card-section class="text-h6">Kolor linii trasy</q-card-section>
                  <q-card-section class="q-pa-md flex flex-center">
                    <q-color v-model="routeColor" format="hex" style="min-width:180px;" />
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <q-dialog v-model="showMarkerColorDialog">
                <q-card style="min-width:260px;max-width:95vw;padding:16px 8px;">
                  <q-card-section class="text-h6">Kolor markerów</q-card-section>
                  <q-card-section class="q-pa-md flex flex-center">
                    <q-color v-model="markerColor" format="hex" style="min-width:180px;" />
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>

            <!-- <q-btn flat dense icon="explore" color="primary" class="q-ml-sm" @click="resetNorthUp" aria-label="Północ u góry" /> -->
            <!-- Map layer select moved to end of row below -->
          </div>
          <div id="march-map"
            :style="isMobile ? 'height: 60vh; min-height: 320px; max-height: 80vh' : 'height: 600px'"
            style="width:100%;border-radius:8px;overflow:hidden;"
            class="q-mb-md"
          ></div>
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

// Kolory siatki i linii trasy
const showGridColorDialog = ref(false)
const showRouteColorDialog = ref(false)
const gridColor = ref('#008800')
const routeColor = ref('#888')
const showMarkerColorDialog = ref(false)
const markerColor = ref('#6666ff')

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

// Map layer options and switching logic
const mapLayers = [
  { label: 'OpenStreetMap', value: 'osm' },
  { label: 'OpenTopoMap', value: 'topo' },
  { label: 'ESRI Satellite', value: 'esri' }
]
const selectedMapLayer = ref('osm')
let currentTileLayer = null

function setMapLayer (layer) {
  if (!map.value) return
  if (currentTileLayer) {
    map.value.removeLayer(currentTileLayer)
  }
  if (layer === 'osm') {
    currentTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19
    })
  } else if (layer === 'topo') {
    currentTileLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenTopoMap',
      maxZoom: 17
    })
  } else if (layer === 'esri') {
    currentTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri',
      maxZoom: 19
    })
  }
  if (currentTileLayer) {
    currentTileLayer.addTo(map.value)
  }
}

watch(selectedMapLayer, (val) => {
  setMapLayer(val)
})

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
    const polyline = L.polyline(latlngs, { color: routeColor.value, weight: 2 }).addTo(map.value)
    polylines.value.push(polyline)
    // Add grey points on the line
    pins.value.forEach(p => {
      const greyDot = L.circleMarker([p.lat, p.lng], {
        radius: 4,
        color: markerColor.value,
        fillColor: markerColor.value,
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
  ctx.strokeStyle = (typeof routeColor.value !== 'undefined' && routeColor.value) ? routeColor.value : 'red'
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
  ctx.fillStyle = (typeof markerColor.value !== 'undefined' && markerColor.value) ? markerColor.value : 'grey'
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
  // Użyj zawsze aktualnych bounds mapy
  // const bounds = map.getBounds()
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
  // Draw vertical grid lines (easting) and labels
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
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
    // Label easting (na górze canvasu)
    ctx.font = 'bold 14px Arial'
    ctx.fillText(String(Math.floor(e / 1000)).padStart(2, '0').slice(-2), p1.x, 2)
    ctx.restore()
  }
  // Draw horizontal grid lines (northing) and labels
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
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
    // Label northing (po lewej canvasu)
    ctx.font = 'bold 14px Arial'
    ctx.fillText(String(Math.floor(n / 1000)).padStart(2, '0').slice(-2), 18, p1.y)
    ctx.restore()
  }
}

// --- GLOBALNA SIATKA MGRS JAKO POLYLINES I LABELKI ---
let mgrsGridPolylines = []
let mgrsGridLabels = []

function clearMgrsGridPolylines (map) {
  if (mgrsGridPolylines && mgrsGridPolylines.length) {
    mgrsGridPolylines.forEach(l => map.removeLayer(l))
    mgrsGridPolylines = []
  }
  if (mgrsGridLabels && mgrsGridLabels.length) {
    mgrsGridLabels.forEach(l => map.removeLayer(l))
    mgrsGridLabels = []
  }
}

function drawMgrsGrid (map) {
  clearMgrsGridPolylines(map)
  if (!showMgrsGrid.value) return
  const bounds = map.getBounds()
  const sw = bounds.getSouthWest()
  const ne = bounds.getNorthEast()
  // Ustal strefę UTM na podstawie środka widoku
  const center = map.getCenter()
  const utmCenter = utm.fromLatLon(center.lat, center.lng)
  const zoneNum = utmCenter.zoneNum
  const zoneLetter = utmCenter.zoneLetter
  // Przelicz rogi na UTM
  const utmSW = utm.fromLatLon(sw.lat, sw.lng, zoneNum)
  const utmNE = utm.fromLatLon(ne.lat, ne.lng, zoneNum)
  // Round easting/northing to 1km
  const minE = Math.floor(Math.min(utmSW.easting, utmNE.easting) / 1000) * 1000
  const maxE = Math.ceil(Math.max(utmSW.easting, utmNE.easting) / 1000) * 1000
  const minN = Math.floor(Math.min(utmSW.northing, utmNE.northing) / 1000) * 1000
  const maxN = Math.ceil(Math.max(utmSW.northing, utmNE.northing) / 1000) * 1000
  const maxSquares = 50
  // pionowe linie (easting)
  let eCount = 0
  const eastingLines = []
  for (let e = minE; e <= maxE && eCount < maxSquares; e += 1000, eCount++) {
    eastingLines.push(e)
  }
  // Adaptive label logic
  const lineCount = eastingLines.length
  let labelFontSize = 14
  let showLabels = false
  if (lineCount < 10) {
    showLabels = true
    labelFontSize = 14
  } else if (lineCount >= 10 && lineCount <= 30) {
    showLabels = true
    labelFontSize = 10
  } else {
    showLabels = false
  }
  for (let i = 0; i < eastingLines.length; i++) {
    const e = eastingLines[i]
    const latlng1 = utm.toLatLon(e, minN, zoneNum, zoneLetter)
    const latlng2 = utm.toLatLon(e, maxN, zoneNum, zoneLetter)
    const poly = L.polyline([
      [latlng1.latitude, latlng1.longitude],
      [latlng2.latitude, latlng2.longitude]
    ], { color: gridColor.value, weight: 1, opacity: 0.8, interactive: false, pane: 'overlayPane' })
    poly.addTo(map)
    mgrsGridPolylines.push(poly)
    // Rysuj etykiety tylko jeśli showLabels
    if (showLabels) {
      for (let n = minN; n < maxN; n += 1000) {
        const labelLatLng = utm.toLatLon(e, n + 500, zoneNum, zoneLetter)
        const label = String(Math.floor(e / 1000)).padStart(2, '0').slice(-2)
        const divIcon = L.divIcon({
          className: 'mgrs-grid-label mgrs-grid-label-e',
          html: `<span style='color:${gridColor.value};font-weight:bold;font-size:${labelFontSize}px;background:rgba(255,255,255,0.3);padding:1px 4px;border-radius:3px;'>${label}</span>`,
          iconSize: [28, 20],
          iconAnchor: [14, 10]
        })
        const marker = L.marker([labelLatLng.latitude, labelLatLng.longitude], { icon: divIcon, interactive: false, pane: 'overlayPane' })
        marker.addTo(map)
        mgrsGridLabels.push(marker)
      }
    }
  }
  // poziome linie (northing)
  let nCount = 0
  for (let n = minN; n <= maxN && nCount < maxSquares; n += 1000, nCount++) {
    const latlng1 = utm.toLatLon(minE, n, zoneNum, zoneLetter)
    const latlng2 = utm.toLatLon(maxE, n, zoneNum, zoneLetter)
    const poly = L.polyline([
      [latlng1.latitude, latlng1.longitude],
      [latlng2.latitude, latlng2.longitude]
    ], { color: gridColor.value, weight: 1, opacity: 0.8, interactive: false, pane: 'overlayPane' })
    poly.addTo(map)
    mgrsGridPolylines.push(poly)
    // Rysuj etykiety northing tylko jeśli showLabels
    if (showLabels) {
      for (let e = minE; e < maxE; e += 1000) {
        const labelLatLng = utm.toLatLon(e + 500, n, zoneNum, zoneLetter)
        const label = String(Math.floor(n / 1000)).padStart(2, '0').slice(-2)
        const divIcon = L.divIcon({
          className: 'mgrs-grid-label mgrs-grid-label-n',
          html: `<span style='color:${gridColor.value};font-weight:bold;font-size:${labelFontSize}px;background:rgba(255,255,255,0.3);padding:1px 4px;border-radius:3px;'>${label}</span>`,
          iconSize: [28, 20],
          iconAnchor: [14, 10]
        })
        const marker = L.marker([labelLatLng.latitude, labelLatLng.longitude], { icon: divIcon, interactive: false, pane: 'overlayPane' })
        marker.addTo(map)
        mgrsGridLabels.push(marker)
      }
    }
  }
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
  setMapLayer(selectedMapLayer.value)

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
    if (map.value) drawMgrsGrid(map.value)
  }, 120)
  map.value.on('zoomend moveend resize', debouncedMgrsGrid)
  // Dodatkowo, jeśli kontener mapy zmienia rozmiar (np. parent resize), nasłuchuj na resize observer
  const mapContainer = document.getElementById('march-map')
  if (window.ResizeObserver && mapContainer) {
    const resizeObserver = new ResizeObserver(() => {
      debouncedMgrsGrid()
    })
    resizeObserver.observe(mapContainer)
  }
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
  if (val) {
    drawMgrsGrid(map.value)
  } else {
    clearMgrsGridPolylines(map.value)
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

.color-btn {
  min-width: 36px;
  min-height: 36px;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.07);
  background: #f5f5f5; /* Quasar grey-1 */
  transition: box-shadow 0.2s;
}
.color-btn:hover {
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.13);
  background: #f5f5f5;
}
</style>
