<template>
  <q-page class="modern-bg">
    <div class="container q-pa-md">
      <BackNav color="black"/>

      <!-- Header -->
      <div class="modern-header-section q-mb-lg">
        <div class="modern-hero-section q-pa-lg rounded-borders">
          <div class="text-h4 text-weight-bold text-military-secondary q-mb-sm">Taktyka</div>
          <div class="text-body1 text-military-dark">Manewry i formacje wojskowe</div>
        </div>
      </div>

      <div class="modern-content-row q-gutter-md">
        <!-- Lista treści -->
        <div class="modern-content-list-col">
          <q-card class="modern-content-list-card">
            <q-card-section class="q-pa-md">
              <div class="text-h6 q-mb-md text-military-secondary">Spis treści</div>
              <!-- Filtrowanie -->
              <q-input
                v-model="searchQuery"
                placeholder="Szukaj manewrów..."
                outlined
                dense
                class="q-mb-md"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
              <!-- Lista manewrów -->
              <q-list separator>
                <q-item
                  v-for="maneuver in filteredManeuvers"
                  :key="maneuver.id"
                  clickable
                  @click="selectManeuver(maneuver)"
                  :class="{ 'bg-military-light': selectedManeuver?.id === maneuver.id }"
                >
                  <q-item-section>
                    <q-item-label class="text-weight-medium text-military-dark">{{ maneuver.title }}</q-item-label>
                    <q-item-label caption class="text-military-secondary">{{ maneuver.category }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Treść -->
        <div class="modern-content-main-col">
          <q-card v-if="selectedManeuver" class="modern-content-card">
            <q-card-section class="q-pa-md">
              <div class="text-h5 text-weight-bold q-mb-md text-military-secondary">{{ selectedManeuver.title }}</div>
              <div class="text-subtitle2 q-mb-lg text-military-dark">{{ selectedManeuver.category }}</div>
              <div class="modern-content-body">
                <div v-if="selectedManeuver.id === 1">
                  <h4>Okrężna</h4>
                  <p>Procedura rozpoznania i zajęcia rejonu bazy po wykonaniu manewru "HAK".</p>

                  <div class="diagram-container q-my-lg">
                    <img :src="okrImg" alt="Diagram manewru okrężnego" class="tactical-diagram" />
                  </div>

                  <h5>Przygotowanie do okrężnej:</h5>
                  <ol>
                    <li><strong>Wykonanie "HAK":</strong> Sprawdzenie czy sekcja nie jest śledzona</li>
                    <li><strong>Procedura "5-25 m":</strong> Rozpoznanie planowanego rejonu bazy</li>
                    <li><strong>Ustalenie miejsca:</strong> Wstępnie w planowaniu, precyzowanie w terenie</li>
                  </ol>

                  <h5>Rozpoznanie rejonu bazy:</h5>
                  <ul>
                    <li><strong>Siły rozpoznawcze:</strong> Minimum 4 (idealnie 5) żołnierzy ze środka szyku</li>
                    <li><strong>Ubezpieczenie:</strong> Skrajni żołnierze ubezpieczają wyznaczone sektory</li>
                    <li><strong>Punkt kontrolny:</strong> Wyjście i powrót przez punkt charakterystyczny w terenie</li>
                    <li><strong>Pozostawienie straży:</strong> 2 żołnierzy pozostaje w rejonie bazy</li>
                    <li><strong>Łączność:</strong> Dowódca zawsze z radiotelefonistą</li>
                    <li><strong>Bezpieczeństwo:</strong> Hasło i odzew</li>
                  </ul>

                  <h5>Organizacja obrony okrężnej:</h5>
                  <ol>
                    <li><strong>Zajęcie pozycji:</strong> Wszystkie siły osiągają rejon bazy</li>
                    <li><strong>Obrona okrężna:</strong> Rozmieszczenie wokół rejonu</li>
                    <li><strong>Nasłuch z obserwacją:</strong> Sprawdzenie bezpieczeństwa</li>
                    <li><strong>Dowodzenie:</strong> Dowódca i radiotelefonista w środku okrężnej</li>
                    <li><strong>Planowanie:</strong> Czas na przemyślenie kolejnych zadań</li>
                    <li><strong>Meldunek:</strong> Wysłanie meldunku o osiągnięciu rejonu bazy</li>
                  </ol>

                  <h5>Działania w bazie:</h5>
                  <ul>
                    <li><strong>Odpoczynek:</strong> Regeneracja sił do dalszego działania</li>
                    <li><strong>Szczegółowe zadania:</strong> Dowódca może wezwać żołnierzy do instrukcji</li>
                    <li><strong>Stałe ubezpieczenie:</strong> Baza musi być ciągle ubezpieczana</li>
                    <li><strong>Kontrola:</strong> Monitoring wszystkich elementów procedury</li>
                  </ul>

                  <div class="q-pa-md bg-amber-1 rounded-borders q-mt-md">
                    <div class="text-weight-medium text-amber-8 q-mb-xs">
                      <q-icon name="warning" class="q-mr-xs" />
                      Zasada podstawowa
                    </div>
                    <div class="text-body2">
                      W czasie wykonywania każdego elementu baza musi być stale ubezpieczana.
                    </div>
                  </div>
                </div>

                <div v-else-if="selectedManeuver.id === 2">
                  <h4>Manewr hak</h4>
                  <p>Procedura sprawdzenia czy sekcja nie jest śledzona podczas marszu w terenie.</p>

                  <div class="diagram-container q-my-lg">
                    <img :src="hakImg" alt="Diagram manewru hak" class="tactical-diagram" />
                  </div>

                  <h5>Wykonanie manewru:</h5>
                  <ol>
                    <li><strong>Sygnał:</strong> Prowadzący sygnalizuje „HAK"</li>
                    <li><strong>Zejście z trasy:</strong> Schodzi z kierunku marszu w lewo lub w prawo</li>
                    <li><strong>Pozycja obserwacyjna:</strong> Odchodzi od pierwotnej trasy na maksymalną odległość, aby obserwować miejsce zejścia i oddziaływać ogniowo</li>
                    <li><strong>Ruch równoległy:</strong> Zmienia kierunek poruszając się równolegle do pierwotnej trasy w kierunku przeciwnym</li>
                    <li><strong>Zawrót:</strong> Zawraca o 180° i przechodzi odcinek do pozycji równoległej do pierwotnej trasy</li>
                    <li><strong>Obserwacja:</strong> Zatrzymuje się na wysokości punktu zejścia z trasy i obserwuje</li>
                  </ol>

                  <h5>Zasady bezpieczeństwa:</h5>
                  <ul>
                    <li><strong>Ubezpieczenie 360°:</strong> Pełna obserwacja dookoła</li>
                    <li><strong>Skupienie ognia:</strong> Większość środków ogniowych w kierunku pierwotnej trasy marszu</li>
                    <li><strong>Czas obserwacji:</strong> Regulowany przez dowódcę</li>
                    <li><strong>Działania dodatkowe:</strong> Po obserwacji możliwość poprawy oporządzenia, przejścia do bazy</li>
                  </ul>

                  <h5>Zastosowanie:</h5>
                  <ul>
                    <li>Sprawdzenie czy sekcja jest śledzona</li>
                    <li>Wykrycie przeciwnika na trasie marszu</li>
                    <li>Planowo co pewien czas lub odcinek marszu</li>
                    <li>Według doraźnych potrzeb</li>
                  </ul>
                </div>

                <div v-else-if="selectedManeuver.id === 3">
                  <h4>Formacja podwójny sierżant</h4>
                  <p>Formacja taktyczna zapewniająca kontrolę przestrzeni bojowej i wszechkierunkową możliwość prowadzenia ognia przez wszystkich żołnierzy sekcji.</p>

                  <div class="diagram-container q-my-lg">
                    <img :src="sier1Img" alt="podwójny sierżant - formacja podstawowa" class="tactical-diagram q-mb-md" />
                    <img :src="sier2Img" alt="podwójny sierżant - rozwinięcie" class="tactical-diagram q-mb-md" />
                    <img :src="sier3Img" alt="podwójny sierżant - warianty" class="tactical-diagram" />
                  </div>

                  <h5>Zasady rozstawienia żołnierzy:</h5>
                  <ul>
                    <li><strong>Odległości między żołnierzami</strong> określa dowódca w zależności od rozległości pokonywanego terenu</li>
                    <li><strong>Przestrzenne rozstawienie</strong> wszystkich żołnierzy w obu Sierżantach musi zapewniać każdemu z żołnierzy możliwość prowadzenia ognia w przód, tył, lewo i prawo (również „przez szyk")</li>
                    <li><strong>Sprawdzenie prawidłowości</strong> poprzez ustawienie tarczy/figury bojowej na kierunku marszu w odległości ok. 100 metrów</li>
                    <li><strong>Test rozstawienia:</strong> Żołnierze celują do tarczy - jeśli między żołnierzem a celem znajduje się inny żołnierz sekcji, szyk jest niewłaściwie rozstawiony</li>
                  </ul>

                  <h5>Sierżant "ALFA" (pierwszy sierżant):</h5>
                  <ul>
                    <li><strong>Zastępca Dowódcy Sekcji (ZD)</strong> ze swoim radiotelefonistą (R2)</li>
                    <li><strong>Medyk</strong> - zapewnienie opieki medycznej</li>
                    <li><strong>Starszy saper</strong> - rozpoznanie i neutralizacja zagrożeń</li>
                    <li><strong>Starszy strzelec wyborowy (Nawigator)</strong> - znajomość terenu, mapa, busola, GPS</li>
                    <li><strong>Strzelec z ukm</strong> - likwidacja środków ogniowych przeciwnika (granatniki, km, strzelcy)</li>
                    <li><strong>Szperacz</strong> - żołnierz "czujący teren", z wyobraźnią przestrzenną i spostrzegawczością</li>
                  </ul>

                  <h5>Sierżant "BRAWO" (drugi sierżant):</h5>
                  <ul>
                    <li><strong>Dowódca (D)</strong> ze swoim radiotelefonistą (R1)</li>
                    <li><strong>R1</strong> odpowiada za ciągłość komunikacji radiowej w obu kierunkach na wszystkich zadanych kierunkach (sztab, siły powietrzne, siły sprzymierzone, inne elementy taktyczne)</li>
                    <li><strong>Wszyscy żołnierze "BRAWO"</strong> odpowiadają za swoje sektory obserwacji</li>
                    <li><strong>W kontakcie ogniowym</strong> reagują na komendy do przemieszczania się wydawane przez Dowódcę</li>
                  </ul>

                  <h5>Zasady taktyczne:</h5>
                  <ul>
                    <li><strong>Ochrona kluczowych żołnierzy:</strong> Nie wystawiamy na "pierwszy ogień" Dowódcy z głównym radiotelefonistą</li>
                    <li><strong>Łączność radiowa:</strong> Radiotelefonista trzyma się bezpośrednio przy swojej stacji dowódczej (ZD lub D)</li>
                    <li><strong>Kontakt ogniowy:</strong> Nie rozdzielamy radiotelefonistów od dowódców przy "wchodzeniu" w szyk</li>
                    <li><strong>Kolejność celów dla ukm:</strong> 1. obsługa granatnika, 2. obsługa km, 3. pojedynczy strzelcy</li>
                  </ul>

                </div>

                <div v-else-if="selectedManeuver.id === 4">
                  <h4>Organizacja zasadzki</h4>
                  <p>Taktyka polegająca na ukrytym oczekiwaniu na przeciwnika i niespodziewanym ataku w korzystnym momencie.</p>

                  <div class="diagram-container q-my-lg">
                    <img :src="zas1Img" alt="Zasadzka - pozycje podstawowe" class="tactical-diagram q-mb-md" />
                    <img :src="zas2Img" alt="Zasadzka - fazy realizacji" class="tactical-diagram" />
                  </div>

                  <h5>Elementy rejonu zasadzki:</h5>
                  <ul>
                    <li><strong>Rejon ześrodkowania (RZ):</strong> Miejsce ześrodkowania sił przed akcją, przygotowania do działania oraz kontroli i reorganizacji po akcji</li>
                    <li><strong>Punkt rozejścia/rozwinięcia (PR):</strong> Miejsce pomiędzy RZ i strefą śmierci, gdzie elementy patrolu rozdzielają się i wychodzą na pozycje</li>
                    <li><strong>Strefa śmierci:</strong> Określony odcinek szlaku, na którym elementy patrolu zatrzymują siły przeciwnika i wykonują atak</li>
                    <li><strong>Granica działania:</strong> Określony odcinek lub punkt za strefą śmierci, do którego prowadzi szturm grupa szturmowa</li>
                  </ul>

                  <h5>Organizacja patrolu do zasadzki:</h5>
                  <ul>
                    <li><strong>Dowództwo patrolu:</strong> Kontroluje i koordynuje działania (dowódca, radiotelefonista, zastępca, medyk, specjaliści)</li>
                    <li><strong>Grupa ubezpieczenia (GU1, GU2):</strong> Ubezpiecza w trakcie zajmowania pozycji, akcji i wycofywania. Informuje o siłach przeciwnika i izoluje strefę śmierci</li>
                    <li><strong>Grupa wsparcia (GW):</strong> Podstawa ognia i bezpośrednia osłona grupy szturmowej. Najsilniejsze środki rażenia</li>
                    <li><strong>Grupa szturmowa (GS):</strong> Przeprowadza bezpośrednie uderzenie na przeciwnika i wykonuje szczegółowe zadania w strefie śmierci</li>
                  </ul>

                  <h5>Podgrupy specjalistyczne:</h5>
                  <ul>
                    <li><strong>Podgrupa obserwacyjna:</strong> Obserwuje rejon strefy śmierci od rekonesansu do rozpoczęcia akcji</li>
                    <li><strong>Podgrupa przeszukująca:</strong> Przeszukuje strefę śmierci, sprawdzając osiągnięcie celu zasadzki</li>
                    <li><strong>Podgrupa niszcząca:</strong> Niszczy sprzęt, pojazdy, broń i wyposażenie przeciwnika</li>
                    <li><strong>Podgrupa ewakuacyjna:</strong> Ewakuuje rannych i zabitych z sił patrolu (min. 2 żołnierzy)</li>
                    <li><strong>Podgrupa obezwładniająca:</strong> Obezwładnia i eskortuje jeńców ze strefy śmierci</li>
                  </ul>

                  <h5>Fazy realizacji zasadzki:</h5>
                  <ol>
                    <li><strong>Zajęcie RZ:</strong> Skryte przemieszczenie, połączenie plutonu, organizacja rejonu zapewniającego ukrycie i obronę</li>
                    <li><strong>Rekonesans strefy śmierci:</strong> Dowódca i dowódcy podgrup ustalają pozycje, granice SŚ i Granicę Działania</li>
                    <li><strong>Zajęcie pozycji:</strong> Kolejność: GU1→GU2→GW→GS (skrycie, bez zdradzania zamiaru)</li>
                    <li><strong>Uderzenie ogniowe:</strong> Na sygnał dowódcy lub po demaskacji, ogień do wyczerpania limitu amunicji</li>
                    <li><strong>Szturm:</strong> GS wkracza do SŚ, przechodzi do Granicy Działania, przeszukuje i wykonuje zadania</li>
                    <li><strong>Odskok:</strong> Kolejność wycofania: GW→GS→GU1→GU2, połączenie w PR, powrót do RZ</li>
                  </ol>

                  <h5>Kluczowe zasady:</h5>
                  <ul>
                    <li><strong>Ukrycie:</strong> RZ z dala od skupisk ludzi i szlaków komunikacyjnych</li>
                    <li><strong>Kontrola:</strong> Taktyczna wymiana magazynka po każdym uderzeniu ogniowym</li>
                    <li><strong>Koordynacja:</strong> Dowódca przy GS, zastępca przy GW, stała łączność</li>
                    <li><strong>Elastyczność:</strong> Jeden żołnierz może pełnić wiele funkcji w grupie</li>
                  </ul>

                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card v-else class="modern-content-card">
            <q-card-section class="text-center q-pa-md">
              <q-icon name="military_tech" size="4rem" color="military-secondary" class="q-mb-md" />
              <div class="text-h6 text-military-secondary">Wybierz manewer z listy</div>
              <div class="text-body2 text-military-dark">Kliknij na wybrany manewer aby wyświetlić jego treść</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { ref, computed } from 'vue'

// Import images
import okrImg from 'assets/okr.png'
import hakImg from 'assets/hak.png'
import sier1Img from 'assets/sier1.png'
import sier2Img from 'assets/sier2.png'
import sier3Img from 'assets/sier3.png'
import zas1Img from 'assets/zas1.png'
import zas2Img from 'assets/zas2.png'

const searchQuery = ref('')
const selectedManeuver = ref(null)

const maneuvers = [
  {
    id: 1,
    title: 'Baza / Okrężna',
    category: 'Manewr taktyczny'
  },
  {
    id: 2,
    title: 'Hak',
    category: 'Manewr taktyczny'
  },
  {
    id: 3,
    title: 'Podwójny sierżant',
    category: 'Formacja taktyczna'
  },
  {
    id: 4,
    title: 'Zasadzka',
    category: 'Działania specjalne'
  }
]

const filteredManeuvers = computed(() => {
  if (!searchQuery.value) return maneuvers

  return maneuvers.filter(maneuver =>
    maneuver.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    maneuver.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectManeuver = (maneuver) => {
  selectedManeuver.value = maneuver
}
</script>

<style scoped>

.modern-bg {
  background: #F5F5F5;
  min-height: 100vh;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
}
.modern-header-section {
  margin-bottom: 2.5rem;
}
.modern-hero-section {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  border: 1px solid #e0e0e0;
}
.modern-content-row {
  display: flex;
  flex-direction: row;
  gap: 24px;
}
.modern-content-list-col {
  flex: 0 0 340px;
  max-width: 340px;
  min-width: 260px;
}
.modern-content-main-col {
  flex: 1 1 0%;
  min-width: 0;
}
.modern-content-list-card,
.modern-content-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  min-height: 300px;
  border: 1px solid #e0e0e0;
}
.modern-content-body {
  line-height: 1.6;
  color: #111;
}
.modern-content-body h4 {
  color: #2D3E2F;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}
.modern-content-body h5 {
  color: #8B4513;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
}
.modern-content-body ul,
.modern-content-body ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}
.modern-content-body li {
  margin-bottom: 0.5rem;
}
.modern-content-body strong {
  color: #2D3E2F;
  font-weight: 600;
}
.diagram-container {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin: 1.5rem 0;
}
.tactical-diagram {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
  padding: 12px;
  object-fit: contain;
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
}
.diagram-caption {
  margin-top: 12px;
  color: #6c757d;
  font-size: 0.875rem;
  font-style: italic;
  padding: 0 16px;
}
@media (max-width: 1024px) {
  .modern-content-row {
    flex-direction: column;
    gap: 16px;
  }
  .modern-content-list-col {
    max-width: 100%;
    min-width: 0;
    flex: 1 1 100%;
  }
  .modern-content-main-col {
    max-width: 100%;
    min-width: 0;
    flex: 1 1 100%;
  }
}
@media (max-width: 768px) {
  .modern-content-list-card {
    min-height: auto;
    margin-bottom: 1rem;
    position: static;
  }
  .modern-content-card {
    min-height: auto;
  }
  .diagram-container {
    padding: 1rem;
    margin: 1rem 0;
  }
  .tactical-diagram {
    padding: 8px;
  }
  .diagram-caption {
    padding: 0 8px;
  }
}
@media (max-width: 480px) {
  .tactical-diagram {
    padding: 6px;
  }
  .diagram-container {
    padding: 0.75rem;
    margin: 0.75rem 0;
  }
  .diagram-caption {
    padding: 0 4px;
    font-size: 0.8rem;
  }
}
</style>
