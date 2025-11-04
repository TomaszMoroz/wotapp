<template>
  <q-page class="grot-page">
    <div class="container q-pa-md">
      <!-- Header -->
      <div class="page-header q-mb-xl">
        <div class="row items-center q-gutter-md">
          <q-icon name="gps_fixed" size="3rem" color="primary" />
          <div>
            <div class="text-h4 text-weight-bold text-primary">GROT - Kalkulator Offsetu</div>
            <div class="text-subtitle1 text-grey-7">Precyzyjne wyliczenia dla strzelań na odległość</div>
          </div>
        </div>
      </div>

      <div class="row q-gutter-lg">
        <!-- Panel wizualizacji -->
        <div class="col-12 col-lg-7">
          <q-card class="visualization-card">
            <q-card-section class="card-header">
              <div class="row items-center justify-between">
                <div class="text-h6 text-weight-bold">🎯 Wizualizacja punktu celowania</div>
                <q-chip :color="targetDistance > 0 ? 'positive' : 'grey'" text-color="white" icon="straighten">
                  {{ targetDistance }}m
                </q-chip>
              </div>
            </q-card-section>

            <q-card-section class="visualization-section">
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

                  <!-- Chip z informacją o korekcji wewnątrz SVG -->
                  <foreignObject
                    v-if="offsetValue !== 0 && aimPoint"
                    :x="(200 + aimPoint.x) / 2 + 10"
                    :y="(200 + aimPoint.y) / 2 - 20"
                    width="140"
                    height="40">
                    <q-chip
                      :color="offsetValue > 0 ? 'blue' : 'orange'"
                      text-color="white"
                      :icon="offsetValue > 0 ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                      size="md"
                    >
                      {{ Math.abs(offsetValue) }}cm {{ offsetValue > 0 ? '↑' : '↓' }}
                    </q-chip>
                  </foreignObject>
                </svg>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Panel kontrolny -->
        <div class="col-12 col-lg-5">
          <q-card class="control-card">
            <q-card-section class="card-header">
              <div class="text-h6 text-weight-bold">📏 Ustawienia strzelania</div>
            </q-card-section>

            <q-card-section>
              <!-- Input odległości -->
              <div class="q-mb-lg">
                <q-input
                  v-model.number="targetDistance"
                  type="number"
                  label="Odległość do celu"
                  outlined
                  suffix="m"
                  min="0"
                  max="600"
                  @input="calculateOffset"
                  class="distance-input"
                >
                  <template v-slot:prepend>
                    <q-icon name="straighten" color="primary" />
                  </template>
                </q-input>
              </div>

              <!-- Szybkie dystanse -->
              <div class="q-mb-lg">
                <div class="text-subtitle2 q-mb-sm text-weight-medium">🎯 Szybkie dystanse:</div>
                <div class="quick-distances-grid">
                  <q-btn
                    v-for="dist in quickDistances"
                    :key="dist"
                    size="md"
                    :outline="targetDistance !== dist"
                    :color="targetDistance === dist ? 'primary' : 'grey-5'"
                    @click="setDistance(dist)"
                    :label="`${dist}m`"
                    class="distance-btn"
                  />
                </div>
              </div>

              <!-- Slider -->
              <div class="q-mb-lg">
                <div class="text-subtitle2 q-mb-sm text-weight-medium">🎚️ Precyzyjna regulacja:</div>
                <q-slider
                  v-model="targetDistance"
                  :min="0"
                  :max="600"
                  :step="10"
                  label
                  color="primary"
                  @update:model-value="calculateOffset"
                  class="distance-slider"
                />
              </div>

              <!-- Wyniki -->
              <q-card flat bordered class="results-card">
                <q-card-section>
                  <div class="text-subtitle2 q-mb-md text-weight-bold">📊 Wyniki obliczeń:</div>
                  <div class="results-grid">
                    <div class="result-item">
                      <q-icon name="straighten" color="primary" size="sm" />
                      <span class="result-label">Dystans:</span>
                      <span class="result-value">{{ targetDistance }} m</span>
                    </div>
                    <div class="result-item">
                      <q-icon name="height" color="secondary" size="sm" />
                      <span class="result-label">Przewyższenie:</span>
                      <span class="result-value" :class="offsetValue > 0 ? 'text-positive' : offsetValue < 0 ? 'text-negative' : ''">
                        {{ offsetValue }} cm
                      </span>
                    </div>
                    <div class="result-instruction">
                      <q-icon name="my_location" color="accent" size="sm" />
                      <span>{{ getAimingInstruction() }}</span>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-card-section>
          </q-card>

          <!-- Tabela balistyczna -->
          <q-card class="ballistic-card q-mt-lg">
            <q-card-section class="card-header">
              <div class="text-h6 text-weight-bold">📋 Tabela balistyczna GROT</div>
            </q-card-section>
            <q-card-section class="q-pa-none">
              <div class="ballistic-table-container">
                <q-table
                  :rows="ballisticData"
                  :columns="ballisticColumns"
                  row-key="distance"
                  flat
                  :rows-per-page-options="[0]"
                  hide-pagination
                  dense
                  class="ballistic-table"
                >
                  <template v-slot:body-cell-elevation="props">
                    <q-td :props="props" :class="{
                      'text-positive': props.value > 0,
                      'text-negative': props.value < 0,
                      'text-weight-bold': props.row.distance === targetDistance
                    }">
                      {{ props.value > 0 ? '+' : '' }}{{ props.value }}
                    </q-td>
                  </template>
                  <template v-slot:body-cell-distance="props">
                    <q-td :props="props" :class="{
                      'text-weight-bold bg-primary text-white': props.row.distance === targetDistance
                    }">
                      {{ props.value }}
                    </q-td>
                  </template>
                </q-table>
              </div>
            </q-card-section>
          </q-card>
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

const quickDistances = [15, 20, 50, 100, 150, 200, 250, 300, 400, 500]

const ballisticColumns = [
  {
    name: 'distance',
    label: 'Dystans (m)',
    field: 'distance',
    align: 'center',
    sortable: true
  },
  {
    name: 'elevation',
    label: 'Przewyższenie (cm)',
    field: 'elevation',
    align: 'center',
    sortable: true
  }
]

// Dane balistyczne z tabeli (dystans w metrach, przewyższenie w cm)
const ballisticData = [
  { distance: 0, elevation: -7 },
  { distance: 20, elevation: 0 },
  { distance: 40, elevation: 7 },
  { distance: 60, elevation: 14 },
  { distance: 80, elevation: 19 },
  { distance: 100, elevation: 25 },
  { distance: 120, elevation: 30 },
  { distance: 140, elevation: 34 },
  { distance: 160, elevation: 37 },
  { distance: 180, elevation: 40 },
  { distance: 200, elevation: 42 },
  { distance: 220, elevation: 43 },
  { distance: 240, elevation: 43 },
  { distance: 260, elevation: 43 },
  { distance: 280, elevation: 41 },
  { distance: 300, elevation: 39 },
  { distance: 320, elevation: 36 },
  { distance: 340, elevation: 31 },
  { distance: 360, elevation: 26 },
  { distance: 380, elevation: 19 },
  { distance: 400, elevation: 11 },
  { distance: 420, elevation: 2 },
  { distance: 440, elevation: -9 },
  { distance: 460, elevation: -21 },
  { distance: 480, elevation: -35 },
  { distance: 500, elevation: -50 },
  { distance: 520, elevation: -67 },
  { distance: 540, elevation: -86 },
  { distance: 560, elevation: -107 },
  { distance: 580, elevation: -130 },
  { distance: 600, elevation: -156 }
]

// Punkt celowania na tarczy
const aimPoint = computed(() => {
  // Skala: 1cm = 4px, centrum tarczy na x=200, y=200
  // LOGIKA: Pokazujemy gdzie celować, żeby trafić w centrum
  // Jeśli pocisk leci wyżej (+), musimy celować niżej (y większe)
  // Jeśli pocisk leci niżej (-), musimy celować wyżej (y mniejsze)
  const y = 200 + (offsetValue.value * 4)
  return {
    x: 200,
    y: Math.max(10, Math.min(390, y))
  }
})

const calculateOffset = () => {
  const distance = targetDistance.value

  // Znajdź najbliższe punkty w tabeli
  let lowerPoint = null
  let upperPoint = null

  for (let i = 0; i < ballisticData.length - 1; i++) {
    if (distance >= ballisticData[i].distance && distance <= ballisticData[i + 1].distance) {
      lowerPoint = ballisticData[i]
      upperPoint = ballisticData[i + 1]
      break
    }
  }

  if (distance <= ballisticData[0].distance) {
    offsetValue.value = ballisticData[0].elevation
  } else if (distance >= ballisticData[ballisticData.length - 1].distance) {
    offsetValue.value = ballisticData[ballisticData.length - 1].elevation
  } else if (lowerPoint && upperPoint) {
    // Interpolacja liniowa
    const ratio = (distance - lowerPoint.distance) / (upperPoint.distance - lowerPoint.distance)
    offsetValue.value = Math.round(lowerPoint.elevation + ratio * (upperPoint.elevation - lowerPoint.elevation))
  }
}

const setDistance = (distance) => {
  targetDistance.value = distance
  calculateOffset()
}

const getAimingInstruction = () => {
  if (offsetValue.value > 0) {
    return `Celuj ${offsetValue.value}cm NIŻEJ od centrum`
  } else if (offsetValue.value < 0) {
    return `Celuj ${Math.abs(offsetValue.value)}cm WYŻEJ od centrum`
  } else {
    return 'Celuj w centrum tarczy'
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
}

.page-header {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(25, 118, 210, 0.1);
}

.visualization-card,
.control-card,
.ballistic-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.card-header {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  border-radius: 16px 16px 0 0;
  margin: -16px -16px 16px -16px;
  padding: 16px;
}

.visualization-section {
  padding: 0;
}

.target-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.target-svg {
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  height: auto;
}

.distance-input {
  font-size: 1.1rem;
}

.quick-distances-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 8px;
}

.distance-btn {
  border-radius: 8px;
  font-weight: 500;
}

.distance-slider {
  margin: 16px 0;
}

.results-card {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(21, 101, 192, 0.05) 100%);
  border: 1px solid rgba(25, 118, 210, 0.2);
}

.results-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.result-label {
  font-weight: 500;
  color: #6c757d;
  min-width: 100px;
}

.result-value {
  font-weight: bold;
  font-size: 1.1rem;
}

.result-instruction {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(25, 118, 210, 0.1);
  border-radius: 8px;
  font-weight: 500;
  color: #1565c0;
}

.ballistic-table-container {
  max-height: 300px;
  overflow-y: auto;
}

.ballistic-table {
  font-size: 0.9rem;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .row {
    flex-direction: column;
  }

  .col-lg-7,
  .col-lg-5 {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .quick-distances-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .target-svg {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .quick-distances-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .target-svg {
    height: 250px;
  }

  .result-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .result-label {
    min-width: auto;
  }
}
</style>
