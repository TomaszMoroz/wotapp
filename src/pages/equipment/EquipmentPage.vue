<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-md">🎖️ Wyposażenie</div>

    <div class="row q-gutter-md">
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="text-h6">Inwentarz osobisty</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list>
              <q-expansion-item
                expand-separator
                icon="checkroom"
                label="Mundur i umundurowanie"
                caption="Stan: Kompletne"
              >
                <q-card>
                  <q-card-section>
                    <div class="row q-gutter-md">
                      <div class="col-12 col-md-6">
                        <q-list dense>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Mundur polowy (x2)</q-item-label>
                              <q-item-label caption>Stan: Bardzo dobry</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Mundur wyjściowy</q-item-label>
                              <q-item-label caption>Stan: Dobry</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Buty wojskowe (x2)</q-item-label>
                              <q-item-label caption>Stan: Dobry</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-list dense>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Czapka wojskowa</q-item-label>
                              <q-item-label caption>Stan: Bardzo dobry</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Pasek wojskowy</q-item-label>
                              <q-item-label caption>Stan: Dobry</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="warning" color="orange" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Kurtka zimowa</q-item-label>
                              <q-item-label caption>Do wymiany</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="security"
                label="Sprzęt ochronny"
                caption="Stan: W normie"
              >
                <q-card>
                  <q-card-section>
                    <div class="row q-gutter-md">
                      <div class="col-12 col-md-6">
                        <q-list dense>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Hełm kevlarowy</q-item-label>
                              <q-item-label caption>Model: PASGT</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Kamizelka kuloodporna</q-item-label>
                              <q-item-label caption>Klasa IIIA</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-list dense>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Okulary ochronne</q-item-label>
                              <q-item-label caption>Do strzelnicy</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Ochronniki słuchu</q-item-label>
                              <q-item-label caption>Elektroniczne</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="build"
                label="Sprzęt techniczny"
                caption="Stan: Sprawny"
              >
                <q-card>
                  <q-card-section>
                    <div class="row q-gutter-md">
                      <div class="col-12 col-md-6">
                        <q-list dense>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Radio przenośne</q-item-label>
                              <q-item-label caption>Model: Motorola</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Latarka taktyczna</q-item-label>
                              <q-item-label caption>LED, 1000 lm</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-list dense>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>GPS nawigacja</q-item-label>
                              <q-item-label caption>Garmin eTrex</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section avatar>
                              <q-icon name="error" color="negative" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Noktowizor</q-item-label>
                              <q-item-label caption>W naprawie</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Status wyposażenia</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="text-center">
              <q-circular-progress
                :value="0.85"
                size="100px"
                :thickness="0.2"
                color="positive"
                track-color="grey-3"
                class="q-ma-md"
              >
                <div class="text-h6">85%</div>
              </q-circular-progress>
              <div class="text-subtitle2">Kompletność wyposażenia</div>
            </div>

            <q-separator class="q-my-md" />

            <div class="row items-center q-mb-sm">
              <q-icon name="check_circle" color="positive" size="sm" class="q-mr-sm" />
              <span class="text-body2">18 pozycji sprawnych</span>
            </div>
            <div class="row items-center q-mb-sm">
              <q-icon name="warning" color="orange" size="sm" class="q-mr-sm" />
              <span class="text-body2">2 do wymiany</span>
            </div>
            <div class="row items-center">
              <q-icon name="error" color="negative" size="sm" class="q-mr-sm" />
              <span class="text-body2">1 w naprawie</span>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Najbliższe przeglądy</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list dense>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="event" color="orange" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Kamizelka kuloodporna</q-item-label>
                  <q-item-label caption>15 grudnia 2025</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="event" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Sprzęt łączności</q-item-label>
                  <q-item-label caption>20 stycznia 2026</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-card>
          <q-card-section>
            <div class="text-h6">Szybkie akcje</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-btn
              color="primary"
              icon="add"
              label="Zgłoś usterkę"
              class="full-width q-mb-sm"
              outline
            />
            <q-btn
              color="secondary"
              icon="assignment"
              label="Wniosek o wymianę"
              class="full-width q-mb-sm"
              outline
            />
            <q-btn
              color="accent"
              icon="inventory"
              label="Pełna inwentaryzacja"
              class="full-width"
              outline
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'EquipmentPage'
})
</script>
