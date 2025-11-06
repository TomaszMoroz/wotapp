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

      <!-- Kafelki artykułów -->
      <div class="topics-grid">
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

      <!-- Modal dla artykułów, które nie mają dedykowanych stron -->
      <q-dialog v-model="showArticleModal" maximized transition-show="slide-up" transition-hide="slide-down">
        <q-card class="article-modal">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h5 text-weight-bold">{{ selectedTopic?.name }}</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="goBack" />
          </q-card-section>

          <q-card-section class="article-content q-pa-lg">
            <div v-if="selectedTopic?.content" v-html="selectedTopic.content"></div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'TopographyPage'
})

const selectedTopic = ref(null)
const router = useRouter()

const showArticleModal = computed(() => !!selectedTopic.value)

const allTopics = [
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
    name: 'Współrzędne MGRS',
    category: 'Systemy współrzędnych',
    icon: 'grid_3x3',
    color: 'blue',
    description: 'Military Grid Reference System - NATO',
    content: `
      <h3>System współrzędnych MGRS</h3>

      <div style="text-align: center; margin: 20px 0;">
        <img src="/mgrs.png" alt="MGRS System" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
      </div>

      <h4>Opis systemu:</h4>
      <p>MGRS, czyli Military Grid Reference System, to standard systemu współrzędnych używany przez wojsko (np. NATO) do precyzyjnego określania położenia na mapach. System ten opiera się na siatce prostokątnej, która dzieli Ziemię na strefy i kwadraty, a jego celem jest ułatwienie szybkiej i dokładnej lokalizacji obiektów oraz meldowania pozycji.</p>

      <h4>System siatki:</h4>
      <p>MGRS tworzy ogólnoświatową siatkę opartą na systemach UTM (Universal Transverse Mercator) i UPS (Universal Polar Stereographic).</p>

      <h4>Strefy:</h4>
      <p>Dzieli on świat na 60 stref podłużnych (każda 6° szerokości) i 20 stref poprzecznych (każda 8° wysokości), oznaczanych literami od C do X (z wyłączeniem I i O).</p>

      <h4>Identyfikacja kwadratów:</h4>
      <p>W ramach każdej strefy tworzone są kwadraty o wymiarach 100x100 km, identyfikowane za pomocą dwuliterowych oznaczeń (np. w przykładzie 34U DC 98765 43210, DC to identyfikator kwadratu 100 km).</p>

      <h4>Określanie pozycji:</h4>
      <p>Współrzędna podaje pełny adres, który składa się z identyfikatora strefy (np. 34U), identyfikatora kwadratu 100 km (np. DC) oraz współrzędnych liczbowych w metrach (np. 98765 43210), które precyzują położenie w obrębie danego kwadratu.</p>

      <h4>Zastosowanie:</h4>
      <p>Jest używany do lokalizowania obiektów, określania własnej pozycji i wskazywania celów podczas operacji lądowych, a także do precyzyjnego pozycjonowania GPS.</p>

      <h4>Przykład - Warszawa:</h4>
      <ul>
        <li><strong>Pełna współrzędna:</strong> 34U DC 98765 43210</li>
        <li><strong>Strefa:</strong> 34U (strefa UTM dla Polski)</li>
        <li><strong>Kwadrat 100km:</strong> DC</li>
        <li><strong>Pozycja w kwadracie:</strong> 98765 43210 (dokładność 1m)</li>
      </ul>
    `
  },
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

const selectTopic = (topic) => {
  // Kierowanie do dedykowanych stron dla artykułów
  if (topic.id === 'coordinates') {
    router.push('/topography/mgrs')
  } else {
    // Dla innych artykułów wyświetl zawartość w modal
    selectedTopic.value = topic
  }
}

const goBack = () => {
  selectedTopic.value = null
}
</script>

<style lang="scss" scoped>
.topography-page {
  background: radial-gradient(ellipse at top, rgba(16, 24, 40, 0.1) 0%, transparent 50%),
              linear-gradient(to bottom, var(--q-dark) 0%, #0f1419 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  padding: 2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.topic-card-wrapper {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.topic-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--q-primary);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
}

.topic-image {
  text-align: center;
  padding: 2rem 1rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px 12px 0 0;
}

.article-modal {
  background: var(--q-dark);
  max-height: 100vh;
  overflow-y: auto;
}

.article-content {
  :deep(h3) {
    color: var(--q-primary);
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  :deep(h4) {
    color: #ffffff;
    margin: 1.5rem 0 0.75rem;
    font-size: 1.2rem;
    font-weight: 500;
  }

  :deep(ul), :deep(ol) {
    margin: 0.5rem 0 1rem 1.5rem;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
  }

  :deep(p) {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  :deep(strong) {
    color: var(--q-accent);
    font-weight: 600;
  }
}

@media (max-width: 768px) {
  .topics-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .topic-card-wrapper:hover {
    transform: none;
  }
}
</style>
