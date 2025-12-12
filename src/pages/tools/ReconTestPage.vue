<template>
  <q-page class="modern-bg q-pa-md">
    <div class="dashboard-main-container">
      <BackNav color="black"/>
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
        <q-img :src="currentVehicle.photo" :alt="currentVehicle.name" style="max-width:220px;max-height:140px;" class="q-mb-md" />
        <q-input v-model="userName" label="Nazwa pojazdu" filled autofocus @keyup.enter="checkAnswer"/>
        <div class="row q-col-gutter-md q-mt-sm">
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
const testMode = ref(10)
const testList = ref([])
const currentIdx = ref(0)
const correctCount = ref(0)
const userName = ref('')
const userLength = ref('')
const userWidth = ref('')
const userHeight = ref('')

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
  userName.value = ''
  userLength.value = ''
  userWidth.value = ''
  userHeight.value = ''
}
const currentVehicle = computed(() => testList.value[currentIdx.value])
function checkAnswer () {
  if (!currentVehicle.value) return
  const nameOk = userName.value.trim().toLowerCase() === currentVehicle.value.name.trim().toLowerCase()
  if (nameOk) correctCount.value++
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
startTest()
</script>
