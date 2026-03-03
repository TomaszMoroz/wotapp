<!-- eslint-disable camelcase -->
<template>
  <q-page class="q-pa-md flex row">
    <div class="march-main-container q-mx-auto" :style="mainContainerStyle">
      <BackNav color="black" parentPath="/tools" />
      <div class="text-h5 text-center q-mb-md flex items-center justify-center">
        Tabela marszu
        <q-btn flat round dense icon="info_outline" class="q-ml-sm" @click="showInfoDialog = true" aria-label="Instrukcja" />
      </div>
      <div class="row items-start justify-center">
        <div class="flex column" :class="isMobile ? 'col-12' : ''" style="width:100%;">
          <div class="q-mb-md column q-gutter-sm">
            <!-- ...istniejące filtry, przyciski, dialogi... -->
            <div class="row items-center q-gutter-xs">
              <q-input v-model="search" label="Wyszukaj teren (nazwa lub MGRS)" outlined dense @keyup.enter="searchArea" class="col" />
              <q-select
                v-model="selectedMapLayer"
                :options="mapLayerOptions"
                dense outlined emit-value map-options
                style="min-width:120px;max-width:180px;"
                :dropdown-icon="'layers'"
                aria-label="Wybierz warstwę mapy"
                class="col-auto q-ml-sm"
              />
            </div>
            <div class="row items-center q-gutter-xs">
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
              <q-btn flat dense round icon="palette" class="q-ml-xs" @click="showPaletteDialog = true" aria-label="Kolory" />
              <q-dialog v-model="showPaletteDialog">
                <q-card style="min-width:340px;max-width:95vw;">
                  <q-card-section class="text-h6">Dostosuj kolory mapy</q-card-section>
                  <q-card-section>
                    <div class="q-mb-md">
                      <div v-for="(item, idx) in paletteItems" :key="item.key" class="row items-center q-gutter-sm q-mb-sm">
                        <span class="col">{{ item.label }}</span>
                        <div
                          class="col-auto cursor-pointer"
                          :style="`width:32px;height:32px;border-radius:6px;border:2px solid #ccc;background:${item.color}`"
                          @click="openColorPicker(idx)"
                        ></div>
                      </div>
                    </div>
                    <q-dialog v-model="showColorPickerDialog">
                      <q-card style="min-width:220px;max-width:95vw;">
                        <q-card-section class="text-h6">Wybierz kolor</q-card-section>
                        <q-card-section>
                          <q-color v-model="paletteItems[selectedPaletteIdx].color" format="hex" panel="palette" @update:model-value="onPaletteColorChange" />
                        </q-card-section>
                        <q-card-actions align="right">
                          <q-btn flat label="OK" color="primary" v-close-popup />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn flat label="Zamknij" color="primary" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </div>
          <div id="march-map"
            :style="isMobile ? 'height: 60vh; min-height: 320px; max-height: 80vh' : 'height: 600px'"
            style="width:100%;border-radius:8px;overflow:hidden;"
            class="q-mb-md"
          ></div>
          <div class="q-mb-md row items-center" :class="!isMobile ? 'q-gutter-xs' : 'wrap q-gutter-sm'">
            <q-btn label="Dodaj punkt" color="green-7" @click="handleAddPoint" :disable="false" class="q-mr-md" />
            <q-dialog v-model="showGridDialog">
              <q-card style="min-width:320px;max-width:95vw;">
                <q-card-section class="text-h6">Dodaj punkt przez grid MGRS</q-card-section>
                <q-card-section>
                  <div class="q-mb-md">
                    <q-input v-model="mgrsPrefix" label="Prefix MGRS (np. 34UEC)" dense outlined />
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
            <q-btn label="Dodaj pkt spec." color="blue-7" @click="showSpecialDialog = true" :disable="false" class="q-mr-md" />
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
                  <div v-if="inputMode === 'grid' || showSpecialMgrsInputs">
                    <q-input v-model="specialMgrsPrefix" label="Prefix MGRS (np. 34UEC)" dense outlined class="q-mt-md" />
                    <q-input v-model="specialMgrsEasting" label="Easting (2–5 cyfr)" dense outlined maxlength="5" class="q-mt-md" />
                    <q-input v-model="specialMgrsNorthing" label="Northing (2–5 cyfr)" dense outlined maxlength="5" class="q-mt-md" />
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Anuluj" color="primary" v-close-popup />
                  <q-btn flat label="OK" color="primary" @click="handleSpecialDialogOk"
                    :disable="(inputMode === 'grid' || showSpecialMgrsInputs) && (!specialType || specialMgrsPrefix.length !== 5 || specialMgrsEasting.length < 2 || specialMgrsEasting.length > 5 || specialMgrsNorthing.length < 2 || specialMgrsNorthing.length > 5)"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-btn label="Usuń ostatni" color="red-9" @click="removeLastPin" :disable="pins.length === 0" class="q-mr-md" />
            <q-btn icon="file_download" color="primary" label="GPX" @click="exportGPX" :disable="pins.length < 2" class="q-mr-md" />
            <q-btn icon="access_time" color="secondary" @click="showEtaDialog = true" class="q-mr-md" />
            <q-btn icon="picture_as_pdf" color="grey-9" @click="showPdfDialog = true" class="q-mr-md" />
            <q-btn icon="delete" color="negative" @click="clearAll" />
          </div>

          <!-- Dialog wyboru typu punktu dla lokalizacji użytkownika -->
          <q-dialog v-model="showUserLocationDialog">
            <q-card style="min-width:320px;max-width:95vw;">
              <q-card-section class="text-h6">Dodaj swoją lokalizację</q-card-section>
              <q-card-section>
                <p>Wybierz jak chcesz dodać obecną lokalizację do tabeli marszu:</p>
              </q-card-section>
              <q-card-actions vertical>
                <q-btn label="Dodaj jako punkt trasy" color="primary" @click="addUserLocationAsRoute" class="full-width" />
                <q-btn label="Dodaj jako punkt specjalny" color="blue-7" @click="addUserLocationAsSpecial" class="full-width" />
                <q-btn label="Anuluj" flat color="grey" v-close-popup class="full-width" />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- Tabele marszu pod mapą na desktopie -->
          <div v-if="!isMobile">
            <q-table
              v-if="routeTable.length > 0"
              :rows="routeTable"
              :columns="columns"
              row-key="id"
              flat
              dense
              class="march-table-bg shadow-1 q-mb-md"
            >
              <template v-slot:body-cell-uwagi="props">
                <q-td :props="props">
                  <q-input
                    v-model="routeTable[props.rowIndex].uwagi"
                    dense
                    borderless
                    type="textarea"
                    autogrow
                    style="white-space: pre-line; word-break: break-word; min-width: 120px; max-width: 100%;"
                  />
                </q-td>
              </template>
            </q-table>
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
          <!-- Tabele marszu z boku na mobile -->
          <div v-else>
              <q-table
                v-if="routeTable.length > 0"
                :rows="routeTable"
                :columns="columns"
                row-key="id"
                flat
                dense
                class="march-table-bg shadow-1 q-mb-md"
                :dark="$q.dark.isActive || themeClass === 'theme-dark'"
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
                :dark="$q.dark.isActive || themeClass === 'theme-dark'"
              />
          </div>
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
              <li><b>Wybór warstwy mapy:</b> Nad mapą znajduje się rozwijany selektor, który pozwala przełączać pomiędzy warstwami: OpenStreetMap, Topograficzna, Satelitarna. Zmiana warstwy natychmiast aktualizuje widok mapy.</li>
              <li><b>Dostosowanie kolorów elementów mapy:</b> Kliknij ikonę palety obok przełącznika trybu punktów, aby otworzyć dialog zmiany kolorów. Możesz wybrać kolor siatki MGRS, linii marszu oraz markerów trasy. Po kliknięciu w kwadratowy podgląd koloru pojawi się paleta kolorów. Zmiana koloru natychmiast aktualizuje widok mapy i eksportowane pliki.</li>
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
import { ref, onMounted, onBeforeUnmount, reactive, computed, watchEffect, watch, nextTick } from 'vue'
import { useQuasar } from 'quasar'
import * as mgrs from 'mgrs'
import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import leafletImage from 'leaflet-image'
import * as utm from 'utm'

const $q = useQuasar()

const showLoading = (message) => {
  if ($q?.loading?.show) {
    $q.loading.show({ message })
  }
}

const hideLoading = () => {
  if ($q?.loading?.hide) {
    $q.loading.hide()
  }
}

// Ikony SVG z public/icons/
// Dialog do wpisywania gridów
const showGridDialog = ref(false)
const mgrsPrefix = ref('')
const mgrsEasting = ref('')
const mgrsNorthing = ref('')

const isLayerLoading = ref(false)
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

// Lokalizacja użytkownika
const userLocationMarker = ref(null)
const userLocation = ref(null)
const showUserLocationDialog = ref(false)

const showInfoDialog = ref(false)
// --- Special Points State ---
const showSpecialDialog = ref(false)
const showSpecialMgrsInputs = ref(false)
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
  if (inputMode.value === 'grid' || showSpecialMgrsInputs.value) {
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
      showSpecialMgrsInputs.value = false
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
  // Resetuj flagę gdy dialog jest zamykany
  if (!val) {
    showSpecialMgrsInputs.value = false
  }
})

const columns = [
  { name: 'lp', label: 'Lp.', field: 'lp', align: 'left' },
  { name: 'mgrs', label: 'MGRS', field: 'mgrs', align: 'left' },
  { name: 'azymut', label: 'Azymut', field: 'azymut', align: 'left' },
  { name: 'odleglosc', label: 'Odległość (m)', field: 'odleglosc', align: 'left' },
  { name: 'uwagi', label: 'Uwagi', field: 'uwagi', align: 'left' }
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

const showPaletteDialog = ref(false)
const showColorPickerDialog = ref(false)
const selectedPaletteIdx = ref(0)
const paletteItems = reactive([
  { key: 'mgrs', label: 'Siatka MGRS', color: '#008800' },
  { key: 'route', label: 'Linie marszu', color: '#888888' },
  { key: 'marker', label: 'Markery trasy', color: '#808080' }
])
const colorMgrsGrid = ref(paletteItems[0].color)
const colorRouteLine = ref(paletteItems[1].color)
const colorRouteMarker = ref(paletteItems[2].color)

function openColorPicker (idx) {
  selectedPaletteIdx.value = idx
  showColorPickerDialog.value = true
}

function onPaletteColorChange (val) {
  // Synchronizuj kolory z resztą aplikacji
  colorMgrsGrid.value = paletteItems[0].color
  colorRouteLine.value = paletteItems[1].color
  colorRouteMarker.value = paletteItems[2].color
  updateColorsInEditor()
  // Synchronizuj z edytorem trasy (np. podgląd, mapy, markery)
  if (selectedPaletteIdx.value === 0) {
    // Siatka MGRS
    colorMgrsGrid.value = val
  } else if (selectedPaletteIdx.value === 1) {
    // Linie marszu
    colorRouteLine.value = val
  } else if (selectedPaletteIdx.value === 2) {
    // Markery trasy
    colorRouteMarker.value = val
  }
  updateColorsInEditor()
}

// Dynamiczna maska koloru markerów SVG przez CSS filter
watch(colorRouteMarker, (val) => {
  const styleTagId = 'dynamic-marker-filter-style'
  let styleTag = document.getElementById(styleTagId)
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = styleTagId
    document.head.appendChild(styleTag)
  }
  // Filter: czarny SVG + maska koloru
  styleTag.textContent = `.leaflet-marker-icon[src$='.svg'] { filter: brightness(0) saturate(100%) sepia(1) hue-rotate(0deg) drop-shadow(0 0 0 ${val}); }`
})

function updateColorsInEditor () {
  // Zmień kolor siatki MGRS
  if (map.value && map.value._mgrsGridLayer) {
    const gridLayer = map.value._mgrsGridLayer
    // Przerysuj kafle siatki z nowym kolorem
    if (gridLayer._tiles) {
      Object.values(gridLayer._tiles).forEach(tileObj => {
        const tile = tileObj.el
        if (tile && tile.getContext) {
          const ctx = tile.getContext('2d')
          ctx.clearRect(0, 0, tile.width, tile.height)
        }
      })
      gridLayer.redraw && gridLayer.redraw()
    }
  }
  // Zmień kolor linii marszu
  polylines.value.forEach(l => {
    if (l.setStyle) l.setStyle({ color: colorRouteLine.value })
    if (l.setStyle && l.options && l.options.radius) {
      l.setStyle({ fillColor: colorRouteMarker.value, color: colorRouteMarker.value })
    }
  })
}

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

// Prosta funkcja debounce
function debounce (fn, delay) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Debounce dla generowania siatki MGRS i rerenderowania elementów mapy
const debouncedMapRerender = debounce(() => {
  if (!map.value) return
  if (showMgrsGrid.value) {
    // Siatka MGRS
    if (map.value._mgrsGridLayer) {
      map.value.removeLayer(map.value._mgrsGridLayer)
      map.value._mgrsGridLayer = null
    }
    const overlayPane = map.value.getPanes().overlayPane
    if (overlayPane) {
      Array.from(overlayPane.querySelectorAll('canvas.leaflet-mgrs-grid')).forEach(c => c.remove())
    }
    const layers = drawMgrsGrid(map.value, false)
    if (layers && layers.length > 0) {
      map.value._mgrsGridLayer = layers[0]
    }
    setTimeout(() => {
      const overlayPane2 = map.value.getPanes().overlayPane
      const mgrsCanvas = overlayPane2 && overlayPane2.querySelector('canvas.leaflet-mgrs-grid')
      if (!mgrsCanvas && showMgrsGrid.value) {
        if (map.value._mgrsGridLayer) {
          map.value.removeLayer(map.value._mgrsGridLayer)
          map.value._mgrsGridLayer = null
        }
        const layers2 = drawMgrsGrid(map.value, false)
        if (layers2 && layers2.length > 0) {
          map.value._mgrsGridLayer = layers2[0]
        }
      }
    }, 400)
  }
  rerenderMapElements()
}, 650)

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

// Centralny rerender wszystkich elementów mapy
function rerenderMapElements () {
  if (!map.value) return
  // Usuń markery trasy
  markers.value.forEach(marker => {
    try { map.value.removeLayer(marker) } catch (e) {}
  })
  markers.value = []
  // Dodaj markery trasy
  pins.value.forEach((p, idx) => {
    let icon = iconPin
    if (idx === 0) icon = iconHome
    else if (idx === pins.value.length - 1) icon = iconFlag
    const marker = L.marker([p.lat, p.lng], { icon }).addTo(map.value)
    markers.value.push(marker)
  })
  // Usuń i dodaj markery specjalne
  pointHistory.value.forEach(entry => {
    if (entry.type === 'special' && entry.marker) {
      try { map.value.removeLayer(entry.marker) } catch (e) {}
    }
  })
  specialPoints.value.forEach((pt, idx) => {
    let icon = iconOther
    if (pt.type === 'PZPR') icon = iconPzpr
    else if (pt.type === 'MEDEVAC') icon = iconMedevac
    else if (pt.type === 'OP') icon = iconOp
    else if (pt.type === 'BAZA') icon = iconBaza
    const marker = L.marker([pt.lat, pt.lng], { icon }).addTo(map.value)
    pointHistory.value.push({ type: 'special', marker, idx })
  })
  // Usuń i dodaj linie trasy
  polylines.value.forEach(l => map.value && map.value.removeLayer(l))
  polylines.value = []
  if (pins.value.length > 1) {
    const latlngs = pins.value.map(p => [p.lat, p.lng])
    const polyline = L.polyline(latlngs, { color: colorRouteLine.value || '#888', weight: 2 }).addTo(map.value)
    polylines.value.push(polyline)
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
}

function clearAll () {
  // Usuń wszystkie markery trasowe z mapy
  if (map.value) {
    markers.value.forEach(marker => {
      try { map.value.removeLayer(marker) } catch (e) {}
    })
    // Usuń wszystkie markery specjalne z mapy
    pointHistory.value.forEach(entry => {
      if (entry.marker) {
        try { map.value.removeLayer(entry.marker) } catch (e) {}
      }
    })
    // Usuń wszystkie linie z mapy
    polylines.value.forEach(l => {
      try { map.value.removeLayer(l) } catch (e) {}
    })
    // Usuń marker lokalizacji użytkownika
    if (userLocationMarker.value) {
      try { map.value.removeLayer(userLocationMarker.value) } catch (e) {}
      userLocationMarker.value = null
      userLocation.value = null
    }
  }
  pins.value = []
  specialPoints.value = []
  routeTable.value = []
  markers.value = []
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
        userLocation.value = { lat: latitude, lng: longitude }

        // Usuń stary marker lokalizacji użytkownika, jeśli istnieje
        if (userLocationMarker.value) {
          map.value.removeLayer(userLocationMarker.value)
          userLocationMarker.value = null
        }

        map.value.setView([latitude, longitude], 15, { animate: false })
        // Wymuś przeliczenie rozmiaru mapy i ponowne rysowanie siatki po centrowaniu
        setTimeout(() => {
          map.value.invalidateSize()
          // Odśwież markery i linie po przeliczeniu rozmiaru mapy
          markers.value.forEach(marker => {
            try { map.value.removeLayer(marker) } catch (e) {}
          })
          markers.value = []
          pins.value.forEach((p, idx) => {
            let icon = iconPin
            if (idx === 0) icon = iconHome
            else if (idx === pins.value.length - 1) icon = iconFlag
            const marker = L.marker([p.lat, p.lng], { icon }).addTo(map.value)
            markers.value.push(marker)
          })
          // Usuwamy i rysujemy ponownie markery specjalne
          pointHistory.value.forEach(entry => {
            if (entry.type === 'special' && entry.marker) {
              try { map.value.removeLayer(entry.marker) } catch (e) {}
            }
          })
          specialPoints.value.forEach((pt, idx) => {
            let icon = iconOther
            if (pt.type === 'PZPR') icon = iconPzpr
            else if (pt.type === 'MEDEVAC') icon = iconMedevac
            else if (pt.type === 'OP') icon = iconOp
            else if (pt.type === 'BAZA') icon = iconBaza
            const marker = L.marker([pt.lat, pt.lng], { icon }).addTo(map.value)
            pointHistory.value.push({ type: 'special', marker, idx })
          })
          polylines.value.forEach(l => map.value && map.value.removeLayer(l))
          polylines.value = []
          if (pins.value.length > 1) {
            const latlngs = pins.value.map(p => [p.lat, p.lng])
            const polyline = L.polyline(latlngs, { color: colorRouteLine.value || '#888', weight: 2 }).addTo(map.value)
            polylines.value.push(polyline)
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
          // Reset transformacji canvasu siatki MGRS
          const overlayPane = map.value.getPanes().overlayPane
          if (overlayPane) {
            overlayPane.style.transform = 'none'
          }
          if (map.value._mgrsGridLayer && map.value._mgrsGridLayer._canvas) {
            map.value._mgrsGridLayer._canvas.style.transform = 'none'
          }
          if (map.value._mgrsGridLayer && typeof map.value._mgrsGridLayer._draw === 'function') {
            map.value._mgrsGridLayer._draw()
          }

          // Dodaj marker lokalizacji użytkownika z pulsującym efektem
          const pulsingIcon = L.divIcon({
            className: 'user-location-marker',
            html: '<div class="pulse-ring"></div><div class="pulse-dot"></div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })

          userLocationMarker.value = L.marker([latitude, longitude], { icon: pulsingIcon }).addTo(map.value)

          // Dodaj event listener na kliknięcie markera
          userLocationMarker.value.on('click', () => {
            showUserLocationDialog.value = true
          })
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

function addUserLocationAsRoute () {
  if (!userLocation.value) return
  addPinToRoute(userLocation.value.lat, userLocation.value.lng)
  showUserLocationDialog.value = false
  $q.notify({ type: 'positive', message: 'Dodano lokalizację jako punkt trasy' })
}

async function addUserLocationAsSpecial () {
  if (!userLocation.value) return
  showUserLocationDialog.value = false

  // Przekonwertuj lokalizację na MGRS
  const mgrsData = { prefix: '', easting: '', northing: '' }
  try {
    const mgrsStr = mgrs.forward([userLocation.value.lng, userLocation.value.lat], 5)
    mgrsData.prefix = mgrsStr.slice(0, 5)
    mgrsData.easting = mgrsStr.slice(5, 10)
    mgrsData.northing = mgrsStr.slice(10, 15)
  } catch (e) {
    console.error('Błąd konwersji MGRS:', e)
    $q.notify({ type: 'negative', message: 'Błąd konwersji współrzędnych na MGRS' })
    return
  }

  // Ustaw wartości
  specialType.value = ''
  specialCustomName.value = ''
  specialMgrsPrefix.value = mgrsData.prefix
  specialMgrsEasting.value = mgrsData.easting
  specialMgrsNorthing.value = mgrsData.northing

  // Pokaż pola MGRS w dialogu
  showSpecialMgrsInputs.value = true

  // Czekaj na aktualizację DOM przed otwarciem dialogu
  await nextTick()

  // Pokaż dialog (watcher zadba o resetowanie flagi po zamknięciu)
  showSpecialDialog.value = true
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
    let utmE = '-'
    let utmN = '-'
    try {
      mgrsStr = mgrs.forward([pins.value[i].lng, pins.value[i].lat], 5)
      const utmRes = utm.fromLatLon(pins.value[i].lat, pins.value[i].lng)
      utmE = Math.round(utmRes.easting)
      utmN = Math.round(utmRes.northing)
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
      easting: utmE,
      northing: utmN,
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
  // Synchronize with editor route style
  // Use user-selected color
  const routeColor = (typeof colorRouteLine.value !== 'undefined' && colorRouteLine.value) ? colorRouteLine.value : '#888'
  const routeWidth = 2 // default, update if dynamic
  ctx.strokeStyle = routeColor
  ctx.lineWidth = routeWidth
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
  const markerColor = (typeof colorRouteMarker.value !== 'undefined' && colorRouteMarker.value) ? colorRouteMarker.value : 'grey'
  for (let i = 0; i < pins.length; i++) {
    const p = map.latLngToContainerPoint([pins[i].lat, pins[i].lng])
    ctx.beginPath()
    ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI)
    ctx.fillStyle = markerColor
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()
  }
  ctx.restore()
}
function handlePdfExport () {
  showPdfDialog.value = false
  showLoading('Generowanie PDF...')
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

    // leaflet-image wymaga iconUrl; tymczasowo usuń markery bez obrazka (np. divIcon)
    const detachedMarkers = []
    map.value.eachLayer(layer => {
      if (!(layer instanceof L.Marker)) return
      const iconUrl = layer?.options?.icon?.options?.iconUrl
      if (typeof iconUrl !== 'string' || iconUrl.length === 0) {
        if (map.value.hasLayer(layer)) {
          map.value.removeLayer(layer)
          detachedMarkers.push(layer)
        }
      }
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
            detachedMarkers.forEach(marker => marker.addTo(map.value))

            if (err) {
              $q.notify({ type: 'warning', message: 'Nie udało się dodać obrazu mapy do PDF. Zapisano dokument bez mapy.' })
            }

            exportPDF(routeName, mapImgData, mapImgDims)
            hideLoading()
            pdfMapOptions.value = []
          })
        }, 400)
      })
    })
  } else {
    // (Brak gridLayers do usuwania w tym bloku)
    exportPDF(routeName, null, null)
    hideLoading()
  }
}

// Helper to draw MGRS grid on a canvas
function drawMgrsGridOnCanvas (canvas, map, bounds) {
  const ctx = canvas.getContext('2d')
  ctx.font = 'bold 14px Arial'
  const gridColor = (typeof colorMgrsGrid.value !== 'undefined' && colorMgrsGrid.value) ? colorMgrsGrid.value : '#008800'
  ctx.fillStyle = gridColor
  // Wyznacz globalny zakres easting/northing dla widocznego obszaru mapy
  const sw = bounds.getSouthWest()
  const ne = bounds.getNorthEast()
  // Ustal dynamiczny krok siatki wg zoomu
  const zoom = map.getZoom ? map.getZoom() : 13
  let gridStep = 1000
  if (zoom < 6) gridStep = 10000
  if (zoom < 4) gridStep = 100000
  // Ustal zakres szerokości/długości
  const minLat = Math.min(sw.lat, ne.lat)
  const maxLat = Math.max(sw.lat, ne.lat)
  const minLng = Math.min(sw.lng, ne.lng)
  const maxLng = Math.max(sw.lng, ne.lng)
  // Próbkuj rogi i środek, aby znaleźć minimalny i maksymalny easting/northing oraz strefy
  let minE = Infinity, maxE = -Infinity, minN = Infinity, maxN = -Infinity
  let minZone = 60, maxZone = 1
  for (const lat of [minLat, maxLat]) {
    for (const lng of [minLng, maxLng]) {
      const utmPt = utm.fromLatLon(lat, lng)
      minE = Math.min(minE, utmPt.easting)
      maxE = Math.max(maxE, utmPt.easting)
      minN = Math.min(minN, utmPt.northing)
      maxN = Math.max(maxN, utmPt.northing)
      minZone = Math.min(minZone, utmPt.zoneNum)
      maxZone = Math.max(maxZone, utmPt.zoneNum)
    }
  }
  minE = Math.floor(minE / gridStep) * gridStep
  maxE = Math.ceil(maxE / gridStep) * gridStep
  minN = Math.floor(minN / gridStep) * gridStep
  maxN = Math.ceil(maxN / gridStep) * gridStep
  // Rysuj linie dla wszystkich stref UTM w zakresie
  const maxSquares = 100
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  // pionowe linie (easting) – zawsze od górnej do dolnej krawędzi mapy
  for (let zoneNum = minZone; zoneNum <= maxZone; zoneNum++) {
    for (let e = minE, eCount = 0; e <= maxE && eCount < maxSquares; e += gridStep, eCount++) {
      try {
        // Punkt na górnej krawędzi
        const utmTop = utm.fromLatLon(maxLat, minLng)
        const top = utm.toLatLon(e, utmTop.northing, zoneNum, 'N')
        // Punkt na dolnej krawędzi
        const utmBot = utm.fromLatLon(minLat, minLng)
        const bot = utm.toLatLon(e, utmBot.northing, zoneNum, 'N')
        ctx.save()
        ctx.strokeStyle = gridColor
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(top.lng, top.lat)
        ctx.lineTo(bot.lng, bot.lat)
        ctx.stroke()
        ctx.font = 'bold 14px Arial'
        ctx.fillText(String(Math.floor(e / gridStep)).padStart(2, '0').slice(-2), top.lng, 2)
        ctx.restore()
      } catch {}
    }
  }
  // poziome linie (northing) – zawsze od lewej do prawej krawędzi mapy
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  for (let zoneNum = minZone; zoneNum <= maxZone; zoneNum++) {
    for (let n = minN, nCount = 0; n <= maxN && nCount < maxSquares; n += gridStep, nCount++) {
      try {
        // Punkt na lewej krawędzi
        const utmLeft = utm.fromLatLon(minLat, minLng)
        const left = utm.toLatLon(utmLeft.easting, n, zoneNum, 'N')
        // Punkt na prawej krawędzi
        const utmRight = utm.fromLatLon(minLat, maxLng)
        const right = utm.toLatLon(utmRight.easting, n, zoneNum, 'N')
        ctx.save()
        ctx.strokeStyle = '#008800'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(left.lng, left.lat)
        ctx.lineTo(right.lng, right.lat)
        ctx.stroke()
        ctx.font = 'bold 14px Arial'
        ctx.fillText(String(Math.floor(n / gridStep)).padStart(2, '0').slice(-2), 18, left.lat)
        ctx.restore()
      } catch {}
    }
  }
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  // Usunięto stare, nieużywane fragmenty gridu (zoneNum/zoneLetter)
}

// Nowa warstwa siatki MGRS na bazie L.GridLayer
const MGRSGridLayer = L.GridLayer.extend({
  createTile: function (coords) {
    const tile = L.DomUtil.create('canvas', 'leaflet-mgrs-grid-tile')
    const size = this.getTileSize()
    tile.width = size.x
    tile.height = size.y
    const ctx = tile.getContext('2d')
    const map = this._map

    // Oblicz granice TEGO KONKRETNEGO KAFLA zamiast całej mapy
    const nwPoint = coords.scaleBy(size)
    const sePoint = nwPoint.add(size)
    const nw = map.unproject(nwPoint, coords.z)
    const se = map.unproject(sePoint, coords.z)

    const zoom = map.getZoom ? map.getZoom() : 13
    let gridStep = 1000
    if (zoom < 6) gridStep = 10000
    if (zoom < 4) gridStep = 100000

    // Użyj granic kafla zamiast całej mapy
    const minLat = Math.min(nw.lat, se.lat)
    const maxLat = Math.max(nw.lat, se.lat)
    const minLng = Math.min(nw.lng, se.lng)
    const maxLng = Math.max(nw.lng, se.lng)

    // Określ dominującą strefę UTM na podstawie środka kafla
    const centerLat = (minLat + maxLat) / 2
    const centerLng = (minLng + maxLng) / 2
    let dominantZone, dominantLetter
    try {
      const centerUtm = utm.fromLatLon(centerLat, centerLng)
      dominantZone = centerUtm.zoneNum
      dominantLetter = centerUtm.zoneLetter
    } catch {
      return tile // Jeśli nie można określić strefy, zwróć pusty kafel
    }

    // Sprawdź czy kafel przecina granicę strefy UTM
    const cornerZones = []
    const sampleCorners = [
      [minLat, minLng], [minLat, maxLng], [maxLat, minLng], [maxLat, maxLng]
    ]
    for (const [lat, lng] of sampleCorners) {
      try {
        const utmPt = utm.fromLatLon(lat, lng)
        if (!cornerZones.find(z => z.zoneNum === utmPt.zoneNum)) {
          cornerZones.push({ zoneNum: utmPt.zoneNum, zoneLetter: utmPt.zoneLetter })
        }
      } catch {}
    }
    const crossesZoneBoundary = cornerZones.length > 1

    // Oblicz zakres UTM dla tego kafla W DOMINUJĄCEJ STREFIE
    let minE = Infinity, maxE = -Infinity, minN = Infinity, maxN = -Infinity

    // Próbkuj punkty wzdłuż granic kafla dla dokładniejszego zakresu
    const samplePoints = [
      [minLat, minLng], [minLat, maxLng], [maxLat, minLng], [maxLat, maxLng],
      [(minLat + maxLat) / 2, minLng], [(minLat + maxLat) / 2, maxLng],
      [minLat, (minLng + maxLng) / 2], [maxLat, (minLng + maxLng) / 2]
    ]

    for (const [lat, lng] of samplePoints) {
      try {
        const utmPt = utm.fromLatLon(lat, lng, dominantZone)
        minE = Math.min(minE, utmPt.easting)
        maxE = Math.max(maxE, utmPt.easting)
        minN = Math.min(minN, utmPt.northing)
        maxN = Math.max(maxN, utmPt.northing)
      } catch {}
    }

    // Rozszerz zakres o dodatkowy gridStep dla pewności
    minE = Math.floor(minE / gridStep) * gridStep - gridStep
    maxE = Math.ceil(maxE / gridStep) * gridStep + gridStep
    minN = Math.floor(minN / gridStep) * gridStep - gridStep
    maxN = Math.ceil(maxN / gridStep) * gridStep + gridStep

    ctx.strokeStyle = (typeof colorMgrsGrid.value !== 'undefined' && colorMgrsGrid.value) ? colorMgrsGrid.value : '#008800'
    ctx.lineWidth = 1
    ctx.font = 'bold 13px Arial'
    ctx.fillStyle = (typeof colorMgrsGrid.value !== 'undefined' && colorMgrsGrid.value) ? colorMgrsGrid.value : '#008800'

    // Ustal jak często pokazywać etykiety w zależności od zoomu
    let labelFrequency = 1 // Pokaż każdą etykietę
    if (zoom < 8) {
      labelFrequency = 3 // Pokaż co trzecią
    } else if (zoom < 11) {
      labelFrequency = 2 // Pokaż co drugą
    }

    // Rysuj linie pionowe (easting)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    let eastingIndex = 0
    for (let e = minE; e <= maxE; e += gridStep) {
      const points = []
      // Generuj więcej punktów dla gładszej krzywej
      const nSteps = 20
      for (let i = 0; i <= nSteps; i++) {
        const n = minN + (maxN - minN) * (i / nSteps)
        try {
          const latlng = utm.toLatLon(e, n, dominantZone, dominantLetter)
          if (latlng.latitude >= minLat - 0.1 && latlng.latitude <= maxLat + 0.1 &&
              latlng.longitude >= minLng - 0.1 && latlng.longitude <= maxLng + 0.1) {
            points.push([latlng.latitude, latlng.longitude])
          }
        } catch {}
      }
      if (points.length > 1) {
        ctx.beginPath()
        const firstPoint = map.project(points[0], coords.z)
        ctx.moveTo(firstPoint.x - coords.x * size.x, firstPoint.y - coords.y * size.y)
        for (let i = 1; i < points.length; i++) {
          const p = map.project(points[i], coords.z)
          ctx.lineTo(p.x - coords.x * size.x, p.y - coords.y * size.y)
        }
        ctx.stroke()

        // Etykieta easting - szukaj przecięcia z górną krawędzią kafla
        const shouldShowLabel = eastingIndex % labelFrequency === 0
        if (shouldShowLabel) {
          for (let i = 0; i < points.length; i++) {
            const p = map.project(points[i], coords.z)
            const tileY = p.y - coords.y * size.y
            const tileX = p.x - coords.x * size.x
            // Jeśli punkt jest blisko górnej krawędzi (w zakresie 0-30px) i w granicach kafla
            if (tileY >= 0 && tileY <= 30 && tileX >= 10 && tileX <= size.x - 10) {
              const label = String(Math.floor(e / gridStep)).padStart(2, '0').slice(-2)
              ctx.fillText(label, tileX, 2)
              break
            }
          }
        }
        eastingIndex++
      }
    }

    // Rysuj linie poziome (northing)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    let northingIndex = 0
    for (let n = minN; n <= maxN; n += gridStep) {
      const points = []
      const eSteps = 20
      for (let i = 0; i <= eSteps; i++) {
        const e = minE + (maxE - minE) * (i / eSteps)
        try {
          const latlng = utm.toLatLon(e, n, dominantZone, dominantLetter)
          if (latlng.latitude >= minLat - 0.1 && latlng.latitude <= maxLat + 0.1 &&
              latlng.longitude >= minLng - 0.1 && latlng.longitude <= maxLng + 0.1) {
            points.push([latlng.latitude, latlng.longitude])
          }
        } catch {}
      }
      if (points.length > 1) {
        ctx.beginPath()
        const firstPoint = map.project(points[0], coords.z)
        ctx.moveTo(firstPoint.x - coords.x * size.x, firstPoint.y - coords.y * size.y)
        for (let i = 1; i < points.length; i++) {
          const p = map.project(points[i], coords.z)
          ctx.lineTo(p.x - coords.x * size.x, p.y - coords.y * size.y)
        }
        ctx.stroke()

        // Etykieta northing - szukaj przecięcia z lewą krawędzią kafla
        const shouldShowLabel = northingIndex % labelFrequency === 0
        if (shouldShowLabel) {
          for (let i = 0; i < points.length; i++) {
            const p = map.project(points[i], coords.z)
            const tileX = p.x - coords.x * size.x
            const tileY = p.y - coords.y * size.y
            // Jeśli punkt jest blisko lewej krawędzi (w zakresie 0-30px) i w granicach kafla
            if (tileX >= 0 && tileX <= 30 && tileY >= 10 && tileY <= size.y - 10) {
              const label = String(Math.floor(n / gridStep)).padStart(2, '0').slice(-2)
              ctx.fillText(label, 2, tileY)
              break
            }
          }
        }
        northingIndex++
      }
    }

    // Rysuj granice stref UTM jeśli kafel przecina granicę
    if (crossesZoneBoundary) {
      ctx.strokeStyle = '#FF0000'
      ctx.lineWidth = 2.5
      ctx.setLineDash([])

      // Rysuj pionową linię granicy strefy
      const zoneBoundaryPoints = []
      // Znajdź gdzie dokładnie przebiega granica (różnica w zoneNum)
      for (let latStep = 0; latStep <= 40; latStep++) {
        const lat = minLat + (maxLat - minLat) * (latStep / 40)
        // Próbkuj długości geograficzne aby znaleźć granicę
        for (let lngStep = 0; lngStep <= 40; lngStep++) {
          const lng = minLng + (maxLng - minLng) * (lngStep / 40)
          try {
            const utmHere = utm.fromLatLon(lat, lng)
            const utmNext = utm.fromLatLon(lat, lng + 0.001)
            // Jeśli zmienia się strefa, to jest granica
            if (utmHere.zoneNum !== utmNext.zoneNum) {
              zoneBoundaryPoints.push([lat, lng])
              break
            }
          } catch {}
        }
      }

      if (zoneBoundaryPoints.length > 1) {
        ctx.beginPath()
        const firstPt = map.project(zoneBoundaryPoints[0], coords.z)
        ctx.moveTo(firstPt.x - coords.x * size.x, firstPt.y - coords.y * size.y)
        for (let i = 1; i < zoneBoundaryPoints.length; i++) {
          const pt = map.project(zoneBoundaryPoints[i], coords.z)
          ctx.lineTo(pt.x - coords.x * size.x, pt.y - coords.y * size.y)
        }
        ctx.stroke()

        // Dodaj etykiety kwadratów 100km po obu stronach granicy
        if (zoom >= 8) {
          ctx.font = 'bold 16px Arial'
          ctx.fillStyle = '#FF0000'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          // Znajdź reprezentatywny punkt na granicy w środku kafla
          const midBoundaryIdx = Math.floor(zoneBoundaryPoints.length / 2)
          const [midLat, midLng] = zoneBoundaryPoints[midBoundaryIdx]

          // Punkt po lewej stronie granicy
          try {
            const leftLng = midLng - 0.01
            const leftMgrs = mgrs.forward([leftLng, midLat], 0) // 0 = tylko GZD + 100km
            const leftSquare = leftMgrs.slice(0, 5) // np. "34UEC"
            const leftPt = map.project([midLat, leftLng], coords.z)
            const leftX = leftPt.x - coords.x * size.x
            const leftY = leftPt.y - coords.y * size.y
            if (leftX >= 0 && leftX <= size.x && leftY >= 0 && leftY <= size.y) {
              ctx.fillText(leftSquare, leftX, leftY)
            }
          } catch {}

          // Punkt po prawej stronie granicy
          try {
            const rightLng = midLng + 0.01
            const rightMgrs = mgrs.forward([rightLng, midLat], 0)
            const rightSquare = rightMgrs.slice(0, 5) // np. "33UXV"
            const rightPt = map.project([midLat, rightLng], coords.z)
            const rightX = rightPt.x - coords.x * size.x
            const rightY = rightPt.y - coords.y * size.y
            if (rightX >= 0 && rightX <= size.x && rightY >= 0 && rightY <= size.y) {
              ctx.fillText(rightSquare, rightX, rightY)
            }
          } catch {}
        }
      }

      // Resetuj ustawienia rysowania
      ctx.setLineDash([])
      ctx.lineWidth = 1
    }

    return tile
  }
})

// Replace drawMgrsGrid to use the custom layer

function drawMgrsGrid (map, forPdf = false, retry = 0) {
  if (map._mgrsGridLayer) {
    try { map.removeLayer(map._mgrsGridLayer) } catch (e) {}
    map._mgrsGridLayer = null
  }
  // Sprawdź czy overlayPane istnieje
  const overlayPane = map.getPanes && map.getPanes().overlayPane
  if (!overlayPane) {
    if (retry < 5) {
      setTimeout(() => drawMgrsGrid(map, forPdf, retry + 1), 100)
    }
    return []
  }
  // Dodaj nową warstwę
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
  baseLayers = {
    osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19
    }),
    topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenTopoMap',
      maxZoom: 17
    }),
    sat: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 19
    })
  }
  baseLayer = baseLayers[selectedMapLayer.value]
  baseLayer.addTo(map.value)

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

  // Debounce dla generowania siatki MGRS i rerenderowania elementów mapy
  function debounce (fn, delay) {
    let timeout
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => fn.apply(this, args), delay)
    }
  }

  const debouncedMapRerender = debounce(() => {
    if (showMgrsGrid.value && map.value) {
      // ZAWSZE usuń starą warstwę i utwórz nową
      if (map.value._mgrsGridLayer) {
        map.value.removeLayer(map.value._mgrsGridLayer)
        map.value._mgrsGridLayer = null
      }
      const layers = drawMgrsGrid(map.value, false)
      if (layers && layers.length > 0) {
        map.value._mgrsGridLayer = layers[0]
      }
    } else if (map.value && map.value._mgrsGridLayer) {
      map.value.removeLayer(map.value._mgrsGridLayer)
      map.value._mgrsGridLayer = null
    }
    rerenderMapElements()
  }, 350)
  map.value.on('zoomend moveend resize', debouncedMapRerender)
  // Dodatkowo, jeśli kontener mapy zmienia rozmiar (np. parent resize), nasłuchuj na resize observer
  const mapContainer = document.getElementById('march-map')
  if (window.ResizeObserver && mapContainer) {
    const resizeObserver = new ResizeObserver(() => {
      debouncedMapRerender()
    })
    resizeObserver.observe(mapContainer)
  }
  // Rysuj siatkę od razu jeśli checkbox aktywny
  if (showMgrsGrid.value) debouncedMapRerender()
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
  if (last.type === 'pin') {
    // Usuń z pins
    if (last.idx >= 0 && last.idx < pins.value.length) {
      pins.value.splice(last.idx, 1)
    } else {
      // fallback: usuń ostatni jeśli coś się rozjechało
      pins.value.pop()
    }
    // Usuń marker z mapy
    if (last.marker && map.value) {
      try { map.value.removeLayer(last.marker) } catch (e) {}
    }
    // Usuń marker z tablicy markers (po referencji, nie po idx)
    const markerIdx = markers.value.indexOf(last.marker)
    if (markerIdx !== -1) markers.value.splice(markerIdx, 1)
    updateMarkerIcons()
    polylines.value.forEach(l => map.value && map.value.removeLayer(l))
    polylines.value = []
    calculateRoute()
  } else if (last.type === 'special') {
    if (last.idx >= 0 && last.idx < specialPoints.value.length) {
      specialPoints.value.splice(last.idx, 1)
    } else {
      specialPoints.value.pop()
    }
    if (last.marker && map.value) {
      try { map.value.removeLayer(last.marker) } catch (e) {}
    }
    if (specialPoints.value.length === 0) {
      specialPoints.value = []
    }
  }
}

const showMgrsGrid = ref(false)

watch(showMgrsGrid, (val) => {
  if (!map.value) return
  try {
    // Usuwamy starą warstwę jeśli istnieje
    if (map.value._mgrsGridLayer) {
      try { map.value.removeLayer(map.value._mgrsGridLayer) } catch (e) {}
      map.value._mgrsGridLayer = null
    }
    // Usuń wszystkie stare canvasy z overlayPane
    const overlayPane = map.value && map.value.getPanes && map.value.getPanes().overlayPane
    if (overlayPane) {
      Array.from(overlayPane.querySelectorAll('canvas.leaflet-mgrs-grid')).forEach(c => c.remove())
    }
    if (val) {
      // Dodajemy nową warstwę
      const layers = drawMgrsGrid(map.value, true)
      if (layers && layers.length > 0) {
        map.value._mgrsGridLayer = layers[0]
      }
    }
  } catch (err) {
    // Zabezpieczenie: nie blokuj UI
    map.value._mgrsGridLayer = null
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

const mapLayerOptions = [
  { label: 'OpenStreetMap', value: 'osm' },
  { label: 'Topograficzna', value: 'topo' },
  { label: 'Satelitarna', value: 'sat' }
]
const selectedMapLayer = ref('osm')
let baseLayer = null
let baseLayers = {}

// Eksport GPX
function exportGPX () {
  if (!pins.value || pins.value.length < 2) return
  let gpx = '<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="WOT" xmlns="http://www.topografix.com/GPX/1/1">\n<trk><name>Trasa marszu</name><trkseg>'
  pins.value.forEach(p => {
    gpx += `\n<trkpt lat="${p.lat}" lon="${p.lng}"></trkpt>`
  })
  gpx += '\n</trkseg></trk>\n</gpx>'
  const blob = new Blob([gpx], { type: 'application/gpx+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'trasa-marszu.gpx'
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}

watch(selectedMapLayer, (val, oldVal) => {
  if (map.value && baseLayers[val] && !isLayerLoading.value) {
    isLayerLoading.value = true
    showLoading('Ładowanie warstwy mapy...')
    if (baseLayer) map.value.removeLayer(baseLayer)
    baseLayer = baseLayers[val]
    baseLayer.addTo(map.value)
    // Nasłuchuj tileload i tileerror
    let loadedTiles = 0
    let errorTiles = 0
    let expectedTiles = 0
    const onTileLoad = () => {
      loadedTiles++
      if (loadedTiles + errorTiles >= expectedTiles) {
        finishLayerLoad()
      }
    }
    const onTileError = () => {
      errorTiles++
      if (loadedTiles + errorTiles >= expectedTiles) {
        finishLayerLoad()
      }
    }
    function finishLayerLoad () {
      baseLayer.off('tileload', onTileLoad)
      baseLayer.off('tileerror', onTileError)
      setTimeout(() => {
        map.value.invalidateSize()
        debouncedMapRerender()
        hideLoading()
        isLayerLoading.value = false
      }, 200)
    }
    // Określ liczbę kafelków do załadowania
    expectedTiles = Math.max(8, Math.floor(map.value.getSize().x / 256) * Math.floor(map.value.getSize().y / 256))
    baseLayer.on('tileload', onTileLoad)
    baseLayer.on('tileerror', onTileError)
    // Fallback: jeśli po 3s nie załadowało się nic, odblokuj
    setTimeout(() => {
      if (isLayerLoading.value) finishLayerLoad()
    }, 3000)
  }
})

// Dynamiczny styl kontenera mapy na desktopie
const mainContainerStyle = computed(() => {
  if (isMobile.value) return 'width:100%;max-width:100vw;'
  return 'width:95vw;max-width:2500px;'
})

// Automatyczne przeliczenie rozmiaru mapy po zmianie szerokości kontenera
let resizeObserver = null
onMounted(() => {
  const mapDiv = document.getElementById('march-map')
  if (mapDiv && map.value) {
    resizeObserver = new window.ResizeObserver(() => {
      map.value.invalidateSize()
    })
    resizeObserver.observe(mapDiv)
  }
})
onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect()
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
.theme-dark .march-table-bg,
.theme-dark .q-table,
.theme-dark .q-table th,
.theme-dark .q-table td {
  background: #232526 !important;
  color: #f2f2f2 !important;
  border-color: #444 !important;
}
.theme-dark .q-table thead th {
  background: #181a1b !important;
  color: #f2f2f2 !important;
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
  .row.items-center.no-wrap.q-gutter-xs > .row.items-center.no-wrap.q-gutter-xs.q-ml-md {
    flex-wrap: wrap;
    gap: 4px;
    margin-left: 0 !important;
  }
  .row.items-center.no-wrap.q-gutter-xs > .row.items-center.no-wrap.q-gutter-xs.q-ml-md > * {
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

<style>
/* Pulsujący marker lokalizacji użytkownika (niezależny od scoped) */
.user-location-marker {
  position: relative;
}

.pulse-dot {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #4285F4;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 8px rgba(66, 133, 244, 0.6);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  cursor: pointer;
}

.pulse-ring {
  position: absolute;
  width: 40px;
  height: 40px;
  background: rgba(66, 133, 244, 0.3);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse-animation 2s ease-out infinite;
  z-index: 1;
  cursor: pointer;
}

@keyframes pulse-animation {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}
</style>
