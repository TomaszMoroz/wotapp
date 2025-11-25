<template>
  <q-page class="modern-bg q-pa-lg">
    <div class="shooting-content-limiter">
      <BackNav color="black" />
      <!-- Header Section -->
      <div class="modern-hero-section q-pa-lg q-mb-xl">
        <div class="row items-center justify-between">
          <div>
            <div class="text-h3 text-weight-bold modern-title">Podstawy strzelania</div>
            <div class="text-subtitle1 text-grey-7 q-mt-xs">Techniki strzelania, bezpieczeństwo i działanie broni</div>
          </div>
          <q-avatar size="56px" class="shadow-2">
            <q-icon name="gps_fixed" size="32px" color="primary" />
          </q-avatar>
        </div>
      </div>

      <!-- Content Cards -->
      <div class="modern-content-grid q-gutter-xl">
        <!-- Bezpieczeństwo strzelania - BLOS (przeniesione na początek) -->
        <q-card class="modern-content-card">
          <q-card-section class="modern-card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold modern-title">Zasady bezpieczeństwa - BLOS</div>
                <div class="text-subtitle2 text-grey-7">Podstawowe zasady BHP na strzelnicy</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-lg text-center">
              <q-chip color="red-1" text-color="red-10" icon="warning" class="q-mb-sm" style="font-size:1.1em;">BLOS</q-chip>
              cztery fundamentalne zasady bezpieczeństwa w obchodzeniu się z bronią palną
            </div>
            <div class="blos-rules-modern">
              <div class="blos-item-modern q-mb-lg">
                <div class="blos-header-modern q-mb-sm">
                  <q-chip color="red-2" text-color="red-10" class="blos-letter-modern">B</q-chip>
                  <span class="text-h6 text-weight-bold modern-title">jak Broń</span>
                </div>
                <div class="text-body1 q-ml-xl text-grey-8">
                  Traktuj każdą broń tak, jakby była załadowana. Gdy ktoś przekauje ci broń ustal jej stan (załadowana/rozładowana) i nigdy nie zakładaj, że jest rozładowana, dopóki sam tego nie sprawdzisz.
                </div>
              </div>
              <div class="blos-item-modern q-mb-lg">
                <div class="blos-header-modern q-mb-sm">
                  <q-chip color="orange-2" text-color="orange-10" class="blos-letter-modern">L</q-chip>
                  <span class="text-h6 text-weight-bold modern-title">jak Lufa</span>
                </div>
                <div class="text-body1 q-ml-xl text-grey-8">
                  Wylot lufy powinien być zawsze skierowany w kierunku rozpoznanego celu lub w kierunku bezpiecznym. Nie kieruj lufy w strone ludzi, zwierząt ani obiektów, które mogą zostać uszkodzone.
                </div>
              </div>
              <div class="blos-item-modern q-mb-lg">
                <div class="blos-header-modern q-mb-sm">
                  <q-chip color="green-2" text-color="green-10" class="blos-letter-modern">O</q-chip>
                  <span class="text-h6 text-weight-bold modern-title">jak Otoczenie</span>
                </div>
                <div class="text-body1 q-ml-xl text-grey-8">
                  Upewnij się, co znajduje się w linii strzału, wokół celu oraz strzelca, aby uniknąć rykoszetu lub postrzelenia osób postronnych a także mieć swiadomość sytuacji.
                </div>
              </div>
              <div class="blos-item-modern">
                <div class="blos-header-modern q-mb-sm">
                  <q-chip color="blue-2" text-color="blue-10" class="blos-letter-modern">S</q-chip>
                  <span class="text-h6 text-weight-bold modern-title">jak Spust</span>
                </div>
                <div class="text-body1 q-ml-xl text-grey-8">
                  Palec powinien znajdować się poza osłoną spustu aż do momentu, gdy celujesz i jesteś gotowy do strzału. Nie dotykaj spustu, dopóki nie zamierzasz oddać strzału.
                </div>
              </div>
            </div>
            <div class="blos-reminder-modern q-mt-lg">
              <q-chip color="red-2" text-color="red-10" icon="priority_high" class="q-mr-sm" />
              <span class="text-body2 text-weight-bold text-red-10">
                PAMIĘTAJ: Przestrzeganie zasad BLOS to podstawa bezpiecznego obchodzenia się z bronią palną!
              </span>
            </div>
          </q-card-section>
        </q-card>

        <!-- Działanie karabinka Grot -->
        <q-card class="modern-content-card">
          <q-card-section class="modern-card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold modern-title">Działanie karabinka Grot</div>
                <div class="text-subtitle2 text-grey-7">System gazowy krótkiego skoku</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-lg">
            <div class="text-body1 q-mb-md">
              Zasada działania karabinka Grot opiera się na systemie odprowadzania części gazów prochowych przez boczny otwór w lufie i wykorzystaniu krótkiego skoku tłoka gazowego.
            </div>
            <div class="mechanism-steps">
              <div class="step-item-modern q-mb-lg">
                <div class="step-header-modern">
                  <span class="text-h6 text-weight-bold modern-title">1. Strzał i Uwolnienie Gazów</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl text-grey-8">
                  Po naciśnięciu spustu i odpaleniu naboju, pocisk jest wypychany przez lufę. Gdy minie on specjalny otwór gazowy w ściance lufy, część gazów prochowych o bardzo wysokim ciśnieniu jest kierowana do komory gazowej.
                </div>
              </div>
              <div class="step-item-modern q-mb-lg">
                <div class="step-header-modern">
                  <span class="text-h6 text-weight-bold modern-title">2. Ruch Tłoka i Automatyka</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl text-grey-8">
                  Gazy uderzają w czoło tłoka gazowego, przesuwając go na krótki dystans do tyłu. Tłok, za pośrednictwem popychacza, przekazuje energię na suwadło z zamkiem.
                </div>
              </div>
              <div class="step-item-modern q-mb-lg">
                <div class="step-header-modern">
                  <span class="text-h6 text-weight-bold modern-title">3. Odryglowanie i Wyrzut</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl text-grey-8">
                  Ruch suwadła do tyłu powoduje odryglowanie zamka (poprzez jego obrót), wyciągnięcie pustej łuski z komory nabojowej i wyrzucenie jej na zewnątrz karabinka. Jednocześnie napinany jest kurek i ściskana sprężyna powrotna.
                </div>
              </div>
              <div class="step-item-modern q-mb-lg">
                <div class="step-header-modern">
                  <span class="text-h6 text-weight-bold modern-title">4. Powrót i Ryglowanie</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl text-grey-8">
                  Po osiągnięciu skrajnego tylnego położenia, suwadło pod wpływem sprężyny powrotnej zaczyna ruch do przodu. Zamek pobiera kolejny nabój z magazynka i dosyła go do komory nabojowej. W końcowej fazie ruchu następuje zaryglowanie zamka przez jego obrót.
                </div>
              </div>
              <div class="step-item-modern">
                <div class="step-header-modern">
                  <span class="text-h6 text-weight-bold modern-title">5. Kolejny Strzał</span>
                </div>
                <div class="text-body1 q-mt-sm q-ml-xl text-grey-8">
                  Broń jest gotowa do oddania kolejnego strzału, kontynuując cykl automatyki (w przypadku ognia ciągłego) lub oczekując na ponowne naciśnięcie spustu (w przypadku ognia pojedynczego).
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Stabilność i Postawa Strzelecka -->
        <q-card class="modern-content-card">
          <q-card-section class="modern-card-header">
            <div class="row items-center">
              <div>
                <div class="text-h5 text-weight-bold modern-title">Stabilność i Postawa Strzelecka</div>
                <div class="text-subtitle2 text-grey-7">Fundamenty precyzyjnego strzelania</div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-sm">
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
            <div class="grip-section q-mb-md">
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

.modern-bg {
  background: #f7f8f9;
  min-height: 100vh;
}
.shooting-content-limiter {
  max-width: 1200px;
  margin: 0 auto;
}
.modern-hero-section {
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 4px 24px 0 rgba(15,44,5,0.10);
  margin-bottom: 36px;
}
.modern-title {
  color: #0f2c05;
  letter-spacing: -0.5px;
}
.modern-content-grid {
  display: flex;
  flex-direction: column;
  gap: 36px;
}
.modern-content-card {
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 4px 24px 0 rgba(15,44,5,0.10);
  overflow: hidden;
  color: #232b23;
  border: none;
}
.modern-card-header {
  background: #f7f8f9;
  border-bottom: 1px solid #e0e0e0;
  color: #232b23;
}
.blos-rules-modern {
  background: #f7f8f9;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  color: #232b23;
}
.blos-item-modern {
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  border-left: 4px solid #f44336;
  box-shadow: 0 2px 8px rgba(15,44,5,0.07);
  color: #232b23;
}
.blos-header-modern {
  display: flex;
  align-items: center;
}
.blos-letter-modern {
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 16px;
}
.blos-reminder-modern {
  background: #fff0f0;
  border-radius: 8px;
  padding: 16px;
  border: 2px solid #f44336;
  display: flex;
  align-items: center;
  color: #d32f2f;
}
.step-item-modern {
  padding: 16px;
  background: #f7f8f9;
  border-radius: 12px;
  border-left: 4px solid #8B4513;
  box-shadow: 0 2px 8px rgba(15,44,5,0.07);
  color: #232b23;
}
.step-header-modern {
  display: flex;
  align-items: center;
}
@media (max-width: 768px) {
  .modern-hero-section .text-h3 {
    font-size: 1.5rem;
  }
  .modern-content-grid {
    gap: 18px;
  }
  .blos-item-modern {
    padding: 12px;
  }
  .blos-letter-modern {
    font-size: 1rem;
    margin-right: 12px;
  }
  .blos-rules-modern, .blos-reminder-modern {
    padding: 12px;
  }
  .step-item-modern {
    padding: 12px;
  }
}
</style>
