<template>
  <q-page class="q-pa-md">
  <BackNav :showBack="false" color="black"/>
    <div class="text-h4 text-weight-bold q-mb-md">ABC</div>
    <div class="text-subtitle1 text-grey-7 q-mb-lg">Podstawowe informacje dla nowo wcielonych</div>
    <q-card class="q-mb-lg">
      <q-card-section>
        <h5>ABC – Podstawowe informacje dla nowo wcielonych</h5>
        <p>Ta sekcja zawiera kluczowe zasady bezpieczeństwa, organizacji i pierwszych kroków dla nowych żołnierzy Wojsk Obrony Terytorialnej. Zapoznaj się z procedurami, zasadami meldowania, podstawami udzielania pierwszej pomocy oraz strukturą jednostki.</p>
      </q-card-section>
    </q-card>

    <div class="abc-cards-grid q-gutter-md q-mb-xl">
      <q-card class="abc-card" clickable @click="goToRotation">
        <q-card-section class="text-center">
          <q-icon name="backpack" size="2.5rem" color="primary" class="q-mb-sm" />
          <div class="text-h6 text-weight-bold">Co zabrać na rotację</div>
          <div class="text-caption text-grey-7">Lista rzeczy i wyposażenia</div>
        </q-card-section>
      </q-card>
      <q-card class="abc-card" clickable @click="goToBackpack">
        <q-card-section class="text-center">
          <q-icon name="hiking" size="2.5rem" color="primary" class="q-mb-sm" />
          <div class="text-h6 text-weight-bold">Pakowanie plecaka</div>
          <div class="text-caption text-grey-7">Praktyczne wskazówki</div>
        </q-card-section>
      </q-card>
      <q-card class="abc-card" clickable @click="goToChain">
        <q-card-section class="text-center">
          <q-icon name="alt_route" size="2.5rem" color="primary" class="q-mb-sm" />
          <div class="text-h6 text-weight-bold">Droga służbowa</div>
          <div class="text-caption text-grey-7">Zasady komunikacji i meldowania</div>
        </q-card-section>
      </q-card>
      <q-card class="abc-card" clickable @click="goToCyber">
        <q-card-section class="text-center">
          <q-icon name="security" size="2.5rem" color="primary" class="q-mb-sm" />
          <div class="text-h6 text-weight-bold">Bezpieczeństwo w sieci</div>
          <div class="text-caption text-grey-7">Podstawy cyberbezpieczeństwa</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>

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
</style>
