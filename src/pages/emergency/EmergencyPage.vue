<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-md">🚨 Procedury Awaryjne</div>

    <div class="row q-gutter-md">
      <div class="col-12">
        <q-banner class="bg-negative text-white q-mb-md">
          <template v-slot:avatar>
            <q-icon name="warning" />
          </template>
          W przypadku zagrożenia natychmiast skontaktuj się z dyżurnym!
          <template v-slot:action>
            <q-btn flat color="white" label="Zadzwoń" icon="phone" />
          </template>
        </q-banner>
      </div>

      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section class="bg-negative text-white">
            <div class="text-h6">Alarm pożarowy</div>
          </q-card-section>
          <q-card-section>
            <q-stepper
              v-model="step"
              vertical
              color="negative"
              animated
            >
              <q-step
                :name="1"
                title="Wykrycie pożaru"
                icon="visibility"
                :done="step > 1"
              >
                Natychmiast uruchom alarm pożarowy i powiadom wszystkich w budynku.
              </q-step>

              <q-step
                :name="2"
                title="Ewakuacja"
                icon="exit_to_app"
                :done="step > 2"
              >
                Kieruj się do najbliższego wyjścia ewakuacyjnego. Nie używaj wind!
              </q-step>

              <q-step
                :name="3"
                title="Zbiórka"
                icon="group"
                :done="step > 3"
              >
                Zgłoś się w wyznaczonym punkcie zbiórki i czekaj na dalsze instrukcje.
              </q-step>
            </q-stepper>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section class="bg-warning text-white">
            <div class="text-h6">Alarmy i sygnały</div>
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="negative" text-color="white">
                    <q-icon name="volume_up" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Alarm pożarowy</q-item-label>
                  <q-item-label caption>Ciągły sygnał dźwiękowy</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-avatar color="orange" text-color="white">
                    <q-icon name="notifications" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Alarm gazowy</q-item-label>
                  <q-item-label caption>Przerywany sygnał</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-avatar color="blue" text-color="white">
                    <q-icon name="security" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Alarm bezpieczeństwa</q-item-label>
                  <q-item-label caption>Podwójny sygnał</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Kontakty awaryjne</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row q-gutter-md">
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="text-center">
                  <q-card-section>
                    <q-icon name="phone" size="2rem" color="negative" />
                    <div class="text-h6 q-mt-sm">112</div>
                    <div class="text-caption">Numer alarmowy</div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="text-center">
                  <q-card-section>
                    <q-icon name="local_fire_department" size="2rem" color="orange" />
                    <div class="text-h6 q-mt-sm">998</div>
                    <div class="text-caption">Straż pożarna</div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="text-center">
                  <q-card-section>
                    <q-icon name="local_police" size="2rem" color="blue" />
                    <div class="text-h6 q-mt-sm">997</div>
                    <div class="text-caption">Policja</div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="text-center">
                  <q-card-section>
                    <q-icon name="medical_services" size="2rem" color="positive" />
                    <div class="text-h6 q-mt-sm">999</div>
                    <div class="text-caption">Pogotowie</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'EmergencyPage'
})

const step = ref(1)
</script>
