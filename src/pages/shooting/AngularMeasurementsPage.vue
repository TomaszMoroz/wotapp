<template>
  <q-page class="modern-bg">
    <div class="container q-pa-md">
      <BackNav />

      <!-- Header Section -->
      <div class="modern-hero q-pa-lg q-mb-lg">
        <div class="row items-center">
          <div class="col">
            <div class="text-h4 text-weight-bold text-dark q-mb-sm">
              <q-icon name="straighten" class="q-mr-md" color="primary" />
              Miary kątowe
            </div>
            <div class="text-subtitle1 text-grey-8">
              MOA, MIL/MRAD i systemy miary w strzelectwie precyzyjnym
            </div>
          </div>
        </div>
      </div>

      <!-- Content Cards -->
      <div class="modern-content-grid q-gutter-lg">
        <!-- Wprowadzenie -->
        <q-card class="modern-content-card">
          <q-card-section class="modern-card-header">
            <div class="row items-center">
              <q-icon name="info" size="2rem" color="primary" class="q-mr-md" />
              <div>
                <div class="text-h5 text-weight-bold text-dark">Mil-Dot (MRAD, MIL) – siatka i jednostka</div>
                <div class="text-subtitle2 text-grey-8">Podstawy systemu mil-dot (siatka) i miliradianów (MRAD/MIL) w strzelectwie precyzyjnym</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md text-dark">
              <b>Mil-Dot</b> to rodzaj siatki w lunecie celowniczej, gdzie naniesiono kropki na belkach krzyża. <br>
              <b>MIL/MRAD</b> to jednostka miary kąta (mili-radian). W strzelectwie przyjmuje się uproszczenie: 1 MIL = 10 cm na 100 m (tzw. "Shooter's Mil"), choć geometrycznie to 9,817 cm.
            </div>

            <div class="modern-definition-box q-mb-lg">
              <q-icon name="info" color="primary" size="1.5rem" class="q-mr-sm" />
              <div class="text-body2 text-dark">
                <strong>Definicja:</strong> Pierwszy człon słowa pochodzi od miliradiana, czyli 1/1000 rad. W praktyce strzeleckiej 1 MIL = 10 cm na 100 m (zaokrąglenie branżowe).
              </div>
            </div>

            <div class="modern-section-box q-mb-lg">
              <div class="text-h6 text-weight-bold text-dark q-mb-sm">Radian - jednostka miary</div>
              <div class="text-body1 text-dark">
                Jednostka miary łukowej kąta płaskiego. Jeżeli okrąg ma promień o długości r i na okręgu zaznaczymy taką samą długość r, to kąt o wierzchołku w środku okręgu i ramionach na końcach łuku wynosi 1 rad.
              </div>
              <div class="modern-formula-box q-mt-sm">
                <strong>1 rad = 180°/π ≈ 57,2957°</strong>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Obliczenia mil-dot -->
        <q-card class="modern-content-card">
          <q-card-section class="modern-card-header">
            <div class="row items-center">
              <q-icon name="calculate" size="2rem" color="amber-7" class="q-mr-md" />
              <div>
                <div class="text-h5 text-weight-bold text-dark">Obliczenia mil-dot</div>
                <div class="text-subtitle2 text-grey-8">Matematyka za systemem mil-dot</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="modern-section-box">
              <div class="q-mb-lg">
                <div class="text-h6 text-weight-bold text-dark q-mb-sm">Podstawowe założenia</div>
                <div class="text-body1 text-dark q-mb-sm">Zakładamy odległość r = 100m = 10 000cm</div>
                <div class="text-body1 text-dark q-mb-sm">Jedna tysięczna odległości wynosi dokładnie 10cm.</div>
                <div class="modern-highlight-box">
                  <strong>Oznacza to, że pomiędzy kropkami w lunecie z krzyżem Mil-Dot wynosi 10cm na 100m.</strong>
                </div>
              </div>

              <div class="q-mb-lg">
                <div class="text-h6 text-weight-bold text-dark q-mb-sm">Proporcje dla różnych odległości</div>
                <div class="modern-distance-examples">
                  <div class="modern-example-item">100m → 10cm</div>
                  <div class="modern-example-item">200m → 20cm</div>
                  <div class="modern-example-item">500m → 50cm</div>
                  <div class="modern-example-item">1000m → 100cm</div>
                </div>
              </div>

              <div>
                <div class="text-h6 text-weight-bold text-dark q-mb-sm">Sprawdzenie matematyczne</div>
                <div class="modern-math-proof">
                  <div class="text-body2 text-dark q-mb-xs">promień r = 100m</div>
                  <div class="text-body2 text-dark q-mb-xs">obwód okręgu o = 2πr = 2×π×100 = 628,3185m</div>
                  <div class="text-body2 text-dark q-mb-xs">1 rad = 57,2957°</div>
                  <div class="text-body2 text-dark q-mb-xs">1 miliradian = 0,05729°</div>
                  <div class="modern-formula-result">
                    <strong>Wynik: x = (628,3185m × 0,05729°) / 360° = 0,099m ≈ 10cm</strong>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Obliczanie odległości za pomocą siatki Mil-Dot -->
        <q-card class="modern-content-card">
          <q-card-section class="modern-card-header">
            <div class="row items-center">
              <q-icon name="straighten" size="2rem" color="teal-7" class="q-mr-md" />
              <div>
                <div class="text-h5 text-weight-bold text-dark">Obliczanie odległości za pomocą siatki Mil-Dot</div>
                <div class="text-subtitle2 text-grey-8">Wzory i przykłady praktyczne</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="modern-section-box">
              <div class="modern-important-note q-mb-lg">
                <q-icon name="warning" color="amber-7" size="1.5rem" class="q-mr-sm" />
                <div class="text-body2 text-dark">
                  <strong>Uwaga:</strong> Jeżeli krzyż jest umieszczony w drugim planie (nie zmienia swoich rozmiarów wraz ze zmienianym zoomem w lunecie), to odległości pomiędzy kropkami dla różnych powiększeń się zmieniają.
                </div>
              </div>

              <div class="q-mb-lg">
                <div class="text-h6 text-weight-bold text-dark q-mb-sm">Wzór ogólny (z korektą zoom)</div>
                <div class="modern-formula-box-main">
                  <strong>odległość [m] = (wielkość celu [m] × 1000 × (Powiększenie Aktualne / Powiększenie Kalibracyjne)) / liczba kropek [mil-dot]</strong>
                </div>
                <div class="text-body2 text-dark q-mt-xs">
                  <b>Uwaga:</b> "Powiększenie Kalibracyjne" to wartość, dla której siatka jest zgodna z MIL (np. 10x, podane przez producenta, zwykle oznaczone na lunecie). Dotyczy lunet SFP (drugi plan).
                </div>

                <div class="modern-example-calculation q-mt-md">
                  <div class="text-subtitle1 text-weight-bold text-dark q-mb-sm">Przykład 1:</div>
                  <div class="text-body2 text-dark q-mb-xs">Obiekt o wymiarze 0,5m zajmuje w krzyżu 1 mil-dot</div>
                  <div class="text-body2 text-dark q-mb-xs">Luneta ustawiona na zoom 7x (true mil-dot dla 9x)</div>
                  <div class="modern-calculation-result">
                    odległość = (0,5m × 1000 × 7/9) / 1 = <strong>388,89m</strong>
                  </div>
                </div>
              </div>

              <div>
                <div class="text-h6 text-weight-bold text-dark q-mb-sm">Wzór uproszczony (true mil-dot)</div>
                <div class="modern-formula-box-simple">
                  <strong>odległość [m] = (wielkość celu [m] × 1000) / liczba MIL</strong>
                </div>
                <div class="text-body2 text-dark q-mt-xs">
                  <b>FFP (pierwszy plan):</b> W lunetach FFP siatka zmienia rozmiar wraz z powiększeniem, więc wzór jest zawsze prosty jak powyżej.
                </div>

                <div class="modern-example-calculation q-mt-md">
                  <div class="text-subtitle1 text-weight-bold text-dark q-mb-sm">Przykład 2:</div>
                  <div class="text-body2 text-dark q-mb-xs">Obiekt o wymiarze 0,5m zajmuje w krzyżu 1 mil-dot</div>
                  <div class="text-body2 text-dark q-mb-xs">Luneta ustawiona na true mil-dot (np. 9x)</div>
                  <div class="modern-calculation-result">
                    odległość = (0,5m × 1000) / 1 = <strong>500m</strong>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- MOA - minuta kątowa -->
        <q-card class="modern-content-card">
          <q-card-section class="modern-card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold text-dark">MOA - minuta kątowa</div>
                <div class="text-subtitle2 text-grey-8">Regulacja lunety i obliczenia MOA</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="modern-section-box">
              <div class="q-mb-lg">
                <div class="text-body1 text-dark q-mb-sm">
                  Regulacja krzyża w lunecie często oznaczona jest jako jeden klik to 1/4 MOA lub 1/8 MOA.
                </div>
                <div class="modern-moa-calculation">
                  <div class="text-body2 text-dark q-mb-xs">Kąt pełen ma 360°, a 1° ma 60 minut</div>
                  <div class="text-body2 text-dark q-mb-xs">360 × 60 = 21600 minut</div>
                  <div class="text-body2 text-dark q-mb-xs">Bierzemy okrąg o promieniu r = 100m</div>
                  <div class="text-body2 text-dark">Obwód wynosi o = 2πr = 2 × π × 100 = 628,3185m</div>
                </div>
              </div>

              <div class="q-mb-lg">
                <div class="text-h6 text-weight-bold text-dark q-mb-sm">Obliczenie MOA</div>
                <div class="modern-calculation-steps">
                  <div class="step">628,3185m → 21600'</div>
                  <div class="step">x → 1'</div>
                  <div class="modern-result-box">x = 0,0290888m ≈ <strong>2,9 cm</strong></div>
                </div>
                <div class="modern-highlight-text q-mt-sm">
                  <strong>Na 100m, 1 MOA wynosi 2,9cm</strong>
                </div>
              </div>

              <div class="q-mb-lg">
                <div class="text-h6 text-weight-bold text-dark q-mb-sm">Przykłady dla różnych odległości</div>

                <div class="modern-distance-group q-mb-md">
                  <div class="modern-distance-title">Na 100m:</div>
                  <div class="modern-moa-values">
                    <div class="modern-moa-value">1 MOA = 2,9 cm</div>
                    <div class="modern-moa-value">1/4 MOA = 0,725 cm</div>
                    <div class="modern-moa-value">1/8 MOA = 0,3625 cm</div>
                  </div>
                </div>

                <div class="modern-distance-group q-mb-md">
                  <div class="modern-distance-title">Na 200m:</div>
                  <div class="modern-moa-values">
                    <div class="modern-moa-value">1 MOA = 5,8 cm</div>
                    <div class="modern-moa-value">1/4 MOA = 1,45 cm</div>
                    <div class="modern-moa-value">1/8 MOA = 0,725 cm</div>
                  </div>
                </div>

                <div class="modern-distance-group">
                  <div class="modern-distance-title">Na 500m:</div>
                  <div class="modern-moa-values">
                    <div class="modern-moa-value">1 MOA = 14,5 cm</div>
                    <div class="modern-moa-value">1/4 MOA = 3,625 cm</div>
                    <div class="modern-moa-value">1/8 MOA = 1,8125 cm</div>
                  </div>
                </div>
              </div>

              <div class="q-mb-lg">
                <div class="text-h6 text-weight-bold text-dark q-mb-sm">Przykład praktyczny</div>
                <div class="modern-example-scenario">
                  <div class="text-body2 text-dark q-mb-xs">Luneta o regulacji: jeden klik = 1/4 MOA</div>
                  <div class="text-body2 text-dark q-mb-xs">Odległość: 200m</div>
                  <div class="text-body2 text-dark q-mb-xs">Średni punkt trafień (ŚPT) jest 2,9cm pod celem</div>

                  <div class="modern-calculation-box q-mt-sm">
                    <div class="text-body2 text-dark">1 klik = 1,45cm (1/4 MOA na 200m)</div>
                    <div class="text-body2 text-dark">Korekta = 2,9cm</div>
                    <div class="result">Liczba klików = 2,9 ÷ 1,45 = 2 kliki</div>
                    <div class="modern-conclusion">
                      <strong>Potrzebne korekty: 2 kliki "w górę" na górnym bębnie regulacyjnym</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div class="text-h6 text-weight-bold text-dark q-mb-sm">Powiązanie Mil-Dot i MOA</div>
                <div class="modern-relation-formula">
                  <strong>1 MIL ≈ 3,44 MOA</strong>
                </div>
                <div class="text-body2 text-dark q-mt-xs">
                  <b>Wyjaśnienie:</b> Wartość geometryczna to 3,4377 MOA, ale w strzelectwie przyjmuje się uproszczenie 3,44 MOA.
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
  color: #222;
  border: 1px solid #e0e0e0;
}

.modern-card-header {
  background: #f5f7fa;
  border-bottom: 1px solid #e0e0e0;
  color: #222;
}

.modern-section-box {
  background: #f8fafc;
  border-radius: 10px;
  padding: 20px;
  color: #222;
}

.modern-definition-box {
  background: #e3f2fd;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #1976d2;
  display: flex;
  align-items: flex-start;
  color: #222;
}

.modern-formula-box {
  background: #e0f2f1;
  border-radius: 6px;
  padding: 12px;
  border-left: 3px solid #009688;
  text-align: center;
  color: #222;
}

.modern-highlight-box {
  background: #f0f4f8;
  border-radius: 6px;
  padding: 12px;
  border-left: 3px solid #1976d2;
  text-align: center;
  margin-top: 8px;
  color: #111;
  font-weight: 500;
}

.modern-distance-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
  margin-top: 12px;
   /* Removed unused .comparison-grid class */
  text-align: center;
  font-weight: bold;
  border: 1px solid #009688;
  color: #222;
}

.modern-math-proof {
  background: #f5f7fa;
  border-radius: 6px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  color: #222;
}
.modern-formula-result {
  background: #f0f4f8;
  padding: 12px;
  border-radius: 6px;
  margin-top: 8px;
  text-align: center;
  border: 1px solid #009688;
  color: #111;
  font-weight: 600;
}

.modern-important-note {
  background: #f0f4f8;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #009688;
  display: flex;
  align-items: flex-start;
  color: #111;
  font-weight: 500;
}
.modern-formula-box-main {
  background: #f0f4f8;
  border-radius: 8px;
  padding: 16px;
  border: 2px solid #009688;
  text-align: center;
  font-size: 1.1rem;
  color: #111;
  font-weight: 600;
}
.modern-formula-box-simple {
  background: #f0f4f8;
  border-radius: 8px;
  padding: 16px;
  border: 2px solid #1976d2;
  text-align: center;
  font-size: 1.1rem;
  color: #111;
  font-weight: 600;
}
.modern-example-calculation {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  color: #222;
}
.modern-calculation-result {
  background: #f0f4f8;
  padding: 12px;
  border-radius: 6px;
  margin-top: 8px;
  text-align: center;
  border: 1px solid #1976d2;
  color: #111;
  font-weight: 600;
}
.modern-moa-calculation {
  background: #f5f7fa;
  border-radius: 6px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  margin-top: 8px;
  color: #222;
}
.modern-calculation-steps {
  background: #f5f7fa;
  border-radius: 6px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  color: #222;
}
.modern-result-box {
  background: #e0f2f1;
  padding: 12px;
  border-radius: 6px;
  margin-top: 8px;
  text-align: center;
  border: 1px solid #009688;
  color: #222;
}
.modern-highlight-text {
  text-align: center;
  color: #009688;
  font-size: 1.1rem;
}
.modern-distance-group {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  color: #222;
}
.modern-distance-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: #222;
}
.modern-moa-values {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
}
.modern-moa-value {
  background: #f0f4f8;
  padding: 8px 12px;
  border-radius: 6px;
  text-align: center;
  border: 1px solid #009688;
  color: #111;
  font-weight: 600;
}
.modern-example-scenario {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  color: #222;
}
.modern-calculation-box {
  background: #e3f2fd;
  border-radius: 6px;
  padding: 16px;
  border: 1px solid #1976d2;
  color: #222;
}
.modern-conclusion {
  background: #f0f4f8;
  padding: 12px;
  border-radius: 6px;
  margin-top: 8px;
  text-align: center;
  border: 1px solid #009688;
  color: #111;
  font-weight: 600;
}
.modern-relation-formula {
  background: #f0f4f8;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  border: 2px solid #1976d2;
  font-size: 1.2rem;
  color: #111;
  font-weight: 600;
}

@media (max-width: 768px) {
  .modern-hero .text-h4 {
    font-size: 1.5rem;
  }
  .modern-content-grid {
    gap: 16px;
  }
  .modern-moa-values, .modern-distance-examples {
    grid-template-columns: 1fr;
  }
}

.comparison-item {
  padding: 20px;
  border-radius: 8px;
  border: 2px solid;
}

.moa-item {
  background: linear-gradient(135deg, #4a3a2a 0%, #3e2f1f 100%);
  border-color: #ff9800;
  color: white;
}

.mil-item {
  background: linear-gradient(135deg, #2a4a3c 0%, #1f3e2f 100%);
  border-color: #4caf50;
  color: white;
}

.application-note {
  background: linear-gradient(135deg, #2a3c4a 0%, #1f2e3e 100%);
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #2196f3;
  display: flex;
  align-items: flex-start;
  color: #e0e0e0;
}

.moa-details, .mil-details {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
  color: #e0e0e0;
}

.detail-item {
  padding: 16px;
  background: #2e2e2e;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  color: #e0e0e0;
}

.detail-header {
  display: flex;
  align-items: center;
}

.definition-box {
  background: linear-gradient(135deg, #2a3c4a 0%, #1f2e3e 100%);
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #2196f3;
  display: flex;
  align-items: flex-start;
  color: #e0e0e0;
}

.radian-explanation {
  background: #2e2e2e;
  border-radius: 8px;
  padding: 20px;
  color: #e0e0e0;
}

.formula-box {
  background: linear-gradient(135deg, #2a4a3c 0%, #1f3e2f 100%);
  border-radius: 6px;
  padding: 12px;
  border-left: 3px solid #4caf50;
  text-align: center;
  color: white;
}

.calculations-section {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
  color: #e0e0e0;
}

.calculation-item {
  padding: 16px;
  background: #2e2e2e;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  color: #e0e0e0;
}

.highlight-box {
  background: linear-gradient(135deg, #4a3a2a 0%, #3e2f1f 100%);
  border-radius: 6px;
  padding: 12px;
  border-left: 3px solid #ff9800;
  text-align: center;
  margin-top: 8px;
  color: white;
}

.distance-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.example-item {
  background: linear-gradient(135deg, #2a4a3c 0%, #1f3e2f 100%);
  padding: 8px 12px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  border: 1px solid #4caf50;
  color: white;
}

.math-proof {
  background: #2e2e2e;
  border-radius: 6px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
}

.formula-result {
  background: linear-gradient(135deg, #4a3a2a 0%, #3e2f1f 100%);
  padding: 12px;
  border-radius: 6px;
  margin-top: 8px;
  text-align: center;
  border: 1px solid #ff9800;
  color: white;
}

.important-note {
  background: linear-gradient(135deg, #4a3a2a 0%, #3e2f1f 100%);
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #ffc107;
  display: flex;
  align-items: flex-start;
  color: #e0e0e0;
}

.formula-box-main {
  background: linear-gradient(135deg, #2a4a3c 0%, #1f3e2f 100%);
  border-radius: 8px;
  padding: 16px;
  border: 2px solid #4caf50;
  text-align: center;
  font-size: 1.1rem;
  color: white;
}

.formula-box-simple {
  background: linear-gradient(135deg, #2a3c4a 0%, #1f2e3e 100%);
  border-radius: 8px;
  padding: 16px;
  border: 2px solid #2196f3;
  text-align: center;
  font-size: 1.1rem;
  color: white;
}

.example-calculation {
  background: #2e2e2e;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
}

.calculation-result {
  background: linear-gradient(135deg, #4a3a2a 0%, #3e2f1f 100%);
  padding: 12px;
  border-radius: 6px;
  margin-top: 8px;
  text-align: center;
  border: 1px solid #ff9800;
}

.moa-calculation {
  background: #2e2e2e;
  border-radius: 6px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 8px;
  color: #e0e0e0;
}

.calculation-steps {
  background: #2e2e2e;
  border-radius: 6px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
}

.step {
  padding: 4px 0;
  text-align: center;
}

.result-box {
  background: linear-gradient(135deg, #2a4a3c 0%, #1f3e2f 100%);
  padding: 12px;
  border-radius: 6px;
  margin-top: 8px;
  text-align: center;
  border: 1px solid #4caf50;
  color: white;
}

.highlight-text {
  text-align: center;
  color: #4caf50;
  font-size: 1.1rem;
}

.distance-group {
  background: #2e2e2e;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
}

.distance-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: white;
}

.moa-values {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
}

.moa-value {
  background: linear-gradient(135deg, #455a64 0%, #37474f 100%);
  padding: 8px 12px;
  border-radius: 6px;
  text-align: center;
  border: 1px solid #607d8b;
  color: white;
}

.example-scenario {
  background: #2e2e2e;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
}

.calculation-box {
  background: linear-gradient(135deg, #455a64 0%, #37474f 100%);
  border-radius: 6px;
  padding: 16px;
  border: 1px solid #607d8b;
  color: white;
}

.result {
  font-weight: bold;
  margin: 8px 0;
}

.conclusion {
  background: linear-gradient(135deg, #2a4a3c 0%, #1f3e2f 100%);
  padding: 12px;
  border-radius: 6px;
  margin-top: 8px;
  text-align: center;
  border: 1px solid #4caf50;
  color: white;
}

.relation-formula {
  background: linear-gradient(135deg, #4a3a2a 0%, #3e2f1f 100%);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  border: 2px solid #ff9800;
  font-size: 1.2rem;
  color: white;
}

.distance-table {
  background: #2e2e2e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  color: #e0e0e0;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: linear-gradient(135deg, #37474f 0%, #263238 100%);
  color: white;
  font-weight: bold;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid #e0e0e0;
}

.table-row:nth-child(even) {
  background: #3a3a3a;
}

.table-cell {
  padding: 12px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
}

.table-cell:last-child {
  border-right: none;
}

.recommendation-box {
  background: linear-gradient(135deg, #4a3a2a 0%, #3e2f1f 100%);
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #ffc107;
  display: flex;
  align-items: flex-start;
  color: #e0e0e0;
}

@media (max-width: 768px) {
  .hero-section .text-h4 {
    font-size: 1.5rem;
  }

  .comparison-grid {
    grid-template-columns: 1fr;
  }

  .table-header, .table-row {
    grid-template-columns: 1fr;
  }

  .table-cell {
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }

  .detail-item {
    padding: 12px;
  }

  .application-note, .recommendation-box {
    padding: 12px;
  }
}
</style>
