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

    <q-card class="q-mb-lg">
      <q-card-section>
        <h5>4. Linie wyposażenia – co i gdzie nosić?</h5>
        <p><strong>Linia 1</strong> to sprzęt przenoszony na sobie w kieszeniach munduru. Wyposażenie które jest potrzebne do przetrwania żołnierzowi w razie wielkiej awarii lub do wykorzystywania na bieżąco podczas wykonywania różnych zadań bojowych czy też obozowych. W kieszeniach munduru żołnierza znajdziesz m.in. krzesiwo, scyzoryk czy awaryjny zestaw przetrwania.</p>
        <p><strong>Linia 2</strong> to wyposażenie przeznaczone do walki. Przenoszone jest w oporządzaniu taktycznym, np. w kamizelce lub szelkach oporządzeniowych.</p>
        <p>W kamizelce taktycznej, jaką nosi żołnierz, znajdują się przede wszystkim magazynki do etatowej broni, granaty i parę innych bardzo przydatnych drobiazgów.</p>
        <p><strong>Linia 3</strong> to sprzęt szturmowy lub sprzęt marszowy, przenoszony w plecaku na „garbie”. Główną różnicą między tymi sprzętami jest pojemność plecaka.</p>
        <p>Gdy żołnierz zabiera sprzęt <strong>MARSZOWY</strong> pakuje go w duży zasobnik piechoty ok. 80-90l. Dlaczego taki duży? Dlatego żeby zawsze mógł coś dorzucić, czy to rgrure i pociski do niej, minę przeciwpancerną, dodatkową wodę, radiostację czy siatkę maskującą. Gdy żołnierz zabiera sprzęt <strong>SZTURMOWY</strong> pakuje się w mniejszy plecak patrolowy około 30 litrowy. Wszystko jest uzależnione od tego: na ile idzie; gdzie idzie i po co idzie. To kilka czynników które decydują jaki sprzęt zabieramy.</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
</script>

<style scoped>
</style>
