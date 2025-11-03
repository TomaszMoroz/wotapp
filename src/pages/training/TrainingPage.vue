<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-md">🎯 GROT - Kalkulator Offsetu</div>

    <div class="row q-gutter-md">
      <!-- Wizualizacja tarczy -->
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="text-h6 q-mb-md">🎯 Wizualizacja punktu celowania</div>

            <div class="target-container" style="position: relative;">
              <svg
                width="400"
                height="400"
                viewBox="0 0 400 400"
                class="target-svg"
              >
                <!-- Tło tarczy -->
                <circle cx="200" cy="200" r="200" fill="#f5f5f5" stroke="#ccc" stroke-width="2"/>

                <!-- Koncentryczne okręgi tarczy -->
                <circle cx="200" cy="200" r="160" fill="none" stroke="#ddd" stroke-width="1"/>
                <circle cx="200" cy="200" r="120" fill="none" stroke="#ddd" stroke-width="1"/>
                <circle cx="200" cy="200" r="80" fill="none" stroke="#ddd" stroke-width="1"/>
                <circle cx="200" cy="200" r="40" fill="none" stroke="#ddd" stroke-width="1"/>

                <!-- Linie pomocnicze -->
                <line x1="200" y1="0" x2="200" y2="400" stroke="#eee" stroke-width="1"/>
                <line x1="0" y1="200" x2="400" y2="200" stroke="#eee" stroke-width="1"/>

                <!-- Siatka pomocnicza co 20px (5cm w skali 1:4) -->
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#grid)" />

                <!-- Środek tarczy (10) -->
                <circle cx="200" cy="200" r="20" fill="#fff" stroke="#333" stroke-width="2"/>
                <text x="200" y="205" text-anchor="middle" font-family="Arial" font-size="12" fill="#333">10</text>

                <!-- Strefa 9 -->
                <circle cx="200" cy="200" r="40" fill="none" stroke="#666" stroke-width="2"/>
                <text x="200" y="245" text-anchor="middle" font-family="Arial" font-size="10" fill="#666">9</text>

                <!-- Strefa 8 -->
                <circle cx="200" cy="200" r="60" fill="none" stroke="#999" stroke-width="1"/>
                <text x="200" y="265" text-anchor="middle" font-family="Arial" font-size="10" fill="#999">8</text>

                <!-- Linia między centrum a punktem celowania -->
                <g v-if="aimPoint && offsetValue !== 0">
                  <line
                    x1="200"
                    y1="200"
                    :x2="aimPoint.x"
                    :y2="aimPoint.y"
                    stroke="blue"
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
                    stroke="red"
                    stroke-width="3"
                  />
                  <line
                    :x1="aimPoint.x"
                    :y1="aimPoint.y - 8"
                    :x2="aimPoint.x"
                    :y2="aimPoint.y + 8"
                    stroke="red"
                    stroke-width="3"
                  />
                  <circle
                    :cx="aimPoint.x"
                    :cy="aimPoint.y"
                    r="3"
                    fill="red"
                  />
                </g>

                <!-- Etykiety osi -->
                <text x="10" y="205" font-family="Arial" font-size="10" fill="#666">-50cm</text>
                <text x="390" y="205" font-family="Arial" font-size="10" fill="#666" text-anchor="end">+50cm</text>
                <text x="205" y="15" font-family="Arial" font-size="10" fill="#666">+50cm</text>
                <text x="205" y="395" font-family="Arial" font-size="10" fill="#666">-50cm</text>

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

      <!-- Panel wprowadzania danych -->
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6 q-mb-md">📏 Wprowadź dystans</div>

            <q-input
              v-model.number="targetDistance"
              type="number"
              label="Odległość do celu (m)"
              outlined
              suffix="m"
              min="0"
              max="600"
              @input="calculateOffset"
              class="q-mb-md"
            />

            <div class="text-subtitle2 q-mb-sm">🎯 Szybkie dystanse:</div>
            <div class="row q-gutter-xs q-mb-md">
              <q-btn
                v-for="dist in quickDistances"
                :key="dist"
                size="sm"
                :outline="targetDistance !== dist"
                :color="targetDistance === dist ? 'primary' : 'grey'"
                @click="setDistance(dist)"
                :label="`${dist}m`"
              />
            </div>

            <q-slider
              v-model="targetDistance"
              :min="0"
              :max="600"
              :step="10"
              label
              color="primary"
              @update:model-value="calculateOffset"
              class="q-mb-md"
            />

            <q-card flat bordered class="q-pa-md bg-grey-1">
              <div class="text-subtitle2 q-mb-sm">📊 Wyniki:</div>
              <div class="text-body2">
                <strong>Dystans:</strong> {{ targetDistance }} m<br>
                <strong>Przewyższenie:</strong> {{ offsetValue }} cm<br>
                <strong>Instrukcja:</strong> {{ getAimingInstruction() }}
              </div>
            </q-card>

            <q-separator class="q-my-md" />
          </q-card-section>
        </q-card>

        <!-- Tabela danych balistycznych -->
        <q-card class="q-mt-md">
          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">📋 Tabela balistyczna GROT</div>
            <div class="ballistic-table-container">
              <table class="ballistic-table">
                <thead>
                  <tr>
                    <th>Dystans (m)</th>
                    <th>Przewyższenie (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(data, index) in ballisticData" :key="index"
                      :class="{ 'highlight-row': data.distance === targetDistance }">
                    <td>{{ data.distance }}</td>
                    <td :class="data.elevation > 0 ? 'positive' : 'negative'">
                      {{ data.elevation > 0 ? '+' : '' }}{{ data.elevation }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </q-card-section>
                </q-card>
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

const quickDistances = [15, 20, 50, 100, 150, 200, 250, 300, 400, 500, 600]

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
.target-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.target-svg {
  border: 2px solid #333;
  border-radius: 8px;
  background: white;
}

.ballistic-table-container {
  max-height: 300px;
  overflow-y: auto;
}

.ballistic-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.ballistic-table th,
.ballistic-table td {
  padding: 4px 8px;
  text-align: center;
  border: 1px solid #ddd;
}

.ballistic-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.ballistic-table .highlight-row {
  background-color: #e3f2fd;
  font-weight: bold;
}

.ballistic-table .positive {
  color: #1976d2;
}

.ballistic-table .negative {
  color: #d32f2f;
}

@media (max-width: 768px) {
  .target-svg {
    width: 100%;
    height: auto;
  }
}
</style>
