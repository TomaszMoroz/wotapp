<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav />

      <!-- Header Section -->
      <div class="hero-section q-pa-lg q-mb-lg">
        <div class="row items-center">
          <div class="col">
            <div class="text-h4 text-weight-bold text-white q-mb-sm">
              <q-icon name="straighten" class="q-mr-md" />
              Miary kątowe
            </div>
            <div class="text-subtitle1 text-grey-3">
              MOA, MIL/MRAD i systemy miary w strzelectwie precyzyjnym
            </div>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              round
              icon="arrow_back"
              color="brown-6"
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
              <q-icon name="info" size="2rem" color="blue-6" class="q-mr-md" />
              <div>
                <div class="text-h5 text-weight-bold text-white">Siatka Mil-Dot</div>
                <div class="text-subtitle2 text-grey-3">Podstawy systemu mil-dot w lunecie celowniczej</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md">
              Mil-Dot to rodzaj siatki w lunecie celowniczej, gdzie naniesiono kropki na belkach krzyża.
            </div>

            <div class="definition-box q-mb-lg">
              <q-icon name="info" color="blue-6" size="1.5rem" class="q-mr-sm" />
              <div class="text-body2">
                <strong>Definicja:</strong> Pierwszy człon słowa pochodzi od miliradiana, czyli 1/1000 rad.
              </div>
            </div>

            <div class="radian-explanation q-mb-lg">
              <div class="text-h6 text-weight-bold text-white q-mb-sm">Radian - jednostka miary</div>
              <div class="text-body1">
                Jednostka miary łukowej kąta płaskiego. Jeżeli okrąg ma promień o długości r i na okręgu zaznaczymy taką samą długość r, to kąt o wierzchołku w środku okręgu i ramionach na końcach łuku wynosi 1 rad.
              </div>
              <div class="formula-box q-mt-sm">
                <strong>1 rad = 180°/π ≈ 57,2957°</strong>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Obliczenia mil-dot -->
        <q-card class="content-card">
          <q-card-section class="card-header moa-header">
            <div class="row items-center">
              <q-icon name="calculate" size="2rem" color="orange-6" class="q-mr-md" />
              <div>
                <div class="text-h5 text-weight-bold text-white">Obliczenia mil-dot</div>
                <div class="text-subtitle2 text-grey-3">Matematyka za systemem mil-dot</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="calculations-section">
              <div class="calculation-item q-mb-lg">
                <div class="text-h6 text-weight-bold text-white q-mb-sm">Podstawowe założenia</div>
                <div class="text-body1 q-mb-sm">Zakładamy odległość r = 100m = 10 000cm</div>
                <div class="text-body1 q-mb-sm">Jedna tysięczna odległości wynosi dokładnie 10cm.</div>
                <div class="highlight-box">
                  <strong>Oznacza to, że pomiędzy kropkami w lunecie z krzyżem Mil-Dot wynosi 10cm na 100m.</strong>
                </div>
              </div>

              <div class="calculation-item q-mb-lg">
                <div class="text-h6 text-weight-bold text-white q-mb-sm">Proporcje dla różnych odległości</div>
                <div class="distance-examples">
                  <div class="example-item">100m → 10cm</div>
                  <div class="example-item">200m → 20cm</div>
                  <div class="example-item">500m → 50cm</div>
                  <div class="example-item">1000m → 100cm</div>
                </div>
              </div>

              <div class="calculation-item">
                <div class="text-h6 text-weight-bold text-white q-mb-sm">Sprawdzenie matematyczne</div>
                <div class="math-proof">
                  <div class="text-body2 q-mb-xs">promień r = 100m</div>
                  <div class="text-body2 q-mb-xs">obwód okręgu o = 2πr = 2×π×100 = 628,3185m</div>
                  <div class="text-body2 q-mb-xs">1 rad = 57,2957°</div>
                  <div class="text-body2 q-mb-xs">1 miliradian = 0,05729°</div>
                  <div class="formula-result">
                    <strong>Wynik: x = (628,3185m × 0,05729°) / 360° = 0,099m ≈ 10cm</strong>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Obliczanie odległości za pomocą siatki Mil-Dot -->
        <q-card class="content-card">
          <q-card-section class="card-header mil-header">
            <div class="row items-center">
              <q-icon name="straighten" size="2rem" color="green-6" class="q-mr-md" />
              <div>
                <div class="text-h5 text-weight-bold text-white">Obliczanie odległości za pomocą siatki Mil-Dot</div>
                <div class="text-subtitle2 text-grey-3">Wzory i przykłady praktyczne</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="distance-calculation">
              <div class="important-note q-mb-lg">
                <q-icon name="warning" color="amber-6" size="1.5rem" class="q-mr-sm" />
                <div class="text-body2">
                  <strong>Uwaga:</strong> Jeżeli krzyż jest umieszczony w drugim planie (nie zmienia swoich rozmiarów wraz ze zmienianym zoomem w lunecie), to odległości pomiędzy kropkami dla różnych powiększeń się zmieniają.
                </div>
              </div>

              <div class="formula-section q-mb-lg">
                <div class="text-h6 text-weight-bold text-white q-mb-sm">Wzór ogólny (z korektą zoom)</div>
                <div class="formula-box-main">
                  <strong>odległość [m] = (wielkość celu [m] × 1000 × (zoom / true mil-dot)) / liczba kropek [mil-dot]</strong>
                </div>

                <div class="example-calculation q-mt-md">
                  <div class="text-subtitle1 text-weight-bold text-white q-mb-sm">Przykład 1:</div>
                  <div class="text-body2 q-mb-xs">Obiekt o wymiarze 0,5m zajmuje w krzyżu 1 mil-dot</div>
                  <div class="text-body2 q-mb-xs">Luneta ustawiona na zoom 7x (true mil-dot dla 9x)</div>
                  <div class="calculation-result">
                    odległość = (0,5m × 1000 × 7/9) / 1 = <strong>388,89m</strong>
                  </div>
                </div>
              </div>

              <div class="formula-section">
                <div class="text-h6 text-weight-bold text-white q-mb-sm">Wzór uproszczony (true mil-dot)</div>
                <div class="formula-box-simple">
                  <strong>odległość [m] = (wielkość celu [m] × 1000) / liczba kropek [mil-dot]</strong>
                </div>

                <div class="example-calculation q-mt-md">
                  <div class="text-subtitle1 text-weight-bold text-white q-mb-sm">Przykład 2:</div>
                  <div class="text-body2 q-mb-xs">Obiekt o wymiarze 0,5m zajmuje w krzyżu 1 mil-dot</div>
                  <div class="text-body2 q-mb-xs">Luneta ustawiona na true mil-dot (np. 9x)</div>
                  <div class="calculation-result">
                    odległość = (0,5m × 1000) / 1 = <strong>500m</strong>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- MOA - minuta kątowa -->
        <q-card class="content-card">
          <q-card-section class="card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold text-white">MOA - minuta kątowa</div>
                <div class="text-subtitle2 text-grey-3">Regulacja lunety i obliczenia MOA</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="moa-section">
              <div class="moa-definition q-mb-lg">
                <div class="text-body1 q-mb-sm">
                  Regulacja krzyża w lunecie często oznaczona jest jako jeden klik to 1/4 MOA lub 1/8 MOA.
                </div>
                <div class="moa-calculation">
                  <div class="text-body2 q-mb-xs">Kąt pełen ma 360°, a 1° ma 60 minut</div>
                  <div class="text-body2 q-mb-xs">360 × 60 = 21600 minut</div>
                  <div class="text-body2 q-mb-xs">Bierzemy okrąg o promieniu r = 100m</div>
                  <div class="text-body2">Obwód wynosi o = 2πr = 2 × π × 100 = 628,3185m</div>
                </div>
              </div>

              <div class="moa-calculation-result q-mb-lg">
                <div class="text-h6 text-weight-bold text-white q-mb-sm">Obliczenie MOA</div>
                <div class="calculation-steps">
                  <div class="step">628,3185m → 21600'</div>
                  <div class="step">x → 1'</div>
                  <div class="result-box">x = 0,0290888m ≈ <strong>2,9 cm</strong></div>
                </div>
                <div class="highlight-text q-mt-sm">
                  <strong>Na 100m, 1 MOA wynosi 2,9cm</strong>
                </div>
              </div>

              <div class="moa-examples q-mb-lg">
                <div class="text-h6 text-weight-bold text-white q-mb-sm">Przykłady dla różnych odległości</div>

                <div class="distance-group q-mb-md">
                  <div class="distance-title">Na 100m:</div>
                  <div class="moa-values">
                    <div class="moa-value">1 MOA = 2,9 cm</div>
                    <div class="moa-value">1/4 MOA = 0,725 cm</div>
                    <div class="moa-value">1/8 MOA = 0,3625 cm</div>
                  </div>
                </div>

                <div class="distance-group q-mb-md">
                  <div class="distance-title">Na 200m:</div>
                  <div class="moa-values">
                    <div class="moa-value">1 MOA = 5,8 cm</div>
                    <div class="moa-value">1/4 MOA = 1,45 cm</div>
                    <div class="moa-value">1/8 MOA = 0,725 cm</div>
                  </div>
                </div>

                <div class="distance-group">
                  <div class="distance-title">Na 500m:</div>
                  <div class="moa-values">
                    <div class="moa-value">1 MOA = 14,5 cm</div>
                    <div class="moa-value">1/4 MOA = 3,625 cm</div>
                    <div class="moa-value">1/8 MOA = 1,8125 cm</div>
                  </div>
                </div>
              </div>

              <div class="practical-example q-mb-lg">
                <div class="text-h6 text-weight-bold text-white q-mb-sm">Przykład praktyczny</div>
                <div class="example-scenario">
                  <div class="text-body2 q-mb-xs">Luneta o regulacji: jeden klik = 1/4 MOA</div>
                  <div class="text-body2 q-mb-xs">Odległość: 200m</div>
                  <div class="text-body2 q-mb-xs">Średni punkt trafień (ŚPT) jest 2,9cm pod celem</div>

                  <div class="calculation-box q-mt-sm">
                    <div class="text-body2">1 klik = 1,45cm (1/4 MOA na 200m)</div>
                    <div class="text-body2">Korekta = 2,9cm</div>
                    <div class="result">Liczba klików = 2,9 ÷ 1,45 = 2 kliki</div>
                    <div class="conclusion">
                      <strong>Potrzebne korekty: 2 kliki "w górę" na górnym bębnie regulacyjnym</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mil-moa-relation">
                <div class="text-h6 text-weight-bold text-white q-mb-sm">Powiązanie Mil-Dot i MOA</div>
                <div class="relation-formula">
                  <strong>1 Mil-Dot = 0,05729° = 3,4374 MOA</strong>
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
  name: 'AngularMeasurementsPage'
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

.moa-header {
  background: linear-gradient(135deg, #4a3a2a 0%, #3e2f1f 100%);
  border-bottom: 1px solid rgba(255, 152, 0, 0.5);
  color: white;
}

.mil-header {
  background: linear-gradient(135deg, #2a4a3c 0%, #1f3e2f 100%);
  border-bottom: 1px solid rgba(76, 175, 80, 0.5);
  color: white;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
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
