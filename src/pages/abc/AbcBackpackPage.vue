<template>
  <q-page class="q-pa-md">
    <BackNav :showBack="true" color="black"/>
    <div class="text-h4 text-weight-bold q-mb-md">Pakowanie plecaka</div>
    <div class="text-subtitle1 text-grey-7 q-mb-lg">Praktyczne wskazówki dotyczące organizacji ekwipunku</div>
    <div class="q-gutter-lg q-mb-lg row items-start flex-wrap" style="flex-direction: column;" :class="{'flex-row': $q.screen.gt.sm, 'flex-column': !$q.screen.gt.sm}">
      <q-img
        :src="backpackImg"
        alt="Ilustracja pakowania plecaka"
        style="max-width: 400px; border-radius: 12px; flex-shrink: 0;"
        class="q-mb-md q-mr-lg"
        fit="contain"
      />
      <q-card class="q-mb-none" style="flex:1; min-width: 250px;">
        <q-card-section>
          <h5>Jak efektywnie spakować plecak?</h5>
          <ul>
            <li>Cięższe przedmioty umieszczaj bliżej pleców i na środku wysokości plecaka.</li>
            <li>Rzeczy najpotrzebniejsze (np. kurtka przeciwdeszczowa, racje żywnościowe) pakuj na wierzchu lub w łatwo dostępnych kieszeniach.</li>
            <li>Używaj worków strunowych lub wodoodpornych do ochrony elektroniki i dokumentów.</li>
            <li>Unikaj luzem wrzuconych drobiazgów – korzystaj z organizerów lub małych torebek.</li>
            <li>Nie przeciążaj plecaka</li>
          </ul>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { useQuasar } from 'quasar'
import backpackImg from 'assets/boot/backpack.jpg'
const $q = useQuasar()
</script>

<style scoped>
.flex-row {
  flex-direction: row !important;
}
.flex-column {
  flex-direction: column !important;
}
</style>
