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
    name: 'HAK',
    category: 'Operacje',
    icon: 'route',
    color: 'red',
    readTime: '7 min',
    content: `
      <h3>🪝 HAK</h3>
      <p><strong>Procedura antyśledzeniowa wykonywana podczas marszu w celu sprawdzenia czy sekcja nie jest śledzona.</strong></p>

      <h4>🎯 Cel procedury:</h4>
      <ul>
        <li>Sprawdzenie czy sekcja nie jest śledzona przez przeciwnika</li>
        <li>Wykrycie ewentualnego śledzącego</li>
        <li>Zapewnienie bezpieczeństwa podczas marszu</li>
        <li>Możliwość likwidacji śledzącego</li>
      </ul>

      <h4>⚡ Wykonanie procedury:</h4>
      <ol>
        <li><strong>Sygnał dowódcy:</strong> Prowadzący sygnalizuje "HAK"</li>
        <li><strong>Zejście z trasy:</strong> Sekcja schodzi z kierunku marszu w lewo lub prawo</li>
        <li><strong>Oddalenie:</strong> Odchodzi na maksymalną odległość zachowując obserwację miejsca zejścia</li>
        <li><strong>Ruch równoległy:</strong> Zmienia kierunek poruszając się równolegle do pierwotnej trasy w kierunku przeciwnym</li>
        <li><strong>Zawrócenie:</strong> Zawraca o 180° i porusza się równolegle do pierwotnej trasy</li>
        <li><strong>Pozycja końcowa:</strong> Zatrzymuje się na wysokości punktu zejścia z trasy</li>
        <li><strong>Obserwacja:</strong> Ubezpiecza 360° i obserwuje pierwotną trasę marszu</li>
      </ol>

      <h4>👥 Rozmieszczenie żołnierzy podczas obserwacji:</h4>
      <ul>
        <li><strong>Nr 1:</strong> Obserwacja w kierunku marszu</li>
        <li><strong>Nr 2 i 11:</strong> Obserwacja sektora tylnego</li>
        <li><strong>Nr 3-10:</strong> Obserwacja pierwotnej drogi (główne zagrożenie)</li>
        <li><strong>Nr 12:</strong> Obserwacja sektora od strony wejścia w HAK</li>
      </ul>

      <h4>📊 Schemat procedury HAK:</h4>
      <div style="font-family: monospace; background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 16px 0; overflow-x: auto;">
        <pre style="margin: 0; font-size: 12px; line-height: 1.4;">
    ▲                                    ▲     Minimalny dystans,
    │                                    │     tylko do odwrócenia
╭─── 2 ────╮                     ╭──── 11 ────╮    o 180°
│     ▲    │                     │      ▲     │        ╱
╰─────│────╯                     ╰──────│─────╯       ╱
      │                                 │            ╱
╭─ 1 ─┼─ 3 ─ 4 ─ 5 ─ 6 ─ 7 ─ 8 ─ 9 ─ 10 ─ 12 ────╱────────╮
      ▼    ▼   ▼   ▼   ▼   ▼   ▼   ▼    ▼    ▼              │
                                                             │
   ◎─◎                                                      ▲
   2  1 ═══════════════════════════════════════════════════ │
                                                             │
     ◎                                                      │
     3                                                      │ Dystans
                                                            │ zapewniający
     ◎                                                      │ skrytą
     4                                                      │ obserwację
     │                                                      │ drogi
     ▼                                                      │
═════════════════════════════════════════════════════════════▼═══
◄── ◎ ◎ ◎ ◎ ◎ ◎ ◎ ◎ ────                        PIERWOTNA
    5 6 7 8 9 10 11 12                           TRASA MARSZU
                                                     ▼
     ◄═══ ═══ ═══ ═══ ═══
        KIERUNEK MARSZU
        </pre>
      </div>

      <h4>🗺️ Legenda schematu:</h4>
      <ul>
        <li><strong>◎</strong> - Pozycje żołnierzy podczas obserwacji</li>
        <li><strong>▲ ▼</strong> - Kierunki obserwacji</li>
        <li><strong>═══</strong> - Pierwotna trasa marszu</li>
        <li><strong>╭───╮</strong> - Sektory obserwacji żołnierzy 2 i 11</li>
        <li><strong>◄───</strong> - Kierunek pierwotnego marszu</li>
      </ul>

      <h4>🔍 Zasady wykonania:</h4>
      <ul>
        <li>Większość środków ogniowych skierowana na pierwotną trasę marszu</li>
        <li>Czas obserwacji reguluje dowódca</li>
        <li>Dystans zapewniający skrytą obserwację drogi</li>
        <li>Możliwość oddziaływania ogniowego na miejsce zejścia</li>
      </ul>

      <h4>📅 Częstotliwość wykonania:</h4>
      <ul>
        <li>Według doraźnych potrzeb</li>
        <li>Planowo co pewien czas</li>
        <li>Co określony odcinek marszu</li>
        <li>W miejscach szczególnie niebezpiecznych</li>
      </ul>

      <h4>✅ Po zakończeniu obserwacji:</h4>
      <ul>
        <li>Jeśli nie wykryto śledzącego - kontynuacja działań</li>
        <li>Możliwość poprawy oporządzenia</li>
        <li>Przejście do zajmowania rejonu bazy</li>
        <li>Realizacja zaplanowanych działań</li>
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
      <p><strong>Formacja taktyczna złożona z dwóch sierżantów: "ALFA" (pierwszy) i "BRAWO" (drugi).</strong></p>

      <h4>🎯 Zasady rozstawienia:</h4>
      <ul>
        <li>Odległości między żołnierzami określa dowódca według terenu</li>
        <li>Każdy żołnierz musi mieć możliwość ognia w przód, tył, lewo i prawo</li>
        <li>Ogień "przez szyk" - bez blokowania innych żołnierzy</li>
        <li>Sprawdzenie: tarcza na 100m - wszyscy muszą mieć czyste pole ostrzału</li>
      </ul>

      <h4>🔍 Test prawidłowości rozstawienia:</h4>
      <ol>
        <li>Ustawić tarczę/figurę bojową na kierunku marszu (ok. 100m)</li>
        <li>Nakazać żołnierzom wycelowanie do celu</li>
        <li>Sprawdzić czy żaden żołnierz nie blokuje pola ostrzału</li>
        <li>Poprawić pozycje jeśli konieczne</li>
      </ol>

      <h4>🅰️ SIERŻANT "ALFA" (pierwszy):</h4>
      <div style="font-family: monospace; background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
        <pre style="margin: 0; font-size: 11px; line-height: 1.3;">
        ↑   ↑   ↑   ↑   ↑   ↑
        │   │   │   │   │   │
    ←───┼───┼───┼───┼───┼───┼───→
        │   │   │   │   │   │
        ↓   ↓   ↓   ↓   ↓   ↓

            ◎
            1

    ◎           ◎
    4           2

◎           ◎       ◎
5           3       6

        SIERŻANT "ALFA"

Legenda:
◎ 1 - ZD (Zastępca Dowódcy)
◎ 2 - Medyk
◎ 3 - St. Saper
◎ 4 - R2 (Radiotelefonista)
◎ 5 - Strzelec UKM
◎ 6 - Nawigator (St. Strz. Wyb.)
        </pre>
      </div>

      <h4>📊 Warianty ustawienia sekcji 12-osobowej:</h4>

      <h5>📍 WARIANT I - Dowódca z "BRAWO" na prawym skrzydle:</h5>
      <div style="font-family: monospace; background: #f5f5dc; padding: 15px; border-radius: 8px; margin: 10px 0;">
        <pre style="margin: 0; font-size: 10px; line-height: 1.2;">
                ◎
                1
    ◎       ◎           ↑
    4       2           │
                        │
◎       ◎       ◎       │ KIERUNEK
5       3       6       │ MARSZU
                        │
┌─────────────────┐     │
│   "ALFA"        │     │
└─────────────────┘     │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│┄┄┄┄┄┄┄
┌─────────────────┐     │
│                 │     │
│              ◎  │     │
│              7  │     │
│                 │     │
│          ◎   ◎  │     │
│          8   10 │     │
│                 │     │
│      ◎       ◎  │ ↑   │
│      9      11  │ │   │
│                 │ │   │
│  ┌────┐     ◎   │ │   │
│  │(-) │    12   │ │   │
│  │BRAWO│         │ │   │
│  └────┘         │     │
└─────────────────┘     │
        </pre>
      </div>

      <h5>📍 WARIANT II - Dowódca z "BRAWO" na lewym skrzydle:</h5>
      <div style="font-family: monospace; background: #f0fff0; padding: 15px; border-radius: 8px; margin: 10px 0;">
        <pre style="margin: 0; font-size: 10px; line-height: 1.2;">
            ↑
            │ KIERUNEK
            │ MARSZU
            │
    ◎   ◎   │   ◎   ◎
    1   4   │   2   5
            │
        ◎   │       ◎
        3   │       6
            │
    ┌─────────┐ │ ┌──────────┐
    │ "ALFA"  │ │ │          │
    └─────────┘ │ └──────────┘
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
                │
◎               │
7               │
                │
    ◎           │
    10          │
                │
        ◎       │
        8       │ ↑
                │ │
            ◎   │ │
            9   │ │
                │
    ┌────┐      │
    │(-) │      │
    │BRAWO│     │
    └────┘      │
        </pre>
      </div>

      <h4>👥 Skład sierżanta "ALFA":</h4>
      <ul>
        <li><strong>Pozycja 1:</strong> Zastępca Dowódcy Sekcji (ZD)</li>
        <li><strong>Pozycja 2:</strong> Medyk</li>
        <li><strong>Pozycja 3:</strong> Starszy saper</li>
        <li><strong>Pozycja 4:</strong> Radiotelefonista (R2) - przy ZD</li>
        <li><strong>Pozycja 5:</strong> Strzelec UKM</li>
        <li><strong>Pozycja 6:</strong> Nawigator (St. strzelec wyborowy)</li>
      </ul>

      <h4>🎯 Funkcje kluczowe w "ALFA":</h4>
      <ul>
        <li><strong>ZD:</strong> Dowodzenie pierwszą linią, większe ryzyko kontaktu</li>
        <li><strong>R2:</strong> Stały kontakt z ZD, łączność w sierżancie</li>
        <li><strong>Strzelec UKM:</strong> Likwidacja środków ogniowych przeciwnika (1. granatnik, 2. km, 3. strzelcy)</li>
        <li><strong>Nawigator:</strong> Znajomość terenu, mapa, busola, GPS</li>
        <li><strong>Medyk:</strong> Pierwsza pomoc w kontakcie</li>
      </ul>

      <h4>🅱️ SIERŻANT "BRAWO" (drugi):</h4>
      <ul>
        <li><strong>Dowódca (D)</strong> z radiotelefonistą (R1)</li>
        <li><strong>R1:</strong> Ciągłość komunikacji we wszystkich kierunkach</li>
        <li><strong>Łączność z:</strong> Sztab, siły powietrzne, sprzymierzeni, inne elementy</li>
        <li><strong>Wszyscy żołnierze:</strong> Odpowiedzialni za swoje sektory obserwacji</li>
      </ul>

      <h4>📋 Wybór wariantu ustawienia:</h4>
      <ul>
        <li><strong>WARIANT I:</strong> Dowódca na prawym skrzydle - gdy przeciwnik spodziewany z lewej</li>
        <li><strong>WARIANT II:</strong> Dowódca na lewym skrzydle - gdy sytuacja taktyczna tego wymaga</li>
        <li><strong>Sektory boczne:</strong> Dystanse określane przez warunki terenu</li>
        <li><strong>Sektory prowadzenia ognia:</strong> Przód, tył, lewo, prawo dla każdego żołnierza</li>
      </ul>

      <h4>🎯 Zasady rozmieszczenia w wariantach:</h4>
      <ul>
        <li>Żołnierz idący na szczyt "BRAWO" dobiera kierunek marszu</li>
        <li>Pozostali żołnierze z jego podsekcji mieli otwarte sektory prowadzenia ognia</li>
        <li>Situacja taktyczna i teren determinują dystanse "boczne" i "odległościowe"</li>
        <li>Między "ALFA" i "BRAWO" linia podziału (pokazana punktami)</li>
      </ul>

      <h4>⚡ Zasady w kontakcie ogniowym:</h4>
      <ul>
        <li><strong>R2 przy ZD:</strong> Nie rozdzielać podczas "wchodzenia" w szyk</li>
        <li><strong>R1 przy D:</strong> Stały kontakt, natychmiastowe meldowanie</li>
        <li><strong>Przemieszczanie:</strong> Na komendy Dowódcy (D)</li>
        <li><strong>Priorytet UKM:</strong> Środki ogniowe przeciwnika według zagrożenia</li>
      </ul>

      <h4>🧭 Wymagania specjalistyczne:</h4>
      <ul>
        <li><strong>Szperacz/Nawigator:</strong> Wyczucie terenu, wyobraźnia przestrzenna, spostrzegawczość</li>
        <li><strong>Nawigator:</strong> Doskonała znajomość map, busoli, GPS</li>
        <li><strong>R1/R2:</strong> Bezpośrednia bliskość dowódców</li>
        <li><strong>Ochrona kluczowych żołnierzy:</strong> D i R1 w drugiej linii</li>
      </ul>

      <h4>⚠️ Uwagi taktyczne:</h4>
      <ul>
        <li>Nie wystawiać Dowódcy z R1 na "pierwszy ogień"</li>
        <li>Utrata kluczowych żołnierzy może uniemożliwić realizację zadania</li>
        <li>Dystanse między radiotelefonistami a dowódcami według sytuacji taktycznej</li>
        <li>Zajmowanie pozycji w tej samej luce podczas kontaktu</li>
      </ul>
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

      <h4>🏗️ Elementy rejonu zasadzki:</h4>
      <ul>
        <li><strong>Rejon ześrodkowania (RZ):</strong> Miejsce ześrodkowania sił przed akcją, przygotowania do działania oraz kontroli i reorganizacji po akcji</li>
        <li><strong>Punkt rozejścia/rozwinięcia (PR):</strong> Miejsce między RZ a strefą śmierci, gdzie elementy patrolu rozdzielają się na pozycje</li>
        <li><strong>Strefa śmierci:</strong> Określony przez dowódcę odcinek szlaku, na którym zatrzymuje się i atakuje przeciwnika</li>
        <li><strong>Granica działania:</strong> Punkt za strefą śmierci, do którego prowadzi szturm grupa szturmowa (łatwy do identyfikacji w terenie)</li>
      </ul>

      <h4>👥 Organizacja patrolu do zasadzki:</h4>

      <h5>🎖️ Dowództwo patrolu:</h5>
      <ul>
        <li>Kontroluje i koordynuje działania patrolu</li>
        <li><strong>Skład:</strong> Dowódca, radiotelefonista, zastępca dowódcy, medyk, specjaliści</li>
        <li><strong>Pozycja:</strong> Dowódca przy grupie szturmowej, zastępca przy grupie wspierającej</li>
      </ul>

      <h5>🛡️ Grupa ubezpieczenia (GU1, GU2):</h5>
      <ul>
        <li>Ubezpiecza grupę szturmową i wspierającą podczas zajmowania pozycji</li>
        <li>Informuje dowódcę o siłach przeciwnika</li>
        <li>Izoluje przeciwnika w strefie śmierci</li>
        <li>Niedopuszcza odwodów i ucieczki z zasadzki</li>
      </ul>

      <h5>🔥 Grupa wsparcia (GW):</h5>
      <ul>
        <li>Podstawa ognia i bezpośrednia osłona grupy szturmowej</li>
        <li>Najsilniejsze środki rażenia</li>
        <li>Może pełnić rolę odwodu dowódcy patrolu</li>
      </ul>

      <h5>⚡ Grupa szturmowa (GSZ):</h5>
      <ul>
        <li>Przeprowadza bezpośrednie uderzenie na przeciwnika</li>
        <li>Wykonuje szczegółowe zadania w strefie śmierci</li>
        <li>Może być podzielona na specjalistyczne zespoły</li>
      </ul>

      <h4>🔍 Podgrupy specjalistyczne:</h4>
      <ul>
        <li><strong>Obserwacyjna:</strong> Źródło informacji o zmianach sytuacji przed akcją</li>
        <li><strong>Przeszukująca:</strong> Przeszukuje strefę śmierci, sprawdza osiągnięcie celu</li>
        <li><strong>Niszcząca:</strong> Niszczy sprzęt, pojazdy, broń przeciwnika</li>
        <li><strong>Ewakuacyjna:</strong> Ewakuuje rannych i zabitych (min. 2 żołnierzy)</li>
        <li><strong>Obezwładniająca:</strong> Obezwładnia i eskortuje jeńców</li>
      </ul>

      <h4>📊 Schematy zasadzek:</h4>

      <h5>📏 Zasadzka liniowa:</h5>
      <div style="font-family: monospace; background: #fff8dc; padding: 20px; border-radius: 8px; margin: 15px 0; overflow-x: auto;">
        <pre style="margin: 0; font-size: 11px; line-height: 1.3;">
                          Zasadzka liniowa
                                │
                    ╭─────────────┴─────────────╮
                   ╱                           ╲
                  ╱                             ╲
              ◎ 2                               ◎ 5
              GU1 ▲                            GU1 ▲
                  │                               │
        ┄┄┄┄┄┄┄┄┄┄┼┄┄┄┄┄ Granica działania ┄┄┄┄┄┼┄┄┄┄┄┄┄┄┄┄
                  │                               │
                  ▼         STREFA ŚMIERCI        ▼
        ╔═════════╪═══════════════════════════════╪═════════╗
        ║         │                               │         ║
        ║    ◎ 3  │            ◎ 8               │  ◎ 6    ║
        ║         │                               │         ║
        ║         ▼          ◎ 4 GW              ▼         ║  ◎ 9
        ║                                                   ║     GU2
        ║         ▲                               ▲         ║
        ║         │                               │         ║
        ║ ◎ 1  ◎ 7│     ◎ 10   ◎ 11   ◎ 12      │         ║
        ║         │            GSZ                │         ║
        ╚═════════╪═══════════════════════════════╪═════════╝
                  │                               │
                  │                               │
                  ▼                               ▼
                                │
                           ┌────┴────┐
                           │   PR    │ ◄─── Punkt Rozejścia
                           └────┬────┘
                                │
                                ▼
                          ┌─────────────┐
                          │     RZ      │ ◄─── Rejon Ześrodkowania
                          │ ┌─────────┐ │      (str. 71)
                          │ │ ┌─────┐ │ │
                          │ │ │  D  │ │ │
                          │ │ └─────┘ │ │
                          │ └─────────┘ │
                          └─────────────┘
        </pre>
      </div>

      <h5>📐 Zasadzka w kształcie litery "L":</h5>
      <div style="font-family: monospace; background: #f0fff0; padding: 20px; border-radius: 8px; margin: 15px 0; overflow-x: auto;">
        <pre style="margin: 0; font-size: 11px; line-height: 1.3;">
                    Zasadzka w kształcie litery "L"
                                    │
                        ╭───────────┴──────────╮
                       ╱                      ╲
                      ╱                        ╲
              ◎ 5    ╱              ◎ 2        ╲
              GU1 ▲ ╱                         ▲ GU1
                  ││                           │
                  ││                           │
                  ││                           │
            ◎ 3   ││                ◎ 4       │
            GW    ││                GW        │
                  ▼│               ┄┄┄┄┄┄┄┄┄┄┄┼┄┄┄ Granica działania
                   │                           │
                   │                           ▼
        ═══════════╪═════════════════════════════════════════
                   │         STREFA ŚMIERCI            ▲
                   │                                   │
            ◎ 9    │                                   │
            GW     │                                   │
                   ▼                                   │
                                                       │
        ◎ 1    ◎ 7    ◎ 10    ◎ 11    ◎ 12           │ ◎ 8
               GSZ                                     │
                                                       │ ◎ 6
                                                       │ GU2
                                                       ▼
                              │
                         ┌────┴────┐
                         │   PR    │ ◄─── Punkt Rozejścia
                         └────┬────┘
                              │
                              ▼
                        ┌─────────────┐
                        │     RZ      │ ◄─── Rejon Ześrodkowania
                        │ ┌─────────┐ │      (str. 72)
                        │ │ ┌─────┐ │ │
                        │ │ │  D  │ │ │
                        │ │ └─────┘ │ │
                        │ └─────────┘ │
                        └─────────────┘
        </pre>
      </div>

      <h4>🗺️ Legenda schematów:</h4>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
        <ul style="margin: 0; font-size: 14px;">
          <li><strong>◎ + numer</strong> - Pozycje żołnierzy z numeracją</li>
          <li><strong>GU1, GU2</strong> - Grupa Ubezpieczenia 1 i 2</li>
          <li><strong>GW</strong> - Grupa Wsparcia</li>
          <li><strong>GSZ</strong> - Grupa Szturmowa</li>
          <li><strong>PR</strong> - Punkt Rozejścia/Rozwinięcia</li>
          <li><strong>RZ</strong> - Rejon Ześrodkowania</li>
          <li><strong>D</strong> - Dowództwo patrolu</li>
          <li><strong>▲▼</strong> - Kierunki obserwacji i ognia</li>
          <li><strong>╔═══╗</strong> - Strefa śmierci</li>
          <li><strong>┄┄┄</strong> - Granica działania</li>
        </ul>
      </div>      <h4>⚡ Przebieg działania:</h4>

      <h5>🏕️ 1. Zajęcie rejonu ześrodkowania (RZ):</h5>
      <ul>
        <li>Skryte przemieszczenie do punktu kontaktowego</li>
        <li>Połączenie plutonu w RZ</li>
        <li>RZ zapewnia ukrycie i możliwość krótkiej obrony</li>
        <li>Z dala od skupisk ludzi i naturalnych szlaków</li>
        <li>Poza zasięgiem obserwacji ze strefy śmierci</li>
        <li>Ostateczny podział na grupy funkcyjne</li>
      </ul>

      <h5>🔍 2. Rekonesans strefy śmierci:</h5>
      <ul>
        <li>Dowódca i dowódcy podgrup udają się na rekonesans</li>
        <li>Ustanowienie Punktu Rozwinięcia (PR) między RZ a strefą śmierci</li>
        <li>PR poza zasięgiem obserwacji ze strefy śmierci</li>
        <li>Określenie pozycji dla wszystkich elementów</li>
        <li>Precyzyjne wyznaczenie granic strefy śmierci i granicy działania</li>
      </ul>

      <h5>📍 3. Zajęcie pozycji:</h5>
      <ul>
        <li>Kolejność: GU1 i GU2, następnie GW i GSZ</li>
        <li>GW i GSZ opuszczają RP po zameldowaniu zajęcia pozycji przez GU</li>
        <li>Zajmowanie pozycji skrycie</li>
        <li>Nieujawnienie zamiaru wykonania zasadzki</li>
      </ul>

      <h5>🔥 4. Uderzenie ogniowe:</h5>
      <ul>
        <li>GU1 lub GU2 informuje o zbliżaniu się przeciwnika</li>
        <li>Gdy przeciwnik w strefie śmierci - GW i GSZ otwierają ogień</li>
        <li>Sygnał: wystrzał dowódcy lub najsilniejszego środka ogniowego</li>
        <li>Jeśli zasadzka zdemaskowana - ogień otwiera wykrywający żołnierz</li>
        <li>Ogień do wyczerpania limitu amunicji lub sygnału dowódcy</li>
      </ul>

      <h5>⚔️ 5. Szturm:</h5>
      <ul>
        <li>Po przerwaniu ognia - taktyczna wymiana magazynka</li>
        <li>Dowódca ocenia sytuację</li>
        <li>Jeśli przeciwnik obezwładniony - rozkaz wejścia do strefy śmierci</li>
        <li>GSZ wkracza do strefy śmierci i przechodzi do granicy działania</li>
        <li>Likwidacja żywych żołnierzy stawiających opór</li>
        <li>Przeszukanie strefy śmierci, zabieranie jeńców i rannych</li>
        <li>Przygotowanie do wysadzenia pojazdów</li>
      </ul>

      <h5>🏃 6. Odskok:</h5>
      <ul>
        <li>Komenda do wycofania się od dowódcy patrolu</li>
        <li>Kolejność wycofania: GW i GSZ, następnie GU1 i GU2</li>
        <li>Łączenie w PR - kontrola stanu żołnierzy</li>
        <li>Kontynuacja odskoku do RZ</li>
        <li>Odbudowanie gotowości bojowej w RZ</li>
      </ul>

      <h4>⚠️ Zasady bezpieczeństwa:</h4>
      <ul>
        <li>Jeden żołnierz może pełnić kilka funkcji w zależności od zadania</li>
        <li>GU powstrzymują dodatkowe siły przeciwnika do wycofania reszty</li>
        <li>Stała łączność między elementami</li>
        <li>Plan działania w przypadku niepowodzenia</li>
        <li>Ewakuacja rannych przez specjalną podgrupę</li>
      </ul>

      <h4>💭 Zasada obserwacji:</h4>
      <p><em>"Czy Ty kogoś widzisz to wiesz, ale czy Ciebie ktoś widzi? Tego nie możesz być pewny."</em></p>
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
