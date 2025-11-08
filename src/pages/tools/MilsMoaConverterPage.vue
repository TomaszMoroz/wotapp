<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav />

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
            <div class="text-h4 text-weight-bold text-primary">Konwerter MILS - MOA</div>
            <div class="text-subtitle1 text-grey-7">Przelicznik jednostek pomiarowych celowników</div>
          </div>
        </div>
      </div>

      <!-- Treść konwertera -->
      <div class="row q-col-gutter-lg">
        <!-- Kontrolki -->
        <div class="col-12 col-md-6">
          <q-card class="controls-card">
            <q-card-section>
              <div class="text-h6 q-mb-md">
                <q-icon name="tune" class="q-mr-sm" color="primary" />
                Konwersja jednostek
              </div>

              <!-- Kierunek konwersji -->
              <q-field label="Kierunek konwersji" stack-label class="q-mb-md">
                <div class="conversion-direction">
                  <q-btn
                    :outline="conversionDirection !== 'mils-to-moa'"
                    :color="conversionDirection === 'mils-to-moa' ? 'primary' : 'grey-6'"
                    @click="conversionDirection = 'mils-to-moa'"
                    label="MILS → MOA"
                    class="conversion-btn q-mr-sm"
                    no-caps
                  />
                  <q-btn
                    :outline="conversionDirection !== 'moa-to-mils'"
                    :color="conversionDirection === 'moa-to-mils' ? 'primary' : 'grey-6'"
                    @click="conversionDirection = 'moa-to-mils'"
                    label="MOA → MILS"
                    class="conversion-btn"
                    no-caps
                  />
                </div>
              </q-field>

              <!-- Dystans -->
              <q-field label="Dystans do celu" stack-label class="q-mb-md">
                <q-input
                  v-model.number="distance"
                  type="number"
                  suffix="m"
                  min="50"
                  max="2000"
                  step="50"
                  outlined
                  dense
                />
              </q-field>

              <!-- Szybkie dystanse -->
              <div class="text-subtitle2 q-mb-sm">Szybkie dystanse:</div>
              <div class="row q-gutter-xs q-mb-lg">
                <q-btn
                  v-for="dist in quickDistances"
                  :key="dist"
                  size="sm"
                  outline
                  color="black"
                  :label="`${dist}m`"
                  @click="distance = dist"
                  class="distance-btn"
                />
              </div>

              <!-- Wartość wejściowa -->
              <q-field :label="inputLabel" stack-label class="q-mb-md">
                <q-input
                  v-model.number="inputValue"
                  type="number"
                  :suffix="inputSuffix"
                  step="0.1"
                  min="0"
                  outlined
                  dense
                  class="input-large"
                />
              </q-field>

              <!-- Szybkie wartości -->
              <div class="text-subtitle2 q-mb-sm">Szybkie wartości:</div>
              <div class="row q-gutter-sm q-mb-lg">
                <q-btn
                  v-for="quick in quickValues"
                  :key="quick"
                  size="sm"
                  outline
                  color="primary"
                  :label="`${quick} ${inputSuffix}`"
                  @click="inputValue = quick"
                />
              </div>

              <!-- Reset -->
              <q-btn
                color="grey-6"
                icon="refresh"
                label="Reset"
                @click="resetValues"
                outline
                class="full-width"
              />
            </q-card-section>
          </q-card>
        </div>

        <!-- Wyniki -->
        <div class="col-12 col-md-6">
          <q-card class="controls-card">
            <q-card-section>
              <div class="text-h6 q-mb-md">
                <q-icon name="calculate" class="q-mr-sm" color="primary" />
                Wyniki
              </div>

              <!-- Główny wynik konwersji -->
              <q-card class="result-main q-mb-lg" flat bordered>
                <q-card-section class="text-center">
                  <div class="text-caption text-grey-6">{{ outputLabel }}</div>
                  <div class="text-h4 text-weight-bold text-primary q-my-sm">
                    {{ mainResult.toFixed(3) }}
                  </div>
                  <div class="text-subtitle2 text-grey-8">{{ outputSuffix }}</div>
                </q-card-section>
              </q-card>

              <!-- Rozmiar w cm na dystansie -->
              <q-card class="result-secondary q-mb-lg" flat bordered>
                <q-card-section class="text-center">
                  <div class="text-caption text-grey-6">Rozmiar na {{ distance }}m</div>
                  <div class="text-h5 text-weight-bold q-my-sm" style="color:#111;">
                    {{ cmResult.toFixed(1) }}
                  </div>
                  <div class="text-subtitle2 text-grey-8">centymetrów</div>
                </q-card-section>
              </q-card>

              <!-- Dodatkowe informacje -->
              <q-card class="info-card" flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm">
                    <q-icon name="info" class="q-mr-xs" color="info" />
                    Informacje dodatkowe
                  </div>
                  <div class="text-caption text-grey-7">
                    <div>• 1 MIL = {{ MIL_TO_MOA.toFixed(4) }} MOA</div>
                    <div>• 1 MOA = {{ MOA_TO_MIL.toFixed(4) }} MIL</div>
                    <div v-if="conversionDirection === 'mils-to-moa'">
                      • {{ inputValue }} MIL pokrywa {{ cmResult.toFixed(1) }}cm na {{ distance }}m
                    </div>
                    <div v-else>
                      • {{ inputValue }} MOA pokrywa {{ cmResult.toFixed(1) }}cm na {{ distance }}m
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'MilsMoaConverterPage'
})

const router = useRouter()

// Reactive data
const distance = ref(100) // dystans w metrach
const inputValue = ref(1) // wartość do przeliczenia
const conversionDirection = ref('mils-to-moa') // kierunek konwersji

// Stałe konwersji
const MIL_TO_MOA = 3.4377
const MOA_TO_MIL = 0.2909

// Computed properties for labels
const inputLabel = computed(() => {
  return conversionDirection.value === 'mils-to-moa' ? 'Wartość w MILS' : 'Wartość w MOA'
})

const inputSuffix = computed(() => {
  return conversionDirection.value === 'mils-to-moa' ? 'mils' : 'MOA'
})

const outputLabel = computed(() => {
  return conversionDirection.value === 'mils-to-moa' ? 'Wynik w MOA' : 'Wynik w MILS'
})

const outputSuffix = computed(() => {
  return conversionDirection.value === 'mils-to-moa' ? 'MOA' : 'mils'
})

// Szybkie wartości od 0.5 do 10 co 0.5
const quickValues = computed(() => {
  const values = []
  for (let v = 0.5; v <= 10; v += 0.5) {
    values.push(Number(v.toFixed(1)))
  }
  return values
})

// Szybkie dystanse
const quickDistances = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500]

// Główny wynik konwersji
const mainResult = computed(() => {
  const value = inputValue.value || 0
  if (conversionDirection.value === 'mils-to-moa') {
    return value * MIL_TO_MOA
  } else {
    return value * MOA_TO_MIL
  }
})

// Wynik w centymetrach na danym dystansie
const cmResult = computed(() => {
  const value = inputValue.value || 0
  const dist = distance.value || 100

  if (conversionDirection.value === 'mils-to-moa') {
    // MILS do cm: mils × dystans × 0.1 (1 MIL = 0.1m na 100m = 10cm na 100m)
    return value * dist * 0.1
  } else {
    // MOA do cm: MOA × dystans × 0.02909 (1 MOA ≈ 2.909cm na 100m)
    return value * dist * 0.02909
  }
})

// Methods
const goBack = () => {
  router.back()
}

const resetValues = () => {
  distance.value = 100
  inputValue.value = 1
  conversionDirection.value = 'mils-to-moa'
}
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

.results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.result-item {
  transition: transform 0.2s ease;
}

.result-item:hover {
  transform: translateY(-2px);
}

.conversion-direction {
  width: 100%;
  display: flex;
  gap: 8px;
}

.conversion-btn {
  flex: 1;
  min-height: 40px;
}

.conversion-direction .q-btn-toggle {
  border-radius: 8px;
}

.input-large .q-field__control {
  font-size: 1.1rem;
  font-weight: 500;
}
.result-main {
  background: #fff;
  border: 2px solid #e0e0e0;
  color: #111;
  transition: transform 0.2s ease;
}

.result-main:hover {
  background: #f5f5f5;
  border-color: #bdbdbd;
  transform: translateY(-2px);
}

.result-secondary {
  background: #fff;
  border: 2px solid #e0e0e0;
  color: #111;
  transition: transform 0.2s ease;
}

.result-secondary:hover {
  background: #f5f5f5;
  border-color: #bdbdbd;
  transform: translateY(-2px);
}

.info-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  color: #111;
}

.distance-btn {
  min-width: 60px;
  font-size: 0.8rem;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .conversion-direction .q-btn-toggle {
    flex-direction: column;
  }

  .conversion-direction .q-btn-toggle .q-btn {
    width: 100%;
    margin: 2px 0;
  }

  .result-item.full-width {
    grid-column: 1;
  }
}
</style>
