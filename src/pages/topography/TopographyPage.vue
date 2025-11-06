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
          <q-card-section class="article-header row items-center q-pb-none">
            <q-btn
              flat
              round
              icon="arrow_back"
              color="primary"
              @click="goBack"
              class="q-mr-md"
            />
            <q-icon :name="selectedTopic?.icon" size="3rem" color="primary" />
            <div class="q-ml-md">
              <div class="text-h4 text-weight-bold text-primary">{{ selectedTopic?.name }}</div>
              <div class="text-subtitle1 text-grey-7">{{ selectedTopic?.description }}</div>
            </div>
            <q-space />
            <q-btn icon="close" flat round dense color="primary" @click="goBack" />
          </q-card-section>

          <q-card-section class="article-content-section q-pa-lg">
            <q-card class="content-card">
              <q-card-section class="article-content">
                <div v-if="selectedTopic?.content" v-html="selectedTopic.content"></div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Import images from assets
import busolaImg from '../../assets/busola.jpeg'
import mgrsImg from '../../assets/mgrs.png'

defineOptions({
  name: 'TopographyPage'
})

const selectedTopic = ref(null)
const router = useRouter()

const showArticleModal = computed(() => !!selectedTopic.value)

const allTopics = computed(() => [
  {
    id: 'terrain-orientation',
    name: 'Orientacja w terenie',
    category: 'Orientacja',
    icon: 'explore',
    color: 'green',
    description: 'Podstawowe metody orientacji bez kompasu',
    content: `
      <h3>Orientacja w terenie</h3>

      <h4>Określanie Pozycji: Trzy Praktyczne Metody</h4>
      <p>Umiejętność szybkiego i precyzyjnego ustalania własnego położenia (pozycjonowania) na mapie jest podstawą każdej efektywnej nawigacji. Zawsze należy dążyć do osiągnięcia maksymalnej pewności co do swojej lokalizacji, zanim podejmie się kolejną decyzję nawigacyjną.</p>

      <h4>1. Pozycja Zgodna z Cechą Terenu</h4>
      <p><strong>Zasada:</strong> Wiesz, że stoisz na konkretnej, wyraźnie zaznaczonej na mapie linii terenowej (np. na brzegu rzeki, na zakręcie głównej drogi asfaltowej, na skrzyżowaniu linii kolejowej z drogą).</p>
      <p><strong>Działanie:</strong> Dokładne zlokalizowanie się na mapie polega na identyfikacji charakterystycznego punktu wzdłuż tej linii (np. mostu, wieży, charakterystycznego drzewa) i przeniesieniu tej informacji na mapę. Jeśli masz GPS, potwierdź odczytami współrzędnych i dopasuj do mapy.</p>

      <h4>2. Liniowe Przecięcie (Użycie Jednego Namiaru)</h4>
      <p>Metoda stosowana, gdy stoisz na jakiejś linii terenowej, ale nie masz dodatkowych punktów do weryfikacji.</p>
      <ol>
        <li><strong>Stój na Linii:</strong> Ustal, że Twoja pozycja znajduje się na długiej, ciągłej linii (np. linia energetyczna, wyraźna ścieżka, prosta rzeka).</li>
        <li><strong>Namierz Punkt:</strong> Zmierz kompasem azymut magnetyczny do jednego wyraźnego, rozpoznawalnego punktu, który widzisz w terenie i który jest na mapie (np. odległy szczyt, kościół, maszt).</li>
        <li><strong>Wsteczny Azymut:</strong> Przelicz ten azymut na azymut wsteczny, dodając lub odejmując 180° (np. jeśli namiar wynosi 30°, wsteczny to 30° + 180° = 210°).</li>
        <li><strong>Przeniesienie:</strong> Na mapie nanieś ten wsteczny azymut z punktu, który namierzyłeś.</li>
        <li><strong>Pozycja:</strong> Punkt przecięcia się linii wstecznego azymutu z linią terenową, na której stoisz, to Twoja pozycja.</li>
      </ol>

      <h4>3. Wsteczne Przecięcie (Triangulacja) – Najdokładniejsza Metoda</h4>
      <p>Najbardziej precyzyjna metoda, stosowana, gdy nie stoisz na żadnej wyraźnej linii.</p>
      <ol>
        <li><strong>Namierz Trzy Punkty:</strong> Zidentyfikuj w terenie i na mapie trzy różne, stabilne punkty orientacyjne (np. najwyższy szczyt w okolicy, wieża, charakterystyczny budynek).</li>
        <li><strong>Zmierz Azymuty:</strong> Zmierz kompasem azymut magnetyczny do każdego z tych trzech punktów.</li>
        <li><strong>Wsteczne Azymuty:</strong> Dla każdego z trzech namiarów oblicz azymut wsteczny (dodając/odejmując 180°).</li>
        <li><strong>Przeniesienie:</strong> Na mapie przenieś każdy z trzech wstecznych azymutów z namierzonych punktów w kierunku swojego położenia.</li>
        <li><strong>Pozycja:</strong> Linia namiarowa z każdego punktu stworzy na mapie trójkąt błędu. Twoja pozycja znajduje się wewnątrz tego trójkąta.</li>
      </ol>

      <h4>Praktyczna Wskazówka</h4>
      <p>Zawsze wybieraj punkty, które nie leżą zbyt blisko siebie i są rozmieszczone szeroko, najlepiej pod kątami zbliżonymi do 60° względem siebie. Zwiększa to dokładność triangulacji.</p>

      <h4>Orientacja według gwiazd:</h4>
      <ul>
        <li><strong>Gwiazda Polarna:</strong> Wskazuje północ</li>
        <li><strong>Wielki Wóz:</strong> Pomaga znaleźć Polarną</li>
      </ul>
    `
  },
  {
    id: 'compass-detail',
    name: 'Busola - budowa i obsługa',
    category: 'Orientacja',
    icon: 'explore',
    color: 'green',
    description: 'Szczegółowa budowa i obsługa busoli terenowej',
    content: `
      <h3>Budowa busoli</h3>

      <div style="text-align: center; margin: 20px 0;">
        <img src="${busolaImg}" alt="Budowa busoli" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
      </div>

      <h4>I. Budowa</h4>

      <h5>Płyta bazowa (Baseplate)</h5>
      <p>Przezroczysta podstawa kompasu. Służy do przykładania do mapy i wskazywania kierunku marszu.</p>

      <h5>Krawędź Marszu (Line of Travel/Lubber Line)</h5>
      <p>Linia strzałki lub krawędź na płycie bazowej, która musi być skierowana na cel na mapie i w terenie.</p>

      <h5>Kapsuła/Komora z Igłą</h5>
      <p>Obrotowa komora wypełniona płynem (dla stabilizacji igły). Wewnątrz znajduje się igła magnetyczna i pierścień limbusa.</p>

      <h5>Igła magnetyczna</h5>
      <p>Zawsze wskazuje Północ Magnetyczną (część zazwyczaj czerwona/świecąca).</p>

      <h5>Limbus (Pierścień Azymutalny)</h5>
      <p>Obrotowy pierścień zewnętrzny kapsuły, na którym naniesiona jest skala kątowa (0° do 360°). Służy do ustawiania azymutu.</p>

      <h5>Linie Orientacyjne (Meridian Lines)</h5>
      <p>Linie wewnątrz komory kapsuły. Służą do wyrównania z liniami siatki na mapie oraz do „złapania" igły podczas marszu.</p>

      <h5>Linijka i Skale</h5>
      <p>Naniesione na krawędzi płyty bazowej. Służą do bezpośredniego mierzenia odległości na mapie i konwersji do różnych skal.</p>

      <h4>II. Zorientowanie Mapy (Krok Pierwszy)</h4>
      <p>Zorientowanie mapy to podstawa. Oznacza to, że kierunek północny na mapie pokrywa się z rzeczywistym kierunkiem północnym w terenie.</p>

      <ol>
        <li><strong>Ustawienie Kompasu:</strong> Połóż mapę poziomo. Umieść na niej kompas.</li>
        <li><strong>Linia Bazowa:</strong> Przyłóż krawędź marszu kompasu równolegle do jednej z pionowych linii siatki (Północ-Południe) na mapie.</li>
        <li><strong>Ustawienie Północy (Limbus):</strong> Obróć limbus (pierścień ze skalą 360°) tak, aby symbol Północy (N) oraz linie orientacyjne wewnątrz komory były skierowane do góry mapy.</li>
        <li><strong>Obrót Mapy:</strong> Trzymając kompas nieruchomo na mapie, obracaj całą mapę, aż igła magnetyczna zrówna się z liniami orientacyjnymi i symbolem Północy na tarczy.</li>
      </ol>

      <p><strong>Praktyczna Wskazówka:</strong> Po zorientowaniu mapy, wszystko co widzisz na Północ na mapie, jest na Północ w terenie.</p>

      <h4>III. Wyznaczanie Azymutu Marszu (Planowanie Trasy)</h4>
      <p>Służy do przenoszenia kierunku z mapy na kompas, abyś mógł maszerować w terenie.</p>

      <ol>
        <li><strong>Połącz Punkty:</strong> Połóż kompas na mapie tak, aby jego krawędź marszu łączyła Twój Punkt Startowy (A) z Punktem Docelowym (B).</li>
        <li><strong>Ustawienie Północy (Limbus):</strong> Nie ruszając kompasu, obróć limbus tak, aby jego linie orientacyjne były równoległe do linii siatki Północ-Południe na mapie. Pamiętaj, aby N było skierowane ku górze mapy.</li>
        <li><strong>Odczyt:</strong> Odczytaj kąt na skali limbusa (tam, gdzie przecina go krawędź marszu). To jest Twój azymut marszu.</li>
        <li><strong>Marsz w Terenie:</strong> Podnieś kompas. Obracaj się, aż igła magnetyczna zrówna się z ramką i symbolem N na limbusie. Kierunek wskazany przez krawędź marszu to Twój kierunek marszu.</li>
      </ol>

      <h4>IV. Odczytywanie Dystansu i Skali</h4>
      <p>Linijka i Skale na Płycie Bazowej pozwalają na szybkie mierzenie odległości na mapie bez dodatkowych narzędzi.</p>

      <ol>
        <li><strong>Identyfikacja Skali:</strong> Sprawdź skalę mapy (np. 1:25 000).</li>
        <li><strong>Użycie Skali Kompasu:</strong> Zlokalizuj linijkę na płycie bazowej, która odpowiada skali Twojej mapy (np. skala 1:50k). Jeśli nie masz dedykowanej skali, użyj standardowej linijki w centymetrach.</li>
        <li><strong>Pomiar:</strong> Zmierz odległość między dwoma punktami na mapie za pomocą linijki.</li>
        <li><strong>Przeliczenie:</strong> Pomnożenie zmierzonej długości przez mianownik skali (np. 4 cm na mapie 1:50 000 = 4 × 500 m = 2000 metrów).</li>
      </ol>
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
      <h3>Marsz na azymut</h3>

      <h4>Przygotowanie:</h4>
      <ol>
        <li>Wyznacz azymut na mapie</li>
        <li>Ustaw kompas</li>
        <li>Wybierz punkt pośredni</li>
      </ol>

      <h4>Wykonanie marszu:</h4>
      <ul>
        <li><strong>Wybierz cel pośredni</strong> na linii azymutu</li>
        <li><strong>Idź do celu</strong> nie patrząc na kompas</li>
        <li><strong>Po osiągnięciu</strong> wybierz kolejny punkt</li>
      </ul>

      <h4>Omijanie przeszkód:</h4>
      <ol>
        <li>Zapamiętaj azymut podstawowy</li>
        <li>Obejdź przeszkodę pod kątem prostym</li>
        <li>Wróć do linii azymutu</li>
      </ol>
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
      <h3>Czytanie map topograficznych</h3>

      <p>Mapa topograficzna jest trójwymiarowym modelem terenu spłaszczonym do dwóch wymiarów. Umiejętność jej "odczytania" polega na wizualizacji rzeźby terenu, obiektów i sztucznych konstrukcji.</p>

      <h4>I. Podstawowe Elementy Mapy</h4>
      <p>Zanim zaczniesz, zlokalizuj cztery kluczowe informacje:</p>
      <ul>
        <li><strong>Skala (np. 1:25 000):</strong> Określa stopień pomniejszenia. Decyduje o wszystkich pomiarach odległości.</li>
        <li><strong>Legenda (Objaśnienia Znaków):</strong> Klucz do zrozumienia symboli, zwłaszcza w przypadku map wojskowych lub specjalistycznych.</li>
        <li><strong>Interwał Warstwicowy:</strong> Różnica wysokości między kolejnymi warstwicami (np. co 5 m, 10 m). Niezbędny do obliczania wysokości.</li>
        <li><strong>Siatka Współrzędnych:</strong> Zazwyczaj siatka prostokątna (np. UTM/MGRS), używana do precyzyjnego pozycjonowania.</li>
      </ul>

      <h4>II. Rozumienie Rzeźby Terenu (Warstwice)</h4>
      <p>Warstwice (izohipsy) to linie, które łączą punkty o tej samej wysokości. Są najważniejsze dla zrozumienia ukształtowania terenu.</p>

      <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Element Warstwic</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Interpretacja w Terenie</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Gęste Warstwice</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">Bardzo strome zbocze. Linia jest niemal pionowa.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Rzadkie Warstwice</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">Łagodne nachylenie terenu. Idealne do marszu lub budowy obozu.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Warstwice z V-kątem</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">Gdy warstwice tworzą kształt litery "V" skierowany w górę (w kierunku szczytu), oznacza to dolinę lub wąwóz.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Kształt Podkowy</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">Gdy warstwice tworzą kształt podkowy skierowanej w dół (od szczytu), oznacza to grzbiet lub ostrogę.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Zamknięte Kółka</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">Koncentryczne, zamknięte koła to szczyt wzniesienia (jeśli wysokość wzrasta) lub zagłębienie/dół (jeśli na warstwicy jest strzałka spadku).</td>
          </tr>
        </tbody>
      </table>

      <h4>III. Interpretacja Kolorów i Znaków Topograficznych</h4>
      <p>Kolory na mapie wojskowej/topograficznej nie są przypadkowe:</p>
      <ul>
        <li><strong>Brązowy:</strong> Rzeźba terenu i warstwice.</li>
        <li><strong>Niebieski:</strong> Wszystko, co ma związek z wodą (rzeki, jeziora, bagna).</li>
        <li><strong>Zielony:</strong> Roślinność, w szczególności lasy. Pamiętaj, że gęsty las na mapie oznacza gorszą widoczność i wolniejszy ruch w terenie.</li>
        <li><strong>Czarny:</strong> Obiekty stworzone przez człowieka, linie komunikacyjne (drogi, koleje), nazwy geograficzne.</li>
        <li><strong>Czerwony:</strong> Głównie drogi o wysokim standardzie, obiekty kluczowe lub czasem siatka współrzędnych.</li>
      </ul>

      <h4>IV. Praktyczne Czytanie Wymiarów (Linijka)</h4>
      <p>Wykorzystaj linijkę na busoli do szybkich obliczeń.</p>

      <p><strong>Odległość:</strong> Zmierz linijką odległość między dwoma punktami na mapie (np. 6 cm).</p>

      <p><strong>Przeliczanie:</strong></p>
      <ul>
        <li><strong>Mapa 1:50 000:</strong> 1 cm = 500 metrów. Zatem 6 cm = 3000 metrów (3 km).</li>
        <li><strong>Mapa 1:25 000:</strong> 1 cm = 250 metrów. Zatem 6 cm = 1500 metrów (1,5 km).</li>
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
        <img src="${mgrsImg}" alt="MGRS System" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
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
      <h3>Planowanie trasy</h3>

      <p>Planowanie trasy dla lekkiej piechoty jest procesem krytycznym, który musi łączyć efektywność ruchu z bezpieczeństwem taktycznym. Kluczowym narzędziem jest Tabela Marszu, która zamienia plan na mapie w precyzyjny harmonogram i instrukcję dla żołnierzy.</p>

      <h4>I. Planowanie Trasy: Czynniki Taktyczne</h4>
      <p>Planowanie trasy nie polega tylko na znalezieniu najkrótszej drogi, ale na wyborze drogi najbezpieczniejszej i najbardziej osłoniętej (zasada OCOKA).</p>

      <h5>1. Analiza OCOKA (Krytyczne Punkty)</h5>
      <p>Przy wyborze trasy, dowódca musi zadać sobie kluczowe pytania:</p>
      <ul>
        <li><strong>Pola Ostrzału (O):</strong> Czy trasa biegnie wzdłuż grzbietów, po otwartych polach lub wzdłuż linii horyzontu? Unikaj ich.</li>
        <li><strong>Osłona i Ukrycie (C):</strong> Czy trasa zapewnia stałe schronienie przed obserwacją i ostrzałem? Preferuj zalesione tereny, doliny i zagięcia terenu.</li>
        <li><strong>Przeszkody (O):</strong> Czy trasa wymaga forsowania rzek, bagien, gęstych miast? Zminimalizuj te przeszkody, ponieważ spowalniają i zwiększają ryzyko.</li>
        <li><strong>Teren Kluczowy (K):</strong> Czy trasa pozwala na szybkie zajęcie i wykorzystanie terenu dominującego (np. wzgórza) do obserwacji lub osłony ogniem?</li>
        <li><strong>Drogi Podejścia (A):</strong> Wybierz drogi, które zminimalizują możliwość kontaktu z przeciwnikiem lub zapewnią przewagę w przypadku starcia.</li>
      </ul>

      <h5>2. Wybór Trasy a Tempo</h5>
      <ul>
        <li><strong>Trasy Taktyczne (Dłuższe, Bezpieczniejsze):</strong> Często najszybszą drogą jest ta, która zapewnia ciągłą osłonę, nawet jeśli na mapie jest dłuższa. Ruch jest wolniejszy, ale bezpieczniejszy.</li>
        <li><strong>Trasy Logistyczne (Szybsze, Ryzykowne):</strong> Używane tylko w ostateczności lub przy małym ryzyku kontaktu. Pozwalają na szybszy ruch, ale kosztem ekspozycji na ogień.</li>
      </ul>

      <h4>II. Tworzenie Tabeli Marszu (Marszruta)</h4>
      <p>Tabela Marszu to ustrukturyzowany harmonogram, który przekłada plan graficzny na mapie na zestaw konkretnych instrukcji dla prowadzącego marsz i reszty pododdziału.</p>

      <h5>1. Elementy Kluczowe</h5>
      <table style="width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.9rem;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Kolumna</th>
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Dane i Interpretacja</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>Lp.</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Numer kolejnego odcinka lub punktu kontrolnego (PK).</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>PK (Punkt Kontrolny)</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Krótki opis punktu (np. "Skrzyżowanie leśnych dróg", "Wzniesienie 155 m").</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>Azymut</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Kierunek (w stopniach) od aktualnego PK do następnego PK. Wyznaczany busolą na mapie.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>Odległość</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Dystans od aktualnego do następnego PK (w metrach/km). Mierzony linijką na mapie.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>Odległość Sumaryczna</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Całkowita odległość od początku marszu do danego PK.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>Czas Przejścia</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Szacowany czas potrzebny na pokonanie danego odcinka, z uwzględnieniem trudności terenu.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>Czas Osiągnięcia (ETA)</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Przewidywana godzina przybycia do danego PK.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>Uwagi</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Ważne informacje (np. "Ciche przejście", "Wysoki brzeg rzeki", "Ryzyko obserwacji").</td>
          </tr>
        </tbody>
      </table>

      <h5>2. Szacowanie Czasu (Klucz Nawigacji)</h5>
      <p>Dokładne szacowanie czasu marszu jest niezbędne, aby dotrzeć do celu na czas (Time Check).</p>
      <ul>
        <li><strong>Prędkość Bazowa:</strong> Przyjmuje się, że średnia prędkość lekko uzbrojonego żołnierza to ok. 4 km/h na płaskim, dobrym terenie.</li>
        <li><strong>Wpływ Wzniesień (Metoda Naismitha, uproszczona):</strong>
          <ul>
            <li>Dodaj 1 minutę do czasu marszu za każde 10 m wzniesienia (pionowego).</li>
            <li>Odejmij 1 minutę za każde 20 m spadku.</li>
          </ul>
        </li>
        <li><strong>Korekta na Teren:</strong> Odejmij 10-30% prędkości bazowej w terenie gęsto zalesionym, podmokłym lub kamienistym.</li>
      </ul>

      <h5>3. Procedura Marszu z Tablicą</h5>
      <ul>
        <li><strong>Nawigator:</strong> Prowadzi marsz, sprawdzając azymut i licząc kroki (lub korzystając z GPS/krokomierza) w celu kontroli odległości.</li>
        <li><strong>Punkt Krytyczny (PK):</strong> Po osiągnięciu PK, dowódca sprawdza zgodność czasu (ETA), zatrzymuje pododdział, koryguje ewentualne błędy i wydaje nowy rozkaz na kolejny odcinek trasy, korzystając z tabeli.</li>
        <li><strong>Błąd:</strong> Jeśli pododdział nie osiąga PK w szacowanym czasie lub znacznie się myli, należy zatrzymać się, zorientować mapę i ponownie ustalić pozycję.</li>
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
      <h3>Odległość i czas</h3>
      <p>W wojskach lądowych, zwłaszcza lekkiej piechoty działającej na piechotę, precyzyjne mierzenie dystansu i kontrola czasu marszu są niezbędne dla utrzymania harmonogramu misji i dotarcia do celu na czas.</p>

      <h4>I. Mierzenie Dystansu Metodą Parokroków</h4>
      <p>Metoda parokroków (ang. pace count) jest najczęściej stosowanym sposobem mierzenia dystansu w terenie, zwłaszcza przy słabej widoczności.</p>

      <h5>1. Kalibracja Własnego Kroku (Krokomierz)</h5>
      <ul>
        <li><strong>Definicja Parokroku:</strong> Parokrok to dwa kroki – liczysz tylko wtedy, gdy ta sama stopa (np. lewa) dotyka ziemi.</li>
        <li><strong>Kalibracja:</strong> Nawigator musi znać swoją średnią liczbę parokroków na standardowy dystans (zwykle 100 metrów).</li>
        <li><strong>Procedura:</strong> Na płaskim, odmierzonym 100-metrowym odcinku, przejdź trzykrotnie normalnym marszem, licząc parokroki. Wylicz średnią.</li>
        <li><strong>Wartość Typowa:</strong> W terenie żołnierz potrzebuje zazwyczaj od 60 do 75 parokroków na 100 metrów.</li>
        <li><strong>Wpływ Terenu:</strong> Pamiętaj, że liczba parokroków na 100 m wzrośnie na wzniesieniach, w piasku, w błocie oraz przy pełnym obciążeniu. Doświadczony nawigator stosuje korekty.</li>
      </ul>

      <h5>2. Narzędzia Kontrolne</h5>
      <p>Ponieważ liczenie parokroków w stresie lub zmęczeniu jest trudne, stosuje się narzędzia pomocnicze:</p>
      <ul>
        <li><strong>Sznurki (Pace Cord):</strong> Sznurek z węzłami (np. co 10 węzłów, gdzie każdy węzeł to 100 m). Po przeliczeniu 100 metrów, przesuwa się węzeł na sznurku, co zapewnia prosty rejestr przebytej odległości.</li>
        <li><strong>Zapis:</strong> Zapisywanie przebytego dystansu w notesie lub na mapie po każdych kilkuset metrach, aby uniknąć pomyłek.</li>
      </ul>

      <h4>II. Szacowanie Tempa i Czasu Marszu (ETA)</h4>
      <p>Dokładne szacowanie czasu przybycia (ETA – Estimated Time of Arrival) jest krytyczne dla synchronizacji działań (Time Check).</p>

      <h5>1. Prędkość Marszu Bazowa</h5>
      <p>Przy planowaniu trasy w Tabeli Marszu przyjmuje się standardowe prędkości dla piechoty:</p>
      <ul>
        <li><strong>Marsz Taktyczny</strong> (Pełne obciążenie, teren urozmaicony): 3 - 4 km/h</li>
        <li><strong>Marsz Szybki/Rekonesans</strong> (Lekkie obciążenie, dobry teren): 4 - 5 km/h</li>
      </ul>

      <h5>2. Korekty Terenowe (Wpływ na Czas)</h5>
      <p>Na każdą planowaną odległość należy nałożyć korekty związane z warunkami, które spowalniają tempo:</p>

      <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; text-align: left;">Czynnik Spowalniający</th>
            <th style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; text-align: left;">Szacowana Utrata Prędkości / Korekta</th>
            <th style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; text-align: left;">Praktyczna Porada</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>Wzniesienie</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Dodaj 1 minutę za każde 10 m pokonane pionowo w górę.</td>
            <td style="border: 1px solid #ddd; padding: 6px;">Oblicz różnicę wysokości za pomocą warstwic.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>Pora Dnia/Noc</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Utrata 20 - 30% standardowej prędkości.</td>
            <td style="border: 1px solid #ddd; padding: 6px;">Nawigacja nocna jest wolniejsza i wymaga częstszych przystanków.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>Zły Teren</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Utrata 25 - 50% prędkości (bagna, gęste zarośla, głęboki śnieg).</td>
            <td style="border: 1px solid #ddd; padding: 6px;">Najpierw omijaj te obszary, dopiero potem planuj marsz.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 6px;"><strong>Obciążenie</strong></td>
            <td style="border: 1px solid #ddd; padding: 6px;">Pełne wyposażenie i plecak (25-35 kg) obniża tempo o 15 - 20%.</td>
            <td style="border: 1px solid #ddd; padding: 6px;">-</td>
          </tr>
        </tbody>
      </table>

      <h5>3. Wzór Czasu</h5>
      <p>Po zastosowaniu korekt terenowych, czas przejścia danego odcinka jest obliczany według prostego wzoru:</p>
      <p style="text-align: center; font-size: 1.2em; background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
        <strong>Czas Przejścia = Dystans na Mapie (km) / Prędkość (km/h)</strong>
      </p>

      <p><strong>Praktyczne Działanie:</strong> Podziel długą trasę na odcinki o długości 1 - 2 km lub między Punktami Kontrolnymi (PK). Dla każdego odcinka oblicz azymut, dystans (w parokrokach i metrach) i czas przejścia. W ten sposób unikniesz dużych błędów kumulacyjnych.</p>
    `
  }
  // {
  //   id: 'navigation-night',
  //   name: 'Nawigacja nocna',
  //   category: 'Nawigacja',
  //   icon: 'nights_stay',
  //   color: 'orange',
  //   description: 'Specyfika poruszania się w nocy',
  //   content: `
  //     <h3>Nawigacja nocna</h3>

  //     <h4>Adaptacja wzroku:</h4>
  //     <ul>
  //       <li><strong>15-30 minut:</strong> Pełna adaptacja</li>
  //       <li><strong>Czerwone światło:</strong> Nie psuje widzenia nocnego</li>
  //       <li><strong>Unikaj:</strong> Białego światła</li>
  //     </ul>

  //     <h4>Techniki:</h4>
  //     <ul>
  //       <li>Patrz obok obiektu (widzenie boczne)</li>
  //       <li>Używaj charakterystycznych konturów</li>
  //       <li>Idź wolniej i ostrożniej</li>
  //       <li>Sprawdzaj kompas częściej</li>
  //     </ul>
  //   `
  // },
  // {
  //   id: 'military-compass',
  //   name: 'Kompas wojskowy',
  //   category: 'Sprzęt nawigacyjny',
  //   icon: 'compass_calibration',
  //   color: 'purple',
  //   description: 'Rodzaje i obsługa kompasów wojskowych',
  //   content: `
  //     <h3>Kompas wojskowy</h3>

  //     <h4>Typy kompasów:</h4>
  //     <ul>
  //       <li><strong>Kompas z celownikiem:</strong> Precyzyjny pomiar</li>
  //       <li><strong>Kompas płytkowy:</strong> Szybki odczyt</li>
  //       <li><strong>Kompas na nadgarstek:</strong> Zawsze dostępny</li>
  //     </ul>

  //     <h4>Obsługa:</h4>
  //     <ol>
  //       <li>Trzymaj poziomo</li>
  //       <li>Z dala od metalu</li>
  //       <li>Czekaj na ustalenie się igły</li>
  //       <li>Odczytaj wartość</li>
  //     </ol>

  //     <h4>Błędy:</h4>
  //     <ul>
  //       <li>Deklinacja magnetyczna (+4° w Polsce)</li>
  //       <li>Zakłócenia od metalu</li>
  //       <li>Linie wysokiego napięcia</li>
  //     </ul>
  //   `
  // },
  // {
  //   id: 'gps-basics',
  //   name: 'GPS w terenie',
  //   category: 'Sprzęt nawigacyjny',
  //   icon: 'gps_fixed',
  //   color: 'purple',
  //   description: 'Praktyczne wykorzystanie GPS',
  //   content: `
  //     <h3>GPS w terenie</h3>

  //     <h4>Podstawowe funkcje:</h4>
  //     <ul>
  //       <li><strong>Pozycja:</strong> Aktualne współrzędne</li>
  //       <li><strong>Waypoint:</strong> Zapisz ważne punkty</li>
  //       <li><strong>Go To:</strong> Nawigacja do celu</li>
  //       <li><strong>Track:</strong> Zapis przebytej trasy</li>
  //     </ul>

  //     <h4>Ustawienia:</h4>
  //     <ul>
  //       <li><strong>Format:</strong> MGRS lub UTM</li>
  //       <li><strong>Datum:</strong> WGS84</li>
  //       <li><strong>Jednostki:</strong> Metryczne</li>
  //     </ul>

  //     <h4>Oszczędzanie baterii:</h4>
  //     <ul>
  //       <li>Używaj trybu oszczędzania</li>
  //       <li>Wyłącz niepotrzebne funkcje</li>
  //       <li>Miej zapasowe baterie</li>
  //       <li>Zawsze noś mapę i kompas!</li>
  //     </ul>
  //   `
  // }
])

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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(25, 118, 210, 0.1);
  text-align: center;
  margin-bottom: 2rem;
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
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(25, 118, 210, 0.1);
  border-radius: 16px;
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    border-color: var(--q-primary);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }
}

.topic-image {
  text-align: center;
  padding: 2rem 1rem 1rem;
  background: rgba(25, 118, 210, 0.05);
  border-radius: 16px 16px 0 0;
}

// Modal styling to match MGRS page
.article-modal {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  max-height: 100vh;
  overflow-y: auto;
}

.article-header {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px 16px 0 0;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(25, 118, 210, 0.1);
}

.article-content-section {
  max-width: 1000px;
  margin: 0 auto;
}

.content-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
}

.article-content {
  line-height: 1.6;
  font-size: 1rem;
  color: #424242;

  :deep(h3) {
    color: #1976d2;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  :deep(h4) {
    color: #424242;
    margin: 1.5rem 0 0.75rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  :deep(ul), :deep(ol) {
    margin: 0.5rem 0 1rem 1.5rem;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
      color: #424242;
    }
  }

  :deep(p) {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: #424242;
  }

  :deep(strong) {
    color: #1976d2;
    font-weight: 600;
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

  .topics-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .topic-card-wrapper:hover {
    transform: none;
  }

  .article-header {
    padding: 16px;
  }

  .article-header .row {
    flex-direction: column;
    text-align: center;
    gap: 8px !important;
  }

  .article-content {
    font-size: 0.9rem;
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

  .page-header .text-h4 {
    font-size: 1.25rem;
  }

  .page-header .text-subtitle1 {
    font-size: 0.9rem;
  }

  .article-header {
    padding: 12px;
  }

  .article-content {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .article-content :deep(h3) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  .article-content :deep(h4) {
    font-size: 1rem;
    margin: 1rem 0 0.5rem 0;
  }
}
</style>
