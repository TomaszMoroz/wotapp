<template>
  <q-page class="page-background">
    <div class="container q-pa-md">

      <div class="page-container">
        <BackNav color="black" :customBack="goBack"/>
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
import { useRouter } from 'vue-router'

const router = useRouter()

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

    <div class="document-section">
      <h3>ŻOŁNIERZ W SYTUACJACH BOJOWYCH&#x2022;</h3>
      <p><strong>17.</strong> W sytuacjach bojowych postępuje zgodnie z normami międzynarodowego prawa humanitarnego konfliktów zbrojnych.</p>
      <p><strong>18.</strong> Na polu walki cechuje go męstwo, odwaga i roztropność. Swoją postawą daje przykład innym żołnierzom.</p>
      <p><strong>19.</strong> Wykazuje szczególną troskę o współtowarzyszy broni, a w sytuacjach zagrożenia życia jest gotów do niesienia im pomocy.</p>
      <p><strong>20.</strong> W postępowaniu z jeńcami wojennymi i ludnością cywilną kieruje się zasadami humanitaryzmu i poszanowania wartości życia człowieka.</p>
      <p><strong>21.</strong> W niewoli zachowuje się godnie i dochowuje wierności przysiędze wojskowej. Nie podejmuje i nie uczestniczy w działaniach, mogących szkodzić Ojczyźnie i współtowarzyszom broni.</p>
    </div>

    <div class="document-section">
      <h3>ŻOŁNIERZ POZA SŁUŻBĄ&#x2022;</h3>
      <p><strong>22.</strong> W środowisku społecznym prezentuje najwyższe wartości moralne i obyczajowe. Jest wzorem kultury osobistej i dobrego wychowania.</p>
      <p><strong>23.</strong> Dąży do umiejętnego łączenia potrzeb służby z troską o dobro swojej rodziny.</p>
      <p><strong>24.</strong> Odnosi się z szacunkiem i zrozumieniem do obowiązków i potrzeb rodzinnych swoich podwładnych i kolegów.</p>
      <p><strong>25.</strong> Dąży do integracji swojego środowiska zawodowego, a w kontaktach towarzyskich prezentuje postawę otwartości.</p>
      <p><strong>26.</strong> Nie jest obojętny wobec negatywnych postaw i poczynań. Udziela pomocy potrzebującym i występuje w obronie pokrzywdzonych.</p>
      <p><strong>27.</strong> Nie podejmuje działalności, która naruszałaby jego dobre imię i dobre imię Sił Zbrojnych RP.</p>
    </div>

    <div class="document-section">
      <p><em>„Regulamin ogólny żołnierza Wojska Polskiego” jest zbiorem postanowień regulujących codzienną działalność służbową. Nakłada na żołnierzy, niezależnie od stopnia wojskowego i stanowiska, obowiązek w zakresie znajomości, przestrzegania i egzekwowania tych przepisów.</em></p>
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

    <h4>Służbowe przedstawianie się</h4>
    <p><strong>45.</strong> Służbowe przedstawianie się – to podanie przełożonemu (wyższemu stopniem wojskowym), który nie zna podwładnego (niższego stopniem wojskowym), swojego stanowiska służbowego, nazwy jednostki (instytucji) wojskowej, stopnia wojskowego i nazwiska, np.: „Panie pułkowniku, dowódca 1. batalionu czołgów 1. Brygady Pancernej, podpułkownik Kowalska”. Przełożony (wyższy stopniem wojskowym) postępuje podobnie, jeśli nie ma pewności, że jest znany. Żołnierz nie podaje nazwy jednostki (instytucji) wojskowej, kiedy przedstawia się w macierzystej jednostce (instytucji) wojskowej, a także kiedy jego przełożony osobiście przedstawia go swoim przełożonym (osobom kontrolującym), przedstawicielom innych jednostek (instytucji) wojskowych, np.: „Panie generale, dowódca kompanii czołgów 1. batalionu czołgów”. Wówczas wskazani żołnierze przedstawiają się odpowiadając: „Panie generale, dowódca 1. kompanii czołgów kapitan Kowalski”.</p>
    <p><strong>46.</strong> Żołnierze będący studentami uczelni wojskowych lub słuchaczami Szkoły Legii Akademickiej, którzy złożyli przysięgę wojskową, przedstawiają się podając stopień wojskowy, posiadany tytuł i nazwisko, np.: „Panie majorze, kapral podchorąży Kowalski”.</p>
    <p><strong>47.</strong> Żołnierze zwracając się do siebie przedstawiają się. Niższy stopniem wojskowym przedstawia się pierwszy, gdy zwraca się do niego żołnierz wyższy stopniem wojskowym.</p>
    <p><strong>48.</strong> Żołnierze w służbowych rozmowach telefonicznych przedstawiają się nawzajem, podając swój stopień wojskowy i nazwisko. Pełniący służbę dyżurną podaje również funkcję, np.: „Oficer dyżurny 1. Brygady Zmechanizowanej, kapitan Kowalski”. Żołnierz po uzyskaniu informacji, że będzie rozmawiał z przełożonym, mówi, np.: „Melduję się panie kapitanie”, a po zakończeniu rozmowy – zgodnie z jej przebiegiem odpowiada – „ZROZUMIAŁEM”, „WYKONUJĘ”, „ROZKAZ”.</p>
    <p><strong>49.</strong> Żołnierz podczas rozmowy telefonicznej z żołnierzem niebędącym przełożonym, po jego przedstawieniu się odpowiada wymieniając stopień wojskowy rozmówcy np.: „Czołem panie kapitanie”.</p>
    <p><strong>50.</strong> Rozmowę telefoniczną żołnierz kończy słowem (zwrotem) „CZOŁEM...”.</p>
    <p><strong>51.</strong> Dzwoniąc do przedstawicieli innych jednostek (instytucji) wojskowych podaje się: stanowisko służbowe, nazwę jednostki (instytucji) oraz stopień i nazwisko.</p>

    <h4>Oddawanie honorów przez żołnierza</h4>
    <p><strong>52.</strong> Oddawanie honorów jest oznaką żołnierskiego szacunku dla tradycji, symboli (barw i znaków) narodowych i wojskowych oraz przełożonych lub wyższych stopniem wojskowym, a także przejawem koleżeństwa, dobrego wychowania, dyscypliny wojskowej i spoistości wojska.</p>
    <p><strong>53.</strong> Żołnierz oddaje honory:
    a) Prezydentowi Rzeczypospolitej Polskiej,
    b) Marszałkowi Sejmu i Marszałkowi Senatu,
    c) Prezesowi Rady Ministrów,
    d) Ministrowi Obrony Narodowej,
    e) przełożonym oraz wyższym i równym stopniem wojskowym,
    f) sztandarom wojskowym i chorągwi Wojska Polskiego na drzewcu,
    g) przed Grobem Nieznanego Żołnierza,
    h) w czasie oficjalnego grania (odtwarzania) hymnu państwowego Rzeczypospolitej Polskiej, hymnu innego państwa, „Hasła Wojska Polskiego”, sygnałów: „Służba Wartownicza”, „Śpij Kolego” lub „Cisza”,
    i) kombatantom (osobom, które brały udział w wojnach, działaniach zbrojnych i powstaniach narodowych, wchodzących w skład formacji wojskowych lub organizacji walczących o suwerenność i niepodległość Rzeczypospolitej Polskiej),
    j) podczas podnoszenia (opuszczania) flagi państwowej, proporca Prezydenta Rzeczypospolitej Polskiej, chorągwi Wojska Polskiego, flag: Ministra Obrony Narodowej, Marszałka Polski, Szefa Sztabu Generalnego Wojska Polskiego, rodzajów Sił Zbrojnych (równorzędnych), dowódców rodzajów Sił Zbrojnych (równorzędnych) i bandery wojennej,
    k) banderze wojennej podczas wchodzenia na okręt i schodzenia z okrętu,
    l) symbolom i miejscom upamiętniającym bohaterską walkę i męczeństwo narodu polskiego i innych narodów, jeśli są tam wystawione posterunki honorowe,
    m) osobie zmarłej, w czasie ceremonii pogrzebowej z udziałem wojskowej asysty honorowej.</p>
    <p><strong>54.</strong> Podwładni i niżsi stopniem wojskowym oddają honory pierwsi, a żołnierze równi stopniem wojskowym – jednocześnie. Wyżsi stopniem wojskowym odwzajemniają honory.</p>
    <p><strong>55.</strong> W miejscach wykonywania obowiązków służbowych (np.: w pomieszczeniach służbowych) honory oddaje się przełożonym (wyższym stopniem wojskowym) przez powstanie, przyjęcie postawy zasadniczej i skłon głowy – tylko podczas pierwszego ich przybycia.</p>
    <p><strong>56.</strong> Żołnierz po podejściu przełożonego (wyższego stopniem wojskowym) zobowiązany jest przerwać wykonywanie czynności, zwrócić się w jego stronę i oddać honory, z wyjątkiem sytuacji, o których mowa w pkt 57.</p>
    <p><strong>57.</strong> Żołnierz nie oddaje honorów w trakcie:
    a) przechodzenia przez jezdnię oraz mijania się w odległości większej niż 15 kroków,
    b) prowadzenia pojazdów lub obsługiwania maszyn i urządzeń,
    c) bezpośredniego udziału w akcjach humanitarnych, poszukiwawczych lub ratowniczych, udzielania pomocy poszkodowanym oraz zabezpieczania (ochrony) miejsc wypadków,
    d) legitymowania, doprowadzania, konwojowania, pełnienia służby wartowniczej na posterunku oraz uczestniczenia w innych interwencjach porządkowych,
    e) zabezpieczania uroczystości z udziałem wojska,
    f) prowadzenia działań prewencyjnych, ochronnych oraz dochodzeniowo - śledczych,
    g) wykonywania zadań służbowych w strefie działań wojennych, wykonywania zadania bojowego lub ćwiczeń, jeżeli przerwanie związanych z nimi czynności skutkowałoby niewykonaniem otrzymanego rozkazu,
    h) wykonywania prac porządkowo-gospodarczych,
    i) przebywania w miejscach zbiorowego żywienia,
    j) prowadzenia psa służbowego.</p>
    <p><strong>58.</strong> W sytuacjach nieprzewidzianych w regulaminie, żołnierz zachowuje się w sposób zwyczajowo przyjęty w podobnych okolicznościach, kierując się zasadami dobrego wychowania.</p>
    <p><strong>59.</strong> Przełożonym lub wyższym stopniem wojskowym występującym w ubiorze cywilnym, którzy są podwładnemu lub niższemu stopniem wojskowym znani, oddaje się honory zgodnie z przepisami wojskowymi. Podwładny lub niższy stopniem wojskowym będący w ubiorze cywilnym, pozdrawia przełożonych lub wyższych stopniem wojskowym w sposób przyjęty w środowisku cywilnym.</p>
    <p><strong>60.</strong> Żołnierzom innych państw honory oddaje się na zasadach wzajemności.</p>

    <h4>Oddawanie honorów przez pododdział (oddział)</h4>
    <p><strong>61.</strong> Pododdział (oddział) oddaje honory w ugrupowaniu rozwiniętym lub marszowym:
    a) Prezydentowi Rzeczypospolitej Polskiej,
    b) Marszałkowi Sejmu i Marszałkowi Senatu,
    c) Prezesowi Rady Ministrów,
    d) Ministrowi Obrony Narodowej,
    e) Szefowi Sztabu Generalnego Wojska Polskiego,
    f) na specjalne polecenie – dostojnikom państw obcych, których ranga odpowiada funkcjom sprawowanym przez osoby wymienione w lit. a-e,
    g) przełożonym od dowódcy kompanii (równorzędnym) wzwyż,
    h) sztandarom wojskowym i chorągwi Wojska Polskiego na drzewcu,
    i) przed Grobem Nieznanego Żołnierza,
    j) w czasie oficjalnego grania (odtwarzania) hymnu państwowego Rzeczypospolitej Polskiej, hymnu innego państwa, „Hasła Wojska Polskiego”, sygnałów „Służba Wartownicza”, „Śpij Kolego” lub „Cisza”,
    k) podczas podnoszenia (opuszczania) flagi państwowej, proporca Prezydenta Rzeczypospolitej Polskiej, chorągwi Wojska Polskiego, flag: Ministra Obrony Narodowej, Marszałka Polski, Szefa Sztabu Generalnego Wojska Polskiego, rodzajów Sił Zbrojnych (równorzędnych), dowódców rodzajów Sił Zbrojnych (równorzędnych) i bandery wojennej,
    l) osobie zmarłej, w czasie ceremonii pogrzebowej z udziałem wojskowej asysty honorowej.</p>
    <p><strong>62.</strong> Salutowanie sztandarem (chorągwią Wojska Polskiego na drzewcu) obowiązuje podczas oddawania honorów osobom wymienionym w pkt 61 lit. a-f oraz przełożonym od dowódcy jednostki (instytucji) wojskowej wzwyż, a także w czasie oficjalnego grania (odtwarzania) hymnów państwowych, „Hasła Wojska Polskiego”, sygnałów: „Służba Wartownicza”, „Śpij Kolego” lub „Cisza” oraz przed Grobem Nieznanego Żołnierza.</p>
    <p><strong>63.</strong> Jeżeli przedsięwzięcie odbywa się w pomieszczeniu zamkniętym (w sali wykładowej, kinowej, konferencyjnej, tradycji, itp.), po przybyciu przełożonego lub prowadzącego zajęcia – dowódca grupy, uroczystości (wyznaczony żołnierz) podaje komendę „BACZNOŚĆ”. Obecni zwracają się w kierunku przełożonego, prowadzącego zajęcia i przyjmują postawę zasadniczą. Po podejściu do przełożonego lub prowadzącego zajęcia, dowódca grupy, uroczystości (wyznaczony żołnierz) składa meldunek. Przełożony (prowadzący zajęcia) po przyjęciu meldunku i oddaniu honorów, zezwala przyjąć postawę swobodną. Komendy „SPOCZNIJ’’, „ZAJĄĆ MIEJSCA’’ podaje dowódca grupy, uroczystości (wyznaczony żołnierz).</p>
    <p><strong>64.</strong> Po zakończeniu przedsięwzięcia dowódca grupy, uroczystości (wyznaczony żołnierz) podaje komendę: „POWSTAŃ”, a następnie „BACZNOŚĆ”. Obecni stają frontem do przełożonego (prowadzącego zajęcia) i przyjmują postawę zasadniczą. Po wyjściu przełożonego lub prowadzącego zajęcia podana jest komenda „SPOCZNIJ”.</p>
    <p><strong>65.</strong> Jeżeli przedsięwzięcie prowadzi żołnierz niższy stopniem wojskowym od starszego grupy lub osoba niebędąca żołnierzem, meldunku nie składa się. Na komendę starszego grupy ,,POWSTAŃ’’ uczestnicy wyrażają szacunek poprzez powstanie podczas jego (jej) wejścia i opuszczenia sali. W sytuacji przybycia przełożonego (osoby kontrolującej) meldunek składa starszy grupy lub najwyższy stopniem wojskowym spośród uczestników przedsięwzięcia.</p>
    <p><strong>66.</strong> Gdy w sytuacjach opisanych w pkt 63-65 w grupie są osoby niebędące żołnierzami, dowódca grupy (dowódca uroczystości, wyznaczony żołnierz) określa sposób ich zachowania.</p>
    <p><strong>67.</strong> Komendę „BACZNOŚĆ” służba dyżurna podaje podczas pierwszego przybycia przełożonego (od szczebla dowódcy kompanii – równorzędnego wzwyż) w czasie i miejscu określonym instrukcją pełnienia służby lub decyzją przełożonego.</p>
    <p><strong>68.</strong> Komendy „BACZNOŚĆ” dla pododdziału (oddziału) nie podaje się podczas:
    a) alarmu,
    b) pracy bojowej na sprzęcie,
    c) lotów na lotniskach,
    d) manewrowania jednostki pływającej,
    e) prowadzenia zajęć (ćwiczeń) taktycznych i ogniowych,
    f) wykonywania czynności realizowanych przez Żandarmerię Wojskową i wojskowe organy porządkowe,
    g) bezpośredniego udziału w akcjach ratowniczych, likwidacji klęsk żywiołowych i przeciwdziałania skutkom epidemii,
    h) obsługiwania sprzętu wojskowego,
    i) wykonywania prac gospodarczych, warsztatowych lub magazynowych,
    j) wykonywania zadań na stanowisku dowodzenia,
    k) pobierania i spożywania posiłków,
    l) odpoczynku nocnego,
    m) realizacji konkursów lub zawodów,
    n) w obiektach służby zdrowia.</p>

    <h4>Składanie meldunku</h4>
    <p><strong>69.</strong> Meldunek jest to zwięzła informacja, którą podwładny składa przełożonemu. W meldunku podaje się kolejno: formę grzecznościową, stopień wojskowy przełożonego lub stanowisko osoby niebędącej żołnierzem, swoje stanowisko, stopień wojskowy, nazwisko i czynność wykonywaną przez pododdział, jednostkę (instytucję) wojskową lub meldującego albo cel przybycia, np.: „Pani major, dowódca 1. kompanii, kapitan Kowalski melduje kompanię podczas ćwiczeń taktycznych...”.</p>
    <p><strong>70.</strong> Przełożonemu, który zna meldującego (przedstawiającego) można składać meldunek bez podawania stanowiska, stopnia wojskowego i nazwiska. Podobne postępowanie dotyczy nazwy jednostki (instytucji) wojskowej. Jeśli meldunek jest składany jej dowódcy, to nazwę jednostki (instytucji) wojskowej można podać w formie skróconej, np.: brygada, dywizja.</p>
    <p><strong>71.</strong> Ponadto meldunek jest składany: Prezydentowi Rzeczypospolitej Polskiej, Marszałkowi Sejmu, Marszałkowi Senatu, Prezesowi Rady Ministrów, Ministrowi Obrony Narodowej i Szefowi Sztabu Generalnego Wojska Polskiego. Innym przełożonym – niebędącym żołnierzami, żołnierze przedstawiają informację, używając stosownych zwrotów, np.: „Panie dyrektorze, szef wydziału pierwszego, major Kowalska, przedstawiam (informuję, wyjaśniam), ...”.</p>
    <p><strong>72.</strong> Meldunek składa się w następujących sytuacjach:
    a) podczas pełnienia służby dyżurnej – w czasie pierwszego przybycia przełożonego w danym dniu (w terminie i miejscu wynikającym z instrukcji pełnienia służby lub decyzji przełożonego), np.: „Panie pułkowniku, oficer dyżurny brygady, kapitan Nowak melduje brygadę podczas realizacji zajęć programowych. W czasie pełnienia służby nic ważnego nie wydarzyło się” (albo melduje co się wydarzyło),
    b) przybycia przełożonego (wyższego przełożonego) do pododdziału, jednostki (instytucji) wojskowej,
    c) na apelu, zbiórce pododdziału, jednostki (instytucji) wojskowej,
    d) w czasie witania osób przez kompanię honorową,
    e) po przybyciu do przełożonego – o celu przybycia,
    f) przed wyjazdem służbowym, na urlop lub leczenie i po powrocie,
    g) podczas obejmowania i zdawania służby, stanowiska służbowego, np.: zdający: „Panie kapitanie, kapral Kowalski melduję zdanie służby dyżurnego kompanii”, obejmujący: „Panie kapitanie, sierżant Nowak melduję objęcie służby dyżurnego kompanii”,
    h) po wykonaniu rozkazu,
    i) w przypadku zaistnienia innych ważnych zdarzeń związanych z naruszeniem zasad dyscypliny wojskowej, bezpieczeństwem oraz określonych przez przełożonego.</p>
    <p><strong>73.</strong> Meldunku nie składa się w czasie:
    a) trwania wideokonferencji, akademii, przedstawień teatralnych, koncertów, seansów filmowych i telewizyjnych,
    b) ładowania i rozładowywania broni,
    c) strzelania.</p>
    <p><strong>74.</strong> Osobom kontrolującym (wyższym lub równym stopniem wojskowym) składa meldunek dowódca kontrolowanego pododdziału lub kontrolowanej jednostki (instytucji) wojskowej. Osoba kontrolująca zobowiązana jest poinformować o celu przybycia oraz przedstawić upoważnienie do wykonywania czynności kontrolnych wraz z dokumentem tożsamości.</p>
    <p><strong>75.</strong> Gdy osoba kontrolująca przybywa do pododdziału lub kontrolowanej jednostki (instytucji) wojskowej razem z przełożonym, a jest ona co najmniej równa mu stopniem wojskowym, meldunek składa się osobie kontrolującej a jeśli ma niższy stopień wojskowy – przełożonemu.</p>
    <p><strong>76.</strong> Jeżeli w czasie kontroli przybędzie przełożony dowódcy kontrolowanego pododdziału lub kontrolowanej jednostki (instytucji) wojskowej, meldunek składa mu dowódca pododdziału lub kontrolowanej jednostki (instytucji) wojskowej, a osoba kontrolująca przedstawia się.</p>
    <p><strong>77.</strong> W sytuacjach określonych w pkt 68 meldunek składa właściwy dowódca. Jeżeli dowódca jest nieobecny, meldunek składa żołnierz najwyższy stopniem wojskowym lub żołnierz służby dyżurnej.</p>

    <h4>Zachowanie się żołnierzy w różnych sytuacjach</h4>
    <p><strong>78.</strong> Żołnierz swoim zachowaniem dba o wizerunek Wojska Polskiego.</p>
    <p><strong>79.</strong> Podczas wykonywania przez orkiestrę hymnu państwowego Rzeczypospolitej Polskiej i Pieśni Reprezentacyjnej Wojska Polskiego lub ich oficjalnego odtwarzania żołnierze, z wyjątkiem dowódców uroczystości, dowódców kompanii honorowych (pododdziałów honorowych) oraz żołnierzy wchodzących w skład posterunków honorowych, pocztów flagowych, pocztów sztandarowych, orkiestr wojskowych i zabezpieczających uroczystość, odśpiewują tekst hymnu państwowego i Pieśni Reprezentacyjnej Wojska Polskiego. Powyższa reguła nie obowiązuje w czasie uroczystości pogrzebowych. Okoliczności odgrywania (odtwarzania) hymnu państwowego oraz Pieśni Reprezentacyjnej Wojska Polskiego określają odrębne przepisy.</p>
    <p><strong>80.</strong> W czasie oficjalnego grania (odtwarzania) Pieśni Reprezentacyjnej Wojska Polskiego żołnierz przyjmuje postawę zasadniczą.</p>
    <p><strong>81.</strong> Żołnierzowi występującemu w umundurowaniu w szczególności zabrania się:
    a) kupowania napojów alkoholowych,
    b) spożywania napojów alkoholowych lub środków odurzających, substancji psychotropowych lub innych podobnie działających substancji lub środków.</p>
    <p><strong>82.</strong> Żołnierzowi występującemu w umundurowaniu zezwala się na palenie tytoniu (e-papierosów), żucia gumy i tytoniu, spożywanie posiłków i napojów w miejscach do tego wyznaczonych.</p>
    <p><strong>83.</strong> Żołnierz w obecności przełożonego (wyższego stopniem wojskowym) zachowuje się taktownie. Bez jego zgody (poza określonymi miejscami) nie może siedzieć, spożywać posiłków i napojów, używać telefonu (urządzeń elektronicznych), palić tytoniu (w tym e-papierosów), żuć gumy i tytoniu.</p>
    <p><strong>84.</strong> Żołnierz wykonujący zadania służbowe, może korzystać z mobilnych środków łączności zgodnie z odrębnymi przepisami i ograniczeniami w zakresie ich używania.</p>
    <p><strong>85.</strong> Żołnierz wchodzi do pomieszczenia służbowego przełożonego (wyższego stopniem wojskowym) za jego zgodą. Jeżeli warunki na to pozwalają przed wejściem pozostawia wierzchnie okrycie i nakrycie głowy lub po wejściu zdejmuje tylko nakrycie głowy, oddaje honory i melduje (przedstawia) cel przybycia. Po otrzymaniu rozkazu lub załatwieniu sprawy oddaje honory, wykonuje zwrot w kierunku wyjścia, nakłada nakrycie głowy i wychodzi.</p>
    <p><strong>86.</strong> Żołnierz wchodzący do pomieszczenia z bronią nie zmienia jej położenia.</p>
    <p><strong>87.</strong> Żołnierz pełniący służbę albo będący w nakryciu głowy i trzymający broń w położeniu „na pas” nie zdejmuje nakrycia głowy.</p>
    <p><strong>88.</strong> Na klatce schodowej, schodach żołnierze oddają honory, zachowując stosowne do okoliczności warunki bezpieczeństwa.</p>
    <p><strong>89.</strong> W wąskim przejściu (brak możliwości swobodnego minięcia się dwóch osób) żołnierz, który zauważy zbliżającego się przełożonego (wyższego stopniem wojskowym), podaje dla innych żołnierzy komendę „PRZEJŚCIE”. Żołnierze ustawiają się w taki sposób aby umożliwić swobodne przejście przełożonemu (wyższemu stopniem wojskowym) i oddają honory.</p>
    <p><strong>90.</strong> W wąskim przejściu idący żołnierz, widząc przed sobą stojących wyższych stopniem wojskowym i nie mając możliwości ich obejścia, zatrzymuje się, a następnie zwraca się do najstarszego stopniem wojskowym z prośbą o pozwolenie przejścia np.: „Panie kapralu – proszę o pozwolenie przejścia”.</p>
    <p><strong>91.</strong> Żołnierz przewożący broń stosuje się do obowiązujących przepisów dotyczących gospodarowania mieniem służby uzbrojenia i elektroniki.</p>
    <p><strong>92.</strong> Przydzielenie broni żołnierzom udającym się w podróż służbową należy odnotować w dokumencie podróży (skierowaniu), podając rodzaj broni i jej numer oraz rodzaj i ilość amunicji.</p>
    <p><strong>93.</strong> Żołnierz posiadający broń wchodząc do środka komunikacji trzyma ją zabezpieczoną w najdogodniejszym i bezpiecznym położeniu. W czasie podróży nikomu jej nie odstępuje i nie dopuszcza do powstania sytuacji, w której mógłby ją utracić.</p>
    <p><strong>94.</strong> Jeżeli po przybyciu do celu podróży służbowej żołnierza okaże się, że broń nie jest potrzebna do wykonywania obowiązków służbowych, należy ją zdać do depozytu w jednostce (instytucji) wojskowej lub w komendzie garnizonu, do której żołnierz został skierowany. Zdanie (pobranie) broni (amunicji) do depozytu (z depozytu) ewidencjonuje się w książce ewidencji zdeponowanych przedmiotów. Jeśli zdanie broni nie jest możliwe, żołnierz obowiązany jest posiadać ją przy sobie przez cały czas wykonywania obowiązków służbowych.</p>
    <p><strong>95.</strong> Żołnierz w umundurowaniu, podróżujący środkami komunikacji publicznej może zdjąć nakrycie głowy, płaszcz lub kurtkę. Przed wyjściem ze środka komunikacji ubiera się zgodnie z obowiązującymi przepisami ubiorczymi.</p>
    <p><strong>96.</strong> Żołnierz w mundurze może przenosić paczki lub inne przedmioty opakowane w materiał:
    a) o jednolitym, stonowanym kolorze,
    b) nieprześwitujący.</p>
    <p><strong>97.</strong> Żołnierz ma obowiązek posiadać przy sobie wojskowy dokument osobisty.</p>
    <p><strong>98.</strong> Żołnierz ma obowiązek niezwłocznie zawiadomić bezpośredniego przełożonego lub oficera dyżurnego jednostki (instytucji) wojskowej o braku możliwości stawienia się (spóźnieniu) do miejsca pełnienia obowiązków służbowych. Informację o przyczynie swojej nieobecności (spóźnieniu) i przewidywanym okresie jej (jego) trwania przekazuje tego samego dnia osobiście lub za pośrednictwem innej osoby, wykorzystując techniczne środki łączności lub drogę pocztową (przy czym za termin zawiadomienia drogą pocztową uznaje się datę stempla pocztowego). W przypadku zaistnienia przyczyny uniemożliwiającej dopełnienie tego obowiązku, żołnierz jest obowiązany obowiązek ten dopełnić po ustaniu przyczyny uniemożliwiającej jego dopełnienie.</p>
    <p><strong>99.</strong> Nieobecność może wynikać z ważnych przyczyn uniemożliwiających stawienie się w miejscu pełnienia służby w szczególności:
    a) zachorowania żołnierza,
    b) zgonu lub ciężkiej choroby najbliższego członka rodziny,
    c) klęski żywiołowej, która dotknęła rodzinę żołnierza.</p>
    <p><strong>100.</strong> W przypadku wystawienia dokumentu (zaświadczenia) przez organ administracji publicznej, placówkę służby lub ochrony zdrowia potwierdzającego (usprawiedliwiającego) nieobecność na zwykłym druku, żołnierz niezwłocznie (nie później niż w ciągu 7 dni) przesyła lub dostarcza do jednostki (instytucji) wojskowej oryginał lub kopię tego dokumentu.</p>
    <p><strong>101.</strong> O przedłużeniu dokumentu podróży żołnierzy w sytuacjach, o których mowa w pkt 99, decyduje dowódca garnizonu, a w garnizonach, w których są etatowi komendanci garnizonu – komendant garnizonu, w którym żołnierz przebywa. Dowódca lub komendant garnizonu, zawiadamia niezwłocznie dowódcę jednostki (instytucji) wojskowej, w której żołnierz pełni lub odbywa czynną służbę wojskową o przedłużeniu dokumentu podróży temu żołnierzowi. W przypadku żołnierzy, którzy przebywają na terenie garnizonu macierzystej jednostki (instytucji) wojskowej przedłużenia dokumentu podróży dokonuje dowódca jednostki (instytucji) wojskowej.</p>
    <p><strong>102.</strong> Pod nieobecność dowódcy lub komendanta garnizonu, a także po godzinach służbowych przedłużenia ważności dokumentów podróży dokonuje upoważniona przez nich służba dyżurna w sposób określony w instrukcji danej służby.</p>
    <p><strong>103.</strong> Żołnierz ma obowiązek przerwać urlop lub dzień wolny i niezwłocznie powrócić do miejsca pełnienia służby w przypadku:
    a) ogłoszenia mobilizacji lub wojny,
    b) odwołania z urlopu lub dnia wolnego.</p>
    <p><strong>104.</strong> Żołnierza z urlopu lub dnia wolnego może odwołać dowódca jednostki (instytucji) wojskowej. Fakt odwołania stwierdza się w rozkazie dziennym (decyzji) dowódcy jednostki (instytucji) wojskowej.</p>

    <h4>Dbałość o mundur, wygląd zewnętrzny</h4>
    <p><strong>105.</strong> Żołnierz swoim wyglądem dba o wizerunek Wojska Polskiego.</p>
    <p><strong>106.</strong> Żołnierz występując w umundurowaniu jest zobowiązany do przestrzegania przepisów dotyczących noszenia umundurowania i orderów, odznaczeń, oznak wyróżnień i znaków Sił Zbrojnych Rzeczypospolitej Polskiej.</p>
    <p><strong>107.</strong> Zabrania się stosowania poprawek krawieckich powodujących zmianę parametrów i wzorów umundurowania określonych w odrębnych przepisach.</p>
    <p><strong>108.</strong> Zabrania się trzymania rąk w kieszeniach. Kieszenie, które posiadają zapięcia, powinny być zapięte. Przedmioty (np.: okulary, okulary przeciwsłoneczne, długopisy, ołówki, breloczki do kluczy) nie mogą wystawać z kieszeni lub być w widoczny sposób zawieszane.</p>
    <p><strong>109.</strong> Żołnierz – mężczyzna ma mieć ogoloną twarz oraz ostrzyżone włosy, nie dłuższe niż 5 cm, cieniowane w kierunku karku i uszu. Może golić głowę oraz nosić krótko przystrzyżone wąsy. Wąsy mogą sięgać maksymalnie do kącików ust i nie mogą zakrywać górnej linii wargi. Baczki mogą sięgać do linii połowy wysokości uszu. Przykład wyglądu żołnierza przedstawiają rysunki nr 1-5.</p>
    <p><strong>110.</strong> Żołnierz może nosić zarost nie dłuższy niż 5 mm ze względu na wskazania medyczne (odnotowane w zaświadczeniu wydanym przez lekarza zawierającym termin takiego zwolnienia). Dowódca jednostki (instytucji) wojskowej stwierdza ten fakt w rozkazie dziennym (decyzji). Żołnierz ma obowiązek powiadomić przełożonego o ustaniu wskazań medycznych. Przykład wyglądu żołnierza przedstawiają rysunki nr 6 i 7.</p>
    <p><strong>111.</strong> Żołnierz – kobieta ma mieć włosy krótkie lub krótko upięte z tyłu głowy sięgające maksymalnie do wysokości linii złożonego kołnierza/stójki bluzy mundurowej, kurtki mundurowej, koszulobluzy. Może golić głowę. Fryzura nie może przeszkadzać w bezpiecznym wykonywaniu zadań służbowych. Przykład wyglądu żołnierza przedstawiają rysunki nr 8-16.</p>
    <p><strong>112.</strong> Żołnierz – kobieta powinna upinać włosy przy użyciu akcesoriów niezagrażających jej bezpieczeństwu w kolorze dobranym do koloru włosów. Akcesoria powinny pełnić funkcję użytkową a nie dekoracyjną.</p>
    <p><strong>113.</strong> Żołnierz – kobieta występując wyłącznie w mundurze wyjściowym oraz galowym może nosić po jednym, małym kolczyku w płatku ucha w kolorze złotym lub srebrnym. Kolczyki powinny być wpinane lub wkręcane i nie mogą sięgać poniżej płatka ucha. Kolczyki mają być jednakowe.</p>
    <p><strong>114.</strong> Żołnierz może stosować środki kosmetyczne i lecznicze preparaty medyczne dobrane do naturalnego koloru cery.</p>
    <p><strong>115.</strong> Żołnierz nie farbuje włosów na kolor inny niż ich naturalne odcienie.</p>
    <p><strong>116.</strong> Żołnierz nie maluje paznokci. Może stosować bezbarwne środki kosmetyczne i lecznicze preparaty medyczne. Długość paznokci nie może wykraczać 2 mm poza opuszki palców. Przykład wyglądu paznokci przedstawia rysunek nr 17.</p>
    <p><strong>117.</strong> Żołnierz występujący w umundurowaniu nie może eksponować w widocznych miejscach tatuaży, zdobień ciała wykonanych poprzez nacinanie, zdrapywanie, wypalanie lub uszkadzanie skóry w celu otrzymania blizn określonego wzoru. Nie nosi piercingu, tuneli w uszach.</p>
    <p><strong>118.</strong> Żołnierz może nosić obrączkę, zegarek, sygnet (pamiątkowy, absolwenta) pierścionek zaręczynowy, okulary. Kolory paska zegarka i oprawy okularów nie mogą być jaskrawe. Symbole religijne, tabliczki tożsamości nosi się pod umundurowaniem. Przełożony (kierownik zajęć) może zarządzić zdjęcie wskazanych przedmiotów w sytuacjach uzasadnionych realizacją zadań służbowych oraz warunkami bezpieczeństwa.</p>
    <p><strong>119.</strong> Dowódca jednostki (instytucji) wojskowej, samodzielnie ze względu na charakter wykonywanych zadań lub rodzaj i częstotliwość pełnienia czynnej służby wojskowej, wobec podległych żołnierzy lub na uzasadniony wniosek żołnierza, może czasowo w rozkazie (decyzji) ogłosić inne zasady wyglądu niż określone w regulaminie. Wygląd żołnierza nie może uniemożliwiać lub utrudniać wykonywania zadań służbowych.</p>

    <h4>Opuszczanie jednostki (instytucji) wojskowej, garnizonu</h4>
    <p><strong>120.</strong> Żołnierz niepełniący zawodowej służby wojskowej (z wyłączeniem żołnierzy pełniących dobrowolne formy czynnej służby wojskowej) ma prawo, za zgodą przełożonego opuszczać teren jednostki (instytucji) wojskowej na podstawie upoważniającego dokumentu, który ma obowiązek posiadać przy sobie przebywając poza terenem jednostki (instytucji) wojskowej.</p>
    <p><strong>121.</strong> Przepustka stała upoważnia żołnierza, o którym mowa w pkt 120, do przebywania poza terenem jednostki (instytucji) wojskowej:
    a) w dni powszednie – w czasie wolnym od zajęć do 30 minut przed pobudką dnia następnego,
    b) w dni ustawowo i dodatkowo wolne od pracy – do 30 minut przed pobudką następnego dnia po dniu wolnym. Wzór przepustki stałej określa załącznik Nr 11 do Regulaminu.</p>
    <p><strong>122.</strong> Przepustka jednorazowa upoważnia żołnierza, o którym mowa w pkt 120, do przebywania poza terenem jednostki (instytucji) wojskowej za zgodą:
    a) dowódcy drużyny (równorzędnego) – na czas do 12 godzin,
    b) dowódcy plutonu – na czas do 24 godzin,
    c) dowódcy kompanii (równorzędnego) i wyższych przełożonych – na czas do 72 godzin. Wzór przepustki jednorazowej określa załącznik Nr 12 do Regulaminu.</p>
    <p><strong>123.</strong> Zabrania się łączenia czasu przebywania na przepustkach, o których mowa w pkt 121 i 122.</p>
    <p><strong>124.</strong> Właściwy dowódca może określać inny sposób korzystania z przepustek (stałych, jednorazowych) kierując się potrzebami jednostki (instytucji) wojskowej.</p>
    <p><strong>125.</strong> Żołnierz, o którym mowa w pkt 120, melduje o wyjściu na przepustkę, urlop (wyjazd w podróż służbową) służbie dyżurnej pododdziału lub wyznaczonemu żołnierzowi. Fakt opuszczenia jednostki (instytucji) wojskowej odnotowuje się w „Książce opuszczających miejsce przebywania”.</p>
    <p><strong>126.</strong> Żołnierza, o którym mowa w pkt 120, wychodzącego w mundurze sprawdza się w zakresie wyglądu i znajomości zasad żołnierskiego zachowania się. Czynności te realizuje dyżurny pododdziału lub wyznaczony żołnierz. Żołnierzowi umundurowanemu nieprzepisowo, wyglądającemu niedbale, nie zezwala się na opuszczenie terenu jednostki (instytucji) wojskowej do czasu usunięcia niedociągnięć. Za zaniedbania w tym zakresie żołnierz ponosi odpowiedzialność dyscyplinarną.</p>
    <p><strong>127.</strong> Po powrocie z przepustki, urlopu (podróży służbowej) żołnierz, o którym mowa w pkt 120, melduje swój powrót służbie dyżurnej pododdziału lub wyznaczonemu żołnierzowi, który odnotowuje czas powrotu w „Książce opuszczających miejsce przebywania”. Uwagi zwrócone mu w czasie pobytu poza terenem jednostki (instytucji) wojskowej melduje przełożonemu.</p>
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
    // Jeśli jesteśmy w wstępie, wracamy do tiles ze spisem treści
    if (currentContentId.value === 'wstep') {
      currentView.value = 'main'
    } else {
      currentView.value = 'subchapters'
    }
  } else if (currentView.value === 'subchapters') {
    currentView.value = 'main'
  } else {
    router.back()
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
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
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
  border-radius: 8px;
  padding: 1.5rem;
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
  border-radius: 8px;
}

.breadcrumb-text {
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--q-text-primary);
}

.content-view {
  margin-top: 1rem;
  background-color: white;
}

body.body--dark .content-view {
  background-color: #181a1b !important;
}

.content-text {
  background: white;
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
  .subchapter-card {
    background: #232526 !important;
    border: 2px solid #444 !important;
    color: #f2f2f2 !important;
  }
  .chapter-card h3,
  .subchapter-card h4,
  .chapter-card p,
  .subchapter-card p {
    color: #f2f2f2 !important;
  }
  .breadcrumb,
  .content-text {
    background: #181a1b !important;
    color: #f2f2f2 !important;
    border-color: #444 !important;
  }
  .document-header,
  .document-section {
    background: #232526 !important;
    color: #f2f2f2 !important;
  }
  .chapter-icon,
  .subchapter-icon {
    color: #f2f2f2 !important;
  }
}

body.body--dark .chapter-card,
body.body--dark .subchapter-card {
  background: #23282f !important;
  border: 2.5px solid #e0e0e0 !important;
  color: #f2f2f2 !important;
  box-shadow: 0 4px 32px 0 rgba(30,40,60,0.25), 0 1.5px 0 0 #101214;
  position: relative;
  overflow: hidden;
}
body.body--dark .chapter-card::before,
body.body--dark .subchapter-card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(135deg, rgba(80,90,120,0.10) 0%, rgba(30,40,60,0.13) 100%);
  z-index: 1;
}
body.body--dark .chapter-card h3,
body.body--dark .subchapter-card h4,
body.body--dark .chapter-card p,
body.body--dark .subchapter-card p {
  color: #f2f2f2 !important;
}
body.body--dark .chapter-icon,
body.body--dark .subchapter-icon {
  color: #f2f2f2 !important;
}
body.body--dark .breadcrumb,
body.body--dark .content-text {
  background: #181a1b !important;
  color: #f2f2f2 !important;
  border-color: #444 !important;
}
body.body--dark .document-header,
body.body--dark .document-section {
  background: #232526 !important;
  color: #f2f2f2 !important;
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

body.body--dark .chapter-card,
body.body--dark .subchapter-card {
  border: 1.5px solid #444950 !important;
  background: #2c313a !important;
}
</style>
