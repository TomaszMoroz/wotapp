<template>
  <q-page class="modern-bg q-pa-lg">
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <div class="text-h3 text-weight-bold modern-title">Dzień dobry, Tomasz!</div>
        <div class="text-subtitle1 text-grey-7 q-mt-xs">Twój panel dowodzenia</div>
      </div>
      <q-avatar size="56px" class="shadow-2">
        <img src="/icons/favicon-128x128.png" alt="Profil" />
      </q-avatar>
    </div>

    <div class="dashboard-tiles q-mb-xl">
      <div class="tiles-grid">
        <q-card v-for="(tile, i) in tiles" :key="tile.label" class="modern-tile" @click="go(tile.route)">
          <q-card-section class="tile-content">
            <div class="tile-icon-bg" :style="{ background: iconColors[i % iconColors.length] }">
              <q-icon :name="tile.icon" color="white" size="32px" />
            </div>
            <div class="tile-label-row">
              <span class="tile-label">{{ tile.label }}</span>
            </div>
            <q-chip v-if="tile.desc" class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>{{ tile.desc }}</q-chip>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-xl">
      <q-card class="modern-widget col-12 col-md-6 q-mb-lg">
        <q-card-section>
          <div class="text-h6 text-weight-bold modern-title q-mb-xs">
            Nadchodzące szkolenia
            <q-badge color="positive" class="q-ml-sm" v-if="upcomingCount">{{ upcomingCount }} nowe</q-badge>
          </div>
          <div class="text-body2 text-grey-7">Brak zaplanowanych szkoleń</div>
        </q-card-section>
      </q-card>
      <q-card class="modern-widget col-12 col-md-6 q-mb-lg">
        <q-card-section>
          <div class="text-h6 text-weight-bold modern-title q-mb-xs">
            Ostatnie aktywności
            <q-badge color="info" class="q-ml-sm" v-if="activityCount">{{ activityCount }} nowe</q-badge>
          </div>
          <div class="text-body2 text-grey-7">Brak nowych aktywności</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const tiles = [
  { label: 'Dashboard', icon: 'dashboard', desc: 'Strona główna', chip: 'Nowe', route: '/' },
  { label: 'Wyposażenie', icon: 'inventory', desc: 'Sprzęt wojskowy', chip: '', route: '/equipment' },
  { label: 'Narzędzia', icon: 'build', desc: 'Kalkulatory', chip: 'Popularne', route: '/tools' },
  { label: 'Taktyka', icon: 'school', desc: 'Materiały szkoleniowe', chip: '', route: '/tactics' },
  { label: 'Topografia', icon: 'map', desc: 'Mapy i nawigacja', chip: '', route: '/topography' },
  { label: 'Strzelectwo', icon: 'gps_fixed', desc: 'Balistyka i techniki', chip: '', route: '/shooting' },
  { label: 'TCCC', icon: 'medical_services', desc: 'Taktyczna pomoc', chip: 'Info', route: '/tccc' },
  { label: 'Meldunki', icon: 'description', desc: 'Raporty wojskowe', chip: '', route: '/reports' },
  { label: 'Stopnie', icon: 'military_tech', desc: 'Rangi i oznaczenia', chip: '', route: '/ranks' },
  { label: 'Regulaminy', icon: 'gavel', desc: 'Przepisy i zasady', chip: '', route: '/regulations' },
  { label: 'ABC', icon: 'info', desc: 'Podstawowe informacje', chip: '', route: '/abc' }
]
const iconColors = [
  '#0f2c05',
  '#65473f',
  '#827858',
  '#8e936d',
  '#a2ad59'
]
const upcomingCount = 0 // przykładowo
const activityCount = 0 // przykładowo
function go (route) {
  router.push(route)
}
</script>

<style scoped>
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
.modern-widget {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(130,120,88,0.13);
  border: none;
  padding-bottom: 8px;
}
</style>
