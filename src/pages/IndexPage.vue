<template>
  <q-page class="modern-bg q-pa-lg">
    <div class="dashboard-title-bg q-mb-xl">
      <div class="dashboard-title-content">
        <div class="text-h3 text-weight-bold modern-title">Dashboard</div>
        <div class="text-subtitle1 text-grey-7 q-mt-xs">Wybierz sekcję aby rozpocząć pracę</div>
      </div>
    </div>

    <div class="dashboard-tiles q-mb-xl">
      <div class="tiles-grid">
        <q-card v-for="(tile, i) in tiles" :key="tile.label" class="modern-tile" @click="navigateTo(tile.route)">
          <q-card-section class="tile-content">
            <div class="tile-icon-bg" :style="{ background: iconColors[i % iconColors.length] }">
              <q-icon :name="tile.icon" color="white" size="32px" />
            </div>
            <div class="tile-label-row">
              <span class="tile-label">{{ tile.title }}</span>
            </div>
            <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>{{ tile.desc }}</q-chip>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const tiles = [
  { label: 'Narzędzia', icon: 'build', desc: 'Pomoce, kalkulatory', route: '/tools', title: 'Narzędzia' },
  { label: 'Stopnie, regulaminy, prawo', icon: 'military_tech', desc: 'Informacje', route: '/emergency', title: 'Stopnie, regulaminy, prawo' },
  { label: 'Wyposażenie', icon: 'inventory', desc: 'Broń etatowa', route: '/equipment', title: 'Wyposażenie' },
  { label: 'Meldunki', icon: 'description', desc: 'Raporty wojskowe', route: '/reports', title: 'Meldunki' },
  { label: 'Strzelectwo', icon: 'gps_fixed', desc: 'Balistyka, teoria, technika', route: '/shooting', title: 'Strzelectwo' },
  { label: 'TCCC', icon: 'medical_services', desc: 'Taktyczna pomoc', route: '/tccc', title: 'TCCC' },
  { label: 'Taktyka, dowodzenie i procedury', icon: 'school', desc: 'Materiały szkoleniowe', route: '/tactics', title: 'Taktyka, dowodzenie i procedury' },
  { label: 'Topografia', icon: 'map', desc: 'Mapy i nawigacja', route: '/topography', title: 'Topografia' },
  { label: 'ABC', icon: 'info', desc: 'Dla nowo wcielonych', route: '/abc', title: 'ABC' }
]
const iconColors = [
  '#0f2c05',
  '#65473f',
  '#827858',
  '#8e936d',
  '#a2ad59'
]
function navigateTo (path) {
  router.push(path).catch(() => {})
}
</script>

<style scoped>

.dashboard-title-bg {
  position: relative;
  min-height: 110px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 4px 24px 0 rgba(15,44,5,0.10);
  overflow: hidden;
}
.dashboard-title-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/721.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right center;
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
}
.dashboard-title-content {
  position: relative;
  z-index: 2;
  padding: 32px 32px 24px 32px;
}
@media (max-width: 600px) {
  .dashboard-title-bg {
    min-height: 90px;
    border-radius: 16px;
    overflow: hidden;
  }
  .dashboard-title-content {
    padding: 22px 12px 16px 12px;
    text-align: center;
  }
  .dashboard-title-bg::before {
    background-size: 210px auto;
    background-position: center 60%;
    opacity: 0.16;
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
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 36px;
  justify-items: center;
}
.modern-tile {
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 4px 24px 0 rgba(15,44,5,0.10);
  cursor: pointer;
  transition: box-shadow 0.18s, transform 0.18s;
  min-height: 170px;
  width: 100%;
  max-width: 270px;
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
  padding: 38px 0 28px 0;
}
.tile-icon-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px 0 rgba(130,120,88,0.13);
}
.tile-label-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}
.tile-label {
  text-align: center;
  font-size: 1.13rem;
  font-weight: 600;
  color: #0f2c05;
}
.tile-desc-chip-big {
  margin-top: 10px;
  font-size: 1.08rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 12px;
  min-height: 36px;
}
</style>
