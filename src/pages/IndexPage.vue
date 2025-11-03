<template>
  <q-page class="row items-center justify-evenly">
    <div class="text-center">
      <div class="text-h4 q-mb-md">🏠 Dashboard WOT</div>
      <div class="text-subtitle1 q-mb-lg">Wojska Obrony Terytorialnej</div>

      <div class="row q-gutter-md justify-center">
        <q-card class="dashboard-card" clickable @click="$router.push('/communication')">
          <q-card-section class="text-center">
            <q-icon name="chat" size="3rem" color="primary" />
            <div class="text-h6 q-mt-sm">Komunikacja</div>
            <div class="text-caption">Wiadomości i kontakty</div>
          </q-card-section>
        </q-card>

        <q-card class="dashboard-card" clickable @click="$router.push('/training')">
          <q-card-section class="text-center">
            <q-icon name="gps_fixed" size="3rem" color="secondary" />
            <div class="text-h6 q-mt-sm">Strzelectwo</div>
            <div class="text-caption">Strzelnica i treningi</div>
          </q-card-section>
        </q-card>

        <q-card class="dashboard-card" clickable @click="$router.push('/emergency')">
          <q-card-section class="text-center">
            <q-icon name="warning" size="3rem" color="negative" />
            <div class="text-h6 q-mt-sm">Procedury</div>
            <div class="text-caption">Protokoły awaryjne</div>
          </q-card-section>
        </q-card>

        <q-card class="dashboard-card" clickable @click="$router.push('/unit')">
          <q-card-section class="text-center">
            <q-icon name="group" size="3rem" color="positive" />
            <div class="text-h6 q-mt-sm">Jednostka</div>
            <div class="text-caption">Informacje o personelu</div>
          </q-card-section>
        </q-card>

        <q-card class="dashboard-card" clickable @click="$router.push('/map')">
          <q-card-section class="text-center">
            <q-icon name="map" size="3rem" color="accent" />
            <div class="text-h6 q-mt-sm">Mapa</div>
            <div class="text-caption">Lokalizacja i nawigacja</div>
          </q-card-section>
        </q-card>

        <q-card class="dashboard-card" clickable @click="$router.push('/equipment')">
          <q-card-section class="text-center">
            <q-icon name="military_tech" size="3rem" color="orange" />
            <div class="text-h6 q-mt-sm">Wyposażenie</div>
            <div class="text-caption">Sprzęt i ekwipunek</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-mt-lg">
        <q-chip color="primary" text-color="white" icon="offline_pin">
          Tryb offline dostępny
        </q-chip>
      </div>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'IndexPage'
})
</script>

<style scoped>
.dashboard-card {
  width: 150px;
  height: 150px;
  cursor: pointer;
  transition: transform 0.2s;
}

.dashboard-card:hover {
  transform: scale(1.05);
}
</style>
