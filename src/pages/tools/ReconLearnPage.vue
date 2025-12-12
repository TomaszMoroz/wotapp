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
          :color="selectedCategory === null ? 'grey-6' : 'grey-3'"
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
      <div class="gt-sm">
        <q-table :rows="filteredVehicles" :columns="columns" row-key="name" flat @row-click="showVehicle">
          <template v-slot:body-cell-photo="props">
            <q-td :props="props">
              <q-img :src="props.row.photo" :alt="props.row.name" style="max-width:120px;max-height:80px;" />
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="lt-md">
        <div class="tiles-grid">
          <q-card v-for="vehicle in filteredVehicles" :key="vehicle.name" class="modern-tile cursor-pointer" @click="showVehicle(null, vehicle)">
            <q-card-section class="tile-content">
              <div class="tile-img-wrap">
                <q-img :src="vehicle.photo" :alt="vehicle.name" style="max-width:170px;max-height:110px; margin: 0 auto; display: block;" />
              </div>
              <div class="tile-label-row q-mt-md">
                <span class="tile-label">{{ vehicle.name }}</span>
              </div>
              <div class="tile-dims q-mt-xs text-grey-8 text-caption">
                <span>Dł: {{ vehicle.length }} m</span> |
                <span>Szer: {{ vehicle.width }} m</span> |
                <span>Wys: {{ vehicle.height }} m</span>
              </div>
              <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>{{ vehicle.category }}</q-chip>
            </q-card-section>
          </q-card>
        </div>
      </div>

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

<style scoped>
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
        cursor: pointer;
        transition: box-shadow 0.18s, transform 0.18s;
        min-height: 170px;
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
      .tile-img-wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
      }
      .tile-dims {
        margin-top: 2px;
        margin-bottom: 2px;
        text-align: center;
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
      .tile-desc-chip-big {
        margin-top: 10px;
        font-size: 1.01rem;
        font-weight: 500;
        padding: 7px 14px;
        border-radius: 12px;
        min-height: 30px;
      }
</style>
