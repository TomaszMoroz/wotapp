<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav color="black"/>

      <div class="hero-section q-pa-lg q-mb-lg">
        <div class="row items-center">
          <div class="col">
            <div class="text-h4 text-weight-bold text-white q-mb-sm">
              <q-icon name="military_tech" class="q-mr-md" />
              Regulamin Musztry Sił Zbrojnych RP
            </div>
            <div class="text-subtitle1 text-grey-3">
              Ministerstwo Obrony Narodowej - Sztab Generalny WP
            </div>
            <div class="text-caption text-grey-4">
              Szt. Gen. 1427/94 | Warszawa 1994
            </div>
          </div>
        </div>
      </div>

      <div class="content-card q-pa-lg">
        <!-- Nawigacja rozdziałów -->
        <div class="controls-section q-mb-md">
          <q-btn-dropdown
            color="grey-9"
            icon="list"
            label="Przejdź do rozdziału"
            outlined
          >
            <q-list>
              <q-item clickable v-close-popup @click="scrollToSection('zasady-ogolne')">
                <q-item-section>
                  <q-item-label>Rozdział 1: Zasady Ogólne</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="scrollToSection('musztra-indywidualna')">
                <q-item-section>
                  <q-item-label>Rozdział 2: Musztra Indywidualna</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="scrollToSection('musztra-zespolowa')">
                <q-item-section>
                  <q-item-label>Rozdział 3: Musztra Zespołowa</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="scrollToSection('musztra-pojazdy')">
                <q-item-section>
                  <q-item-label>Rozdział 4: Musztra z Pojazdami</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>        <!-- Główna treść regulaminu -->
        <div class="regulation-content">

          <!-- ROZDZIAŁ 1: ZASADY OGÓLNE -->
          <section id="zasady-ogolne" class="regulation-section">
            <div class="section-header">
              <h2 class="text-h5 text-weight-bold text-white q-mb-md">
                ROZDZIAŁ 1 - ZASADY OGÓLNE
              </h2>
            </div>

            <div class="article">
              <div class="article-number">1.</div>
              <div class="article-content">
                <strong>Musztra</strong> - to ćwiczenia wojskowe, które uczą, jak przyjmować postawę zasadniczą i swobodną, oddawać honory, poruszać się z bronią i bez broni, formować szyki oraz zachowywać się w szyku i poza nim.
                <br><br>
                Rozróżnia się musztrę indywidualną i zespołową pieszą oraz z pojazdami (wozami bojowymi).
                <br><br>
                Musztra indywidualna przygotowuje żołnierza do wystąpień służbowych oraz do działania w zespole.
                <br><br>
                Musztra zespołowa przygotowuje pododdziały i oddziały do wystąpień służbowych oraz działania w szyku pieszym i z pojazdami.
              </div>
            </div>

            <div class="article">
              <div class="article-number">2.</div>
              <div class="article-content">
                Pododdziały i oddziały występują i działają w odpowiednim ugrupowaniu i szyku.
                <br><br>
                <strong>Ugrupowanie w musztrze</strong> - to ustawienie żołnierzy, pododdziałów i oddziałów pieszych lub z pojazdami w szyku odpowiednim do wykonania określonych frontem w jednym kierunku, w nakazanym szyku, w odstępach określonych w regulaminie lub w rozkazie dowódcy.
                <br><br>
                Pododdziały przyjmują je w czasie wystąpień służbowych oraz uroczystości wojskowych i państwowych. <strong>Ugrupowanie marszowe</strong> - to ustawienie oddziału, pododdziału lub pododdziałów (pojazdów, żołnierzy) w kolumnach (kolumnie) do marszu.
                <br><br>
                W ugrupowaniu mogą być stosowane różne szyki.
              </div>
            </div>

            <div class="article">
              <div class="article-number">3.</div>
              <div class="article-content">
                <strong>Szyk</strong> - to określone w regulaminie ustawienie żołnierzy (pojazdów) lub pododdziałów - do wspólnego wykonywania czynności — w ugrupowaniu rozwiniętym lub marszowym.
                <br><br>
                Żołnierze (pojazdy) ustawiają się w szyku zgodnie z podziałem organizacyjnym lub w sposób nakazany przez dowódcę. Niektóre szyki może już tworzyć dwóch żołnierzy (dwa pojazdy), np.: szereg, rząd.
                <br><br>
                Na szyk składają się następujące elementy:
                <ul class="regulation-list">
                  <li><strong>skrzydło</strong> - prawe i lewe zakończenie szyku</li>
                  <li><strong>front</strong> - kierunek ustawienia żołnierzy (pojazdów)</li>
                  <li><strong>odstęp</strong> - oddalenie między żołnierzami (pojazdami), pododdziałami lub oddziałami, mierzone wzdłuż frontu szyku</li>
                  <li><strong>odległość</strong> - oddalenie między żołnierzami, szeregami i pododdziałami (pojazdami), mierzone w głąb szyku</li>
                  <li><strong>szerokość</strong> - odstęp między skrzydłami szyku</li>
                  <li><strong>głębokość</strong> - odległość od czoła do ogona szyku</li>
                  <li><strong>czoło kolumny</strong> - początek kolumny</li>
                  <li><strong>ogon kolumny</strong> - koniec kolumny</li>
                  <li><strong>kierunkowy</strong> - to poruszający się w nakazanym kierunku żołnierz, pojazd lub pododdział, do którego dostosowują swój ruch inni żołnierze (pododdziały, pojazdy)</li>
                  <li><strong>zamykający</strong> - żołnierz (pojazd) lub pododdział znajdujący się w ostatnim szeregu kolumny na lewym skrzydle</li>
                </ul>
              </div>
            </div>

            <div class="article">
              <div class="article-number">4.</div>
              <div class="article-content">
                <strong>Szereg</strong> - to szyk, w którym:
                <br>
                a) żołnierze stoją obok siebie w odstępie równym szerokości dłoni (mierzonym na wysokości łokci), frontem w jednym kierunku, w linii prostej;
                <br>
                b) pojazdy są rozmieszczone jeden obok drugiego w odstępie trzech kroków, przodem w jednym kierunku, w linii prostej.
              </div>
            </div>

            <div class="article">
              <div class="article-number">5.</div>
              <div class="article-content">
                <strong>Dwuszereg</strong> - to szyk, w którym dwa szeregi żołnierzy stoją jeden za drugim, frontem w jednym kierunku, w odległości równej półtorej długości wyciągniętej ręki z wyprostowanymi palcami (około 1,2 m). Żołnierze drugiego szeregu kryją swoich poprzedników.
                <br><br>
                Dwuszereg jest pełny, jeżeli żołnierza lewoskrzydłowego pierwszego szeregu kryje żołnierz drugiego szeregu; niepełny - jeżeli nie kryje.
              </div>
            </div>

            <div class="article">
              <div class="article-number">6.</div>
              <div class="article-content">
                <strong>Kolumna</strong> - to szyk, w którym żołnierze - stojąc frontem w jednym kierunku, jeden za drugim, w odległości około 1,2 m - tworzą rząd (kolumnę pojedynczą) lub dwa i więcej rzędów (kolumnę dwójkową, trójkową itp.) ustawionych w odstępach równych szerokości dłoni.
                <br><br>
                Pojazdy rozmieszcza się jeden za drugim w odległości piętnastu kroków, przodem w jednym kierunku. Odległość między pojazdami w kolumnie mierzy się od tylnej części pojazdu lub holowanego sprzętu do przedniej części następnego pojazdu.
              </div>
            </div>

            <div class="article">
              <div class="article-number">10.</div>
              <div class="article-content">
                <strong>Komenda</strong> - to krótki rozkaz - podany słownie lub przez środki łączności - do natychmiastowego wykonania, a gdy dotyczy grupy żołnierzy lub pododdziału (oddziału) - również jednoczesnego i jednolitego.
                <br><br>
                Komenda składa się z zapowiedzi i hasła. Jest kilka komend zawierających tylko hasło, np.: „BACZNOŚĆ", „SPOCZNIJ".
                <br><br>
                <strong>Zapowiedź komendy</strong> podaje się wyraźnie, głosem donośnym, przeciągając ostatnią zgłoskę.
                <br><br>
                <strong>Hasło komendy</strong> (wydrukowane w regulaminie dużymi literami) podaje się po krótkiej przerwie, głośno, wyraźnie, krótko i dobitnie. Po haśle należy wykonać komendę.
              </div>
            </div>
          </section>

          <!-- ROZDZIAŁ 2: MUSZTRA INDYWIDUALNA -->
          <section id="musztra-indywidualna" class="regulation-section">
            <div class="section-header">
              <h2 class="text-h5 text-weight-bold text-white q-mb-md">
                ROZDZIAŁ 2 - MUSZTRA INDYWIDUALNA
              </h2>
              <h3 class="text-h6 text-weight-bold text-brown-4 q-mb-md">
                POSTAWA ZASADNICZA I SWOBODNA
              </h3>
            </div>

            <div class="article">
              <div class="article-number">18.</div>
              <div class="article-content">
                <strong>Postawa zasadnicza</strong> — to pozycja przyjmowana przez żołnierzy do wykonania nakazanych czynności lub do wystąpień służbowych.
                <br><br>
                W postawie zasadniczej żołnierz stoi nieruchomo. Ciężar ciała spoczywa równomiernie na obu stopach. Pięty są złączone, stopy zaś rozwarte na szerokość środkowej części podeszwy buta. Nogi w kolanach wyprostowane, mięśnie nóg lekko naprężone. Tułów wyprostowany. Brzuch lekko wciągnięty, ramiona cofnięte do tyłu - na jednakowej wysokości i równolegle do linii frontu. Ręce opuszczone i wyprostowane w łokciach. Palce zwarte i wyprostowane; palec środkowy ułożony wzdłuż szwu spodni. Głowa podniesiona, wzrok skierowany na wprost, usta zamknięte.
                <br><br>
                Żołnierz przyjmuje postawę zasadniczą na komendę „BACZNOŚĆ" oraz bez tej komendy w następujących przypadkach:
                <ul class="regulation-list">
                  <li>na zapowiedź komendy nie poprzedzonej komendą „BACZNOŚĆ"</li>
                  <li>po wykonaniu komendy „ZBIÓRKA" i podczas:</li>
                  <li>wydawania lub przyjmowania rozkazów</li>
                  <li>składania meldunku i przedstawiania się</li>
                  <li>oddawania honorów w miejscu</li>
                  <li>podawania komend w miejscu</li>
                </ul>
              </div>
            </div>

            <div class="article">
              <div class="article-number">20.</div>
              <div class="article-content">
                <strong>Postawa swobodna</strong> - to pozycja umożliwiająca żołnierzowi częściowy odpoczynek podczas wykonywania regulaminowych czynności i wystąpień służbowych, przede wszystkim podczas parad i uroczystości wojskowych. Przyjmuje się ją na komendę „SPOCZNIJ" oraz samoczynnie w sytuacjach określonych w regulaminach.
                <br><br>
                Na komendę „SPOCZNIJ" żołnierz energicznie wysuwa lewą nogę w lewo w skos na odległość równą połowie długości stopy.
                <br><br>
                Ciężar ciała spoczywa na prawej nodze. Ręce opuszczone swobodnie, palce ułożone dowolnie. Żołnierz ma swobodę ruchów, lecz nie wolno mu rozmawiać w szyku.
              </div>
            </div>

            <div class="subsection-header">
              <h3 class="text-h6 text-weight-bold text-brown-4 q-mb-md">
                ZWROTY
              </h3>
            </div>

            <div class="article">
              <div class="article-number">22.</div>
              <div class="article-content">
                Zwroty w miejscu wykonuje się na komendę: „W lewo (w prawo, w tył) - ZWROT". Zwroty w lewo i w tył wykonuje się w stronę lewej ręki, na obcasie buta lewej nogi i czubku prawego buta, energicznie dostawiając najkrótszą drogą nogę pozostawioną w tyle. Zwrot w prawo - odwrotnie. W czasie zwrotu górna część ciała pozostaje jak w postawie zasadniczej; nóg w kolanach nie zgina się.
              </div>
            </div>

            <div class="subsection-header">
              <h3 class="text-h6 text-weight-bold text-brown-4 q-mb-md">
                MARSZ, BIEG I ZATRZYMYWANIE
              </h3>
            </div>

            <div class="article">
              <div class="article-number">24.</div>
              <div class="article-content">
                Marsz rozpoczyna się z postawy zasadniczej lewą nogą. Wykonuje się go krokiem defiladowym lub zwykłym, natomiast marsz w miejscu — tylko krokiem zwykłym. Marsz poprzedza komenda np.: „Szeregowy Kalinowski, kierunek na wprost (w lewo, w prawo, w tył na lewo, w tył na prawo, w lewo w skos, w prawo w skos) — MARSZ" lub „Szeregowy Kalinowski, za mną - MARSZ".
                <br><br>
                Po każdej komendzie pierwsze trzy kroki wykonuje się krokiem defiladowym na wprost (z wyjątkiem marszu w miejscu).
              </div>
            </div>

            <div class="article">
              <div class="article-number">25.</div>
              <div class="article-content">
                <strong>Krok defiladowy</strong> stosuje się:
                <ul class="regulation-list">
                  <li>rozpoczynając marsz (pierwsze trzy kroki)</li>
                  <li>w marszu po komendzie „BACZNOŚĆ"</li>
                  <li>w marszu po zapowiedzi komendy dotyczącej zatrzymania się</li>
                  <li>w czasie występowania z (wstępowania do) szyku</li>
                </ul>
                <br>
                Żołnierz, rozpoczynając marsz krokiem defiladowym, podnosi stopę na wysokość około 10 cm i stawia ją sprężyście z lekkim przybiciem. Tułów ma wyprostowany, pierś podaną do przodu, wzrok skierowany na wprost.
                <br><br>
                Długość kroku - 60-80 cm. Tempo marszu - 112-116 kroków na minutę.
              </div>
            </div>

            <div class="article">
              <div class="article-number">26.</div>
              <div class="article-content">
                <strong>Krok zwykły</strong> obowiązuje na terenie koszar, miast, osiedli itp. oraz podczas śpiewu w marszu. Żołnierze, występujący indywidualnie, stosują go również podczas oddawania honorów w marszu, a także w czasie podchodzenia do (odchodzenia od) przełożonego.
                <br><br>
                Maszerując krokiem zwykłym żołnierz ma głowę uniesioną, tułów wyprostowany. Wymach rąk swobodny - w takt marszu. Długość kroku - 60-70 cm. Tempo - 112-116 kroków na minutę.
              </div>
            </div>

            <div class="subsection-header">
              <h3 class="text-h6 text-weight-bold text-brown-4 q-mb-md">
                ODDAWANIE HONORÓW
              </h3>
            </div>

            <div class="article">
              <div class="article-number">63.</div>
              <div class="article-content">
                W miejscu, w nakryciu głowy i bez broni żołnierz salutuje w postawie zasadniczej. Z chwilą zbliżenia się przełożonego na trzy kroki zwraca głowę w jego stronę („frontuje") oraz wykonuje zwrot głowy) i podnosi szybkim ruchem do daszka czapki (obrzeża hełmu, beretu, furażerki) prawą rękę tak ułożoną, aby przedramię i dłoń oraz złączone palce - wskazujący i środkowy - tworzyły linię prostą; pozostałe palce dłoni są złożone i przyciśnięte kciukiem.
                <br><br>
                Wystającą część palca środkowego przykłada - od strony palca wskazującego - do brzegu daszka czapki (do obrzeża hełmu, beretu, furażerki) nad kątem prawego oka; dłoń jest zwrócona ku przodowi, łokieć zaś skierowany w dół i na prawo w skos.
              </div>
            </div>

            <div class="article">
              <div class="article-number">64.</div>
              <div class="article-content">
                W marszu, w nakryciu głowy i bez broni żołnierz salutuje z jednoczesnym zwróceniem głowy w stronę przełożonego, przy czym lewa ręka przyłożona lekko dłonią do uda pozostaje nieruchoma. Palce ręki są złączone i wyprostowane. Salutowanie rozpoczyna trzy kroki przed przełożonym, a kończy po minięciu go.
              </div>
            </div>
          </section>

          <!-- ROZDZIAŁ 3: MUSZTRA ZESPOŁOWA -->
          <section id="musztra-zespolowa" class="regulation-section">
            <div class="section-header">
              <h2 class="text-h5 text-weight-bold text-white q-mb-md">
                ROZDZIAŁ 3 - MUSZTRA ZESPOŁOWA
              </h2>
              <h3 class="text-h6 text-weight-bold text-brown-4 q-mb-md">
                DRUŻYNA
              </h3>
            </div>

            <div class="article">
              <div class="article-number">67.</div>
              <div class="article-content">
                W ugrupowaniu rozwiniętym drużyna występuje w następujących szykach:
                <ul class="regulation-list">
                  <li>w szeregu</li>
                  <li>w dwuszeregu</li>
                </ul>
              </div>
            </div>

            <div class="article">
              <div class="article-number">68.</div>
              <div class="article-content">
                W ugrupowaniu marszowym drużyna występuje w następujących szykach:
                <ul class="regulation-list">
                  <li>w rzędzie</li>
                  <li>w kolumnie dwójkowej</li>
                </ul>
              </div>
            </div>

            <div class="article">
              <div class="article-number">69.</div>
              <div class="article-content">
                Aby ustawić żołnierzy w szyku dowódca zarządza zbiórkę.
                <br><br>
                Na zapowiedź komendy, np.: „Pierwsza drużyna", lub na komendę „BACZNOŚĆ" żołnierze zwracają się frontem do dowódcy i przyjmują postawę zasadniczą.
                <br><br>
                Następnie dowódca podaje zapowiedź, np.: „W dwuszeregu", i staje w postawie zasadniczej w miejscu, w którym chce ustawić pododdział. Na hasło „ZBIÓRKA" żołnierze biegną do dowódcy i stają w nakazanym szyku, w postawie zasadniczej i w tym samym co on kierunku (jeżeli nie nakazał inaczej).
              </div>
            </div>

            <div class="subsection-header">
              <h3 class="text-h6 text-weight-bold text-brown-4 q-mb-md">
                PLUTON
              </h3>
            </div>

            <div class="article">
              <div class="article-number">78.</div>
              <div class="article-content">
                W ugrupowaniu rozwiniętym pluton występuje w następujących szykach:
                <ul class="regulation-list">
                  <li>w szeregu</li>
                  <li>w dwuszeregu</li>
                  <li>w trójszeregu</li>
                </ul>
              </div>
            </div>

            <div class="article">
              <div class="article-number">79.</div>
              <div class="article-content">
                W ugrupowaniu marszowym pluton występuje w następujących szykach:
                <ul class="regulation-list">
                  <li>w rzędzie</li>
                  <li>w kolumnie dwójkowej</li>
                  <li>w kolumnie trójkowej</li>
                  <li>w kolumnie czwórkowej</li>
                </ul>
              </div>
            </div>

            <div class="subsection-header">
              <h3 class="text-h6 text-weight-bold text-brown-4 q-mb-md">
                MARSZ I ZATRZYMYWANIE
              </h3>
            </div>

            <div class="article">
              <div class="article-number">100.</div>
              <div class="article-content">
                Marsz rozpoczyna się na komendę, np.: „Pierwsza drużyna, kierunek na wprost (w prawo, w lewo, w tył na prawo, w tył na lewo) - MARSZ" lub „Pierwsza drużyna, za mną - MARSZ". Zatrzymanie następuje na komendę, np.: „Drużyna (pluton itp.) - STÓJ". Czynności te wykonuje się według zasad podanych w części dotyczącej musztry indywidualnej.
              </div>
            </div>

            <div class="article">
              <div class="article-number">105.</div>
              <div class="article-content">
                W ugrupowaniu rozwiniętym pododdział (oddział) bez broni oddaje honory na komendy: „BACZNOŚĆ", „Na prawo (lewo) - PATRZ". Żołnierze zwracają energicznie głowy w nakazanym kierunku, patrzą na przełożonego i prowadzą go wzrokiem. Dowódcy (od dowódcy plutonu wzwyż), oficerowie, chorążowie i inni żołnierze funkcyjni znajdujący się na prawym skrzydle pododdziału oraz szefowie kompanii salutują.
              </div>
            </div>
          </section>

          <!-- ROZDZIAŁ 4: MUSZTRA Z POJAZDAMI -->
          <section id="musztra-pojazdy" class="regulation-section">
            <div class="section-header">
              <h2 class="text-h5 text-weight-bold text-white q-mb-md">
                ROZDZIAŁ 4 - MUSZTRA Z POJAZDAMI
              </h2>
              <h3 class="text-h6 text-weight-bold text-brown-4 q-mb-md">
                ZASADY OGÓLNE
              </h3>
            </div>

            <div class="article">
              <div class="article-number">116.</div>
              <div class="article-content">
                Pododdziały wyposażone w pojazdy działają w odpowiednim ugrupowaniu i szyku. Rodzaj szyku ustala dowódca w zależności od wielkości rejonu zbiórki, liczby pojazdów i innych warunków.
                <br><br>
                Pojazdy ustawia się: w szeregach, w kolumnach lub liniach kolumn. Pojazdy w szeregach ustawia się w odstępach 3 kroków. Odstępy między pododdziałami w szeregu i między kolumnami w liniach kolumn wynoszą 5 kroków. Pojazdy w kolumnach ustawia się w odległości 15 kroków, natomiast odległości między pododdziałami wynoszą 25 kroków.
              </div>
            </div>

            <div class="article">
              <div class="article-number">121.</div>
              <div class="article-content">
                Wsiadanie do pojazdów następuje na komendę dowódcy „DO POJAZDÓW".
                <br><br>
                Przed tą komendą należy podać komendę do rozładowania i zabezpieczenia broni oraz do zdjęcia bagnetów.
                <br><br>
                Jeżeli konieczny jest przejazd z bronią załadowaną, to należy podać tylko komendę „Zabezpiecz - BROŃ". Wsiadając do pojazdów, żołnierze trzymają broń w położeniu jak najdogodniejszym, z wyjątkiem karabinów maszynowych, które przekazują żołnierzom znajdującym się już w pojeździe lub stojącym za pojazdem (obok niego).
              </div>
            </div>

            <div class="article">
              <div class="article-number">123.</div>
              <div class="article-content">
                Wysiadanie z pojazdów następuje na komendę dowódcy „Z POJAZDÓW". Żołnierze szybko wysiadają (w kolejności odwrotnej niż przy wsiadaniu) i ustawiają się za pojazdami lub wykonują czynności nakazane przez dowódcę.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.page-background {
  background: #f7f8f9;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  background: #494747;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15,44,5,0.07);
  border: 1px solid #e0e0e0;
}

.content-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15,44,5,0.07);
  min-height: 600px;
  border: 1px solid #e0e0e0;
}

.controls-section {
  border-bottom: 1px solid #a2ad59;
  padding-bottom: 16px;
}

.regulation-content {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 8px;
}

.regulation-content::-webkit-scrollbar {
  width: 8px;
}

.regulation-content::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 4px;
}

.regulation-content::-webkit-scrollbar-thumb {
  background: #a2ad59;
  border-radius: 4px;
}

.regulation-content::-webkit-scrollbar-thumb:hover {
  background: #827858;
}

.regulation-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fafafa;
  border-radius: 8px;
  border-left: 4px solid #a2ad59;
}

.section-header {
  border-bottom: 2px solid #a2ad59;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.subsection-header {
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #a2ad59;
}

.article {
  display: flex;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f3f4f6;
  border-radius: 8px;
  border-left: 3px solid #65473f;
}

.article-number {
  color: #65473f;
  font-weight: bold;
  font-size: 1.1rem;
  min-width: 2.5rem;
  margin-right: 1rem;
  padding-top: 0.2rem;
}

.article-content {
  color: #0f2c05;
  line-height: 1.6;
  flex: 1;
}

.article-content strong {
  color: #65473f;
  font-weight: 600;
}

.regulation-list {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  color: #0f2c05;
}

.regulation-list li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* Responsive design */
@media (max-width: 768px) {
  .regulation-content {
    max-height: 60vh;
  }

  .article {
    flex-direction: column;
  }

  .article-number {
    min-width: auto;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }

  .hero-section .text-h4 {
    font-size: 1.5rem;
  }
}

/* Smooth scrolling dla nawigacji */
html {
  scroll-behavior: smooth;
}

/* Hover effects */
.article:hover {
  background: #e0e0e0;
  transform: translateX(4px);
  transition: all 0.2s ease;
}
</style>
