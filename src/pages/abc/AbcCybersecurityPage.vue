<template>
  <q-page class="q-pa-md">
    <BackNav color="black" parentPath="/abc"/>
    <div class="text-h4 text-weight-bold q-mb-md">Bezpieczeństwo w sieci</div>
    <div class="text-subtitle1 text-grey-7 q-mb-lg">Podstawy cyberbezpieczeństwa dla żołnierza WOT</div>
    <q-card class="q-mb-lg">
      <q-card-section>
        <h5>I. Komunikatory i Media Społecznościowe: Mniej Znaczy Bezpieczniej</h5>
        <ol>
          <li>
            <strong>Zero Stopni i Anonimowość</strong>
            <p>W komunikacji internetowej (prywatne czaty, grupy, fora):</p>
            <ul>
              <li><strong>Nie Używaj Stopni:</strong> W cyfrowym świecie nie używaj swojego stopnia wojskowego, a tym bardziej stopnia przełożonego. Używanie tytulatury ułatwia profilowanie Twojej osoby, identyfikację Twoich kontaktów oraz ustalenie hierarchii dowodzenia.</li>
              <li><strong>Anonimizacja:</strong> Używaj pseudonimów (nicków), a profile w mediach społecznościowych, jeśli muszą istnieć, powinny być maksymalnie anonimowe i prywatne.</li>
            </ul>
          </li>
          <li>
            <strong>Ograniczaj Wymianę Treści o Dużej Wadze</strong>
            <ul>
              <li><strong>Zero Merytoryki:</strong> Unikaj dyskusji na temat lokalizacji jednostek, planowanych działań, szczegółów sprzętu, stanów osobowych, czy wewnętrznych procedur.</li>
              <li><strong>Ryzyko Przechwycenia:</strong> Załóż, że każda wiadomość, nawet wysłana w pozornie bezpiecznym komunikatorze, może zostać przechwycona, odczytana lub wydobyta w późniejszym czasie.</li>
            </ul>
          </li>
        </ol>
        <h5 class="q-mt-lg">II. Zakaz Udostępniania Materiałów Wrażliwych</h5>
        <ul>
          <li><strong>Brak Zdjęć i Filmów podczas Zadań:</strong> Robienie zdjęć, a tym bardziej nagrywanie filmów w trakcie zadań służbowych, szkoleń poligonowych, konwojów czy działań operacyjnych jest surowo zakazane. Sprzęt wojskowy, oznaczenia taktyczne, infrastruktura oraz twarze kolegów to wrażliwe dane rozpoznawcze.</li>
          <li><strong>Zero Publikacji:</strong> Absolutny zakaz publikowania jakichkolwiek materiałów związanych ze służbą w Internecie, mediach społecznościowych (Facebook, Instagram, TikTok) lub na otwartych platformach.</li>
          <li><strong>Geotagging:</strong> Pamiętaj, że nowoczesne telefony automatycznie zapisują geotagi (dokładną lokalizację) w metadanych zdjęć. Publikacja zdjęcia może zdradzić dokładne współrzędne Twojej bazy, miejsca postoju lub szlak komunikacyjny.</li>
        </ul>
        <h5 class="q-mt-lg">III. Znaczenie Anonimizacji i Wywiad Obcych Służb</h5>
        <ul>
          <li><strong>Łączenie Faktów:</strong> Pojedyncze zdjęcie jest niczym. Ale zestaw zdjęć (np. z trzech różnych poligonów), opatrzone Twoją twarzą (lub Twoich kolegów), ze wzmiankami o stopniu (w komentarzach), pozwala obcym służbom zbudować profil jednostki, określić jej zdolności, miejsca dyslokacji, a nawet zidentyfikować kluczowych dowódców.</li>
          <li><strong>Cel Anonomizacji:</strong> Chroniąc własną tożsamość i dane o jednostce, chronisz misję i życie swoich kolegów na wypadek konfliktu. Anonimowość to Twoja pierwsza linia obrony w przestrzeni cyfrowej.</li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
</script>

<style scoped>
</style>
