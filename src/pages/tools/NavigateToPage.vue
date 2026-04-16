<template>
  <q-page class="navigate-page q-pa-md">
    <div class="navigate-shell">
      <BackNav color="black" parentPath="/tools" />

      <section class="navigate-hero q-mb-lg">
        <div>
          <div class="navigate-hero__eyebrow">Moduł terenowy</div>
          <h1 class="navigate-hero__title">Nawiguj do</h1>
          <p class="navigate-hero__subtitle">
            Ustaw punkt docelowy przez MGRS albo dotknięcie mapy. Aplikacja pokazuje pozycję urządzenia,
            linię do celu, odległość, azymut i status zbliżania.
          </p>
        </div>
      </section>

      <div class="row q-col-gutter-lg">
        <div class="col-12 col-lg-4">
          <q-card class="navigate-card q-mb-md" flat bordered>
            <q-card-section>
              <div class="text-h6">Cel</div>
              <div class="text-caption text-grey-6 q-mt-xs">Dodaj cel przez MGRS albo wskaż go na mapie.</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                v-model="targetInput"
                label="MGRS celu"
                dense outlined
                @keyup.enter="setTargetFromMgrs"
              />
              <div class="row q-gutter-sm q-mt-sm">
                <q-btn color="primary" label="Ustaw z MGRS" @click="setTargetFromMgrs" />
                <q-btn color="secondary" outline :label="pickMode ? 'Kliknij na mapie' : 'Wskaż na mapie'" @click="togglePickMode" />
              </div>
              <div class="row q-gutter-sm q-mt-sm">
                <q-btn flat color="grey-8" label="Użyj mojej lokalizacji" @click="centerOnDevice" :disable="!hasPosition" />
                <q-btn flat color="negative" label="Wyczyść cel" @click="clearTarget" :disable="!target" />
              </div>
            </q-card-section>
          </q-card>

          <q-card class="navigate-card q-mb-md" flat bordered>
            <q-card-section>
              <div class="text-h6">Status</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div v-if="hasPosition" class="q-gutter-y-sm">
                <div class="row items-center justify-between">
                  <span class="text-caption">Pozycja</span>
                  <q-chip dense square color="green-9" text-color="white">GPS aktywny</q-chip>
                </div>
                <div class="text-body2">{{ currentPosition.lat.toFixed(6) }}, {{ currentPosition.lng.toFixed(6) }}</div>
                <div class="text-caption">Dokładność: {{ Math.round(currentPosition.accuracy) }} m</div>
              </div>
              <div v-else class="text-caption text-grey-6">Brak pozycji urządzenia. Włącz lokalizację.</div>
              <q-separator class="q-my-md" />
              <div v-if="target">
                <div class="row items-center justify-between q-mb-sm">
                  <span class="text-caption">Cel</span>
                  <q-chip dense square color="green-8" text-color="white">{{ target.mgrs }}</q-chip>
                </div>
                <div class="text-body2">{{ targetLabel }}</div>
                <div class="text-caption text-grey-6 q-mt-xs">{{ target.note || 'Brak opisu' }}</div>
              </div>
              <div v-else class="text-caption text-grey-6">Nie ustawiono celu.</div>
              <q-separator class="q-my-md" />
              <div v-if="hasTarget && hasPosition" class="q-gutter-y-sm">
                <div class="row items-center justify-between">
                  <span class="text-caption">Odległość</span>
                  <q-badge color="primary" rounded>{{ distanceText }}</q-badge>
                </div>
                <div class="row items-center justify-between">
                  <span class="text-caption">Azymut</span>
                  <q-badge color="secondary" rounded>{{ bearingText }}</q-badge>
                </div>
                <div class="row items-center justify-between">
                  <span class="text-caption">Trend</span>
                  <q-badge :color="trendColor" rounded>{{ trendLabel }}</q-badge>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="navigate-card q-mb-md" flat bordered>
            <q-card-section>
              <div class="text-h6">Mapa</div>
              <div class="text-caption text-grey-6 q-mt-xs">Wybierz warstwę najlepiej dopasowaną do warunków terenowych.</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-select
                v-model="selectedMapLayer"
                :options="mapLayerOptions"
                label="Rodzaj mapy"
                dense outlined emit-value map-options
              />
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-lg-8">
          <q-card class="navigate-map-card" flat bordered>
            <q-card-section class="row items-center justify-between">
              <div>
                <div class="text-h6">Mapa nawigacji</div>
                <div v-if="!isMobile" class="text-caption text-grey-6">
                  Celem jest linia, a północ wskazuje stały kompas w rogu mapy.
                </div>
                <div v-else class="row items-center q-gutter-xs q-mt-xs">
                  <q-chip dense square color="primary" text-color="white">
                    {{ distanceText }}
                  </q-chip>
                  <q-chip dense square color="secondary" text-color="white">
                    {{ bearingText }}
                  </q-chip>
                  <q-btn
                    v-if="hasTarget && hasPosition && !showMobileStatsPanel"
                    dense flat round
                    icon="add"
                    color="grey-8"
                    class="mobile-stats-toggle-btn"
                    @click="showMobileStatsPanel = true"
                    aria-label="Pokaż panel odległości i azymutu"
                  />
                </div>
              </div>
              <div class="row items-center q-gutter-xs justify-end">
                <q-chip v-if="pickMode" dense square color="amber-8" text-color="white">
                  Tryb wyboru celu
                </q-chip>
                <q-btn
                  dense flat no-caps
                  color="grey-8"
                  icon="table_view"
                  label="Tabela marszu"
                  @click="goToMarchTable"
                />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-pa-none">
              <div class="map-wrap">
                <div id="navigate-map" :class="['navigate-map', { 'navigate-map--night': selectedMapLayer === 'night', 'navigate-map--tactical': themeMode === 'tactical' && selectedMapLayer !== 'night' }]" ></div>
                <div class="map-overlay map-overlay--north">
                  <div class="north-arrow">↑</div>
                  <div class="north-label">N</div>
                </div>
                <div class="map-overlay map-overlay--status" v-if="hasTarget && hasPosition && showMapStatusPanel">
                  <q-btn
                    v-if="isMobile"
                    dense flat round
                    icon="close"
                    color="grey-4"
                    class="map-overlay__close"
                    @click="showMobileStatsPanel = false"
                    aria-label="Ukryj panel odległości i azymutu"
                  />
                  <div class="text-caption text-grey-5">Odległość</div>
                  <div class="text-subtitle1">{{ distanceText }}</div>
                  <div class="text-caption text-grey-5 q-mt-sm">Azymut</div>
                  <div class="text-subtitle1">{{ bearingText }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import * as mgrs from 'mgrs'
import { useNavigationStore } from 'stores/navigation-store'
import { storeToRefs } from 'pinia'
import { useThemeStore } from 'stores/theme-store'

defineOptions({
  name: 'NavigateToPage'
})

const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const navigationStore = useNavigationStore()
const { themeMode } = storeToRefs(useThemeStore())

const isMobile = computed(() => $q.screen.lt.md)
const map = ref(null)
const currentPosition = ref(null)
const positionHistory = ref([])
const targetInput = ref('')
const target = ref(navigationStore.target || null)
const pickMode = ref(false)
const showMobileStatsPanel = ref(true)
const validMapLayers = ['osm', 'topo', 'tourist', 'night']
const selectedMapLayer = ref(validMapLayers.includes(route.query.mapLayer) ? route.query.mapLayer : 'osm')
const mapLayerOptions = [
  { label: 'Standardowa', value: 'osm' },
  { label: 'Topograficzna', value: 'topo' },
  { label: 'Turystyczna', value: 'tourist' },
  { label: 'Nocna', value: 'night' }
]
let watchId = null
let markerLayer = null
let baseLayer = null
let baseLayers = {}
const navigationRenderer = L.canvas({ padding: 0.5 })

function resolveBaseLayerKey (layerKey) {
  return layerKey === 'night' ? 'osm' : layerKey
}

function formatMeters (value) {
  if (!Number.isFinite(value)) return '-'
  if (value < 1000) return `${Math.round(value)} m`
  return `${(value / 1000).toFixed(2)} km`
}

function normalizeBearing (value) {
  return Math.round((((value % 360) + 360) % 360))
}

function computeDistanceMeters (from, to) {
  const radius = 6371000
  const dLat = (to.lat - from.lat) * Math.PI / 180
  const dLng = (to.lng - from.lng) * Math.PI / 180
  const lat1 = from.lat * Math.PI / 180
  const lat2 = to.lat * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function computeBearingDeg (from, to) {
  const dLng = (to.lng - from.lng) * Math.PI / 180
  const y = Math.sin(dLng) * Math.cos(to.lat * Math.PI / 180)
  const x = Math.cos(from.lat * Math.PI / 180) * Math.sin(to.lat * Math.PI / 180) -
    Math.sin(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) * Math.cos(dLng)
  return normalizeBearing(Math.atan2(y, x) * 180 / Math.PI)
}

function parseMgrsTargetReference (rawValue) {
  const cleanValue = (rawValue || '').trim().toUpperCase().replace(/\s+/g, '')
  if (!cleanValue) return null
  if (/^[0-9]{1,2}[C-HJ-NP-X][A-HJ-NP-Z]{2}\d{2,10}$/.test(cleanValue)) {
    const digitsMatch = /^[0-9]{1,2}[C-HJ-NP-X][A-HJ-NP-Z]{2}(\d+)$/.exec(cleanValue)
    if (!digitsMatch || digitsMatch[1].length % 2 !== 0) return null
    return cleanValue
  }
  return null
}

const hasPosition = computed(() => !!currentPosition.value)
const hasTarget = computed(() => !!target.value && Number.isFinite(target.value.lat) && Number.isFinite(target.value.lng))

const targetLabel = computed(() => {
  if (!target.value) return ''
  return target.value.label || target.value.kind || 'Cel'
})

const currentDistance = computed(() => {
  if (!hasPosition.value || !hasTarget.value) return null
  return computeDistanceMeters(currentPosition.value, target.value)
})

const distanceText = computed(() => currentDistance.value == null ? '-' : formatMeters(currentDistance.value))
const bearingText = computed(() => {
  if (!hasPosition.value || !hasTarget.value) return '-'
  return `${computeBearingDeg(currentPosition.value, target.value)}°`
})

const trendLabel = computed(() => {
  if (!hasPosition.value || !hasTarget.value || positionHistory.value.length < 2) return 'brak danych'
  const previous = positionHistory.value[positionHistory.value.length - 2]
  const latest = positionHistory.value[positionHistory.value.length - 1]
  if (latest.distance < previous.distance - 5) return 'zbliżasz się'
  if (latest.distance > previous.distance + 5) return 'oddalasz się'
  return 'stabilnie'
})

const trendColor = computed(() => {
  if (trendLabel.value === 'zbliżasz się') return 'positive'
  if (trendLabel.value === 'oddalasz się') return 'negative'
  return 'grey-7'
})

const showMapStatusPanel = computed(() => !isMobile.value || showMobileStatsPanel.value)

function goToMarchTable () {
  router.push('/tools/march-table').catch(() => {})
}

function syncTargetFromStore () {
  target.value = navigationStore.target || null
  targetInput.value = target.value?.mgrs || ''
  updateMapGraphics()
}

function setTargetFromMgrs () {
  const normalized = parseMgrsTargetReference(targetInput.value)
  if (!normalized) {
    $q.notify({ type: 'negative', message: 'Podaj pełny MGRS celu.' })
    return
  }
  try {
    const [lng, lat] = mgrs.toPoint(normalized)
    target.value = {
      lat,
      lng,
      mgrs: normalized,
      label: `Cel ${normalized}`,
      note: ''
    }
    navigationStore.setTarget(target.value)
    pickMode.value = false
    updateMapGraphics()
    if (map.value) map.value.setView([lat, lng], 15)
  } catch {
    $q.notify({ type: 'negative', message: 'Nie udało się odczytać MGRS celu.' })
  }
}

function togglePickMode () {
  pickMode.value = !pickMode.value
  if (pickMode.value) {
    $q.notify({ type: 'info', message: 'Kliknij na mapie, aby wskazać cel.' })
  }
}

function clearTarget () {
  target.value = null
  targetInput.value = ''
  navigationStore.clearTarget()
  updateMapGraphics()
}

function refreshBaseLayer () {
  if (!map.value || !baseLayer) return
  map.value.invalidateSize()
  if (typeof baseLayer.redraw === 'function') {
    baseLayer.redraw()
  }
}

function centerOnDevice () {
  if (!currentPosition.value || !map.value) return
  map.value.setView([currentPosition.value.lat, currentPosition.value.lng], 15, { animate: false })
  requestAnimationFrame(() => {
    refreshBaseLayer()
    updateMapGraphics()
  })
}

function updateCurrentPosition (position) {
  currentPosition.value = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    accuracy: position.coords.accuracy
  }
  if (hasTarget.value) {
    const distance = computeDistanceMeters(currentPosition.value, target.value)
    positionHistory.value.push({ distance, timestamp: Date.now() })
    if (positionHistory.value.length > 12) positionHistory.value.shift()
  }
  updateMapGraphics()
}

function updateMapGraphics () {
  if (!map.value || !markerLayer) return
  markerLayer.clearLayers()

  if (currentPosition.value) {
    L.circleMarker([currentPosition.value.lat, currentPosition.value.lng], {
      renderer: navigationRenderer,
      radius: 12,
      color: 'rgba(66, 133, 244, 0.55)',
      weight: 2,
      fillColor: 'rgba(66, 133, 244, 0.24)',
      fillOpacity: 1
    }).addTo(markerLayer)
    L.circleMarker([currentPosition.value.lat, currentPosition.value.lng], {
      renderer: navigationRenderer,
      radius: 5,
      color: '#fff',
      weight: 2,
      fillColor: '#4285f4',
      fillOpacity: 1
    }).addTo(markerLayer)
  }

  if (target.value) {
    L.circleMarker([target.value.lat, target.value.lng], {
      renderer: navigationRenderer,
      radius: 8,
      color: '#fff',
      weight: 2,
      fillColor: '#c53030',
      fillOpacity: 1
    }).addTo(markerLayer)
  }

  if (currentPosition.value && target.value) {
    L.polyline([
      [currentPosition.value.lat, currentPosition.value.lng],
      [target.value.lat, target.value.lng]
    ], {
      renderer: navigationRenderer,
      color: '#2f855a',
      weight: 2,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(markerLayer)
  }
}

function onMapClick (event) {
  if (!pickMode.value) return
  const [lat, lng] = [event.latlng.lat, event.latlng.lng]
  const mgrsTarget = mgrs.forward([lng, lat], 5)
  target.value = {
    lat,
    lng,
    mgrs: mgrsTarget,
    label: `Cel ${mgrsTarget}`,
    note: ''
  }
  navigationStore.setTarget(target.value)
  targetInput.value = mgrsTarget
  pickMode.value = false
  updateMapGraphics()
}

onMounted(() => {
  syncTargetFromStore()
  map.value = L.map('navigate-map', { zoomControl: true }).setView([52.2297, 21.0122], 13)
  baseLayers = {
    osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19
    }),
    topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenTopoMap',
      maxZoom: 17
    }),
    tourist: L.tileLayer('https://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors &amp; USGS',
      maxZoom: 18
    })
  }
  baseLayer = baseLayers[resolveBaseLayerKey(selectedMapLayer.value)]
  baseLayer.addTo(map.value)
  markerLayer = L.layerGroup().addTo(map.value)
  map.value.on('click', onMapClick)
  map.value.on('zoomend moveend resize', updateMapGraphics)

  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      updateCurrentPosition,
      () => {
        $q.notify({ type: 'warning', message: 'Nie udało się pobrać bieżącej pozycji.' })
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 12000 }
    )
  }

  nextTick(() => {
    if (target.value && map.value) {
      map.value.setView([target.value.lat, target.value.lng], 14)
      updateMapGraphics()
    }
  })
})

watch(() => navigationStore.target, () => {
  syncTargetFromStore()
})

watch(selectedMapLayer, (value) => {
  const resolvedLayerKey = resolveBaseLayerKey(value)
  if (!map.value || !baseLayers[resolvedLayerKey]) return
  if (baseLayer) {
    map.value.removeLayer(baseLayer)
  }
  baseLayer = baseLayers[resolvedLayerKey]
  baseLayer.addTo(map.value)
  requestAnimationFrame(() => {
    refreshBaseLayer()
    updateMapGraphics()
  })
})

onBeforeUnmount(() => {
  if (watchId != null && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId)
  }
  if (map.value) {
    map.value.off('click', onMapClick)
    map.value.off('zoomend moveend resize', updateMapGraphics)
    map.value.remove()
  }
})
</script>

<style scoped>
.navigate-page {
  max-width: 1600px;
  margin: 0 auto;
}

.navigate-shell {
  width: 100%;
}

.navigate-hero {
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(18, 45, 28, 0.96), rgba(33, 56, 40, 0.92));
  color: #f3f7f1;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.18);
}

.navigate-hero__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  color: rgba(220, 235, 221, 0.7);
}

.navigate-hero__title {
  margin: 0.15rem 0 0.4rem;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1;
}

.navigate-hero__subtitle {
  max-width: 70ch;
  margin: 0;
  color: rgba(243, 247, 241, 0.86);
}

.navigate-card,
.navigate-map-card {
  border-radius: 18px;
  overflow: hidden;
}

.map-wrap {
  position: relative;
  min-height: 620px;
}

.navigate-map {
  width: 100%;
  height: 620px;
}

.navigate-map--night {
  background: #0b1117;
}

.navigate-map--night :deep(.leaflet-tile-pane) {
  filter: invert(1) hue-rotate(180deg) saturate(0.75) brightness(0.82) contrast(1.1);
}

.navigate-map--night :deep(.leaflet-control-container),
.navigate-map--night :deep(.leaflet-control-attribution) {
  filter: none;
}

.navigate-map--tactical :deep(.leaflet-tile-pane) {
  filter: grayscale(1) brightness(0.55) contrast(1.1);
}

.navigate-map--tactical :deep(.leaflet-control-container),
.navigate-map--tactical :deep(.leaflet-control-attribution) {
  filter: none;
}

.map-overlay {
  position: absolute;
  z-index: 500;
  border-radius: 16px;
  padding: 0.85rem 0.95rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
}

.map-overlay--north {
  right: 14px;
  top: 14px;
  width: 64px;
  text-align: center;
  background: rgba(13, 20, 16, 0.76);
  color: #fff;
}

.north-arrow {
  font-size: 1.7rem;
  line-height: 1;
}

.north-label {
  font-size: 0.78rem;
  letter-spacing: 0.2em;
}

.map-overlay--status {
  left: 14px;
  bottom: 14px;
  background: rgba(13, 20, 16, 0.78);
  color: #fff;
  min-width: 180px;
  padding-right: 2.5rem;
}

.map-overlay__close {
  position: absolute;
  top: 4px;
  right: 4px;
}

@media (max-width: 1024px) {
  .map-wrap,
  .navigate-map {
    min-height: 460px;
    height: 460px;
  }

  .mobile-stats-toggle-btn {
    margin-left: -4px;
  }
}
</style>
