body.body--dark .cargo-tile {
  border: 1.5px solid #444950 !important;
  background: #2c313a !important;
}
<template>
  <q-page class="cargo-page">
    <div class="cargo-main-wrapper">
        <BackNav color="black" />
        <div class="cargo-content">
          <CargoShortcuts />
        </div>
    </div>
  </q-page>
</template>

<script setup>
import CargoShortcuts from 'src/components/CargoShortcuts.vue'
import BackNav from 'src/components/BackNav.vue'
</script>

<style scoped>

/* Responsive container for shortcuts */

.cargo-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f6fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cargo-main-wrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 48px 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.cargo-header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0;
}
.cargo-header-content {
  display: flex;
  align-items: center;
  gap: 32px;
}
.cargo-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 4px;
}
.cargo-subtitle {
  font-size: 1.15rem;
  color: #888;
}
.cargo-content {
  width: 100%;
  display: flex;
  justify-content: center;
}
.tile-icon-bg.cargo-icon-bg {
  background: #827858;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px 0 rgba(130,120,88,0.13);
}
@media (max-width: 900px) {
  .cargo-main-wrapper {
    max-width: 98vw;
    padding: 18px 4vw 32px 4vw;
  }
  .cargo-header-content {
    gap: 18px;
  }
  .cargo-title {
    font-size: 1.5rem;
  }
  .cargo-subtitle {
    font-size: 1rem;
  }
}
</style>
