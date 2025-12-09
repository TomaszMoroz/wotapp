<template>
  <q-page class="modern-bg q-pa-md">
    <div class="dashboard-main-container">
    <BackNav color="black"/>
      <div class="row items-center justify-between q-mb-xl">
      <div>
        <div class="text-h3 text-weight-bold modern-title">Narzędzia</div>
        <div class="text-subtitle1 text-grey-7 q-mt-xs">Kalkulatory i narzędzia wojskowe</div>
      </div>
    </div>
      <div class="dashboard-tiles q-mb-xl">
        <div class="tiles-grid">
          <q-card v-for="(tool, i) in tools" :key="tool.title" class="modern-tile" @click="navigateTo(tool.route)">
          <q-card-section class="tile-content">
            <div class="tile-icon-bg" :style="{ background: iconColors[i % iconColors.length] }">
              <q-icon :name="tool.icon" color="white" size="32px" />
            </div>
            <div class="tile-label-row">
              <span class="tile-label">{{ tool.title }}</span>
            </div>
            <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>{{ tool.desc }}</q-chip>
          </q-card-section>
        </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const tools = [
  { title: 'Kalkulator odległości', icon: 'straighten', desc: 'Pomiar DWK1000', route: '/tools/distance' },
  { title: 'GROT Offset', icon: 'gps_fixed', desc: 'Korekta celowania', route: '/training' },
  { title: 'Alfabet NATO', icon: 'record_voice_over', desc: 'Komunikacja fonetyczna', route: '/communication' },
  { title: 'Trening korekty celowania', icon: 'tune', desc: 'Symulacja nastaw', route: '/tools/settings' },
  { title: 'Konwerter MILS - MOA', icon: 'swap_horiz', desc: 'Przelicznik jednostek', route: '/tools/mils-moa' },
  { title: 'Pobrany sprzęt', icon: 'inventory_2', desc: 'Lista kontrolna', route: '/tools/equipment' },
  { title: 'Pogoda', icon: 'cloud', desc: 'Prognoza', route: '/tools/weather' },
  { title: 'Tabela marszu', icon: 'table_chart', desc: 'Kreator', route: '/tools/march-table' }
]
const iconColors = [
  '#0f2c05',
  '#65473f',
  '#827858',
  '#8e936d',
  '#a2ad59'
]
function navigateTo (path) {
  router.push(path)
}
</script>

<style scoped>

.dashboard-main-container {
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
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
