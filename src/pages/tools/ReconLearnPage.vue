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
      <div class="gt-sm table-center-wrap">
        <q-table
          :rows="filteredVehicles"
          :columns="columns"
          row-key="name"
          flat
          @row-click="showVehicle"
          :rows-per-page-options="[0]"
          :rows-per-page="0"
        >
          <template v-slot:body-cell-photo="props">
            <q-td :props="props">
              <div class="recon-img-wrap">
                <q-img :src="props.row.photo" :alt="props.row.name" class="recon-table-img" />
                <q-icon name="zoom_in" class="recon-img-zoom-icon" size="32px" color="white" />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="lt-md">
        <div class="tiles-grid">
          <q-card v-for="vehicle in filteredVehicles" :key="vehicle.name" class="modern-tile cursor-pointer" @click="showVehicle(null, vehicle)">
            <q-card-section class="tile-content">
              <div class="tile-img-wrap">
                <q-img :src="vehicle.photo" :alt="vehicle.name" style="max-width:340px;max-height:220px; margin: 0 auto; display: block;" />
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
        <q-card class="dialog-card">
          <div class="dialog-content">
            <q-btn flat round icon="close" color="white" class="dialog-close-btn" @click="dialogOpen = false" aria-label="Zamknij" />
            <div class="dialog-img-wrap">
              <q-img :src="selectedVehicle?.photo" :alt="selectedVehicle?.name" class="dialog-img" />
            </div>
            <div class="dialog-name text-h4 text-center">{{ selectedVehicle?.name }}</div>
          </div>
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
.dialog-card {
  background: #222;
  color: #fff;
  min-height: 100vh;
  min-width: 100vw;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  padding: 0;
}
.dialog-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}
.dialog-close-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 10;
}
.dialog-img-wrap {
  flex: 1 1 auto;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  min-width: 0;
}
.dialog-img {
  width: 100vw;
  height: 100%;
  max-width: 100vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 18px;
  box-shadow: 0 8px 32px #0008;
  background: #111;
}
.dialog-name {
  width: 100vw;
  background: rgba(34,34,34,0.98);
  color: #fff;
  padding: 24px 0 18px 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-radius: 0 0 18px 18px;
  margin: 0;
  position: relative;
  z-index: 2;
}
@media (max-width: 700px) {
  .dialog-img {
    max-height: 65vh;
  }
  .dialog-name {
    font-size: 1.15rem;
    padding: 18px 0 14px 0;
  }
  .dialog-close-btn {
    top: 10px;
    right: 10px;
  }
}
.recon-img-wrap {
  position: relative;
  display: inline-block;
}
.recon-table-img {
  width: 320px;
  height: 200px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
.recon-img-zoom-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.55);
  border-radius: 50%;
  padding: 4px;
  z-index: 2;
  pointer-events: none;
}
.recon-table-img {
  width: 320px;
  height: 200px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.table-center-wrap {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
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
