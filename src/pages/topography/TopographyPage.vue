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

      <div class="row q-gutter-lg">
        <!-- Panel kategorii -->
        <div class="col-12 col-lg-3">
          <q-card class="categories-card">
            <q-card-section class="card-header">
              <div class="text-h6 text-weight-bold">🧭 Kategorie</div>
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
                <q-card-actions class="q-pa-md">
                  <q-chip size="sm" :color="topic.color" text-color="white" icon="schedule">
                    {{ topic.readTime }}
                  </q-chip>
                  <q-space />
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
                    <div class="text-right">
                      <q-chip size="sm" :color="topic.color" text-color="white" icon="schedule">
                        {{ topic.readTime }}
                      </q-chip>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div v-else class="topic-content">
            <q-card class="content-card">
              <q-card-section class="content-header">
                <div class="row items-center justify-between">
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
                  <q-chip color="rgba(255,255,255,0.2)" text-color="white" icon="schedule">
                    {{ selectedTopic.readTime }}
                  </q-chip>
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
    id: 'maps',
    name: 'Mapy',
    icon: 'map',
    color: 'blue',
    count: 3
  },
  {
    id: 'orientation',
    name: 'Orientacja',
    icon: 'explore',
    color: 'green',
    count: 2
  },
  {
    id: 'terrain',
    name: 'Analiza terenu',
    icon: 'terrain',
    color: 'orange',
    count: 2
  },
  {
    id: 'coordinates',
    name: 'Współrzędne',
    icon: 'grid_3x3',
    color: 'purple',
    count: 2
  }
]

const allTopics = [
  // Maps
  {
    id: 'map-reading',
    name: 'Czytanie map topograficznych',
    category: 'Mapy',
    icon: 'map',
    color: 'blue',
    readTime: '10 min',
    description: 'Podstawowe umiejętności interpretacji map topograficznych',
    content: `
      <h3>🗺️ Czytanie map topograficznych</h3>
      <p><strong>Mapa topograficzna</strong> to szczegółowe przedstawienie powierzchni ziemi z uwzględnieniem rzeźby terenu, obiektów naturalnych i sztucznych.</p>
      
      <h4>📏 Skale map:</h4>
      <ul>
        <li><strong>1:10 000:</strong> Mapa bardzo szczegółowa (1 cm = 100 m)</li>
        <li><strong>1:25 000:</strong> Mapa szczegółowa (1 cm = 250 m)</li>
        <li><strong>1:50 000:</strong> Mapa taktyczna (1 cm = 500 m)</li>
        <li><strong>1:100 000:</strong> Mapa operacyjna (1 cm = 1 km)</li>
      </ul>

      <h4>🔤 Elementy mapy:</h4>
      <ul>
        <li><strong>Tytuł mapy:</strong> Nazwa obszaru i skala</li>
        <li><strong>Legenda:</strong> Objaśnienie znaków umownych</li>
        <li><strong>Siatka współrzędnych:</strong> Linie pomocnicze do określania pozycji</li>
        <li><strong>Róża wiatrów:</strong> Wskazanie kierunków geograficznych</li>
        <li><strong>Deklinacja magnetyczna:</strong> Różnica między północą geograficzną a magnetyczną</li>
      </ul>

      <h4>🏔️ Warstwice:</h4>
      <ul>
        <li><strong>Definicja:</strong> Linie łączące punkty o tej samej wysokości</li>
        <li><strong>Poziomice podstawowe:</strong> Grubsze linie co 10-50 m</li>
        <li><strong>Poziomice pomocnicze:</strong> Cieńsze linie co 2-10 m</li>
        <li><strong>Punkt wysokościowy:</strong> Dokładna wysokość punktu terenowego</li>
      </ul>

      <h4>🎯 Praktyczne zastosowanie:</h4>
      <ol>
        <li>Zorientuj mapę według kompasu</li>
        <li>Znajdź swoją pozycję na mapie</li>
        <li>Zaplanuj trasę przemieszczania</li>
        <li>Określ charakterystyczne punkty orientacyjne</li>
        <li>Oszacuj czas marszu</li>
      </ol>
    `
  },
  {
    id: 'map-symbols',
    name: 'Znaki umowne map topograficznych',
    category: 'Mapy',
    icon: 'legend_toggle',
    color: 'blue',
    readTime: '8 min',
    description: 'Interpretacja symboli i znaków używanych na mapach',
    content: `
      <h3>🔣 Znaki umowne map topograficznych</h3>
      <p>Znaki umowne to symbole graficzne przedstawiające różne obiekty i zjawiska na mapie.</p>
      
      <h4>🏘️ Obiekty osadnicze:</h4>
      <ul>
        <li><strong>Miasto:</strong> Wypełniony prostokąt lub okrąg</li>
        <li><strong>Wieś:</strong> Otwarty prostokąt</li>
        <li><strong>Zabudowa zwarta:</strong> Ciemny obszar</li>
        <li><strong>Zabudowa rozproszona:</strong> Pojedyncze kwadraty</li>
        <li><strong>Budynek sakralny:</strong> Krzyż lub symbol religijny</li>
      </ul>

      <h4>🛣️ Sieć komunikacyjna:</h4>
      <ul>
        <li><strong>Autostrada:</strong> Podwójna linia z podziałem</li>
        <li><strong>Droga główna:</strong> Gruba czerwona linia</li>
        <li><strong>Droga lokalna:</strong> Żółta lub biała linia</li>
        <li><strong>Ścieżka:</strong> Przerywana ciemna linia</li>
        <li><strong>Linia kolejowa:</strong> Linia z poprzeczkami</li>
      </ul>

      <h4>💧 Wody:</h4>
      <ul>
        <li><strong>Rzeka:</strong> Niebieska linia (grubość według wielkości)</li>
        <li><strong>Jezioro:</strong> Niebieska powierzchnia</li>
        <li><strong>Bagno:</strong> Specjalne znaczki na niebieskim tle</li>
        <li><strong>Źródło:</strong> Mały kółko z kropką</li>
        <li><strong>Wodospad:</strong> Poprzeczka przez rzekę</li>
      </ul>

      <h4>🌲 Roślinność:</h4>
      <ul>
        <li><strong>Las iglasty:</strong> Ciemne trójkąty</li>
        <li><strong>Las liściasty:</strong> Okrągłe korony</li>
        <li><strong>Las mieszany:</strong> Kombinacja symboli</li>
        <li><strong>Pojedyncze drzewo:</strong> Jeden symbol drzewa</li>
        <li><strong>Sad:</strong> Regularne rozmieszczenie drzew</li>
      </ul>

      <h4>⚡ Obiekty specjalne:</h4>
      <ul>
        <li><strong>Linia energetyczna:</strong> Linia z krzyżykami</li>
        <li><strong>Masz/wieża:</strong> Kwadrat z wysokością</li>
        <li><strong>Cmentarz:</strong> Krzyżyki w prostokącie</li>
        <li><strong>Kamieniołom:</strong> Zębate brzegi</li>
        <li><strong>Punkt triangulacyjny:</strong> Trójkąt z kropką</li>
      </ul>
    `
  },
  {
    id: 'scale-distance',
    name: 'Skala mapy i pomiar odległości',
    category: 'Mapy',
    icon: 'straighten',
    color: 'blue',
    readTime: '7 min',
    description: 'Obliczanie rzeczywistych odległości na podstawie mapy',
    content: `
      <h3>📏 Skala mapy i pomiar odległości</h3>
      <p>Skala mapy określa stosunek odległości na mapie do rzeczywistej odległości w terenie.</p>
      
      <h4>🔢 Rodzaje skal:</h4>
      <ul>
        <li><strong>Skala liczbowa:</strong> 1:25 000 (1 cm na mapie = 250 m w terenie)</li>
        <li><strong>Skala liniowa:</strong> Graficzne przedstawienie odległości</li>
        <li><strong>Skala słowna:</strong> "jeden centymetr odpowiada 250 metrom"</li>
      </ul>

      <h4>📐 Obliczanie odległości:</h4>
      <ol>
        <li><strong>Zmierz odległość na mapie</strong> (cm, mm)</li>
        <li><strong>Pomnóż przez mianownik skali</strong></li>
        <li><strong>Przeliczy na odpowiednie jednostki</strong></li>
      </ol>

      <p><strong>Przykład:</strong> Na mapie 1:25 000 odległość wynosi 4 cm</p>
      <p>Rzeczywista odległość: 4 cm × 25 000 = 100 000 cm = 1 000 m = 1 km</p>

      <h4>🛠️ Narzędzia pomiarowe:</h4>
      <ul>
        <li><strong>Linijka:</strong> Do pomiarów prostych odległości</li>
        <li><strong>Cyrkiel:</strong> Do przenoszenia odległości</li>
        <li><strong>Krzywimetrz:</strong> Do pomiarów tras krętych</li>
        <li><strong>Sznurek:</strong> Alternatywa dla krzywimetrza</li>
      </ul>

      <h4>🎯 Praktyczne wskazówki:</h4>
      <ul>
        <li>Zawsze sprawdź skalę przed rozpoczęciem pomiarów</li>
        <li>Uwzględnij rzeźbę terenu (rzeczywista trasa może być dłuższa)</li>
        <li>Dodaj 10-20% do odległości w terenie górzystym</li>
        <li>Korzystaj ze skali liniowej dla większej dokładności</li>
      </ul>

      <h4>📊 Przydatne przeliczenia:</h4>
      <ul>
        <li><strong>1:10 000:</strong> 1 cm = 100 m</li>
        <li><strong>1:25 000:</strong> 1 cm = 250 m</li>
        <li><strong>1:50 000:</strong> 1 cm = 500 m</li>
        <li><strong>1:100 000:</strong> 1 cm = 1 km</li>
      </ul>
    `
  },

  // Orientation
  {
    id: 'compass-navigation',
    name: 'Nawigacja kompasowa',
    category: 'Orientacja',
    icon: 'explore',
    color: 'green',
    readTime: '12 min',
    description: 'Orientacja w terenie za pomocą kompasu i mapy',
    content: `
      <h3>🧭 Nawigacja kompasowa</h3>
      <p>Kompas jest podstawowym narzędziem nawigacji terenowej, pozwalającym określić kierunki geograficzne.</p>
      
      <h4>🎯 Rodzaje kompasów:</h4>
      <ul>
        <li><strong>Kompas magnetyczny:</strong> Wykorzystuje pole magnetyczne Ziemi</li>
        <li><strong>Kompas żyroskopowy:</strong> Wykorzystuje siły bezwładności</li>
        <li><strong>Kompas elektroniczny:</strong> GPS i czujniki cyfrowe</li>
      </ul>

      <h4>📐 Azymut:</h4>
      <p>Azymut to kąt mierzony od północy (0°) w kierunku ruchu wskazówek zegara.</p>
      <ul>
        <li><strong>0° (360°):</strong> Północ</li>
        <li><strong>90°:</strong> Wschód</li>
        <li><strong>180°:</strong> Południe</li>
        <li><strong>270°:</strong> Zachód</li>
      </ul>

      <h4>🧮 Określanie azymutu:</h4>
      <ol>
        <li>Trzymaj kompas poziomo przed sobą</li>
        <li>Wyceluj w kierunek celu</li>
        <li>Odczytaj wartość na kole kompasu</li>
        <li>Uwzględnij deklinację magnetyczną</li>
      </ol>

      <h4>🔄 Azymut przeciwny:</h4>
      <p>Służy do powrotu tą samą trasą:</p>
      <ul>
        <li><strong>Jeśli azymut < 180°:</strong> Dodaj 180°</li>
        <li><strong>Jeśli azymut ≥ 180°:</strong> Odejmij 180°</li>
      </ul>

      <h4>⚠️ Deklinacja magnetyczna:</h4>
      <p>Różnica między północą geograficzną (prawdziwą) a magnetyczną:</p>
      <ul>
        <li><strong>Deklinacja wschodnia (+):</strong> Dodaj do odczytu</li>
        <li><strong>Deklinacja zachodnia (-):</strong> Odejmij od odczytu</li>
        <li><strong>W Polsce:</strong> Ok. 4-6° wschodnia</li>
      </ul>

      <h4>🎯 Orientacja mapy:</h4>
      <ol>
        <li>Połóż mapę na płaskiej powierzchni</li>
        <li>Ustaw kompas równolegle do ramki mapy</li>
        <li>Obracaj mapę, aż igła wskaże północ</li>
        <li>Mapa jest teraz zorientowana</li>
      </ol>
    `
  },
  {
    id: 'triangulation',
    name: 'Triangulacja i określanie pozycji',
    category: 'Orientacja',
    icon: 'my_location',
    color: 'green',
    readTime: '10 min',
    description: 'Metody precyzyjnego określania własnej pozycji',
    content: `
      <h3>📍 Triangulacja i określanie pozycji</h3>
      <p>Triangulacja pozwala określić dokładną pozycję na podstawie pomiarów azymutów do znanych punktów.</p>
      
      <h4>🎯 Zasada triangulacji:</h4>
      <p>Przecięcie się linii azymutowych z co najmniej dwóch znanych punktów wskazuje naszą pozycję.</p>

      <h4>📐 Triangulacja dwupunktowa:</h4>
      <ol>
        <li>Znajdź dwa charakterystyczne punkty w terenie</li>
        <li>Zidentyfikuj je na mapie</li>
        <li>Zmierz azymut do pierwszego punktu</li>
        <li>Zmierz azymut do drugiego punktu</li>
        <li>Nanieś linie na mapę - miejsce przecięcia to Twoja pozycja</li>
      </ol>

      <h4>🎯 Triangulacja trzypunktowa:</h4>
      <p>Wykorzystuje trzy punkty dla większej dokładności:</p>
      <ol>
        <li>Wybierz trzy punkty rozłożone szeroko</li>
        <li>Zmierz azymuty do wszystkich punktów</li>
        <li>Nanieś linie na mapę</li>
        <li>Prawidłowa pozycja to środek "trójkąta błędów"</li>
      </ol>

      <h4>📊 Resection (triangulacja odwrotna):</h4>
      <p>Określanie pozycji gdy nie znamy początkowo swojego położenia:</p>
      <ol>
        <li>Zidentyfikuj trzy znane punkty w terenie</li>
        <li>Zmierz azymuty do tych punktów</li>
        <li>Oblicz azymuty przeciwne</li>
        <li>Nanieś linie z punktów na mapę</li>
        <li>Miejsce przecięcia = Twoja pozycja</li>
      </ol>

      <h4>🎯 Metody pomocnicze:</h4>
      <ul>
        <li><strong>Intersection:</strong> Określanie pozycji odległego obiektu</li>
        <li><strong>Śledzenie pozycji:</strong> Ciągłe aktualizowanie współrzędnych</li>
        <li><strong>Nawigacja po azymutach:</strong> Przemieszczanie się według zaplanowanej trasy</li>
      </ul>

      <h4>⚠️ Źródła błędów:</h4>
      <ul>
        <li>Nieprecyzyjny odczyt kompasu</li>
        <li>Błędna identyfikacja punktów orientacyjnych</li>
        <li>Deklinacja magnetyczna</li>
        <li>Zakłócenia magnetyczne (metal, linie wysokiego napięcia)</li>
        <li>Błędy w nanoszeniu na mapę</li>
      </ul>

      <h4>🔧 Wskazówki praktyczne:</h4>
      <ul>
        <li>Wybieraj punkty oddalone o 30-60° od siebie</li>
        <li>Korzystaj z wyraźnych, stałych punktów orientacyjnych</li>
        <li>Wykonuj pomiary z pozycji stabilnej</li>
        <li>Sprawdzaj wyniki przez powtórne pomiary</li>
      </ul>
    `
  },

  // Terrain Analysis
  {
    id: 'terrain-tactical',
    name: 'Analiza terenu pod kątem taktycznym',
    category: 'Analiza terenu',
    icon: 'terrain',
    color: 'orange',
    readTime: '15 min',
    description: 'Ocena terenu dla potrzeb działań bojowych',
    content: `
      <h3>🏔️ Analiza terenu pod kątem taktycznym</h3>
      <p>Właściwa analiza terenu jest kluczowa dla planowania i prowadzenia działań bojowych.</p>
      
      <h4>🔍 Metoda KOCOA:</h4>
      <ul>
        <li><strong>K - Kluczowy teren:</strong> Punkty decydujące o powodzeniu misji</li>
        <li><strong>O - Obserwacja i pola ostrzału:</strong> Możliwości obserwacji i prowadzenia ognia</li>
        <li><strong>C - Cover and Concealment:</strong> Osłony i ukrycia</li>
        <li><strong>O - Obstacles:</strong> Przeszkody naturalne i sztuczne</li>
        <li><strong>A - Avenues of Approach:</strong> Drogi zbliżenia</li>
      </ul>

      <h4>📍 Kluczowy teren:</h4>
      <p>Obszary których kontrola daje przewagę taktyczną:</p>
      <ul>
        <li><strong>Wysokie punkty:</strong> Wzgórza, wzniesienia</li>
        <li><strong>Węzły komunikacyjne:</strong> Skrzyżowania, mosty</li>
        <li><strong>Przeprawy:</strong> Brody, wiadukty</li>
        <li><strong>Budynki dominujące:</strong> Punkty obserwacyjne</li>
        <li><strong>Wąskie przejścia:</strong> Wąwozy, defilady</li>
      </ul>

      <h4>👁️ Obserwacja i pola ostrzału:</h4>
      <ul>
        <li><strong>Linia horyzontu:</strong> Maksymalny zasięg obserwacji</li>
        <li><strong>Martwe przestrzenie:</strong> Obszary niewidoczne</li>
        <li><strong>Pola ostrzału:</strong> Obszary skutecznego prowadzenia ognia</li>
        <li><strong>Sektory obserwacji:</strong> Przydzielone obszary nadzoru</li>
      </ul>

      <h4>🛡️ Osłony i ukrycia:</h4>
      <ul>
        <li><strong>Osłona (Cover):</strong> Ochrona przed ogniem przeciwnika</li>
        <li><strong>Ukrycie (Concealment):</strong> Ochrona przed obserwacją</li>
        <li><strong>Pozycje strzeleckie:</strong> Miejsca prowadzenia ognia</li>
        <li><strong>Drogi podejścia:</strong> Ukryte trasy przemieszczania</li>
      </ul>

      <h4>🚧 Przeszkody:</h4>
      <ul>
        <li><strong>Naturalne:</strong> Rzeki, wąwozy, bagna, lasy</li>
        <li><strong>Sztuczne:</strong> Rowy, mury, zasieki</li>
        <li><strong>Kombinowane:</strong> Fortyfikacje w terenie</li>
        <li><strong>Czasowe:</strong> Pogoda, pora dnia</li>
      </ul>

      <h4>🛣️ Drogi zbliżenia:</h4>
      <ul>
        <li><strong>Główne:</strong> Szerokie, szybkie, łatwo obserwowane</li>
        <li><strong>Drugorzędne:</strong> Węższe, wolniejsze, mniej widoczne</li>
        <li><strong>Ukryte:</strong> Przez lasy, wąwozy, zabudowę</li>
        <li><strong>Powietrzne:</strong> Lądowiska helikopterów</li>
      </ul>

      <h4>📋 Praktyczne zastosowanie:</h4>
      <ol>
        <li>Określ cele misji</li>
        <li>Zidentyfikuj kluczowy teren</li>
        <li>Oceń możliwości obserwacji</li>
        <li>Znajdź osłony i ukrycia</li>
        <li>Zlokalizuj przeszkody</li>
        <li>Wyznacz drogi zbliżenia</li>
        <li>Opracuj plan działania</li>
      </ol>
    `
  },
  {
    id: 'weather-terrain',
    name: 'Wpływ pogody na warunki terenowe',
    category: 'Analiza terenu',
    icon: 'cloud',
    color: 'orange',
    readTime: '8 min',
    description: 'Jak warunki atmosferyczne wpływają na działania w terenie',
    content: `
      <h3>🌤️ Wpływ pogody na warunki terenowe</h3>
      <p>Warunki pogodowe znacząco wpływają na możliwości prowadzenia działań w terenie.</p>
      
      <h4>🌧️ Opady:</h4>
      <ul>
        <li><strong>Deszcz:</strong> Błoto, poślizg, ograniczona widoczność</li>
        <li><strong>Śnieg:</strong> Zaspy, śliskość, trudności w ukrywaniu śladów</li>
        <li><strong>Grad:</strong> Czasowe ograniczenie działań</li>
        <li><strong>Mgła:</strong> Drastyczne ograniczenie widoczności</li>
      </ul>

      <h4>💨 Wiatr:</h4>
      <ul>
        <li><strong>Wpływ na celność:</strong> Odchylenie pocisków</li>
        <li><strong>Hałas:</strong> Maskowanie dźwięków lub ich przenoszenie</li>
        <li><strong>Kurz/śnieg:</strong> Ograniczenie widoczności</li>
        <li><strong>Temperatura odczuwalna:</strong> Efekt windchill</li>
      </ul>

      <h4>🌡️ Temperatura:</h4>
      <ul>
        <li><strong>Wysokie temperatury:</strong> Przegrzanie, zmęczenie, mirażowisko</li>
        <li><strong>Niskie temperatury:</strong> Odmrożenia, usztywnienie sprzętu</li>
        <li><strong>Zmiany temperatury:</strong> Kondensacja, zamarzanie</li>
      </ul>

      <h4>☀️ Nasłonecznienie:</h4>
      <ul>
        <li><strong>Słońce w oczy:</strong> Ograniczenie obserwacji</li>
        <li><strong>Cienie:</strong> Ukrycie lub demaskowanie</li>
        <li><strong>Odblaski:</strong> Demaskowanie pozycji</li>
        <li><strong>UV:</strong> Oparzenia, zmęczenie wzroku</li>
      </ul>

      <h4>🌙 Pora dnia:</h4>
      <ul>
        <li><strong>Świt/zmierzch:</strong> Ograniczona widoczność, mylne rozpoznanie</li>
        <li><strong>Noc:</strong> Konieczność używania noktowizji</li>
        <li><strong>Księżyc:</strong> Naturalne oświetlenie lub jego brak</li>
      </ul>

      <h4>🏔️ Wpływ na teren:</h4>
      <ul>
        <li><strong>Podmokły grunt:</strong> Utrudniony ruch, ślady</li>
        <li><strong>Zamarznięta ziemia:</strong> Trudności w kopaniu</li>
        <li><strong>Roztopy:</strong> Podniesione stany wód</li>
        <li><strong>Sucha ziemia:</strong> Kurz, demaskujące chmury</li>
      </ul>

      <h4>📡 Wpływ na sprzęt:</h4>
      <ul>
        <li><strong>Elektronika:</strong> Kondensacja, zakłócenia</li>
        <li><strong>Optyka:</strong> Parowanie soczewek</li>
        <li><strong>Mechanizmy:</strong> Zacinanie się, korozja</li>
        <li><strong>Baterie:</strong> Zmniejszona wydajność</li>
      </ul>

      <h4>🎯 Adaptacja taktyczna:</h4>
      <ul>
        <li>Dostosuj plan do warunków pogodowych</li>
        <li>Wykorzystaj pogodę jako maskowanie</li>
        <li>Przygotuj odpowiedni sprzęt</li>
        <li>Monitoruj prognozy pogody</li>
        <li>Przewiduj zmiany warunków</li>
      </ul>
    `
  },

  // Coordinates
  {
    id: 'coordinate-systems',
    name: 'Systemy współrzędnych wojskowych',
    category: 'Współrzędne',
    icon: 'grid_3x3',
    color: 'purple',
    readTime: '12 min',
    description: 'MGRS, UTM i inne systemy określania pozycji',
    content: `
      <h3>📐 Systemy współrzędnych wojskowych</h3>
      <p>Precyzyjne określanie pozycji jest kluczowe w działaniach wojskowych.</p>
      
      <h4>🌍 System MGRS (Military Grid Reference System):</h4>
      <p>Standardowy system NATO do określania pozycji na powierzchni Ziemi.</p>

      <h4>🗺️ Struktura MGRS:</h4>
      <ol>
        <li><strong>Zona UTM:</strong> 6° pasy długości geograficznej (1-60)</li>
        <li><strong>Pasmo:</strong> 8° pasy szerokości geograficznej (C-X)</li>
        <li><strong>Kwadrat 100km:</strong> Identyfikowany dwoma literami</li>
        <li><strong>Współrzędne numeryczne:</strong> Pozycja w kwadracie</li>
      </ol>

      <h4>📍 Format zapisu MGRS:</h4>
      <ul>
        <li><strong>Pełny:</strong> 34U DQ 12345 67890</li>
        <li><strong>10 cyfr:</strong> DQ 12345 67890 (dokładność 1m)</li>
        <li><strong>8 cyfr:</strong> DQ 1234 6789 (dokładność 10m)</li>
        <li><strong>6 cyfr:</strong> DQ 123 678 (dokładność 100m)</li>
        <li><strong>4 cyfry:</strong> DQ 12 67 (dokładność 1km)</li>
      </ul>

      <h4>📏 Określanie współrzędnych:</h4>
      <ol>
        <li>Znajdź odpowiedni kwadrat na mapie</li>
        <li>Odczytaj identyfikator kwadratu 100km</li>
        <li>Zmierz odległość od lewej krawędzi (E - Easting)</li>
        <li>Zmierz odległość od dolnej krawędzi (N - Northing)</li>
        <li>Zapisz we właściwym formacie</li>
      </ol>

      <h4>🎯 System UTM (Universal Transverse Mercator):</h4>
      <ul>
        <li><strong>60 stref:</strong> Każda szeroka na 6°</li>
        <li><strong>Współrzędne metryczne:</strong> Easting i Northing</li>
        <li><strong>False Easting:</strong> 500 000 m (środek strefy)</li>
        <li><strong>False Northing:</strong> 0 m (równik) lub 10 000 000 m (biegun)</li>
      </ul>

      <h4>🌐 Współrzędne geograficzne:</h4>
      <ul>
        <li><strong>Szerokość geograficzna:</strong> Kąt od równika (N/S)</li>
        <li><strong>Długość geograficzna:</strong> Kąt od meridian Greenwich (E/W)</li>
        <li><strong>Format dziesiętny:</strong> 52.2297° N, 21.0122° E</li>
        <li><strong>Format DMS:</strong> 52°13'47"N, 21°00'44"E</li>
      </ul>

      <h4>🔧 Narzędzia konwersji:</h4>
      <ul>
        <li><strong>GPS:</strong> Automatyczna konwersja między formatami</li>
        <li><strong>Aplikacje mobilne:</strong> Offline conversion tools</li>
        <li><strong>Tabele konwersyjne:</strong> Ręczne przeliczenia</li>
        <li><strong>Software wojskowy:</strong> Specjalistyczne programy</li>
      </ul>

      <h4>⚠️ Częste błędy:</h4>
      <ul>
        <li>Pomylenie Easting z Northing</li>
        <li>Błędne określenie strefy UTM</li>
        <li>Nieprawidłowy format zapisu</li>
        <li>Błędy w pomiarach na mapie</li>
      </ul>

      <h4>📋 Praktyczne zastosowanie:</h4>
      <ul>
        <li>Określanie pozycji własnej</li>
        <li>Przekazywanie współrzędnych celów</li>
        <li>Planowanie tras przemieszczania</li>
        <li>Koordynacja działań wielu jednostek</li>
      </ul>
    `
  },
  {
    id: 'gps-usage',
    name: 'Praktyczne wykorzystanie GPS',
    category: 'Współrzędne',
    icon: 'gps_fixed',
    color: 'purple',
    readTime: '9 min',
    description: 'Efektywne korzystanie z GPS w działaniach terenowych',
    content: `
      <h3>📡 Praktyczne wykorzystanie GPS</h3>
      <p>GPS (Global Positioning System) to system nawigacji satelitarnej wykorzystywany przez wojsko na całym świecie.</p>
      
      <h4>🛰️ Zasada działania GPS:</h4>
      <ul>
        <li><strong>Konstelacja satelitów:</strong> 24+ satelity na orbicie</li>
        <li><strong>Triangulacja:</strong> Pomiar odległości do co najmniej 4 satelitów</li>
        <li><strong>Sygnały czasowe:</strong> Precyzyjne zegary atomowe</li>
        <li><strong>Obliczenia:</strong> Automatyczne określenie pozycji</li>
      </ul>

      <h4>📱 Rodzaje odbiorników GPS:</h4>
      <ul>
        <li><strong>Wojskowe:</strong> Zaszyfrowane, odporne na zakłócenia</li>
        <li><strong>Taktyczne:</strong> Wzmocnione, wodoodporne</li>
        <li><strong>Cywilne:</strong> Smartfony, nawigacje samochodowe</li>
        <li><strong>Specjalistyczne:</strong> Aviation, maritime</li>
      </ul>

      <h4>🎯 Funkcje podstawowe:</h4>
      <ul>
        <li><strong>Pozycja:</strong> Aktualne współrzędne</li>
        <li><strong>Nawigacja:</strong> Kierunek i odległość do celu</li>
        <li><strong>Waypoints:</strong> Zapisane punkty trasy</li>
        <li><strong>Track log:</strong> Zapis przebytej trasy</li>
        <li><strong>Alarmy:</strong> Powiadomienia o osiągnięciu celów</li>
      </ul>

      <h4>⚙️ Ustawienia wojskowe:</h4>
      <ul>
        <li><strong>Format współrzędnych:</strong> MGRS (Military Grid)</li>
        <li><strong>Datum:</strong> WGS84 (World Geodetic System)</li>
        <li><strong>Jednostki:</strong> Metryczne</li>
        <li><strong>Tryb nocny:</strong> Ograniczona jasność</li>
      </ul>

      <h4>🔋 Zarządzanie energią:</h4>
      <ul>
        <li><strong>Tryb oszczędzania:</strong> Ograniczona częstotliwość pomiarów</li>
        <li><strong>Podświetlenie:</strong> Minimalne użycie</li>
        <li><strong>Niepotrzebne funkcje:</strong> Wyłączenie Bluetooth, WiFi</li>
        <li><strong>Zapasowe baterie:</strong> Zawsze w plecaku</li>
      </ul>

      <h4>⚠️ Ograniczenia GPS:</h4>
      <ul>
        <li><strong>Zasięg:</strong> Brak sygnału w budynkach, tunelach</li>
        <li><strong>Dokładność:</strong> 3-5m w warunkach optymalnych</li>
        <li><strong>Zakłócenia:</strong> Elektroniczne, atmosferyczne</li>
        <li><strong>Jamming:</strong> Celowe blokowanie sygnału</li>
      </ul>

      <h4>🔧 Backup navigation:</h4>
      <ul>
        <li><strong>Mapa i kompas:</strong> Podstawowe narzędzia</li>
        <li><strong>Zapisane waypoints:</strong> Krytyczne punkty offline</li>
        <li><strong>Drugi odbiornik:</strong> Redundancja systemów</li>
        <li><strong>Orientacja terenowa:</strong> Obserwacja punktów charakterystycznych</li>
      </ul>

      <h4>📋 Procedury operacyjne:</h4>
      <ol>
        <li><strong>Sprawdzenie przed misją:</strong> Baterie, pamięć, ustawienia</li>
        <li><strong>Kalibracja kompasu:</strong> W przypadku zakłóceń</li>
        <li><strong>Zapisywanie pozycji:</strong> Punkty startowe, kontyngencyjne</li>
        <li><strong>Regularne sprawdzanie:</strong> Status sygnału, dokładność</li>
        <li><strong>Korelacja z mapą:</strong> Weryfikacja odczytów</li>
      </ol>

      <h4>🎯 Wskazówki taktyczne:</h4>
      <ul>
        <li>Nie polegaj wyłącznie na GPS</li>
        <li>Ukryj podświetlenie podczas działań nocnych</li>
        <li>Zapisuj kluczowe waypoints przed misją</li>
        <li>Sprawdzaj dokładność w terenie znanym</li>
        <li>Miej alternatywne metody nawigacji</li>
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

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .row {
    flex-direction: column;
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
  .topics-grid {
    grid-template-columns: 1fr;
  }

  .topic-image {
    height: 60px;
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
