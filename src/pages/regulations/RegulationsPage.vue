<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav color="black"/>

      <div class="page-container">
        <div class="page-header">
          <h1 class="page-title">
            <q-icon name="description" class="title-icon" />
            Regulamin Ogólny Żołnierza WP
          </h1>
          <p class="page-subtitle">Zarządzenie Nr 7/MON z dnia 28 kwietnia 2023 r.</p>
        </div>

        <!-- Wstęp jako kafelek -->
        <div v-if="currentView === 'main'" class="chapters-grid">
          <div @click="showContent('wstep')" class="chapter-card">
            <q-icon name="star" class="chapter-icon" />
            <h3>WSTĘP</h3>
            <p>Podstawy prawne, wartości i etos służby wojskowej</p>
          </div>

          <!-- Rozdziały -->
          <div
            v-for="chapter in chapters"
            :key="chapter.id"
            @click="selectChapter(chapter)"
            class="chapter-card"
          >
            <q-icon :name="chapter.icon" class="chapter-icon" />
            <h3>{{ chapter.title }}</h3>
            <p>{{ chapter.description }}</p>
          </div>
        </div>

        <!-- Podrozdziały -->
        <div v-if="currentView === 'subchapters'" class="subchapters-view">
          <div class="breadcrumb">
            <q-btn flat @click="goBack" icon="arrow_back" label="Powrót" />
            <span class="breadcrumb-text">{{ selectedChapter.title }}</span>
          </div>

          <div class="subchapters-grid">
            <div
              v-for="subchapter in selectedChapter.subchapters"
              :key="subchapter.id"
              @click="showContent(subchapter.id)"
              class="subchapter-card"
            >
              <q-icon name="article" class="subchapter-icon" />
              <h4>{{ subchapter.title }}</h4>
              <p>{{ subchapter.description }}</p>
            </div>
          </div>
        </div>

        <!-- Treść -->
        <div v-if="currentView === 'content'" class="content-view">
          <div class="breadcrumb">
            <q-btn flat @click="goBack" icon="arrow_back" label="Powrót" />
            <span class="breadcrumb-text">{{ getContentTitle() }}</span>
          </div>

          <div class="content-text">
            <div v-html="currentContent"></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { defineComponent, ref } from 'vue'

const currentView = ref('main') // main, subchapters, content
const selectedChapter = ref(null)
const currentContent = ref('')
const currentContentId = ref('')

const chapters = [
  {
    id: 'chapter1',
    title: 'ROZDZIAŁ 1',
    description: 'Podstawowe uwarunkowania służby wojskowej',
    icon: 'military_tech',
    subchapters: [
      {
        id: 'ch1_sub1',
        title: 'PODROZDZIAŁ I - Zasady zależności żołnierzy',
        description: 'Przełożony i podwładny, wyższy, niższy i równy stopniem wojskowym'
      },
      {
        id: 'ch1_sub2',
        title: 'PODROZDZIAŁ II - Wydawanie i wykonywanie rozkazów',
        description: 'Przepisy dotyczące rozkazów służbowych'
      },
      {
        id: 'ch1_sub3',
        title: 'PODROZDZIAŁ III - Zasady żołnierskiego zachowania',
        description: 'Postanowienia ogólne, wzajemne zwracanie się, oddawanie honorów'
      },
      {
        id: 'ch1_sub4',
        title: 'PODROZDZIAŁ IV - Zasady postępowania w sprawach służbowych',
        description: 'Droga służbowa, skargi i wnioski, terminy rozstrzygania'
      }
    ]
  },
  {
    id: 'chapter2',
    title: 'ROZDZIAŁ 2',
    description: 'Działalność służbowa w jednostce wojskowej',
    icon: 'domain',
    subchapters: [
      {
        id: 'ch2_sub1',
        title: 'PODROZDZIAŁ I - Porządek dnia',
        description: 'Organizacja dnia służbowego w jednostce wojskowej'
      },
      {
        id: 'ch2_sub2',
        title: 'PODROZDZIAŁ II - Podnoszenie i opuszczanie flagi państwowej',
        description: 'Ceremonie związane z flagą państwową'
      },
      {
        id: 'ch2_sub3',
        title: 'PODROZDZIAŁ III - Apel',
        description: 'Postanowienia ogólne dotyczące przeprowadzania apeli'
      }
    ]
  }
]

const content = {
  wstep: `
    <div class="document-header">
      <h2>Warszawa, dnia 28 kwietnia 2023 r.</h2>
      <p><strong>Poz. 49</strong></p>
      <h3>ZARZĄDZENIE Nr 7/MON<br>MINISTRA OBRONY NARODOWEJ<br>z dnia 28 kwietnia 2023 r.</h3>
      <h4>w sprawie wprowadzenia do użytku „Regulaminu ogólnego żołnierza Wojska Polskiego"</h4>
    </div>

    <p>Na podstawie art. 422 ustawy z dnia 11 marca 2022 r. o obronie Ojczyzny (Dz. U. poz. 2305 oraz z 2023 r. poz. 347 i 641) zarządza się, co następuje:</p>

    <h4>§ 1.</h4>
    <p>Wprowadza się do użytku w resorcie obrony narodowej „Regulamin ogólny żołnierza Wojska Polskiego", stanowiący załącznik do zarządzenia.</p>

    <h4>§ 2.</h4>
    <p>Dowódcy jednostek (instytucji) wojskowych w terminie do dnia 1 lipca 2023 r. dostosują dokumentację dotyczącą organizacji toku służby, służb dyżurnych oraz pomieszczeń służbowych do przepisów niniejszego zarządzenia.</p>

    <h4>§ 3.</h4>
    <p>Zarządzenie wchodzi w życie z dniem ogłoszenia.</p>

    <p><strong>Minister Obrony Narodowej: z up. M. Wiśniewski</strong></p>

    <hr>

    <div class="document-section">
      <h3>GODNOŚĆ I HONOR ŻOŁNIERZA</h3>

      <p><strong>1.</strong> Godność żołnierza, to wartość wypływająca z szacunku dla samego siebie, poczucia dumy z przynależności do społeczności wojskowej i podjęcia szczególnych zobowiązań wobec Ojczyzny.</p>

      <p><strong>2.</strong> Honor żołnierza to postawy i działania, które znamionują uczciwego i prawego człowieka. Jest źródłem jego czci oraz moralnych wartości środowiska zawodowego.</p>

      <p><strong>3.</strong> Fundamentalnymi cnotami żołnierza są: patriotyzm, męstwo, uczciwość, odpowiedzialność, sprawiedliwość, prawdomówność i solidarność zawodowa.</p>

      <p><strong>4.</strong> Żołnierz otacza szczególną czcią godło, barwy narodowe i hymn państwowy. Jest wierny przysiędze wojskowej i sztandarowi. Szanuje mundur wojskowy, który uosabia uświęcone tradycją wartości oręża polskiego.</p>

      <p><strong>5.</strong> Utożsamia się z tradycjami i dobrym imieniem macierzystej jednostki wojskowej.</p>

      <p><strong>6.</strong> Respektuje normy prawne i społeczne. Szanuje instytucje państwa i społeczeństwa.</p>

      <p><strong>7.</strong> Cechuje go szczerość i szacunek dla innych. Stawia zawsze dobro służby ponad ambicje osobiste. Dba o wizerunek wojska i etos służby, z którymi się utożsamia.</p>

      <p><strong>8.</strong> Nie dopuszcza się czynów, narażających na uszczerbek jego honoru i dobre imię wojska. Czynami niegodnymi żołnierza są w szczególności: zdrada Ojczyzny, tchórzostwo na polu walki, obłuda, prywata, niewywiązywanie się z przyjętych zobowiązań.</p>
    </div>

    <div class="document-section">
      <h3>ŻOŁNIERZ W SŁUŻBIE</h3>

      <p><strong>9.</strong> Jest gotów do spełniania obowiązków wobec Ojczyzny nawet za cenę własnego życia.</p>

      <p><strong>10.</strong> Jest świadomy, że swoim postępowaniem zawsze reprezentuje państwo polskie i jego siły zbrojne.</p>

      <p><strong>11.</strong> Kształtuje pozytywne cechy charakteru i podnosi kwalifikacje zawodowe.</p>

      <p><strong>12.</strong> W stosunku do przełożonych przejawia szacunek, szczerość oraz gotowość do realizacji zadań.</p>

      <p><strong>13.</strong> Zawsze poczuwa się do odpowiedzialności za podjęte decyzje i działania. Nie obarcza winą innych.</p>

      <p><strong>14.</strong> Jako przełożonego w każdej sytuacji obowiązuje go kultura dowodzenia.</p>

      <p><strong>15.</strong> Rozkazy i polecenia zawsze podporządkowuje dobru służby. Rozkaz wydany z innych pobudek jest nieetyczny.</p>

      <p><strong>16.</strong> W relacjach z podwładnymi i współpracownikami wyraża szacunek dla drugiego człowieka i jego godności osobistej, kieruje się poczuciem sprawiedliwości oraz dąży do umacniania więzi koleżeńskich.</p>
    </div>
  `,
  ch1_sub1: `
    <h3>PODROZDZIAŁ I - ZASADY ZALEŻNOŚCI ŻOŁNIERZY</h3>
    <h4>Przełożony i podwładny, wyższy, niższy i równy stopniem wojskowym</h4>

    <p><strong>1.</strong> Organizacja wojska opiera się na hierarchicznym podporządkowaniu żołnierzy.</p>

    <p><strong>2.</strong> Żołnierz w stosunku do innych żołnierzy może być przełożonym, podwładnym, wyższym (starszym), niższym (młodszym) albo równym stopniem wojskowym.</p>

    <p><strong>3.</strong> Przełożonym jest żołnierz lub osoba niebędąca żołnierzem, któremu(-ej) na mocy przepisów prawa, rozkazu/decyzji/polecenia, podporządkowano żołnierza lub osobę niebędącą żołnierzem, uprawniony(-a) do wydawania rozkazów lub poleceń służbowych.</p>

    <p><strong>4.</strong> Żołnierz będący przełożonym, w stosunku do swoich podwładnych powinien posiadać wyższy lub równy stopnień wojskowy.</p>

    <p><strong>5.</strong> Bezpośrednim przełożonym jest przełożony, któremu bezpośrednio podporządkowano podwładnego, natomiast kolejni w hierarchii służbowej przełożeni są wyższymi przełożonymi.</p>

    <p><strong>6.</strong> Podwładny ma jednego bezpośredniego przełożonego.</p>

    <p><strong>7.</strong> Przełożony sprawuje funkcje dowódcze (kierownicze), szkoleniowe i wychowawcze. Jest odpowiedzialny za organizację służby (pracy) podwładnych.</p>

    <p><strong>8.</strong> W czasie wspólnego wykonywania obowiązków służbowych przez co najmniej dwóch żołnierzy jeden z nich zawsze pełni rolę przełożonego.</p>

    <p><strong>9.</strong> Jeżeli przełożony, o którym mowa w pkt 8, nie został wskazany to o przełożeństwie decydują w kolejności:<br>
    a) posiadany przez żołnierzy stopnień wojskowy,<br>
    b) zajmowane stanowisko służbowe,<br>
    c) staż w posiadanym stopniu wojskowym,<br>
    d) nieprzerwany staż w czynnej służbie wojskowej,<br>
    e) wiek żołnierza.</p>

    <p><strong>10.</strong> Prezydent Rzeczypospolitej Polskiej, Prezes Rady Ministrów i Minister Obrony Narodowej są przełożonymi wszystkich żołnierzy.</p>

    <p><strong>11.</strong> Obowiązkiem każdego przełożonego jest dążenie do osiągnięcia jak najwyższego poziomu wyszkolenia podporządkowanych sobie osób poprzez budowanie zaufania, motywowanie i inspirowanie, realizowanie szkolenia oraz wdrażanie i przestrzeganie zasad dyscypliny wojskowej w codziennej działalności służbowej, ugruntowane własnym przykładem.</p>

    <p><strong>12.</strong> Podwładnym jest żołnierz lub osoba niebędąca żołnierzem, który(-a) na mocy prawa został(-a) podporządkowany(-a) przełożonemu i zobowiązany(-a) do wykonywania jego rozkazów lub poleceń służbowych.</p>

    <p><strong>13.</strong> Między żołnierzami Wojska Polskiego a żołnierzami innych armii nie występują stosunki podległości. Takie zależności mogą być ustanowione tylko na okres wspólnych przedsięwzięć (misje pokojowe, działania w ramach operacji sojuszniczych, służba w międzynarodowych strukturach wojskowych, ćwiczenia, szkolenia, itp.) oraz wykonywania innych zadań określonych rozkazem przełożonego narodowego.</p>
  `,
  ch1_sub2: `
    <h3>PODROZDZIAŁ II - WYDAWANIE I WYKONYWANIE ROZKAZÓW</h3>

    <p><strong>14.</strong> Rozkaz to polecenie określonego działania lub zaniechania wydane służbowo żołnierzowi przez przełożonego lub uprawnionego żołnierza starszego stopniem.</p>

    <p><strong>15.</strong> Rozkaz wydaje się ustnie, na piśmie, za pomocą sygnałów lub poprzez techniczne środki łączności.</p>

    <p><strong>16.</strong> Rozkaz musi być zwięzły, zrozumiały i wydany stanowczo.</p>

    <p><strong>17.</strong> Wydający rozkaz ma obowiązek uwzględnić przygotowanie podwładnego i okoliczności wykonania rozkazu, zapewniając czas, zasoby osobowe, środki materiałowe i techniczne. Za treść rozkazu oraz dające się przewidzieć skutki jego wykonania odpowiada wydający rozkaz, a wykonawca za sposób realizacji.</p>

    <p><strong>18.</strong> Rozkaz może uchylić lub zmienić ten, kto go wydał lub w uzasadnionych przypadkach przełożony wydającego rozkaz, informując go o tym fakcie.</p>

    <p><strong>19.</strong> Żołnierz potwierdza otrzymanie rozkazu w sposób określony przez przełożonego.</p>

    <p><strong>20.</strong> Przełożony może sprawdzić zrozumienie rozkazu przez podwładnego.</p>

    <p><strong>21.</strong> O wykonaniu rozkazu żołnierz melduje temu przełożonemu, który go wydał, jeżeli wydający rozkaz nie zarządzi inaczej.</p>

    <p><strong>22.</strong> O braku możliwości wykonania rozkazu podwładny natychmiast melduje wydającemu rozkaz.</p>

    <p><strong>23.</strong> Gdy realizacja zadania odbiega od ogólnie przyjętych zasad podwładny może wystąpić o wydanie rozkazu na piśmie. Rozkazodawca ma obowiązek sporządzić rozkaz na piśmie, a podwładny ma obowiązek rozkaz wykonać.</p>

    <p><strong>24.</strong> Żołnierz ma obowiązek odmówić wykonania rozkazu, którego skutkiem byłoby popełnienie przestępstwa.</p>

    <p><strong>25.</strong> Jeżeli żołnierz wykonujący rozkaz otrzyma od wyższego przełożonego nowy rozkaz, którego następstwem może być niewykonanie realizowanego rozkazu, powinien zameldować o tym wydającemu nowy rozkaz. O wydaniu rozkazu żołnierzowi, wyższy przełożony informuje przełożonego żołnierza. Odpowiedzialność za skutki wywołane niewykonaniem lub niewłaściwym wykonaniem wcześniejszego rozkazu ponosi wyższy przełożony, który wydał późniejszy rozkaz.</p>

    <p><strong>26.</strong> Jeżeli żołnierz otrzyma rozkaz od wyższego przełożonego powinien go przyjąć i zameldować o tym bezpośredniemu przełożonemu.</p>

    <p><strong>27.</strong> W przypadku utraty łączności z przełożonym, podwładny wykonuje rozkaz przejawiając inicjatywę zgodnie ze znanym mu zamiarem przełożonego.</p>

    <p><strong>28.</strong> Podwładny o fakcie odmowy wykonania rozkazu niezwłocznie melduje wydającemu rozkaz oraz wyższemu przełożonemu, opisując zaistniałą sytuację.</p>

    <p><strong>29.</strong> Żołnierz wyższy stopniem wojskowym jest uprawniony do wydania rozkazu zaprzestania naruszania zasad dyscypliny wojskowej żołnierzowi niższemu stopniem wojskowym.</p>
  `,
  ch1_sub3: `
    <h3>PODROZDZIAŁ III - ZASADY ŻOŁNIERSKIEGO ZACHOWANIA</h3>
    <h4>Postanowienia ogólne</h4>

    <p><strong>30.</strong> Przełożony lub wyższy stopniem wojskowym zwracając się do podwładnych lub niższych stopniem wojskowym czyni to stanowczo, lecz taktownie z poszanowaniem ich godności.</p>

    <p><strong>31.</strong> Przełożony lub wyższy stopniem wojskowym nie podważa autorytetu podwładnych lub niższych stopniem wojskowym, nie kieruje wobec nich uwag krytycznych w obecności ich podwładnych, niższych stopniem wojskowym oraz osób postronnych.</p>

    <p><strong>32.</strong> Obowiązkiem każdego żołnierza jest przestrzeganie zasad dyscypliny wojskowej. Wyższy stopniem wojskowym, niebędący przełożonym żołnierza informuje przełożonego żołnierza naruszającego zasady dyscypliny wojskowej o jego niewłaściwym zachowaniu. Przełożony, zobowiązany jest reagować na wszelkie przejawy naruszenia zasad dyscypliny wojskowej poprzez oddziaływanie wychowawcze w celu zapewnienia podporządkowania się jej zasadom.</p>

    <p><strong>33.</strong> Żołnierz nie może stosować wobec kogokolwiek zachowań ani działań noszących znamiona mobbingu.</p>

    <p><strong>34.</strong> Żołnierz przebywający na terenie jednostek (instytucji) wojskowych i w miejscach zakwaterowania przejściowego (tymczasowego) jednostki (instytucji) wojskowej lub występujący w umundurowaniu nie może przejawiać zachowań, które mają podtekst lub zamiar seksualny takich jak: dotykanie, komentarze o podtekście erotycznym, stosunki seksualne, prowokowanie sposobem bycia lub strojem do zainteresowania swoją seksualnością, eksponowanie faktu pozostawania w zażyłych stosunkach z inną osobą, np.: publiczne trzymanie się za ręce, całowanie, przytulanie.</p>

    <p><strong>35.</strong> Żołnierz przebywający na terenie obiektu jednostki (instytucji) wojskowej i w miejscu zakwaterowania przejściowego (tymczasowego) jednostki (instytucji) wojskowej nie może:<br>
    a) wnosić, posiadać alkoholu, środków odurzających, substancji psychotropowych lub innych podobnie działających substancji lub środków,<br>
    b) spożywać alkoholu, zażywać środków odurzających, substancji psychotropowych lub innych podobnie działających substancji lub środków,<br>
    c) pozostawać w stanie po użyciu alkoholu albo nietrzeźwości lub odurzenia. Dotyczy to również żołnierza przybywającego do miejsca pełnienia służby lub zakwaterowania po powrocie z urlopu, przepustki, podróży służbowej, leczenia, itp.,<br>
    d) używać wyrobów tytoniowych w tym nowatorskich wyrobów tytoniowych lub papierosów elektronicznych, z wyjątkiem miejsc do tego wyznaczonych (palarni) zgodnie z odrębnymi przepisami.</p>

    <h4>Wzajemne zwracanie się żołnierzy</h4>

    <p><strong>36.</strong> Żołnierze zwracają się do siebie używając przed stopniem wojskowym formy grzecznościowej „pan" lub „pani".</p>

    <p><strong>37.</strong> Żołnierz zwracający się do innego żołnierza wymienia jego stopień wojskowy w formie skróconej np.: zwracając się do starszego kaprala „Panie kapralu".</p>

    <p><strong>38.</strong> Żołnierz meldując lub przedstawiając się, wymienia swój stopień wojskowy w pełnym brzmieniu i nazwisko.</p>

    <p><strong>39.</strong> Żołnierz zwracając się do chrześcijańskiego duchownego, pełniącego służbę w wojsku, używa zwrotu „księże" oraz nazwy stopnia wojskowego, np.: „Księże poruczniku".</p>

    <p><strong>40.</strong> Żołnierz zwracając się do przełożonego lub wyższego stopniem wojskowym zatrzymuje się w odległości około 3 kroków (nie dotyczy pomieszczeń służbowych), przyjmuje postawę zasadniczą i oddaje honory, a następnie zwraca się do przełożonego (wyższego stopniem wojskowym). Przełożony (wyższy stopniem wojskowym) może zezwolić na przyjęcie postawy swobodnej.</p>

    <p><strong>41.</strong> Przełożony (wyższy stopniem wojskowym) podczas witania się lub żegnania, stosownie do stanowiska lub stopnia wojskowego podwładnego stosuje zwrot, np.: „Czołem pani porucznik", a podwładny (niższy stopniem wojskowym), odpowiada stosownie do stanowiska lub stopnia wojskowego przełożonego, np.: „Czołem" lub „Czołem panie kapitanie".</p>

    <p><strong>42.</strong> Chcąc zwrócić się do żołnierza lub innej osoby przebywającej w obecności przełożonego (wyższego stopniem wojskowym), należy prosić o pozwolenie zwrócenia się, np.: „Panie pułkowniku, kapral Nowak, proszę o pozwolenie zwrócenia się do majora Kowalskiego".</p>

    <p><strong>43.</strong> Zasada, o której mowa w pkt 42, nie obowiązuje w miejscach, okolicznościach i sytuacjach uzasadnionych specyfiką wykonywania czynności wymagających koncentracji uwagi lub natychmiastowego działania, np.: na stanowiskach dowodzenia, stacjach radiolokacyjnych, okrętach.</p>

    <p><strong>44.</strong> Żołnierz na pytanie przełożonego lub wyższego stopniem wojskowym odpowiada twierdząco: „Tak", „Tak jest", „Wiem", „Zrozumiałem" lub przecząco: „Nie", „Nie wiem", „Nie zrozumiałem".</p>
  `,
  ch1_sub4: `
    <h3>PODROZDZIAŁ IV – ZASADY POSTĘPOWANIA W SPRAWACH SŁUŻBOWYCH</h3>
    <h4>Droga służbowa</h4>

    <p><strong>128.</strong> Droga służbowa polega na ustnym lub pisemnym przekazywaniu rozkazów (decyzji, poleceń służbowych, wytycznych) od wyższego przełożonego poprzez kolejnych przełożonych do wykonawcy oraz przyjmowaniu meldunków (wniosków) od podwładnych poprzez wszystkich kolejnych przełożonych aż do tego, który sprawę rozstrzyga.</p>

    <p><strong>129.</strong> Żołnierz przestrzega drogi służbowej, jednakże może ją pominąć w sprawach:<br>
    a) niecierpiących zwłoki, o czym należy zameldować bezpośredniemu przełożonemu,<br>
    b) naruszenia zasad poszanowania godności osobistej, nietykalności cielesnej,<br>
    c) dotyczących pozbawienia lub ograniczenia należnych uprawnień lub nadużycia przez przełożonego uprawnień służbowych,<br>
    d) skarg i wniosków, o których mowa w dziale VIII ustawy z dnia 14 czerwca 1960 r. – Kodeks postępowania administracyjnego oraz petycji,<br>
    e) innych określonych w odrębnych przepisach.</p>

    <p><strong>130.</strong> Drogi służbowej nie stosuje się w trakcie reagowania dyscyplinarnego.</p>

    <h4>Wysłuchiwanie skarg i wniosków oraz przyjmowanie petycji</h4>

    <p><strong>131.</strong> W celu rozpatrzenia spraw służbowych lub osobistych, przełożeni przyjmują podwładnych, w wyznaczonym czasie tak, aby w sprawach pilnych żołnierz mógł być przedstawiony do przełożonego właściwego w przedmiocie rozstrzygnięcia sprawy w ciągu jednego dnia.</p>

    <p><strong>132.</strong> Podwładnego przedstawia przełożony o jeden szczebel niższy od przyjmującego, np.: „Panie kapitanie, przedstawiam szeregowego Kowalskiego w sprawie…". Następnie przedstawiony melduje sprawę. W uzasadnionych wypadkach żołnierz może być wysłuchany bez udziału przedstawiającego.</p>

    <p><strong>133.</strong> Żołnierz występuje w ubiorze ustalonym przez przyjmującego.</p>

    <h4>Terminy rozstrzygania spraw służbowych</h4>

    <p><strong>134.</strong> Wszystkie sprawy powinny być załatwiane bez zbędnej zwłoki.</p>

    <p><strong>135.</strong> Załatwienie sprawy wymagającej postępowania, w którym wyjaśnione zostaną wszelkie okoliczności związane ze sprawą, powinno nastąpić nie później niż w ciągu miesiąca, a sprawy szczególnie skomplikowanej – nie później niż w ciągu dwóch miesięcy od dnia wszczęcia postępowania, zaś w postępowaniu odwoławczym – w ciągu miesiąca od dnia otrzymania odwołania.</p>

    <p><strong>136.</strong> O każdym przypadku niezałatwienia sprawy w terminie należy powiadomić zainteresowanego, podając przyczyny zwłoki oraz wskazując nowy termin załatwienia sprawy.</p>
  `,
  ch2_sub1: `
    <h3>PODROZDZIAŁ I - PORZĄDEK DNIA</h3>

    <p><strong>137.</strong> Działalność służbową w jednostce (instytucji) wojskowej ustala właściwy dowódca jednostki (instytucji) wojskowej i ujmuje w porządku dnia. Wzór porządku dnia określa załącznik Nr 6 do Regulaminu.</p>

    <p><strong>138.</strong> Dla kilku jednostek (instytucji) wojskowych mających wspólnego bezpośredniego przełożonego, znajdujących się w jednym kompleksie, porządek dnia ustala ich przełożony.</p>

    <p><strong>139.</strong> Jeżeli kilka jednostek (instytucji) wojskowych, niemających wzajemnej podległości, znajduje się w jednym kompleksie, dowódcy tych jednostek (instytucji) wojskowych ustalają własne porządki dnia w uzgodnieniu z pozostałymi dowódcami.</p>

    <p><strong>140.</strong> W jednostkach (instytucjach) wojskowych, w których w strukturach etatowych nie występują pododdziały, można nie sporządzać porządku dnia.</p>

    <p><strong>141.</strong> W porządku dnia uwzględnia się 8 godzin snu oraz czas służbowy i wolny. Czas służbowy przeznacza się na zasadniczą działalność jednostki (instytucji) wojskowej, natomiast czas wolny pozostawia się do dyspozycji żołnierza.</p>

    <p><strong>142.</strong> Stałym elementem porządku dnia jest poranny rozruch fizyczny, prowadzony w dni szkoleniowe, zgodnie z dokumentami obowiązującymi w tym zakresie.</p>

    <p><strong>143.</strong> Czas wolny może ulec zmianie z przyczyn służbowych. Prawo do jego zmiany przysługuje właściwemu dowódcy jednostki (instytucji) wojskowej.</p>

    <p><strong>144.</strong> Jeżeli żołnierze wykonywali zadania służbowe w godzinach przeznaczonych na odpoczynek (sen), dowódca pododdziału za zgodą właściwego dowódcy jednostki (instytucji) wojskowej może zarządzić wcześniejsze udanie się na odpoczynek lub późniejsze ogłoszenie pobudki (z wyjątkiem wart i służb wewnętrznych), rezygnując z niektórych czynności wynikających z porządku dnia. O wprowadzonych zmianach dowódca pododdziału powiadamia oficera dyżurnego jednostki (instytucji) wojskowej.</p>

    <p><strong>145.</strong> W dniach wolnych od zajęć służbowych nie prowadzi się szkolenia, jeżeli właściwy dowódca jednostki (instytucji) wojskowej nie zarządzi inaczej.</p>

    <p><strong>146.</strong> W dniach wolnych od zajęć służbowych nie ogłasza się pobudki. Żołnierze mają obowiązek wstać w czasie ustalonym przez właściwego dowódca jednostki (instytucji) wojskowej. Nie prowadzi się zorganizowanego porannego rozruchu fizycznego i apeli.</p>

    <p><strong>147.</strong> Nadzór nad przestrzeganiem porządku dnia sprawuje właściwy dowódca jednostki (instytucji) wojskowej, dowódca pododdziału (lub upoważnione osoby), a w czasie wolnym – służby dyżurne.</p>
  `,
  ch2_sub2: `
    <h3>PODROZDZIAŁ II - PODNOSZENIE I OPUSZCZANIE FLAGI PAŃSTWOWEJ</h3>

    <p><strong>148.</strong> W jednostkach (instytucjach) wojskowych na terenie kraju podnosi się na maszt flagę państwową Rzeczypospolitej Polskiej.</p>

    <p><strong>149.</strong> W jednostkach (instytucjach) wojskowych stacjonujących poza granicami państwa można podnosić flagę państwową z godłem Rzeczypospolitej Polskiej.</p>

    <p><strong>150.</strong> Sposób, okoliczności i zasady podnoszenia i opuszczania flagi określają odrębne przepisy.</p>
  `,
  ch2_sub3: `
    <h3>PODROZDZIAŁ III – APEL</h3>
    <h4>Postanowienia ogólne</h4>

    <p><strong>151.</strong> W porządku dnia jednostki (instytucji) wojskowej, w której strukturze etatowej są pododdziały – kompania (równorzędna), pluton (równorzędny), realizuje się apel poranny i popołudniowy.</p>

    <p><strong>152.</strong> Według potrzeb apel realizuje się na szczeblu batalionu (równorzędnego), jednostki (instytucji) wojskowej.</p>

    <p><strong>153.</strong> Czas, miejsce oraz sposób realizacji apeli ustala właściwy dowódca jednostki (instytucji) wojskowej.</p>

    <p><strong>154.</strong> Apel poranny prowadzony jest przez dowódcę pododdziału w celu uaktualnienia zadań oraz sprawdzenia gotowości pododdziału do realizacji zaplanowanych przedsięwzięć służbowych.</p>

    <p><strong>155.</strong> Apel popołudniowy prowadzony jest przez dowódcę pododdziału i służy do oceny zrealizowanych zadań, postawieniu zadań do realizacji, w tym zawartych w rozkazie dziennym dowódcy pododdziału.</p>

    <p><strong>156.</strong> Dowódca jednostki (instytucji) wojskowej może zezwolić na nierealizowanie apelu popołudniowego, jeśli wymagają tego względy organizacyjne. Zakres czynności przewidziany dla niezrealizowanego apelu popołudniowego realizuje się na apelu porannym.</p>

    <p><strong>157.</strong> Organizatorem apelu na szczeblu kompanii (równorzędnej) jest szef pododdziału lub wyznaczony żołnierz.</p>
  `
}

const selectChapter = (chapter) => {
  selectedChapter.value = chapter
  currentView.value = 'subchapters'
}

const showContent = (contentId) => {
  currentContentId.value = contentId
  currentContent.value = content[contentId] || '<p>Treść w przygotowaniu...</p>'
  currentView.value = 'content'
}

const goBack = () => {
  if (currentView.value === 'content') {
    if (currentContentId.value === 'wstep') {
      currentView.value = 'main'
    } else {
      currentView.value = 'subchapters'
    }
  } else if (currentView.value === 'subchapters') {
    currentView.value = 'main'
  }
}

const getContentTitle = () => {
  if (currentContentId.value === 'wstep') {
    return 'Wstęp'
  }
  if (selectedChapter.value) {
    const subchapter = selectedChapter.value.subchapters.find(
      sub => sub.id === currentContentId.value
    )
    return subchapter ? subchapter.title : 'Treść'
  }
  return 'Treść'
}

defineComponent({
  name: 'RegulationsPage',
  setup () {
    return {
      currentView,
      selectedChapter,
      currentContent,
      currentContentId,
      chapters,
      selectChapter,
      showContent,
      goBack,
      getContentTitle
    }
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #333333 0%, #767876 100%);
  border-radius: 12px;
  color: white;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.title-icon {
  font-size: 2.5rem;
}

.page-subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.navigation-buttons {
  text-align: center;
  margin-bottom: 2rem;
}

.nav-btn {
  font-size: 1.1rem;
  padding: 12px 24px;
}

.chapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chapter-card {
  background: var(--q-color-surface);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #e0e0e0;
  cursor: pointer;
}

.chapter-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.chapter-icon {
  font-size: 3rem;
  color: var(--q-primary);
  margin-bottom: 1rem;
}

.chapter-card h3 {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--q-text-primary);
}

.chapter-card p {
  font-size: 1rem;
  color: var(--q-text-secondary);
  margin: 0;
  line-height: 1.5;
}

.subchapters-view {
  margin-top: 1rem;
}

.subchapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.subchapter-card {
  background: var(--q-color-surface);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
  cursor: pointer;
}

.subchapter-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--q-primary);
}

.subchapter-icon {
  font-size: 1.5rem;
  color: var(--q-primary);
  margin-bottom: 0.5rem;
}

.subchapter-card h4 {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--q-text-primary);
}

.subchapter-card p {
  font-size: 0.9rem;
  color: var(--q-text-secondary);
  margin: 0;
  line-height: 1.4;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--q-color-surface);
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.breadcrumb-text {
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--q-text-primary);
}

.content-view {
  margin-top: 1rem;
}

.content-text {
  background: var(--q-color-surface);
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  line-height: 1.6;
}

.document-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 8px;
  border-left: 4px solid var(--q-primary);
}

.document-header h2,
.document-header h3,
.document-header h4 {
  color: var(--q-text-primary);
  margin: 0.5rem 0;
}

.document-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #fafafa;
  border-radius: 8px;
  border-left: 3px solid var(--q-secondary);
}

.document-section h3 {
  color: var(--q-primary);
  margin-bottom: 1rem;
  text-align: center;
}

.content-text p {
  margin: 1rem 0;
  text-align: justify;
}

.content-text h3,
.content-text h4 {
  color: var(--q-primary);
  margin: 1.5rem 0 1rem 0;
}

.content-text hr {
  margin: 2rem 0;
  border: none;
  border-top: 2px solid #e0e0e0;
}

/* Dark mode support */
body.body--dark {
  .chapter-card,
  .subchapter-card,
  .breadcrumb,
  .content-text {
    background: var(--q-dark);
    border-color: #444;
  }

  .document-header {
    background: #2a2a2a;
  }

  .document-section {
    background: #2a2a2a;
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }

  .title-icon {
    font-size: 2rem;
  }

  .chapters-grid,
  .subchapters-grid {
    grid-template-columns: 1fr;
  }

  .chapter-card,
  .subchapter-card {
    padding: 1.5rem;
  }

  .chapter-icon {
    font-size: 2.5rem;
  }

  .content-text {
    padding: 1.5rem;
  }

  .breadcrumb {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
