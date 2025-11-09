<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav color="black"/>

      <!-- Header z tytułem -->
      <div class="page-header q-mb-lg">
        <div class="row items-center">
          <div>
            <div class="text-h4 text-weight-bold text-primary">Kalkulator nastaw</div>
            <div class="text-subtitle1 text-grey-7">Symulacja korekty celowania</div>
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-lg">
        <!-- Kontrolki -->
        <div class="col-12 col-md-4">
          <q-card class="controls-card">
            <q-card-section>
              <div class="text-h6 q-mb-md">Ustawienia</div>

              <!-- System mierniczy -->
              <q-field label="System" stack-label class="q-mb-md">
                <q-option-group
                  v-model="measurementSystem"
                  :options="systemOptions"
                  color="primary"
                  inline
                />
              </q-field>

              <!-- Skok (klik) -->
              <q-select
                v-model="clickValue"
                :options="clickOptions"
                label="Skok (klik)"
                outlined
                class="q-mb-md"
              />

              <!-- Odległość -->
              <q-select
                v-model="distance"
                :options="distanceOptions"
                label="Odległość (m)"
                outlined
                class="q-mb-md"
              />

              <!-- Symulacja wiatru -->
              <q-checkbox
                v-model="windEnabled"
                label="Symulacja wiatru"
                color="primary"
                class="q-mb-md"
              />

              <div v-if="windEnabled" class="wind-controls q-mb-md">
                <!-- Kierunek wiatru -->
                <q-field label="Kierunek wiatru" stack-label class="q-mb-sm">
                  <q-option-group
                    v-model="windDirection"
                    :options="windDirectionOptions"
                    color="primary"
                    inline
                  />
                </q-field>

                <!-- Prędkość wiatru -->
                <q-select
                  v-model="windSpeed"
                  :options="windSpeedOptions"
                  label="Prędkość wiatru"
                  outlined
                  class="q-mb-sm"
                />
              </div>

              <!-- Typ korekty -->
              <q-field label="Typ korekty" stack-label class="q-mb-md">
                <q-option-group
                  v-model="correctionType"
                  :options="correctionTypeOptions"
                  color="primary"
                  inline
                />
              </q-field>

              <!-- Kontrolki nastaw -->
              <div class="text-subtitle2 q-mb-sm">Korekty nastaw</div>

              <!-- Up/Down -->
              <div class="correction-control q-mb-lg">
                <div class="text-caption q-mb-sm">Góra/Dół:</div>
                <!-- Przyciski -->
                <div class="row items-center q-mb-sm">
                  <q-btn
                    flat
                    round
                    icon="keyboard_arrow_down"
                    color="negative"
                    @click="adjustVertical(-10)"
                    size="md"
                    class="correction-btn"
                  >
                    <q-tooltip>-10 klików</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    icon="remove"
                    color="negative"
                    @click="adjustVertical(-1)"
                    size="lg"
                    class="correction-btn q-mx-sm"
                  >
                    <q-tooltip>-1 klik</q-tooltip>
                  </q-btn>
                  <div class="text-center correction-value">
                    {{ verticalClicks > 0 ? '+' : '' }}{{ verticalClicks }}
                  </div>
                  <q-btn
                    flat
                    round
                    icon="add"
                    color="positive"
                    @click="adjustVertical(1)"
                    size="lg"
                    class="correction-btn q-mx-sm"
                  >
                    <q-tooltip>+1 klik</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    icon="keyboard_arrow_up"
                    color="positive"
                    @click="adjustVertical(10)"
                    size="md"
                    class="correction-btn"
                  >
                    <q-tooltip>+10 klików</q-tooltip>
                  </q-btn>
                </div>
                <!-- Suwak -->
                <q-slider
                  v-model="verticalClicks"
                  :min="-80"
                  :max="80"
                  :step="1"
                  label
                  color="primary"
                  class="q-mt-sm"
                />
              </div>

              <!-- Left/Right -->
              <div class="correction-control q-mb-lg">
                <div class="text-caption q-mb-sm">Lewo/Prawo:</div>
                <!-- Przyciski -->
                <div class="row items-center q-mb-sm">
                  <q-btn
                    flat
                    round
                    icon="keyboard_arrow_left"
                    color="negative"
                    @click="adjustHorizontal(-10)"
                    size="md"
                    class="correction-btn"
                  >
                    <q-tooltip>-10 klików</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    icon="remove"
                    color="negative"
                    @click="adjustHorizontal(-1)"
                    size="lg"
                    class="correction-btn q-mx-sm"
                  >
                    <q-tooltip>-1 klik</q-tooltip>
                  </q-btn>
                  <div class="text-center correction-value">
                    {{ horizontalClicks > 0 ? '+' : '' }}{{ horizontalClicks }}
                  </div>
                  <q-btn
                    flat
                    round
                    icon="add"
                    color="positive"
                    @click="adjustHorizontal(1)"
                    size="lg"
                    class="correction-btn q-mx-sm"
                  >
                    <q-tooltip>+1 klik</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    icon="keyboard_arrow_right"
                    color="positive"
                    @click="adjustHorizontal(10)"
                    size="md"
                    class="correction-btn"
                  >
                    <q-tooltip>+10 klików</q-tooltip>
                  </q-btn>
                </div>
                <!-- Suwak -->
                <q-slider
                  v-model="horizontalClicks"
                  :min="-80"
                  :max="80"
                  :step="1"
                  label
                  color="primary"
                  class="q-mt-sm"
                />
              </div>

              <!-- Strzał kontrolny -->
              <q-btn
                color="orange"
                icon="center_focus_strong"
                label="Strzał kontrolny"
                @click="handleControlShot"
                class="full-width q-mb-md"
              />

              <!-- Oddaj strzał -->
              <q-btn
                color="primary"
                icon="gps_fixed"
                label="Oddaj strzał"
                @click="handleShot"
                class="full-width q-mb-md"
              />

              <!-- Reset -->
              <q-btn
                color="secondary"
                icon="refresh"
                label="Reset"
                @click="resetSimulation"
                class="full-width q-mb-md"
                outline
              />
            </q-card-section>
          </q-card>
        </div>

        <!-- Tarcza z symulacją -->
        <div class="col-12 col-md-8">
          <q-card class="target-card">
            <q-card-section class="q-pa-none">
              <div class="target-container fixed-size" ref="targetContainer">
                <!-- Obraz tarczy -->
                <img
                  :src="targetImage"
                  alt="Target"
                  class="target-image fixed-size"
                  @load="onImageLoad"
                />

                <!-- Celownik MilDot -->
                <svg class="mil-dot-overlay" v-if="showGrid">
                  <!-- Koło zewnętrzne -->
                  <circle
                    :cx="crosshairPosition.x"
                    :cy="crosshairPosition.y"
                    :r="Math.min(imageWidth, imageHeight) * 0.4"
                    fill="none"
                    stroke="rgba(0, 0, 0, 0.8)"
                    stroke-width="3"
                  />

                  <!-- Linia pozioma główna -->
                  <line
                    :x1="crosshairPosition.x - Math.min(imageWidth, imageHeight) * 0.4"
                    :y1="crosshairPosition.y"
                    :x2="crosshairPosition.x + Math.min(imageWidth, imageHeight) * 0.4"
                    :y2="crosshairPosition.y"
                    stroke="rgba(0, 0, 0, 0.8)"
                    stroke-width="3"
                  />

                  <!-- Linia pionowa główna -->
                  <line
                    :x1="crosshairPosition.x"
                    :y1="crosshairPosition.y - Math.min(imageWidth, imageHeight) * 0.4"
                    :x2="crosshairPosition.x"
                    :y2="crosshairPosition.y + Math.min(imageWidth, imageHeight) * 0.4"
                    stroke="rgba(0, 0, 0, 0.8)"
                    stroke-width="3"
                  />

                  <!-- Kropki MilDot na linii poziomej (lewa strona) -->
                  <circle
                    v-for="i in 5"
                    :key="`left-${i}`"
                    :cx="crosshairPosition.x - (i * Math.min(imageWidth, imageHeight) * 0.06)"
                    :cy="crosshairPosition.y"
                    r="4"
                    fill="rgba(0, 0, 0, 0.8)"
                  />

                  <!-- Kropki MilDot na linii poziomej (prawa strona) -->
                  <circle
                    v-for="i in 5"
                    :key="`right-${i}`"
                    :cx="crosshairPosition.x + (i * Math.min(imageWidth, imageHeight) * 0.06)"
                    :cy="crosshairPosition.y"
                    r="4"
                    fill="rgba(0, 0, 0, 0.8)"
                  />

                  <!-- Kropki MilDot na linii pionowej (góra) -->
                  <circle
                    v-for="i in 5"
                    :key="`top-${i}`"
                    :cx="crosshairPosition.x"
                    :cy="crosshairPosition.y - (i * Math.min(imageWidth, imageHeight) * 0.06)"
                    r="4"
                    fill="rgba(0, 0, 0, 0.8)"
                  />

                  <!-- Kropki MilDot na linii pionowej (dół) -->
                  <circle
                    v-for="i in 5"
                    :key="`bottom-${i}`"
                    :cx="crosshairPosition.x"
                    :cy="crosshairPosition.y + (i * Math.min(imageWidth, imageHeight) * 0.06)"
                    r="4"
                    fill="rgba(0, 0, 0, 0.8)"
                  />

                  <!-- Punkt centralny -->
                  <circle
                    :cx="crosshairPosition.x"
                    :cy="crosshairPosition.y"
                    r="1.5"
                    fill="rgba(0, 0, 0, 0.9)"
                  />
                </svg>

                <!-- Strzały -->
                <div
                  v-for="(shot, index) in shots"
                  :key="`shot-${index}`"
                  :class="['shot-marker', shot.type === 'control' ? 'shot-marker-control' : 'shot-marker-normal']"
                  :style="{
                    left: shot.x + 'px',
                    top: shot.y + 'px'
                  }"
                >
                  <!-- SVG z większym okręgiem i kropką -->
                  <svg width="22" height="22" style="position: absolute; left: -11px; top: -11px; pointer-events: none;">
                    <circle cx="11" cy="11" r="9" fill="rgba(255,255,255,0.5)" stroke="rgba(0,0,0,0.5)" stroke-width="2" />
                    <circle cx="11" cy="11" r="4" fill="rgba(0,0,0,0.9)" />
                  </svg>
                  <div class="shot-number">{{ index + 1 }}</div>
                </div>
              </div>

              <!-- Kontrolki siatki -->
              <div class="grid-controls q-pa-md">
                <q-checkbox
                  v-model="showGrid"
                  label="Pokaż siatkę celowniczą"
                  color="primary"
                />
              </div>
            </q-card-section>
            <!-- Informacje i ostatni strzał kontrolny przeniesione pod tarczę -->
            <q-card-section>
              <div class="info-section">
                <div class="text-subtitle2 q-mb-sm">Informacje</div>
                <div class="text-caption">
                  <div>Korekta pozioma: {{ horizontalCorrection.toFixed(2) }} {{ measurementSystem === 'mils' ? 'mil' : 'MOA' }}</div>
                  <div>Korekta pionowa: {{ verticalCorrection.toFixed(2) }} {{ measurementSystem === 'mils' ? 'mil' : 'MOA' }}</div>
                  <div>Centymetrów per klik: {{ cmPerClick }} cm</div>
                  <div>Ilość strzałów: {{ shots.length }}</div>
                  <!-- Control shot info -->
                  <div v-if="controlShotInfo" class="q-mt-md">
                    <div class="text-weight-medium">Ostatni strzał kontrolny:</div>
                    <div>{{ Math.abs(controlShotInfo.horizontal.cm).toFixed(1) }} cm {{ controlShotInfo.horizontal.direction }}</div>
                    <div>{{ Math.abs(controlShotInfo.vertical.cm).toFixed(1) }} cm {{ controlShotInfo.vertical.direction }}</div>
                    <div class="text-grey">Dystans: {{ controlShotInfo.distance }}m</div>
                  </div>
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import targetImg from '../../assets/target.jpg'

// Reactive data
const measurementSystem = ref('mils')
const clickValue = ref(0.1) // domyślnie 0.1 mil lub 0.25 MOA
const distance = ref({ label: '300m', value: 300 })
const verticalClicks = ref(0)
const horizontalClicks = ref(0)
const showGrid = ref(true)
const shots = ref([])
const lastControlShot = ref(null)
const imageWidth = ref(500)
const imageHeight = ref(500)
const targetContainer = ref(null)
const targetImage = targetImg

// Wind simulation
const windEnabled = ref(false)
const windDirection = ref('left')
const windSpeed = ref({ label: '2 m/s', value: 2 })

// Correction type
const correctionType = ref('turrets')

// Options
const systemOptions = [
  { label: 'Mils', value: 'mils' },
  { label: 'MOA', value: 'moa' }
]

const clickOptions = computed(() => {
  if (measurementSystem.value === 'mils') {
    return [
      { label: '0.1 mil', value: 0.1 },
      { label: '1 mil', value: 1.0 }
    ]
  } else {
    return [
      { label: '1/4 MOA', value: 0.25 },
      { label: '1/3 MOA', value: 0.333 },
      { label: '1/2 MOA', value: 0.5 },
      { label: '1 MOA', value: 1.0 }
    ]
  }
})

// Watcher: ustaw domyślny klik przy zmianie systemu
watch(measurementSystem, (val) => {
  if (val === 'mils') {
    clickValue.value = 0.1
  } else {
    clickValue.value = 0.25
  }
})

const distanceOptions = [
  { label: '100m', value: 100 },
  { label: '150m', value: 150 },
  { label: '200m', value: 200 },
  { label: '250m', value: 250 },
  { label: '300m', value: 300 },
  { label: '350m', value: 350 },
  { label: '400m', value: 400 },
  { label: '450m', value: 450 },
  { label: '500m', value: 500 },
  { label: '550m', value: 550 },
  { label: '600m', value: 600 },
  { label: '650m', value: 650 },
  { label: '700m', value: 700 },
  { label: '750m', value: 750 },
  { label: '800m', value: 800 }
]

const windDirectionOptions = [
  { label: 'Z lewej', value: 'left' },
  { label: 'Z prawej', value: 'right' }
]

const windSpeedOptions = [
  { label: '1 m/s', value: 1 },
  { label: '2 m/s', value: 2 },
  { label: '5 m/s', value: 5 },
  { label: '10 m/s', value: 10 }
]

const correctionTypeOptions = [
  { label: 'Korekta na bębnach', value: 'turrets' },
  { label: 'Korekta na krzyżu', value: 'crosshair' }
]

// Computed corrections
const horizontalCorrection = computed(() => {
  return horizontalClicks.value * clickValue.value
})

const verticalCorrection = computed(() => {
  return verticalClicks.value * clickValue.value
})

// Calculate centimeters per click at current distance
const cmPerClick = computed(() => {
  const distanceMeters = distance.value.value

  if (measurementSystem.value === 'mils') {
    // For mils: 1 mil at distance = distance/1000 meters = distance mm
    const milToCmAtDistance = distanceMeters / 10 // convert mm to cm
    return (clickValue.value * milToCmAtDistance).toFixed(2)
  } else {
    // For MOA: 1 MOA na 100m = 2.91cm, więc na X m = 2.91 * (distance/100)
    const moaToCmAtDistance = 2.91 * (distanceMeters / 100)
    return (clickValue.value * moaToCmAtDistance).toFixed(2)
  }
})

// Convert correction in mils/MOA to centimeters on target
const getCorrectionInCm = (correctionValue) => {
  const distanceMeters = distance.value.value

  if (measurementSystem.value === 'mils') {
    // For mils: 1 mil at distance = distance/1000 meters = distance mm
    const milToCmAtDistance = distanceMeters / 10 // convert mm to cm
    return correctionValue * milToCmAtDistance
  } else {
    // For MOA: 1 MOA na 100m = 2.91cm, więc na X m = 2.91 * (distance/100)
    const moaToCmAtDistance = 2.91 * (distanceMeters / 100)
    return correctionValue * moaToCmAtDistance
  }
}

// Convert centimeters to pixels on 50cm target (dynamic RWD)
const cmToPixels = (cm) => {
  // 50cm = aktualna szerokość/height kontenera
  const container = targetContainer.value
  if (!container) return cm * 10 // fallback
  const sizePx = Math.min(container.offsetWidth, container.offsetHeight)
  return (cm / 50) * sizePx
}

// Convert pixels to centimeters on 50cm target (dynamic RWD)
const pixelsToCm = (pixels) => {
  const container = targetContainer.value
  if (!container) return pixels / 10 // fallback
  const sizePx = Math.min(container.offsetWidth, container.offsetHeight)
  return (pixels / sizePx) * 50
}

// Crosshair position based on correction type
const crosshairPosition = computed(() => {
  const centerX = imageWidth.value / 2
  const centerY = imageHeight.value / 2

  let baseX, baseY
  if (correctionType.value === 'crosshair') {
    // Move crosshair based on correction in centimeters
    const correctionCmX = getCorrectionInCm(horizontalCorrection.value)
    const correctionCmY = -getCorrectionInCm(verticalCorrection.value) // negative for screen Y
    const offsetX = cmToPixels(correctionCmX)
    const offsetY = cmToPixels(correctionCmY)
    baseX = centerX + offsetX
    baseY = centerY + offsetY
  } else {
    baseX = centerX
    baseY = centerY
  }
  // Dodaj odrzut jeśli aktywny
  return {
    x: baseX + recoilOffset.value.x,
    y: baseY + recoilOffset.value.y
  }
})

// Control shot analysis
const controlShotInfo = computed(() => {
  if (!lastControlShot.value) return null

  const centerX = imageWidth.value / 2
  const centerY = imageHeight.value / 2

  // Calculate pixel offset from center
  const offsetX = lastControlShot.value.x - centerX
  const offsetY = centerY - lastControlShot.value.y // inverted for screen coordinates

  // Convert pixels to centimeters using unified scale
  const horizontalCm = pixelsToCm(offsetX)
  const verticalCm = pixelsToCm(offsetY)

  // Convert centimeters to mils/MOA for display
  const distanceMeters = distance.value.value
  let horizontalMils, verticalMils

  if (measurementSystem.value === 'mils') {
    const milToCmAtDistance = distanceMeters / 10
    horizontalMils = horizontalCm / milToCmAtDistance
    verticalMils = verticalCm / milToCmAtDistance
  } else {
    const moaToCmAtDistance = distanceMeters * 0.29
    horizontalMils = horizontalCm / moaToCmAtDistance
    verticalMils = verticalCm / moaToCmAtDistance
  }

  return {
    horizontal: {
      value: horizontalMils,
      cm: horizontalCm,
      direction: horizontalMils > 0 ? 'prawo' : 'lewo'
    },
    vertical: {
      value: verticalMils,
      cm: verticalCm,
      direction: verticalMils > 0 ? 'góra' : 'dół'
    },
    distance: distanceMeters
  }
})

// Methods

const adjustVertical = (direction) => {
  verticalClicks.value += direction
}

const adjustHorizontal = (direction) => {
  horizontalClicks.value += direction
}

const calculateShotPosition = () => {
  const centerX = imageWidth.value / 2
  const centerY = imageHeight.value / 2

  let baseX, baseY

  // Determine base position and apply corrections
  if (lastControlShot.value) {
    // Use control shot as reference point
    baseX = lastControlShot.value.x
    baseY = lastControlShot.value.y
  } else {
    // No control shot yet, use center as reference
    baseX = centerX
    baseY = centerY
  }

  // Apply corrections in centimeters (unified scale)
  const correctionCmX = getCorrectionInCm(horizontalCorrection.value)
  const correctionCmY = -getCorrectionInCm(verticalCorrection.value) // negative for screen Y

  const correctionPixelsX = cmToPixels(correctionCmX)
  const correctionPixelsY = cmToPixels(correctionCmY)

  let shotX = baseX + correctionPixelsX
  const shotY = baseY + correctionPixelsY

  // Apply wind effect if enabled
  if (windEnabled.value) {
    const windDeflection = calculateWindDeflection()
    const windCmX = getCorrectionInCm(windDeflection)
    const windPixelsX = cmToPixels(windCmX)

    if (windDirection.value === 'left') {
      shotX += windPixelsX // Wind from left pushes projectile right
    } else {
      shotX -= windPixelsX // Wind from right pushes projectile left
    }
  }

  return {
    x: shotX,
    y: shotY
  }
}

// Calculate wind deflection based on McCoy's equations
const calculateWindDeflection = () => {
  const distanceMeters = distance.value.value
  const windSpeedMs = windSpeed.value.value

  // Simplified wind influence calculation
  const muzzleVelocity = 830 // m/s for .308 175gr SMK
  const vacuumTime = distanceMeters / muzzleVelocity

  // Approximate actual flight time (accounting for drag)
  const actualTime = vacuumTime * (1 + (distanceMeters / 1000) * 0.15)

  // Time lag (wind influence in seconds)
  const timeLag = actualTime - vacuumTime

  // Wind deflection in meters
  const deflectionMeters = timeLag * windSpeedMs

  // Convert to corrections in mils or MOA
  if (measurementSystem.value === 'mils') {
    // 1 mil at distance = distance/1000 meters
    return (deflectionMeters * 1000) / distanceMeters // mils
  } else {
    // 1 MOA at distance ≈ distance/343 meters
    return (deflectionMeters * 343) / distanceMeters // MOA
  }
}

// --- ANIMACJA ODRZUTU ---
const recoilOffset = ref({ x: 0, y: 0 })
const isRecoiling = ref(false)

function animateRecoil () {
  isRecoiling.value = true
  let t = 0
  const duration = 200 // ms
  const frames = 12
  const shake = () => {
    if (t >= duration) {
      recoilOffset.value = { x: 0, y: 0 }
      isRecoiling.value = false
      return
    }
    recoilOffset.value = {
      x: (Math.random() - 0.5) * 16,
      y: -Math.abs(Math.random() * 12 + 8)
    }
    t += duration / frames
    requestAnimationFrame(shake)
  }
  shake()
}

function handleShot () {
  animateRecoil()
  setTimeout(() => {
    recoilOffset.value = { x: 0, y: 0 }
    isRecoiling.value = false
    takeShot()
  }, 220)
}

function handleControlShot () {
  animateRecoil()
  setTimeout(() => {
    recoilOffset.value = { x: 0, y: 0 }
    isRecoiling.value = false
    takeControlShot()
  }, 220)
}

const takeControlShot = () => {
  // Calculate 75% area bounds (center 75% of the target)
  const centerX = imageWidth.value / 2
  const centerY = imageHeight.value / 2

  // 75% area means 37.5% on each side from center
  const areaSize = 0.75
  const halfAreaX = (imageWidth.value * areaSize) / 2
  const halfAreaY = (imageHeight.value * areaSize) / 2

  // Random position within the 75% area
  let randomX = centerX + (Math.random() - 0.5) * (halfAreaX * 2)
  const randomY = centerY + (Math.random() - 0.5) * (halfAreaY * 2)

  // Apply wind effect to control shot if enabled
  if (windEnabled.value) {
    const windDeflection = calculateWindDeflection()
    const windCmX = getCorrectionInCm(windDeflection)
    const windPixelsX = cmToPixels(windCmX)

    if (windDirection.value === 'left') {
      randomX += windPixelsX // Wind from left pushes shot right
    } else {
      randomX -= windPixelsX // Wind from right pushes shot left
    }
  }

  // Ensure shot is within image bounds
  const x = Math.max(5, Math.min(imageWidth.value - 5, randomX))
  const y = Math.max(5, Math.min(imageHeight.value - 5, randomY))

  // Store this control shot as reference for zeroing
  lastControlShot.value = { x, y }

  shots.value.push({ x, y, type: 'control' })
}

const takeShot = () => {
  const position = calculateShotPosition()

  // Use precision mode by default - no dispersion for accurate training
  shots.value.push({
    x: Math.max(5, Math.min(imageWidth.value - 5, position.x)),
    y: Math.max(5, Math.min(imageHeight.value - 5, position.y)),
    type: 'normal'
  })
}

const resetSimulation = () => {
  shots.value = []
  verticalClicks.value = 0
  horizontalClicks.value = 0
  lastControlShot.value = null
}

const onImageLoad = () => {
  // Update image dimensions when loaded
  if (targetContainer.value) {
    const img = targetContainer.value.querySelector('.target-image')
    if (img) {
      // Use container dimensions for consistent sizing
      const containerRect = targetContainer.value.getBoundingClientRect()
      imageWidth.value = containerRect.width
      imageHeight.value = containerRect.height
    }
  }
}

// Watchers: każda zmiana danych wejściowych przelicza i odświeża wyniki oraz pozycję celownika
watch([
  measurementSystem,
  clickValue,
  distance,
  verticalClicks,
  horizontalClicks,
  windEnabled,
  windDirection,
  windSpeed,
  correctionType
], () => {
  // Wymuś odświeżenie computedów i pozycji celownika
  // (w Vue 3 z ref/computed nie trzeba ręcznie przeliczać, ale można dodać dodatkowe akcje jeśli potrzeba)
  // Przykład: jeśli po zmianie measurementSystem chcesz zresetować klik
  if (measurementSystem.value === 'mils') {
    clickValue.value = 0.1
  } else {
    clickValue.value = 0.25
  }
  // Odświeżenie obrazu/celownika jeśli potrzeba
  onImageLoad()
})

// Handle window resize
const handleResize = () => {
  onImageLoad()
}

onMounted(() => {
  // Set initial image dimensions
  setTimeout(() => {
    onImageLoad()
  }, 100)

  // Add resize listener
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // Remove resize listener
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.page-background {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(25, 118, 210, 0.1);
}

.controls-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(25, 118, 210, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.target-card {
  height: fit-content;
}

/* Stały rozmiar 500x500px = 50x50cm wirtualnie */
.target-container.fixed-size {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.target-image.fixed-size {
  width: 500px;
  height: 500px;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

.target-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

.mil-dot-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.shot-marker {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.shot-marker-normal {
  background-color: #d32f2f; /* Red for normal shots */
}

.shot-marker-control {
  background-color: #1976d2; /* Blue for control shots */
}

/* Correction controls styling */
.correction-control {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
}

.correction-btn {
  min-width: 48px;
  min-height: 48px;
}

.correction-value {
  min-width: 60px;
  font-weight: bold;
  font-size: 16px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin: 0 8px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .target-container {
    max-width: 350px;
  }
}

@media (max-width: 480px) {
  .target-container {
    max-width: 300px;
  }

  .shot-marker {
    width: 6px;
    height: 6px;
  }
}
</style>
