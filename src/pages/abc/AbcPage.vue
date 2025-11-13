<template>
  <q-page class="q-pa-md abc-bg">
    <BackNav />
    <div class="text-h4 text-grey-2 text-weight-bold q-mb-md">ABC</div>
    <div class="text-subtitle1 text-grey-2 q-mb-lg">Podstawowe informacje dla nowo wcielonych</div>

    <div class="abc-cards-row q-mb-xl">
      <q-card class="abc-card" clickable @click="goToRotation">
        <q-card-section class="text-center bg-grey-4">
          <q-icon name="backpack" size="2.5rem" color="grey-8" class="q-mb-sm" />
          <div class="text-h6 text-black text-weight-bold">Co zabrać na rotację</div>
          <div class="text-caption text-black">Lista rzeczy i wyposażenia</div>
        </q-card-section>
      </q-card>
      <q-card class="abc-card" clickable @click="goToBackpack">
        <q-card-section class="text-center bg-grey-4">
          <q-icon name="hiking" size="2.5rem" color="grey-8" class="q-mb-sm" />
          <div class="text-h6 text-black text-weight-bold">Pakowanie plecaka</div>
          <div class="text-caption text-black text-grey-7">Praktyczne wskazówki</div>
        </q-card-section>
      </q-card>
      <q-card class="abc-card" clickable @click="goToChain">
        <q-card-section class="text-center bg-grey-4">
          <q-icon name="alt_route" size="2.5rem" color="grey-8" class="q-mb-sm" />
          <div class="text-h6 text-black text-weight-bold">Droga służbowa</div>
          <div class="text-caption text-black text-grey-7">Zasady komunikacji i meldowania</div>
        </q-card-section>
      </q-card>
      <q-card class="abc-card" clickable @click="goToCyber">
        <q-card-section class="text-center bg-grey-4">
          <q-icon name="security" size="2.5rem" color="grey-8" class="q-mb-sm" />
          <div class="text-h6 text-black text-weight-bold">Bezpieczeństwo w sieci</div>
          <div class="text-caption text-black text-grey-7">Podstawy cyberbezpieczeństwa</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToRotation () {
  router.push({ name: 'abc-rotation' })
}

function goToBackpack () {
  router.push({ name: 'abc-backpack' })
}

function goToChain () {
  router.push({ name: 'abc-chain' })
}

function goToCyber () {
  router.push({ name: 'abc-cyber' })
}
</script>

<style scoped>
.abc-bg {
  background: #f7f7f9;
  min-height: 100vh;
}
.abc-cards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}
.abc-card {
  width: 260px;
  min-width: 220px;
  max-width: 100%;
  flex: 0 1 260px;
  border-radius: 16px;
  transition: box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  background: #fff;
  color: #232b23;
}
.abc-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.13);
}
@media (prefers-color-scheme: dark) {
  .abc-bg {
    background: #232b23;
  }
  .abc-card {
    background: #232b23;
    color: #f5f7fa;
  }
}
@media (max-width: 900px) {
  .abc-cards-row {
    gap: 16px;
  }
  .abc-card {
    width: 48vw;
    min-width: 160px;
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .abc-cards-row {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .abc-card {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }
}
</style>
