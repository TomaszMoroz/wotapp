<template>
  <q-page class="grot-page">
    <div class="container">
      <!-- Modern Header -->
      <div class="modern-header">
        <div class="header-content">
          <div class="header-icon">
            <q-icon name="gps_fixed" size="2.5rem" color="white" />
          </div>
          <div class="header-text">
            <h1 class="header-title">GROT Offset</h1>
            <p class="header-subtitle">Korekta punktu celowania</p>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="main-grid">
        <!-- Visualization Section -->
        <div class="visualization-section">
          <div class="section-card">
            <div class="card-header-modern">
              <div class="header-left">
                <h3 class="section-title">Wizualizacja tarczy</h3>
                <p class="section-subtitle">Punkt celowania na {{ targetDistance }}m</p>
              </div>
              <div class="distance-badge">
                <q-chip
                  :color="targetDistance > 0 ? 'primary' : 'grey-5'"
                  text-color="white"
                  icon="straighten"
                  size="lg"
                  class="q-mr-sm"
                >
                  {{ targetDistance }}m
                </q-chip>
                <q-chip
                  :color="offsetValue > 0 ? 'red-5' : 'green-5'"
                  text-color="white"
                  :icon="offsetValue > 0 ? 'keyboard_arrow_down' : offsetValue < 0 ? 'keyboard_arrow_up' : 'center_focus_strong'"
                  size="lg"
                >
                  {{ offsetValue > 0 ? '-' : '+' }}{{ Math.abs(offsetValue) }}cm
                </q-chip>
              </div>
            </div>

            <div class="visualization-content">
              <div class="target-container">
                <svg
                  width="100%"
                  height="400"
                  viewBox="0 0 400 400"
                  class="target-svg"
                >
                  <!-- Tło tarczy -->
                  <circle cx="200" cy="200" r="200" fill="#f8f9fa" stroke="#e9ecef" stroke-width="2"/>

                  <!-- Koncentryczne okręgi tarczy -->
                  <circle cx="200" cy="200" r="160" fill="none" stroke="#dee2e6" stroke-width="1"/>
                  <circle cx="200" cy="200" r="120" fill="none" stroke="#dee2e6" stroke-width="1"/>
                  <circle cx="200" cy="200" r="80" fill="none" stroke="#dee2e6" stroke-width="1"/>
                  <circle cx="200" cy="200" r="40" fill="none" stroke="#dee2e6" stroke-width="1"/>

                  <!-- Linie pomocnicze -->
                  <line x1="200" y1="0" x2="200" y2="400" stroke="#f1f3f4" stroke-width="1"/>
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#f1f3f4" stroke-width="1"/>

                  <!-- Siatka pomocnicza -->
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f8f9fa" stroke-width="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#grid)" />

                  <!-- Środek tarczy (10) -->
                  <circle cx="200" cy="200" r="20" fill="#fff" stroke="#495057" stroke-width="2"/>
                  <text x="200" y="205" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#495057">10</text>

                  <!-- Strefa 9 -->
                  <circle cx="200" cy="200" r="40" fill="none" stroke="#6c757d" stroke-width="2"/>
                  <text x="200" y="245" text-anchor="middle" font-family="Arial" font-size="10" fill="#6c757d">9</text>

                  <!-- Strefa 8 -->
                  <circle cx="200" cy="200" r="60" fill="none" stroke="#adb5bd" stroke-width="1"/>
                  <text x="200" y="265" text-anchor="middle" font-family="Arial" font-size="10" fill="#adb5bd">8</text>

                  <!-- Linia między centrum a punktem celowania -->
                  <g v-if="aimPoint && offsetValue !== 0">
                    <line
                      x1="200"
                      y1="200"
                      :x2="aimPoint.x"
                      :y2="aimPoint.y"
                      stroke="#1976d2"
                      stroke-width="2"
                      stroke-dasharray="5,5"
                    />
                  </g>

                  <!-- Punkt celowania (czerwony krzyżyk) -->
                  <g v-if="aimPoint">
                    <line
                      :x1="aimPoint.x - 8"
                      :y1="aimPoint.y"
                      :x2="aimPoint.x + 8"
                      :y2="aimPoint.y"
                      stroke="#d32f2f"
                      stroke-width="3"
                    />
                    <line
                      :x1="aimPoint.x"
                      :y1="aimPoint.y - 8"
                      :x2="aimPoint.x"
                      :y2="aimPoint.y + 8"
                      stroke="#d32f2f"
                      stroke-width="3"
                    />
                    <circle
                      :cx="aimPoint.x"
                      :cy="aimPoint.y"
                      r="3"
                      fill="#d32f2f"
                    />
                  </g>

                  <!-- Etykiety osi -->
                  <text x="10" y="205" font-family="Arial" font-size="10" fill="#6c757d">-50cm</text>
                  <text x="390" y="205" font-family="Arial" font-size="10" fill="#6c757d" text-anchor="end">+50cm</text>
                  <text x="205" y="15" font-family="Arial" font-size="10" fill="#6c757d">+50cm</text>
                  <text x="205" y="395" font-family="Arial" font-size="10" fill="#6c757d">-50cm</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls Section -->
        <div class="controls-section">
          <div class="section-card">
            <div class="card-header-modern">
              <div class="header-left">
                <h3 class="section-title">Ustawienia strzelania</h3>
                <p class="section-subtitle">Konfiguracja parametrów</p>
              </div>
            </div>

            <div class="controls-content">
              <!-- Distance Input -->
              <div class="input-group">
                <label class="input-label">Odległość do celu</label>
                <q-input
                  v-model.number="targetDistance"
                  type="number"
                  outlined
                  suffix="m"
                  min="0"
                  max="600"
                  @input="calculateOffset"
                  class="modern-input"
                >
                  <template v-slot:prepend>
                    <q-icon name="straighten" color="primary" />
                  </template>
                </q-input>
              </div>

              <!-- Quick Distances -->
              <div class="input-group">
                <label class="input-label">Szybkie dystanse</label>
                <div class="quick-distances">
                  <q-btn
                    v-for="dist in quickDistances"
                    :key="dist"
                    :outline="targetDistance !== dist"
                    :color="targetDistance === dist ? 'primary' : 'grey-5'"
                    @click="setDistance(dist)"
                    :label="`${dist}m`"
                    class="distance-btn"
                    no-caps
                  />
                </div>
              </div>

              <div class="results-section">
                <h4 class="results-title">Wyniki obliczeń</h4>
                <div class="results-grid">
                  <div class="result-card">
                    <div class="result-icon">
                      <q-icon name="straighten" color="primary" />
                    </div>
                    <div class="result-content">
                      <span class="result-label">Dystans</span>
                      <span class="result-value">{{ targetDistance }} m</span>
                    </div>
                  </div>

                  <div class="result-card">
                    <div class="result-icon">
                      <q-icon name="height" color="secondary" />
                    </div>
                    <div class="result-content">
                      <span class="result-label">Korekcja</span>
                      <span class="result-value" :class="offsetValue > 0 ? 'positive' : offsetValue < 0 ? 'negative' : ''">
                        {{ offsetValue }} cm
                      </span>
                    </div>
                  </div>
                </div>

                <div class="instruction-card">
                  <q-icon name="my_location" color="accent" />
                  <span class="instruction-text">{{ getAimingInstruction() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ballistic Table Section -->
      <div class="table-section">
        <div class="section-card">
          <div class="card-header-modern">
            <div class="header-left">
              <h3 class="section-title">Tabela balistyczna</h3>
              <p class="section-subtitle">Wartości korekcji dla różnych dystansów</p>
            </div>
          </div>

          <div class="table-content">
            <q-table
              :rows="ballisticData"
              :columns="ballisticColumns"
              row-key="distance"
              flat
              class="modern-table"
              :pagination="{ rowsPerPage: 0 }"
            >
              <template v-slot:body-cell-offset="props">
                <q-td :props="props">
                  <q-chip
                    :color="props.value > 0 ? 'blue' : props.value < 0 ? 'orange' : 'grey'"
                    text-color="white"
                    size="sm"
                    :icon="props.value > 0 ? 'keyboard_arrow_up' : props.value < 0 ? 'keyboard_arrow_down' : 'remove'"
                  >
                    {{ props.value }} cm
                  </q-chip>
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

defineOptions({
  name: 'TrainingPage'
})

const targetDistance = ref(100)
const offsetValue = ref(0)

const quickDistances = [0, 15, 20, 25, 40, 60, 80, 100, 120, 140, 160, 180, 200, 250, 300, 400]

// Dane balistyczne dla GROT - oficjalne dane z instrukcji WOT
// Tabela 6: Przewyższenie toru lotu pocisku nad linią celowania (w cm)
// Dystans co 20m od 0 do 600m + interpolowane wartości dla 15m i 25m
const offsetData = {
  0: -7,
  15: -1.75, // interpolowane między 0m i 20m
  20: 0,
  25: 1.75, // interpolowane między 20m i 40m
  40: 7,
  60: 14,
  80: 20,
  100: 25,
  120: 30,
  140: 34,
  160: 37,
  180: 40,
  200: 42,
  220: 43,
  240: 43,
  260: 43,
  280: 41,
  300: 39,
  320: 36,
  340: 31,
  360: 26,
  380: 19,
  400: 11,
  420: 2,
  440: -9,
  460: -21,
  480: -35,
  500: -50,
  520: -57,
  540: -86,
  560: -107,
  580: -130,
  600: -156
}

const ballisticColumns = [
  { name: 'distance', label: 'Dystans (m)', field: 'distance', align: 'center' },
  { name: 'offset', label: 'Korekcja (cm)', field: 'offset', align: 'center' },
  { name: 'instruction', label: 'Instrukcja', field: 'instruction', align: 'left' }
]

const ballisticData = computed(() => {
  return Object.entries(offsetData).map(([dist, offset]) => ({
    distance: parseInt(dist),
    offset,
    instruction: offset < 0 ? 'Celuj wyżej' : offset > 0 ? 'Celuj niżej' : 'Celuj w centrum'
  })).filter(item => item.distance % 25 === 0)
})

const aimPoint = computed(() => {
  const centerX = 200
  const centerY = 200
  const pixelsPerCm = 4 // 4 piksele na cm

  // Jeśli offset ujemny (z tabeli) - celuj wyżej (minus offsetY)
  // Jeśli offset dodatni (z tabeli) - celuj niżej (plus offsetY)
  const offsetY = offsetValue.value * pixelsPerCm

  return {
    x: centerX,
    y: centerY + offsetY
  }
})

const calculateOffset = () => {
  const distance = targetDistance.value
  if (distance === 0) {
    offsetValue.value = offsetData[0]
    return
  }

  const distances = Object.keys(offsetData).map(Number).sort((a, b) => a - b)

  if (distance <= distances[0]) {
    offsetValue.value = offsetData[distances[0]]
    return
  }

  if (distance >= distances[distances.length - 1]) {
    offsetValue.value = offsetData[distances[distances.length - 1]]
    return
  }

  for (let i = 0; i < distances.length - 1; i++) {
    if (distance >= distances[i] && distance <= distances[i + 1]) {
      const d1 = distances[i]
      const d2 = distances[i + 1]
      const o1 = offsetData[d1]
      const o2 = offsetData[d2]

      const ratio = (distance - d1) / (d2 - d1)
      offsetValue.value = Math.round(o1 + (o2 - o1) * ratio)
      break
    }
  }
}

const setDistance = (distance) => {
  targetDistance.value = distance
  calculateOffset()
}

const getAimingInstruction = () => {
  if (offsetValue.value < 0) {
    return `Celuj ${Math.abs(offsetValue.value)}cm wyżej od centrum tarczy`
  } else if (offsetValue.value > 0) {
    return `Celuj ${offsetValue.value}cm niżej od centrum tarczy`
  } else {
    return 'Celuj w centrum tarczy (10)'
  }
}

onMounted(() => {
  calculateOffset()
})
</script>

<style scoped>
.grot-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

/* Modern Header */
.modern-header {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.3);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-icon {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 16px;
  backdrop-filter: blur(10px);
}

.header-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.header-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin: 8px 0 0 0;
  font-weight: 400;
}

/* Main Grid Layout */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  margin-bottom: 32px;
}

/* Section Cards */
.section-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.card-header-modern {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-left h3.section-title {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
}

.section-subtitle {
  color: #6c757d;
  font-size: 0.95rem;
  margin: 4px 0 0 0;
  font-weight: 400;
}

.distance-badge .q-chip {
  font-weight: 600;
  font-size: 0.9rem;
}

/* Visualization */
.visualization-content {
  padding: 32px;
}

.target-container {
  position: relative;
  background: #fafbfc;
  border-radius: 12px;
  padding: 24px;
  border: 2px solid #e9ecef;
}

.target-svg {
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: white;
}

.offset-chip-container {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 16px);
  z-index: 10;
}

.offset-chip {
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

/* Controls */
.controls-content {
  padding: 32px;
}

.input-group {
  margin-bottom: 32px;
}

.input-label {
  display: block;
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 12px;
}

.modern-input {
  font-size: 1rem;
}

.quick-distances {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.distance-btn {
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.modern-slider {
  margin: 16px 0;
}

/* Results */
.results-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e9ecef;
}

.results-title {
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.result-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e9ecef;
}

.result-icon .q-icon {
  font-size: 1.5rem;
}

.result-content {
  display: flex;
  flex-direction: column;
}

.result-label {
  color: #6c757d;
  font-size: 0.85rem;
  font-weight: 500;
}

.result-value {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.result-value.positive {
  color: #1976d2;
}

.result-value.negative {
  color: #f57c00;
}

.instruction-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e9ecef;
}

.instruction-text {
  color: #2c3e50;
  font-weight: 500;
}

/* Table Section */
.table-section {
  grid-column: 1 / -1;
}

.table-content {
  padding: 0;
}

.modern-table {
  border-radius: 0 0 16px 16px;
}

.modern-table .q-table__top {
  background: transparent;
}

.modern-table .q-table__bottom {
  background: transparent;
}

/* Mobile Responsiveness */
@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .header-title {
    font-size: 2rem;
  }

  .card-header-modern {
    flex-direction: column;
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }

  .modern-header {
    padding: 24px;
    margin-bottom: 24px;
  }

  .header-title {
    font-size: 1.8rem;
  }

  .visualization-content,
  .controls-content {
    padding: 24px;
  }

  .target-container {
    padding: 16px;
  }

  .quick-distances {
    grid-template-columns: repeat(3, 1fr);
  }

  .results-grid {
    grid-template-columns: 1fr;
  }

  .target-svg {
    height: 320px;
  }

  .offset-chip {
    font-size: 1.1rem;
    padding: 12px 20px;
    min-width: 140px;
    height: 48px;
    font-weight: 700;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 1.5rem;
  }

  .visualization-content,
  .controls-content {
    padding: 16px;
  }

  .quick-distances {
    grid-template-columns: repeat(2, 1fr);
  }

  .target-svg {
    height: 280px;
  }
}
</style>
