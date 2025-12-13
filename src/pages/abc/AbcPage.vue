<template>
  <q-page class="q-pa-md dashboard-bg dashboard-abc-page">
    <div class="dashboard-abc-container">
      <BackNav color="black"/>
      <q-card class="dashboard-header-card q-mb-xl">
        <q-card-section>
          <div class="text-h4 text-weight-bold text-grey-10">ABC</div>
          <div class="text-subtitle1 text-grey-8">Podstawowe informacje dla nowo wcielonych</div>
        </q-card-section>
      </q-card>
      <div class="row q-col-gutter-md q-row-gutter-md dashboard-cards q-mb-xl">
        <q-col cols="12" sm="6" md="3">
          <q-card class="dashboard-content-card" style="width:280px; height:200px;" clickable @click="goToRotation">
            <q-card-section class="text-center flex column justify-center" style="height:100%;">
              <div class="row justify-center items-center q-mb-sm">
                <q-icon name="backpack" size="2.5rem" color="primary" />
              </div>
              <div class="text-h6 text-weight-bold text-grey-10">Co zabrać na rotację</div>
              <div class="text-caption">Lista rzeczy i wyposażenia</div>
            </q-card-section>
          </q-card>
        </q-col>
        <q-col cols="12" sm="6" md="3">
          <q-card class="dashboard-content-card" style="width:280px; height:200px;" clickable @click="goToBackpack">
            <q-card-section class="text-center flex column justify-center" style="height:100%;">
              <div class="row justify-center items-center q-mb-sm">
                <q-icon name="hiking" size="2.5rem" color="primary" />
              </div>
              <div class="text-h6 text-weight-bold text-grey-10">Pakowanie plecaka</div>
              <div class="text-caption">Praktyczne wskazówki</div>
            </q-card-section>
          </q-card>
        </q-col>
        <q-col cols="12" sm="6" md="3">
          <q-card class="dashboard-content-card" style="width:280px; height:200px;" clickable @click="goToChain">
            <q-card-section class="text-center flex column justify-center" style="height:100%;">
              <div class="row justify-center items-center q-mb-sm">
                <q-icon name="alt_route" size="2.5rem" color="primary" />
              </div>
              <div class="text-h6 text-weight-bold text-grey-10">Droga służbowa</div>
              <div class="text-caption">Zasady komunikacji i meldowania</div>
            </q-card-section>
          </q-card>
        </q-col>
        <q-col cols="12" sm="6" md="3">
          <q-card class="dashboard-content-card" style="width:280px; height:200px;" clickable @click="goToCyber">
            <q-card-section class="text-center flex column justify-center" style="height:100%;">
              <div class="row justify-center items-center q-mb-sm">
                <q-icon name="security" size="2.5rem" color="primary" />
              </div>
              <div class="text-h6 text-weight-bold text-grey-10">Bezpieczeństwo w sieci</div>
              <div class="text-caption">Podstawy cyberbezpieczeństwa</div>
            </q-card-section>
          </q-card>
        </q-col>
        <q-col cols="12" sm="6" md="3">
          <q-card class="dashboard-content-card" style="width:280px; height:200px;" clickable @click="goToKts">
            <q-card-section class="text-center flex column justify-center" style="height:100%;">
              <div class="row justify-center items-center q-mb-sm">
                <q-icon name="fact_check" size="2.5rem" color="primary" />
              </div>
              <div class="text-h6 text-weight-bold text-grey-10">KTS</div>
              <div class="text-caption">Odbiór i potwierdzenie</div>
            </q-card-section>
          </q-card>
        </q-col>
        <q-col cols="12" sm="6" md="3">
          <q-card class="dashboard-content-card" style="width:280px; height:200px;" clickable @click="goToFitness">
            <q-card-section class="text-center flex column justify-center" style="height:100%;">
              <div class="row justify-center items-center q-mb-sm">
                <q-icon name="fitness_center" size="2.5rem" color="primary" />
              </div>
              <div class="text-h6 text-weight-bold text-grey-10">Sprawność</div>
              <div class="text-caption">Znaczenie sprawności fizycznej</div>
            </q-card-section>
          </q-card>
        </q-col>
      </div>
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

function goToFitness () {
  router.push({ name: 'abc-fitness' })
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

function goToKts () {
  router.push({ name: 'abc-kts' })
}
</script>

<style scoped>
@media (max-width: 600px) {
  .dashboard-cards {
    justify-content: center !important;
    display: flex !important;
    flex-wrap: wrap;
  }
  .dashboard-content-card {
    margin-left: auto !important;
    margin-right: auto !important;
    max-width: 90vw;
  }
}
.dashboard-bg {
  background: var(--military-light, #f5f5f5) !important;
  min-height: 100vh;
}
.dashboard-abc-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dashboard-abc-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.dashboard-header-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 24px 32px;
}
.dashboard-cards {
  margin-top: 0;
  margin-bottom: 0;
}
 .dashboard-content-card {
   border-radius: 16px;
   transition: box-shadow 0.2s;
   box-shadow: 0 2px 8px rgba(0,0,0,0.07);
   background: #fff;
   color: #232b23;
   width: 100%;
   max-width: 250px;
   margin-left: auto;
   margin-right: auto;
}
</style>
