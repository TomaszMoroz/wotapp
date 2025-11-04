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
  { id: 'combat', name: 'Walka', icon: 'military_tech', color: 'red' },
  { id: 'movement', name: 'Ruch', icon: 'directions_run', color: 'blue' },
  { id: 'communication', name: 'Łączność', icon: 'wifi', color: 'green' },
  { id: 'equipment', name: 'Sprzęt', icon: 'construction', color: 'orange' },
  { id: 'topography', name: 'Topografia', icon: 'map', color: 'purple' }
]

const tactics = [
  // Combat tactics
  {
    id: 'patrol-base',
    name: 'Organizacja bazy patrolu',
    category: 'Walka',
    icon: 'security',
    color: 'red',
    readTime: '8 min',
    content: `
      <h3>🏕️ Organizacja bazy patrolu</h3>
      <p><strong>Cel:</strong> Zapewnienie bezpiecznego miejsca odpoczynku i reorganizacji dla patrolu.</p>

      <h4>📍 Wybór miejsca:</h4>
      <ul>
        <li>Ukryte przed obserwacją przeciwnika</li>
        <li>Łatwe do obrony</li>
        <li>Dostęp do wody (jeśli możliwe)</li>
        <li>Drogi ewakuacji</li>
      </ul>

      <h4>🛡️ Organizacja obrony:</h4>
      <ul>
        <li>Obsada stanowisk ogniowych na 360°</li>
        <li>Wyznaczenie sektorów ostrzału</li>
        <li>Umieszczenie czujek</li>
        <li>Plan ewakuacji</li>
      </ul>

      <h4>⏰ Czynności w bazie:</h4>
      <ol>
        <li>Rozpoznanie okolicy</li>
        <li>Organizacja służby wartowniczej</li>
        <li>Przygotowanie posiłku i odpoczynek</li>
        <li>Kontrola sprzętu i broni</li>
        <li>Planowanie dalszych działań</li>
      </ol>
    `
  },
  {
    id: 'fire-team-movement',
    name: 'Ruch drużyny ogniowej',
    category: 'Ruch',
    icon: 'directions_run',
    color: 'blue',
    readTime: '6 min',
    content: `
      <h3>🏃‍♂️ Ruch drużyny ogniowej</h3>
      <p><strong>Podstawowe formacje ruchu w terenie.</strong></p>

      <h4>📐 Podstawowe formacje:</h4>
      <ul>
        <li><strong>Kolumna:</strong> Szybki ruch, ograniczona obserwacja boków</li>
        <li><strong>Linia:</strong> Maksymalna siła ognia do przodu</li>
        <li><strong>Klin:</strong> Dobra obserwacja i elastyczność</li>
        <li><strong>Rozwinięcie:</strong> Ruch przez teren odkryty</li>
      </ul>

      <h4>🔄 Zasady ruchu:</h4>
      <ul>
        <li>Zachowanie odstępów (5-10m w lesie, 10-50m na otwartym)</li>
        <li>Obserwacja wyznaczonych sektorów</li>
        <li>Wykorzystanie osłon terenowych</li>
        <li>Sygnalizacja ręczna</li>
      </ul>

      <h4>⚠️ Reakcja na kontakt z przeciwnikiem:</h4>
      <ol>
        <li>Natychmiastowe zajęcie osłon</li>
        <li>Otwarcie ognia</li>
        <li>Komunikacja z dowódcą</li>
        <li>Wykonanie rozkazów taktycznych</li>
      </ol>
    `
  },
  {
    id: 'radio-procedures',
    name: 'Procedury radiowe',
    category: 'Łączność',
    icon: 'radio',
    color: 'green',
    readTime: '7 min',
    content: `
      <h3>📻 Procedury radiowe</h3>
      <p><strong>Zasady bezpiecznej i skutecznej komunikacji radiowej.</strong></p>

      <h4>🔤 Alfabet fonetyczny NATO:</h4>
      <div style="columns: 2; margin: 1rem 0;">
        <p>A - Alpha<br>B - Bravo<br>C - Charlie<br>D - Delta<br>E - Echo<br>F - Foxtrot<br>G - Golf<br>H - Hotel<br>I - India<br>J - Juliet<br>K - Kilo<br>L - Lima<br>M - Mike</p>
        <p>N - November<br>O - Oscar<br>P - Papa<br>Q - Quebec<br>R - Romeo<br>S - Sierra<br>T - Tango<br>U - Uniform<br>V - Victor<br>W - Whiskey<br>X - X-ray<br>Y - Yankee<br>Z - Zulu</p>
      </div>

      <h4>📋 Procedury nadawania:</h4>
      <ol>
        <li><strong>Sprawdzenie częstotliwości</strong> - nasłuch przed nadaniem</li>
        <li><strong>Wywołanie:</strong> "[Znak wywoływanego], tu [własny znak]"</li>
        <li><strong>Oczekiwanie na odpowiedź</strong></li>
        <li><strong>Przekazanie komunikatu</strong> - jasno i zwięźle</li>
        <li><strong>Potwierdzenie odbioru</strong></li>
      </ol>

      <h4>🚨 Komunikaty priorytetowe:</h4>
      <ul>
        <li><strong>MAYDAY:</strong> Zagrożenie życia</li>
        <li><strong>PAN PAN:</strong> Sytuacja pilna</li>
        <li><strong>SECURITE:</strong> Ostrzeżenie o zagrożeniu</li>
      </ul>
    `
  },
  // Equipment
  {
    id: 'night-vision',
    name: 'Obsługa noktowizji',
    category: 'Sprzęt',
    icon: 'visibility',
    color: 'orange',
    readTime: '5 min',
    content: `
      <h3>🌙 Obsługa noktowizji</h3>
      <p><strong>Podstawy używania urządzeń noktowizyjnych.</strong></p>

      <h4>🔧 Przygotowanie do użycia:</h4>
      <ol>
        <li>Sprawdzenie stanu baterii</li>
        <li>Oczyszczenie soczewek</li>
        <li>Regulacja ostrości</li>
        <li>Test funkcjonalności</li>
      </ol>

      <h4>👁️ Techniki obserwacji:</h4>
      <ul>
        <li><strong>Obserwacja boczna:</strong> Większa czułość siatkówki</li>
        <li><strong>Skanowanie:</strong> Powolne ruchy wzrokiem</li>
        <li><strong>Unikanie jasnych źródeł światła</strong></li>
        <li><strong>Częste mruganie</strong> - zapobiega zmęczeniu oczu</li>
      </ul>

      <h4>⚠️ Ograniczenia:</h4>
      <ul>
        <li>Ograniczona głębia ostrości</li>
        <li>Brak percepcji kolorów</li>
        <li>Zmniejszone pole widzenia</li>
        <li>Wrażliwość na jasne światło</li>
      </ul>

      <h4>🔋 Konserwacja:</h4>
      <ul>
        <li>Wyłączanie po użyciu</li>
        <li>Przechowywanie w suchym miejscu</li>
        <li>Regularna wymiana baterii</li>
        <li>Ochrona przed upadkiem</li>
      </ul>
    `
  },
  // Topography
  {
    id: 'map-reading',
    name: 'Czytanie map topograficznych',
    category: 'Topografia',
    icon: 'map',
    color: 'purple',
    readTime: '10 min',
    content: `
      <h3>🗺️ Czytanie map topograficznych</h3>
      <p><strong>Podstawowe umiejętności topograficzne żołnierza.</strong></p>

      <h4>📏 Skala mapy:</h4>
      <ul>
        <li><strong>1:25 000:</strong> Bardzo szczegółowa, działania taktyczne</li>
        <li><strong>1:50 000:</strong> Standardowa mapa taktyczna</li>
        <li><strong>1:100 000:</strong> Planowanie operacyjne</li>
      </ul>

      <h4>🧭 Elementy mapy:</h4>
      <ul>
        <li><strong>Siatka współrzędnych:</strong> System prostokątny</li>
        <li><strong>Południk magnetyczny:</strong> Kierunek północy magnetycznej</li>
        <li><strong>Warstwice:</strong> Linie jednakowej wysokości</li>
        <li><strong>Legenda:</strong> Objaśnienie znaków umownych</li>
      </ul>

      <h4>📍 Określanie współrzędnych:</h4>
      <ol>
        <li>Znajdź kwadrat siatki</li>
        <li>Zmierz odległość od lewej krawędzi (współrzędna X)</li>
        <li>Zmierz odległość od dolnej krawędzi (współrzędna Y)</li>
        <li>Zapisz w formacie 6-cyfrowym</li>
      </ol>

      <h4>🧮 Obliczanie odległości:</h4>
      <ul>
        <li><strong>Siatka:</strong> 1 cm = 250m (skala 1:25 000)</li>
        <li><strong>Linijka:</strong> Pomiar w linii prostej</li>
        <li><strong>Sznurek:</strong> Pomiar tras krętych</li>
        <li><strong>Krok marszowy:</strong> ~70cm dla żołnierza</li>
      </ul>
    `
  },
  {
    id: 'compass-navigation',
    name: 'Nawigacja kompasowa',
    category: 'Topografia',
    icon: 'explore',
    color: 'purple',
    readTime: '8 min',
    content: `
      <h3>🧭 Nawigacja kompasowa</h3>
      <p><strong>Orientacja w terenie za pomocą kompasu.</strong></p>

      <h4>🎯 Podstawowe azymut:</h4>
      <ul>
        <li><strong>0° / 360°:</strong> Północ</li>
        <li><strong>90°:</strong> Wschód</li>
        <li><strong>180°:</strong> Południe</li>
        <li><strong>270°:</strong> Zachód</li>
      </ul>

      <h4>📐 Określanie azymutu:</h4>
      <ol>
        <li>Wyceluj kompas w kierunek celu</li>
        <li>Odczytaj wartość na tarczy</li>
        <li>Uwzględnij deklinację magnetyczną</li>
        <li>Zapisz azymut</li>
      </ol>

      <h4>🔄 Azymut przeciwny:</h4>
      <ul>
        <li><strong>Jeśli azymut < 180°:</strong> Dodaj 180°</li>
        <li><strong>Jeśli azymut > 180°:</strong> Odejmij 180°</li>
        <li>Służy do powrotu tą samą trasą</li>
      </ul>

      <h4>⚠️ Błędy w nawigacji:</h4>
      <ul>
        <li><strong>Deklinacja magnetyczna:</strong> Różnica między północą geograficzną a magnetyczną</li>
        <li><strong>Dewiacja:</strong> Wpływ metalowych przedmiotów</li>
        <li><strong>Błędy odczytu:</strong> Nieprecyzyjne odczytanie wartości</li>
      </ul>
    `
  },
  {
    id: 'terrain-analysis',
    name: 'Analiza terenu pod kątem taktycznym',
    category: 'Topografia',
    icon: 'terrain',
    color: 'purple',
    readTime: '12 min',
    content: `
      <h3>🏔️ Analiza terenu pod kątem taktycznym</h3>
      <p><strong>Ocena terenu dla potrzeb działań bojowych.</strong></p>

      <h4>🔍 Metoda KOCOA:</h4>
      <ul>
        <li><strong>K - Kluczowy teren:</strong> Punkty decydujące o sukcesie</li>
        <li><strong>O - Obserwacja i pola ostrzału:</strong> Widoczność i możliwości strzelania</li>
        <li><strong>C - Osłony i ukrycia:</strong> Ochrona przed ogniem i obserwacją</li>
        <li><strong>O - Przeszkody:</strong> Elementy ograniczające ruch</li>
        <li><strong>A - Avenues of approach:</strong> Drogi zbliżenia</li>
      </ul>

      <h4>📍 Kluczowy teren:</h4>
      <ul>
        <li><strong>Wzgórza i wzniesienia:</strong> Punkty obserwacyjne</li>
        <li><strong>Skrzyżowania dróg:</strong> Kontrola ruchu</li>
        <li><strong>Mosty i przeprawy:</strong> Punkty przejścia</li>
        <li><strong>Budynki dominujące:</strong> Punkty oporu</li>
      </ul>

      <h4>👁️ Obserwacja i pola ostrzału:</h4>
      <ul>
        <li><strong>Linie horyzontu:</strong> Granice obserwacji</li>
        <li><strong>Martwe przestrzenie:</strong> Obszary niewidoczne</li>
        <li><strong>Sektory ostrzału:</strong> Obszary skutecznego ognia</li>
        <li><strong>Pozycje obserwacyjne:</strong> Punkty rozpoznania</li>
      </ul>

      <h4>🛡️ Osłony i ukrycia:</h4>
      <ul>
        <li><strong>Osłona:</strong> Ochrona przed ogniem (betonowe ściany, nasypy)</li>
        <li><strong>Ukrycie:</strong> Ochrona przed obserwacją (las, mgła)</li>
        <li><strong>Pozycje strzeleckie:</strong> Naturalne lub sztuczne</li>
        <li><strong>Drogi podejścia:</strong> Ukryte trasy ruchu</li>
      </ul>
    `
  },
  {
    id: 'coordinate-systems',
    name: 'Systemy współrzędnych wojskowych',
    category: 'Topografia',
    icon: 'grid_3x3',
    color: 'purple',
    readTime: '9 min',
    content: `
      <h3>📐 Systemy współrzędnych wojskowych</h3>
      <p><strong>Precyzyjne określanie położenia w terenie.</strong></p>

      <h4>🌍 System MGRS (Military Grid Reference System):</h4>
      <ul>
        <li><strong>Zona UTM:</strong> 6° pasy długości geograficznej</li>
        <li><strong>Pasmo:</strong> 8° pasy szerokości geograficznej</li>
        <li><strong>Identyfikator kwadratu 100km:</strong> Dwie litery</li>
        <li><strong>Współrzędne numeryczne:</strong> Określenie pozycji w kwadracie</li>
      </ul>

      <h4>📍 Format zapisywania MGRS:</h4>
      <ul>
        <li><strong>Pełny format:</strong> 34U DQ 12345 67890</li>
        <li><strong>10 cyfr:</strong> DQ 12345 67890 (dokładność 1m)</li>
        <li><strong>8 cyfr:</strong> DQ 1234 6789 (dokładność 10m)</li>
        <li><strong>6 cyfr:</strong> DQ 123 678 (dokładność 100m)</li>
      </ul>

      <h4>🎯 Określanie współrzędnych:</h4>
      <ol>
        <li>Znajdź kwadrat 100km na mapie</li>
        <li>Odczytaj identyfikator (np. DQ)</li>
        <li>Zmierz odległość od lewej krawędzi kwadratu (E)</li>
        <li>Zmierz odległość od dolnej krawędzi kwadratu (N)</li>
        <li>Zapisz w odpowiednim formacie</li>
      </ol>

      <h4>🔧 Narzędzia pomocnicze:</h4>
      <ul>
        <li><strong>GPS:</strong> Automatyczne określanie MGRS</li>
        <li><strong>Siatka transparentna:</strong> Pomoc w pomiarach</li>
        <li><strong>Linijka koordinatowa:</strong> Precyzyjny pomiar</li>
        <li><strong>Aplikacje mobilne:</strong> Konwersja współrzędnych</li>
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
