<template>
  <q-page class="q-pa-md">
    <BackNav :showBack="true" />
    <div class="text-h4 text-weight-bold q-mb-md">Pakowanie plecaka</div>
    <div class="text-subtitle1 text-grey-7 q-mb-lg">Praktyczne wskazówki dotyczące organizacji ekwipunku</div>
    <q-img
      :src="backpackImg"
      alt="Ilustracja pakowania plecaka"
      class="q-mb-lg"
      style="max-width: 400px; margin: 0 auto; display: block; border-radius: 12px;"
      fit="contain"
    />
    <q-card class="q-mb-lg">
      <q-card-section>
        <h5>Jak efektywnie spakować plecak?</h5>
        <ul>
          <li>Cięższe przedmioty umieszczaj bliżej pleców i na środku wysokości plecaka.</li>
          <li>Rzeczy najpotrzebniejsze (np. kurtka przeciwdeszczowa, racje żywnościowe) pakuj na wierzchu lub w łatwo dostępnych kieszeniach.</li>
          <li>Używaj worków strunowych lub wodoodpornych do ochrony elektroniki i dokumentów.</li>
          <li>Unikaj luzem wrzuconych drobiazgów – korzystaj z organizerów lub małych torebek.</li>
          <li>Nie przeciążaj plecaka – optymalna waga to ok. 1/3 masy ciała.</li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import backpackImg from 'assets/boot/backapack.jpg'
</script>

<style scoped>
</style>
