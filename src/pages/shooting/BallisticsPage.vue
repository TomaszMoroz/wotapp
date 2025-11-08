<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav />

      <!-- Header Section -->
      <div class="hero-section q-pa-lg q-mb-lg">
        <div class="row items-center">
          <div class="col">
            <div class="text-h4 text-weight-bold text-white q-mb-sm">
              Balistyka
            </div>
            <div class="text-subtitle1 text-grey-3">
              Balistyka naboju 5,56x45 mm NATO w karabinku GROT
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
        <!-- Wprowadzenie -->
        <q-card class="content-card">
          <q-card-section class="card-header">
            <div class="row items-center">

              <div>
                <div class="text-h5 text-weight-bold text-white">Balistyka Naboju 5,56x45 mm NATO w Karabinku GROT</div>
                <div class="text-subtitle2 text-grey-3">Charakterystyka i właściwości balistyczne</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md">
              Karabinek GROT (Modułowy System Broni Strzeleckiej) jest zasilany standardową amunicją 5,56x45 mm NATO. Balistyka tego naboju charakteryzuje się wysoką prędkością, stosunkowo płaską trajektorią na średnich dystansach oraz podatnością na czynniki atmosferyczne ze względu na relatywnie niską masę pocisku.
            </div>
          </q-card-section>
        </q-card>

        <!-- Balistyka Wewnętrzna -->
        <q-card class="content-card">
          <q-card-section class="card-header internal-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold text-white">I. Balistyka Wewnętrzna i Podstawowe Parametry</div>
                <div class="text-subtitle2 text-grey-3">Zjawiska zachodzące w lufie karabinka GROT</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-lg">
              Balistyka wewnętrzna to zjawiska zachodzące w lufie. W karabinku GROT (standardowa lufa 406 mm / 16 cali) kluczowe parametry to:
            </div>

            <div class="parameters-grid">
              <div class="parameter-item">
                <div class="parameter-header">
                  <span class="text-h6 text-weight-bold text-white">Amunicja</span>
                </div>
                <div class="text-body1 q-mt-sm">
                  5,56 x 45 mm NATO (np. pocisk M855/SS109 o masie 62 grany)
                </div>
              </div>

              <div class="parameter-item">
                <div class="parameter-header">
                  <span class="text-h6 text-weight-bold text-white">Prędkość wylotowa (V₀)</span>
                </div>
                <div class="text-body1 q-mt-sm">
                  Ok. 890 m/s (zmienna w zależności od amunicji)
                </div>
              </div>

              <div class="parameter-item">
                <div class="parameter-header">
                  <span class="text-h6 text-weight-bold text-white">Energia wylotowa</span>
                </div>
                <div class="text-body1 q-mt-sm">
                  Ok. 1600 J
                </div>
              </div>

              <div class="parameter-item">
                <div class="parameter-header">
                  <span class="text-h6 text-weight-bold text-white">Skok gwintu</span>
                </div>
                <div class="text-body1 q-mt-sm">
                  1:7 cala. Krótszy skok (1:7) lepiej stabilizuje cięższe pociski (62 grany i więcej), co jest kluczowe dla celności na dłuższym dystansie.
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Siły Balistyki Zewnętrznej -->
        <q-card class="content-card">
          <q-card-section class="card-header external-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold text-white">II. Kluczowe Siły Balistyki Zewnętrznej</div>
                <div class="text-subtitle2 text-grey-3">Siły działające na pocisk po opuszczeniu lufy</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-lg">
              Ruch pocisku po opuszczeniu lufy jest dyktowany przez cztery główne siły:
            </div>

            <div class="forces-table">
              <div class="force-item gravity-force">
                <div class="force-header">
                  <span class="text-h6 text-weight-bold">Grawitacja</span>
                </div>
                <div class="force-description">
                  Powoduje ciągłe opadanie pocisku (parabola). Wymaga pionowej korekty (tzw. Elevation lub Holdover), szczególnie powyżej 300 m.
                </div>
              </div>

              <div class="force-item resistance-force">
                <div class="force-header">
                  <span class="text-h6 text-weight-bold">Opór Powietrza</span>
                </div>
                <div class="force-description">
                  Zwalnia pocisk, przyspieszając opad i zwiększając podatność na wiatr. Zależy od współczynnika balistycznego (BC) pocisku.
                </div>
              </div>

              <div class="force-item wind-force">
                <div class="force-header">
                  <span class="text-h6 text-weight-bold">Wiatr (Znos)</span>
                </div>
                <div class="force-description">
                  Siła działająca prostopadle do toru lotu, odchylająca pocisk na boki. Lekki pocisk 5,56 mm jest na nią bardzo podatny.
                </div>
              </div>

              <div class="force-item drift-force">
                <div class="force-header">
                  <span class="text-h6 text-weight-bold">Derywacja</span>
                </div>
                <div class="force-description">
                  Boczne przesunięcie pocisku wynikające z jego ruchu obrotowego (efekt żyroskopowy). W standardowym gwincie prawoskrętnym pcha pocisk nieznacznie w prawo.
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Warunki Atmosferyczne -->
        <q-card class="content-card">
          <q-card-section class="card-header atmospheric-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold text-white">III. Wpływ Warunków Atmosferycznych (Gęstość Powietrza)</div>
                <div class="text-subtitle2 text-grey-3">Główny czynnik wpływający na opór</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-lg">
              Gęstość powietrza jest głównym czynnikiem wpływającym na opór, a tym samym na to, jak szybko pocisk zwalnia i jak opada.
            </div>

            <div class="atmospheric-conditions">
              <div class="condition-item low-density">
                <div class="condition-header">

                  <span class="text-h6 text-weight-bold text-white">Niska gęstość</span>
                </div>
                <div class="condition-subtitle text-body2 text-grey-3 q-mb-sm">
                  (Wysoka temperatura / Duża wysokość n.p.m.)
                </div>
                <div class="text-body1">
                  Mniejszy opór, pocisk leci szybciej i wyżej (mniejszy opad).
                </div>
              </div>

              <div class="condition-item high-density">
                <div class="condition-header">

                  <span class="text-h6 text-weight-bold text-white">Wysoka gęstość</span>
                </div>
                <div class="condition-subtitle text-body2 text-grey-3 q-mb-sm">
                  (Niska temperatura / Niska wysokość n.p.m.)
                </div>
                <div class="text-body1">
                  Większy opór, pocisk zwalnia szybciej i niżej (większy opad).
                </div>
              </div>

              <div class="condition-item humidity">
                <div class="condition-header">

                  <span class="text-h6 text-weight-bold text-white">Wilgotność</span>
                </div>
                <div class="text-body1">
                  Powietrze wilgotne jest nieznacznie mniej gęste niż suche, ale w praktyce jej wpływ jest marginalny w porównaniu do temperatury i ciśnienia.
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Praktyczne Rady -->
        <q-card class="content-card">
          <q-card-section class="card-header practical-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold text-white">IV. Praktyczne Rady dla Użytkownika GROTA</div>
                <div class="text-subtitle2 text-grey-3">Wskazówki do zastosowania w praktyce</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="practical-tips">
              <div class="tip-item">
                <div class="tip-header">

                  <span class="text-h6 text-weight-bold text-white">Dobór amunicji</span>
                </div>
                <div class="text-body1 q-mt-sm">
                  Jeśli strzelasz na dystansach powyżej 300 m, wybierz amunicję o wyższej masie (np. 69 grany lub 77 grany, jeśli lufa ma skok 1:7). Cięższy pocisk lepiej zachowuje energię i jest mniej podatny na wiatr.
                </div>
              </div>

              <div class="tip-item">
                <div class="tip-header">

                  <span class="text-h6 text-weight-bold text-white">Przystrzelanie (Zerowanie)</span>
                </div>
                <div class="text-body1 q-mt-sm">
                  Najczęściej stosowany punkt zerowania to ok 20/420 metrów. Ta wiedza pozwala celować centralnie na obu dystansach i używać techniki Holdover/Holdunder w międzyczasie.
                </div>
              </div>

              <div class="tip-item">
                <div class="tip-header">

                  <span class="text-h6 text-weight-bold text-white">Kontrola Spustu</span>
                </div>
                <div class="text-body1 q-mt-sm">
                  Najczęstszym błędem jest "zrywanie" strzału. Koncentracja na płynnej pracy spustu i utrzymaniu muszki/kropki na celu jest ważniejsza niż dokładna wiedza balistyczna.
                </div>
              </div>

              <div class="tip-item">
                <div class="tip-header">

                  <span class="text-h6 text-weight-bold text-white">Odczyt Wiatru</span>
                </div>
                <div class="text-body1 q-mt-sm">
                  Wiatr jest największą zmienną. Ucz się odczytywać wiatr na całej trasie strzału, ponieważ niska masa pocisku 5,56 mm sprawia, że jest on łatwo znoszony.
                </div>
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
import BackNav from 'components/BackNav.vue'

defineOptions({
  name: 'BallisticsPage'
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
  background: linear-gradient(135deg, #37474f 0%, #263238 100%);
  border-bottom: 1px solid rgba(139, 69, 19, 0.5);
  color: white;
}

.internal-header {
  background: linear-gradient(135deg, #5d4037 0%, #3e2723 100%);
  border-bottom: 1px solid rgba(121, 85, 72, 0.5);
  color: white;
}

.external-header {
  background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
  border-bottom: 1px solid rgba(56, 142, 60, 0.5);
  color: white;
}

.atmospheric-header {
  background: linear-gradient(135deg, #455a64 0%, #263238 100%);
  border-bottom: 1px solid rgba(69, 90, 100, 0.5);
  color: white;
}

.practical-header {
  background: linear-gradient(135deg, #455a64 0%, #37474f 100%);
  border-bottom: 1px solid rgba(69, 90, 100, 0.5);
  color: white;
}

.parameters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.parameter-item {
  padding: 20px;
  background: linear-gradient(135deg, #3e2723 0%, #2e1a1a 100%);
  border-radius: 8px;
  border-left: 4px solid #8d6e63;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  color: white;
}

.parameter-header {
  display: flex;
  align-items: center;
}

.forces-table {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.force-item {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.gravity-force {
  background: linear-gradient(135deg, #424242 0%, #212121 100%);
  border-left: 4px solid #757575;
  color: white;
}

.resistance-force {
  background: linear-gradient(135deg, #37474f 0%, #263238 100%);
  border-left: 4px solid #607d8b;
  color: white;
}

.wind-force {
  background: linear-gradient(135deg, #5d4037 0%, #3e2723 100%);
  border-left: 4px solid #8d6e63;
  color: white;
}

.drift-force {
  background: linear-gradient(135deg, #455a64 0%, #37474f 100%);
  border-left: 4px solid #607d8b;
  color: white;
}

.force-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.force-description {
  color: #b0bec5;
  line-height: 1.5;
}

.atmospheric-conditions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.condition-item {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  color: #e0e0e0;
}

.low-density {
  background: linear-gradient(135deg, #4a3a2a 0%, #3e2f1f 100%);
  border-left: 4px solid #ff9800;
}

.high-density {
  background: linear-gradient(135deg, #2a3c4a 0%, #1f2e3e 100%);
  border-left: 4px solid #2196f3;
}

.humidity {
  background: linear-gradient(135deg, #2a4a3c 0%, #1f3e2f 100%);
  border-left: 4px solid #009688;
}

.condition-header {
  display: flex;
  align-items: center;
}

.practical-tips {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tip-item {
  padding: 20px;
  background: linear-gradient(135deg, #3e3e3e 0%, #2a2a2a 100%);
  border-radius: 8px;
  border-left: 4px solid #ff9800;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  color: #e0e0e0;
}

.tip-header {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .hero-section .text-h4 {
    font-size: 1.5rem;
  }

  .parameters-grid,
  .forces-table,
  .atmospheric-conditions {
    grid-template-columns: 1fr;
  }

  .parameter-item,
  .force-item,
  .condition-item,
  .tip-item {
    padding: 16px;
  }
}
</style>
