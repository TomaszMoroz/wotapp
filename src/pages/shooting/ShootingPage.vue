<template>
  <q-page class="modern-bg q-pa-lg">
    <div class="shooting-content-limiter">
      <div class="row items-center justify-between q-mb-xl">
        <BackNav color="black"/>
        <div>
          <div class="text-h3 text-weight-bold modern-title">Strzelectwo</div>
          <div class="text-subtitle1 text-grey-7 q-mt-xs">Balistyka, techniki strzelania i szkolenie strzeleckie</div>
        </div>
        <q-avatar size="56px" class="shadow-2">
          <q-icon name="gps_fixed" size="32px" color="primary" />
        </q-avatar>
      </div>

      <div class="dashboard-tiles q-mb-xl">
        <div class="tiles-grid">
          <q-card class="modern-tile" @click="navigateTo('/shooting/basics')">
            <q-card-section class="tile-content">
              <div class="tile-icon-bg" style="background: #0f2c05;">
                <q-icon name="gps_fixed" color="white" size="32px" />
              </div>
              <div class="tile-label-row">
                <span class="tile-label">Podstawy strzelania</span>
              </div>
              <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>Postawa, chwyt, celowanie</q-chip>
            </q-card-section>
          </q-card>
          <q-card class="modern-tile" @click="navigateTo('/shooting/ballistics')">
            <q-card-section class="tile-content">
              <div class="tile-icon-bg" style="background: #65473f;">
                <q-icon name="trending_up" color="white" size="32px" />
              </div>
              <div class="tile-label-row">
                <span class="tile-label">Balistyka</span>
              </div>
              <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>Trajektoria i poprawki</q-chip>
            </q-card-section>
          </q-card>
          <q-card class="modern-tile" @click="navigateTo('/shooting/angular-measurements')">
            <q-card-section class="tile-content">
              <div class="tile-icon-bg" style="background: #827858;">
                <q-icon name="straighten" color="white" size="32px" />
              </div>
              <div class="tile-label-row">
                <span class="tile-label">Miary kątowe</span>
              </div>
              <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>Tysiączne, MOA, mil-dot</q-chip>
            </q-card-section>
          </q-card>
          <q-card class="modern-tile" @click="navigateTo('/shooting/optics')">
            <q-card-section class="tile-content">
              <div class="tile-icon-bg" style="background: #8e936d;">
                <q-icon name="center_focus_strong" color="white" size="32px" />
              </div>
              <div class="tile-label-row">
                <span class="tile-label">Optyka i celowniki</span>
              </div>
              <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>Lunety, kolimatory</q-chip>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BackNav from 'components/BackNav.vue'

defineOptions({
  name: 'ShootingPage'
})

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.shooting-content-limiter {
  max-width: 1200px;
  margin: 0 auto;
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
@media (max-width: 640px) {
  .modern-tile {
    min-width: 90vw;
    max-width: 98vw;
  }
}
</style>
