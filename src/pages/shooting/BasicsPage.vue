<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav />

      <!-- Header Section -->
      <div class="hero-section q-pa-lg q-mb-lg">
        <div class="row items-center">
          <div class="col">
            <div class="text-h4 text-weight-bold text-white q-mb-sm">
              Podstawy strzelania
            </div>
            <div class="text-subtitle1 text-grey-3">
              Techniki strzelania, bezpieczeństwo i działanie broni
            </div>
          </div>
        </div>
      </div>

  <!-- Content Cards -->
      <div class="content-grid q-gutter-lg">
        <!-- Bezpieczeństwo strzelania - BLOS (przeniesione na początek) -->
        <q-card class="content-card">
          <q-card-section class="card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold text-white">Zasady bezpieczeństwa - BLOS</div>
                <div class="text-subtitle2 text-grey-3">Podstawowe zasady BHP na strzelnicy</div>
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
                  <span class="text-h6 text-weight-bold text-white">jak Broń</span>
                </div>
                <div class="text-body1 q-ml-xl">
                  Traktuj każdą broń tak, jakby była załadowana. Nigdy nie wkładaj żadnej części ciała przed lufę i nie machaj nią.
                </div>
              </div>
              <div class="blos-item q-mb-lg">
                <div class="blos-header q-mb-sm">
                  <div class="blos-letter blos-letter-l">L</div>
                  <span class="text-h6 text-weight-bold text-white">jak Lufa</span>
                </div>
                <div class="text-body1 q-ml-xl">
                  Wylot lufy powinien być zawsze skierowany w bezpiecznym kierunku, np. w stronę kulochwytu, ziemi lub pod kątem 45 stopni.
                </div>
              </div>
              <div class="blos-item q-mb-lg">
                <div class="blos-header q-mb-sm">
                  <div class="blos-letter blos-letter-o">O</div>
                  <span class="text-h6 text-weight-bold text-white">jak Otoczenie</span>
                </div>
                <div class="text-body1 q-ml-xl">
                  Upewnij się, co znajduje się w linii strzału, a także za celem, aby uniknąć rykoszetu lub postrzelenia osób postronnych.
                </div>
              </div>
              <div class="blos-item">
                <div class="blos-header q-mb-sm">
                  <div class="blos-letter blos-letter-s">S</div>
                  <span class="text-h6 text-weight-bold text-white">jak Spust</span>
                </div>
                <div class="text-body1 q-ml-xl">
                  Palec powinien znajdować się poza osłoną spustu aż do momentu, gdy celujesz i jesteś gotowy do strzału. Nie dotykaj spustu, dopóki nie zamierzasz oddać strzału.
                </div>
              </div>
            </div>
            <div class="blos-reminder q-mt-lg">
              <div class="text-body2 text-weight-bold text-red-8">
                PAMIĘTAJ: Przestrzeganie zasad BLOS to podstawa bezpiecznego obchodzenia się z bronią palną!
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Działanie karabinka Grot -->
        <q-card class="content-card">
          <q-card-section class="card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold text-white">Działanie karabinka Grot</div>
                <div class="text-subtitle2 text-grey-3">System gazowy krótkiego skoku</div>
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
                  <span class="text-h6 text-weight-bold text-white">1. Strzał i Uwolnienie Gazów</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl">
                  Po naciśnięciu spustu i odpaleniu naboju, pocisk jest wypychany przez lufę. Gdy minie on specjalny otwór gazowy w ściance lufy, część gazów prochowych o bardzo wysokim ciśnieniu jest kierowana do komory gazowej.
                </div>
              </div>
              <div class="step-item q-mb-lg">
                <div class="step-header">
                  <span class="text-h6 text-weight-bold text-white">2. Ruch Tłoka i Automatyka</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl">
                  Gazy uderzają w czoło tłoka gazowego, przesuwając go na krótki dystans do tyłu. Tłok, za pośrednictwem popychacza, przekazuje energię na suwadło z zamkiem.
                </div>
              </div>
              <div class="step-item q-mb-lg">
                <div class="step-header">
                  <span class="text-h6 text-weight-bold text-white">3. Odryglowanie i Wyrzut</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl">
                  Ruch suwadła do tyłu powoduje odryglowanie zamka (poprzez jego obrót), wyciągnięcie pustej łuski z komory nabojowej i wyrzucenie jej na zewnątrz karabinka. Jednocześnie napinany jest kurek i ściskana sprężyna powrotna.
                </div>
              </div>
              <div class="step-item q-mb-lg">
                <div class="step-header">
                  <span class="text-h6 text-weight-bold text-white">4. Powrót i Ryglowanie</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl">
                  Po osiągnięciu skrajnego tylnego położenia, suwadło pod wpływem sprężyny powrotnej zaczyna ruch do przodu. Zamek pobiera kolejny nabój z magazynka i dosyła go do komory nabojowej. W końcowej fazie ruchu następuje zaryglowanie zamka przez jego obrót.
                </div>
              </div>
              <div class="step-item">
                <div class="step-header">
                  <span class="text-h6 text-weight-bold text-white">5. Kolejny Strzał</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl">
                  Broń jest gotowa do oddania kolejnego strzału, kontynuując cykl automatyki (w przypadku ognia ciągłego) lub oczekując na ponowne naciśnięcie spustu (w przypadku ognia pojedynczego).
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Stabilność i Postawa Strzelecka -->
        <q-card class="content-card">
          <q-card-section class="card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold text-white">Stabilność i Postawa Strzelecka</div>
                <div class="text-subtitle2 text-grey-3">Fundamenty precyzyjnego strzelania</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <!-- Wprowadzenie -->
            <div class="intro-section q-mb-lg">
              <div class="text-h6 text-weight-bold text-white q-mb-md">Wprowadzenie: Stabilność to Fundament</div>
              <div class="text-body1 q-mb-md">
                W strzelectwie dynamicznym i precyzyjnym kluczem jest nie siła, lecz powtarzalna stabilność i minimalizacja napięcia mięśniowego.
                Prawidłowa postawa i chwyt mają za zadanie stworzyć stabilną "platformę" minimalizującą naturalne drgania ciała,
                co bezpośrednio przekłada się na celność.
              </div>
            </div>

            <!-- I. Postawa -->
            <div class="stance-section q-mb-lg">
              <div class="text-h6 text-weight-bold text-white q-mb-md">I. Postawa: Trójkąt Stabilności</div>
              <div class="text-body1 q-mb-md">
                <strong>Postawa powinna być agresywna, ale luźna.</strong>
              </div>

              <div class="stance-elements">
                <div class="stance-item q-mb-md">
                  <div class="text-subtitle1 text-weight-bold text-white q-mb-sm">Fundament (Nogi)</div>
                  <div class="text-body2">
                    Stań w lekkim rozkroku, na szerokości barków lub nieco szerzej. Kolana lekko ugięte –
                    to pozwala działać ciału jako naturalny amortyzator. Środek ciężkości powinien być
                    przesunięty delikatnie do przodu, aby przeciwdziałać odrzutowi i kontrolować broń.
                  </div>
                </div>

                <div class="stance-item q-mb-md">
                  <div class="text-subtitle1 text-weight-bold text-white q-mb-sm">Balans</div>
                  <div class="text-body2">
                    Zbuduj trójkąt stabilności, w którym wierzchołkami są stopy i biodra. Celuj do przodu,
                    stopy ustawiając pod kątem, aby były gotowe na szybkie przesunięcie, ale jednocześnie
                    zapewniały pewny balans.
                  </div>
                </div>

                <div class="stance-item q-mb-md">
                  <div class="text-subtitle1 text-weight-bold text-white q-mb-sm">Luźne mięśnie</div>
                  <div class="text-body2">
                    Zredukuj napięcie w plecach i ramionach. Im więcej napięcia, tym trudniej o powtarzalność
                    i tym silniejsze są niekontrolowane drgania.
                  </div>
                </div>
              </div>
            </div>

            <!-- II. Chwyt -->
            <div class="grip-section q-mb-lg">
              <div class="text-h6 text-weight-bold text-white q-mb-md">II. Chwyt (Grip): Kontrola a Rozluźnienie</div>
              <div class="text-body1 q-mb-md">Wyróżniamy dwa kluczowe chwyty:</div>

              <div class="grip-types">
                <div class="grip-item q-mb-lg">
                  <div class="text-subtitle1 text-weight-bold text-white q-mb-sm">1. Chwyt Dominujący (Kontrola Spustu)</div>

                  <div class="grip-detail q-mb-sm">
                    <div class="text-subtitle2 text-weight-bold text-white">Pewność, nie siła:</div>
                    <div class="text-body2">
                      Chwyt pistoletowy ma być pewny, ale nie ma na celu miażdżenia. Zbyt mocny chwyt ręki strzelającej
                      powoduje napięcie, które przenosi się na palec spustowy, zwiększając ryzyko szarpnięcia.
                    </div>
                  </div>

                  <div class="grip-detail">
                    <div class="text-subtitle2 text-weight-bold text-white">Praca na języku spustowym:</div>
                    <div class="text-body2">
                      Palec powinien dotykać spustu opuszkiem. Cała praca palca musi być izolowana od reszty ręki.
                      Cel to równomierny i ciągły ruch w tył, bez żadnych ruchów bocznych czy pionowych (tzw. "pchnięcie spustu").
                    </div>
                  </div>
                </div>

                <div class="grip-item q-mb-lg">
                  <div class="text-subtitle1 text-weight-bold text-white q-mb-sm">2. Chwyt Wspierający (Stabilność)</div>

                  <div class="grip-detail q-mb-sm">
                    <div class="text-subtitle2 text-weight-bold text-white">Siła w kierunku celu:</div>
                    <div class="text-body2">
                      Ręka wspierająca trzymająca łoże karabinka powinna działać jak zacisk. Nie służy do unoszenia broni,
                      lecz do ściągania karabinka w kierunku strzelca, dociskając go do ramienia.
                    </div>
                  </div>

                  <div class="grip-detail">
                    <div class="text-subtitle2 text-weight-bold text-white">Bliski chwyt (C-Clamp):</div>
                    <div class="text-body2">
                      W strzelectwie dynamicznym popularny jest chwyt dalekiego zasięgu na łożu, który maksymalizuje
                      stabilność i kontrolę nad odrzutem. Ramię wspierające powinno być zgięte, a łokieć skierowany w dół,
                      co pomaga złożyć ramiona w bardziej zwartą i stabilną bryłę.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- III. Kontrola Krytyczna -->
            <div class="control-section">
              <div class="text-h6 text-weight-bold text-white q-mb-md">III. Kontrola Krytyczna: Oddech i Spust</div>

              <div class="control-types">
                <div class="control-item q-mb-lg">
                  <div class="text-subtitle1 text-weight-bold text-white q-mb-sm">Kontrola Oddechu</div>

                  <div class="control-detail q-mb-sm">
                    <div class="text-subtitle2 text-weight-bold text-white">Strefa Czasu Krytycznego:</div>
                    <div class="text-body2">
                      Strzał powinien zostać oddany w naturalnej pauzie oddechowej – po spokojnym wydechu,
                      ale przed rozpoczęciem naturalnej potrzeby kolejnego wdechu. Jest to moment,
                      kiedy ciało jest najbardziej zrelaksowane i nieruchome.
                    </div>
                  </div>

                  <div class="control-detail">
                    <div class="text-subtitle2 text-weight-bold text-white">Stabilność:</div>
                    <div class="text-body2">
                      Wstrzymywanie oddechu na siłę zwiększa napięcie. Celem jest osiągnięcie naturalnego spokoju na 1-3 sekundy.
                    </div>
                  </div>
                </div>

                <div class="control-item">
                  <div class="text-subtitle1 text-weight-bold text-white q-mb-sm">Praca na Spuście (Sight Picture, Sight Alignment)</div>

                  <div class="control-detail q-mb-sm">
                    <div class="text-subtitle2 text-weight-bold text-white">Decyzja:</div>
                    <div class="text-body2">
                      Strzał jest oddawany w momencie, gdy celownik jest idealnie zgrany z celem.
                    </div>
                  </div>

                  <div class="control-detail q-mb-sm">
                    <div class="text-subtitle2 text-weight-bold text-white">Dwa etapy (Two-Stage Trigger):</div>
                    <div class="text-body2">
                      Naucz się "wybierać luz" (branie wstępne) na spuście, aż poczujesz ścianę (punkt oporu).
                      Dopiero w momencie idealnego zgrania celownika, świadomie i płynnie przełamuj tę ścianę, powodując strzał.
                    </div>
                  </div>

                  <div class="control-detail">
                    <div class="text-subtitle2 text-weight-bold text-white">Follow-Through:</div>
                    <div class="text-body2">
                      Po strzale nie rozluźniaj chwytu i nie ruszaj głową. Utrzymaj celownik na celu przez ułamek sekundy,
                      aby upewnić się, że to nie ruch po strzale wpłynął na trafienie.
                    </div>
                  </div>
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

.mechanism-steps {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
  color: #e0e0e0;
}

.step-item {
  padding: 16px;
  background: #3e3e3e;
  border-radius: 8px;
  border-left: 4px solid #8B4513;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  color: #e0e0e0;
}

.step-header {
  display: flex;
  align-items: center;
}

.safety-rules {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
}

.rule-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #3e3e3e;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  color: #e0e0e0;
}

.blos-rules {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
}

.blos-item {
  padding: 16px;
  background: #3e3e3e;
  border-radius: 8px;
  border-left: 4px solid #f44336;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  color: #e0e0e0;
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
  background: linear-gradient(135deg, #4a2a2a 0%, #3e1f1f 100%);
  border-radius: 8px;
  padding: 16px;
  border: 2px solid #f44336;
  display: flex;
  align-items: flex-start;
  color: #e0e0e0;
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.position-item {
  padding: 20px;
  background: linear-gradient(135deg, #3e3e3e 0%, #2a2a2a 100%);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
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
