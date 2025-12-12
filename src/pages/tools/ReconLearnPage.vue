<template>
  <q-page class="modern-bg q-pa-md">
    <div class="dashboard-main-container">
      <BackNav color="black"/>
      <div class="row items-center q-mb-xl">
        <div class="col">
          <div class="text-h4 text-weight-bold modern-title">Nauka rozpoznania sprzętu FR</div>
          <div class="text-subtitle1 text-grey-7 q-mt-xs">Zdjęcie, nazwa, opis i wymiary</div>
        </div>
      </div>
      <div class="q-mb-md">
        <q-chip
          clickable
          :color="selectedCategory === null ? 'primary' : 'grey-3'"
          text-color="selectedCategory === null ? 'white' : 'grey-8'"
          class="q-mr-sm q-mb-xs"
          @click="selectCategory(null)"
        >
          Wszystkie
        </q-chip>
        <q-chip
          v-for="cat in categories"
          :key="cat"
          clickable
          :color="selectedCategory === cat ? 'primary' : 'grey-3'"
          text-color="selectedCategory === cat ? 'white' : 'grey-8'"
          class="q-mr-sm q-mb-xs"
          @click="selectCategory(cat)"
        >
          {{ cat }}
        </q-chip>
      </div>
      <q-table :rows="filteredVehicles" :columns="columns" row-key="name" flat @row-click="showVehicle">
        <template v-slot:body-cell-photo="props">
          <q-td :props="props">
            <q-img :src="props.row.photo" :alt="props.row.name" style="max-width:120px;max-height:80px;" />
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="dialogOpen" persistent maximized transition-show="fade" transition-hide="fade">
        <q-card class="q-pa-xl flex flex-center column items-center" style="background: #222; color: #fff; min-height: 100vh;">
          <q-btn flat round icon="close" color="white" class="self-end q-mb-md" @click="dialogOpen = false" aria-label="Zamknij" />
          <q-img :src="selectedVehicle?.photo" :alt="selectedVehicle?.name" style="max-width:90vw;max-height:60vh; border-radius: 18px; box-shadow: 0 8px 32px #0008;" />
          <div class="text-h4 text-center q-mt-lg q-mb-md">{{ selectedVehicle?.name }}</div>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { vehiclesFR } from './reconData'
import BackNav from 'components/BackNav.vue'
const columns = [
  { name: 'photo', label: 'Zdjęcie', field: 'photo', align: 'left' },
  { name: 'name', label: 'Nazwa', field: 'name', align: 'left' },
  { name: 'description', label: 'Opis', field: 'description', align: 'left' },
  { name: 'category', label: 'Kategoria', field: 'category', align: 'left' },
  { name: 'length', label: 'Długość (m)', field: 'length', align: 'right' },
  { name: 'width', label: 'Szerokość (m)', field: 'width', align: 'right' },
  { name: 'height', label: 'Wysokość (m)', field: 'height', align: 'right' }
]
const selectedCategory = ref(null)
const categories = computed(() => {
  const set = new Set(vehiclesFR.map(v => v.category))
  return Array.from(set)
})
const filteredVehicles = computed(() => {
  if (!selectedCategory.value) return vehiclesFR
  return vehiclesFR.filter(v => v.category === selectedCategory.value)
})
function selectCategory (cat) {
  selectedCategory.value = cat
}
const dialogOpen = ref(false)
const selectedVehicle = ref(null)
function showVehicle (evt, row) {
  selectedVehicle.value = row
  dialogOpen.value = true
}
</script>
