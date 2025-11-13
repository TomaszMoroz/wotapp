<template>
  <q-page class="q-pa-md abc-bg">
    <BackNav />
    <div class="text-h4 text-grey-3 text-weight-bold q-mb-md">ABC</div>
    <div class="text-subtitle1 text-grey-3 text-grey-7 q-mb-lg">Podstawowe informacje dla nowo wcielonych</div>

    <div class="row q-gutter-y-md q-gutter-x-md justify-center abc-cards-row q-mb-xl">
      <q-card class="abc-card col-xs-12 col-sm-6 col-md-3" clickable @click="goToRotation">
        <q-card-section class="text-center bg-grey-9">
          <q-icon name="backpack" size="2.5rem" color="grey-12" class="q-mb-sm" />
          <div class="text-h6 text-weight-bold">Co zabrać na rotację</div>
          <div class="text-caption text-grey-2">Lista rzeczy i wyposażenia</div>
        </q-card-section>
      </q-card>
      <q-card class="abc-card col-xs-12 col-sm-6 col-md-3" clickable @click="goToBackpack">
        <q-card-section class="text-center bg-grey-9">
          <q-icon name="hiking" size="2.5rem" color="grey-12" class="q-mb-sm" />
          <div class="text-h6 text-weight-bold">Pakowanie plecaka</div>
          <div class="text-caption text-grey-2">Praktyczne wskazówki</div>
        </q-card-section>
      </q-card>
      <q-card class="abc-card col-xs-12 col-sm-6 col-md-3" clickable @click="goToChain">
        <q-card-section class="text-center bg-grey-9">
          <q-icon name="alt_route" size="2.5rem" color="grey-12" class="q-mb-sm" />
          <div class="text-h6 text-weight-bold">Droga służbowa</div>
          <div class="text-caption text-grey-2">Zasady komunikacji i meldowania</div>
        </q-card-section>
      </q-card>
      <q-card class="abc-card col-xs-12 col-sm-6 col-md-3" clickable @click="goToCyber">
        <q-card-section class="text-center bg-grey-9">
          <q-icon name="security" size="2.5rem" color="grey-12" class="q-mb-sm" />
          <div class="text-h6 text-weight-bold">Bezpieczeństwo w sieci</div>
          <div class="text-caption text-grey-2">Podstawy cyberbezpieczeństwa</div>
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
.abc-card {
  border-radius: 16px;
  transition: box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  background: #fff;
  color: #232b23;
  width: 100%;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
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
</style>
