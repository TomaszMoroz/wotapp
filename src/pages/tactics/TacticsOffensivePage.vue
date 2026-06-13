<template>
  <q-page class="modern-bg">
    <div class="container q-pa-md">
      <BackNav color="black"/>

      <!-- Header -->
      <div class="modern-header-section q-mb-lg">
        <div class="modern-hero-section q-pa-lg rounded-borders">
          <div class="text-h4 text-weight-bold text-military-secondary q-mb-sm">
            <q-icon name="arrow_forward" class="q-mr-md" />
            Działania Ofensywne
          </div>
          <div class="text-body1 text-military-dark">Podręcznik taktyki — s. 251–268</div>
        </div>
      </div>

      <div class="modern-content-row q-gutter-md">
        <!-- Spis treści -->
        <div class="modern-content-list-col">
          <q-card class="modern-content-list-card">
            <q-card-section class="q-pa-md">
              <div class="text-h6 q-mb-md text-military-secondary">Spis treści</div>
              <q-input
                v-model="searchQuery"
                placeholder="Szukaj..."
                outlined
                dense
                class="q-mb-md"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-list separator>
                <q-item
                  v-for="topic in filteredTopics"
                  :key="topic.id"
                  clickable
                  @click="selectTopic(topic)"
                  :class="{ 'bg-military-light': selectedTopic?.id === topic.id }"
                >
                  <q-item-section>
                    <q-item-label class="text-weight-medium text-military-dark">{{ topic.title }}</q-item-label>
                    <q-item-label caption class="text-military-secondary">{{ topic.ref }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="chevron_right" color="military-secondary" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Treść -->
        <div class="modern-content-main-col">
          <q-card v-if="selectedTopic" class="modern-content-card">
            <q-card-section class="q-pa-md">
              <div class="text-h5 text-weight-bold q-mb-xs text-military-secondary">{{ selectedTopic.title }}</div>
              <div class="text-caption text-military-dark q-mb-lg">{{ selectedTopic.ref }}</div>

              <div class="modern-content-body">

                <!-- 1. Ogólne zasady natarcia -->
                <div v-if="selectedTopic.id === 1">
                  <h4>Ogólne zasady działań ofensywnych</h4>
                  <p>
                    Działania ofensywne mają na celu zniszczenie lub zneutralizowanie sił przeciwnika,
                    zajęcie lub opanowanie terenu oraz stworzenie warunków do prowadzenia dalszych operacji.
                    Są podstawową formą działania umożliwiającą przejęcie i utrzymanie inicjatywy.
                  </p>

                  <div class="q-pa-md bg-red-1 rounded-borders q-mt-md q-mb-lg">
                    <div class="text-weight-medium text-red-8 q-mb-xs">
                      <q-icon name="gps_fixed" class="q-mr-xs" />
                      Cel działań ofensywnych
                    </div>
                    <ul class="q-mb-none">
                      <li>Zniszczenie lub zneutralizowanie sił przeciwnika</li>
                      <li>Zajęcie kluczowych obiektów i rubieży terenowych</li>
                      <li>Pozbawienie przeciwnika inicjatywy</li>
                      <li>Stworzenie warunków do prowadzenia dalszych operacji</li>
                    </ul>
                  </div>

                  <h5>Rodzaje działań ofensywnych:</h5>
                  <div class="q-gutter-sm q-mb-lg">
                    <q-chip color="red-8" text-color="white" icon="arrow_forward" label="Natarcie" />
                    <q-chip color="red-7" text-color="white" icon="bolt" label="Szturm" />
                    <q-chip color="red-6" text-color="white" icon="loop" label="Rajd" />
                    <q-chip color="red-5" text-color="white" icon="directions_run" label="Pościg" />
                    <q-chip color="red-4" text-color="white" icon="flash_on" label="Atak z zaskoczenia" />
                  </div>

                  <h5>Zasady ogólne:</h5>
                  <ul>
                    <li><strong>Inicjatywa:</strong> Stałe przejmowanie i utrzymywanie inicjatywy działania</li>
                    <li><strong>Koncentracja sił:</strong> Skupienie sił i środków na kierunku głównego uderzenia</li>
                    <li><strong>Tempo:</strong> Utrzymywanie tempa działania uniemożliwiającego reorganizację przeciwnika</li>
                    <li><strong>Elastyczność:</strong> Szybka zmiana planów i działań w odpowiedzi na rozwój sytuacji</li>
                    <li><strong>Zaskoczenie:</strong> Działanie w nieoczekiwanym miejscu, czasie i z zaskakującym kierunkiem uderzenia</li>
                    <li><strong>Masowanie ognia:</strong> Skupienie ognia na krytycznych celach w kluczowych momentach</li>
                    <li><strong>Zabezpieczenie:</strong> Ochrona sił własnych przed zaskakującymi działaniami przeciwnika</li>
                  </ul>

                  <h5>Warunki skutecznego natarcia:</h5>
                  <ul>
                    <li>Dokładne rozpoznanie pozycji i sił przeciwnika</li>
                    <li>Przewaga ogniowa w miejscu przełamania</li>
                    <li>Zsynchronizowane działanie ognia i manewru</li>
                    <li>Zabezpieczenie skrzydeł i tyłu</li>
                    <li>Utrzymanie gotowości odwodów</li>
                  </ul>
                </div>

                <!-- 2. Przygotowanie natarcia -->
                <div v-else-if="selectedTopic.id === 2">
                  <h4>Przygotowanie do natarcia</h4>
                  <p>
                    Staranne przygotowanie jest warunkiem koniecznym sukcesu działań ofensywnych.
                    Obejmuje rozpoznanie, planowanie, wydanie rozkazu i ostateczne przygotowania
                    do ataku.
                  </p>

                  <h5>Etapy przygotowania:</h5>
                  <ol>
                    <li>
                      <strong>Rozpoznanie rejonu natarcia (REKON):</strong>
                      <ul>
                        <li>Określenie pozycji, sił i rozmieszczenia przeciwnika</li>
                        <li>Rozpoznanie rubieży wyjściowej i kierunków podejścia</li>
                        <li>Ustalenie przeszkód terenowych i pól minowych</li>
                        <li>Identyfikacja miejsc ubezpieczeń i posterunków</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Analiza METT-TC:</strong>
                      <ul>
                        <li><strong>M</strong>ission — cel natarcia i zadania szczegółowe</li>
                        <li><strong>E</strong>nemy — siły, rozmieszczenie, możliwości przeciwnika</li>
                        <li><strong>T</strong>errain &amp; Weather — wpływ terenu i pogody na działanie</li>
                        <li><strong>T</strong>roops — własne siły i środki dostępne do natarcia</li>
                        <li><strong>T</strong>ime — czas dostępny na przygotowanie i wykonanie</li>
                        <li><strong>C</strong>ivilian — obecność i wpływ ludności cywilnej</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Planowanie natarcia:</strong>
                      <ul>
                        <li>Określenie głównego i zapasowego kierunku ataku</li>
                        <li>Wyznaczenie rubieży wyjściowej do ataku (RWA)</li>
                        <li>Podział zadań między pododdziały (grupy)</li>
                        <li>Koordynacja ognia i manewru — plan ognia</li>
                        <li>Planowanie drogi wycofania</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Wydanie rozkazu bojowego (OPORD / 5-punktowy rozkaz):</strong>
                      <ul>
                        <li>Sytuacja — informacje o przeciwniku i siłach własnych</li>
                        <li>Zadanie — co, kiedy, gdzie, po co</li>
                        <li>Wykonanie — jak, podział ról, koordynacja</li>
                        <li>Zabezpieczenie — logistyka, medycyna, łączność</li>
                        <li>Dowodzenie i sygnały — hierarchia, sygnały, hasła</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Końcowe przygotowania:</strong>
                      <ul>
                        <li>Sprawdzenie uzbrojenia, amunicji i wyposażenia</li>
                        <li>Weryfikacja łączności radiowej</li>
                        <li>Omówienie sygnałów i haseł</li>
                        <li>Ostateczne briefingi i pytania</li>
                      </ul>
                    </li>
                  </ol>

                  <div class="q-pa-md bg-amber-1 rounded-borders q-mt-md">
                    <div class="text-weight-medium text-amber-8 q-mb-xs">
                      <q-icon name="warning" class="q-mr-xs" />
                      Zasada podstawowa
                    </div>
                    <div class="text-body2">
                      Im więcej czasu poświęcono na przygotowanie, tym mniejsze ryzyko i strat podczas
                      wykonania. Nigdy nie rezygnuj z rozpoznania.
                    </div>
                  </div>
                </div>

                <!-- 3. Podejście i atak -->
                <div v-else-if="selectedTopic.id === 3">
                  <h4>Podejście do pozycji i atak</h4>
                  <p>
                    Faza podejścia (atak z marszu lub podejście taktyczne) kończy się osiągnięciem
                    rubieży wyjściowej do ataku, skąd następuje bezpośrednie uderzenie na pozycję
                    przeciwnika.
                  </p>

                  <h5>Fazy natarcia sekcji:</h5>
                  <ol>
                    <li>
                      <strong>Wyjście na rubież wyjściową do ataku (RWA):</strong>
                      <ul>
                        <li>Przemieszczenie skryte, z zachowaniem szyku taktycznego</li>
                        <li>Formacja zależna od terenu i zagrożenia (Podwójny Sierżant lub linię)</li>
                        <li>Zachowanie dyscypliny milczenia i maskowania</li>
                        <li>Utrzymanie łączności z dowódcą i innymi elementami</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Przygotowanie ogniowe:</strong>
                      <ul>
                        <li>Skupienie ognia na zidentyfikowanych stanowiskach przeciwnika</li>
                        <li>Osłona manewrującego elementu szturmowego</li>
                        <li>Neutralizacja ubezpieczeń i obserwatorów</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Bezpośredni atak (szturm):</strong>
                      <ul>
                        <li>Przemieszczenie grupy szturmowej pod osłoną ognia</li>
                        <li>Opanowanie rubieży za pozycją przeciwnika</li>
                        <li>Przejęcie inicjatywy w walce wręcz lub na bliskie odległości</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Konsolidacja i reorganizacja:</strong>
                      <ul>
                        <li>Zabezpieczenie zdobytego terenu — obrona 360°</li>
                        <li>Sprawdzenie stanu osobowego i wyposażenia</li>
                        <li>Przeszukanie pozycji, jeńcy, dokumenty</li>
                        <li>Meldunek do dowódcy nadrzędnego</li>
                        <li>Przygotowanie do kolejnego zadania</li>
                      </ul>
                    </li>
                  </ol>

                  <div class="diagram-container q-my-lg">
                    <img :src="sier1Img" alt="Szyk do natarcia — Podwójny Sierżant" class="tactical-diagram q-mb-md" />
                    <div class="text-caption text-center text-military-dark">Szyk taktyczny do natarcia — Podwójny Sierżant</div>
                  </div>

                  <div class="q-pa-md bg-blue-1 rounded-borders q-mt-md">
                    <div class="text-weight-medium text-blue-8 q-mb-xs">
                      <q-icon name="info" class="q-mr-xs" />
                      Zasada 3:1
                    </div>
                    <div class="text-body2">
                      Do skutecznego natarcia zaleca się trzykrotną przewagę liczebną lub ogniową
                      nad broniącym się przeciwnikiem w miejscu przełamania.
                    </div>
                  </div>
                </div>

                <!-- 4. Ogień i manewr -->
                <div v-else-if="selectedTopic.id === 4">
                  <h4>Techniki natarcia — Ogień i manewr</h4>
                  <p>
                    Podstawowa zasada działań ofensywnych: element ubezpieczający (<em>wspierający</em>)
                    prowadzi ogień, przykuwając uwagę przeciwnika, podczas gdy element manewrujący
                    (<em>szturmowy</em>) przemieszcza się do pozycji umożliwiającej atak.
                  </p>

                  <h5>Techniki przemieszczania:</h5>

                  <div class="q-pa-md bg-grey-2 rounded-borders q-mb-md">
                    <div class="text-weight-bold text-military-secondary q-mb-xs">1. Bounding Overwatch (Skoki pod osłoną)</div>
                    <ul class="q-mb-none">
                      <li>Sekcja podzielona na dwa elementy: ubezpieczający i manewrujący</li>
                      <li>Element ubezpieczający zajmuje pozycję i prowadzi ogień obserwacyjny</li>
                      <li>Element manewrujący wykonuje skok do kolejnej pozycji z osłoną</li>
                      <li>Role zmieniają się po każdym skoku</li>
                      <li>Stosowane w warunkach kontaktu ogniowego lub jego prawdopodobieństwa</li>
                    </ul>
                  </div>

                  <div class="q-pa-md bg-grey-2 rounded-borders q-mb-md">
                    <div class="text-weight-bold text-military-secondary q-mb-xs">2. Alternating Bounds (Skoki naprzemienne)</div>
                    <ul class="q-mb-none">
                      <li>Pary (buddy teams) poruszają się na zmianę</li>
                      <li>Jeden żołnierz ubezpiecza, drugi wykonuje skok</li>
                      <li>Ciągła i wzajemna osłona przez cały ruch</li>
                      <li>Stosowane przy bezpośrednim kontakcie z przeciwnikiem</li>
                    </ul>
                  </div>

                  <div class="q-pa-md bg-grey-2 rounded-borders q-mb-md">
                    <div class="text-weight-bold text-military-secondary q-mb-xs">3. Successive Bounds (Skoki sekwencyjne)</div>
                    <ul class="q-mb-none">
                      <li>Całe elementy przemieszczają się jedna pozycja do przodu</li>
                      <li>Drugi element pozostaje na miejscu jako podstawa ognia</li>
                      <li>Wolniejsze, ale zapewnia masywniejszą siłę ognia w każdej chwili</li>
                      <li>Stosowane gdy zagrożenie jest mniejsze lub teren trudny</li>
                    </ul>
                  </div>

                  <h5>Koordynacja ognia i manewru:</h5>
                  <ul>
                    <li><strong>Sygnały dowodzenia:</strong> Dowódca zarządza ogniem i ruchem sygnałami głosowymi, radiowymi lub wzrokowymi</li>
                    <li><strong>Sektory ognia:</strong> Każdy żołnierz ma wyznaczony sektor odpowiedzialności — ogień się nie krzyżuje</li>
                    <li><strong>Limit amunicji:</strong> Wyznaczenie limitu i dyscyplina ogniowa — nie strzelamy bezmyślnie</li>
                    <li><strong>Zmiana magazynka:</strong> Taktyczna wymiana — ogłoszenie „zmiana", partner przejmuje ogień</li>
                    <li><strong>Linia ognia:</strong> Zakaz prowadzenia ognia przez pozycje własnych żołnierzy</li>
                  </ul>

                  <div class="diagram-container q-my-lg">
                    <img :src="sier2Img" alt="Ogień i manewr — sektory ognia" class="tactical-diagram q-mb-md" />
                    <div class="text-caption text-center text-military-dark">Sektory ognia w trakcie manewru</div>
                  </div>

                  <h5>Komenda „KONTAKT":</h5>
                  <ol>
                    <li><strong>ODPOWIEDZ OGNIEM</strong> — natychmiastowa reakcja ogniowa na przeciwnika</li>
                    <li><strong>PODAJ KIERUNEK</strong> — komunikat o kierunku kontaktu (zegar lub azymut)</li>
                    <li><strong>ZAJMIJ OSŁONĘ</strong> — przemieszczenie za osłonę lub zakrycie</li>
                    <li><strong>MELDUJ</strong> — meldunek do dowódcy o kontakcie</li>
                  </ol>
                </div>

                <!-- 5. Szturm na pozycję -->
                <div v-else-if="selectedTopic.id === 5">
                  <h4>Szturm na pozycję przeciwnika</h4>
                  <p>
                    Szturm to bezpośredni, zdecydowany atak na pozycję/obiekt z zamiarem jej opanowania.
                    Wymaga zsynchronizowanego ognia, manewru i zdecydowanego działania w końcowej fazie.
                  </p>

                  <h5>Elementy szturmu:</h5>
                  <ul>
                    <li>
                      <strong>Grupa wsparcia (GW):</strong>
                      Zapewnia podstawę ognia, neutralizując pozycje ogniowe i przykuwając uwagę przeciwnika
                    </li>
                    <li>
                      <strong>Grupa szturmowa (GS):</strong>
                      Wykonuje bezpośrednie uderzenie na pozycję pod osłoną ognia GW
                    </li>
                    <li>
                      <strong>Ubezpieczenie skrzydeł i tyłu:</strong>
                      Ochrona przed kontratakiem i zamknięciem dróg odwrotu
                    </li>
                  </ul>

                  <h5>Przebieg szturmu:</h5>
                  <ol>
                    <li><strong>Przygotowanie ogniowe:</strong> GW otwiera ogień na pozycje przeciwnika — supresja</li>
                    <li><strong>Sygnał do szturmu:</strong> Dowódca wydaje rozkaz do ataku GS</li>
                    <li><strong>Szybkie podejście:</strong> GS przemieszcza się do granicy pola szturmowego (w skokach lub biegiem)</li>
                    <li><strong>Przejście granicy:</strong> GS wchodzi na pozycję przeciwnika — ogień z biegu, granaty</li>
                    <li><strong>Czyszczenie pozycji:</strong> Systematyczne eliminowanie oporu — oczyszczanie kolejnych stanowisk</li>
                    <li><strong>Rubież zbiórki:</strong> GS osiąga wyznaczoną rubież za pozycją — wołanie „CLEAR"</li>
                    <li><strong>Dołączenie GW:</strong> Grupa wsparcia dołącza do GS na zdobytej pozycji</li>
                  </ol>

                  <h5>Czyszczenie pozycji (stanowiska):</h5>
                  <ul>
                    <li><strong>Podejście z flanki lub tyłu:</strong> Nigdy frontalnie bez zdecydowanej supresji</li>
                    <li><strong>Granaty:</strong> Rzut granatu przed wejściem — okrzyk „GRANAT", schowanie, detonacja, wejście</li>
                    <li><strong>Kąt 90°:</strong> Podchodzenie do okopów pod kątem prostym do osi okopu</li>
                    <li><strong>Dwójkowy system:</strong> Jeden wchodzi, drugi ubezpiecza i prowadzi ogień wzdłuż okopu</li>
                    <li><strong>Komunikacja:</strong> Stałe informowanie partnera o pozycji własnej</li>
                  </ul>

                  <div class="diagram-container q-my-lg">
                    <img :src="zas1Img" alt="Układ sił — szturm na pozycję" class="tactical-diagram q-mb-md" />
                    <div class="text-caption text-center text-military-dark">Układ elementów podczas szturmu</div>
                  </div>

                  <div class="q-pa-md bg-red-1 rounded-borders q-mt-md">
                    <div class="text-weight-medium text-red-8 q-mb-xs">
                      <q-icon name="priority_high" class="q-mr-xs" />
                      Krytyczne błędy podczas szturmu
                    </div>
                    <ul class="q-mb-none">
                      <li>Prowadzenie ognia w kierunku własnych żołnierzy szturmujących (fratricyde)</li>
                      <li>Zatrzymywanie się przed pozycją — zawsze przejść przez cel</li>
                      <li>Utrata łączności i koordynacji między GW i GS</li>
                      <li>Niepełne oczyszczenie pozycji przed konsolidacją</li>
                    </ul>
                  </div>
                </div>

                <!-- 6. Rajd -->
                <div v-else-if="selectedTopic.id === 6">
                  <h4>Rajd</h4>
                  <p>
                    Rajd to krótkotrwała, szybka operacja ofensywna głęboko w ugrupowaniu
                    lub na tyłach przeciwnika, po której siły wracają do bazy lub innego
                    wyznaczonego rejonu. Nie zakłada trwałego zajęcia terenu.
                  </p>

                  <h5>Cechy charakterystyczne rajdu:</h5>
                  <ul>
                    <li>Krótki czas trwania — w, wykonaj zadanie, wyjdź</li>
                    <li>Cel: zniszczenie obiektu, uwolnienie zakładników, schwytanie osoby, zbieranie danych</li>
                    <li>Brak zamiaru trwałego zajęcia terenu</li>
                    <li>Zaskoczenie jako kluczowy element sukcesu</li>
                    <li>Wcześniej przygotowana droga odwrotu</li>
                  </ul>

                  <h5>Fazy rajdu:</h5>
                  <ol>
                    <li><strong>Rejon ześrodkowania (RZ):</strong> Punkt zbiórki przed akcją, przegląd i weryfikacja planu</li>
                    <li><strong>Podejście:</strong> Skryte podejście do obiektu z zachowaniem szyku taktycznego</li>
                    <li><strong>Zajęcie pozycji:</strong> Rozmieszczenie elementów — ubezpieczenie, wsparcie, szturm</li>
                    <li><strong>Uderzenie:</strong> Szybkie, zdecydowane wykonanie zadania na obiekcie</li>
                    <li><strong>Konsolidacja:</strong> Krótka — sprawdzenie sił, zabezpieczenie jeńców/materiałów</li>
                    <li><strong>Odskok:</strong> Szybkie wyjście z rejonu — z góry ustalona trasa i punkt zbiórki</li>
                    <li><strong>Powrót:</strong> Przemieszczenie do bazy lub wyznaczonego rejonu</li>
                  </ol>

                  <h5>Kluczowe zasady rajdu:</h5>
                  <ul>
                    <li><strong>Timing:</strong> Precyzyjne określenie czasu H (zero hour) i synchronizacja działań</li>
                    <li><strong>Drogi odwrotu:</strong> Minimum dwie wcześniej rozpoznane trasy wycofania</li>
                    <li><strong>Punkt zbiórki (PZ):</strong> Wyznaczony przed akcją — spotkanie po zerwaniu kontaktu</li>
                    <li><strong>Zminimalizowanie śladu:</strong> Nie zostawiaj rannych, sprzętu ani śladów możliwych do identyfikacji</li>
                    <li><strong>Komunikacja:</strong> Stała łączność z dowódcą nadrzędnym przez cały czas akcji</li>
                  </ul>
                </div>

                <!-- 7. Konsolidacja i reorganizacja -->
                <div v-else-if="selectedTopic.id === 7">
                  <h4>Konsolidacja i reorganizacja po natarciu</h4>
                  <p>
                    Po opanowaniu celu każda sekcja/oddział musi przeprowadzić konsolidację
                    i reorganizację zanim podejmie kolejne działania. Zaniedbanie tej fazy
                    prowadzi do podatności na kontratak.
                  </p>

                  <h5>Konsolidacja (natychmiastowa — pierwsze 15 minut):</h5>
                  <ol>
                    <li><strong>Obrona 360°:</strong> Natychmiastowe ubezpieczenie dookoła zdobytej pozycji</li>
                    <li><strong>Wołanie „CLEAR":</strong> Potwierdzenie oczyszczenia wszystkich stanowisk</li>
                    <li><strong>Jeńcy i ranni:</strong> Obezwładnienie jeńców, pierwsza pomoc dla rannych — priorytet własnych</li>
                    <li><strong>Meldunek SALUTE:</strong> Przekazanie meldunku o sytuacji do dowódcy nadrzędnego</li>
                    <li><strong>Obserwacja:</strong> Wyznaczenie posterunków obserwacyjnych na prawdopodobnych kierunkach kontrataku</li>
                  </ol>

                  <h5>Reorganizacja (do 30 minut):</h5>
                  <ol>
                    <li><strong>Stan osobowy:</strong> Sprawdzenie KIA/WIA, identyfikacja brakujących żołnierzy</li>
                    <li><strong>Amunicja:</strong> Skontrolowanie stanów, redystrybucja, uzupełnienie krytycznych braków</li>
                    <li><strong>Uzbrojenie i sprzęt:</strong> Sprawdzenie działania, ewentualne zastąpienie uszkodzonego sprzętu</li>
                    <li><strong>Leczenie rannych:</strong> TCCC — leczenie ran i ewakuacja zgodnie z priorytetami</li>
                    <li><strong>Przeszukanie zdobytej pozycji:</strong> Dokumenty, sprzęt, broń, mapy, urządzenia łączności</li>
                    <li><strong>Zniszczenie lub zabranie zdobyczy:</strong> Wg rozkazu — broń, amunicja, sprzęt przeciwnika</li>
                    <li><strong>Przygotowanie do następnego działania:</strong> Aktualizacja planu, nowe zadania</li>
                  </ol>

                  <div class="diagram-container q-my-lg">
                    <img :src="okrImg" alt="Obrona okrężna po zdobyciu pozycji" class="tactical-diagram q-mb-md" />
                    <div class="text-caption text-center text-military-dark">Organizacja obrony okrężnej po zdobyciu pozycji</div>
                  </div>

                  <div class="q-pa-md bg-amber-1 rounded-borders q-mt-md">
                    <div class="text-weight-medium text-amber-8 q-mb-xs">
                      <q-icon name="warning" class="q-mr-xs" />
                      Pamiętaj
                    </div>
                    <div class="text-body2">
                      Kontratak najczęściej następuje zaraz po utracie pozycji przez przeciwnika.
                      Nigdy nie rezygnuj z natychmiastowej obrony 360° po opanowaniu celu.
                    </div>
                  </div>
                </div>

                <!-- 8. Pościg -->
                <div v-else-if="selectedTopic.id === 8">
                  <h4>Pościg</h4>
                  <p>
                    Pościg to działanie ofensywne podjęte w celu zniszczenia wycofujących się
                    sił przeciwnika zanim zdążą zorganizować nową obronę lub uciec z zasięgu.
                    Wymaga zdecydowania i wysokiego tempa działania.
                  </p>

                  <h5>Warunki podjęcia pościgu:</h5>
                  <ul>
                    <li>Potwierdzenie wycofywania się sił przeciwnika</li>
                    <li>Posiadanie wystarczających sił i środków do kontynuacji działań</li>
                    <li>Zgoda/rozkaz dowódcy nadrzędnego</li>
                    <li>Zabezpieczone linie komunikacyjne i tyły</li>
                  </ul>

                  <h5>Zasady prowadzenia pościgu:</h5>
                  <ul>
                    <li><strong>Utrzymanie kontaktu:</strong> Nie wolno utracić kontaktu z wycofującym się przeciwnikiem</li>
                    <li><strong>Maksymalne tempo:</strong> Pościg musi być szybszy niż wycofanie — presja nieustannie</li>
                    <li><strong>Uprzedzenie:</strong> Wysyłanie oddziałów obejścia na prawdopodobne drogi odwrotu</li>
                    <li><strong>Ogień:</strong> Nieprzerwany ogień na cofającego się przeciwnika — brak możliwości reorganizacji</li>
                    <li><strong>Zabezpieczenie boków:</strong> Ochrona przed zasadzkami na bokami i tyłami</li>
                    <li><strong>Granice pościgu:</strong> Wyznaczenie rubieży do której pościg jest dozwolony bez nowych rozkazów</li>
                  </ul>

                  <h5>Typowe błędy podczas pościgu:</h5>
                  <ul>
                    <li>Wpadnięcie w zasadzkę — pogoń "na ślepo" bez rozpoznania</li>
                    <li>Przekroczenie granic ugrupowania — wyjście poza przydzielony rejon działania</li>
                    <li>Utrata kontroli nad jednostkami — zbyt szybkie tempo bez koordynacji</li>
                    <li>Wyczerpanie sił i amunicji bez możliwości uzupełnienia</li>
                  </ul>
                </div>

              </div>
            </q-card-section>
          </q-card>

          <!-- Placeholder -->
          <q-card v-else class="modern-content-card">
            <q-card-section class="text-center q-pa-xl">
              <q-icon name="arrow_forward" size="4rem" color="military-secondary" class="q-mb-md" />
              <div class="text-h6 text-military-secondary">Wybierz temat z listy</div>
              <div class="text-body2 text-military-dark q-mt-sm">
                Kliknij na wybrany temat aby wyświetlić materiał szkoleniowy
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import BackNav from 'components/BackNav.vue'
import sier1Img from 'assets/sier1.png'
import sier2Img from 'assets/sier2.png'
import zas1Img from 'assets/zas1.png'
import okrImg from 'assets/okr.png'

defineOptions({ name: 'TacticsOffensivePage' })

const searchQuery = ref('')
const selectedTopic = ref(null)

const topics = [
  { id: 1, title: 'Ogólne zasady natarcia',         ref: 'S. 251–252' },
  { id: 2, title: 'Przygotowanie do natarcia',       ref: 'S. 253–255' },
  { id: 3, title: 'Podejście i atak',                ref: 'S. 256–258' },
  { id: 4, title: 'Techniki natarcia — ogień i manewr', ref: 'S. 259–261' },
  { id: 5, title: 'Szturm na pozycję',               ref: 'S. 262–264' },
  { id: 6, title: 'Rajd',                            ref: 'S. 265–266' },
  { id: 7, title: 'Konsolidacja i reorganizacja',    ref: 'S. 267' },
  { id: 8, title: 'Pościg',                          ref: 'S. 268' },
]

const filteredTopics = computed(() => {
  if (!searchQuery.value) return topics
  const q = searchQuery.value.toLowerCase()
  return topics.filter(t => t.title.toLowerCase().includes(q) || t.ref.toLowerCase().includes(q))
})

const selectTopic = (topic) => {
  selectedTopic.value = topic
}
</script>

<style scoped>
.modern-bg {
  background: #F5F5F5;
  min-height: 100vh;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.modern-hero-section {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  border: 1px solid #e0e0e0;
}
body.body--dark .modern-hero-section {
  background: #232526 !important;
  color: #f2f2f2 !important;
}
body.body--dark .modern-hero-section .text-military-secondary,
body.body--dark .modern-hero-section .text-military-dark,
body.body--dark .modern-hero-section .text-h4,
body.body--dark .modern-hero-section .text-body1 {
  color: #f2f2f2 !important;
}
.modern-content-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.modern-content-list-col {
  flex: 0 0 280px;
  width: 280px;
}
.modern-content-main-col {
  flex: 1 1 400px;
  min-width: 0;
}
.modern-content-list-card,
.modern-content-card {
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  border: 1px solid #e0e0e0;
}
body.body--dark .modern-content-list-card,
body.body--dark .modern-content-card {
  background: #232526 !important;
  border: 1.5px solid #444950 !important;
}
.modern-content-body h4 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #2d4a22;
}
.modern-content-body h5 {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1.2rem;
  margin-bottom: 0.3rem;
  color: #3a5c2a;
}
body.body--dark .modern-content-body h4,
body.body--dark .modern-content-body h5 {
  color: #a8d5a2 !important;
}
.diagram-container {
  text-align: center;
}
.tactical-diagram {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}
@media (max-width: 700px) {
  .modern-content-row {
    flex-direction: column;
  }
  .modern-content-list-col {
    flex: unset;
    width: 100%;
  }
}
</style>
