<template>
  <q-page class="modern-bg q-pa-lg">
    <div class="section-header-limited">
      <BackNav color="black"/>
      <div class="row items-center justify-between q-mb-xl">
        <div>
          <div class="text-h3 text-weight-bold modern-title">Kalkulator odległości</div>
          <div class="text-subtitle1 text-grey-7 q-mt-xs">Obliczanie odległości metodą \"DWK1000\"</div>
        </div>
      </div>
    </div>
    <div class="dashboard-tiles q-mb-xl">
      <div class="tiles-grid">
        <q-card class="modern-tile" style="max-width: 420px; width: 100%;">
          <q-card-section class="tile-content">
            <div class="tile-icon-bg icon-ruler-bg">
              <q-icon name="straighten" color="#65473f" size="52px" class="icon-ruler" />
            </div>
            <div class="tile-label-row">
              <span class="tile-label">Dane wejściowe</span>
            </div>
            <div class="inputs-grid q-mt-md">
              <div class="input-group">
                <label class="input-label">Wymiar obiektu (m)</label>
                <q-input
                  v-model.number="objectHeight"
                  type="number"
                  filled
                  placeholder="Np. 1.8"
                  step="0.1"
                  min="0"
                  class="modern-input"
                />

                <!-- Object selector -->
                <div class="object-selector q-mt-md">
                  <q-btn
                    unelevated
                    icon="security"
                    label="lub wybierz obiekt z bazy"
                    color="blue-grey-8"
                    text-color="white"
                    size="md"
                    @click="showObjectDialog = true"
                    class="object-selector-btn"
                  />
                </div>

                <!-- Selected object display -->
                <div v-if="selectedObjectName" class="selected-object q-mt-md">
                  <q-chip
                    :label="selectedObjectName"
                    color="primary"
                    text-color="white"
                    icon="check_circle"
                    removable
                    @remove="clearSelectedObject"
                  />
                </div>
              </div>

              <div class="input-group">
                <label class="input-label">Wartość w tysięcznych</label>
                <q-input
                  v-model.number="distanceInMils"
                  type="number"
                  filled
                  placeholder="Np. 5.2"
                  step="0.1"
                  min="0"
                  class="modern-input"
                />
              </div>
            </div>

            <q-chip v-if="calculatedDistance" class="tile-desc-chip-big q-mt-lg" color="grey-3" text-color="grey-8" dense>
              Obliczona odległość: <b class="q-ml-xs">{{ calculatedDistance }} m</b>
            </q-chip>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Object Selection Dialog -->
    <q-dialog v-model="showObjectDialog" persistent>
      <q-card class="object-dialog">
        <q-card-section class="dialog-header">
          <div class="text-h6 text-weight-bold">Wybierz obiekt</div>
        </q-card-section>

        <!-- Filter input -->
        <q-card-section class="filter-section">
          <q-input
            v-model="equipmentFilter"
            placeholder="Filtruj sprzęt..."
            filled
            clearable
            class="filter-input"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <!-- Dimension selector -->
          <div class="dimension-selector q-mt-md">
            <div class="text-subtitle2 q-mb-sm text-center">Wybierz wymiar:</div>
            <q-option-group
              v-model="selectedDimension"
              :options="[
                { label: 'Długość', value: 'length' },
                { label: 'Szerokość', value: 'width' },
                { label: 'Wysokość', value: 'height' }
              ]"
              color="primary"
              type="radio"
              inline
              class="dimension-radio"
            />
          </div>
        </q-card-section>

        <q-card-section class="object-list">
          <div
            v-for="equipment in filteredEquipment"
            :key="equipment.id"
            class="equipment-item"
            @click="selectEquipment(equipment)"
          >
            <div class="equipment-info">
              <div class="equipment-details">
                <span class="equipment-type"><q-chip class="text-h6">{{ equipment.name }}{{ selectedDimension === 'height' ? ' Wys:' : selectedDimension === 'width' ? ' Szer:' : ' Dł:' }}
                  {{ selectedDimension === 'height' ? (equipment.height + 'm') : selectedDimension === 'width' ? (equipment.width + 'm') : (equipment.length + 'm') }}</q-chip>
                </span>
              </div>
              <div class="text-left text-body2">{{ equipment.type }}</div>
            </div>
            <q-separator class="q-my-md"/>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Anuluj" color="grey" @click="closeDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import BackNav from 'components/BackNav.vue'

// Distance Calculator
const objectHeight = ref(null)
const distanceInMils = ref(null)
const showObjectDialog = ref(false)
const equipmentFilter = ref('')
const selectedDimension = ref('length')
const selectedObjectName = ref('')

// Military equipment data
const militaryEquipment = ref([
  // BOJOWE WOZY PIECHOTY
  { id: 1, name: 'BMP 1', type: 'Bojowy wóz piechoty', length: 6.74, width: 2.94, height: 2.15, description: 'Bojowy wóz piechoty' },
  { id: 2, name: 'BMP 2', type: 'Bojowy wóz piechoty', length: 6.74, width: 3.15, height: 2.45, description: 'Bojowy wóz piechoty' },
  { id: 3, name: 'BMP 3', type: 'Bojowy wóz piechoty', length: 6.73, width: 3.15, height: 2.45, description: 'Bojowy wóz piechoty' },
  { id: 4, name: 'BTR 80A', type: 'Bojowy wóz piechoty', length: 7.62, width: 2.90, height: 2.41, description: 'Transporter opancerzony' },
  { id: 5, name: 'BTR 90', type: 'Bojowy wóz piechoty', length: 7.64, width: 3.20, height: 2.98, description: 'Transporter opancerzony' },
  { id: 6, name: 'BMP-T TERMINATOR', type: 'Bojowy wóz piechoty', length: 6.96, width: 3.46, height: 2.10, description: 'Bojowy wóz wsparcia czołgów' },
  { id: 7, name: 'MTLB', type: 'Bojowy wóz piechoty', length: 6.35, width: 2.85, height: 1.87, description: 'Wielozadaniowy transporter' },
  { id: 8, name: 'BMD 1', type: 'Bojowy wóz piechoty', length: 5.40, width: 2.63, height: 1.97, description: 'Bojowy wóz desantowy' },
  { id: 9, name: 'BMD 2', type: 'Bojowy wóz piechoty', length: 7.85, width: 2.94, height: 2.45, description: 'Bojowy wóz desantowy' },
  { id: 10, name: 'BMD 3', type: 'Bojowy wóz piechoty', length: 5.40, width: 2.63, height: 1.97, description: 'Bojowy wóz desantowy' },
  { id: 11, name: 'BMD 4', type: 'Bojowy wóz piechoty', length: 6.10, width: 3.13, height: 2.45, description: 'Bojowy wóz desantowy' },

  // CZOŁGI
  { id: 12, name: 'T-64', type: 'Czołg', length: 6.54, width: 3.60, height: 2.17, description: 'Czołg podstawowy' },
  { id: 13, name: 'T-72', type: 'Czołg', length: 6.91, width: 3.58, height: 2.19, description: 'Czołg podstawowy' },
  { id: 14, name: 'T-80', type: 'Czołg', length: 6.98, width: 3.58, height: 2.22, description: 'Czołg podstawowy' },
  { id: 15, name: 'T-90', type: 'Czołg', length: 6.86, width: 3.78, height: 2.22, description: 'Czołg podstawowy' },

  // ARTYLERIA
  { id: 16, name: '2S1 GOŹDZIK', type: 'Artyleria', length: 7.62, width: 2.85, height: 2.74, description: 'Samobieżna hauica 122mm' },
  { id: 17, name: '2S3 AKACJA', type: 'Artyleria', length: 8.40, width: 3.20, height: 2.80, description: 'Samobieżna hauica 152mm' },
  { id: 18, name: '2S7 PION', type: 'Artyleria', length: 10.50, width: 3.38, height: 3.00, description: 'Samobieżna hauica 203mm' },
  { id: 19, name: '2S5 HIACYNT', type: 'Artyleria', length: 8.33, width: 2.76, height: 3.25, description: 'Samobieżna hauica 152mm' },
  { id: 20, name: '2S19 MSTA-S', type: 'Artyleria', length: 7.00, width: 3.38, height: 2.95, description: 'Samobieżna hauica 152mm' },
  { id: 21, name: '2S4 TULIPAN', type: 'Artyleria', length: 8.50, width: 3.20, height: 3.20, description: 'Samobieżny moździerz 240mm' },
  { id: 22, name: 'BM-21 GRAD', type: 'Artyleria', length: 7.35, width: 2.40, height: 3.10, description: 'Wyrzutnia rakiet 122mm' },
  { id: 23, name: 'BM-27 URAGAN', type: 'Artyleria', length: 9.63, width: 2.80, height: 3.23, description: 'Wyrzutnia rakiet 220mm' },
  { id: 24, name: 'BM-30 SMIERCZ', type: 'Artyleria', length: 12.37, width: 3.05, height: 3.05, description: 'Wyrzutnia rakiet 300mm' },
  { id: 25, name: 'TOS-1 BURATINO', type: 'Artyleria', length: 9.50, width: 3.60, height: 2.22, description: 'Termobaryczna wyrzutnia' },
  { id: 26, name: '9K79 TOCZKA/SS21', type: 'Artyleria', length: 9.50, width: 2.78, height: 2.50, description: 'Taktyczny pocisk balistyczny' },
  { id: 27, name: '2S23 NONA', type: 'Artyleria', length: 7.50, width: 2.90, height: 2.75, description: 'Samobieżna hauica-moździerz' },

  // ARTYLERIA PRZECIWLOTNICZA
  { id: 28, name: 'S1-PANCYR', type: 'Obrona przeciwlotnicza', length: 5.80, width: 2.40, height: 2.30, description: 'System przeciwlotniczy' },
  { id: 29, name: '9K330 TOR/SA-15', type: 'Obrona przeciwlotnicza', length: 7.50, width: 3.30, height: 5.10, description: 'Zestaw przeciwlotniczy' },
  { id: 30, name: '9K37 BUK/SA-11', type: 'Obrona przeciwlotnicza', length: 9.30, width: 3.25, height: 3.80, description: 'Zestaw przeciwlotniczy' },
  { id: 31, name: '9K33 OSA/SA-8', type: 'Obrona przeciwlotnicza', length: 9.14, width: 2.75, height: 4.20, description: 'Zestaw przeciwlotniczy' },
  { id: 32, name: '2K11 KRUG/SA-4', type: 'Obrona przeciwlotnicza', length: 7.50, width: 3.20, height: 4.47, description: 'Zestaw przeciwlotniczy' },
  { id: 33, name: '9K35 STRIELA 10/SA-13', type: 'Obrona przeciwlotnicza', length: 6.60, width: 2.85, height: 2.30, description: 'Zestaw przeciwlotniczy' },
  { id: 34, name: '9K31 STRIELA 1/SA-9', type: 'Obrona przeciwlotnicza', length: 5.80, width: 2.40, height: 2.30, description: 'Zestaw przeciwlotniczy' },
  { id: 35, name: '9K22 TUNGUSKA/SA-19', type: 'Obrona przeciwlotnicza', length: 6.20, width: 2.90, height: 2.20, description: 'Zestaw przeciwlotniczy' },
  { id: 36, name: 'ZSU-23/4 SHILKA', type: 'Obrona przeciwlotnicza', length: 6.20, width: 2.90, height: 2.20, description: 'Działo przeciwlotnicze' },
  { id: 37, name: '2K12 KUB/SA-6', type: 'Obrona przeciwlotnicza', length: 6.96, width: 3.11, height: 3.18, description: 'Zestaw przeciwlotniczy' },

  // POJAZDY
  { id: 38, name: 'GAZ 2330 TIGR', type: 'Pojazd', length: 5.35, width: 2.40, height: 2.40, description: 'Pojazd wielozadaniowy' },
  { id: 39, name: 'UAZ 469', type: 'Pojazd', length: 4.00, width: 1.78, height: 2.05, description: 'Pojazd terenowy' },
  { id: 40, name: 'ZIŁ-157', type: 'Pojazd', length: 6.92, width: 2.31, height: 2.91, description: 'Samochód ciężarowy' },
  { id: 41, name: 'KRAZ 260', type: 'Pojazd', length: 9.00, width: 2.72, height: 3.14, description: 'Samochód ciężarowy' }
])

const selectEquipment = (equipment) => {
  const dimensionValue = selectedDimension.value === 'height' ? equipment.height
    : selectedDimension.value === 'width' ? equipment.width : equipment.length
  objectHeight.value = dimensionValue

  const dimensionLabel = selectedDimension.value === 'height' ? 'wys'
    : selectedDimension.value === 'width' ? 'szer' : 'dł'
  selectedObjectName.value = `${equipment.name} (${dimensionLabel})`

  equipmentFilter.value = ''
  showObjectDialog.value = false
}

const closeDialog = () => {
  equipmentFilter.value = ''
  showObjectDialog.value = false
}

const clearSelectedObject = () => {
  selectedObjectName.value = ''
  objectHeight.value = null
  distanceInMils.value = null
}

const filteredEquipment = computed(() => {
  if (!equipmentFilter.value) return militaryEquipment.value

  const query = equipmentFilter.value.toLowerCase()
  return militaryEquipment.value.filter(equipment =>
    equipment.name.toLowerCase().includes(query) ||
    equipment.type.toLowerCase().includes(query) ||
    equipment.description.toLowerCase().includes(query)
  )
})

const calculatedDistance = computed(() => {
  if (!objectHeight.value || !distanceInMils.value) return null
  const distance = (objectHeight.value * 1000) / distanceInMils.value
  return Math.round(distance)
})
</script>

<style scoped>
/* Limit section header width on desktop */
.section-header-limited {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
@media (max-width: 768px) {
  .section-header-limited {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
}
.modern-bg {
  background: #f7f8f9;
  min-height: 100vh;
}
.modern-title {
  color: #0f2c05;
  letter-spacing: -0.5px;
}
.dashboard-tiles {
  margin-bottom: 32px;
}
.tiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 36px;
  justify-items: center;
}

/* Jasna kolorystyka formularza */
.page-background {
  background: #f7f8f9;
  min-height: 100vh;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.hero-section {
  background: #fff;
  border: 1px solid #e0e0e0;
  color: #0f2c05;
  box-shadow: 0 4px 16px rgba(15,44,5,0.07);
}
.section-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(15,44,5,0.07);
  border: 1px solid #e0e0e0;
}
.card-header-modern {
  margin-bottom: 32px;
  text-align: center;
}
.section-title {
  color: #0f2c05;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 8px 0;
}
.section-subtitle {
  color: #827858;
  font-size: 1rem;
  margin: 0;
}
.inputs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 32px;
}
.input-group {
  display: flex;
  flex-direction: column;
}
.input-label {
  font-weight: 600;
  color: #0f2c05;
  margin-bottom: 12px;
  font-size: 1rem;
}
.modern-input {
  border-radius: 12px;
}
:deep(.q-field--filled .q-field__control) {
  background: #f3f4f6 !important;
}
:deep(.q-field--filled .q-field__control input) {
  color: #0f2c05 !important;
}
:deep(.q-field--filled .q-field__label) {
  color: #827858 !important;
}
:deep(.q-field--filled.q-field--focused .q-field__control) {
  background: #e0e0e0 !important;
}
.formula-section {
  margin: 32px 0;
}
.formula-card {
  background: linear-gradient(135deg, #f7f8f9 0%, #e0e0e0 100%);
  border: 2px solid #a2ad59;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}
.formula-title {
  color: #827858;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 16px 0;
}
.formula-text {
  color: #65473f;
  font-size: 1.2rem;
  font-weight: 500;
  font-family: 'Courier New', monospace;
}
.results-section {
  display: flex;
  justify-content: center;
}
.result-card {
  background: linear-gradient(135deg, #e0f7e9 0%, #f7f8f9 100%);
  border: 2px solid #a2ad59;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
  min-width: 300px;
}
.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(162,173,89,0.18);
}
.result-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #a2ad59;
  border-radius: 50%;
  color: white;
}
.result-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.result-label {
  font-size: 1rem;
  color: #827858;
  font-weight: 500;
  margin-bottom: 4px;
}
.result-value {
  font-size: 2rem;
  font-weight: 700;
  color: #a2ad59;
}
.object-selector {
  text-align: center;
}
.selected-object {
  display: flex;
  justify-content: center;
}
.object-selector-btn {
  border: 2px solid #a2ad59;
  border-radius: 12px;
  padding: 12px 20px;
  transition: all 0.3s ease;
  font-weight: 600;
  width: 100%;
  max-width: 280px;
  background: #f7f8f9;
  color: #0f2c05;
}
.object-selector-btn:hover {
  background: #e0e0e0;
  border-color: #827858;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(162,173,89,0.13);
}

.tile-icon-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
  background: #f3f4f6;
  box-shadow: 0 2px 8px 0 rgba(130,120,88,0.13);
}
.icon-ruler-bg {
  background: #f3f4f6 !important;
}
.icon-ruler {
  color: #65473f !important;
  font-size: 52px !important;
}

/* Dialog styles and equipment list remain unchanged */
@media (max-width: 768px) {
  .inputs-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .section-card {
    padding: 24px 0 18px 0;
  }
  .tile-content {
    padding: 38px 24px 28px 24px;
  }
  .result-card {
    min-width: auto;
    flex-direction: column;
    text-align: center;
  }
  .result-icon {
    width: 50px;
    height: 50px;
  }
  .result-value {
    font-size: 1.75rem;
  }
}
</style>
