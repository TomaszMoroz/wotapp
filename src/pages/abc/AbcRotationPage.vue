<template>
  <q-page class="q-pa-md">
    <BackNav :showBack="true" color="black"/>
    <div class="text-h4 text-weight-bold q-mb-md">Co zabrać na rotację</div>
    <div class="text-subtitle1 text-grey-7 q-mb-lg">Praktyczna lista rzeczy i dokumentów</div>
    <q-card class="q-mb-lg">
      <q-card-section>
        <h5>1. Dokumenty Obowiązkowe <span aria-label="dokumenty" role="img">📄</span></h5>
        <p>Zadbaj o to, by najważniejsze dokumenty były uporządkowane i zabezpieczone (najlepiej w wodoodpornym etui).</p>
        <ul>
          <li><strong>Dokument finansowy:</strong> dokument wskazany przez kancelarię, wypełniony czytelnie i bez skreśleń</li>
          <li><strong>Książeczka wojskowa:</strong> Obowiązkowy dokument identyfikacyjny.</li>
          <li><strong>Karta służbowa / Przepustka:</strong> Upoważniająca do wstępu i poruszania się po jednostce/bazie.</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-lg">
      <q-card-section>
        <h5>2. Regulaminowy mundur i odzież <span aria-label="mundur" role="img">🪖</span></h5>
        <ul>
          <li><strong>Mundur polowy:</strong> zgodny z regulaminem, czysty i kompletny.</li>
          <li><strong>Nakrycie głowy:</strong> beret, czapka polowa lub inne wymagane przez jednostkę.</li>
          <li><strong>Obuwie:</strong> buty wojskowe, wyczyszczone i sprawne.</li>
          <li><strong>Opcjonalnie odzież niereosrtowa na taktykę:</strong> np. bielizna termoaktywna, rękawiczki taktyczne, chusta, combat-shirt, według potrzeb i warunków pogodowych.</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-lg">
      <q-card-section>
        <h5>3. Dostosowanie Sprzętu do Zadania <span aria-label="waga" role="img">⚖️</span></h5>
        <p><strong>Dlaczego mniej znaczy lepiej?</strong></p>
        <p>W wojsku często istnieje tendencja, by brać "wszystko, co może się przydać". Jest to poważny błąd w kontekście lekkiej piechoty i dynamicznych działań:</p>
        <ul>
          <li><strong>Nadmierna waga = Utrata energii:</strong> Ciężki plecak nie tylko spala energię na długich dystansach (marsz), ale też zwiększa zmęczenie podczas nagłych działań (bieg, czołganie się, kopanie). Każdy zbędny kilogram to mniejsze możliwości bojowe.</li>
          <li><strong>Wolniejsza reakcja:</strong> Przeciążenie sprzętem spowalnia szybkie zmiany pozycji i manewrowanie w ograniczonym środowisku.</li>
          <li><strong>Ograniczenia w dostępie:</strong> Zbyt duża ilość sprzętu w II linii może utrudniać dostęp do kluczowych magazynków lub powodować blokowanie ruchów.</li>
        </ul>
        <p><strong>Praktyczna Zasada:</strong> Jeśli Twoje działanie jest zaplanowane na 24 godziny lub krócej, większość wyposażenia z III Linii powinna zostać w pojeździe lub w punkcie zbornym. Bierz tylko to, co jest niezbędne do przetrwania i wykonania misji w danym czasie. Zawsze zadaj sobie pytanie: "Czy jest to absolutnie kluczowe dla misji?" Jeśli odpowiedź brzmi "nie", zostaw to.</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
</script>

<style scoped>
</style>
