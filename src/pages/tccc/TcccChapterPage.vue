<template>
  <q-page class="q-pa-md flex flex-center bg-grey-2">
    <q-card class="tccc-chapter-card column q-pa-none" flat bordered>
      <q-card-section class="tccc-header q-pa-md bg-primary text-white shadow-2 rounded-borders">
        <div class="row items-center no-wrap">
          <q-btn
            class="tccc-back-btn q-mr-md"
            flat
            round
            color="white"
            text-color="primary"
            icon="arrow_back"
            @click="goBack"
            aria-label="Powrót"
          />
          <div class="tccc-title text-h5 text-weight-bold q-mb-xs">{{ chapter.title }}</div>
        </div>
      </q-card-section>
      <q-separator color="grey-3" />
      <q-card-section class="tccc-content-section bg-grey-1 q-pa-lg">
        <div class="tccc-content q-mx-auto" style="max-width: 720px;" v-html="chapter.content"></div>
      </q-card-section>
  </q-card>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const chapters = {
  1: {
    title: 'Podstawowy plan zarządzania dla taktycznej pomocy poszkodowanym podczas ewakuacji',
    content: `<section class="tccc-section">
<h4>Podstawowy plan zarządzania dla taktycznej pomocy poszkodowanym podczas ewakuacji</h4>
<ol>
  <li>Przekazanie poszkodowanych następnemu poziomowi pomocy.
    <ol type="a">
      <li>Personel taktyczny powinien zabezpieczyć punkt ewakuacyjny i przygotować poszkodowanych do transportu.</li>
      <li>Personel taktyczny lub medyczny powinien przekazać personelowi TACEVAC informacje o poszkodowanych i ich stanie w możliwie jak najbardziej zrozumiały sposób. Personelowi TACEVAC należy co najmniej przekazać informacje o tym, czy poszkodowani są stabilni czy nie, o znalezionych u nich obrażeniach i udzielonej pomocy.</li>
      <li>Personel TACEVAC powinien w niezbędnym zakresie przygotować poszkodowanych na platformach ewakuacyjnych.</li>
      <li>Poszkodowanych znajdujących się na platformach ewakuacyjnych należy zabezpieczyć zgodnie z instrukcjami jednostki, układem platform i wymogami ds. bezpieczeństwa.</li>
      <li>Personel medyczny TACEVAC powinien wykonać ponowną ocenę poszkodowanych, wszystkich występujących u nich obrażeń i udzielonej dotychczas pomocy.</li>
    </ol>
  </li>
  <li>Masywny krwotok (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Udrożnienie dróg oddechowych.<br>Zamiast konikotomii można rozważyć intubację dotchawiczą jeśli personel został przeszkolony w tym zakresie.</li>
  <li>Wentylacja/Oddychanie.<br>Większość poszkodowanych w warunkach pola walki nie wymaga podawania tlenu, ale jego podanie może być korzystne w poniższych przypadkach:
    <ul>
      <li>Niski poziom saturacji na odczycie pulsoksymetru.</li>
      <li>Urazy powodujące niewydolność oddechową.</li>
      <li>Poszkodowany jest nieprzytomny.</li>
      <li>Poszkodowany z urazem czaszkowo mózgowym [TBI] (utrzymanie saturacji &gt; 90%).</li>
      <li>Poszkodowany we wstrząsie.</li>
      <li>Poszkodowany znajdujący się na dużej wysokości.</li>
      <li>Poszkodowany wdychał dym lub jest podejrzenie, że mógł go wdychać.</li>
    </ul>
  </li>
  <li>Krążenie (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Umiarkowany lub poważny uraz czaszkowo-mózgowy (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Zapobieganie wychłodzeniu (hipotermii) (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Drążący uraz oka (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Monitorowanie poszkodowanego (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Analgezja (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Antybiotyki (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Ponownie sprawdź i opatrz wcześniej znalezione rany (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Sprawdź czy nie ma innych ran (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Oparzenia (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Ponownie oceń złamania i ponownie sprawdź tętna (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Resuscytacja krążeniowo-oddechowa (RKO, ang. CPR) podczas fazy taktycznej ewakuacji poszkodowanego (TACEVAC).
    <ol type="a">
      <li>Poszkodowani z urazem tułowia lub urazami wielonarządowymi, u których nie ma wyczuwalnego tętna i nie oddychają podczas TACEVAC powinni być poddani obustronnemu zabiegowi torakopunkcji w celu wykluczenia odmy prężnej. Niniejsza procedura jest identyczna z procedurą opisaną w ww. sekcji 4a.</li>
      <li>Resuscytacja krążeniowo-oddechowa może być wykonywana w tej fazie pomocy medycznej, o ile poszkodowany nie odniósł śmiertelnych ran, oraz zostanie on szybko przewieziony do placówki medycznej, w której można przeprowadzić zabieg chirurgiczny. Resuscytacja krążeniowo-oddechowa nie powinna być wykonywana kosztem misji lub zaniechania czynności ratujących życie innych poszkodowanych.</li>
    </ol>
  </li>
  <li>Komunikacja/łączność:
    <ol type="a">
      <li>Utrzymuj kontakt z poszkodowanym jeśli to możliwe. Podtrzymuj na duchu i uspakajaj, poinformuj poszkodowanego o przeprowadzonych działaniach medycznych.</li>
      <li>Kontaktuj się z personelem medycznym z następnego poziomu pomocy i w miarę możliwości przekazuj informacje o mechanizmie urazu, odniesionych przez poszkodowanego obrażeniach, występujących parametrach/objawach, oraz wykonanych procedurach medycznych. W odpowiednich przypadkach przekaż dodatkowe informacje.</li>
    </ol>
  </li>
  <li>Dokumentacja przebiegu pomocy udzielonej poszkodowanym (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
</ol>
</section>`
  },
  17: {
    title: 'Przygotuj poszkodowanego do ewakuacji',
    content: `<section class="tccc-section">
<h4>Przygotuj poszkodowanego do ewakuacji.</h4>
<ol type="a">
  <li>Wypełnij kartę TCCC Poszkodowanego (DD 1380) i umieść ją na poszkodowanym.</li>
  <li>Zabezpiecz wszystkie luźne końcówki bandaży i ochraniaczy.</li>
  <li>Zabezpiecz środki zapobiegające hipotermii tzn. ochraniacze/koce/taśmy.</li>
  <li>Zabezpiecz taśmy noszy w niezbędnym zakresie. Jeżeli ewakuacja będzie trwała długo rozważ ułożenie dodatkowych podkładek pod ciałem poszkodowanego.</li>
  <li>W razie potrzeby przekaż instrukcje poszkodowanym chodzącym.</li>
  <li>Zorganizuj ewakuację poszkodowanych zgodnie ze standardowymi procedurami operacyjnymi [SOP] jednostki.</li>
  <li>Utrzymuj bezpieczeństwo punktu ewakuacyjnego zgodnie ze standardowymi procedurami operacyjnymi jednostki.</li>
</ol>
</section>`
  },
  2: {
    title: 'Pomoc pod ostrzałem',
    content: `<section class="tccc-section">
<ol>
  <li>Odpowiadaj ogniem i ukryj się.</li>
  <li>Jeśli to możliwe, kieruj postępowaniem rannego, lub oczekuj od niego, że będzie brać czynny udział w walce.</li>
  <li>Nakaż rannemu, aby się ukrył i udzielił sobie pomocy, jeśli jest w stanie to zrobić, albo jeśli pozwala na to sytuacja taktyczna, przenieś go lub przeciągnij w bezpieczne miejsce.</li>
  <li>Próbuj chronić rannego przed odnoszeniem kolejnych obrażeń.</li>
  <li>Poszkodowani powinni być wyciągnięci z płonących pojazdów lub budynków i przemieszczeni do miejsc względnie bezpiecznych. Należy wykonać czynności prowadzące do ugaszenia płomieni.</li>
  <li>Zatrzymaj zagrażający życiu zewnętrzny krwotok, jeśli pozwala na to sytuacja taktyczna:
    <ul>
      <li>Nakaż rannemu, aby sam udzielił sobie pomocy przy krwotoku, jeśli jest to możliwe.</li>
      <li>Aby zatamować krwotok w sytuacji gdy występuje anatomiczne uwarunkowanie do zastosowania stazy taktycznej [zakładanej na kończyny - limb tourniquet], użyj stazy zalecanej przez Komitet CoTCCC.</li>
      <li>Załóż stazę na zranioną kończynę na mundur tuż obok miejsca/miejsc krwawienia. Jeżeli nie jesteś pewien, w którym miejscu występuje zagrażający życiu zewnętrzny krwotok, umieść stazę „wysoko i zaciśnij ją” (jak najbliżej miejsca krwawienia) na zranionej kończynie i przemieść poszkodowanego w bezpieczne miejsce.</li>
    </ul>
  </li>
  <li>Udrożnienie dróg oddechowych jest zazwyczaj prowadzone podczas fazy Taktycznej Pomocy Polowej.</li>
</ol>
</section>`
  },
  3: {
    title: 'Masywny krwotok',
    content: `<section class="tccc-section">
<ol>
  <li>Sprawdź poszkodowanego w celu wykluczenia niezdiagnozowanych krwawień i zabezpiecz wszystkie ich źródła. Jeżeli wcześniej nie założono stazy taktycznej [zakładanej na kończyny – limb tourniquet], należy to zrobić teraz korzystając ze stazy zalecanej przez Komitet CoTCCC w celu zatamowania zagrażającego życiu krwotoku zewnętrznego, jednak tylko w sytuacji, gdy występuje anatomiczne uwarunkowanie do zastosowania stazy lub w celu zabezpieczenia amputacji urazowych. Stazę należy założyć bezpośrednio na skórę, 5 – 7,5 cm powyżej miejsca krwawienia. Jeżeli rana nadal krwawi, obok pierwszej stazy należy założyć drugą.</li>
  <li>Na krwotoki (zewnętrzne), na które nie można zastosować stazy taktycznej [zakładanej na kończyny - limb tourniquet] lub zalecane jest zdjęcie takiej stazy, użyj opatrunku Combat Gauze jako czynnika hemostatycznego z wyboru, zalecanego przez Komitet CoTCCC.
    <ul>
      <li>Inne zalecane czynniki hemostatyczne do użycia zamiast Combat Gauze:
        <ul>
          <li>Celox Gauze albo</li>
          <li>ChitoGauze lub</li>
          <li>XStat (najlepiej działa w przypadku głębokich ran o długim kanale występujących w trudno dostępnych miejscach, np. w pachwinach lub dołach pachowych).</li>
          <li>iTClamp (może być jedynym użytym środkiem albo może być użyte łącznie z opatrunkiem hemostatycznym lub z XStat).</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Opatrunki hemostatyczne należy zastosować z bezpośrednim uciskiem trwającym co najmniej 3 minuty (niewymagane w przypadku XStat). Każdy opatrunek ma inny sposób działania, zatem jeżeli dany opatrunek nie zatamuje krwawienia, można go zdjąć i zastąpić nowym opatrunkiem tego samego lub innego typu. (Uwaga: Opatrunek XStat nie wolno zdejmować w warunkach polowych, natomiast można na nim założyć kolejny opatrunek XStat lub inne czynniki hemostatyczne albo opatrunki taktyczne.)
    <ul>
      <li>Jeżeli w miejscu krwawienia można założyć urządzenie służące do tamowania krwawienia w trudno dostępnych miejscach, np. w pachwinach lub dołach pachowych [junctional tourniquet], natychmiast należy je założyć. Po przygotowaniu urządzenia nie zwlekaj z jego założeniem. Jeżeli urządzenie nie jest dostępne lub jest przygotowywane do użycia, należy zastosować opatrunki hemostatyczne z bezpośrednim uciskiem.</li>
    </ul>
  </li>
  <li>W przypadku krwotoku zewnętrznego z głowy lub szyi, jeżeli krawędzie rany można łatwo przybliżyć, urządzenie iTClamp może być użyte jako pierwszy z wyboru środek do tamowania krwotoku. Przed założeniem iTClamp, jeżeli jest to właściwe, rany należy wypełnić opatrunkiem hemostatycznym lub XStat.
    <ul>
      <li>iTClamp nie wymaga dodatkowego bezpośredniego ucisku, bez względu na to czy jest jedynym użytym środkiem czy jest stosowane łącznie z innymi pomocniczymi środkami hemostatycznymi.</li>
      <li>Jeżeli iTClamp jest założone na szyję, często monitoruj drogi oddechowe i sprawdzaj czy nie rozwija się krwiak, który może doprowadzić do ich niedrożności. Rozważ założenie definitywnych dróg oddechowych, jeżeli są dowody wskazujące na rozwój krwiaka.</li>
      <li>NIE ZAKŁADAJ iTClamp na oko, blisko oka, ani na powiekę (w odległości 1 cm od oczodołu).</li>
    </ul>
  </li>
  <li>Przeprowadź wstępną ocenę, aby sprawdzić czy poszkodowany nie jest we wstrząsie hipowolemicznym (Głównymi objawami wstrząsu są zaburzenia stanu świadomości – po wykluczeniu urazu głowy - i/lub słabo wyczuwalne albo nieobecne tętno na tętnicy promieniowej) i rozważ natychmiastowe wykonanie resuscytacji zalecanej u poszkodowanych we wstrząsie.</li>
</ol>
</section>`
  },
  4: {
    title: 'Udrożnienie dróg oddechowych',
    content: `<section class="tccc-section">
<ol>
  <li>Sprawdź czy drogi oddechowe są drożne.</li>
  <li>W przypadku niedrożności dróg oddechowych spowodowanej urazem lub w przypadku zagrożenia niedrożnością, przygotuj się na możliwość wdrożenia interwencji prowadzących do udrożnienia dróg oddechowych.</li>
  <li>Pozwól przytomnemu poszkodowanemu przyjąć taką pozycję, która najlepiej zapewni drożność jego dróg oddechowych, włącznie z pozycją siedzącą i/lub pochyloną do przodu.</li>
  <li>Ułóż nieprzytomnego poszkodowanego w pozycji bezpiecznej, odchyl mu głowę; unieś podbródek.</li>
  <li>Użyj ssaka jeśli jest dostępny i jeżeli jest to właściwe.</li>
  <li>Jeśli dotychczas wdrożone środki okażą się nieskuteczne i niedrożność dróg oddechowych nie ustępuje (złamania twarzoczaszki, bezpośrednie urazy dróg oddechowych, krwawienie, deformacje lub oparzenia) wykonaj konikopunkcję chirurgiczną, stosując jedną z następujących metod:
    <ul>
      <li>Metoda chirurgiczna z użyciem prowadnicy typu Bougie i rurki do udrożnienia dróg oddechowych z kołnierzem i mankietem o średnicy zewnętrznej poniżej 10 mm, średnicy wewnętrznej 6-7 mm i długości 5-8 cm.</li>
      <li>Standardowa metoda chirurgiczna z użyciem rurki do udrożnienia dróg oddechowych z kołnierzem i mankietem o średnicy zewnętrznej poniżej 10 mm, średnicy wewnętrznej 6-7 mm i długości 5-8 cm (najmniej preferowana opcja).</li>
      <li>Sprawdź czy prawidłowo umieściłeś rurkę wykonując kapnografię EtCO2.</li>
      <li>Jeśli poszkodowany jest przytomny, użyj lidokainy.</li>
    </ul>
  </li>
  <li>Regularnie sprawdzaj wartości SpO2 i EtCo2 oraz drożność dróg oddechowych ponieważ ich stan może zmieniać się wraz z upływem czasu.</li>
  <li>U poszkodowanych, u których wystąpił wyłącznie uraz penetrujący nie ma konieczności stabilizowania odcinka szyjnego kręgosłupa.</li>
</ol>
</section>`
  },
  5: {
    title: 'Wentylacja/Oddychanie',
    content: `<section class="tccc-section">
<ol>
  <li>Oceń poszkodowanego pod względem wystąpienia odmy prężnej, odbarcz ją, jeśli to konieczne.
    <ul>
      <li>Załóż, że wystąpiła odma prężna i odbarcz ją jeżeli poszkodowany ma rozległy uraz tułowia lub rozległy uraz spowodowany wybuchem oraz występuje/ą u niego jeden lub więcej następujących objawów:
        <ul>
          <li>Ciężka lub postępująca niewydolność oddechowa.</li>
          <li>Znaczne lub postępujące przyspieszenie oddechu.</li>
          <li>Brak lub znaczne ściszenie szmeru pęcherzykowego po jednej stronie klatki piersiowej.</li>
          <li>Poziom saturacji sprawdzany pulsoksymetrem wykazuje wysycenie hemoglobiny tlenem &lt; 90%.</li>
          <li>Wstrząs.</li>
          <li>Pourazowe zatrzymanie krążenia u poszkodowanego bez obrażeń, które mogłyby prowadzić do śmierci.</li>
        </ul>
      </li>
      <li>Jeżeli odma nie zostanie szybko odbarczona, stan niewydolności oddechowej może doprowadzić do wstrząsu i pourazowego zatrzymania krążenia.</li>
    </ul>
  </li>
  <li>Początkowe leczenie podejrzewanej odmy prężnej:
    <ul>
      <li>Jeżeli poszkodowany ma założony wentylowy opatrunek uszczelniający, należy go rozszczelnić lub zdjąć.</li>
      <li>Oznacz poziom saturacji pulsoksymetrem.</li>
      <li>Połóż poszkodowanego na plecach lub w pozycji bezpiecznej na chorym boku, chyba, że jest przytomny i musi siedzieć, aby utrzymać drożność dróg oddechowych w przypadku urazów twarzoczaszki.</li>
      <li>Odbarcz odmę poprzez nakłucie klatki piersiowej po stronie wystąpienia rany igłą/kaniulą w rozmiarze 14G lub 10G, o długości 7-8 cm.</li>
      <li>Odmę odbarcza się nakłuwając klatkę piersiową w 5 przestrzeni międzyżebrowej (ICS) w linii pachowej przedniej (AAL) albo w 2 przestrzeni międzyżebrowej ICS w linii środkowo-obojczykowej (MCL). Jeśli nakłucie wykonujesz w linii środkowo-obojczykowej (MCL) upewnij się czy nie wprowadzasz igły w linii środkowo-sutkowej kierując ją w stronę serca.</li>
      <li>Igła/kaniula powinna być wprowadzana pod kątem prostym do ściany klatki piersiowej, tuż nad górną częścią dolnego żebra po stronie wkłucia. Włóż igłę/kaniulę aż do nasadki i utrzymuj wkłucie przez 5-10 sekund do uzyskania pełnego odbarczenia.</li>
      <li>Po odbarczeniu odmy prężnej, wyjmij igłę a kaniulę zostaw w miejscu wkłucia.</li>
      <li>Jeżeli poszkodowany ma rozległy uraz tułowia lub rozległy uraz spowodowany wybuchem i doszło u niego do zatrzymania krążenia (brak tętna, nie oddycha, nie reaguje na ból, brak jakichkolwiek innych oznak życia), odbarcz odmę po obu stronach klatki piersiowej zanim odstąpisz od resuscytacji krążeniowo-oddechowej.</li>
    </ul>
  </li>
  <li>Odmę skutecznie odbarczono jeżeli:
    <ul>
      <li>Stan niewydolności oddechowej ustępuje, lub</li>
      <li>Podczas wykonywania zabiegu odbarczenia odmy prężnej (NDC) słychać wyraźny syczący odgłos powietrza wydostającego się z klatki piersiowej (taka ocena może być trudna w środowisku, w którym jest wysokie natężenie hałasu), albo</li>
      <li>Wysycenie hemoglobiny tlenem wzrasta do 90% lub więcej (ważne: ten proces może trwać kilka minut i może nie występować na wysokościach), albo</li>
      <li>Poszkodowany bez parametrów życiowych odzyskał przytomność i/lub ma wyczuwalne tętno na tętnicy promieniowej.</li>
    </ul>
  </li>
  <li>Jeżeli pierwszy zabieg odbarczenia odmy prężnej (NDC) nie doprowadził do poprawy oznak/objawów związanych z podejrzewaną odmą prężną:
    <ul>
      <li>Ponownie odbarcz odmę prężną po tej samej stronie klatki piersiowej w jednym z tych zalecanych miejsc, w którym wcześniej nie wykonano zabiegu odbarczenia. Wykonując drugi zabieg użyj nowej igły/kaniuli.</li>
      <li>W oparciu o mechanizm powstania urazu i wyniki badania przedmiotowego, rozważ czy nie należy wykonać zabiegu odbarczenia po drugiej stronie klatki piersiowej.</li>
      <li>Regularnie oceniaj stan poszkodowanego!</li>
    </ul>
  </li>
  <li>Jeżeli pierwszy zabieg odbarczenia odmy był skuteczny, ale potem znowu zaczynają występować objawy:
    <ul>
      <li>Wykonaj kolejny zabieg odbarczenia odmy w tym samym miejscu, w którym wykonano poprzedni. Wykonując drugi zabieg użyj nowej igły/kaniuli.</li>
      <li>Regularnie oceniaj stan poszkodowanego!</li>
    </ul>
  </li>
  <li>Jeżeli drugi zabieg odbarczenia odmy też jest nieskuteczny: Wykonaj czynności opisane w sekcji dotyczącej Krążenia w Wytycznych TCCC.</li>
  <li>Wszystkie otwarte i/lub ssące rany klatki piersiowej powinny być natychmiast zabezpieczone wentylowym opatrunkiem uszczelniającym, chroniąc je i zabezpieczając przed przemieszczeniem. Jeżeli opatrunek wentylowy nie jest dostępny, należy użyć opatrunku okluzyjnego. Należy obserwować poszkodowanego w celu możliwości ewentualnego narastania odmy prężnej. Jeżeli u poszkodowanego wystąpią objawy niedotlenienia, zaburzenia oddychania lub hipotensja (niedociśnienie) i jest podejrzenie narastania odmy prężnej, należy rozszczelnić opatrunek lub całkowicie go usunąć, albo odbarczyć odmę przez nakłucie.</li>
  <li>Rozpocznij pulsoksymetrię. Wszyscy poszkodowani z umiarkowanym/poważnym urazem czaszkowo-mózgowym (TBI) powinni podlegać obserwacji z zastosowaniem pulsoksymetru. Odczyty mogą jednak być mylące w sytuacji wstrząsu lub zaawansowanej hipotermii.</li>
  <li>Poszkodowani z umiarkowanym/poważnym urazem czaszkowo-mózgowym (TBI) powinni otrzymać tlen, jeżeli jest dostępny, w celu utrzymania saturacji &gt; 90%.</li>
  <li>Jeśli poszkodowany ma zaburzenia oddychania, narastającą hipoksję z poziomem saturacji poniżej 90%, należy rozważyć założenie rurki nosowo-gardłowej w odpowiednim rozmiarze i prowadzić wentylację zastępczą z użyciem maski z workiem samorozprężalnym z zastawką o pojemności 1000 ml.</li>
  <li>Cały czas monitoruj wartości EtCO2 i SpO2 w celu sprawdzenia czy drogi oddechowe są nadal drożne.</li>
</ol>
</section>`
  },
  6: {
    title: 'Krążenie',
    content: `<section class="tccc-section">
<ol>
  <li>Krwawienie.
    <ol type="a">
      <li>Jeżeli podejrzewasz złamanie miednicy, należy zastosować stabilizator miednicy:
        <ul>
          <li>Do takiego złamania może dojść u poszkodowanego, który doznał poważnego urazu tępego lub urazu spowodowanego wybuchem i u którego wystąpiło jedno lub więcej z następujących wskazań:
            <ul>
              <li>Ból w okolicach miednicy.</li>
              <li>Amputacja dolnej kończyny lub uraz graniczący z amputacją.</li>
              <li>Badanie przedmiotowe wskazuje na wystąpienie złamania miednicy.</li>
              <li>Utrata przytomności.</li>
              <li>Wstrząs.</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>Dokonaj ponownej oceny zastosowanej uprzednio stazy. Odsłoń ranę i zdecyduj czy staza jest potrzebna. Jeśli jest potrzebna, zastąp stazę założoną na mundur drugą stazą umieszczając ją bezpośrednio na skórze 5 – 7.5 cm powyżej miejsca krwawienia [załóż nową stazę ZANIM zdejmiesz pierwszą. Nigdy nie zdejmuj pierwszej stazy zanim prawidłowo – tzn. odpowiednio mocno i stabilnie - nie założysz drugiej]. Upewnij się, że rana przestała krwawić. Jeżeli nie doszło do amputacji urazowej, należy sprawdzić tętno na odcinku dystalnym kończyny. Jeśli rana nadal krwawi lub nadal obecne jest tętno na odcinku dystalnym, należy mocniej zacisnąć stazę lub użyć kolejnej, zakładając ją powyżej pierwszej, aby wyeliminować krwawienie i tętno na odcinku dystalnym. Jeżeli w ramach ponownej oceny ustaliłeś, że założona wcześniej staza była niepotrzebna, usuń ją i zapisz godzinę jej usunięcia w Karcie TCCC Poszkodowanego.</li>
      <li>Gdy tylko jest to możliwe stazy taktyczne [zakładane na kończyny - limb tourniquet] i urządzenia służące do tamowania krwawienia w trudno dostępnych miejscach, np. w pachwinach lub dołach pachowych [junctional tourniquet], należy zastąpić środkami hemostatycznymi lub opatrunkami uciskowymi pod warunkiem, że spełnione są trzy następujące kryteria: poszkodowany nie jest we wstrząsie; można dokładnie obserwować ranę pod kątem krwawienia; staza nie została zastosowana w celu kontroli krwawienia z amputowanej kończyny. Należy podjąć wszelkie starania, aby w czasie nieprzekraczającym 2 godzin stazy/urządzenia zastąpić innymi środkami pod warunkiem, że będą one skutecznie kontrolować krwawienie. Stazy/urządzenia nie wolno zdejmować, jeżeli była/o na ciele poszkodowanego przez okres dłuższy niż 6 godzin, chyba, że jest możliwość dokładnego monitorowania poszkodowanego oraz dostęp do diagnostyki laboratoryjnej.</li>
      <li>Odsłoń wszystkie miejsca, w których założono stazy i wyraźnie oznacz je tak, aby było widać informację o godzinie ich założenia. W karcie TCCC poszkodowanego wpisz informacje o zastosowanych stazach i godzinach ich założenia; o godzinach powtórnego założenia; o godzinach zastąpienia staz innymi środkami; i o godzinach ich usunięcia. Informacje na stazach i w karcie poszkodowanego zapisz niezmywalnym markerem.</li>
    </ol>
  </li>
  <li>Sprawdź czy poszkodowany nie jest we wstrząsie hipowolemicznym (głównymi objawami wstrząsu są zaburzenia stanu świadomości – po wykluczeniu urazu głowy - i/lub słabo wyczuwalne albo nieobecne tętno na tętnicy promieniowej).</li>
  <li>Dostęp dożylny/doszpikowy (IV/IO).
    <ol type="a">
      <li>Dostęp dożylny (IV) lub doszpikowy (IO) jest wskazany jeżeli poszkodowany jest we wstrząsie hipowolemicznym albo występuje u niego wysokie ryzyko wystąpienia takiego wstrząsu (i z tego względu może wymagać resuscytacji płynowej), lub trzeba podać mu leki i doustna droga ich podania jest niedostępna.
        <ul>
          <li>Preferowaną metodą jest wkłucie dożylne kaniulą 18G.</li>
          <li>Jeżeli wskazany jest dostęp naczyniowy, ale nie można szybko go uzyskać przy pomocy wkłucia dożylnego, użyj wkłucia doszpikowego.</li>
        </ul>
      </li>
    </ol>
  </li>
  <li>Kwas traneksamowy (TXA).
    <ol type="a">
      <li>Jeśli przewidujesz, że poszkodowany najprawdopodobniej będzie wymagać przetoczenia dużej ilości krwi (na przykład wystąpił u niego wstrząs hipowolemiczny, jedna lub więcej amputacji, drążąca rana klatki piersiowej, lub poszkodowany manifestuje objawy rozległego krwotoku) ALBO</li>
      <li>Jeśli u poszkodowanego występują oznaki lub objawy wskazujące na poważny uraz czaszkowo-mózgowy lub zaburzenia świadomości w wyniku urazu spowodowanego wybuchem lub urazu tępego:
        <ul>
          <li>Podaj mu 2 g kwasu traneksamowego, podając go powoli dożylnie lub doszpikowo możliwie jak najszybciej, ale NIE później niż 3 godziny po urazie.</li>
        </ul>
      </li>
    </ol>
  </li>
  <li>Resuscytacja płynowa.
    <ol type="a">
      <li>Oceń czy poszkodowany jest we wstrząsie hipowolemicznym: (Głównymi objawami wstrząsu są zaburzenia stanu świadomości – po wykluczeniu urazu głowy - i/lub słabo wyczuwalne albo nieobecne tętno na tętnicy promieniowej).</li>
      <li>Wykaz produktów zalecanych w resuscytacji płynowej z wyboru od najbardziej do najmniej zalecanych dla poszkodowanych we wstrząsie hipowolemicznym:
        <ol type="i">
          <li>Krew pełna grupy O o niskim mianie przechowywana w niskiej temperaturze.</li>
          <li>Przebadana świeża krew pełna grupy O o niskim mianie.</li>
          <li>Osocze, koncentrat krwinek czerwonych (RBC) i płytki w stosunku 1:1:1.</li>
          <li>Osocze i koncentrat krwinek czerwonych w stosunku 1:1.</li>
          <li>Osocze albo koncentrat krwinek czerwonych.</li>
        </ol>
        <p><strong>UWAGA:</strong> Po wdrożeniu resuscytacji płynowej zastosuj środki zapobiegające hipotermii [Część 7].</p>
      </li>
      <li>Jeśli poszkodowany nie jest we wstrząsie:
        <ul>
          <li>Nie ma wskazań do natychmiastowej płynoterapii podawanej drogą dożylną.</li>
          <li>Płyny podawane doustnie są dopuszczalne, jeśli poszkodowany jest przytomny i może przełykać.</li>
        </ul>
      </li>
      <li>Jeśli poszkodowany jest we wstrząsie i dostępne są preparaty krwiopochodne, po otrzymaniu zgody dowódcy lub w ramach specjalnego protokołu ds. postępowania na polu walki stosowanego w przypadku użycia preparatów krwiopochodnych:
        <ul>
          <li>Przeprowadź resuscytację stosując pełną krew grupy O o niskim mianie przechowywaną w niskiej temperaturze, a jeśli nie jest dostępna.</li>
          <li>Przebadaną świeżą krew pełną grupy O o niskim mianie, a jeśli nie jest dostępna.</li>
          <li>Osocze, koncentrat krwinek czerwonych i płytki w stosunku 1:1:1, a jeśli nie są dostępne.</li>
          <li>Osocze i koncentrat krwinek czerwonych w stosunku 1:1, a jeśli nie są dostępne.</li>
          <li>Osocze liofilizowane, osocze płynne, osocze świeże mrożone (po rozmrożeniu) lub koncentrat krwinek czerwonych.</li>
        </ul>
        <p>Oceniaj stan poszkodowanego po podaniu każdej jednostki. Prowadź resuscytację płynową do uzyskania wyczuwalnego tętna na tętnicy promieniowej, poprawy stanu świadomości lub uzyskania ciśnienia skurczowego na poziomie 100 mmHg.</p>
        <p>Przerwij płynoterapię jeżeli uzyskałeś jeden lub więcej z wyżej wymienionych docelowych parametrów.</p>
        <p>Jeśli poszkodowanemu przetoczono preparaty krwiopochodne, podaj domięśniowo/doszpikowo jeden gram wapnia (30 ml glukonianu wapnia o stężeniu 10% lub 10 ml chlorku wapnia o stężeniu 10%) po pierwszym przetoczeniu preparatu.</p>
      </li>
      <li>Ze względu na podwyższone ryzyko zgonu spowodowanego reakcją hemolityczną, zabieg przetoczenia nieprzebadanej świeżej krwi pełnej grupy O o niskim mianie lub świeżej krwi pełnej określonej grupy powinien być przeprowadzony wyłącznie pod właściwym nadzorem medycznym przeszkolonego personelu.</li>
      <li>Aby uratować życie poszkodowanego, zabieg przetoczenia powinien być wykonany możliwie jak najszybciej po wystąpieniu zagrażającego życiu krwotoku. Jeśli jednostka nie dysponuje preparatami krwiopochodnymi grupy Rh minus, w przypadku wstrząsu hipowolemicznego należy użyć preparatów krwiopochodnych grupy Rh plus.</li>
      <li>Jeśli poszkodowany z zaburzeniami stanu psychicznego w związku z podejrzeniem wystąpienia urazu mózgowo-czaszkowego ma słabo wyczuwalne lub nieobecne tętno obwodowe, należy wdrożyć resuscytację płynową jeśli jest to konieczne w celu uzyskania lub podtrzymania normalnego tętna na tętnicy promieniowej. Jeżeli jest możliwość monitorowania ciśnienia krwi, należy utrzymać ciśnienie skurczowe w granicach 100-110 mmHg.</li>
      <li>Regularnie oceniaj stan poszkodowanego w celu wykluczenia wstrząsu. Jeżeli poszkodowany znowu jest we wstrząsie, sprawdź czy wszystkie zewnętrznie zastosowane środki kontroli krwotoku nadal skutecznie działają i powtórz resuscytację płynową zgodnie z wyżej opisaną procedurą.</li>
    </ol>
  </li>
  <li>Wstrząs oporny na leczenie.
    <ol type="a">
      <li>Jeśli poszkodowany we wstrząsie nie reaguje na resuscytację płynową, rozważ czy możliwą przyczyną wstrząsu opornego na leczenie może być nieodbarczona odma prężna. Za takim rozpoznaniem przemawiają uraz klatki piersiowej, przedłużająca się niewydolność oddechowa, brak odgłosu oddechu oraz wysycenie hemoglobiny tlenem &lt; 90%. Ponownie odbarcz odmę zgodnie z ww. zaleceniami lub wykonaj torakostomię prostą (tzn. wprowadzając rurkę „po palcu” korzystając z wcześniej wykonanego nacięcia)/drenaż klatki piersiowej w 5 przestrzeni międzyżebrowej w linii pachowej przedniej, zgodnie z umiejętnościami, doświadczeniem osoby udzielającej pomocy medycznej oraz pozwoleniami wydanymi tej osobie. Uwaga: jeśli wykonasz torakostomię prostą, niewydolność oddechowa może powrócić i może wystąpić konieczność ponownego odbarczenia odmy polegającego na wprowadzeniu palca przez wcześniej wykonane nacięcie. W oparciu o mechanizm urazu i wyniki badania przedmiotowego rozważ odbarczenie odmy po drugiej stronie klatki piersiowej.</li>
    </ol>
  </li>
</ol>
</section>`
  },
  7: {
    title: 'Zapobieganie wychłodzeniu (hipotermii)',
    content: `<section class="tccc-section">
<ol type="a">
  <li>Szybko i zdecydowanie działaj, aby zapobiec dalszemu spadkowi temperatury ciała i użyj dodatkowych zewnętrznych źródeł ciepła, jeśli to możliwe, u poszkodowanych urazowych i z poważnymi oparzeniami.</li>
  <li>Ogranicz narażenie poszkodowanego na wychłodzenie powodowane przez niską temperaturę gruntu, wiatru i powietrza. Połóż poszkodowanego na powierzchni izolowanej możliwie jak najszybciej, aby oddzielić go od zimnych powierzchni. Jeżeli jest to możliwe, nie zdejmuj z poszkodowanego wyposażenia ochronnego.</li>
  <li>Jeśli jest to możliwe, zmień mokre ubrania na suche i chroń poszkodowanego przed dalszym spadkiem temperatury ciała.</li>
  <li>Połóż na przedniej części tułowia i pod ramionami w dołach pachowych poszkodowanego rozgrzewający koc (aby zapobiec oparzeniom, żadnego źródła ogrzewania nie wolno kłaść bezpośrednio na skórze ani owijać nim tułowia).</li>
  <li>Umieść poszkodowanego w zewnętrznym wodoodpornym śpiworze.</li>
  <li>Możliwie jak najszybciej udoskonal zestaw zapobiegający hipotermii, w taki sposób, aby zapewniał dobrą izolację używając do tego celu śpiwora z kapturem lub innego dostępnego materiału izolującego wkładanego do worka/paroszczelnego ochraniacza.</li>
  <li>Przygotuj izolowany zestaw zapobiegający hipotermii zaopatrując go w zewnętrzne źródło ogrzewania aby zastąpić nim nieizolowany zestaw zapobiegający hipotermii; staraj się doskonalić działanie zestawu zapobiegającego hipotermii kiedy tylko będzie to możliwe.</li>
  <li>Podgrzej płyny resuscytacyjne do podania dożylnego używając podgrzewacza akumulatorowego, zgodnie z aktualnymi wytycznymi Komitetu CoTCCC; maksymalna prędkość przepływu ma wynosić 150 ml/min i temperatura wyjściowa 38°C.</li>
  <li>Zapobiegaj narażeniu poszkodowanego na wiatr i deszcz na platformach ewakuacyjnych.</li>
</ol>
</section>`
  },
  8: {
    title: 'Umiarkowany lub poważny uraz czaszkowo-mózgowy (TBI)',
    content: `<section class="tccc-section">
<ol>
  <li>Zapobiegaj hipoksemii (cel leczenia SpO2 &gt;90-95%).
    <ol type="a">
      <li>Jeśli podstawowe rękoczyny udrożnienia dróg oddechowych nie utrzymują poziomu saturacji powyżej 90% (SpO2 &gt;90%) albo nie można ich wykonać ze względów taktycznych, sprawdź czy niski poziom saturacji nie jest wynikiem odmy prężnej lub krwotoku.</li>
      <li>Rozważ chirurgiczne udrożnienie dróg oddechowych jeśli poziom saturacji jest poniżej 90% (SpO2 &lt;90%).</li>
    </ol>
  </li>
  <li>Zapobiegaj hipotensji (niskie ciśnienie tętnicze krwi) – celem leczenia jest utrzymanie ciśnienia skurczowego SBP na poziomie 100-110 mmHg. Jeśli poszkodowany jest we wstrząsie hipowolemicznym przetocz mu pełną krew lub osocze jeśli są dostępne. Jeśli u poszkodowanego nie ma oznak krwotoku lub wstrząsu hipowolemicznego podaj mu 1-2 L krystaloidów w bolusie.</li>
  <li>Sprawdź czy nie doszło do wklinowania mózgu i rozpocznij leczenie jeśli rozpoznałeś taki przypadek (pogarszający się stan neurologiczny, asymetryczne lub niereagujące na światło/rozszerzone źrenice, albo reakcja zgięciowa lub wyprostna).
    <ol type="a">
      <li>Czynności podejmowane w przypadku objawów zagrożenia wklinowania mózgu należy prowadzić nie dłużej niż 20 minut, a jeśli poszkodowany jest w trakcie ewakuacji, do czasu zabiegu operacyjnego.</li>
      <li>POWOLI przez ponad 10 minut podawaj dożylnie lub doszpikowo 250 ml 3% lub 5% ALBO 30 ml 23.4% hipertonicznego roztworu NaCl w bolusie i następnie przepłucz drogi podania solą fizjologiczną. Jeśli poszkodowany nie reaguje na leczenie, po 20 minutach podaj kolejną dawkę (maks. możesz podać 2 dawki).</li>
      <li>Monitoruj miejsce wkłucia dożylnego/doszpikowego i przerwij zabieg, jeśli wystąpią objawy wynaczynienia.</li>
      <li>Unieś głowę poszkodowanego do kąta 30 stopni pod warunkiem, że poszkodowany nie jest we wstrząsie i że jest to możliwe pod względem taktycznym.</li>
      <li>Jeśli poszkodowany ma założony kołnierz ortopedyczny, poluzuj go i ustaw głowę poszkodowanego tak, aby była skierowana do przodu.</li>
      <li>Prowadź hiperwentylację poszkodowanego i cały czas monitoruj wyniki kapnografii (cel leczenia: EtCO2 32-38 mmHg).</li>
    </ol>
  </li>
</ol>
</section>`
  },
  9: {
    title: 'Drążący uraz oka',
    content: `<section class="tccc-section">
<ul>
  <li>Jeśli u poszkodowanego wystąpił drążący uraz oka lub podejrzewasz, że taki uraz mógł wystąpić:
    <ul>
      <li>Wykonaj szybkie polowe badanie wzroku i zapisz jego wynik.</li>
      <li>Przykryj oko sztywnym opatrunkiem (BEZ podkładki uciskowej).</li>
      <li>Upewnij się, że poszkodowany, jeśli było to możliwe, połknął tabletkę 400 mg moksyfloksacyny ze swojego zestawu bojowego z lekami (Combat Wound Medication Pack - CWMP), lub w sytuacji gdy nie było możliwości podania tego leku drogą doustną, otrzymał antybiotyk drogą dożylną, doszpikową lub domięśniową zgodnie z poniższymi wytycznymi.</li>
    </ul>
  </li>
</ul>
</section>`
  },
  10: {
    title: 'Monitorowanie poszkodowanego',
    content: `<section class="tccc-section">
<ul>
  <li>Rozpocznij elektroniczne monitorowanie poszkodowanego jeżeli jest to wskazane i jeżeli dysponujesz sprzętem do takiego monitorowania.</li>
</ul>
</section>`
  },
  11: {
    title: 'Analgezja',
    content: `<section class="tccc-section">
<ol type="a">
  <li>Ratownicy bez wykształcenia medycznego przeszkoleni pod kątem TCCC (TCCC non-medical first responders) powinni wykonywać analgezję w warunkach pola walki korzystając z następującej metody:
    <ul>
      <li>Ból w stopniu od łagodnego do umiarkowanego. Poszkodowany nadal jest zdolny do walki.
        <ul>
          <li>Bojowy zestaw z lekami (TCCC Combat Wound Medication Pack – CWMP):
            <ul>
              <li>Acetaminofen – 500 mg tabletka, 2 x doustnie (PO) co 8 godzin.</li>
              <li>Meloksykam – 15 mg doustnie raz dziennie.</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Personel medyczny przeszkolony pod kątem TCCC – TCCC Medical Personnel:
    <ol>
      <li>Ból w stopniu od łagodnego do umiarkowanego. Poszkodowany nadal jest zdolny do walki.
        <ul>
          <li>Bojowy zestaw z lekami (TCCC Combat Wound Medication Pack - CWMP):
            <ul>
              <li>Acetaminofen – 500 mg tabletka, 2 x doustnie (PO) co 8 godzin.</li>
              <li>Meloksykam – 15 mg doustnie raz dziennie.</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>Ból w stopniu od łagodnego do umiarkowanego. Poszkodowany NIE jest we wstrząsie ani nie ma zaburzeń oddychania I u poszkodowanego NIE WYSTĘPUJE duże ryzyko wystąpienia któregoś z tych stanów.
        <ul>
          <li>Fentanyl w lizaku (oral transmucosal fentanyl citrate) [OTFC], 800 μg podany doustnie PO. Dawkę można powtórzyć po 15 minutach, jeśli po pierwszej ból nie ustąpił.</li>
          <li>Fentanyl 50 mcg podawany dożylnie/doszpikowo (0.5-1 mcg/kg). Można powtarzać co 30 min.</li>
          <li>Fentanyl 100 mcg podawany donosowo IN. Można powtarzać co 30 min.</li>
        </ul>
      </li>
      <li>Ból w stopniu od umiarkowanego do silnego. Poszkodowany JEST we wstrząsie albo MA zaburzenia oddychania ALBO U poszkodowanego WYSTĘPUJE duże ryzyko wystąpienia któregoś z tych stanów.
        <ul>
          <li>Ketamina 20 - 30 mg (lub 0.2 - 0.3 mg/kg) powoli podawana dożylnie lub doszpikowo. Powtórz dawki co 20min w razie potrzeby dożylnie lub doszpikowo. Moment zakończenia: ból ustąpił lub u poszkodowanego wystąpił oczopląs (rytmiczne oscylacje gałek).</li>
          <li>Ketamina 50-100 mg (lub 0.5-1 mg/kg) domięśniowo lub do nosa. Powtórz dawki co 20-30 min w razie potrzeby domięśniowo lub do nosa (IM lub IN).</li>
        </ul>
      </li>
      <li>Wymagana sedacja: rozległe i poważne obrażenia wymagające dysocjacji pacjenta ze względu na jego bezpieczeństwo lub powodzenie misji, albo gdy u poszkodowanego należy przeprowadzić zabieg inwazyjny; pacjenta należy przygotować do zabezpieczenia dróg oddechowych:
        <ul>
          <li>Ketamina 1-2 mg/kg pierwsza dawka powoli podawana dożylnie lub doszpikowo. Moment zakończenia: znieczulenie (dysocjacyjne).</li>
          <li>Ketamina 300 mg pierwsza dawka podawana domięśniowo (lub 2-3 mg/kg IM). Moment zakończenia: znieczulenie (dysocjacyjne).</li>
          <li>W przypadku zdarzenia nagłego, rozważ podanie 0,5-2 mg midazolamu dożylnie lub doszpikowo.</li>
          <li>Jeśli niezbędna jest dalsza dysocjacja, działaj zgodnie z wytycznymi dotyczącymi analgezji i sedacji w ramach Przedłużonej opieki nad poszkodowanym (Prolonged Casualty Care (PCC)).</li>
          <li>Jeśli wymagane jest znieczulenie na dłuższy okres: Ketamina podawana powoli dożylnie lub doszpikowo – 0,3 mg/kg w 100 ml 0,9% roztworu chlorku sodu przez 5 - 15 minut. Powtórz dawki co 45 min w razie potrzeby stosując wkłucie dożylne lub doszpikowe IV lub IO. Moment zakończenia: ból ustąpił lub u poszkodowanego wystąpił oczopląs (rytmiczne oscylacje gałek).</li>
        </ul>
      </li>
    </ol>
  </li>
</ol>
<h4>Uwagi dotyczące analgezji i sedacji:</h4>
<ol>
  <li>Poszkodowanych, którym podano OTFC, dożylnie lub doszpikowo fentanyl, ketaminę lub midazolam należy rozbroić.</li>
  <li>Celem znieczulenia jest zmniejszenie bólu do stopnia znośnego przy jednoczesnym utrzymaniu ochrony dróg oddechowych i stanu psychicznego.</li>
  <li>Celem sedacji jest zahamowanie świadomości w zakresie bolesnych zabiegów.</li>
  <li>Dokumentuj badanie stanu przytomności stosując skalę Glasgow (AVPU) przed podaniem opioidów i ketaminy.</li>
  <li>Wszyscy poszkodowani, którym podano opioidy, ketaminę lub benzodiazepiny muszą mieć dokładnie monitorowane drogi oddechowe, oddychanie i krążenie.</li>
  <li>Wytyczne dotyczące podania OTFC:
    <ul>
      <li>Lizak należy umieścić pomiędzy policzkiem i dziąsłem.</li>
      <li>Lizaka nie wolno gryźć.</li>
      <li>Ze względów bezpieczeństwa zaleca się przyklejenie lizaka plastrem do palca poszkodowanego ALBO użycie agrafki i gumki (gumka musi być napięta), którymi należy umocować lizak na mundurze poszkodowanego lub na kieszeni kamizelki kuloodpornej, w której znajduje się płyta ochronna.</li>
      <li>Oceń stan poszkodowanego po 15 minutach.</li>
      <li>Dodaj drugiego lizaka, w drugi policzek, jeśli jest to konieczne do uśmierzenia silnego bólu.</li>
      <li>Obserwuj czy nie występują zaburzenia oddychania.</li>
    </ul>
  </li>
  <li>Ketamina jest dostępna w różnych stężeniach; jeżeli drogą podania jest nos [IN] zaleca się podanie leku w wyższym stężeniu (100 mg/ml) w celu zmniejszenia jego objętości podawanej donosowo.</li>
  <li>Podając opioidy zawsze miej pod ręką Nalokson (0,4 mg dożylnie, doszpikowo, domięśniowo lub do nosa).</li>
  <li>Uraz czaszkowo-mózgowy (TBI) i/lub uraz oka nie wyklucza możliwości zastosowania ketaminy. Natomiast u pacjentów z urazem czaszkowo-mózgowym trzeba zachować ostrożność w zakresie użycia OTFC, dożylnie lub doszpikowo podawanego fentanylu, ketaminy i midazolamu ponieważ działanie tych leków może utrudnić przeprowadzenie badania neurologicznego lub stwierdzenie czy u pacjenta nie dochodzi do dekompensacji.</li>
  <li>Ketamina może być przydatnym środkiem stosowanym w celu zmniejszenia ilości opioidów niezbędnych do skutecznego ograniczania bólu. Podanie ketaminy poszkodowanemu, który wcześniej otrzymał substancję narkotyczną nie stanowi zagrożenia. Ketaminę podawaną dożylnie należy podawać powoli przez ponad minutę.</li>
  <li>Jeżeli stwierdzisz, że po podaniu opioidów lub ketaminy doszło do niewydolności oddechowej, ułóż poszkodowanego w „pozycji węszącej”. Jeśli jego stan nie poprawi się, w celu podtrzymania oddechu, prowadź wentylację zastępczą z użyciem maski z workiem samorozprężalnym z zastawką lub maski twarzowej.</li>
  <li>Ondansetron, 4 mg podane w postaci ODT [tabletek ulegających rozpadowi w jamie ustnej] /IV [dożylnie]/IO [doszpikowo]/IM [domięśniowo], co 8 godzin w przypadku wystąpienia nudności lub wymiotów. Jeżeli nudności i wymioty nie ustępują, dawkę tę można powtórzyć po 15 minutach – dozwolone jest tylko jedno powtórzenie. Dawka podawana w ośmiogodzinnych odstępach nie może przekroczyć 8 mg. Ondasetronu w postaci tabletek ulegających rozpadowi w jamie ustnej [ODT] NIE wolno zastępować tabletkami przeznaczonymi do połknięcia w całości.</li>
  <li>W ramach analgezji NIE zaleca się rutynowego podawania benzodiazepin, np. midazolamu. Wykonując sedację, można rozważyć użycie benzodiazepin w celu leczenia zaburzeń behawioralnych lub niepożądanych (nagłych) reakcji. Benzodiazepin nie należy stosować profilaktycznie i zazwyczaj są zbędne jeśli użyto ketaminy w prawidłowej dawce zapewniającej działanie przeciwbólowe lub sedacyjne.</li>
  <li>Nie zaleca się polipragmazji; benzodiazepin NIE należy stosować łącznie z opioidowymi lekami przeciwbólowymi.</li>
  <li>Jeżeli poszkodowany jest w stanie częściowej dysocjacji, bezpieczniej jest podać kolejną dawkę ketaminy niż użyć benzodiazepin.</li>
</ol>
</section>`
  },
  12: {
    title: 'Antybiotyki',
    content: `<section class="tccc-section">
<ol type="a">
  <li>Antybiotyki są zalecane przy wszystkich ranach otwartych odniesionych na polu walki.</li>
  <li>Jeżeli poszkodowany jest w stanie przyjąć lek doustnie:
    <ul>
      <li>Moksyfloksacyna (z zestawu z lekami - CWMP), 400mg, doustnie, raz dziennie.</li>
    </ul>
  </li>
  <li>Jeżeli poszkodowany nie jest w stanie przyjąć leku doustnie (jest we wstrząsie lub jest nieprzytomny):
    <ul>
      <li>Ertapenem, 1g dożylnie/ doszpikowo/ domięśniowo, raz dziennie.</li>
    </ul>
  </li>
</ol>
</section>`
  },
  13: {
    title: 'Wytrzewienie jamy brzusznej',
    short: 'Postepowanie przy wytrzewieniu',
    content: `<section class="tccc-section">
<ol type="a">
  <li>Sprawdź i opatrz wcześniej znalezione rany.</li>
  <li>Wytrzewienie jamy brzusznej – [Kontrola krwawienia]; miejsce wytrzewienia przepłucz czystym (i ciepłym, jeśli to możliwe) płynem, aby zmniejszyć całkowite zanieczyszczenie. Tamowanie krwotoków – aby zatamować krwawienie użyj opatrunku combat gauze lub opatrunku hemostatycznego zatwierdzonego przez Komitet CoTCCC. Przykryj wytrzewione jelito wilgotnym jałowym opatrunkiem lub jałowym wodoodpornym materiałem.</li>
  <li>Zmniejszanie wytrzewienia: nie podejmuj próby zmniejszania wytrzewienia, jeśli występują oznaki pęknięcia jelita (wyciek płynu żołądkowego/jelitowego lub stolca) lub występuje aktywne krwawienie.</li>
  <li>Jeśli nie ma oznak pęknięcia jelita ani krwotoku, można podjąć jedną krótką (trwającą krócej niż 60 sekund) próbę włożenia wytrzewionego jelita do jamy brzusznej/zmniejszenia wytrzewienia.</li>
  <li>Jeśli wytrzewienia nie można zmniejszyć; przykryj wytrzewione narządy wodoodpornym nieprzylepnym materiałem (materiał powinien być przezroczysty, aby można było regularnie sprawdzać czy rana nie zaczyna krwawić); takim materiałem może być worek kolostomijny, worek na płyn dożylny, przezroczysta folia do pakowania żywności, itp. i przyklej taki wodoodporny opatrunek na ciele pacjenta używając przylepnego opatrunku (np. obłożenie chirurgiczne typu ioban, opatrunek klatki piersiowej - chest seal).</li>
  <li>NIE używaj SIŁY wkładając pętle jelitowe do jamy brzusznej ani manipulując aktywnie krwawiącymi jelitami.</li>
  <li>Poszkodowanemu nie należy podawać nic doustnie.</li>
</ol>
</section>`
  },
  14: {
    title: 'RKO',
    short: 'Resucucytacja krazeniowo oddechowa',
    content: `<section class="tccc-section">
<h4>Resuscytacja krążeniowo-oddechowa (RKO, ang. CPR).</h4>
<ol type="a">
  <li>Resuscytacja na polu walki, poszkodowanych, którzy doznali obrażeń po wybuchu lub z obrażeniami drążącymi, u których nie ma wyczuwalnego tętna, oddechu i innych parametrów życiowych, będzie nieskuteczna i nie powinna być stosowana.</li>
  <li>Jednakże poszkodowani z urazem tułowia lub urazami wielonarządowymi, u których nie ma wyczuwalnego tętna i nie oddychają podczas fazy TFC powinni być poddani obustronnemu zabiegowi torakopunkcji w celu wykluczenia odmy prężnej przed zaniechaniem udzielania dalszej pomocy należy zastosować procedurę opisaną w wyżej wymienionej sekcji "Wentylacja/Oddychanie".</li>
</ol>
</section>`
  },
  16: {
    title: 'Komunikacja/łączność',
    content: `<section class="tccc-section">
<h4>Komunikacja/łączność.</h4>
<ol type="a">
  <li>Utrzymuj kontakt z poszkodowanym jeśli jest to możliwe. Podtrzymuj na duchu i uspakajaj, poinformuj poszkodowanego o przeprowadzonych działaniach medycznych.</li>
  <li>Jak najszybciej skontaktuj się z dowództwem szczebla taktycznego i utrzymuj z nim łączność podczas udzielania rannemu niezbędnej pomocy. Poinformuj dowództwo o stanie poszkodowanego i potrzebach ewakuacyjnych. Dzięki tym informacjom pomożesz koordynować zasoby niezbędne do ewakuacji.</li>
  <li>Skontaktuj się z komponentami systemu ewakuacyjnego (Komórka koordynująca ewakuację poszkodowanych - Patient Evacuation Coordination Cell), aby zorganizować TACEVAC. Jeśli to możliwe, informuj personel medyczny o potrzebach ewakuacyjnych, przekaż informacje o mechanizmie urazu, odniesionych przez poszkodowanego obrażeniach, występujących parametrach/objawach, oraz wykonanych procedurach medycznych. W odpowiednich przypadkach przekaż dodatkowe informacje.</li>
</ol>
</section>`
  },
  18: {
    title: 'Komunikacja/łączność',
    content: `<section class="tccc-section">
<ol>
  <li>Utrzymuj kontakt z poszkodowanym jeśli jest to możliwe. Podtrzymuj na duchu i uspakajaj, poinformuj poszkodowanego o przeprowadzonych działaniach medycznych.</li>
  <li>Jak najszybciej skontaktuj się z dowództwem szczebla taktycznego i utrzymuj z nim łączność podczas udzielania rannemu niezbędnej pomocy. Poinformuj dowództwo o stanie poszkodowanego i potrzebach ewakuacyjnych. Dzięki tym informacjom pomożesz koordynować zasoby niezbędne do ewakuacji.</li>
  <li>Skontaktuj się z komponentami systemu ewakuacyjnego (Komórka koordynująca ewakuację poszkodowanych - Patient Evacuation Coordination Cell), aby zorganizować TACEVAC. Jeśli to możliwe, informuj personel medyczny o potrzebach ewakuacyjnych, przekaż informacje o mechanizmie urazu, odniesionych przez poszkodowanego obrażeniach, występujących parametrach/objawach, oraz wykonanych procedurach medycznych. W odpowiednich przypadkach przekaż dodatkowe informacje.</li>
</ol>
</section>`
  },
  15: {
    title: 'Dokumentacja medyczna',
    content: `<section class="tccc-section">
<h4>Dokumentacja medyczna.</h4>
<ol type="a">
  <li>Dokumentuj ocenę kliniczną, wykonane zabiegi i zmiany w stanie poszkodowanego w Polowej Karcie TCCC Poszkodowanego (DD Form 1380).</li>
  <li>Przekaż te informacje wraz z poszkodowanym kolejnej grupie medycznej.</li>
</ol>
</section>`
  },
  20: {
    title: 'Przygotowanie poszkodowanego do ewakuacji',
    content: `<section class="tccc-section">
<ol>
  <li>Wypełnij kartę TCCC Poszkodowanego (DD 1380) i umieść ją na poszkodowanym.</li>
  <li>Zabezpiecz wszystkie luźne końcówki bandaży i ochraniaczy.</li>
  <li>Zabezpiecz środki zapobiegające hipotermii tzn. ochraniacze/koce/taśmy.</li>
  <li>Zabezpiecz taśmy noszy w niezbędnym zakresie. Jeżeli ewakuacja będzie trwała długo rozważ ułożenie dodatkowych podkładek pod ciałem poszkodowanego.</li>
  <li>W razie potrzeby przekaż instrukcje poszkodowanym chodzącym.</li>
  <li>Zorganizuj ewakuację poszkodowanych zgodnie ze standardowymi procedurami operacyjnymi [SOP] jednostki.</li>
  <li>Utrzymuj bezpieczeństwo punktu ewakuacyjnego zgodnie ze standardowymi procedurami operacyjnymi jednostki.</li>
</ol>
</section>`
  },
  21: {
    title: 'Tactical Evacuation Care (TACEVAC)',
    content: `<section class="tccc-section">
<ol>
  <li>Przekazanie poszkodowanych następnemu poziomowi pomocy.</li>
  <li>Masywny krwotok (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Udrożnienie dróg oddechowych.</li>
  <li>Wentylacja/Oddychanie.</li>
  <li>Krążenie (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Umiarkowany lub poważny uraz czaszkowo-mózgowy (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Zapobieganie wychłodzeniu (hipotermii) (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Drążący uraz oka (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Monitorowanie poszkodowanego (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Analgezja (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Antybiotyki (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Ponownie sprawdź i opatrz wcześniej znalezione rany (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Sprawdź czy nie ma innych ran (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Oparzenia (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Ponowna ocena złamań i ponowne sprawdzenie tętna (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
  <li>Resuscytacja krążeniowo-oddechowa (RKO, ang. CPR) podczas fazy taktycznej ewakuacji poszkodowanego (TACEVAC).</li>
  <li>Komunikacja/łączność.</li>
  <li>Dokumentacja przebiegu pomocy udzielonej poszkodowanym (należy stosować te same wytyczne, które opracowano dla fazy Taktycznej Pomocy Polowej).</li>
</ol>
</section>`
  }
}

const route = useRoute()
const router = useRouter()
const chapterId = computed(() => Number(route.params.nr))
const chapter = computed(() => chapters[chapterId.value] || { title: 'Nieznany rozdział', content: '' })

function goBack () {
  router.back()
}
</script>

<style scoped>
.q-page.bg-grey-2 {
  min-height: 100vh;
}
/* --- TCCC Article Professional Styles --- */
.tccc-chapter-card {
  max-width: 820px;
  width: 100%;
  min-height: 60vh;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.10);
  margin: 0 auto;
  overflow: hidden;
}
.tccc-header {
  border-radius: 0;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}
.tccc-title {
  flex: 1 1 auto;
  word-break: break-word;
}
.tccc-content-section {
  padding: 0;
}
.tccc-content {
  font-size: 1.13rem;
  line-height: 1.7;
  color: #222;
}
.tccc-content section.tccc-section {
  margin-bottom: 2.2em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #e0e0e0;
}
.tccc-content ol, .tccc-content ul {
  margin: 0 0 1.2em 1.5em;
  padding-left: 1.1em;
}
.tccc-content li {
  margin-bottom: 0.55em;
  font-size: 1.08em;
}
.tccc-content h3, .tccc-content h4 {
  margin: 1.3em 0 0.6em 0;
  color: #1976d2;
  font-weight: 600;
  font-size: 1.18em;
}
.tccc-content em {
  color: #607d8b;
}
.tccc-content li:last-child {
  margin-bottom: 0;
}
.tccc-content code {
  background: #f5f5f5;
  color: #c7254e;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 0.98em;
}
@media (max-width: 600px) {
  .tccc-content {
    font-size: 1.01rem;
    padding: 0 1px;
  }
  .tccc-chapter-card {
    max-width: 100vw;
    border-radius: 0;
  }
  .tccc-header {
    border-radius: 0;
  }
}
</style>
