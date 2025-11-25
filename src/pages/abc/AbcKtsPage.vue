<template>
  <q-page class="q-pa-md abc-bg">
    <BackNav color="black"/>
    <div class="text-h4 text-weight-bold text-grey-10 q-mb-md">KTS</div>
    <div class="text-subtitle1 text-grey-8 q-mb-lg">Instrukcja odbioru i potwierdzenia KTS</div>
    <q-card class="abc-card q-mb-lg">
      <q-card-section>
        <div class="text-body1 text-grey-10 q-mb-sm">
          <b>Zasady bezpieczeństwa informacji</b>
        </div>
        <ul class="q-mb-none q-pl-md text-grey-8">
          <li>Zadbaj o znajomość kryptonimów i haseł.</li>
          <li>Korzystaj wyłącznie z drogi służbowej.</li>
          <li>Nie udostępniaj danych o komunikatach.</li>
          <li>Nie pisz o nich na komunikatorach, SMS itp.</li>
        </ul>
      </q-card-section>
    </q-card>
    <q-card class="abc-card q-mt-lg">
      <q-card-section>
        <div class="text-h6 text-weight-bold text-grey-10 q-mb-md">Instrukcja KTS – krok po kroku</div>
        <div class="q-mb-sm text-grey-8">Przebieg odbioru i potwierdzenia komunikatu:</div>
        <ol class="q-mt-none q-mb-none q-pl-md text-grey-10" style="font-size:1.1em;">
          <li class="q-mb-sm"><b>Odbierz połączenie.</b></li>
          <li class="q-mb-sm">We wskazanym momencie wpisz na klawiaturze <b>dwa pierwsze znaki kodu</b>.</li>
          <li class="q-mb-sm">Odsłuchaj wiadomości.</li>
          <li class="q-mb-sm">Potwierdź odebranie komunikatu wpisując <b>dwa ostatnie znaki kodu</b>.</li>
        </ol>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
</script>

<style scoped>
.abc-bg {
  background: #efefef;
  min-height: 100vh;
}
.abc-card {
  border-radius: 16px;
  transition: box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  background: #fff;
  color: #232b23;
  width: 100%;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}
.abc-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.13);
}
</style>
