<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-md">⚔️ Taktyka i Procedury</div>

    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <q-card>
          <q-card-section>
            <div class="text-h6 q-mb-md">🎯 Wybierz zagadnienie taktyczne</div>

            <q-select
              v-model="selectedTactic"
              :options="sortedTactics"
              label="Wyszukaj i wybierz zagadnienie"
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="name"
              option-value="id"
              @filter="filterTactics"
              @update:model-value="onTacticSelected"
              class="q-mb-md"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Brak wyników wyszukiwania
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" :color="scope.opt.color" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.category }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>
        </q-card>

        <!-- Prezentacja wybranego zagadnienia -->
        <div v-if="selectedTactic" class="q-mt-lg">
          <q-card class="shadow-5">
            <q-card-section class="bg-primary text-white">
              <div class="row items-center">
                <div class="col">
                  <div class="text-h5 q-mb-xs">{{ selectedTactic.name }}</div>
                  <q-chip
                    :icon="selectedTactic.icon"
                    :color="selectedTactic.color"
                    text-color="white"
                    size="sm"
                  >
                    {{ selectedTactic.category }}
                  </q-chip>
                </div>
                <div class="col-auto">
                  <q-avatar size="48px" :color="selectedTactic.color" text-color="white">
                    <q-icon :name="selectedTactic.icon" size="24px" />
                  </q-avatar>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="row items-center q-mb-md">
                <q-icon name="school" color="grey-6" size="20px" class="q-mr-sm" />
                <div class="text-h6 text-grey-8">Treść zagadnienia</div>
                <q-space />
                <q-chip size="sm" color="green-1" text-color="green-8" icon="verified">
                  Procedura WOT
                </q-chip>
              </div>

              <q-card class="modern-content-container" bordered>
                <q-card-section class="content-header">
                  <div class="row items-center">
                    <q-icon name="military_tech" color="primary" size="18px" class="q-mr-sm" />
                    <span class="text-caption text-primary font-weight-medium">
                      MATERIAŁ SZKOLENIOWY
                    </span>
                    <q-space />
                    <q-chip size="xs" color="orange-1" text-color="orange-8" icon="book">
                      Teoria
                    </q-chip>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section class="content-modern">
                  <div class="content-text-wrapper">
                    <div class="content-text" v-html="selectedTactic.content"></div>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section class="content-footer">
                  <div class="row items-center text-caption text-grey-6">
                    <q-icon name="info" size="14px" class="q-mr-xs" />
                    Materiał do nauki i szkolenia
                    <q-space />
                    <q-icon name="security" size="14px" class="q-mr-xs" />
                    Użytek służbowy
                  </div>
                </q-card-section>
              </q-card>
            </q-card-section>

            <q-separator v-if="selectedTactic.tips" />

            <q-card-section v-if="selectedTactic.tips" class="bg-blue-1">
              <div class="row items-center q-mb-md">
                <q-icon name="tips_and_updates" color="blue-8" size="20px" class="q-mr-sm" />
                <div class="text-h6 text-blue-8">Wskazówki praktyczne</div>
              </div>
              <q-banner inline-actions class="bg-blue-2 text-blue-9">
                {{ selectedTactic.tips }}
                <template v-slot:action>
                  <q-btn flat color="blue-8" icon="info" size="sm" />
                </template>
              </q-banner>
            </q-card-section>

            <q-separator />

            <q-card-actions align="between" class="q-pa-md">
              <q-chip icon="school" color="grey-4" text-color="grey-8" size="sm">
                Materiał WOT
              </q-chip>

              <div class="row q-gutter-sm">
                <q-btn
                  unelevated
                  color="primary"
                  icon="content_copy"
                  label="Kopiuj"
                  @click="copyToClipboard"
                  size="sm"
                />
                <q-btn
                  unelevated
                  color="green"
                  icon="print"
                  label="Drukuj"
                  @click="printTactic"
                  size="sm"
                />
              </div>
            </q-card-actions>
          </q-card>
        </div>

        <!-- Stan początkowy -->
        <div v-else class="q-mt-lg">
          <q-card class="text-center q-pa-lg">
            <q-card-section>
              <q-avatar size="80px" color="grey-3" text-color="grey-6">
                <q-icon name="school" size="40px" />
              </q-avatar>

              <div class="text-h6 text-grey-6 q-mt-md q-mb-sm">
                Wybierz zagadnienie taktyczne z listy powyżej
              </div>

              <q-chip color="grey-4" text-color="grey-8" icon="info">
                Dostępnych jest {{ allTactics.length }} zagadnień
              </q-chip>

              <q-separator class="q-my-md" />

              <div class="row justify-center q-gutter-md">
                <q-chip
                  v-for="category in ['Taktyka podstawowa', 'Procedury bojowe', 'Organizacja', 'Łączność', 'Topografia']"
                  :key="category"
                  color="blue-1"
                  text-color="blue-8"
                  size="sm"
                  icon="folder"
                >
                  {{ category }}
                </q-chip>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

defineOptions({
  name: 'TacticsPage'
})

const $q = useQuasar()

// Dane aplikacji
const selectedTactic = ref(null)
const filteredOptions = ref([])

// Wszystkie zagadnienia taktyczne
const allTactics = [
  {
    id: 1,
    name: 'Formacje marszu drużyny',
    category: 'Taktyka podstawowa',
    icon: 'group',
    color: 'blue',
    content: `
      <h3>FORMACJE MARSZU DRUŻYNY</h3>

      <h4>1. KOLUMNA</h4>
      <p><strong>Zastosowanie:</strong> Marsz w terenie zurbanizowanym, wąskich przejściach</p>
      <p><strong>Zalety:</strong> Łatwa kontrola, szybki marsz</p>
      <p><strong>Wady:</strong> Duża podatność na ogień z flanki</p>

      <h4>2. LINIA</h4>
      <p><strong>Zastosowanie:</strong> Natarcie na ostatnim odcinku, przeszukiwanie terenu</p>
      <p><strong>Zalety:</strong> Maksymalna siła ognia do przodu</p>
      <p><strong>Wady:</strong> Trudna kontrola, wolny marsz</p>

      <h4>3. KLIN</h4>
      <p><strong>Zastosowanie:</strong> Natarcie przez teren otwarty</p>
      <p><strong>Zalety:</strong> Dobra siła ognia i manewrowość</p>
      <p><strong>Wady:</strong> Podatność na ogień z flanki</p>

      <h4>4. VEE (ODWRÓCONY KLIN)</h4>
      <p><strong>Zastosowanie:</strong> Obrona, wycofywanie</p>
      <p><strong>Zalety:</strong> Dobra ochrona flanek</p>
      <p><strong>Wady:</strong> Słabsza siła ognia do przodu</p>
    `,
    tips: 'Zmieniaj formację w zależności od terenu i sytuacji taktycznej. W terenie zurbanizowanym preferuj kolumnę, na otwartym - klin.'
  },
  {
    id: 2,
    name: 'Techniki przemieszczania',
    category: 'Taktyka podstawowa',
    icon: 'directions_walk',
    color: 'green',
    content: `
      <h3>TECHNIKI PRZEMIESZCZANIA</h3>

      <h4>1. TRAVELING</h4>
      <p><strong>Kiedy:</strong> Brak zagrożenia przeciwnika</p>
      <p><strong>Jak:</strong> Normalny marsz w formacji, wszyscy się przemieszczają</p>
      <p><strong>Tempo:</strong> Normalne</p>

      <h4>2. TRAVELING OVERWATCH</h4>
      <p><strong>Kiedy:</strong> Możliwy kontakt z przeciwnikiem</p>
      <p><strong>Jak:</strong> Przemieszczanie z obserwacją wzajemną</p>
      <p><strong>Zasada:</strong> Zespoły naprzemiennie obserwują i przemieszczają się</p>

      <h4>3. BOUNDING OVERWATCH</h4>
      <p><strong>Kiedy:</strong> Prawdopodobny kontakt z przeciwnikiem</p>
      <p><strong>Jak:</strong> Jeden zespół obserwuje, drugi przemieszcza się na krótkie odległości</p>
      <p><strong>Rodzaje:</strong></p>
      <ul>
        <li><strong>Successive bounds:</strong> Zespoły nie wyprzedzają się</li>
        <li><strong>Alternate bounds:</strong> Zespoły się wyprzedzają</li>
      </ul>

      <h4>ZASADY OGÓLNE</h4>
      <ul>
        <li>Utrzymuj kontakt wzrokowy z dowódcą</li>
        <li>Używaj naturalnych osłon</li>
        <li>Unikaj przewidywalności ruchu</li>
        <li>Obserwuj swój sektor odpowiedzialności</li>
      </ul>
    `,
    tips: 'Dostosowuj technikę do poziomu zagrożenia. Im większe zagrożenie, tym bardziej ostrożna technika przemieszczania.'
  },
  {
    id: 3,
    name: 'Organizacja drużyny strzeleckiej',
    category: 'Organizacja',
    icon: 'group_work',
    color: 'orange',
    content: `
      <h3>ORGANIZACJA DRUŻYNY STRZELECKIEJ</h3>

      <h4>SKŁAD OSOBOWY (9 ŻOŁNIERZY)</h4>

      <h4>DOWÓDCA DRUŻYNY (DŻ)</h4>
      <ul>
        <li>Uzbrojenie: karabin szturmowy + granat</li>
        <li>Zadania: dowodzenie, łączność, koordynacja</li>
        <li>Pozycja: centralna w formacji</li>
      </ul>

      <h4>ZESPÓŁ OGNIOWY ALFA (4 żołnierzy)</h4>
      <p><strong>Dowódca zespołu (DZ):</strong></p>
      <ul>
        <li>Karabin szturmowy + granat</li>
        <li>Zastępca dowódcy drużyny</li>
      </ul>

      <p><strong>Strzelec-granaciarnik:</strong></p>
      <ul>
        <li>Karabin szturmowy + podwieszany granatnik</li>
        <li>Wsparcie ogniowe zespołu</li>
      </ul>

      <p><strong>2x Strzelec:</strong></p>
      <ul>
        <li>Karabin szturmowy</li>
        <li>Podstawa siły ognia</li>
      </ul>

      <h4>ZESPÓŁ OGNIOWY BRAVO (4 żołnierzy)</h4>
      <p><strong>Dowódca zespołu (DZ):</strong></p>
      <ul>
        <li>Karabin szturmowy + granat</li>
      </ul>

      <p><strong>Strzelec wyborowy:</strong></p>
      <ul>
        <li>Karabin wyborowy + optyka</li>
        <li>Wsparcie precyzyjne</li>
      </ul>

      <p><strong>Kaemista:</strong></p>
      <ul>
        <li>Karabin szturmowy + apteczka</li>
        <li>Pierwsza pomoc</li>
      </ul>

      <p><strong>RTO (łącznościowiec):</strong></p>
      <ul>
        <li>Karabin szturmowy + radiostacja</li>
        <li>Łączność z przełożonymi</li>
      </ul>
    `,
    tips: 'Każdy żołnierz musi znać zadania wszystkich pozostałych członków drużyny na wypadek strat.'
  },
  {
    id: 4,
    name: 'Reakcja na kontakt ogniowy',
    category: 'Procedury bojowe',
    icon: 'warning',
    color: 'red',
    content: `
      <h3>REAKCJA NA KONTAKT OGNIOWY</h3>

      <h4>NATYCHMIASTOWE DZIAŁANIA</h4>

      <h4>1. DETEKCJA KONTAKTU</h4>
      <ul>
        <li><strong>"KONTAKT PRZÓD!"</strong> - kierunek kontaktu</li>
        <li>Natychmiastowy ruch do osłony</li>
        <li>Otwarcie ognia zwrotnego</li>
      </ul>

      <h4>2. DZIAŁANIA ZESPOŁÓW</h4>

      <p><strong>ZESPÓŁ W KONTAKCIE:</strong></p>
      <ul>
        <li>Rozwija się do linii</li>
        <li>Prowadzi intensywny ogień</li>
        <li>Szuka osłony</li>
        <li>Określa pozycję przeciwnika</li>
      </ul>

      <p><strong>ZESPÓŁ BEZ KONTAKTU:</strong></p>
      <ul>
        <li>Przemieszcza się na flankę</li>
        <li>Przygotowuje się do manewru</li>
        <li>Gotowy do wsparcia</li>
      </ul>

      <h4>3. DZIAŁANIA DOWÓDCY</h4>
      <ul>
        <li>Ocenia sytuację (5W: Who, What, Where, When, Why)</li>
        <li>Wydaje rozkazy zespołom</li>
        <li>Koordynuje manewr</li>
        <li>Utrzymuje łączność z przełożonymi</li>
      </ul>

      <h4>MOŻLIWE MANEWRY</h4>

      <h4>FIRE AND MOVEMENT</h4>
      <ul>
        <li>Jeden zespół wiąże ogniem</li>
        <li>Drugi zespół manewruje</li>
        <li>Zmiana ról po osiągnięciu pozycji</li>
      </ul>

      <h4>BREAK CONTACT</h4>
      <ul>
        <li>Gdy przeciwnik silniejszy</li>
        <li>Dymienie i wycofywanie</li>
        <li>Osłona wzajemna zespołów</li>
      </ul>
    `,
    tips: 'Pierwszych 30 sekund to kluczowy moment. Szybkość reakcji i agresywność ognia często decydują o wyniku starcia.'
  },
  {
    id: 5,
    name: 'Zasady łączności radiowej',
    category: 'Łączność',
    icon: 'radio',
    color: 'purple',
    content: `
      <h3>ZASADY ŁĄCZNOŚCI RADIOWEJ</h3>

      <h4>PODSTAWOWE ZASADY</h4>

      <h4>1. BREVITY (ZWIĘZŁOŚĆ)</h4>
      <ul>
        <li>Krótkie, konkretne komunikaty</li>
        <li>Unikaj zbędnych słów</li>
        <li>Maksymalnie 30 sekund transmisji</li>
      </ul>

      <h4>2. CLARITY (JASNOŚĆ)</h4>
      <ul>
        <li>Mów wyraźnie i powoli</li>
        <li>Używaj standardowej terminologii</li>
        <li>Literuj trudne słowa alfabetem NATO</li>
      </ul>

      <h4>3. SECURITY (BEZPIECZEŃSTWO)</h4>
      <ul>
        <li>Używaj znaków wywoławczych</li>
        <li>Nie ujawniaj pozycji ani planów</li>
        <li>Zmieniaj częstotliwości zgodnie z planem</li>
      </ul>

      <h4>PROCEDURY RADIOWE</h4>

      <h4>NAWIĄZYWANIE ŁĄCZNOŚCI</h4>
      <p><strong>Format:</strong> "[Znak wywoławczy odbiorcy], tu [Twój znak], słucham, odbiór"</p>
      <p><strong>Przykład:</strong> "Ramzes, tu Alfa-1, słucham, odbiór"</p>

      <h4>PRZEKAZYWANIE KOMUNIKATU</h4>
      <p><strong>Format:</strong> "[Znak odbiorcy], tu [Twój znak], [komunikat], potwierdzam odbiór"</p>

      <h4>POTWIERDZENIE</h4>
      <ul>
        <li><strong>"Roger"</strong> - rozumiem</li>
        <li><strong>"Wilco"</strong> - rozumiem i wykonam</li>
        <li><strong>"Say again"</strong> - powtórz</li>
        <li><strong>"Negative"</strong> - nie/negatywne</li>
        <li><strong>"Affirmative"</strong> - tak/pozytywne</li>
      </ul>

      <h4>MELDOWANIE POZYCJI</h4>
      <ul>
        <li>Używaj współrzędnych GRID</li>
        <li>Format: "Moja pozycja 12345 67890"</li>
        <li>Nigdy nie używaj nazw miejscowości</li>
      </ul>

      <h4>DYSCYPLINA RADIOWA</h4>
      <ul>
        <li>Słuchaj przed transmisją</li>
        <li>Nie przerywaj innym</li>
        <li>Check-in zgodnie z harmonogramem</li>
        <li>Oszczędzaj baterię</li>
      </ul>
    `,
    tips: 'Pamiętaj: przeciwnik może cię podsłuchiwać. Używaj zawsze znaków wywoławczych i unikaj ujawniania szczegółów operacyjnych.'
  },
  {
    id: 6,
    name: 'Odczytywanie mapy topograficznej',
    category: 'Topografia',
    icon: 'map',
    color: 'orange',
    content: `
      <h3>ODCZYTYWANIE MAPY TOPOGRAFICZNEJ</h3>

      <h4>ELEMENTY MAPY</h4>
      <ul>
        <li><strong>Skala:</strong> Stosunek odległości na mapie do rzeczywistej</li>
        <li><strong>Siatka współrzędnych:</strong> System kwadratów do określania pozycji</li>
        <li><strong>Legenda:</strong> Objaśnienie symboli i znaków</li>
        <li><strong>Deklinacja magnetyczna:</strong> Różnica między północą magnetyczną a mapową</li>
      </ul>

      <h4>WSPÓŁRZĘDNE GRID</h4>
      <p><strong>Format 6-cyfrowy:</strong> 123456 (3 cyfry wschód + 3 cyfry północ)</p>
      <p><strong>Format 8-cyfrowy:</strong> 12345678 (4 cyfry wschód + 4 cyfry północ)</p>
      <p><strong>Dokładność:</strong></p>
      <ul>
        <li>6 cyfr = ±100m</li>
        <li>8 cyfr = ±10m</li>
      </ul>

      <h4>LINIE WARSTWICOWE</h4>
      <p><strong>Zasady:</strong></p>
      <ul>
        <li>Zbliżone linie = stromy teren</li>
        <li>Oddalone linie = łagodny teren</li>
        <li>Zamknięte koła = wzniesienia/zagłębienia</li>
      </ul>

      <h4>FORMY TERENU</h4>
      <ul>
        <li><strong>Grzbiet:</strong> Wydłużone wzniesienie</li>
        <li><strong>Dolina:</strong> Obniżenie między wzniesieniami</li>
        <li><strong>Siodło:</strong> Przełęcz między dwoma wzniesieniami</li>
        <li><strong>Depresja:</strong> Zamknięte obniżenie</li>
      </ul>
    `,
    tips: 'Zawsze sprawdzaj datę mapy i deklinację magnetyczną. Stare mapy mogą mieć nieaktualne informacje o infrastrukturze.'
  },
  {
    id: 7,
    name: 'Orientacja w terenie',
    category: 'Topografia',
    icon: 'explore',
    color: 'orange',
    content: `
      <h3>ORIENTACJA W TERENIE</h3>

      <h4>METODY ORIENTACJI</h4>

      <h4>1. ORIENTACJA WEDŁUG KOMPASU</h4>
      <ul>
        <li>Ustaw mapę według północy magnetycznej</li>
        <li>Uwzględnij deklinację magnetyczną</li>
        <li>Używaj tylnej iglicy do celowania</li>
      </ul>

      <h4>2. ORIENTACJA WEDŁUG PUNKTÓW CHARAKTERYSTYCZNYCH</h4>
      <ul>
        <li>Znajdź 2-3 charakterystyczne punkty w terenie</li>
        <li>Zidentyfikuj je na mapie</li>
        <li>Określ swoją pozycję względem nich</li>
      </ul>

      <h4>3. TRIANGULACJA</h4>
      <p><strong>Krok 1:</strong> Wybierz 3 widoczne punkty charakterystyczne</p>
      <p><strong>Krok 2:</strong> Zmierz azymuty do każdego punktu</p>
      <p><strong>Krok 3:</strong> Przerysuj linie na mapę</p>
      <p><strong>Krok 4:</strong> Punkt przecięcia = Twoja pozycja</p>

      <h4>TECHNIKI MARSZU</h4>
      <ul>
        <li><strong>Marsz na azymut:</strong> Podążanie w określonym kierunku</li>
        <li><strong>Attack point:</strong> Łatwy do znalezienia punkt blisko celu</li>
        <li><strong>Handrail:</strong> Liniowy obiekt prowadzący do celu (droga, rzeka)</li>
        <li><strong>Catching feature:</strong> Duży obiekt za celem (bezpieczeństwo)</li>
      </ul>

      <h4>BŁĘDY DO UNIKANIA</h4>
      <ul>
        <li>Nieprawidłowe trzymanie kompasu</li>
        <li>Ignorowanie deklinacji magnetycznej</li>
        <li>Brak potwierdzenia pozycji</li>
        <li>Przechodzenie z kompasu na GPS bez weryfikacji</li>
      </ul>
    `,
    tips: 'Zawsze miej plan B. Jeśli nawigacja elektroniczna zawiedzie, umiejętność czytania mapy i kompasu może uratować życie.'
  },
  {
    id: 8,
    name: 'Ocena terenu taktycznego',
    category: 'Topografia',
    icon: 'terrain',
    color: 'orange',
    content: `
      <h3>OCENA TERENU TAKTYCZNEGO</h3>

      <h4>AKRONIM OCOKA (OAKOC)</h4>

      <h4>O - OBSERWACJA I POLE OGNIA</h4>
      <ul>
        <li>Czy teren zapewnia dobre pole obserwacji?</li>
        <li>Jakie są sektory ostrzału?</li>
        <li>Gdzie są martwe pola?</li>
        <li>Czy przeciwnik może obserwować nasze pozycje?</li>
      </ul>

      <h4>C - COVER I CONCEALMENT (OSŁONY I UKRYCIE)</h4>
      <ul>
        <li><strong>Cover:</strong> Ochrona przed ogniem (beton, ziemia, metal)</li>
        <li><strong>Concealment:</strong> Ukrycie przed obserwacją (krzaki, dym)</li>
        <li>Naturalne osłony vs. sztuczne</li>
        <li>Pozycje zapasowe</li>
      </ul>

      <h4>O - OBSTACLES (PRZESZKODY)</h4>
      <ul>
        <li>Naturalne: rzeki, wąwozy, bagna</li>
        <li>Sztuczne: zasieki, miny, barykady</li>
        <li>Jak wpływają na manewru?</li>
        <li>Można je obejść czy trzeba pokonać?</li>
      </ul>

      <h4>K - KEY TERRAIN (TEREN KLUCZOWY)</h4>
      <ul>
        <li>Punkty decydujące o sukcesie misji</li>
        <li>Wzgórza dominujące</li>
        <li>Węzły komunikacyjne</li>
        <li>Przeprawy przez rzeki</li>
      </ul>

      <h4>A - AVENUES OF APPROACH (KIERUNKI NATARCIA)</h4>
      <ul>
        <li>Trasy umożliwiające przemieszczanie sił</li>
        <li>Główne drogi i ścieżki</li>
        <li>Naturalne korytarze</li>
        <li>Ograniczenia dla pojazdów</li>
      </ul>

      <h4>PRAKTYCZNE ZASTOSOWANIE</h4>
      <ul>
        <li>Zawsze oceniaj teren przed zajęciem pozycji</li>
        <li>Planuj trasy wycofania</li>
        <li>Identyfikuj pozycje alternatywne</li>
        <li>Uwzględniaj warunki pogodowe</li>
      </ul>
    `,
    tips: 'Teren to najważniejszy czynnik taktyczny. Dobra znajomość terenu może zrekompensować przewagę liczebną przeciwnika.'
  },
  {
    id: 9,
    name: 'Systemy współrzędnych',
    category: 'Topografia',
    icon: 'gps_fixed',
    color: 'orange',
    content: `
      <h3>SYSTEMY WSPÓŁRZĘDNYCH</h3>

      <h4>SYSTEM UTM (Universal Transverse Mercator)</h4>
      <p><strong>Zastosowanie:</strong> Podstawowy system dla sił zbrojnych NATO</p>
      <p><strong>Podział:</strong> 60 stref po 6° długości geograficznej</p>
      <p><strong>Polska:</strong> Głównie strefy 33N i 34N</p>

      <h4>FORMAT GRID</h4>
      <p><strong>Pełny format:</strong> 34UEB 12345 67890</p>
      <ul>
        <li>34U = strefa UTM</li>
        <li>EB = oznaczenie 100km kwadratu</li>
        <li>12345 = współrzędna wschodnia (5 cyfr)</li>
        <li>67890 = współrzędna północna (5 cyfr)</li>
      </ul>

      <h4>SKRÓCONE FORMATY</h4>
      <p><strong>6-cyfrowy:</strong> 123678 (dokładność ±100m)</p>
      <p><strong>8-cyfrowy:</strong> 12346789 (dokładność ±10m)</p>
      <p><strong>10-cyfrowy:</strong> 1234567890 (dokładność ±1m)</p>

      <h4>SYSTEM MGRS (Military Grid Reference System)</h4>
      <ul>
        <li>Wojskowa wersja UTM</li>
        <li>Używa liter zamiast liczb dla niektórych oznaczeń</li>
        <li>Standard NATO</li>
      </ul>

      <h4>WSPÓŁRZĘDNE GEOGRAFICZNE</h4>
      <p><strong>Format dziesiętny:</strong> 52.237049, 21.017532</p>
      <p><strong>Format DMS:</strong> 52°14'13.4"N 21°01'03.1"E</p>
      <p><strong>Zastosowanie:</strong> GPS cywilny, mapy internetowe</p>

      <h4>KONWERSJA MIĘDZY SYSTEMAMI</h4>
      <ul>
        <li>GPS → MGRS: Funkcja w większości urządzeń GPS</li>
        <li>Mapy online: Często pokazują różne formaty</li>
        <li>Aplikacje mobilne: GridRef, MGRS Tools</li>
      </ul>

      <h4>PRAKTYCZNE WSKAZÓWKI</h4>
      <ul>
        <li>Zawsze podawaj system współrzędnych</li>
        <li>Sprawdzaj zgodność między urządzeniami</li>
        <li>Używaj map w tym samym systemie</li>
        <li>Weryfikuj współrzędne przed przekazaniem</li>
      </ul>
    `,
    tips: 'W operacjach mieszanych (wojsko + służby cywilne) ustal jeden system współrzędnych dla wszystkich uczestników.'
  }
]

// Computed properties
const sortedTactics = computed(() => {
  if (filteredOptions.value.length > 0) {
    return [...filteredOptions.value].sort((a, b) => a.name.localeCompare(b.name))
  }
  return [...allTactics].sort((a, b) => a.name.localeCompare(b.name))
})

// Methods
const filterTactics = (val, update) => {
  if (val === '') {
    update(() => {
      filteredOptions.value = allTactics
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    filteredOptions.value = allTactics.filter(tactic =>
      tactic.name.toLowerCase().includes(needle) ||
      tactic.category.toLowerCase().includes(needle)
    )
  })
}

const onTacticSelected = (tactic) => {
  selectedTactic.value = tactic
}

const copyToClipboard = () => {
  if (selectedTactic.value) {
    const textContent = selectedTactic.value.content.replace(/<[^>]*>/g, '')
    navigator.clipboard.writeText(`${selectedTactic.value.name}\n\n${textContent}`)
    $q.notify({
      message: 'Skopiowano do schowka',
      color: 'positive',
      icon: 'content_copy'
    })
  }
}

const printTactic = () => {
  if (selectedTactic.value) {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedTactic.value.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1976d2; }
            h3 { color: #424242; margin-top: 24px; }
            h4 { color: #666; margin-top: 16px; }
            ul { margin-left: 20px; }
            p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <h1>${selectedTactic.value.name}</h1>
          <p><strong>Kategoria:</strong> ${selectedTactic.value.category}</p>
          <hr>
          ${selectedTactic.value.content}
          ${selectedTactic.value.tips ? `<hr><h3>Wskazówki praktyczne</h3><p>${selectedTactic.value.tips}</p>` : ''}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }
}

onMounted(() => {
  filteredOptions.value = allTactics
})
</script>

<style scoped>
/* Nowoczesne style dla zawartości taktycznej */

.modern-content-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1f5fe;
}

.content-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 12px 16px;
  border-bottom: 1px solid #dee2e6;
}

.content-modern {
  background: #ffffff;
  padding: 0;
  position: relative;
}

.content-text-wrapper {
  background: linear-gradient(145deg, #fafbfc 0%, #ffffff 100%);
  border: 1px solid #f1f3f4;
  border-radius: 8px;
  margin: 16px;
  position: relative;
  overflow: hidden;
}

.content-text-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1976d2, #42a5f5, #1976d2);
}

.content-text {
  font-family: 'Inter', 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #2c3e50;
  margin: 0;
  padding: 20px;
  font-weight: 400;
  text-rendering: optimizeLegibility;
}

.content-text h3 {
  color: #1976d2;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  border-bottom: 2px solid #e3f2fd;
  padding-bottom: 8px;
}

.content-text h4 {
  color: #424242;
  font-size: 15px;
  font-weight: 500;
  margin: 16px 0 8px 0;
}

.content-text ul {
  margin: 8px 0 16px 20px;
  padding: 0;
}

.content-text li {
  margin: 4px 0;
}

.content-text p {
  margin: 8px 0;
}

.content-text strong {
  color: #1976d2;
  font-weight: 600;
}

.content-footer {
  background: #f8f9fa;
  padding: 8px 16px;
  border-top: 1px solid #dee2e6;
}

/* Hover effect dla całego kontenera */
.modern-content-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsywność */
@media (max-width: 768px) {
  .content-text {
    font-size: 13px;
    padding: 16px;
  }

  .content-text h3 {
    font-size: 16px;
  }

  .content-text h4 {
    font-size: 14px;
  }

  .content-text-wrapper {
    margin: 12px;
  }

  .modern-content-container {
    border-radius: 8px;
  }
}

/* Smooth transitions */
.q-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.q-btn {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
