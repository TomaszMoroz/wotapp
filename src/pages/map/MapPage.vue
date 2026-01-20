body.body--dark .map-tile {
  border: 1.5px solid #444950 !important;
  background: #2c313a !important;
}
<template>
  <q-page class="q-pa-lg">
    <div class="dashboard-main-container">
      <div class="text-h4 q-mb-md">📍 Mapa i Lokalizacja</div>

      <div class="row q-gutter-md">
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="text-h6">Mapa operacyjna</div>
          </q-card-section>
          <q-card-section class="q-pa-none">
            <!-- Placeholder dla mapy -->
            <div class="map-placeholder">
              <q-icon name="map" size="4rem" color="grey-5" />
              <div class="text-subtitle2 q-mt-md">Mapa zostanie załadowana</div>
              <div class="text-caption">Wymagane połączenie internetowe</div>
            </div>
          </q-card-section>
          <q-card-actions align="around">
            <q-btn flat icon="my_location" label="Moja lokalizacja" />
            <q-btn flat icon="layers" label="Warstwy" />
            <q-btn flat icon="fullscreen" label="Pełny ekran" />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Punkty strategiczne</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="home" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Baza główna</q-item-label>
                  <q-item-label caption>ul. Wojskowa 1, Warszawa</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn flat round icon="directions" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="local_hospital" color="positive" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Punkt medyczny</q-item-label>
                  <q-item-label caption>2.3 km od bazy</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn flat round icon="directions" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="local_gas_station" color="orange" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Stacja paliw</q-item-label>
                  <q-item-label caption>1.8 km od bazy</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn flat round icon="directions" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="security" color="negative" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Punkt kontrolny</q-item-label>
                  <q-item-label caption>Aktywny 24/7</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn flat round icon="directions" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Twoja lokalizacja</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div v-if="location.available">
              <div class="text-caption">Szerokość geograficzna</div>
              <div class="text-body2 q-mb-sm">{{ location.lat }}°</div>
              <div class="text-caption">Długość geograficzna</div>
              <div class="text-body2 q-mb-sm">{{ location.lng }}°</div>
              <div class="text-caption">Dokładność</div>
              <div class="text-body2">{{ location.accuracy }}m</div>
            </div>
            <div v-else class="text-center q-pa-md">
              <q-icon name="location_disabled" size="2rem" color="grey" />
              <div class="q-mt-sm">Lokalizacja niedostępna</div>
              <q-btn
                flat
                color="primary"
                label="Włącz lokalizację"
                @click="getLocation"
                class="q-mt-sm"
              />
            </div>
          </q-card-section>
        </q-card>

        <q-card>
          <q-card-section>
            <div class="text-h6">Warunki pogodowe</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="text-center">
            <q-icon name="wb_sunny" size="3rem" color="orange" />
            <div class="text-h4 q-mt-sm">15°C</div>
            <div class="text-subtitle2">Słonecznie</div>
            <div class="text-caption q-mt-sm">
              Wiatr: 10 km/h | Wilgotność: 65%
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'MapPage'
})

const location = ref({
  available: false,
  lat: null,
  lng: null,
  accuracy: null
})

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        location.value = {
          available: true,
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6),
          accuracy: Math.round(position.coords.accuracy)
        }
      },
      () => {
        location.value.available = false
      }
    )
  }
}
</script>

<style scoped>

.dashboard-main-container {
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.map-placeholder {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
