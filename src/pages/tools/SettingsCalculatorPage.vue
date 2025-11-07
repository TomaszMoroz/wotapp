<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <!-- Header z przyciskiem powrotu -->
      <div class="page-header q-mb-lg">
        <div class="row items-center">
          <q-btn
            flat
            round
            icon="arrow_back"
            color="primary"
            size="lg"
            @click="goBack"
            class="q-mr-md"
          />
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

              <!-- Kontrolki nastaw -->
              <div class="text-subtitle2 q-mb-sm">Korekty nastaw</div>

              <!-- Up/Down -->
              <div class="row items-center q-mb-md">
                <div class="col-3 text-caption">Góra/Dół:</div>
                <div class="col-9">
                  <div class="row items-center">
                    <q-btn
                      flat
                      round
                      icon="keyboard_arrow_down"
                      color="negative"
                      @click="adjustVertical(-1)"
                      size="sm"
                    />
                    <div class="text-center q-mx-md" style="min-width: 60px;">
                      {{ verticalClicks > 0 ? '+' : '' }}{{ verticalClicks }}
                    </div>
                    <q-btn
                      flat
                      round
                      icon="keyboard_arrow_up"
                      color="positive"
                      @click="adjustVertical(1)"
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              <!-- Left/Right -->
              <div class="row items-center q-mb-md">
                <div class="col-3 text-caption">Lewo/Prawo:</div>
                <div class="col-9">
                  <div class="row items-center">
                    <q-btn
                      flat
                      round
                      icon="keyboard_arrow_left"
                      color="negative"
                      @click="adjustHorizontal(-1)"
                      size="sm"
                    />
                    <div class="text-center q-mx-md" style="min-width: 60px;">
                      {{ horizontalClicks > 0 ? '+' : '' }}{{ horizontalClicks }}
                    </div>
                    <q-btn
                      flat
                      round
                      icon="keyboard_arrow_right"
                      color="positive"
                      @click="adjustHorizontal(1)"
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              <!-- Strzał kontrolny -->
              <q-btn
                color="orange"
                icon="center_focus_strong"
                label="Strzał kontrolny"
                @click="takeControlShot"
                class="full-width q-mb-md"
              />

              <!-- Oddaj strzał -->
              <q-btn
                color="primary"
                icon="gps_fixed"
                label="Oddaj strzał"
                @click="takeShot"
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

              <!-- Informacje -->
              <div class="info-section">
                <div class="text-subtitle2 q-mb-sm">Informacje</div>
                <div class="text-caption">
                  <div>Korekta pozioma: {{ horizontalCorrection.toFixed(2) }} {{ measurementSystem === 'mils' ? 'mil' : 'MOA' }}</div>
                  <div>Korekta pionowa: {{ verticalCorrection.toFixed(2) }} {{ measurementSystem === 'mils' ? 'mil' : 'MOA' }}</div>
                  <div>Ilość strzałów: {{ shots.length }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Tarcza z symulacją -->
        <div class="col-12 col-md-8">
          <q-card class="target-card">
            <q-card-section class="q-pa-none">
              <div class="target-container" ref="targetContainer">
                <!-- Obraz tarczy -->
                <img
                  :src="targetImage"
                  alt="Target"
                  class="target-image"
                  @load="onImageLoad"
                />

                <!-- Siatka mil-dot -->
                <svg class="mil-dot-overlay" v-if="showGrid">
                  <!-- Linie pionowe -->
                  <line
                    v-for="x in gridLines.vertical"
                    :key="`v-${x}`"
                    :x1="x"
                    :y1="0"
                    :x2="x"
                    :y2="imageHeight"
                    stroke="rgba(255, 255, 255, 0.6)"
                    stroke-width="1"
                  />
                  <!-- Linie poziome -->
                  <line
                    v-for="y in gridLines.horizontal"
                    :key="`h-${y}`"
                    :x1="0"
                    :y1="y"
                    :x2="imageWidth"
                    :y2="y"
                    stroke="rgba(255, 255, 255, 0.6)"
                    stroke-width="1"
                  />
                  <!-- Kropki mil-dot -->
                  <circle
                    v-for="(dot, index) in milDots"
                    :key="`dot-${index}`"
                    :cx="dot.x"
                    :cy="dot.y"
                    r="2"
                    fill="rgba(255, 255, 255, 0.8)"
                  />
                  <!-- Celownik centralny -->
                  <circle
                    :cx="imageWidth / 2"
                    :cy="imageHeight / 2"
                    r="3"
                    fill="none"
                    stroke="red"
                    stroke-width="2"
                  />
                  <line
                    :x1="imageWidth / 2 - 10"
                    :y1="imageHeight / 2"
                    :x2="imageWidth / 2 + 10"
                    :y2="imageHeight / 2"
                    stroke="red"
                    stroke-width="2"
                  />
                  <line
                    :x1="imageWidth / 2"
                    :y1="imageHeight / 2 - 10"
                    :x2="imageWidth / 2"
                    :y2="imageHeight / 2 + 10"
                    stroke="red"
                    stroke-width="2"
                  />
                </svg>

                <!-- Strzały -->
                <div
                  v-for="(shot, index) in shots"
                  :key="`shot-${index}`"
                  class="shot-marker"
                  :style="{
                    left: shot.x + 'px',
                    top: shot.y + 'px'
                  }"
                >
                  <div class="shot-number">{{ index + 1 }}</div>
                </div>
              </div>

              <!-- Kontrolki siatki -->
              <div class="grid-controls q-pa-md">
                <q-checkbox
                  v-model="showGrid"
                  label="Pokaż siatkę mil-dot"
                  color="primary"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import targetImg from '../../assets/target.jpg'

defineOptions({
  name: 'SettingsCalculatorPage'
})

const router = useRouter()

// Reactive data
const measurementSystem = ref('mils')
const clickValue = ref(0.1)
const distance = ref({ label: '300m', value: 300 })
const verticalClicks = ref(0)
const horizontalClicks = ref(0)
const showGrid = ref(true)
const shots = ref([])
const imageWidth = ref(400)
const imageHeight = ref(400)
const targetContainer = ref(null)
const targetImage = targetImg

// Wind simulation
const windEnabled = ref(false)
const windDirection = ref('left')
const windSpeed = ref({ label: '2 m/s', value: 2 })

// Options
const systemOptions = [
  { label: 'Mils', value: 'mils' },
  { label: 'MOA', value: 'moa' }
]

const clickOptions = computed(() => {
  if (measurementSystem.value === 'mils') {
    return [
      { label: '0.1 mil', value: 0.1 }
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

// Computed corrections
const horizontalCorrection = computed(() => {
  return horizontalClicks.value * clickValue.value
})

const verticalCorrection = computed(() => {
  return verticalClicks.value * clickValue.value
})

// Grid calculations
const gridLines = computed(() => {
  const spacing = 40 // pixels between grid lines
  const vertical = []
  const horizontal = []

  for (let x = spacing; x < imageWidth.value; x += spacing) {
    vertical.push(x)
  }

  for (let y = spacing; y < imageHeight.value; y += spacing) {
    horizontal.push(y)
  }

  return { vertical, horizontal }
})

const milDots = computed(() => {
  const dots = []
  const spacing = 40

  for (let x = spacing; x < imageWidth.value; x += spacing) {
    for (let y = spacing; y < imageHeight.value; y += spacing) {
      dots.push({ x, y })
    }
  }

  return dots
})

// Methods
const goBack = () => {
  router.back()
}

const adjustVertical = (direction) => {
  verticalClicks.value += direction
}

const adjustHorizontal = (direction) => {
  horizontalClicks.value += direction
}

const calculateShotPosition = () => {
  const centerX = imageWidth.value / 2
  const centerY = imageHeight.value / 2

  // Convert corrections to pixel offset
  // Assuming 1 mil ≈ 20 pixels at this scale
  const pixelsPerMil = 20
  const pixelsPerMOA = 15

  const scale = measurementSystem.value === 'mils' ? pixelsPerMil : pixelsPerMOA

  let offsetX = horizontalCorrection.value * scale
  const offsetY = -verticalCorrection.value * scale // negative because screen Y is inverted

  // Apply wind effect if enabled
  if (windEnabled.value) {
    const windDeflection = calculateWindDeflection()
    if (windDirection.value === 'left') {
      offsetX -= windDeflection * scale
    } else {
      offsetX += windDeflection * scale
    }
  }

  return {
    x: centerX + offsetX,
    y: centerY + offsetY
  }
}

// Calculate wind deflection based on McCoy's equations from the article
const calculateWindDeflection = () => {
  const distanceMeters = distance.value.value
  const windSpeedMs = windSpeed.value

  // Simplified wind influence calculation based on the article
  // Using approximate formula for .308 ammunition
  // Wind influence = T - R/MV (time lag in seconds)

  const muzzleVelocity = 830 // m/s for .308 175gr SMK
  const vacuumTime = distanceMeters / muzzleVelocity

  // Approximate actual flight time (accounting for drag)
  // Using simplified ballistic coefficient
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

const takeControlShot = () => {
  // Calculate 75% area bounds (center 75% of the target)
  const centerX = imageWidth.value / 2
  const centerY = imageHeight.value / 2

  // 75% area means 37.5% on each side from center
  const areaSize = 0.75
  const halfAreaX = (imageWidth.value * areaSize) / 2
  const halfAreaY = (imageHeight.value * areaSize) / 2

  // Random position within the 75% area
  const randomX = centerX + (Math.random() - 0.5) * (halfAreaX * 2)
  const randomY = centerY + (Math.random() - 0.5) * (halfAreaY * 2)

  // Ensure shot is within image bounds
  const x = Math.max(5, Math.min(imageWidth.value - 5, randomX))
  const y = Math.max(5, Math.min(imageHeight.value - 5, randomY))

  shots.value.push({ x, y })
}

const takeShot = () => {
  const position = calculateShotPosition()

  // Add some random dispersion (±5 pixels)
  const dispersionX = (Math.random() - 0.5) * 10
  const dispersionY = (Math.random() - 0.5) * 10

  shots.value.push({
    x: Math.max(5, Math.min(imageWidth.value - 5, position.x + dispersionX)),
    y: Math.max(5, Math.min(imageHeight.value - 5, position.y + dispersionY))
  })
}

const resetSimulation = () => {
  shots.value = []
  verticalClicks.value = 0
  horizontalClicks.value = 0
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

// Watch for measurement system changes
watch(measurementSystem, (newSystem) => {
  // Reset click value to default for new system
  if (newSystem === 'mils') {
    clickValue.value = 0.1
  } else {
    clickValue.value = 0.25
  }
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

.content-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(25, 118, 210, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.target-card {
  height: fit-content;
}

.target-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
  background-color: #000;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.crosshair {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
}

.crosshair-line {
  stroke: red;
  stroke-width: 2;
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
