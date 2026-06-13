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

                <!-- 1. Ogólne zasady działań zaczepnych -->
                <div v-if="selectedTopic.id === 1">
                  <h4>6.1. Prowadzenie działań zaczepnych</h4>
                  <p>
                    Pododdziały lekkiej piechoty realizując działania zaczepne będą je wykonywały
                    w sposób dynamiczny w formie: szturmu, napadu, wypadu, rajdu oraz innych form
                    określonych w regulaminach działań taktycznych WOT.
                  </p>
                  <p>
                    W działaniach ofensywnych sekcja zwykle będzie działać w składzie plutonu,
                    chociaż nie wyklucza się także działań samodzielnych.
                  </p>

                  <h5>Formy działań zaczepnych:</h5>
                  <div class="q-gutter-sm q-mb-lg">
                    <q-chip color="red-8" text-color="white" icon="bolt" label="Szturm" />
                    <q-chip color="red-7" text-color="white" icon="flash_on" label="Napad" />
                    <q-chip color="red-6" text-color="white" icon="directions_walk" label="Wypad" />
                    <q-chip color="red-5" text-color="white" icon="loop" label="Rajd" />
                  </div>

                  <h5>Cele działań:</h5>
                  <div class="q-pa-md bg-red-1 rounded-borders q-mb-md">
                    <div class="text-weight-medium text-red-8 q-mb-xs">
                      <q-icon name="gps_fixed" class="q-mr-xs" />
                      W szturmie, rajdzie i napadzie
                    </div>
                    <ul class="q-mb-none">
                      <li>Opanowanie wskazanego obiektu</li>
                      <li>Zniszczenie obiektu lub określonych sił przeciwnika</li>
                    </ul>
                  </div>
                  <div class="q-pa-md bg-orange-1 rounded-borders q-mb-md">
                    <div class="text-weight-medium text-orange-8 q-mb-xs">
                      <q-icon name="search" class="q-mr-xs" />
                      W wypadzie
                    </div>
                    <ul class="q-mb-none">
                      <li>Schwytanie jeńca</li>
                      <li>Zdobycie dokumentów, wzorów uzbrojenia lub wyposażenia</li>
                      <li>Zniszczenie obiektu</li>
                    </ul>
                  </div>

                  <h5>Obiekty działań zaczepnych sekcji lekkiej piechoty:</h5>
                  <ul>
                    <li>Obsługa km, moździerza, granatnika</li>
                    <li>Pojazd</li>
                    <li>Posterunek, część małego wzgórza</li>
                    <li>Budynek lub pomieszczenie w budynku</li>
                  </ul>

                  <div class="q-pa-md bg-blue-1 rounded-borders q-mt-md">
                    <div class="text-weight-medium text-blue-8 q-mb-xs">
                      <q-icon name="info" class="q-mr-xs" />
                      Uwaga
                    </div>
                    <div class="text-body2">
                      Szturm jako forma działań może być jednocześnie częścią składową innych form
                      działania takich jak napad, wypad, rajd.
                    </div>
                  </div>
                </div>

                <!-- 2. Szturm -->
                <div v-else-if="selectedTopic.id === 2">
                  <h4>6.2. Prowadzenie działań szturmowych</h4>
                  <p>
                    Prowadzenie działań szturmowych stanowi formę aktywnego działania pododdziału,
                    a jego celem jest zdobycie obiektu przeciwnika, wynikające z danej sytuacji bojowej
                    i jest rezultatem decyzji dowódcy.
                  </p>
                  <p>
                    <strong>Szturm</strong> jest jedną z form reakcji plutonu/sekcji lub taktycznego zachowania
                    w przypadku wykrycia lub wejścia w zasadzkę, z zastosowaniem wszelkich dostępnych środków walki.
                  </p>

                  <div class="q-pa-md bg-red-1 rounded-borders q-mb-lg">
                    <div class="text-weight-medium text-red-8 q-mb-xs">
                      <q-icon name="priority_high" class="q-mr-xs" />
                      Kontakt z przeciwnikiem — dwa przypadki
                    </div>
                    <ol class="q-mb-none">
                      <li>Pluton lub sekcja zostaje wykryta przez przeciwnika — najczęściej wpada w zasadzkę</li>
                      <li>Przeciwnik zostaje wykryty przez pluton lub sekcję</li>
                    </ol>
                  </div>

                  <h5>Najważniejsze zasady prowadzenia szturmu:</h5>
                  <ol>
                    <li><strong>Prędkość i zaskoczenie</strong></li>
                    <li><strong>Skoordynowane prowadzenie ognia</strong></li>
                    <li><strong>Gwałtowność akcji i prędkość wykonywanego manewru</strong></li>
                    <li><strong>Planowe wycofanie</strong> — w uporządkowany sposób, zachowując ubezpieczenie</li>
                  </ol>

                  <h5>Wariant 1 — Szturm bezpośredni (Rys. 109)</h5>
                  <p>
                    Sekcja porusza się szykiem „podwójny sierżant". Nawiązuje kontakt wzrokowy
                    (sygnał: „ZEJDŹ, SCHOWAJ, UKRYJ SIĘ") lub ogniowy (sygnał: „KONTAKT")
                    z przeciwnikiem z przodu. Dowódca wypracowuje decyzję — <strong>SZTURM</strong>.
                  </p>
                  <p>
                    Na komendę dowódcy podsekcja <strong>ALFA</strong> zajmuje stanowiska ogniowe
                    i wykonuje nawałę ogniową. W tym czasie podsekcja <strong>BRAWO</strong> skokami
                    przemieszcza się na rubież ataku bliżej przeciwnika. Po zajęciu stanowisk BRAWO
                    wykonuje nawałę ogniową, a ALFA skokami przemieszcza się dalej. Sekwencja
                    kontynuowana jest dotąd, aż obie podsekcje zbliżą się na odległość do wykonania szturmu.
                    Podsekcje nie przekraczają wyznaczonej przez dowódcę <strong>GD</strong>.
                  </p>

                  <div class="q-mb-lg text-center">
                    <q-img
                      src="~assets/tactics/1.png"
                      alt="Rys. 109. Szturm sekcji na stanowisko ogniowe przeciwnika"
                      style="max-width: 100%; border-radius: 8px; border: 1px solid #e0e0e0;"
                      fit="contain"
                    />
                    <div class="text-caption text-military-dark q-mt-xs">Rys. 109. Szturm sekcji na stanowisko ogniowe przeciwnika</div>
                  </div>

                  <h5>Wariant 2 — Szturm z obejściem (Rys. 110)</h5>
                  <p>
                    Dowódca wypracowuje decyzję — <strong>SZTURM Z OBEJŚCIEM</strong>.
                    Podsekcja <strong>ALFA</strong> (ogniowa) zajmuje stanowiska i wykonuje nawałę ogniową
                    — ogień nasila się w miarę zbliżania się podsekcji szturmowej do przeciwnika.
                    Podsekcja <strong>BRAWO</strong> (szturmowa) wykonuje szybkie obejście i skrycie
                    przemieszcza się na kolejne stanowiska bliżej przeciwnika.
                  </p>
                  <p>
                    Po zajęciu rubieży ataku BRAWO wykonuje szturm, a ALFA przenosi ogień poza GD
                    lub przerywa ogień. Jeśli stanowisko jest poza zasięgiem ognia ALFA,
                    może ona skokami przemieścić się bliżej.
                  </p>

                  <div class="q-mb-lg text-center">
                    <q-img
                      src="~assets/tactics/2.png"
                      alt="Rys. 110. Szturm na stanowisko ogniowe przeciwnika z obejściem"
                      style="max-width: 100%; border-radius: 8px; border: 1px solid #e0e0e0;"
                      fit="contain"
                    />
                    <div class="text-caption text-military-dark q-mt-xs">Rys. 110. Szturm na stanowisko ogniowe przeciwnika z obejściem</div>
                  </div>

                  <div class="q-pa-md bg-amber-1 rounded-borders q-mt-md">
                    <div class="text-weight-medium text-amber-8 q-mb-xs">
                      <q-icon name="warning" class="q-mr-xs" />
                      Który wariant wybrać?
                    </div>
                    <ul class="q-mb-none">
                      <li><strong>Szturm</strong> — teren otwarty, płaski (polana, łąka, rzadki las), z bliskiej odległości</li>
                      <li><strong>Szturm z obejściem</strong> — teren zakryty, pagórkowaty (gęsty las, zabudowa jednorodzinna) zapewniający skrytość podsekcji obejścia</li>
                    </ul>
                  </div>
                </div>

                <!-- 3. Napad -->
                <div v-else-if="selectedTopic.id === 3">
                  <h4>6.3. Napad i napad ogniowy</h4>
                  <p>
                    <strong>Napad</strong> to nagłe, gwałtowne uderzenie na stacjonarny obiekt przeciwnika,
                    wraz ze zorganizowanym wycofaniem się po wykonaniu zadania.
                  </p>

                  <h5>Napad organizuje się w celu:</h5>
                  <ul>
                    <li>Obezwładnienia lub zniszczenia</li>
                    <li>Dezorganizacji pracy/funkcjonowania obiektu</li>
                    <li>Zdobycia dokumentów, materiałów, uzbrojenia lub sprzętu</li>
                    <li>Ujęcia jeńca lub uprowadzenia ważnej osobistości</li>
                  </ul>

                  <div class="q-mb-lg text-center q-mt-md">
                    <q-img
                      src="~assets/tactics/3.png"
                      alt="Rys. 111. Schemat ideowy wykonania napadu na obiekt"
                      style="max-width: 100%; border-radius: 8px; border: 1px solid #e0e0e0;"
                      fit="contain"
                    />
                    <div class="text-caption text-military-dark q-mt-xs">Rys. 111. Schemat ideowy wykonania napadu na obiekt</div>
                  </div>

                  <h5>Rodzaje napadu:</h5>
                  <div class="q-pa-md bg-grey-2 rounded-borders q-mb-md">
                    <div class="text-weight-bold text-military-secondary q-mb-xs">Napad ogniowy (bez wtargnięcia)</div>
                    <p class="q-mb-none text-body2">Polega na ostrzelaniu maksymalną siłą ogniową obiektu w celu zniszczenia jego urządzeń i siły żywej.</p>
                  </div>
                  <div class="q-pa-md bg-grey-2 rounded-borders q-mb-md">
                    <div class="text-weight-bold text-military-secondary q-mb-xs">Napad z wtargnięciem na obiekt</div>
                    <p class="q-mb-none text-body2">Organizowany w celu schwytania jeńca, zabrania dokumentów, nowych wzorów uzbrojenia bądź uzupełnienia własnych zasobów.</p>
                  </div>

                  <h5>Podstawowe cechy działania w czasie napadu:</h5>
                  <ul>
                    <li>Skrytość działania</li>
                    <li>Wykorzystanie elementu zaskoczenia</li>
                    <li>Skoordynowane prowadzenie ognia przez poszczególne elementy</li>
                    <li>Gwałtowność akcji</li>
                    <li>Zorganizowane wycofanie</li>
                  </ul>

                  <h5>Rekonesans rejonu obiektu (Rys. 113)</h5>
                  <p>
                    Pluton zatrzymuje się ok. 500–600 m od obiektu i wykonuje procedurę „HAK".
                    Dowódca z radiotelefonistą, strzelcem wyborowym i dwoma żołnierzami rozpoznaje
                    Rejon Ześrodkowania (RZ) — ok. 300–400 m od obiektu. Kierunek „godz. 12" określa się
                    na obiekt, „godz. 6" w kierunku podejścia. Wykonywana jest „Procedura 5-25".
                    W RZ organizowany jest system obserwacji i ubezpieczenia 360°.
                  </p>
                  <p>
                    W rejon obiektu udają się dowódca z dowódcami grup i elementem <strong>„oko"</strong>
                    (dwaj żołnierze obserwujący zmiany sytuacji do momentu rozpoczęcia napadu).
                    Podczas rekonesansu ustalają: miejsce GU, GW, GS, GD, punkt medyczny
                    oraz <strong>PR</strong> — punkt w terenie, przez który przechodzą wszyscy żołnierze.
                  </p>

                  <div class="q-mb-lg text-center">
                    <q-img
                      src="~assets/tactics/4.png"
                      alt="Rys. 113. Rekonesans rejonu obiektu napadu"
                      style="max-width: 100%; border-radius: 8px; border: 1px solid #e0e0e0;"
                      fit="contain"
                    />
                    <div class="text-caption text-military-dark q-mt-xs">Rys. 113. Rekonesans rejonu obiektu napadu</div>
                  </div>

                  <h5>Schemat organizacji do napadu (Rys. 114)</h5>
                  <div class="q-mb-lg text-center">
                    <q-img
                      src="~assets/tactics/5.png"
                      alt="Rys. 114. Schemat organizacji do napadu"
                      style="max-width: 100%; border-radius: 8px; border: 1px solid #e0e0e0;"
                      fit="contain"
                    />
                    <div class="text-caption text-military-dark q-mt-xs">Rys. 114. Schemat organizacji do napadu</div>
                  </div>

                  <h5>Ugrupowanie do napadu:</h5>
                  <div class="q-pa-md bg-grey-2 rounded-borders q-mb-sm">
                    <div class="text-weight-bold text-red-8 q-mb-xs">GU — Grupa Ubezpieczenia</div>
                    <ul class="q-mb-none text-body2">
                      <li>Prowadzenie obserwacji i meldowanie o przeciwniku</li>
                      <li>Ubezpieczenie rejonu obiektu z kierunków największego zagrożenia</li>
                      <li>Niedopuszczenie sił przeciwnika do/z rejonu napadu</li>
                      <li>Wyposażenie: miny kierunkowe, środki przeciwpancerne</li>
                    </ul>
                  </div>
                  <div class="q-pa-md bg-grey-2 rounded-borders q-mb-sm">
                    <div class="text-weight-bold text-red-8 q-mb-xs">GW — Grupa Wsparcia</div>
                    <ul class="q-mb-none text-body2">
                      <li>Obsługa broni zespołowej — stanowisko o najlepszych możliwościach prowadzenia ognia</li>
                      <li>Wsparcie GS ogniem broni zespołowej</li>
                    </ul>
                  </div>
                  <div class="q-pa-md bg-grey-2 rounded-borders q-mb-md">
                    <div class="text-weight-bold text-red-8 q-mb-xs">GS — Grupa Szturmowa</div>
                    <ul class="q-mb-none text-body2">
                      <li>Główna siła uderzeniowa — pozycja zapewniająca maskowanie przed obserwacją z obiektu</li>
                      <li>W składzie: Zespół Torujący, Zespoły Przeszukujące, Zespół Niszczący, Zespół Ewakuacyjno-Ratunkowy</li>
                    </ul>
                  </div>

                  <h5>Wykonanie napadu</h5>
                  <p>
                    Na sygnał dowódcy GS skrycie podchodzi możliwie najbliżej obiektu.
                    Sygnałem rozpoczęcia napadu jest otwarcie ognia przez GW.
                    GW maksymalnie razi przeciwnika w obiekcie, następuje gwałtowne uderzenie ogniowe
                    wraz z wdarciem się do obiektu przez GS przez wykonane przejście w zaporach.
                    W momencie wdzierania się GS — GW przenosi lub przerywa ogień.
                    GS, stosując zasadę wzajemnego ubezpieczania się, skokami zajmuje GD.
                  </p>

                  <div class="q-pa-md bg-red-1 rounded-borders q-mb-md">
                    <div class="text-weight-medium text-red-8 q-mb-xs">
                      <q-icon name="checklist" class="q-mr-xs" />
                      Dowódca plutonu musi pamiętać o:
                    </div>
                    <ul class="q-mb-none">
                      <li>Organizacji ubezpieczenia terenu w zakresie 360°</li>
                      <li>Podziale broni zespołowej jeśli obsługi zostały wyłączone z walki</li>
                      <li>Udzieleniu pomocy i przygotowaniu do ewakuacji rannych</li>
                      <li>Równomiernym rozdziale pozostałej amunicji między żołnierzy</li>
                      <li>Zachowaniu „łańcucha dowodzenia"</li>
                    </ul>
                  </div>

                  <div class="q-mb-lg text-center">
                    <q-img
                      src="~assets/tactics/6.png"
                      alt="Rys. 116. Działanie zespołów po wejściu do obiektu napadu"
                      style="max-width: 100%; border-radius: 8px; border: 1px solid #e0e0e0;"
                      fit="contain"
                    />
                    <div class="text-caption text-military-dark q-mt-xs">Rys. 116. Działanie zespołów po wejściu do obiektu napadu</div>
                  </div>

                  <h5>Odejście z rejonu napadu (Rys. 117)</h5>
                  <p>
                    Odejście następuje w sposób zorganizowany. Na pierwszy sygnał dowódcy żołnierze GS
                    (oprócz Zespołu Niszczącego) wycofują się przez przejście w zaporze, gdzie są
                    liczeni „w bramce", a następnie biegiem do PR i dalej do RZ.
                    Dowódca podaje drugi sygnał do Zespołu Niszczącego — odpalenie zapalników
                    z planowaną zwłoką. Wybuch jest sygnałem dla GU do wycofania się przez PR do RZ.
                  </p>
                  <p>
                    Po przeliczeniu żołnierzy dowódca nakazuje przemarsz do rejonu ok. 800–1000 m,
                    gdzie odtwarzana jest zdolność bojowa pododdziału.
                  </p>

                  <div class="q-mb-lg text-center">
                    <q-img
                      src="~assets/tactics/7.png"
                      alt="Rys. 117. Odejście z rejonu (obiektu) napadu"
                      style="max-width: 100%; border-radius: 8px; border: 1px solid #e0e0e0;"
                      fit="contain"
                    />
                    <div class="text-caption text-military-dark q-mt-xs">Rys. 117. Odejście z rejonu (obiektu) napadu</div>
                  </div>
                </div>

                <!-- 4. Wypad -->
                <div v-else-if="selectedTopic.id === 4">
                  <h4>6.4. Wypad</h4>
                  <p>
                    <strong>Wypad</strong> to jeden z rodzajów działań zaczepnych w warunkach bezpośredniej
                    styczności wojsk. Polega na skrytym przekroczeniu linii styczności przez wydzielony
                    pododdział (grupę wypadową) — z zadaniem wykonania zasadzki lub napadu na zawczasu
                    zaplanowany obiekt w ugrupowaniu przeciwnika, lub zdobycia danych rozpoznawczych,
                    wraz ze zorganizowanym wycofaniem się w ugrupowanie wojsk własnych.
                  </p>

                  <h5>Wypad organizuje się w celu:</h5>
                  <ul>
                    <li>Zdobycia danych rozpoznawczych</li>
                    <li>Ujęcia jeńców</li>
                    <li>Niszczenia istotnych obiektów</li>
                  </ul>

                  <h5>Wybór sposobu wykonania zadania zależy od:</h5>
                  <ul>
                    <li>Posiadanych sił i środków</li>
                    <li>Pory dnia (noc/dzień)</li>
                    <li>Rozpoznania kierunku (pasa) przenikania</li>
                    <li>Aktywności wojsk przeciwnika na linii styczności</li>
                    <li>Rodzaju i obrony obiektu</li>
                  </ul>

                  <h5>Podstawowe cechy działania w czasie wypadu:</h5>
                  <ul>
                    <li>Organizacja rozpoznania kierunku lub pasa przenikania</li>
                    <li>Synchronizacja działań z wojskami w styczności</li>
                    <li>Skrytość działania w czasie przenikania</li>
                    <li>Wykorzystanie elementu zaskoczenia</li>
                    <li>Gwałtowność akcji</li>
                    <li>Zorganizowane wycofanie we współdziałaniu z wojskami własnymi</li>
                  </ul>

                  <h5>Fazy realizacji wypadu:</h5>
                  <div class="q-pa-md bg-grey-2 rounded-borders q-mb-sm">
                    <div class="text-weight-bold text-military-secondary q-mb-xs">FAZA I — Planowanie i rekonesans</div>
                    <ul class="q-mb-none text-body2">
                      <li>Planowanie przez mikro sztab (pllp, slp), koordynacja z wojskami w styczności</li>
                      <li>Przygotowanie do działania (w tym trening działania)</li>
                    </ul>
                  </div>
                  <div class="q-pa-md bg-grey-2 rounded-borders q-mb-sm">
                    <div class="text-weight-bold text-military-secondary q-mb-xs">FAZA II — Realizacja</div>
                    <ul class="q-mb-none text-body2">
                      <li>Wyjście na kierunek/pas przenikania</li>
                      <li>Przejście przez linię styczności, koordynowane z działaniami mylącymi (jeśli są)</li>
                      <li>Osiągnięcie rejonu bazy przejściowej</li>
                      <li>Potwierdzenie założeń przyjętych w planowaniu (rekonesans)</li>
                      <li>Wykonanie nakazanego/zaplanowanego zadania</li>
                      <li>Odtworzenie gotowości w bazie przejściowej i odejście w kierunku linii styczności</li>
                      <li>Przekroczenie linii styczności i powrót w ugrupowanie wojsk własnych</li>
                    </ul>
                  </div>
                  <div class="q-pa-md bg-grey-2 rounded-borders q-mb-sm">
                    <div class="text-weight-bold text-military-secondary q-mb-xs">FAZA III — Odtwarzanie gotowości</div>
                    <ul class="q-mb-none text-body2">
                      <li>Powrót do MCzP</li>
                      <li>Przekazanie pozyskanych danych rozpoznawczych</li>
                      <li>Fizyczne odtworzenie zdolności bojowej pododdziału</li>
                    </ul>
                  </div>
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

defineOptions({ name: 'TacticsOffensivePage' })

const searchQuery = ref('')
const selectedTopic = ref(null)

const topics = [
  { id: 1, title: 'Ogólne zasady działań zaczepnych', ref: 'S. 251' },
  { id: 2, title: 'Szturm — działania szturmowe', ref: 'S. 252–255' },
  { id: 3, title: 'Napad i napad ogniowy', ref: 'S. 256–265' },
  { id: 4, title: 'Wypad', ref: 'S. 265–267' }
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
