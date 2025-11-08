<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav />

      <!-- Header Section -->
      <div class="hero-section q-pa-lg q-mb-lg rounded-borders">
        <div class="row items-center">
          <div class="col">
            <div class="text-h4 text-weight-bold text-brown-8 q-mb-sm">
              <q-icon name="psychology" class="q-mr-md" />
              Dowodzenie
            </div>
            <div class="text-subtitle1 text-grey-7">
              Metody i procedury dowodzenia w jednostkach WOT
            </div>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              round
              icon="arrow_back"
              color="brown-6"
              size="lg"
              @click="goBack"
            />
          </div>
        </div>
      </div>

      <!-- Command Topics Grid -->
      <div class="topics-grid">
        <q-card
          v-for="topic in commandTopics"
          :key="topic.id"
          class="topic-card"
          clickable
          @click="selectTopic(topic)"
        >
          <q-card-section class="text-center">
            <div class="topic-icon-wrapper">
              <q-icon :name="topic.icon" size="3rem" color="primary" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">{{ topic.title }}</div>
            <div class="text-caption text-grey-6">{{ topic.description }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Topic Details Modal -->
      <q-dialog v-model="showTopicDetails" maximized class="topic-dialog">
        <q-card class="full-width full-height">
          <q-card-section class="bg-primary text-white">
            <div class="row items-center">
              <div class="col">
                <div class="text-h5 text-weight-bold">
                  <q-icon :name="selectedTopic?.icon" class="q-mr-md" />
                  {{ selectedTopic?.title }}
                </div>
                <div class="text-subtitle2">{{ selectedTopic?.description }}</div>
              </div>
              <div class="col-auto">
                <q-btn
                  flat
                  round
                  icon="close"
                  color="white"
                  size="lg"
                  @click="showTopicDetails = false"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="content-section">
            <div class="content-card q-pa-lg">
              <!-- METT-TC -->
              <div v-if="selectedTopic?.id === 1">
                <h4>METT-TC - Analiza sytuacji taktycznej</h4>
                <p>System analizy czynników wpływających na planowanie i prowadzenie działań taktycznych.</p>

                <h5>Składniki METT-TC:</h5>
                <div class="mett-tc-grid q-mb-lg">
                  <div class="mett-item">
                    <h6><strong>M - Mission (Misja)</strong></h6>
                    <ul>
                      <li>Cel operacji</li>
                      <li>Zadania do wykonania</li>
                      <li>Oczekiwane rezultaty</li>
                      <li>Kryteria sukcesu</li>
                    </ul>
                  </div>

                  <div class="mett-item">
                    <h6><strong>E - Enemy (Przeciwnik)</strong></h6>
                    <ul>
                      <li>Siły i środki przeciwnika</li>
                      <li>Możliwości i ograniczenia</li>
                      <li>Prawdopodobne działania</li>
                      <li>Słabe punkty</li>
                    </ul>
                  </div>

                  <div class="mett-item">
                    <h6><strong>T - Terrain (Teren)</strong></h6>
                    <ul>
                      <li>Warunki terenowe</li>
                      <li>Punkty kluczowe</li>
                      <li>Przeszkody i osłony</li>
                      <li>Drogi i szlaki</li>
                    </ul>
                  </div>

                  <div class="mett-item">
                    <h6><strong>T - Troops (Wojska)</strong></h6>
                    <ul>
                      <li>Własne siły i środki</li>
                      <li>Stan gotowości</li>
                      <li>Możliwości operacyjne</li>
                      <li>Wsparcie dostępne</li>
                    </ul>
                  </div>

                  <div class="mett-item">
                    <h6><strong>T - Time (Czas)</strong></h6>
                    <ul>
                      <li>Czas dostępny na planowanie</li>
                      <li>Harmonogram operacji</li>
                      <li>Terminy krytyczne</li>
                      <li>Synchronizacja działań</li>
                    </ul>
                  </div>

                  <div class="mett-item">
                    <h6><strong>C - Civilians (Ludność cywilna)</strong></h6>
                    <ul>
                      <li>Obecność cywilów</li>
                      <li>Bezpieczeństwo ludności</li>
                      <li>Wpływ na operacje</li>
                      <li>Konieczne środki ochrony</li>
                    </ul>
                  </div>
                </div>

                <h5>Zastosowanie METT-TC:</h5>
                <ul>
                  <li>Podstawa każdego procesu planowania</li>
                  <li>Analiza przed rozpoczęciem operacji</li>
                  <li>Ocena zmian w trakcie działania</li>
                  <li>Podstawa do podejmowania decyzji</li>
                </ul>
              </div>

              <!-- DRAW-D -->
              <div v-else-if="selectedTopic?.id === 2">
                <div class="drawd-section q-pa-lg q-mb-xl">
                  <div class="drawd-header row items-center q-mb-md">
                    <q-icon name="shield" color="primary" size="md" class="q-mr-md" />
                    <span class="text-h5 text-weight-bold">DRAW-D</span>
                  </div>
                  <div class="text-body1 q-mb-md">
                    Akronim używany do opisu potencjału przeciwnika:
                  </div>
                  <ul class="drawd-list q-mb-lg">
                    <li><span class="drawd-letter">D</span> <b>(DEFEND)</b> – potencjał i ograniczenia przeciwnika w zakresie obrony</li>
                    <li><span class="drawd-letter">R</span> <b>(REINFORCE)</b> – potencjał i ograniczenia w zakresie posiłków</li>
                    <li><span class="drawd-letter">A</span> <b>(ATTACK)</b> – potencjał i ograniczenia w zakresie ataku</li>
                    <li><span class="drawd-letter">W</span> <b>(WITHDRAW)</b> – potencjał i ograniczenia w zakresie odwrotu</li>
                    <li><span class="drawd-letter">D</span> <b>(DELAY)</b> – potencjał i ograniczenia w zakresie spowalniania</li>
                  </ul>
                  <div class="drawd-img-wrap q-mb-lg flex flex-center">
                    <q-img src="/src/assets/drawd.png" alt="DRAW-D schemat" style="max-width:700px;min-height:260px; border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,0.08); border:1px solid #e0e0e0; background:#fff;" />
                  </div>

                </div>
              </div>

              <!-- OCOKA -->
              <div v-else-if="selectedTopic?.id === 3">
                <h4>OCOKA - Analiza terenu</h4>
                <p>Systematyczna metoda oceny terenu pod kątem prowadzenia działań wojskowych.</p>

                <div class="ocoka-grid q-mb-lg">
                  <div class="ocoka-item">
                    <h6><strong>O - Observation (Obserwacja)</strong></h6>
                    <ul>
                      <li>Pola obserwacji</li>
                      <li>Punkty obserwacyjne</li>
                      <li>Ograniczenia widoczności</li>
                      <li>Wzajemna obserwacja</li>
                    </ul>
                  </div>

                  <div class="ocoka-item">
                    <h6><strong>C - Cover (Osłona)</strong></h6>
                    <ul>
                      <li>Naturalne osłony</li>
                      <li>Sztuczne umocnienia</li>
                      <li>Ochrona przed obserwacją</li>
                      <li>Miejsca bezpieczne</li>
                    </ul>
                  </div>

                  <div class="ocoka-item">
                    <h6><strong>O - Obstacles (Przeszkody)</strong></h6>
                    <ul>
                      <li>Przeszkody naturalne</li>
                      <li>Przeszkody sztuczne</li>
                      <li>Wpływ na ruch</li>
                      <li>Możliwości obejścia</li>
                    </ul>
                  </div>

                  <div class="ocoka-item">
                    <h6><strong>K - Key terrain (Teren kluczowy)</strong></h6>
                    <ul>
                      <li>Punkty dominujące</li>
                      <li>Węzły komunikacyjne</li>
                      <li>Miejsca strategiczne</li>
                      <li>Obiekty do kontrolowania</li>
                    </ul>
                  </div>

                  <div class="ocoka-item">
                    <h6><strong>A - Avenues of approach (Drogi podejścia)</strong></h6>
                    <ul>
                      <li>Kierunki natarcia</li>
                      <li>Szlaki ewakuacji</li>
                      <li>Drogi zaopatrzenia</li>
                      <li>Manewry oskrzydlające</li>
                    </ul>
                  </div>
                </div>

                <h5>Praktyczne zastosowanie:</h5>
                <ul>
                  <li>Planowanie pozycji obronnych</li>
                  <li>Wybór tras przemieszczania</li>
                  <li>Lokalizacja punktów obserwacyjnych</li>
                  <li>Organizacja działań patrolowych</li>
                </ul>
              </div>

              <!-- 5 Punktowiec -->
              <div v-else-if="selectedTopic?.id === 4">
                <h4>5 Punktowiec - Format meldunku</h4>
                <p>Standardowy format przekazywania informacji w sytuacjach taktycznych.</p>

                <div class="five-point-format q-mb-lg">
                  <div class="point-item">
                    <h6><strong>1. Gdzie (Where)</strong></h6>
                    <ul>
                      <li>Dokładna lokalizacja zdarzenia</li>
                      <li>Współrzędne geograficzne</li>
                      <li>Punkty orientacyjne</li>
                      <li>Dystans i kierunek</li>
                    </ul>
                    <div class="example">
                      <strong>Przykład:</strong> "100m na północ od checkpoint Charlie, współrzędne 52.2297N, 21.0122E"
                    </div>
                  </div>

                  <div class="point-item">
                    <h6><strong>2. Kiedy (When)</strong></h6>
                    <ul>
                      <li>Czas zdarzenia</li>
                      <li>Czas trwania</li>
                      <li>Częstotliwość występowania</li>
                      <li>Przewidywany rozwój</li>
                    </ul>
                    <div class="example">
                      <strong>Przykład:</strong> "DTG 061430Z NOV 25, trwające od 15 minut"
                    </div>
                  </div>

                  <div class="point-item">
                    <h6><strong>3. Co (What)</strong></h6>
                    <ul>
                      <li>Rodzaj zdarzenia/działania</li>
                      <li>Liczba zaangażowanych osób</li>
                      <li>Typ sprzętu/uzbrojenia</li>
                      <li>Charakter działania</li>
                    </ul>
                    <div class="example">
                      <strong>Przykład:</strong> "Patrol 4-osobowy z bronią automatyczną, przemieszczający się w kierunku wschodnim"
                    </div>
                  </div>

                  <div class="point-item">
                    <h6><strong>4. Rozmiar/Siła (Size)</strong></h6>
                    <ul>
                      <li>Liczebność przeciwnika</li>
                      <li>Rodzaj jednostki</li>
                      <li>Możliwości bojowe</li>
                      <li>Poziom zagrożenia</li>
                    </ul>
                    <div class="example">
                      <strong>Przykład:</strong> "Szacowana wielkość drużyny (8-12 żołnierzy), uzbrojenie podstawowe plus km"
                    </div>
                  </div>

                  <div class="point-item">
                    <h6><strong>5. Działania (Activity)</strong></h6>
                    <ul>
                      <li>Bieżące działania</li>
                      <li>Kierunek przemieszczania</li>
                      <li>Poziom aktywności</li>
                      <li>Przewidywane intencje</li>
                    </ul>
                    <div class="example">
                      <strong>Przykład:</strong> "Prowadzą rozpoznanie terenu, zatrzymali się przy mostku na 5 min, kontynuują marsz"
                    </div>
                  </div>
                </div>

                <h5>Zasady stosowania:</h5>
                <ul>
                  <li><strong>Zwięzłość:</strong> Krótkie, konkretne informacje</li>
                  <li><strong>Precyzja:</strong> Dokładne dane bez domysłów</li>
                  <li><strong>Aktualność:</strong> Najświeższe informacje</li>
                  <li><strong>Kompletność:</strong> Wszystkie 5 punktów</li>
                </ul>
              </div>

              <!-- Szkic obserwacyjny -->
              <div v-else-if="selectedTopic?.id === 5">
                <h4>Szkic obserwacyjny</h4>
                <p>Graficzne przedstawienie obserwowanego terenu z kluczowymi elementami taktycznymi.</p>

                <h5>Elementy szkicu obserwacyjnego:</h5>
                <div class="sketch-elements q-mb-lg">
                  <div class="element-group">
                    <h6><strong>Informacje podstawowe:</strong></h6>
                    <ul>
                      <li>Data i godzina obserwacji</li>
                      <li>Pozycja obserwatora</li>
                      <li>Kierunek północny</li>
                      <li>Skala (w przybliżeniu)</li>
                      <li>Warunki pogodowe</li>
                    </ul>
                  </div>

                  <div class="element-group">
                    <h6><strong>Elementy terenu:</strong></h6>
                    <ul>
                      <li>Ukształtowanie terenu (wzgórza, doliny)</li>
                      <li>Drogi i ścieżki</li>
                      <li>Budynki i obiekty</li>
                      <li>Lasy i zadrzewienia</li>
                      <li>Cieki wodne</li>
                    </ul>
                  </div>

                  <div class="element-group">
                    <h6><strong>Elementy wojskowe:</strong></h6>
                    <ul>
                      <li>Pozycje przeciwnika</li>
                      <li>Pozycje własne</li>
                      <li>Kierunki ognia</li>
                      <li>Martwe pola</li>
                      <li>Punkty kluczowe</li>
                    </ul>
                  </div>
                </div>

                <h5>Technika sporządzania:</h5>
                <div class="technique-steps">
                  <div class="step">
                    <h6>Krok 1: Podstawa</h6>
                    <p>Narysuj podstawowe kontury terenu, zaznacz pozycję obserwatora i kierunek północny</p>
                  </div>

                  <div class="step">
                    <h6>Krok 2: Teren</h6>
                    <p>Dodaj główne elementy terenu: drogi, budynki, lasy, wzniesienia</p>
                  </div>

                  <div class="step">
                    <h6>Krok 3: Przeciwnik</h6>
                    <p>Zaznacz pozycje i działania przeciwnika używając standardowych symboli</p>
                  </div>

                  <div class="step">
                    <h6>Krok 4: Własne siły</h6>
                    <p>Nanieś pozycje własnych sił i planowane działania</p>
                  </div>

                  <div class="step">
                    <h6>Krok 5: Szczegóły</h6>
                    <p>Dodaj sektory obserwacji, martwe pola, kierunki podejścia</p>
                  </div>
                </div>

                <h5>Symbole standardowe:</h5>
                <div class="symbols-grid">
                  <div class="symbol-item">
                    <strong>Przeciwnik:</strong> Czerwone kształty (kwadraty dla zmechanizowanych, kółka dla pieszych)
                  </div>
                  <div class="symbol-item">
                    <strong>Własne siły:</strong> Niebieskie kształty
                  </div>
                  <div class="symbol-item">
                    <strong>Teren:</strong> Standardowe symbole topograficzne
                  </div>
                  <div class="symbol-item">
                    <strong>Kierunki:</strong> Strzałki z opisem
                  </div>
                </div>

                <h5>Zastosowanie:</h5>
                <ul>
                  <li>Planowanie działań taktycznych</li>
                  <li>Przekazywanie informacji o terenie</li>
                  <li>Koordynacja działań jednostek</li>
                  <li>Analiza po działaniach</li>
                </ul>
              </div>

              <!-- TPD -->
              <div v-else-if="selectedTopic?.id === 6">
                <h4>TPD - Taktyczna Procedura Dowodzenia</h4>
                <p>Kompleksowa procedura obejmująca wszystkie czynności od otrzymania zadania do odtworzenia gotowości bojowej w WOT.</p>

                <h5>Struktura TPD - 5 faz:</h5>
                <div class="tpd-phases q-mb-lg">
                  <div class="phase-item">
                    <h6><strong>FAZA I - PLANOWANIE</strong></h6>
                    <ul>
                      <li>Przyjęcie zadania od przełożonego</li>
                      <li>Analiza rozkazu przez dowódcę (METT-TC)</li>
                      <li>Uruchomienie mikro sztabu</li>
                      <li>Zarządzenie przygotowawcze</li>
                      <li>Rekonesans</li>
                      <li>Opracowanie Rozkazu Bojowego/Planu Walki</li>
                      <li>Stawianie zadań</li>
                    </ul>
                  </div>

                  <div class="phase-item">
                    <h6><strong>FAZA II - PRZYGOTOWANIE</strong></h6>
                    <ul>
                      <li>Przyjęcie wsparcia/zabezpieczenia</li>
                      <li>Synchronizacja/Trening/Ćwiczenie przygotowawcze</li>
                      <li>Ostateczne sprawdzenie wyposażenia (PCI)</li>
                      <li>Kontrola znajomości zadania</li>
                    </ul>
                  </div>

                  <div class="phase-item">
                    <h6><strong>FAZA III - REALIZACJA</strong></h6>
                    <ul>
                      <li>Przemieszczenie do rejonu działania</li>
                      <li>Działanie w rejonie/na obiekcie</li>
                      <li>Powrót do MSD/MCzP</li>
                      <li>Ciągła ocena i adaptacja planu</li>
                    </ul>
                  </div>

                  <div class="phase-item">
                    <h6><strong>FAZA IV - ODTWORZENIE GOTOWOŚCI</strong></h6>
                    <ul>
                      <li>Omówienie na gorąco (AAR)</li>
                      <li>Odtworzenie zdolności bojowych</li>
                      <li>Meldunek do przełożonego (After Action Report)</li>
                      <li>Przygotowanie do kolejnego zadania</li>
                    </ul>
                  </div>

                  <div class="phase-item special">
                    <h6><strong>FAZA CIĄGŁA - OCENA</strong></h6>
                    <ul>
                      <li>Budowanie świadomości sytuacyjnej</li>
                      <li>Kontrola realizacji zadań</li>
                      <li>Monitorowanie sytuacji</li>
                      <li>Ciągła analiza METT-TC</li>
                    </ul>
                  </div>
                </div>

                <h5>Mikro sztab w WOT:</h5>
                <div class="micro-staff q-mb-lg">
                  <div class="staff-level">
                    <h6><strong>Sekcja lekkiej piechoty (12 żołnierzy):</strong></h6>
                    <ul>
                      <li><strong>Dowódca:</strong> Opracowanie RB/Planu Walki</li>
                      <li><strong>Zastępca (Szef mikro sztabu):</strong> Specjalista ds. taktycznych</li>
                      <li><strong>St. radiotelefonista/Radiotelefonista:</strong> Specjalista ds. łączności</li>
                      <li><strong>St. saper/Saper:</strong> Specjalista ds. logistycznych</li>
                      <li><strong>St. ratownik/Ratownik:</strong> Specjalista ds. personalnych i medycznych</li>
                      <li><strong>St. strzelec wyborowy/Strzelec wyborowy:</strong> Specjalista ds. rozpoznawczych</li>
                      <li><strong>Celowniczy:</strong> Ochrona/Specjalista ds. uzbrojenia</li>
                    </ul>
                  </div>
                </div>

                <h5>Kluczowe elementy planowania:</h5>
                <div class="planning-elements q-mb-lg">
                  <div class="element-group">
                    <h6><strong>Sprecyzowane zadanie własne (5W):</strong></h6>
                    <ul>
                      <li><strong>KTO?</strong> (WHO) - Wykonawca</li>
                      <li><strong>KIEDY?</strong> (WHEN) - Czas</li>
                      <li><strong>CO?</strong> (WHAT) - Zadanie</li>
                      <li><strong>GDZIE?</strong> (WHERE) - Miejsce</li>
                      <li><strong>DLACZEGO?</strong> (WHY) - Cel</li>
                    </ul>
                  </div>

                  <div class="element-group">
                    <h6><strong>Myśl przewodnia dowódcy:</strong></h6>
                    <ul>
                      <li>Zwięzłe wyrażenie celu działania</li>
                      <li>Pożądany stan końcowy</li>
                      <li>Warunki osiągnięcia celu</li>
                      <li>Nie określa sposobu wykonania</li>
                    </ul>
                  </div>

                  <div class="element-group">
                    <h6><strong>Zasada 1/3 czasu:</strong></h6>
                    <ul>
                      <li><strong>1/3 czasu:</strong> Własne planowanie dowódcy</li>
                      <li><strong>2/3 czasu:</strong> Planowanie i przygotowanie podwładnych</li>
                      <li>Planowanie odwrócone (od terminu końcowego)</li>
                      <li>Priorytet dla działań czasochłonnych</li>
                    </ul>
                  </div>
                </div>

                <h5>Rozkaz Bojowy - struktura 5-punktowa:</h5>
                <div class="battle-order q-mb-lg">
                  <div class="order-point">
                    <h6><strong>1. SYTUACJA</strong></h6>
                    <p>Przeciwnik • Wojska własne • Zmiany w podporządkowaniu</p>
                  </div>
                  <div class="order-point">
                    <h6><strong>2. ZADANIE</strong></h6>
                    <p>Sprecyzowane zadanie własne</p>
                  </div>
                  <div class="order-point">
                    <h6><strong>3. REALIZACJA</strong></h6>
                    <p>Zamiar działania • Zadania dla podwładnych • Wytyczne koordynacyjne</p>
                  </div>
                  <div class="order-point">
                    <h6><strong>4. ZABEZPIECZENIE LOGISTYCZNE</strong></h6>
                    <p>Zabezpieczenie techniczne, materiałowe i medyczne</p>
                  </div>
                  <div class="order-point">
                    <h6><strong>5. DOWODZENIE I ŁĄCZNOŚĆ</strong></h6>
                    <p>Struktura dowodzenia • Środki łączności • Sygnały</p>
                  </div>
                </div>

                <h5>Kontrola w TPD:</h5>
                <div class="control-types q-mb-lg">
                  <div class="control-item">
                    <h6><strong>Rodzaje kontroli:</strong></h6>
                    <ul>
                      <li>Kontrola znajomości zadania</li>
                      <li>Kontrola sprzętu i wyposażenia</li>
                      <li>Kontrola osiąganych efektów</li>
                    </ul>
                  </div>

                  <div class="control-item">
                    <h6><strong>Formy kontroli:</strong></h6>
                    <ul>
                      <li>Indywidualna kontrola sprzętu</li>
                      <li>Wstępna inspekcja (PCI)</li>
                      <li>Ćwiczenie przygotowawcze</li>
                      <li>Kontrola przed zadaniem</li>
                      <li>Bieżąca analiza sytuacji</li>
                    </ul>
                  </div>
                </div>

                <h5>AAR (After Action Review):</h5>
                <div class="aar-process">
                  <div class="aar-step">
                    <h6>1. Wprowadzenie i zasady</h6>
                    <p>Przedstawienie celu i przebiegu omówienia</p>
                  </div>
                  <div class="aar-step">
                    <h6>2. Podanie zadania</h6>
                    <p>Przypomnienie pierwotnego zadania i celu</p>
                  </div>
                  <div class="aar-step">
                    <h6>3. Opis działania</h6>
                    <p>Przegląd kolejnych etapów realizacji</p>
                  </div>
                  <div class="aar-step">
                    <h6>4. Analiza błędów</h6>
                    <p>Identyfikacja problemów i ich przyczyn</p>
                  </div>
                  <div class="aar-step">
                    <h6>5. Identyfikacja sukcesów</h6>
                    <p>Wyróżnienie dobrych praktyk</p>
                  </div>
                  <div class="aar-step">
                    <h6>6. Wnioski i rekomendacje</h6>
                    <p>Propozycje usprawnień na przyszłość</p>
                  </div>
                </div>

                <h5>Zasady stosowania TPD:</h5>
                <ul>
                  <li><strong>Elastyczność:</strong> Dopuszczalne przeskakiwanie etapów w zależności od sytuacji</li>
                  <li><strong>Równoległość:</strong> Niektóre fazy mogą być realizowane jednocześnie</li>
                  <li><strong>Skalowanie:</strong> Procedura dostosowuje się do poziomu dowodzenia (sekcja/pluton/kompania)</li>
                  <li><strong>Ciągłość:</strong> Ocena przenika wszystkie fazy procedury</li>
                  <li><strong>Adaptacyjność:</strong> Możliwość modyfikacji planu w trakcie realizacji</li>
                </ul>

                <div class="source-reference">
                  <small><em>Źródło: Taktyczna Procedura Dowodzenia WOT</em></small>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'CommandPage'
})

const router = useRouter()
const showTopicDetails = ref(false)
const selectedTopic = ref(null)

const commandTopics = ref([
  {
    id: 1,
    title: 'METT-TC',
    description: 'Analiza sytuacji taktycznej',
    icon: 'analytics'
  },
  {
    id: 2,
    title: 'DRAW-D',
    description: 'Model procesu dowodzenia',
    icon: 'sync'
  },
  {
    id: 3,
    title: 'OCOKA',
    description: 'Analiza terenu',
    icon: 'terrain'
  },
  {
    id: 4,
    title: '5 Punktowiec',
    description: 'Format meldunku',
    icon: 'format_list_numbered'
  },
  {
    id: 5,
    title: 'Szkic obserwacyjny',
    description: 'Graficzne przedstawienie obserwacji',
    icon: 'draw'
  },
  {
    id: 6,
    title: 'TPD',
    description: 'Taktyczna Procedura Dowodzenia',
    icon: 'account_tree'
  }
])

const goBack = () => {
  router.push('/tactics')
}

const selectTopic = (topic) => {
  selectedTopic.value = topic
  showTopicDetails.value = true
}
</script>

<style scoped>
.page-background {
  background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  background: white;
  border: 1px solid rgba(139, 69, 19, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.topic-card {
  background: white;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  height: 180px;
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
  border-color: rgba(139, 69, 19, 0.3);
}

.topic-icon-wrapper {
  background: rgba(139, 69, 19, 0.1);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.content-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.mett-tc-grid,
.ocoka-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.mett-item,
.ocoka-item,
.point-item {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #8b4513;
}

.draw-d-flow {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.draw-step {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #556b2f;
  position: relative;
}

.draw-step:not(:last-child)::after {
  content: '↓';
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  color: #556b2f;
  font-weight: bold;
}

.five-point-format {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.example {
  background: #e8f4f8;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 8px;
  font-style: italic;
}

.sketch-elements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.element-group {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
}

.technique-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #2d3e2f;
}

.symbols-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.symbol-item {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
}

/* TPD Specific Styles */
.tpd-phases {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.phase-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 6px solid #2d3e2f;
  position: relative;
}

.phase-item.special {
  border-left-color: #8b4513;
  background: #fdf7f3;
}

.phase-item h6 {
  color: #2d3e2f;
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.phase-item.special h6 {
  color: #8b4513;
}

.micro-staff {
  background: #f0f4f0;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid rgba(45, 62, 47, 0.2);
}

.staff-level h6 {
  color: #2d3e2f;
  margin-bottom: 16px;
  font-size: 1.1rem;
}

.planning-elements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.element-group {
  background: #f8f9fa;
  padding: 18px;
  border-radius: 10px;
  border-left: 4px solid #556b2f;
}

.element-group h6 {
  color: #556b2f;
  margin-bottom: 12px;
}

.battle-order {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-point {
  background: linear-gradient(90deg, #2d3e2f 0%, #3a4a35 100%);
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  position: relative;
}

.order-point h6 {
  color: white;
  margin-bottom: 8px;
  font-size: 1rem;
}

.order-point p {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-size: 0.9rem;
}

.control-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.control-item {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #8b4513;
}

.control-item h6 {
  color: #8b4513;
  margin-bottom: 12px;
}

.aar-process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.aar-step {
  background: #f0f8ff;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #1976d2;
  position: relative;
}

.aar-step h6 {
  color: #1976d2;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.aar-step p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.topic-dialog .q-dialog__inner {
  padding: 0;
}

/* DRAW-D Specific Styles */
.drawd-section {
  background: #fff;
  border-radius: 18px;
  border: 1.5px solid #cfd8dc;
  box-shadow: 0 4px 24px rgba(44,62,47,0.07);
  max-width: 720px;
  margin: 0 auto 40px auto;
  padding: 32px 24px 32px 24px;
  transition: box-shadow 0.2s;
}

.drawd-section:hover {
  box-shadow: 0 8px 32px rgba(44,62,47,0.13);
}

.drawd-header {
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.drawd-header .text-h5 {
  letter-spacing: 2px;
  color: #2D3E2F;
  text-shadow: 0 1px 0 #e0e0e0;
}

.drawd-list {
  font-size: 1.13rem;
  line-height: 1.8;
  padding-left: 0;
  list-style: none;
  margin-bottom: 32px;
}

.drawd-list li {
  margin-bottom: 14px;
  padding-left: 0;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #f5f7fa;
  border-radius: 8px;
  padding: 10px 16px;
  border-left: 4px solid #4A5D31;
  box-shadow: 0 1px 4px rgba(44,62,47,0.04);
}

.drawd-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #4A5D31;
  color: #fff;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.18rem;
  margin-right: 12px;
  box-shadow: 0 2px 8px rgba(44,62,47,0.08);
  border: 2px solid #2D3E2F;
  letter-spacing: 1px;
  flex-shrink: 0;
}

.drawd-list b {
  color: #2D3E2F;
  font-weight: 600;
  margin-left: 2px;
  margin-right: 6px;
  letter-spacing: 1px;
}

.drawd-img-wrap {
  width: 100%;
  min-height: 260px;
  max-width: 700px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 32px;
}

.drawd-scenario {
  background: #f5f7fa;
  border-radius: 10px;
  border: 1.5px solid #cfd8dc;
  box-shadow: 0 1px 6px rgba(44,62,47,0.04);
  text-align: center;
  padding: 18px 10px;
  font-size: 1.08rem;
  color: #2D3E2F;
  font-weight: 500;
  margin-top: 12px;
}

@media (max-width: 900px) {
  .drawd-section { padding: 18px 4vw 18px 4vw; }
  .drawd-img-wrap { max-width: 98vw; }
}

@media (max-width: 600px) {
  .drawd-section { padding: 10px 0 10px 0; }
  .drawd-list li { font-size: 1rem; padding: 8px 6px; }
  .drawd-letter { width: 26px; height: 26px; font-size: 1rem; }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .topics-grid {
    grid-template-columns: 1fr;
  }

  .mett-tc-grid,
  .ocoka-grid,
  .sketch-elements {
    grid-template-columns: 1fr;
  }

  .draw-d-flow {
    gap: 12px;
  }

  .draw-step:not(:last-child)::after {
    bottom: -16px;
  }

  .tpd-phases {
    gap: 16px;
  }

  .planning-elements,
  .control-types {
    grid-template-columns: 1fr;
  }

  .battle-order {
    gap: 10px;
  }

  .aar-process {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
