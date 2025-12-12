<template>
  <q-page class="modern-bg q-pa-md">
    <div class="dashboard-main-container">
      <div class="backnav-absolute-wrap">
        <BackNav color="black"/>
      </div>
      <div class="test-center-wrap">
        <div class="row items-center q-mb-xl">
        <div class="col">
          <div class="text-h4 text-weight-bold modern-title">Test rozpoznania sprzętu FR</div>
          <div class="text-subtitle1 text-grey-7 q-mt-xs">Wpisz nazwę pojazdu i opcjonalnie wymiary</div>
        </div>
      </div>
      <div class="q-mb-md">
        <q-option-group
          v-model="testMode"
          :options="testOptions"
          type="radio"
          inline
        />
        </div>
        <div v-if="currentVehicle">
          <div class="recon-img-wrap q-mb-md">
          <q-img
            :src="currentVehicle.photo"
            :alt="currentVehicle.name"
            style="width:100%;max-width:700px;max-height:40vh;object-fit:contain;cursor:pointer;border-radius:16px;"
            class="shadow-4 rwd-test-img"
            @click="dialogOpen = true"
          />
          <q-icon name="zoom_in" class="recon-img-zoom-icon" size="32px" color="white" />
        </div>
        <q-input v-model="userName" label="Nazwa pojazdu" filled autofocus @keyup.enter="checkAnswer" style="max-width: 400px;"/>
        <q-dialog v-model="dialogOpen" persistent maximized transition-show="fade" transition-hide="fade">
          <q-card class="q-pa-none flex flex-center column items-center" style="background: #111; min-height: 100vh;">
            <q-btn flat round icon="close" color="white" class="self-end q-mt-md q-mr-md" @click="dialogOpen = false" aria-label="Zamknij" />
            <q-img :src="currentVehicle.photo" style="max-width:98vw;max-height:90vh; border-radius: 18px; box-shadow: 0 8px 32px #0008;" />
          </q-card>
        </q-dialog>
        <div class="row q-col-gutter-md q-mt-sm dim-inputs-row">
          <q-col cols="4"><q-input v-model="userLength" label="Długość (opcjonalnie)" type="number" filled /></q-col>
          <q-col cols="4"><q-input v-model="userWidth" label="Szerokość (opcjonalnie)" type="number" filled /></q-col>
          <q-col cols="4"><q-input v-model="userHeight" label="Wysokość (opcjonalnie)" type="number" filled /></q-col>
        </div>
        <div class="q-mt-md">
          <q-btn color="primary" label="Sprawdź" @click="checkAnswer" :disable="!userName" />
          <q-btn flat label="Pomiń" @click="nextVehicle" class="q-ml-sm" />
        </div>
        </div>
        <div v-else class="q-mt-xl">
        <div class="text-h5">Test zakończony!</div>
        <div class="q-mt-md">Poprawne odpowiedzi: <b>{{ correctCount }}</b> z {{ testList.length }}</div>
        <q-btn color="primary" label="Spróbuj ponownie" @click="restartTest" class="q-mt-md" />
        <div class="gt-sm">
          <q-table
            class="q-mt-xl"
            :rows="resultsRows"
            :columns="resultsColumns"
            row-key="name"
            flat
            :rows-per-page-options="[0]"
            :rows-per-page="0"
          >
            <template v-slot:body-cell-photo="props">
              <q-td :props="props">
                <q-img :src="props.row.photo" :alt="props.row.name" style="max-width:80px;max-height:60px;" />
              </q-td>
            </template>
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-icon :name="props.row.correct ? 'check_circle' : 'cancel'" :color="props.row.correct ? 'positive' : 'negative'" size="md" />
              </q-td>
            </template>
            <template v-slot:body-cell-master="props">
              <q-td :props="props">
                <q-icon v-if="props.row.master" name="military_tech" color="warning" size="md" />
              </q-td>
            </template>
          </q-table>
        </div>
        <div class="lt-md q-mt-lg">
          <div class="tiles-grid">
            <q-card v-for="row in resultsRows" :key="row.name" class="modern-tile">
              <q-card-section class="tile-content">
                <q-img :src="row.photo" :alt="row.name" style="max-width:120px;max-height:80px; margin: 0 auto; display: block;" />
                <div class="tile-label-row q-mt-md">
                  <span class="tile-label">{{ row.name }}</span>
                </div>
                <q-icon :name="row.correct ? 'check_circle' : 'cancel'" :color="row.correct ? 'positive' : 'negative'" size="md" class="q-mt-sm" />
                <q-icon v-if="row.master" name="military_tech" color="warning" size="md" class="q-mt-sm" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { ref, computed } from 'vue'
import { vehiclesFR } from './reconData'

const testOptions = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: 'WSZYSTKO', value: 'all' }
]

const dialogOpen = ref(false)
const testMode = ref(10)
const testList = ref([])
const currentIdx = ref(0)
const correctCount = ref(0)
const userName = ref('')
const userLength = ref('')
const userWidth = ref('')
const userHeight = ref('')
const answers = ref([]) // { name, photo, correct, master }

function shuffle (arr) {
  return arr.slice().sort(() => Math.random() - 0.5)
}
function startTest () {
  let pool = vehiclesFR
  if (testMode.value !== 'all') pool = shuffle(pool).slice(0, Number(testMode.value))
  else pool = shuffle(pool)
  testList.value = pool
  currentIdx.value = 0
  correctCount.value = 0
  answers.value = []
  userName.value = ''
  userLength.value = ''
  userWidth.value = ''
  userHeight.value = ''
}
const currentVehicle = computed(() => testList.value[currentIdx.value])
function checkAnswer () {
  if (!currentVehicle.value) return
  const nameOk = userName.value.trim().toLowerCase() === currentVehicle.value.name.trim().toLowerCase()
  // Sprawdź wymiary (dokładność do 0.1m)
  let master = false
  if (nameOk && userLength.value && userWidth.value && userHeight.value) {
    const l = parseFloat(userLength.value)
    const w = parseFloat(userWidth.value)
    const h = parseFloat(userHeight.value)
    const lOk = Math.abs(l - currentVehicle.value.length) < 0.11
    const wOk = Math.abs(w - currentVehicle.value.width) < 0.11
    const hOk = Math.abs(h - currentVehicle.value.height) < 0.11
    master = lOk && wOk && hOk
  }
  if (nameOk) correctCount.value++
  answers.value.push({
    name: currentVehicle.value.name,
    photo: currentVehicle.value.photo,
    correct: nameOk,
    master
  })
  nextVehicle()
}
function nextVehicle () {
  userName.value = ''
  userLength.value = ''
  userWidth.value = ''
  userHeight.value = ''
  currentIdx.value++
}
function restartTest () {
  startTest()
}
const resultsRows = computed(() => answers.value)
const resultsColumns = [
  { name: 'photo', label: 'Zdjęcie', field: 'photo', align: 'left' },
  { name: 'name', label: 'Nazwa', field: 'name', align: 'left' },
  { name: 'status', label: 'Odpowiedź', field: 'correct', align: 'center' },
  { name: 'master', label: 'Mistrz', field: 'master', align: 'center' }
]
startTest()
</script>

<style scoped>
.backnav-absolute-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  position: relative;
  z-index: 10;
  margin-bottom: 0.5rem;
}
.dim-inputs-row {
  justify-content: flex-start !important;
  width: 100%;
  max-width: 700px;
  margin-left: 0;
}
.test-center-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100%;
}
.test-center-wrap .row {
  width: 100%;
  justify-content: center;
}
.test-center-wrap .q-table {
  margin-left: auto;
  margin-right: auto;
}

.rwd-test-img {
  width: 100%;
  max-width: 700px;
  max-height: 40vh;
  object-fit: contain;
  border-radius: 16px;
}
.tiles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      gap: 18px;
      justify-items: center;
    }
    .modern-tile {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 24px 0 rgba(15,44,5,0.10);
      transition: box-shadow 0.18s, transform 0.18s;
      min-height: 140px;
      width: 100%;
      max-width: 220px;
      display: flex;
      align-items: stretch;
      justify-content: center;
      border: none;
    }
    .modern-tile:hover {
      box-shadow: 0 8px 32px 0 rgba(101,71,63,0.18);
      transform: translateY(-2px) scale(1.03);
    }
    .tile-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 22px 0 14px 0;
    }
    .tile-label-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
    }
    .tile-label {
      text-align: center;
      font-size: 1.08rem;
      font-weight: 600;
      color: #0f2c05;
    }
.recon-img-wrap {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 700px;
}
.recon-img-zoom-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0,0,0,0.55);
  border-radius: 50%;
  padding: 4px;
  z-index: 2;
  pointer-events: none;
}
</style>
