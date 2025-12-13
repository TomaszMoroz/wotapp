<template>
  <q-page class="q-pa-md modern-bg">
    <div class="fit-container">
      <div class="backnav-left-wrap"><BackNav color="black"/></div>
      <q-card class="main-card q-pa-xl q-mb-xl">
        <q-card-section class="q-pb-none">
          <div class="text-h4 text-weight-bold q-mb-xs flex items-center">
            <q-icon name="fitness_center" color="primary" size="2.2rem" class="q-mr-md" />
            Znaczenie Sprawności Fizycznej w WOT
          </div>
          <div class="text-subtitle1 text-grey-7 q-mb-md">Sprawność fizyczna to nie jest dodatek do służby w Wojskach Obrony Terytorialnej – to jej fundament, zwłaszcza w formacjach lekkiej piechoty. Jako żołnierz WOT, Twoje zadania często wymagają długotrwałego wysiłku fizycznego, dalekiego od warunków biurowych. Wysoka kondycja to gwarancja skuteczności, bezpieczeństwa i gotowości bojowej.</div>
        </q-card-section>
      </q-card>
      <div class="q-gutter-md">
        <q-card class="section-card">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-sm"><q-icon name="directions_walk" color="primary" class="q-mr-sm"/>1. Specyfika Lekkiej Piechoty</div>
            <q-list dense>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Długie marsze i patrole:</b> Często z pełnym ekwipunkiem, który waży kilkanaście, a nawet ponad dwadzieścia kilogramów. Wytrzymałość tlenowa (kondycja) jest kluczowa, by utrzymać tempo i nie osłabić pododdziału.</q-item-section></q-item>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Działania rozproszone i długotrwałe:</b> Żołnierze muszą być w stanie działać samodzielnie przez długi czas, bez natychmiastowego wsparcia. Musisz być w stanie samemu poradzić sobie z transportem sprzętu czy ewakuacją rannego.</q-item-section></q-item>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Szybkość reakcji:</b> Błyskawiczne przejście z bezruchu do maksymalnego wysiłku (np. sprint do osłony) wymaga siły eksplozywnej i szybkości.</q-item-section></q-item>
            </q-list>
          </q-card-section>
        </q-card>
        <q-card class="section-card">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-sm"><q-icon name="bolt" color="primary" class="q-mr-sm"/>2. Sprawność = Bezpieczeństwo i Skuteczność</div>
            <div class="text-subtitle2 text-weight-bold q-mb-xs">A. Dynamika i Szybkość Ruchu (Przewaga Taktyczna)</div>
            <q-list dense>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Zajęcie stanowiska ogniowego:</b> Musisz być w stanie błyskawicznie przemieścić się do osłony, by uniknąć ognia przeciwnika lub zająć pozycję strzelecką w kluczowym momencie. Obejmuje to nie tylko sprint, ale także szybkie pokonywanie przeszkód terenowych (np. murów, rowów) i dynamiczną zmianę postawy.</q-item-section></q-item>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Reakcja na kontakt:</b> W przypadku kontaktu z przeciwnikiem, zdolność do dynamicznego oderwania się lub natychmiastowego ataku w zdefiniowanym kierunku zależy od Twojej szybkości reakcji i mocy mięśniowej.</q-item-section></q-item>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Tempo przemieszczenia:</b> Szybkie przemieszczanie się pomiędzy kolejnymi pozycjami (tzw. skoki taktyczne) pozwala na utrzymanie inicjatywy i dezorientację przeciwnika. Wyszkolony żołnierz to taki, który potrafi utrzymać ten wysiłek bez natychmiastowego spadku wydolności.</q-item-section></q-item>
            </q-list>
            <div class="text-subtitle2 text-weight-bold q-mt-md q-mb-xs">B. Zdolność do Walki i Oporu (Siła)</div>
            <q-list dense>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Dźwiganie i przenoszenie:</b> Karabin, kamizelka, hełm, amunicja, woda, apteczka – to wszystko musisz nieść i obsługiwać.</q-item-section></q-item>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Przyjmowanie pozycji bojowych:</b> Szybkie przejście do postawy leżącej, czołganie się, pokonywanie przeszkód terenowych – wymaga siły mięśniowej i gibkości.</q-item-section></q-item>
            </q-list>
            <div class="text-subtitle2 text-weight-bold q-mt-md q-mb-xs">C. Gotowość do Długotrwałego Wysiłku (Wytrzymałość)</div>
            <q-list dense>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Marsze taktyczne:</b> Żołnierz musi utrzymać wysokie tempo marszu przez wiele godzin, często w nocy lub w trudnych warunkach pogodowych. Wytrzymałość tlenowa pozwala na zachowanie ostrości umysłu i precyzji działania, nawet po wyczerpującym wysiłku fizycznym.</q-item-section></q-item>
            </q-list>
            <div class="text-subtitle2 text-weight-bold q-mt-md q-mb-xs">D. Odporność Psychiczna i Fizyczna</div>
            <q-list dense>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Regeneracja:</b> Lepsza kondycja fizyczna przekłada się na szybszą regenerację po intensywnym wysiłku. Mniej zmęczony żołnierz to żołnierz, który szybciej odzyskuje gotowość bojową.</q-item-section></q-item>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Minimalizacja kontuzji:</b> Wzmocnione mięśnie i stawy to mniejsze ryzyko urazów podczas nagłych, intensywnych ruchów czy przenoszenia ciężarów.</q-item-section></q-item>
              <q-item v-ripple class="fit-list-item"><q-item-section><b>Radzenie sobie ze stresem:</b> Wysiłek fizyczny zwiększa odporność na stres i pozwala lepiej panować nad emocjami i podejmować racjonalne decyzje pod presją.</q-item-section></q-item>
            </q-list>
          </q-card-section>
        </q-card>
        <q-card class="section-card">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-sm"><q-icon name="check_circle" color="primary" class="q-mr-sm"/>3. Weryfikacja Sprawności</div>
            <div class="q-mb-sm">Pamiętaj, że Twoja sprawność fizyczna jest weryfikowana podczas <b>Testu Sprawności Fizycznej</b>, a codzienna służba wymaga utrzymania jej na wymaganym poziomie.</div>
            <div>Nie traktuj treningu jako obowiązku, ale jako kluczowy element wyposażenia, bez którego Twoja służba jako żołnierz lekkiej piechoty nie będzie w pełni skuteczna.</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
</script>

<style scoped>
.backnav-left-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
}
.fit-container {
  max-width: 900px;
  margin: 0 auto;
}
.main-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(15,44,5,0.10);
}
.section-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.fit-list-item {
  font-size: 1.08rem;
  padding-left: 0.2rem;
}
@media (max-width: 600px) {
  .main-card {
    padding: 1.2rem !important;
  }
  .section-card {
    padding: 0.7rem !important;
  }
  .text-h4 {
    font-size: 1.2rem;
  }
  .text-h6 {
    font-size: 1.01rem;
  }
  .fit-list-item {
    font-size: 0.98rem;
  }
}
</style>
