<template>
  <q-page class="modern-bg q-pa-md">
    <div class="q-mx-auto" style="width: 80%"><BackNav color="black"/></div>
    <div class="row items-center justify-between q-mb-xl q-mx-auto" style="width:80%">
      <div>
        <div class="text-h4 text-weight-bold modern-title">Stopnie, regulamin, prawo</div>
        <div class="text-subtitle1 text-grey-7 q-mt-xs">Wojskowe oznaczenia i przepisy</div>
      </div>
    </div>
    <div class="dashboard-tiles q-mb-xl">
      <div class="tiles-grid">
        <q-card class="modern-tile" @click="navigateTo('/ranks')">
          <q-card-section class="tile-content">
            <div class="tile-icon-bg" style="background: #827858;">
              <q-icon name="military_tech" color="white" size="32px" />
            </div>
            <div class="tile-label-row">
              <span class="tile-label">Stopnie Wojskowe</span>
            </div>
            <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>Oznaczenia i hierarchia WOT</q-chip>
          </q-card-section>
        </q-card>
        <q-card class="modern-tile" @click="navigateTo('/regulations')">
          <q-card-section class="tile-content">
            <div class="tile-icon-bg" style="background: #a2ad59;">
              <q-icon name="gavel" color="white" size="32px" />
            </div>
            <div class="tile-label-row">
              <span class="tile-label">Regulaminy</span>
            </div>
            <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>Przepisy i procedury WOT</q-chip>
          </q-card-section>
        </q-card>
        <q-card class="modern-tile" @click="navigateTo('/firearms-law')">
          <q-card-section class="tile-content">
            <div class="tile-icon-bg" style="background: #65473f;">
              <q-icon name="security" color="white" size="32px" />
            </div>
            <div class="tile-label-row">
              <span class="tile-label">Warunki użycia broni palnej</span>
            </div>
            <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>Art. 45 - Ustawa o ś.p.</q-chip>
          </q-card-section>
        </q-card>
        <q-card class="modern-tile" @click="navigateTo('/drill')">
          <q-card-section class="tile-content">
            <div class="tile-icon-bg" style="background: #8e936d;">
              <q-icon name="flag" color="white" size="32px" />
            </div>
            <div class="tile-label-row">
              <span class="tile-label">Musztra</span>
            </div>
            <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>Regulamin musztry</q-chip>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BackNav from 'components/BackNav.vue'
const router = useRouter()
function navigateTo (path) {
  router.push(path)
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
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10vw;
  padding-right: 10vw;
}
.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #333333 0%, #767876 100%);
  border-radius: 12px;
  color: white;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10vw;
  padding-right: 10vw;
}
@media (max-width: 900px) {
  .dashboard-tiles {
    padding-left: 12px;
    padding-right: 12px;
  }
  .page-header {
    padding-left: 12px;
    padding-right: 12px;
  }
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
