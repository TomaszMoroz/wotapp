<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <!-- Header Section -->
      <div class="hero-section q-pa-lg q-mb-lg">
        <div class="row items-center">
          <div class="col">
            <div class="text-h4 text-weight-bold text-white q-mb-sm">

              Optyka i celowniki
            </div>
            <div class="text-subtitle1 text-grey-3">
              Systemy celowania, lunety i kolimatory
            </div>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              round
              icon="arrow_back"
              color="white"
              size="lg"
              @click="goBack"
            />
          </div>
        </div>
      </div>

      <!-- Content Cards -->
      <div class="content-grid q-gutter-lg">
        <!-- Mil-Dot System -->
        <q-card class="content-card">
          <q-card-section class="card-header">
            <div class="row items-center">

              <div>
                <div class="text-h5 text-weight-bold text-white">Mil-Dot</div>
                <div class="text-subtitle2 text-grey-6">System celowania mil-dot</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md">
              System celowania wykorzystujący punkty mil-dot do określania odległości i kompensacji spadku pocisku. Mil-dot to precyzyjny system pomiarowy używany w optyce wojskowej.
            </div>

            <div class="features-section">
              <div class="text-h6 text-weight-bold text-white q-mb-md">Zastosowania:</div>
              <div class="feature-list">
                <div class="feature-item q-mb-sm">

                  <span class="text-body1"><strong>Pomiar odległości:</strong> Wykorzystanie wzorów mil-dot do określenia dystansu do celu</span>
                </div>
                <div class="feature-item q-mb-sm">

                  <span class="text-body1"><strong>Kompensacja wiatru:</strong> Korekta celowania w zależności od siły i kierunku wiatru</span>
                </div>
                <div class="feature-item q-mb-sm">

                  <span class="text-body1"><strong>Kompensacja spadku:</strong> Uwzględnienie trajektorii pocisku na dużych odległościach</span>
                </div>
                <div class="feature-item">

                  <span class="text-body1"><strong>Precyzyjne celowanie:</strong> Dokładne naprowadzanie na cele na odległościach powyżej 300m</span>
                </div>
              </div>
            </div>

            <div class="info-box q-mt-lg">

              <div class="text-body2">
                <strong>Wzór podstawowy:</strong> Odległość (m) = (Wysokość celu w metrach × 1000) / Wysokość celu w mil-dot
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- HWS Holographic Weapon Sight -->
        <q-card class="content-card">
          <q-card-section class="card-header">
            <div class="row items-center">

              <div>
                <div class="text-h5 text-weight-bold text-white">HWS (Holographic Weapon Sight)</div>
                <div class="text-subtitle2 text-grey-6">Holograficzny celownik kolimatorowy</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md">
              Holograficzny celownik kolimatorowy zapewniający szybkie i precyzyjne celowanie w różnych warunkach bojowych. Wykorzystuje technologię holograficzną do projekcji celownika.
            </div>

            <div class="features-section">
              <div class="text-h6 text-weight-bold text-white q-mb-md">Zalety HWS:</div>
              <div class="feature-list">
                <div class="feature-item q-mb-sm">

                  <span class="text-body1"><strong>Szybkie nabywanie celu:</strong> Natychmiastowe celowanie bez konieczności ustawiania oka</span>
                </div>

                <div class="feature-item q-mb-sm">

                  <span class="text-body1"><strong>Uniwersalność oświetlenia:</strong> Działanie w jasnym świetle dziennym i przy słabym oświetleniu</span>
                </div>
                <div class="feature-item q-mb-sm">

                  <span class="text-body1"><strong>Szeroki widok:</strong> Nie ogranicza pola widzenia strzelca</span>
                </div>
                <div class="feature-item">

                  <span class="text-body1"><strong>Długa żywotność baterii:</strong> Praca ciągła przez setki godzin</span>
                </div>
              </div>
            </div>

            <div class="info-box q-mt-lg">

              <div class="text-body2">
                <strong>Zastosowanie:</strong> Idealny do walki w terenie zurbanizowanym (CQB) i na średnich odległościach do 300m
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Lunety optyczne -->
        <q-card class="content-card">
          <q-card-section class="card-header">
            <div class="row items-center">

              <div>
                <div class="text-h5 text-weight-bold text-white">Lunety optyczne</div>
                <div class="text-subtitle2 text-grey-6">Celowniki teleskopowe</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md">
              Teleskopowe celowniki optyczne zapewniające powiększenie obrazu celu i precyzyjne celowanie na dalekich odległościach.
            </div>

            <div class="scope-types q-mb-lg">
              <div class="text-h6 text-weight-bold text-white q-mb-md">Typy lunet:</div>

              <div class="scope-item q-mb-md">
                <div class="text-subtitle1 text-weight-bold text-white q-mb-xs">Lunety o stałym powiększeniu</div>
                <div class="text-body2 text-grey-7">Np. 4x32 - proste, niezawodne, odporne na uszkodzenia</div>
              </div>

              <div class="scope-item q-mb-md">
                <div class="text-subtitle1 text-weight-bold text-white q-mb-xs">Lunety o zmiennym powiększeniu</div>
                <div class="text-body2 text-grey-7">Np. 1-4x24, 3-9x40 - uniwersalne, dostosowywane do odległości</div>
              </div>

              <div class="scope-item">
                <div class="text-subtitle1 text-weight-bold text-white q-mb-xs">Lunety taktyczne</div>
                <div class="text-body2 text-grey-7">Z wieżyczkami regulacyjnymi, siatkami mil-dot lub MOA</div>
              </div>
            </div>            <div class="feature-list">
              <div class="feature-item q-mb-sm">

                <span class="text-body1"><strong>Powiększenie:</strong> Od 1x do 25x w zależności od zastosowania</span>
              </div>
              <div class="feature-item q-mb-sm">

                <span class="text-body1"><strong>Regulacja:</strong> Wieżyczki korekcyjne do regulacji windażu i elewacji</span>
              </div>
              <div class="feature-item">

                <span class="text-body1"><strong>Podświetlenie:</strong> Opcjonalne podświetlenie siatki celowniczej</span>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Kolimatory -->
        <q-card class="content-card">
          <q-card-section class="card-header">
            <div class="row items-center">

              <div>
                <div class="text-h5 text-weight-bold text-white">Kolimatory (Red Dot)</div>
                <div class="text-subtitle2 text-grey-6">Celowniki punktowe</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md">
              Kolimatory to celowniki punktowe wyświetlające czerwoną lub zieloną kropkę, które umożliwiają szybkie celowanie przy zachowaniu otwartych oczu.
            </div>

            <div class="collimator-types q-mb-lg">
              <div class="text-h6 text-weight-bold text-white q-mb-md">Rodzaje kolimatorów:</div>

              <div class="collimator-item q-mb-md">
                <div class="text-subtitle1 text-weight-bold text-white q-mb-xs">Tube-style (rurowe)</div>
                <div class="text-body2 text-grey-7">Tradycyjna konstrukcja rurowa, wytrzymałe i niezawodne</div>
              </div>

              <div class="collimator-item q-mb-md">
                <div class="text-subtitle1 text-weight-bold text-white q-mb-xs">Open reflex (otwarte)</div>
                <div class="text-body2 text-grey-7">Kompaktowe, lekkie, szersze pole widzenia</div>
              </div>

              <div class="collimator-item">
                <div class="text-subtitle1 text-weight-bold text-white q-mb-xs">Prism-based</div>
                <div class="text-body2 text-grey-7">Wykorzystujące pryzmaty, bez potrzeby baterii</div>
              </div>
            </div>            <div class="feature-list">
              <div class="feature-item q-mb-sm">

                <span class="text-body1"><strong>Szybkość celowania:</strong> Natychmiastowe nabywanie celu</span>
              </div>
              <div class="feature-item q-mb-sm">

                <span class="text-body1"><strong>Shooting with both eyes open:</strong> Strzelanie z otwartymi oczami</span>
              </div>
              <div class="feature-item">

                <span class="text-body1"><strong>Regulacja jasności:</strong> Dostosowanie do warunków oświetleniowych</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'OpticsPage'
})

const router = useRouter()

const goBack = () => {
  router.push('/shooting')
}
</script>

<style scoped>
.page-background {
  background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  background: linear-gradient(135deg, #263238 0%, #1a1a1a 100%);
  border: 1px solid rgba(139, 69, 19, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  color: white;
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-card {
  background: linear-gradient(135deg, #2e2e2e 0%, #1a1a1a 100%);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-header {
  background: linear-gradient(135deg, #37474f 0%, #1a1a1a 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.features-section {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
  color: #e0e0e0;
}

.feature-list {
  background: #2e2e2e;
  border-radius: 8px;
  padding: 16px;
  color: #e0e0e0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
}

.info-box {
  background: linear-gradient(135deg, #2a3c4a 0%, #1f2e3e 100%);
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #2196f3;
  display: flex;
  align-items: flex-start;
  color: #e0e0e0;
}

.scope-types, .collimator-types {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
  color: #e0e0e0;
}

.scope-item, .collimator-item {
  padding: 12px;
  background: #3e3e3e;
  border-radius: 6px;
  border-left: 3px solid #4caf50;
  color: #e0e0e0;
}

.collimator-item {
  border-left-color: #ff9800;
}

@media (max-width: 768px) {
  .hero-section .text-h4 {
    font-size: 1.5rem;
  }

  .features-section, .scope-types, .collimator-types {
    padding: 16px;
  }

  .feature-item {
    padding: 6px 0;
  }

  .info-box {
    padding: 12px;
  }
}
</style>
