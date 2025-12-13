<template>
  <q-page class="modern-bg">
    <div class="container q-pa-md">
      <BackNav color="black"/>
      <div class="text-center q-mb-xl">
        <div class="modern-hero-section q-pa-lg rounded-borders">
          <div class="text-h4 text-weight-bold text-military-secondary q-mb-sm">Podręcznik Procedur Radiowych</div>
          <div class="text-body1 text-military-dark">Standardy Pola Walki</div>
        </div>
      </div>
      <q-card class="q-mb-lg">
        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-md">1. Wstęp: Filozofia Łączności Bojowej</div>
          <div class="q-mb-md">
Radiostacja jest bronią. Niewłaściwie użyta zdradza pozycję, wprowadza chaos i zabija. Celem tego podręcznika jest wyrobienie nawyku komunikacji zwięzłej, bezoosobowej i technicznie poprawnej. W stresie walki żołnierz spada do poziomu swoich nawyków, dlatego procedury muszą być wyuczone na pamięć (Memory Drills).
          </div>
          <ul class="q-mb-md">
            <li><b>Bezoosobowość:</b> W sieci radiowej nie ma "mnie", "ciebie", "nas". Są stacje i kryptonimy.</li>
            <li><b>Dyscyplina PTT:</b> Najpierw pomyśl, potem naciśnij, odczekaj, mów.</li>
            <li><b>Potwierdzanie:</b> Komunikat niepotwierdzony to komunikat nieodebrany.</li>
          </ul>
          <div class="text-h6 text-weight-bold q-mb-md">2. Technika Pracy: Fizyka i "Zasada Sekundy"</div>
          <div class="q-mb-md">
Najczęstszym błędem technicznym jest ucinanie początku komunikatu. Wynika to z opóźnienia działania układów cyfrowych i blokady szumów (Squelch) w radiostacji odbiorczej.
          </div>
          <div class="q-mb-md"><b>2.1. Opóźnienie PTT (Zasada "Słowa na K")</b><br>
Po naciśnięciu przycisku nadawania (PTT), radiostacja potrzebuje czasu na synchronizację z siecią. Jeśli zaczniesz mówić natychmiast, pierwsza sylaba (zazwyczaj kluczowy kryptonim) nie zostanie usłyszana.<br>
<b>Procedura Wykonawcza:</b>
<ul>
  <li>Wciśnij PTT.</li>
  <li>Wykonaj w myślach pauzę trwającą tyle, ile zajmuje wypowiedzenie słowa "BULWA" (ok. 0,5 – 1 sekundy) lub wykonaj krótki wdech.</li>
  <li>Dopiero teraz rozpocznij mówienie.</li>
  <li>Po skończeniu zdania zwolnij PTT.</li>
</ul>
          </div>
          <div class="q-mb-md"><b>2.2. Zasada Czytania Liczb (Grupowanie)</b><br>
W celu przyspieszenia transmisji i zwiększenia czytelności, w warunkach bojowych odchodzi się od cyfrowania pojedynczego (jeden-dwa-trzy) na rzecz grupowania cyfr po dwie lub trzy, o ile nie są to współrzędne precyzyjne. Choć prościej i dopuszczalnie mówimy cyfra po cyfrze)
<ul>
  <li><b>Grupy dwucyfrowe:</b> Stosowane przy podawaniu kanałów, azymutów, krótkich odległości (liczba długości 2,4,8,10)</li>
  <li><b>Grupy trzycyfrowe:</b> Stosowane przy siatkach mapy, częstotliwościach i dużych odległościach (liczby długości 3,6,9)</li>
</ul>
<small>Uwaga: Przy podawaniu współrzędnych GRID, w przypadku słabej słyszalności, wraca się do cyfrowania pojedynczego dla uniknięcia pomyłki (polecane zawsze)</small>
          </div>
          <div class="text-h6 text-weight-bold q-mb-md">3. Procedury Wywoławcze</div>
          <div class="q-mb-md"><b>3.1. Procedura "3 na 2" (Warunki Trudne / Inicjacja)</b><br>
Stosowana przy nawiązywaniu łączności w warunkach zakłóceń, hałasu pola walki lub przy pierwszym wywołaniu stacji, która może nie czuwać przy radiu.
<ul>
  <li>3x Kryptonim ADRESATA (Kogo wołam)</li>
  <li>1x zwrot TU</li>
  <li>2x Kryptonim NADAWCY (Kto woła)</li>
  <li>1x zwrot ODBIÓR</li>
</ul>
          </div>
          <div class="q-mb-md"><b>3.2. Wywołanie w Łączności Pewnej ("1 na 1")</b><br>
Stosowane w trakcie trwającej rozmowy, gdy jakość połączenia jest potwierdzona.</div>
          <div class="text-h6 text-weight-bold q-mb-md">4. Organizacja Sieci: TDR i Okólnik</div>
          <div class="q-mb-md">
Nigdy nie używaj zwrotu "Wszyscy". Wprowadza on chaos. Zamiast tego stosuje się Tabelę Danych Radiowych (TDR) i kryptonim okólnikowy.
          </div>
          <div class="text-h6 text-weight-bold q-mb-md">5. Raportowanie Sytuacyjne: SALUTE vs SALTR</div>
          <div class="q-mb-md">
<b>SALUTE</b> – Rozpoznanie/Obserwacja: Size, Activity, Location, Unit, Time, Equipment<br>
<b>SALTR</b> – Kontakt Ogniowy: Size, Activity, Location, Time, Reaction
          </div>
          <div class="text-h6 text-weight-bold q-mb-md">6. Procedura Ratunkowa: MEDEVAC</div>
          <div class="q-mb-md">
Start sekwencji: Trzykrotne "MEDEVAC" zatrzymuje wszelkie inne rozmowy w sieci. Linie 1-5 muszą być podane natychmiast, by śmigłowiec wystartował.
          </div>
          <div class="text-h6 text-weight-bold q-mb-md">7. SKRYPT OPERACYJNY (Symulacja)</div>
          <div class="q-mb-md">
<q-expansion-item label="Przykładowe dialogi radiowe (rozwiń)" expand-separator>
  <div class="q-mb-md"><b>SYTUACJA 1: Nawiązanie łączności i patrol (Spokój)</b><br>
  <pre class="q-mt-sm">ALFA-01: (Wciska PTT, pauza)
OMEGA, OMEGA, OMEGA... TU... ALFA-01, ALFA-01... ODBIÓR.
OMEGA:
TU OMEGA. Słyszę na pięć. ODBIÓR.
ALFA-01:
TU ALFA-01. Osiągnięto punkt zborny. Rozpoczynam patrol w sektorze B. ODBIÓR.
  OMEGA:
  TU OMEGA. Zrozumiano. Zachować ciszę radiową do momentu kontaktu. ODBIÓR.</pre></div>
  <div class="q-mb-md"><b>SYTUACJA 2: Wykrycie przeciwnika (Meldunek SALUTE)</b><br>
  <pre class="q-mt-sm">SOKÓŁ: (Wciska PTT, pauza)
OMEGA, OMEGA, OMEGA... TU... SOKÓŁ, SOKÓŁ... ODBIÓR.
OMEGA:
TU OMEGA. Zgłaszam się. ODBIÓR.
SOKÓŁ:
TU SOKÓŁ. Meldunek SALUTE.
Size: Czterech ludzi.
Activity: Zakładają ładunki wybuchowe pod mostem.
Location: Sektor C, siatka 34-90.
Unit: Mundury nieregularne, brak naszywek.
Time: Teraz.
Equipment: Broń lekka, brak broni wsparcia.
Czekam na rozkazy. ODBIÓR.
OMEGA:
TU OMEGA. Dane przyjęto. Prowadzić dalszą obserwację. Nie otwierać ognia. ODBIÓR.</pre></div>
  <div class="q-mb-md"><b>SYTUACJA 3: Kontakt Ogniowy (Meldunek SALTR)</b><br>
  <pre class="q-mt-sm">ALFA-01: (Krzyczy, ale wyraźnie)
KONTAKT! KONTAKT! TU ALFA-01! Kontakt ogniowy z prawej flanki!
OMEGA:
TU OMEGA. Podaj raport SALTR. ODBIÓR.
ALFA-01:
TU ALFA-01. Raport SALTR.
Size: Drużyna piechoty, około dziesięciu ludzi.
Activity: Ostrzał z broni maszynowej, próba oskrzydlenia.
Location: Droga leśna, 500 metrów od punktu startu.
Time: Teraz.
Reaction: Związano walką, wycofujemy się na południe. Mamy jednego rannego. Potrzebne wsparcie! ODBIÓR.
OMEGA:
TU OMEGA. Zrozumiano. Wsparcie w drodze. Przygotuj MEDEVAC. ODBIÓR.</pre></div>
  <div class="q-mb-md"><b>SYTUACJA 4: Procedura MEDEVAC</b><br>
  <pre class="q-mt-sm">ALFA-01:
MEDEVAC, MEDEVAC, MEDEVAC. TU ALFA-01. ODBIÓR.
OMEGA:
TU OMEGA. Gotów do przyjęcia MEDEVAC. ODBIÓR.
ALFA-01:
TU ALFA-01. Przekazuję wniosek.
Linia 1: 34-95-22-10. (Czytane: Trzy-cztery, dziewięć-pięć, dwa-dwa, jeden-zero)
Linia 2: 45.500, ALFA-01. (Czytane: Czterdzieści pięć, pięćset)
Linia 3: A - Jeden. (Jeden pilny)
Linia 4: A. (Brak sprzętu spec.)
Linia 5: L - Jeden. (Jeden leżący)
Linia 6: E. (Wróg w rejonie)
Linia 7: C. (Dym)
Linia 8: A. (Własny)
Linia 9: Brak skażeń.
ODBIÓR.
  OMEGA:
  TU OMEGA. Potwierdzam. Jeden pilny, leżący. Zagrożenie w rejonie. Śmigłowiec w drodze. Czas dolotu: dziesięć minut. ODBIÓR.</pre></div>
  <div class="q-mb-md"><b>SYTUACJA 5: Użycie Okólnika (Przegrupowanie)</b><br>
  <pre class="q-mt-sm">OMEGA:
MALWA, MALWA... TU... OMEGA...
Rozkaz dla wszystkich stacji.
Przerwać zadanie. Powrót do bazy natychmiast.
  Wykonać. ODBIÓR.</pre></div>
</q-expansion-item>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
</script>

<style scoped>
.modern-bg {
  background: #F5F5F5;
  min-height: 100vh;
}
.container {
  max-width: 900px;
  margin: 0 auto;
}
.modern-hero-section {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  border: 1px solid #e0e0e0;
}
pre {
  background: #f7f7f7;
  border-radius: 8px;
  padding: 12px;
  font-size: 0.98em;
  white-space: pre-wrap;
  margin-bottom: 0;
}
</style>
