<template>
  <q-page class="modern-bg">
    <div class="container q-pa-md">
      <BackNav color="black"/>

      <!-- Header Section -->
      <div class="modern-hero q-pa-lg q-mb-lg">
        <div class="row items-center">
          <div class="col">
            <div class="text-h4 text-weight-bold q-mb-sm" style="color:#111">
              Optyka i celowniki
            </div>
            <div class="text-subtitle1 text-grey-8">
              Systemy celowania, lunety i kolimatory
            </div>
          </div>
        </div>
      </div>

      <!-- Content Cards -->
      <div class="modern-content-grid q-gutter-lg">
        <!-- Mil-Dot System -->
        <q-card class="modern-content-card">
          <q-card-section class="modern-card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold" style="color:#111">Mil-Dot</div>
                <div class="text-subtitle2 text-grey-8">System celowania mil-dot</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md" style="color:#111">
              System celowania wykorzystujący punkty mil-dot do określania odległości i kompensacji spadku pocisku. Mil-dot to precyzyjny system pomiarowy używany w optyce wojskowej.
            </div>
            <div class="modern-features-section">
              <div class="text-h6 text-weight-bold q-mb-md" style="color:#111">Zastosowania:</div>
              <div class="modern-feature-list">
                <div class="modern-feature-item q-mb-sm">
                  <span class="text-body1" style="color:#111"><strong>Pomiar odległości:</strong> Wykorzystanie wzorów mil-dot do określenia dystansu do celu</span>
                </div>
                <div class="modern-feature-item q-mb-sm">
                  <span class="text-body1" style="color:#111"><strong>Kompensacja wiatru:</strong> Korekta celowania w zależności od siły i kierunku wiatru</span>
                </div>
                <div class="modern-feature-item q-mb-sm">
                  <span class="text-body1" style="color:#111"><strong>Kompensacja spadku:</strong> Uwzględnienie trajektorii pocisku na dużych odległościach</span>
                </div>
                <div class="modern-feature-item">
                  <span class="text-body1" style="color:#111"><strong>Precyzyjne celowanie:</strong> Dokładne naprowadzanie na cele na odległościach powyżej 300m</span>
                </div>
              </div>
            </div>
            <div class="modern-info-box q-mt-lg">
              <div class="text-body2" style="color:#111">
                <strong>Wzór podstawowy:</strong> Odległość (m) = (Wysokość celu w metrach × 1000) / Wysokość celu w mil-dot
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- HWS Holographic Weapon Sight -->
        <q-card class="modern-content-card">
          <q-card-section class="modern-card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold" style="color:#111">HWS (Holographic Weapon Sight)</div>
                <div class="text-subtitle2 text-grey-8">Holograficzny celownik kolimatorowy</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md" style="color:#111">
              Holograficzny celownik kolimatorowy zapewniający szybkie i precyzyjne celowanie w różnych warunkach bojowych. Wykorzystuje technologię holograficzną do projekcji celownika.
            </div>
            <div class="modern-features-section">
              <div class="text-h6 text-weight-bold q-mb-md" style="color:#111">Zalety HWS:</div>
              <div class="modern-feature-list">
                <div class="modern-feature-item q-mb-sm">
                  <span class="text-body1" style="color:#111"><strong>Szybkie nabywanie celu:</strong> Natychmiastowe celowanie bez konieczności ustawiania oka</span>
                </div>
                <div class="modern-feature-item q-mb-sm">
                  <span class="text-body1" style="color:#111"><strong>Uniwersalność oświetlenia:</strong> Działanie w jasnym świetle dziennym i przy słabym oświetleniu</span>
                </div>
                <div class="modern-feature-item q-mb-sm">
                  <span class="text-body1" style="color:#111"><strong>Szeroki widok:</strong> Nie ogranicza pola widzenia strzelca</span>
                </div>
                <div class="modern-feature-item">
                  <span class="text-body1" style="color:#111"><strong>Długa żywotność baterii:</strong> Praca ciągła przez setki godzin</span>
                </div>
              </div>
            </div>
            <div class="modern-info-box q-mt-lg">
              <div class="text-body2" style="color:#111">
                <strong>Zastosowanie:</strong> Idealny do walki w terenie zurbanizowanym (CQB) i na średnich odległościach do 300m
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Lunety optyczne -->
        <q-card class="modern-content-card">
          <q-card-section class="modern-card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold" style="color:#111">Lunety optyczne</div>
                <div class="text-subtitle2 text-grey-8">Celowniki teleskopowe</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md" style="color:#111">
              Teleskopowe celowniki optyczne zapewniające powiększenie obrazu celu i precyzyjne celowanie na dalekich odległościach.
            </div>
            <div class="modern-scope-types q-mb-lg">
              <div class="text-h6 text-weight-bold q-mb-md" style="color:#111">Typy lunet:</div>
              <div class="modern-scope-item q-mb-md">
                <div class="text-subtitle1 text-weight-bold q-mb-xs" style="color:#111">Lunety o stałym powiększeniu</div>
                <div class="text-body2 text-grey-7">Np. 4x32 - proste, niezawodne, odporne na uszkodzenia</div>
              </div>
              <div class="modern-scope-item q-mb-md">
                <div class="text-subtitle1 text-weight-bold q-mb-xs" style="color:#111">Lunety o zmiennym powiększeniu</div>
                <div class="text-body2 text-grey-7">Np. 1-4x24, 3-9x40 - uniwersalne, dostosowywane do odległości</div>
              </div>
              <div class="modern-scope-item">
                <div class="text-subtitle1 text-weight-bold q-mb-xs" style="color:#111">Lunety taktyczne</div>
                <div class="text-body2 text-grey-7">Z wieżyczkami regulacyjnymi, siatkami mil-dot lub MOA</div>
              </div>
            </div>
            <div class="modern-feature-list">
              <div class="modern-feature-item q-mb-sm">
                <span class="text-body1" style="color:#111"><strong>Powiększenie:</strong> Od 1x do 25x w zależności od zastosowania</span>
              </div>
              <div class="modern-feature-item q-mb-sm">
                <span class="text-body1" style="color:#111"><strong>Regulacja:</strong> Wieżyczki korekcyjne do regulacji windażu i elewacji</span>
              </div>
              <div class="modern-feature-item">
                <span class="text-body1" style="color:#111"><strong>Podświetlenie:</strong> Opcjonalne podświetlenie siatki celowniczej</span>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Kolimatory -->
        <q-card class="modern-content-card">
          <q-card-section class="modern-card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold" style="color:#111">Kolimatory (Red Dot)</div>
                <div class="text-subtitle2 text-grey-8">Celowniki punktowe</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md" style="color:#111">
              Kolimatory to celowniki punktowe wyświetlające czerwoną lub zieloną kropkę, które umożliwiają szybkie celowanie przy zachowaniu otwartych oczu.
            </div>
            <div class="modern-collimator-types q-mb-lg">
              <div class="text-h6 text-weight-bold q-mb-md" style="color:#111">Rodzaje kolimatorów:</div>
              <div class="modern-collimator-item q-mb-md">
                <div class="text-subtitle1 text-weight-bold q-mb-xs" style="color:#111">Tube-style (rurowe)</div>
                <div class="text-body2 text-grey-7">Tradycyjna konstrukcja rurowa, wytrzymałe i niezawodne</div>
              </div>
              <div class="modern-collimator-item q-mb-md">
                <div class="text-subtitle1 text-weight-bold q-mb-xs" style="color:#111">Open reflex (otwarte)</div>
                <div class="text-body2 text-grey-7">Kompaktowe, lekkie, szersze pole widzenia</div>
              </div>
              <div class="modern-collimator-item">
                <div class="text-subtitle1 text-weight-bold q-mb-xs" style="color:#111">Prism-based</div>
                <div class="text-body2 text-grey-7">Wykorzystujące pryzmaty, bez potrzeby baterii</div>
              </div>
            </div>
            <div class="modern-feature-list">
              <div class="modern-feature-item q-mb-sm">
                <span class="text-body1" style="color:#111"><strong>Szybkość celowania:</strong> Natychmiastowe nabywanie celu</span>
              </div>
              <div class="modern-feature-item q-mb-sm">
                <span class="text-body1" style="color:#111"><strong>Shooting with both eyes open:</strong> Strzelanie z otwartymi oczami</span>
              </div>
              <div class="modern-feature-item">
                <span class="text-body1" style="color:#111"><strong>Regulacja jasności:</strong> Dostosowanie do warunków oświetleniowych</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
</script>

<style scoped>

/* Jasny, nowoczesny motyw dashboardowy */
.modern-bg {
  background: #f7f7fa;
  min-height: 100vh;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.modern-hero {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid #e0e0e0;
}
.modern-content-grid {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.modern-content-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  overflow: hidden;
  color: #111;
  border: 1px solid #e0e0e0;
}
.modern-card-header {
  background: #f5f7fa;
  border-bottom: 1px solid #e0e0e0;
  color: #111;
}
.modern-features-section {
  background: #f0f4f8;
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
  color: #111;
}
.modern-feature-list {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  color: #111;
}
.modern-feature-item {
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
}
.modern-info-box {
  background: #f0f4f8;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #1976d2;
  display: flex;
  align-items: flex-start;
  color: #111;
}
.modern-scope-types, .modern-collimator-types {
  background: #f0f4f8;
  border-radius: 8px;
  padding: 20px;
  color: #111;
}
.modern-scope-item, .modern-collimator-item {
  padding: 12px;
  background: #fff;
  border-radius: 6px;
  border-left: 3px solid #009688;
  color: #111;
}
.modern-collimator-item {
  border-left-color: #1976d2;
}

@media (max-width: 768px) {
  .modern-hero .text-h4 {
    font-size: 1.5rem;
  }
  .modern-features-section, .modern-scope-types, .modern-collimator-types {
    padding: 16px;
  }
  .modern-feature-item {
    padding: 6px 0;
  }
  .modern-info-box {
    padding: 12px;
  }
}
</style>
