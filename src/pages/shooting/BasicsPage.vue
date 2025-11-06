<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <!-- Header Section -->
      <div class="hero-section q-pa-lg q-mb-lg">
        <div class="row items-center">
          <div class="col">
            <div class="text-h4 text-weight-bold text-brown-8 q-mb-sm">
              <q-icon name="gps_fixed" class="q-mr-md" />
              Podstawy strzelania
            </div>
            <div class="text-subtitle1 text-grey-7">
              Techniki strzelania, bezpieczeństwo i działanie broni
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
        <!-- Działanie karabinka Grot -->
        <q-card class="content-card">
          <q-card-section class="card-header">
            <div class="row items-center">
              <q-icon name="settings" size="2rem" color="brown-6" class="q-mr-md" />
              <div>
                <div class="text-h5 text-weight-bold text-brown-8">Działanie karabinka Grot</div>
                <div class="text-subtitle2 text-grey-6">System gazowy krótkiego skoku</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md">
              Zasada działania karabinka Grot opiera się na systemie odprowadzania części gazów prochowych przez boczny otwór w lufie i wykorzystaniu krótkiego skoku tłoka gazowego.
            </div>

            <div class="mechanism-steps">
              <div class="step-item q-mb-lg">
                <div class="step-header">
                  <q-icon name="flash_on" color="brown-6" size="1.5rem" class="q-mr-sm" />
                  <span class="text-h6 text-weight-bold text-brown-8">1. Strzał i Uwolnienie Gazów</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl">
                  Po naciśnięciu spustu i odpaleniu naboju, pocisk jest wypychany przez lufę. Gdy minie on specjalny otwór gazowy w ściance lufy, część gazów prochowych o bardzo wysokim ciśnieniu jest kierowana do komory gazowej.
                </div>
              </div>

              <div class="step-item q-mb-lg">
                <div class="step-header">
                  <q-icon name="linear_scale" color="brown-6" size="1.5rem" class="q-mr-sm" />
                  <span class="text-h6 text-weight-bold text-brown-8">2. Ruch Tłoka i Automatyka</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl">
                  Gazy uderzają w czoło tłoka gazowego, przesuwając go na krótki dystans do tyłu. Tłok, za pośrednictwem popychacza, przekazuje energię na suwadło z zamkiem.
                </div>
              </div>

              <div class="step-item q-mb-lg">
                <div class="step-header">
                  <q-icon name="eject" color="brown-6" size="1.5rem" class="q-mr-sm" />
                  <span class="text-h6 text-weight-bold text-brown-8">3. Odryglowanie i Wyrzut</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl">
                  Ruch suwadła do tyłu powoduje odryglowanie zamka (poprzez jego obrót), wyciągnięcie pustej łuski z komory nabojowej i wyrzucenie jej na zewnątrz karabinka. Jednocześnie napinany jest kurek i ściskana sprężyna powrotna.
                </div>
              </div>

              <div class="step-item q-mb-lg">
                <div class="step-header">
                  <q-icon name="refresh" color="brown-6" size="1.5rem" class="q-mr-sm" />
                  <span class="text-h6 text-weight-bold text-brown-8">4. Powrót i Ryglowanie</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl">
                  Po osiągnięciu skrajnego tylnego położenia, suwadło pod wpływem sprężyny powrotnej zaczyna ruch do przodu. Zamek pobiera kolejny nabój z magazynka i dosyła go do komory nabojowej. W końcowej fazie ruchu następuje zaryglowanie zamka przez jego obrót.
                </div>
              </div>

              <div class="step-item">
                <div class="step-header">
                  <q-icon name="repeat" color="brown-6" size="1.5rem" class="q-mr-sm" />
                  <span class="text-h6 text-weight-bold text-brown-8">5. Kolejny Strzał</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl">
                  Broń jest gotowa do oddania kolejnego strzału, kontynuując cykl automatyki (w przypadku ognia ciągłego) lub oczekując na ponowne naciśnięcie spustu (w przypadku ognia pojedynczego).
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Bezpieczeństwo strzelania - BLOS -->
        <q-card class="content-card">
          <q-card-section class="card-header">
            <div class="row items-center">
              <q-icon name="security" size="2rem" color="red-6" class="q-mr-md" />
              <div>
                <div class="text-h5 text-weight-bold text-brown-8">Zasady bezpieczeństwa - BLOS</div>
                <div class="text-subtitle2 text-grey-6">Podstawowe zasady BHP na strzelnicy</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-lg text-center">
              <strong>BLOS</strong> - cztery fundamentalne zasady bezpieczeństwa w obchodzeniu się z bronią palną
            </div>

            <div class="blos-rules">
              <div class="blos-item q-mb-lg">
                <div class="blos-header q-mb-sm">
                  <div class="blos-letter">B</div>
                  <span class="text-h6 text-weight-bold text-brown-8">jak Broń</span>
                </div>
                <div class="text-body1 q-ml-xl">
                  Traktuj każdą broń tak, jakby była załadowana. Nigdy nie wkładaj żadnej części ciała przed lufę i nie machaj nią.
                </div>
              </div>

              <div class="blos-item q-mb-lg">
                <div class="blos-header q-mb-sm">
                  <div class="blos-letter blos-letter-l">L</div>
                  <span class="text-h6 text-weight-bold text-brown-8">jak Lufa</span>
                </div>
                <div class="text-body1 q-ml-xl">
                  Wylot lufy powinien być zawsze skierowany w bezpiecznym kierunku, np. w stronę kulochwytu, ziemi lub pod kątem 45 stopni.
                </div>
              </div>

              <div class="blos-item q-mb-lg">
                <div class="blos-header q-mb-sm">
                  <div class="blos-letter blos-letter-o">O</div>
                  <span class="text-h6 text-weight-bold text-brown-8">jak Otoczenie</span>
                </div>
                <div class="text-body1 q-ml-xl">
                  Upewnij się, co znajduje się w linii strzału, a także za celem, aby uniknąć rykoszetu lub postrzelenia osób postronnych.
                </div>
              </div>

              <div class="blos-item">
                <div class="blos-header q-mb-sm">
                  <div class="blos-letter blos-letter-s">S</div>
                  <span class="text-h6 text-weight-bold text-brown-8">jak Spust</span>
                </div>
                <div class="text-body1 q-ml-xl">
                  Palec powinien znajdować się poza osłoną spustu aż do momentu, gdy celujesz i jesteś gotowy do strzału. Nie dotykaj spustu, dopóki nie zamierzasz oddać strzału.
                </div>
              </div>
            </div>

            <div class="blos-reminder q-mt-lg">
              <q-icon name="priority_high" color="red-6" size="1.5rem" class="q-mr-sm" />
              <div class="text-body2 text-weight-bold text-red-8">
                PAMIĘTAJ: Przestrzeganie zasad BLOS to podstawa bezpiecznego obchodzenia się z bronią palną!
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
  name: 'BasicsPage'
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
  background: white;
  border: 1px solid rgba(139, 69, 19, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  border-bottom: 1px solid rgba(139, 69, 19, 0.2);
}

.mechanism-steps {
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
}

.step-item {
  padding: 16px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #8B4513;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.step-header {
  display: flex;
  align-items: center;
}

.safety-rules {
  background: #fff5f5;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #ffebee;
}

.rule-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.blos-rules {
  background: #fff5f5;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #ffebee;
}

.blos-item {
  padding: 16px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #f44336;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.blos-header {
  display: flex;
  align-items: center;
}

.blos-letter {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 16px;
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
}

.blos-letter-l {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
}

.blos-letter-o {
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.blos-letter-s {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
}

.blos-reminder {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border-radius: 8px;
  padding: 16px;
  border: 2px solid #f44336;
  display: flex;
  align-items: flex-start;
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.position-item {
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

@media (max-width: 768px) {
  .hero-section .text-h4 {
    font-size: 1.5rem;
  }

  .positions-grid {
    grid-template-columns: 1fr;
  }

  .step-item {
    padding: 12px;
  }

  .rule-item {
    padding: 8px;
  }

  .blos-item {
    padding: 12px;
  }

  .blos-letter {
    width: 32px;
    height: 32px;
    font-size: 1rem;
    margin-right: 12px;
  }

  .blos-rules, .blos-reminder {
    padding: 12px;
  }
}
</style>
