<template>
  <q-page class="q-pa-md abc-bg">
    <BackNav />
    <div class="text-h4 text-grey-3 text-weight-bold q-mb-md">KTS</div>
    <div class="text-subtitle1 text-grey-3 text-grey-7 q-mb-lg">Instrukcja odbioru i potwierdzenia KTS</div>
    <q-card class="abc-card q-mb-lg">
      <q-card-section>
        <div class="text-body1 text-military-secondary">
          <b>Zadbaj o bezpieczeństwo informacji:</b>
          <ul class="q-mt-sm q-mb-none q-pl-md">
            <li>Zadbaj o to, żeby znać kryptonimy i hasła.</li>
            <li>Używaj jedynie drogi służbowej.</li>
            <li>Nie udostępniaj danych nigdzie poza uprawnionymi kanałami.</li>
            <li>Nie pisz o nich na komunikatorach, SMS, itp.</li>
          </ul>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="abc-card q-mt-lg">
      <q-card-section>
        <div class="text-h6 text-weight-bold">Instrukcja KTS</div>
        <ol class="q-mt-md q-mb-none q-pl-md">
          <li>Odbierz połączenie.</li>
          <li>We wskazanym momencie wpisz na klawiaturze <b>dwa pierwsze znaki kodu</b>.</li>
          <li>Odsłuchaj wiadomości.</li>
          <li>Potwierdź odebranie komunikatu wpisując <b>dwa ostatnie znaki kodu</b>.</li>
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
  background: #f7f7f9;
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
@media (prefers-color-scheme: dark) {
  .abc-bg {
    background: #232b23;
  }
  .abc-card {
    background: #232b23;
    color: #f5f7fa;
  }
}
</style>
