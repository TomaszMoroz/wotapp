<template>
  <q-page class="topography-page">
    <div class="container q-pa-md">
      <!-- Header -->
      <div class="page-header q-mb-xl">
        <div class="row items-center q-gutter-md">
          <q-icon name="map" size="3rem" color="primary" />
          <div>
            <div class="text-h4 text-weight-bold text-primary">Topografia</div>
            <div class="text-subtitle1 text-grey-7">Mapy, orientacja i nawigacja w terenie</div>
          </div>
        </div>
      </div>

      <div class="row q-gutter-lg mobile-column">
        <!-- Panel kategorii -->
        <div class="col-12 col-lg-3">
          <q-card class="categories-card">
            <q-card-section class="card-header">
              <div class="text-h6 text-weight-bold">
                <q-icon name="explore" class="q-mr-sm" />
                Kategorie
              </div>
            </q-card-section>

            <q-card-section class="q-pa-none">
              <q-list>
                <q-item
                  v-for="category in categories"
                  :key="category.id"
                  clickable
                  @click="selectCategory(category)"
                  :class="selectedCategory?.id === category.id ? 'bg-primary text-white' : ''"
                >
                  <q-item-section avatar>
                    <q-icon :name="category.icon" :color="selectedCategory?.id === category.id ? 'white' : category.color" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium">{{ category.name }}</q-item-label>
                    <q-item-label caption :class="selectedCategory?.id === category.id ? 'text-white' : 'text-grey-6'">
                      {{ category.count }} tematów
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Panel tematów -->
        <div class="col-12 col-lg-9">
          <div v-if="!selectedCategory" class="topics-grid">
            <div
              v-for="topic in allTopics"
              :key="topic.id"
              class="topic-card-wrapper"
            >
              <q-card
                class="topic-card"
                clickable
                @click="selectTopic(topic)"
              >
                <div class="topic-image">
                  <q-icon :name="topic.icon" size="3rem" :color="topic.color" />
                </div>
                <q-card-section>
                  <div class="text-h6 text-weight-bold q-mb-sm">{{ topic.name }}</div>
                  <div class="text-caption text-grey-6 q-mb-md">{{ topic.category }}</div>
                  <div class="text-body2">{{ topic.description }}</div>
                </q-card-section>
                <q-card-actions class="q-pa-md justify-end">
                  <q-btn flat round icon="arrow_forward" color="primary" />
                </q-card-actions>
              </q-card>
            </div>
          </div>

          <div v-else-if="!selectedTopic" class="category-topics">
            <div class="category-header q-mb-lg">
              <div class="row items-center q-gutter-md">
                <q-icon :name="selectedCategory.icon" size="2rem" :color="selectedCategory.color" />
                <div>
                  <div class="text-h5 text-weight-bold">{{ selectedCategory.name }}</div>
                  <div class="text-subtitle2 text-grey-7">{{ filteredTopics.length }} tematów</div>
                </div>
              </div>
            </div>

            <div class="topics-list">
              <q-card
                v-for="topic in filteredTopics"
                :key="topic.id"
                class="topic-list-item q-mb-md"
                clickable
                @click="selectTopic(topic)"
              >
                <q-card-section>
                  <div class="row items-center q-gutter-md">
                    <q-icon :name="topic.icon" size="2rem" :color="topic.color" />
                    <div class="col">
                      <div class="text-h6 text-weight-bold">{{ topic.name }}</div>
                      <div class="text-body2 text-grey-7 q-mt-xs">{{ topic.description }}</div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div v-else class="topic-content">
            <q-card class="content-card">
              <q-card-section class="content-header">
                <div class="row items-center q-gutter-md">
                  <q-btn
                    flat
                    round
                    icon="arrow_back"
                    color="white"
                    @click="goBack"
                  />
                  <q-icon :name="selectedTopic.icon" size="2rem" color="white" />
                  <div>
                    <div class="text-h5 text-weight-bold">{{ selectedTopic.name }}</div>
                    <div class="text-subtitle2 opacity-80">{{ selectedTopic.category }}</div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="content-body">
                <div class="content-text" v-html="selectedTopic.content"></div>
              </q-card-section>

              <q-card-actions class="q-pa-md">
                <q-btn
                  flat
                  icon="print"
                  label="Drukuj"
                  color="primary"
                />
                <q-btn
                  flat
                  icon="share"
                  label="Udostępnij"
                  color="primary"
                />
                <q-space />
                <q-btn
                  icon="bookmark_border"
                  flat
                  round
                  color="grey-6"
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
import { ref, computed } from 'vue'

defineOptions({
  name: 'TopographyPage'
})

const selectedCategory = ref(null)
const selectedTopic = ref(null)

const categories = [
  {
    id: 'orientation',
    name: 'Orientacja',
    icon: 'explore',
    color: 'green',
    count: 4
  },
  {
    id: 'maps',
    name: 'Mapa topograficzna',
    icon: 'map',
    color: 'blue',
    count: 3
  },
  {
    id: 'navigation',
    name: 'Nawigacja',
    icon: 'navigation',
    color: 'orange',
    count: 3
  },
  {
    id: 'equipment',
    name: 'Sprzęt nawigacyjny',
    icon: 'compass_calibration',
    color: 'purple',
    count: 2
  }
]

const allTopics = [
  // Orientacja
  {
    id: 'terrain-orientation',
    name: 'Orientacja w terenie',
    category: 'Orientacja',
    icon: 'explore',
    color: 'green',
    description: 'Podstawowe metody orientacji bez kompasu',
    content: `
      <h3>🧭 Orientacja w terenie</h3>

      <h4>☀️ Według słońca:</h4>
      <ul>
        <li><strong>Południe:</strong> Słońce na południu</li>
        <li><strong>Wschód:</strong> Rano po lewej stronie</li>
        <li><strong>Zachód:</strong> Wieczorem po prawej stronie</li>
      </ul>

      <h4>⭐ Według gwiazd:</h4>
      <ul>
        <li><strong>Gwiazda Polarna:</strong> Wskazuje północ</li>
        <li><strong>Wielki Wóz:</strong> Pomaga znaleźć Polarną</li>
      </ul>

      <h4>🌲 Według przyrody:</h4>
      <ul>
        <li><strong>Mech:</strong> Częściej po stronie północnej</li>
        <li><strong>Korona drzew:</strong> Gęstsza po południu</li>
      </ul>
    `
  },
  {
    id: 'compass-basics',
    name: 'Podstawy kompasu',
    category: 'Orientacja',
    icon: 'compass_calibration',
    color: 'green',
    description: 'Obsługa kompasu i wyznaczanie azymutów',
    content: `
      <h3>🧭 Podstawy kompasu</h3>

      <h4>📐 Kierunki główne:</h4>
      <ul>
        <li><strong>0°/360°:</strong> Północ</li>
        <li><strong>90°:</strong> Wschód</li>
        <li><strong>180°:</strong> Południe</li>
        <li><strong>270°:</strong> Zachód</li>
      </ul>

      <h4>🎯 Wyznaczanie azymutu:</h4>
      <ol>
        <li>Trzymaj kompas poziomo</li>
        <li>Wyceluj w cel</li>
        <li>Odczytaj wartość</li>
      </ol>

      <h4>🔄 Azymut powrotny:</h4>
      <p>Dodaj lub odejmij 180°</p>
    `
  },
  {
    id: 'march-azimuth',
    name: 'Marsz na azymut',
    category: 'Orientacja',
    icon: 'directions_walk',
    color: 'green',
    description: 'Techniki przemieszczania się na zadany kierunek',
    content: `
      <h3>🚶 Marsz na azymut</h3>

      <h4>📋 Przygotowanie:</h4>
      <ol>
        <li>Wyznacz azymut na mapie</li>
        <li>Ustaw kompas</li>
        <li>Wybierz punkt pośredni</li>
      </ol>

      <h4>🚶 Wykonanie marszu:</h4>
      <ul>
        <li><strong>Wybierz cel pośredni</strong> na linii azymutu</li>
        <li><strong>Idź do celu</strong> nie patrząc na kompas</li>
        <li><strong>Po osiągnięciu</strong> wybierz kolejny punkt</li>
      </ul>

      <h4>🌲 Omijanie przeszkód:</h4>
      <ol>
        <li>Zapamiętaj azymut podstawowy</li>
        <li>Obejdź przeszkodę pod kątem prostym</li>
        <li>Wróć do linii azymutu</li>
      </ol>
    `
  },
  {
    id: 'position-finding',
    name: 'Określanie pozycji',
    category: 'Orientacja',
    icon: 'my_location',
    color: 'green',
    description: 'Metody ustalania własnego położenia',
    content: `
      <h3>📍 Określanie pozycji</h3>

      <h4>🎯 Triangulacja:</h4>
      <ol>
        <li>Znajdź 2-3 punkty charakterystyczne</li>
        <li>Zmierz azymuty do każdego</li>
        <li>Nanieś linie na mapę</li>
        <li>Przecięcie = Twoja pozycja</li>
      </ol>

      <h4>📐 Metoda przesunięcia:</h4>
      <ul>
        <li>Zorientuj mapę</li>
        <li>Znajdź linię charakterystyczną</li>
        <li>Wyznacz pozycję na linii</li>
      </ul>
    `
  },

  // Mapy topograficzne
  {
    id: 'map-reading',
    name: 'Czytanie map',
    category: 'Mapa topograficzna',
    icon: 'map',
    color: 'blue',
    description: 'Podstawy interpretacji map topograficznych',
    content: `
      <h3>🗺️ Czytanie map</h3>

      <h4>📏 Skale wojskowe:</h4>
      <ul>
        <li><strong>1:25 000:</strong> Mapa szczegółowa</li>
        <li><strong>1:50 000:</strong> Mapa taktyczna</li>
        <li><strong>1:100 000:</strong> Mapa operacyjna</li>
      </ul>

      <h4>🏔️ Warstwice:</h4>
      <ul>
        <li><strong>Blisko siebie:</strong> Teren stromy</li>
        <li><strong>Daleko:</strong> Teren płaski</li>
        <li><strong>Grube linie:</strong> Co 50m wysokości</li>
      </ul>
    `
  },
  {
    id: 'map-symbols',
    name: 'Znaki topograficzne',
    category: 'Mapa topograficzna',
    icon: 'legend_toggle',
    color: 'blue',
    description: 'Najważniejsze symbole na mapach',
    content: `
      <h3>Znaki topograficzne</h3>

      <h4>Zabudowa:</h4>
      <ul>
        <li><strong>Czarny prostokąt:</strong> Budynek</li>
        <li><strong>Czerwone linie:</strong> Drogi główne</li>
        <li><strong>Żółte linie:</strong> Drogi lokalne</li>
      </ul>

      <h4>Wody:</h4>
      <ul>
        <li><strong>Niebieskie linie:</strong> Rzeki</li>
        <li><strong>Niebieskie obszary:</strong> Jeziora</li>
      </ul>

      <h4>Roślinność:</h4>
      <ul>
        <li><strong>Zielone obszary:</strong> Lasy</li>
        <li><strong>Białe obszary:</strong> Pola, łąki</li>
      </ul>
    `
  },
  {
    id: 'coordinates',
    name: 'Współrzędne',
    category: 'Mapa topograficzna',
    icon: 'grid_3x3',
    color: 'blue',
    description: 'System współrzędnych prostokątnych',
    content: `
      <h3>📐 Współrzędne</h3>

      <h4>🗺️ System kwadratowy:</h4>
      <ul>
        <li><strong>Siatka 1km:</strong> Duże kwadraty</li>
        <li><strong>Siatka 100m:</strong> Małe kwadraty</li>
      </ul>

      <h4>📍 Podawanie pozycji:</h4>
      <ol>
        <li>Znajdź kwadrat kilometrowy</li>
        <li>Określ pozycję w kwadracie</li>
        <li>Podaj współrzędne: X Y</li>
      </ol>

      <h4>🎯 Przykład:</h4>
      <p><strong>Pozycja:</strong> 1234 5678<br>
      <strong>Dokładność:</strong> 100m</p>
    `
  },

  // Nawigacja
  {
    id: 'route-planning',
    name: 'Planowanie trasy',
    category: 'Nawigacja',
    icon: 'route',
    color: 'orange',
    description: 'Wybór optymalnej trasy przemieszczania',
    content: `
      <h3>🗺️ Planowanie trasy</h3>

      <h4>📋 Etapy planowania:</h4>
      <ol>
        <li>Określ punkt startowy i docelowy</li>
        <li>Przeanalizuj teren</li>
        <li>Wybierz punkty pośrednie</li>
        <li>Wyznacz azymuty</li>
        <li>Oszacuj czas marszu</li>
      </ol>

      <h4>⚠️ Unikaj:</h4>
      <ul>
        <li>Terenów bagnistych</li>
        <li>Stromych zboczy</li>
        <li>Gęstej zabudowy</li>
        <li>Głównych dróg</li>
      </ul>
    `
  },
  {
    id: 'distance-time',
    name: 'Odległość i czas',
    category: 'Nawigacja',
    icon: 'schedule',
    color: 'orange',
    description: 'Szacowanie czasu przemieszczania',
    content: `
      <h3>⏱️ Odległość i czas</h3>

      <h4>📏 Pomiar odległości:</h4>
      <ul>
        <li><strong>Linijka:</strong> Proste odcinki</li>
        <li><strong>Sznurek:</strong> Krętą trasę</li>
        <li><strong>Cyrkiel:</strong> Przenoszenie odległości</li>
      </ul>

      <h4>🚶 Szybkość marszu:</h4>
      <ul>
        <li><strong>Teren płaski:</strong> 4-5 km/h</li>
        <li><strong>Teren falisty:</strong> 3-4 km/h</li>
        <li><strong>Teren górzysty:</strong> 2-3 km/h</li>
      </ul>
    `
  },
  {
    id: 'navigation-night',
    name: 'Nawigacja nocna',
    category: 'Nawigacja',
    icon: 'nights_stay',
    color: 'orange',
    description: 'Specyfika poruszania się w nocy',
    content: `
      <h3>🌙 Nawigacja nocna</h3>

      <h4>👁️ Adaptacja wzroku:</h4>
      <ul>
        <li><strong>15-30 minut:</strong> Pełna adaptacja</li>
        <li><strong>Czerwone światło:</strong> Nie psuje widzenia nocnego</li>
        <li><strong>Unikaj:</strong> Białego światła</li>
      </ul>

      <h4>🎯 Techniki:</h4>
      <ul>
        <li>Patrz obok obiektu (widzenie boczne)</li>
        <li>Używaj charakterystycznych konturów</li>
        <li>Idź wolniej i ostrożniej</li>
        <li>Sprawdzaj kompas częściej</li>
      </ul>
    `
  },

  // Sprzęt nawigacyjny
  {
    id: 'military-compass',
    name: 'Kompas wojskowy',
    category: 'Sprzęt nawigacyjny',
    icon: 'compass_calibration',
    color: 'purple',
    description: 'Rodzaje i obsługa kompasów wojskowych',
    content: `
      <h3>🧭 Kompas wojskowy</h3>

      <h4>🎯 Typy kompasów:</h4>
      <ul>
        <li><strong>Kompas z celownikiem:</strong> Precyzyjny pomiar</li>
        <li><strong>Kompas płytkowy:</strong> Szybki odczyt</li>
        <li><strong>Kompas na nadgarstek:</strong> Zawsze dostępny</li>
      </ul>

      <h4>⚙️ Obsługa:</h4>
      <ol>
        <li>Trzymaj poziomo</li>
        <li>Z dala od metalu</li>
        <li>Czekaj na ustalenie się igły</li>
        <li>Odczytaj wartość</li>
      </ol>

      <h4>⚠️ Błędy:</h4>
      <ul>
        <li>Deklinacja magnetyczna (+4° w Polsce)</li>
        <li>Zakłócenia od metalu</li>
        <li>Linie wysokiego napięcia</li>
      </ul>
    `
  },
  {
    id: 'gps-basics',
    name: 'GPS w terenie',
    category: 'Sprzęt nawigacyjny',
    icon: 'gps_fixed',
    color: 'purple',
    description: 'Praktyczne wykorzystanie GPS',
    content: `
      <h3>📡 GPS w terenie</h3>

      <h4>📱 Podstawowe funkcje:</h4>
      <ul>
        <li><strong>Pozycja:</strong> Aktualne współrzędne</li>
        <li><strong>Waypoint:</strong> Zapisz ważne punkty</li>
        <li><strong>Go To:</strong> Nawigacja do celu</li>
        <li><strong>Track:</strong> Zapis przebytej trasy</li>
      </ul>

      <h4>⚙️ Ustawienia:</h4>
      <ul>
        <li><strong>Format:</strong> MGRS lub UTM</li>
        <li><strong>Datum:</strong> WGS84</li>
        <li><strong>Jednostki:</strong> Metryczne</li>
      </ul>

      <h4>🔋 Oszczędzanie baterii:</h4>
      <ul>
        <li>Używaj trybu oszczędzania</li>
        <li>Wyłącz niepotrzebne funkcje</li>
        <li>Miej zapasowe baterie</li>
        <li>Zawsze noś mapę i kompas!</li>
      </ul>
    `
  }
]

const filteredTopics = computed(() => {
  if (!selectedCategory.value) return []
  return allTopics.filter(topic => topic.category === selectedCategory.value.name)
})

const selectCategory = (category) => {
  selectedCategory.value = selectedCategory.value?.id === category.id ? null : category
  selectedTopic.value = null
}

const selectTopic = (topic) => {
  selectedTopic.value = topic
}

const goBack = () => {
  selectedTopic.value = null
}
</script>

<style scoped>
.topography-page {
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

.categories-card,
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

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.topic-card-wrapper {
  height: 100%;
}

.topic-card {
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.topic-image {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(21, 101, 192, 0.1) 100%);
  border-radius: 16px 16px 0 0;
}

.topic-list-item {
  border-radius: 12px;
  transition: all 0.2s ease;
}

.topic-list-item:hover {
  transform: translateX(8px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.category-header {
  padding: 24px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  backdrop-filter: blur(10px);
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

.content-text p {
  margin: 0.5rem 0;
}

.mobile-column {
  flex-direction: row;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .mobile-column {
    flex-direction: column !important;
  }

  .col-lg-3,
  .col-lg-9 {
    width: 100%;
  }

  .topics-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 8px !important;
  }

  .page-header {
    padding: 16px;
    margin-bottom: 16px !important;
  }

  .page-header .row {
    gap: 12px !important;
  }

  .page-header .text-h4 {
    font-size: 1.5rem;
  }

  .row.q-gutter-lg {
    gap: 12px !important;
  }

  .topics-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .topic-card {
    margin-bottom: 0;
  }

  .topic-image {
    height: 60px;
  }

  .content-text {
    font-size: 0.9rem;
  }

  .categories-card .q-card__section {
    padding: 12px;
  }

  .topic-list-item {
    margin-bottom: 8px !important;
  }

  .category-header {
    padding: 16px;
    margin-bottom: 16px !important;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 4px !important;
  }

  .page-header {
    padding: 12px;
    margin-bottom: 12px !important;
  }

  .page-header .row {
    flex-direction: column;
    text-align: center;
    gap: 8px !important;
  }

  .page-header .text-h4 {
    font-size: 1.25rem;
  }

  .page-header .text-subtitle1 {
    font-size: 0.9rem;
  }

  .row.q-gutter-lg {
    gap: 8px !important;
  }

  .topics-grid {
    gap: 8px;
  }

  .topic-card {
    border-radius: 12px;
  }

  .topic-image {
    height: 50px;
  }

  .topic-card .q-card__section {
    padding: 12px;
  }

  .topic-card .q-card__actions {
    padding: 8px 12px;
  }

  .content-header {
    padding: 16px !important;
    margin: -16px -16px 0 -16px !important;
  }

  .content-header .row {
    gap: 8px !important;
  }

  .content-header .text-h5 {
    font-size: 1.1rem;
  }

  .content-body {
    max-height: 400px;
    padding: 12px;
  }

  .content-text {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .content-text h3 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  .content-text h4 {
    font-size: 1rem;
    margin: 1rem 0 0.5rem 0;
  }

  .categories-card .card-header {
    padding: 12px;
    font-size: 0.9rem;
  }

  .categories-card .q-item {
    min-height: 44px;
    padding: 8px 12px;
  }

  .category-header {
    padding: 12px;
    margin-bottom: 12px !important;
  }

  .topic-list-item {
    margin-bottom: 6px !important;
  }

  .topic-list-item .q-card__section {
    padding: 12px;
  }

  .topic-list-item .row {
    gap: 8px !important;
  }

  .topic-list-item .text-h6 {
    font-size: 1rem;
  }

  .topic-list-item .text-body2 {
    font-size: 0.8rem;
  }
}
</style>
