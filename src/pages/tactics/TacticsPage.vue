<template>
  <q-page class="tactics-page">
    <div class="container q-pa-md">
      <!-- Header -->
      <div class="page-header q-mb-xl">
        <div class="row items-center q-gutter-md">
          <q-icon name="school" size="3rem" color="primary" />
          <div>
            <div class="text-h4 text-weight-bold text-primary">Taktyka i Procedury</div>
            <div class="text-subtitle1 text-grey-7">Materiały szkoleniowe i procedury wojskowe</div>
          </div>
        </div>
      </div>

      <div class="row q-gutter-lg">
        <!-- Panel wyboru -->
        <div class="col-12 col-lg-4">
          <q-card class="selection-card">
            <q-card-section class="card-header">
              <div class="text-h6 text-weight-bold">🎯 Wybór zagadnienia</div>
            </q-card-section>

            <q-card-section>
              <!-- Kategorie -->
              <div class="q-mb-lg">
                <div class="text-subtitle2 q-mb-sm text-weight-medium">📚 Kategorie:</div>
                <div class="categories-grid">
                  <q-chip
                    v-for="category in categories"
                    :key="category.id"
                    :color="selectedCategory?.id === category.id ? 'primary' : 'grey-3'"
                    :text-color="selectedCategory?.id === category.id ? 'white' : 'grey-8'"
                    clickable
                    @click="selectCategory(category)"
                    :icon="category.icon"
                    class="category-chip"
                  >
                    {{ category.name }}
                  </q-chip>
                </div>
              </div>

              <!-- Search -->
              <div class="q-mb-lg">
                <q-input
                  v-model="searchQuery"
                  outlined
                  label="Wyszukaj zagadnienie"
                  clearable
                  @input="filterTactics"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>

              <!-- Lista zagadnień -->
              <div class="tactics-list">
                <q-list bordered separator>
                  <q-item
                    v-for="tactic in filteredTactics"
                    :key="tactic.id"
                    clickable
                    @click="selectTactic(tactic)"
                    :class="selectedTactic?.id === tactic.id ? 'bg-primary text-white' : ''"
                  >
                    <q-item-section avatar>
                      <q-icon :name="tactic.icon" :color="selectedTactic?.id === tactic.id ? 'white' : tactic.color" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">{{ tactic.name }}</q-item-label>
                      <q-item-label caption :class="selectedTactic?.id === tactic.id ? 'text-white' : 'text-grey-6'">
                        {{ tactic.category }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Panel treści -->
        <div class="col-12 col-lg-8">
          <div v-if="!selectedTactic" class="empty-state">
            <q-card class="text-center q-pa-xl">
              <q-icon name="menu_book" size="4rem" color="grey-4" class="q-mb-md" />
              <div class="text-h6 text-grey-6 q-mb-sm">Wybierz zagadnienie</div>
              <div class="text-body2 text-grey-5">Wybierz kategorię i zagadnienie z listy po lewej stronie</div>
            </q-card>
          </div>

          <div v-else class="content-area">
            <q-card class="content-card">
              <q-card-section class="content-header">
                <div class="row items-center justify-between">
                  <div class="row items-center q-gutter-md">
                    <q-icon :name="selectedTactic.icon" size="2rem" color="white" />
                    <div>
                      <div class="text-h5 text-weight-bold">{{ selectedTactic.name }}</div>
                      <div class="text-subtitle2 opacity-80">{{ selectedTactic.category }}</div>
                    </div>
                  </div>
                  <q-chip color="rgba(255,255,255,0.2)" text-color="white" icon="schedule">
                    {{ selectedTactic.readTime || '5 min' }}
                  </q-chip>
                </div>
              </q-card-section>

              <q-card-section class="content-body">
                <div class="content-text" v-html="selectedTactic.content"></div>
              </q-card-section>

              <!-- Actions -->
              <q-card-actions class="q-pa-md">
                <q-btn
                  flat
                  icon="print"
                  label="Drukuj"
                  color="primary"
                  @click="printContent"
                />
                <q-btn
                  flat
                  icon="share"
                  label="Udostępnij"
                  color="primary"
                  @click="shareContent"
                />
                <q-space />
                <q-btn
                  icon="bookmark_border"
                  flat
                  round
                  color="grey-6"
                  @click="toggleBookmark"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineOptions({
  name: 'TacticsPage'
})

const selectedCategory = ref(null)
const selectedTactic = ref(null)
const searchQuery = ref('')

const categories = [
  { id: 'formations', name: 'Formacje', icon: 'group_work', color: 'blue' },
  { id: 'operations', name: 'Operacje', icon: 'military_tech', color: 'red' },
  { id: 'observation', name: 'Obserwacja', icon: 'visibility', color: 'green' }
]

const tactics = [
  // Formacje
  {
    id: 'hak',
    name: 'HAK (Hak)',
    category: 'Formacje',
    icon: 'call_split',
    color: 'blue',
    readTime: '5 min',
    content: `
      <h3>🪝 HAK (Hak)</h3>
      <p><strong>Formacja taktyczna służąca do oskrzydlenia przeciwnika.</strong></p>

      <h4>📐 Charakterystyka:</h4>
      <ul>
        <li>Formacja w kształcie litery "L" lub haka</li>
        <li>Jedna część jednostki atakuje frontalnie</li>
        <li>Druga część oskrzydla przeciwnika z boku</li>
        <li>Pozwala na koncentrację ognia z dwóch kierunków</li>
      </ul>

      <h4>🎯 Zastosowanie:</h4>
      <ul>
        <li>Atak na pozycje obronne przeciwnika</li>
        <li>Oskrzydlenie ugrupowania wroga</li>
        <li>Przełamanie obrony liniowej</li>
        <li>Wykorzystanie słabych punktów w obronie</li>
      </ul>

      <h4>⚡ Wykonanie:</h4>
      <ol>
        <li>Rozpoznanie pozycji przeciwnika</li>
        <li>Podział sił na dwie grupy</li>
        <li>Grupa główna wiąże ogniem frontalnie</li>
        <li>Grupa oskrzydlająca atakuje z boku</li>
        <li>Skoordynowany atak z dwóch kierunków</li>
      </ol>

      <h4>⚠️ Uwagi taktyczne:</h4>
      <ul>
        <li>Wymaga dobrej koordynacji między grupami</li>
        <li>Konieczna łączność radiowa</li>
        <li>Uwaga na własny ogień - identyfikacja celów</li>
        <li>Wykorzystanie osłon terenowych</li>
      </ul>
    `
  },
  {
    id: 'okrezna',
    name: 'Okrężna',
    category: 'Formacje',
    icon: 'rotate_right',
    color: 'blue',
    readTime: '6 min',
    content: `
      <h3>🔄 Okrężna</h3>
      <p><strong>Manewr oskrzydlający polegający na obejściu pozycji przeciwnika.</strong></p>

      <h4>🎯 Cel operacji:</h4>
      <ul>
        <li>Obejście głównych sił obrończych</li>
        <li>Atak na tyły lub skrzydło przeciwnika</li>
        <li>Unikanie najsilniej bronionych pozycji</li>
        <li>Wprowadzenie zamętu w szeregach wroga</li>
      </ul>

      <h4>📋 Fazy wykonania:</h4>
      <ol>
        <li><strong>Rozpoznanie:</strong> Identyfikacja słabych punktów obrony</li>
        <li><strong>Demonstracja:</strong> Pozorowany atak frontalny dla odwrócenia uwagi</li>
        <li><strong>Manewrowanie:</strong> Skryty ruch okrężny głównych sił</li>
        <li><strong>Atak:</strong> Uderzenie z nieoczekiwanego kierunku</li>
        <li><strong>Wykorzystanie sukcesu:</strong> Rozwinięcie przewagi</li>
      </ol>

      <h4>🗺️ Wymagania terenowe:</h4>
      <ul>
        <li>Dostępność dróg obejścia</li>
        <li>Możliwość ukrycia ruchu wojsk</li>
        <li>Teren umożliwiający szybki marsz</li>
        <li>Punkty orientacyjne dla nawigacji</li>
      </ul>

      <h4>⏰ Czynniki czasowe:</h4>
      <ul>
        <li>Szybkość wykonania manewru</li>
        <li>Synchronizacja z atakiem demonstracyjnym</li>
        <li>Wykorzystanie pory dnia/nocy</li>
        <li>Warunki atmosferyczne</li>
      </ul>
    `
  },
  {
    id: 'sierzant',
    name: 'Sierżant',
    category: 'Formacje',
    icon: 'format_align_center',
    color: 'blue',
    readTime: '4 min',
    content: `
      <h3>📐 Sierżant</h3>
      <p><strong>Formacja drużyny w kształcie litery "I" - linia prosta.</strong></p>

      <h4>🏗️ Struktura formacji:</h4>
      <ul>
        <li>Wszyscy żołnierze ustawieni w jednej linii</li>
        <li>Równe odstępy między żołnierzami</li>
        <li>Dowódca w centrum lub na skrzydle</li>
        <li>Maksymalna koncentracja ognia do przodu</li>
      </ul>

      <h4>✅ Zalety:</h4>
      <ul>
        <li>Największa siła ognia w kierunku przeciwnika</li>
        <li>Prosta kontrola i dowodzenie</li>
        <li>Łatwa koordynacja działań</li>
        <li>Skuteczna w obronie pozycji</li>
      </ul>

      <h4>❌ Wady:</h4>
      <ul>
        <li>Podatność na ostrzał boczny</li>
        <li>Brak ochrony skrzydeł</li>
        <li>Duża powierzchnia celu dla przeciwnika</li>
        <li>Trudność w manewrowaniu</li>
      </ul>

      <h4>🎯 Zastosowanie:</h4>
      <ul>
        <li>Obrona umocnionej pozycji</li>
        <li>Atak czołowy na szerokim froncie</li>
        <li>Przekraczanie przeszkód liniowych</li>
        <li>Działania w otwartym terenie</li>
      </ul>

      <h4>📏 Odstępy:</h4>
      <ul>
        <li><strong>W lesie:</strong> 5-10 metrów</li>
        <li><strong>Na otwartym terenie:</strong> 10-20 metrów</li>
        <li><strong>Pod ogniem:</strong> Maksymalne rozprzestrzenienie</li>
      </ul>
    `
  },
  {
    id: 'podwojny-sierzant',
    name: 'Podwójny Sierżant',
    category: 'Formacje',
    icon: 'view_headline',
    color: 'blue',
    readTime: '5 min',
    content: `
      <h3>📐📐 Podwójny Sierżant</h3>
      <p><strong>Formacja składająca się z dwóch linii żołnierzy ustawionych jedna za drugą.</strong></p>

      <h4>🏗️ Struktura formacji:</h4>
      <ul>
        <li>Pierwsza linia - główna siła ognia</li>
        <li>Druga linia - wsparcie i rezerwa</li>
        <li>Żołnierze drugiej linii w lukach pierwszej</li>
        <li>Odległość między liniami 20-50 metrów</li>
      </ul>

      <h4>⚡ Funkcje linii:</h4>
      <ul>
        <li><strong>Pierwsza linia:</strong>
          <ul>
            <li>Główny ogień bojowy</li>
            <li>Pierwsze uderzenie</li>
            <li>Rozpoznanie bojem</li>
          </ul>
        </li>
        <li><strong>Druga linia:</strong>
          <ul>
            <li>Wsparcie ogniowe</li>
            <li>Uzupełnienie strat</li>
            <li>Wykorzystanie sukcesu</li>
            <li>Ochrona odwrotu</li>
          </ul>
        </li>
      </ul>

      <h4>✅ Zalety:</h4>
      <ul>
        <li>Głębia ugrupowania bojowego</li>
        <li>Możliwość rotacji żołnierzy</li>
        <li>Lepsze wykorzystanie terenu</li>
        <li>Zwiększona przeżywalność</li>
        <li>Elastyczność w dowodzeniu</li>
      </ul>

      <h4>🎯 Zastosowanie taktyczne:</h4>
      <ul>
        <li>Atak na ufortyfikowane pozycje</li>
        <li>Działania w terenie zalesionym</li>
        <li>Długotrwałe operacje bojowe</li>
        <li>Sytuacje wymagające rezerwy</li>
      </ul>

      <h4>🔄 Dynamika walki:</h4>
      <ol>
        <li>Pierwsza linia nawiązuje kontakt</li>
        <li>Druga linia obserwuje i wspiera</li>
        <li>W razie potrzeby - wymiana linii</li>
        <li>Skoordynowane działanie obu linii</li>
      </ol>
    `
  },
  {
    id: 'walijczyk',
    name: 'Walijczyk',
    category: 'Formacje',
    icon: 'call_merge',
    color: 'blue',
    readTime: '5 min',
    content: `
      <h3>🔺 Walijczyk</h3>
      <p><strong>Formacja w kształcie klina służąca do przełamywania obrony przeciwnika.</strong></p>

      <h4>🏗️ Struktura klina:</h4>
      <ul>
        <li>Wierzchołek - najlepsi żołnierze i dowódca</li>
        <li>Skrzydła - siły główne</li>
        <li>Podstawa - wsparcie i rezerwa</li>
        <li>Koncentracja siły w punkcie uderzenia</li>
      </ul>

      <h4>⚡ Mechanizm działania:</h4>
      <ol>
        <li>Wierzchołek klina przełamuje obronę</li>
        <li>Skrzydła poszerzają wyłom</li>
        <li>Podstawa wykorzystuje sukces</li>
        <li>Całość rozwija przewagę w głąb</li>
      </ol>

      <h4>✅ Zalety taktyczne:</h4>
      <ul>
        <li>Koncentracja siły w punkcie głównego wysiłku</li>
        <li>Przełamywanie obrony liniowej</li>
        <li>Penetracja w głąb ugrupowania wroga</li>
        <li>Wykorzystanie zasady zaskoczenia</li>
        <li>Demoralizacja obrońców</li>
      </ul>

      <h4>🎯 Warunki skuteczności:</h4>
      <ul>
        <li>Precyzyjne rozpoznanie słabego punktu obrony</li>
        <li>Odpowiednia przewaga sił w punkcie uderzenia</li>
        <li>Element zaskoczenia</li>
        <li>Dobra koordynacja między elementami klina</li>
        <li>Szybkość wykonania</li>
      </ul>

      <h4>⚠️ Ryzyko i przeciwdziałanie:</h4>
      <ul>
        <li>Narażenie na ostrzał z boków</li>
        <li>Możliwość okrążenia przez przeciwnika</li>
        <li>Rozciągnięcie linii zaopatrzenia</li>
        <li>Konieczność ochrony skrzydeł</li>
      </ul>

      <h4>📏 Odstępy i proporcje:</h4>
      <ul>
        <li>Wierzchołek: 1/4 sił</li>
        <li>Skrzydła: po 1/3 sił</li>
        <li>Kąt klina: 60-90 stopni</li>
      </ul>
    `
  },
  // Obserwacja
  {
    id: 'punkt-obserwacyjny',
    name: 'Punkt Obserwacyjny (PO)',
    category: 'Obserwacja',
    icon: 'visibility',
    color: 'green',
    readTime: '8 min',
    content: `
      <h3>👁️ Punkt Obserwacyjny (PO)</h3>
      <p><strong>Stanowisko przeznaczone do obserwacji i rozpoznania terenu oraz przeciwnika.</strong></p>

      <h4>🎯 Funkcje PO:</h4>
      <ul>
        <li>Obserwacja ruchu przeciwnika</li>
        <li>Przekazywanie informacji o zagrożeniach</li>
        <li>Korekta ognia artylerii</li>
        <li>Wczesne ostrzeganie przed atakiem</li>
        <li>Kontrola obszaru odpowiedzialności</li>
      </ul>

      <h4>📍 Wybór lokalizacji:</h4>
      <ul>
        <li><strong>Wysokość względna:</strong> Dominacja nad terenem</li>
        <li><strong>Pole obserwacji:</strong> Szeroki kąt widzenia</li>
        <li><strong>Ukrycie:</strong> Ochrona przed wykryciem</li>
        <li><strong>Łączność:</strong> Możliwość komunikacji</li>
        <li><strong>Dostępność:</strong> Bezpieczne dotarcie</li>
        <li><strong>Drogi odwrotu:</strong> Alternatywne trasy ewakuacji</li>
      </ul>

      <h4>🏗️ Organizacja stanowiska:</h4>
      <ul>
        <li><strong>Stanowisko główne:</strong> Miejsce obserwacji</li>
        <li><strong>Stanowisko zapasowe:</strong> Alternatywna pozycja</li>
        <li><strong>Ukrycie sprzętu:</strong> Ochrona wyposażenia</li>
        <li><strong>System alarmowy:</strong> Szybka łączność</li>
        <li><strong>Zapasy:</strong> Żywność, woda, amunicja</li>
      </ul>

      <h4>🔭 Wyposażenie PO:</h4>
      <ul>
        <li>Lornetka lub luneta obserwacyjna</li>
        <li>Środki łączności (radio, telefon)</li>
        <li>Mapa z naniesionymi punktami orientacyjnymi</li>
        <li>Kompas i dalmierz</li>
        <li>Noktowizja lub przyrządy noktowizyjne</li>
        <li>Dziennik obserwacji</li>
        <li>Karabin wyborowy lub karabin automatyczny</li>
      </ul>

      <h4>📝 Procedury obserwacji:</h4>
      <ol>
        <li><strong>Systematyczne skanowanie:</strong> Podział terenu na sektory</li>
        <li><strong>Identyfikacja celów:</strong> Klasyfikacja i ocena zagrożenia</li>
        <li><strong>Dokumentowanie:</strong> Zapisywanie obserwacji</li>
        <li><strong>Przekazywanie informacji:</strong> Natychmiastowe raportowanie</li>
        <li><strong>Śledzenie celów:</strong> Monitorowanie ruchu</li>
      </ol>

      <h4>📊 Format meldonku z PO:</h4>
      <ul>
        <li><strong>GDZIE:</strong> Lokalizacja obserwowanego obiektu</li>
        <li><strong>CO:</strong> Opis obserwowanego celu</li>
        <li><strong>KIEDY:</strong> Czas obserwacji</li>
        <li><strong>DZIAŁANIE:</strong> Co obiekt robi</li>
        <li><strong>SIŁA:</strong> Liczebność i uzbrojenie</li>
      </ul>

      <h4>⚠️ Bezpieczeństwo PO:</h4>
      <ul>
        <li>Zachowanie dyscypliny świetlnej</li>
        <li>Minimalizowanie ruchu</li>
        <li>Maskowanie stanowiska</li>
        <li>Zmiana pozycji po wykryciu</li>
        <li>Plan ewakuacji</li>
      </ul>
    `
  },
  // Operacje
  {
    id: 'zasadzka',
    name: 'Zasadzka',
    category: 'Operacje',
    icon: 'forest',
    color: 'red',
    readTime: '10 min',
    content: `
      <h3>🪤 Zasadzka</h3>
      <p><strong>Atak z ukrycia na poruszającego się przeciwnika w celu jego zniszczenia lub schwytania.</strong></p>

      <h4>🎯 Cele zasadzki:</h4>
      <ul>
        <li>Zniszczenie lub schwytanie przeciwnika</li>
        <li>Zdobycie dokumentów, wyposażenia, jeńców</li>
        <li>Dezorganizacja ruchu wroga</li>
        <li>Wywołanie zamętu i paniki</li>
        <li>Osłabienie morale przeciwnika</li>
      </ul>

      <h4>📍 Wybór miejsca zasadzki:</h4>
      <ul>
        <li><strong>Punkt kontrolny:</strong> Miejsce, którym przeciwnik musi przejść</li>
        <li><strong>Ograniczenie manewru:</strong> Wąskie przejścia, mosty, serpentyny</li>
        <li><strong>Osłony naturalne:</strong> Lasy, zarośla, nierówności terenu</li>
        <li><strong>Pole rażenia:</strong> Dobra widoczność na strefę zabójczą</li>
        <li><strong>Drogi odwrotu:</strong> Bezpieczne trasy ewakuacji</li>
        <li><strong>Teren niejednolity:</strong> Utrudniający organizację obrony</li>
      </ul>

      <h4>🏗️ Elementy zasadzki:</h4>
      <ul>
        <li><strong>Strefa zabójcza:</strong> Obszar głównego ostrzału</li>
        <li><strong>Stanowiska ogniowe:</strong> Pozycje strzelców</li>
        <li><strong>Grupa wsparcia:</strong> Ciężkie uzbrojenie</li>
        <li><strong>Grupa zabezpieczenia:</strong> Ochrona skrzydeł i tyłów</li>
        <li><strong>Grupa szturmowa:</strong> Likwidacja ocalałych</li>
        <li><strong>Posterunek obserwacyjny:</strong> Ostrzeganie o zbliżaniu się celu</li>
      </ul>

      <h4>⏱️ Fazy wykonania zasadzki:</h4>
      <ol>
        <li><strong>Przygotowanie:</strong>
          <ul>
            <li>Rozpoznanie trasy przeciwnika</li>
            <li>Wybór miejsca zasadzki</li>
            <li>Zajęcie pozycji</li>
            <li>Maskowanie stanowisk</li>
            <li>Sprawdzenie łączności</li>
          </ul>
        </li>
        <li><strong>Oczekiwanie:</strong>
          <ul>
            <li>Obserwacja zbliżającego się przeciwnika</li>
            <li>Potwierdzenie tożsamości celu</li>
            <li>Przygotowanie do ataku</li>
          </ul>
        </li>
        <li><strong>Atak:</strong>
          <ul>
            <li>Rozpoczęcie ognia na sygnał</li>
            <li>Koncentracja na priorytetowych celach</li>
            <li>Blokowanie dróg ucieczki</li>
          </ul>
        </li>
        <li><strong>Szturm:</strong>
          <ul>
            <li>Likwidacja ocalałych</li>
            <li>Przeszukanie trupów i pojazdów</li>
            <li>Zdobycie materiałów</li>
          </ul>
        </li>
        <li><strong>Odwrót:</strong>
          <ul>
            <li>Szybka ewakuacja z miejsca zasadzki</li>
            <li>Rozproszenie na umówione punkty zbornych</li>
          </ul>
        </li>
      </ol>

      <h4>🎯 Priorytet celów:</h4>
      <ol>
        <li>Dowódcy i oficerowie</li>
        <li>Łącznościowcy</li>
        <li>Operatorzy ciężkiej broni</li>
        <li>Pojazdy i sprzęt</li>
        <li>Pozostali żołnierze</li>
      </ol>

      <h4>🕒 Czas trwania:</h4>
      <ul>
        <li><strong>Idealny czas:</strong> 3-5 minut maksymalnie</li>
        <li><strong>Szybkie uderzenie:</strong> Im krócej, tym lepiej</li>
        <li><strong>Unikanie przedłużonych walk</strong></li>
        <li><strong>Ewakuacja przed przybyciem posiłków</strong></li>
      </ul>

      <h4>⚠️ Bezpieczeństwo własnych sił:</h4>
      <ul>
        <li>Jasny podział sektorów ostrzału</li>
        <li>Identyfikacja własnych żołnierzy</li>
        <li>Sygnały rozpoznawcze</li>
        <li>Plan działania w przypadku niepowodzenia</li>
        <li>Ewakuacja rannych</li>
      </ul>
    `
  },
  {
    id: 'marsz-ubezpieczony',
    name: 'Marsz Ubezpieczony',
    category: 'Operacje',
    icon: 'security',
    color: 'red',
    readTime: '9 min',
    content: `
      <h3>🛡️ Marsz Ubezpieczony</h3>
      <p><strong>Przemieszczanie się jednostki z zachowaniem pełnej gotowości bojowej i ochrony przed atakiem przeciwnika.</strong></p>

      <h4>🎯 Cele marszu ubezpieczonego:</h4>
      <ul>
        <li>Bezpieczne przemieszczenie jednostki</li>
        <li>Zachowanie gotowości bojowej w ruchu</li>
        <li>Wczesne wykrycie zagrożeń</li>
        <li>Ochrona przed zasadzkami</li>
        <li>Utrzymanie zwartości ugrupowania</li>
      </ul>

      <h4>🏗️ Elementy ubezpieczenia:</h4>
      <ul>
        <li><strong>Czołówka:</strong>
          <ul>
            <li>Rozpoznanie trasy marszu</li>
            <li>Wykrywanie zasadzek i przeszkód</li>
            <li>Zabezpieczenie punktów przejścia</li>
            <li>Odległość: 200-1000m przed głównym ugrupowaniem</li>
          </ul>
        </li>
        <li><strong>Boczne ubezpieczenie:</strong>
          <ul>
            <li>Ochrona skrzydeł kolumny</li>
            <li>Obserwacja terenu przyległego</li>
            <li>Blokowanie dróg dojazdowych</li>
            <li>Odległość: 100-500m od osi marszu</li>
          </ul>
        </li>
        <li><strong>Tylna straż:</strong>
          <ul>
            <li>Ochrona przed atakiem z tyłu</li>
            <li>Kontrola opuszczanego terenu</li>
            <li>Ewakuacja pozostawionych elementów</li>
            <li>Odległość: 200-500m za głównym ugrupowaniem</li>
          </ul>
        </li>
      </ul>

      <h4>📋 Organizacja kolumny marszowej:</h4>
      <ol>
        <li><strong>Czołówka:</strong> Grupa rozpoznawcza (10-20% sił)</li>
        <li><strong>Główne ugrupowanie:</strong>
          <ul>
            <li>Dowództwo</li>
            <li>Siły główne</li>
            <li>Wsparcie logistyczne</li>
          </ul>
        </li>
        <li><strong>Tylna straż:</strong> Grupa ochronna (10-15% sił)</li>
      </ol>

      <h4>📏 Odstępy i prędkości:</h4>
      <ul>
        <li><strong>Odstępy między pojazdami:</strong> 25-100m (w zależności od zagrożenia)</li>
        <li><strong>Prędkość marszu:</strong> 25-40 km/h (dostosowana do najwolniejszego pojazdu)</li>
        <li><strong>Postoje:</strong> Co 2-3 godziny na 15-20 minut</li>
        <li><strong>Długość kolumny:</strong> Maksymalnie 5-10 km</li>
      </ul>

      <h4>🗺️ Planowanie trasy:</h4>
      <ul>
        <li>Wybór głównej trasy i tras zapasowych</li>
        <li>Identyfikacja punktów niebezpiecznych</li>
        <li>Wyznaczenie punktów kontrolnych</li>
        <li>Planowanie miejsc postoju</li>
        <li>Koordynacja z innymi jednostkami</li>
      </ul>

      <h4>📻 Łączność:</h4>
      <ul>
        <li><strong>Sieć dowódcza:</strong> Łączność między dowódcami grup</li>
        <li><strong>Sieć ostrzegawcza:</strong> Szybkie przekazywanie alarmów</li>
        <li><strong>Sygnały ręczne:</strong> Backup dla łączności radiowej</li>
        <li><strong>Procedury łączności:</strong> Określone czasy i częstotliwości</li>
      </ul>

      <h4>⚡ Reakcja na kontakt z przeciwnikiem:</h4>
      <ul>
        <li><strong>Natychmiastowe alarmowanie:</strong> Wszystkie elementy informowane</li>
        <li><strong>Rozwinięcie bojowe:</strong> Przejście z marszu do walki</li>
        <li><strong>Wsparcie ogniowe:</strong> Koncentracja siły na zagrożeniu</li>
        <li><strong>Manewrowanie:</strong> Oskrzydlenie lub przełamanie</li>
        <li><strong>Ewakuacja:</strong> W przypadku przewagi przeciwnika</li>
      </ul>

      <h4>🌙 Marsz nocny:</h4>
      <ul>
        <li>Zwiększone odstępy</li>
        <li>Ograniczone użycie świateł</li>
        <li>Wzmocnione ubezpieczenie</li>
        <li>Dodatkowe środki łączności</li>
        <li>Punkty orientacyjne</li>
      </ul>

      <h4>⚠️ Zasady bezpieczeństwa:</h4>
      <ul>
        <li>Nieregularne zmiany prędkości i tras</li>
        <li>Unikanie przewidywalności</li>
        <li>Wykorzystanie osłon terenowych</li>
        <li>Maskowanie ruchu</li>
        <li>Gotowość do natychmiastowej walki</li>
      </ul>
    `
  }
]

const filteredTactics = ref([])

const filterTactics = () => {
  let filtered = tactics

  if (selectedCategory.value) {
    filtered = filtered.filter(t => t.category === selectedCategory.value.name)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    )
  }

  filteredTactics.value = filtered
}

const selectCategory = (category) => {
  selectedCategory.value = selectedCategory.value?.id === category.id ? null : category
  filterTactics()
}

const selectTactic = (tactic) => {
  selectedTactic.value = tactic
}

const printContent = () => {
  window.print()
}

const shareContent = () => {
  if (navigator.share && selectedTactic.value) {
    navigator.share({
      title: selectedTactic.value.name,
      text: `Materiał szkoleniowy: ${selectedTactic.value.name}`,
      url: window.location.href
    })
  }
}

const toggleBookmark = () => {
  // Implement bookmark functionality
  console.log('Bookmark toggled for:', selectedTactic.value?.name)
}

onMounted(() => {
  filterTactics()
})
</script>

<style scoped>
.tactics-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(25, 118, 210, 0.1);
}

.selection-card,
.content-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.card-header {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  border-radius: 16px 16px 0 0;
  margin: -16px -16px 16px -16px;
  padding: 16px;
}

.content-header {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  border-radius: 16px 16px 0 0;
  margin: -16px -16px 0 -16px;
  padding: 24px;
}

.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-chip {
  font-size: 0.9rem;
  font-weight: 500;
}

.tactics-list {
  max-height: 400px;
  overflow-y: auto;
}

.empty-state {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-body {
  max-height: 600px;
  overflow-y: auto;
}

.content-text {
  line-height: 1.6;
  font-size: 1rem;
}

.content-text h3 {
  color: #1976d2;
  margin-bottom: 1rem;
  font-weight: bold;
}

.content-text h4 {
  color: #424242;
  margin: 1.5rem 0 0.5rem 0;
  font-weight: 600;
}

.content-text ul, .content-text ol {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.content-text li {
  margin-bottom: 0.25rem;
}

.content-text strong {
  color: #1976d2;
  font-weight: 600;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .row {
    flex-direction: column;
  }

  .col-lg-4,
  .col-lg-8 {
    width: 100%;
  }

  .tactics-list {
    max-height: 300px;
  }
}

@media (max-width: 768px) {
  .categories-grid {
    flex-direction: column;
  }

  .category-chip {
    justify-content: flex-start;
  }

  .content-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .page-header .row {
    flex-direction: column;
    text-align: center;
  }

  .content-header .row {
    flex-direction: column;
    gap: 8px;
  }

  .content-body {
    max-height: 500px;
  }
}
</style>
