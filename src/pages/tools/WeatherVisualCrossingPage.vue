<template>
  <q-page class="q-pa-md" style="max-width: 800px; margin: auto;">
    <BackNav color="black" parentPath="/tools" />
    <div class="text-h5 text-weight-bold q-mb-md">Pogoda (Visual Crossing)</div>
    <div class="text-subtitle2 q-mb-lg">Prognoza i historia pogody dla wybranego obszaru (do 15 dni w przód, 7+ dni wstecz)</div>
    <q-card class="q-pa-md">
      <q-card-section>
        <q-input v-model="area" label="Podaj lokalizację (np. miasto)" filled class="q-mb-md" />
        <q-input
          label="Wybierz datę"
          v-model="dateRange.from"
          readonly
          filled
          class="q-mb-md"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer" @click.stop="showDateFrom = true" />
          </template>
          <q-menu v-model="showDateFrom" anchor="bottom left" self="top left">
            <q-date
              v-model="dateRange.from"
              mask="YYYY-MM-DD"
              :options="isValidWeatherDate"
              @update:model-value="showDateFrom = false"
            />
          </q-menu>
        </q-input>
        <q-btn
          :loading="loadingWeather"
          label="Pobierz dane Visual Crossing"
          color="primary"
          @click="fetchWeatherData"
          class="q-mb-md"
        />
      </q-card-section>
      <q-card-section v-if="weatherData">
        <q-list bordered class="weather-list q-mb-md">
          <q-item-label header>Prognoza / Historia pogody</q-item-label>
          <q-item v-for="(data, index) in weatherData.days" :key="index">
            <q-item-section>
              <div class="column q-gutter-y-sm q-mb-md">
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Data:</div>
                  <div>{{ data.datetime }}</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Warunki:</div>
                  <div>{{ data.conditions }}</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Maks. temp:</div>
                  <div>{{ data.tempmax }}°C</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Min. temp:</div>
                  <div>{{ data.tempmin }}°C</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Odczuwalna temp.:</div>
                  <div>{{ data.feelslike }}°C</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Wilgotność:</div>
                  <div>{{ data.humidity }}%</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Ciśnienie:</div>
                  <div>{{ data.pressure }} hPa</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Punkt rosy:</div>
                  <div>{{ data.dew }}°C</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Zachmurzenie:</div>
                  <div>{{ data.cloudcover }}%</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Widzialność:</div>
                  <div>{{ data.visibility }} km</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">UV:</div>
                  <div>{{ data.uvindex }}</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Opady:</div>
                  <div>{{ data.precip }} mm</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Śnieg:</div>
                  <div>{{ data.snow }} mm</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Pokrywa śnieżna:</div>
                  <div>{{ data.snowdepth }} cm</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Wiatr:</div>
                  <div>{{ data.windspeed }} km/h ({{ data.winddir }}°)</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Promieniowanie słoneczne:</div>
                  <div>{{ data.solarradiation }} W/m²</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Wschód słońca:</div>
                  <div>{{ data.sunrise }}</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Zachód słońca:</div>
                  <div>{{ data.sunset }}</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Faza księżyca:</div>
                  <div>{{ data.moonphase }}</div>
                </div>
                <div v-if="data.moonrise" class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Wschód księżyca:</div>
                  <div>{{ data.moonrise }}</div>
                </div>
                <div v-if="data.moonset" class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Zachód księżyca:</div>
                  <div>{{ data.moonset }}</div>
                </div>
                <div v-if="data.severerisk !== undefined && data.severerisk !== null" class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Ryzyko ekstremalnych zjawisk:</div>
                  <div>{{ formatSevereRisk(data.severerisk) }}</div>
                </div>
                <q-btn
                  dense
                  flat
                  color="primary"
                  @click="toggleHourlyData(index)"
                  class="q-mt-md"
                >
                  {{ showHourly[index] ? 'Ukryj dane godzinowe' : 'Pokaż dane godzinowe' }}
                </q-btn>
                <q-slide-transition>
                  <div v-if="showHourly[index]" class="q-mt-md">
                    <div class="column q-gutter-y-sm">
                      <div v-for="(hour, hourIndex) in data.hours" :key="hourIndex">
                        <q-card flat bordered class="q-pa-sm q-mb-sm" style="background:#f7f8fa;">
                          <div class="row items-center q-gutter-x-md">
                            <div class="text-weight-bold">{{ hour.datetime }}</div>
                            <div>{{ hour.temp }}°C</div>
                            <div>Odczuwalna: {{ hour.feelslike }}°C</div>
                            <div>{{ hour.conditions }}</div>
                            <div>Wiatr: {{ hour.windspeed }} km/h</div>
                            <div>Kierunek: {{ hour.winddir }}°</div>
                            <div>Wilg.: {{ hour.humidity }}%</div>
                          </div>
                        </q-card>
                      </div>
                    </div>
                  </div>
                </q-slide-transition>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar, date } from 'quasar'
import axios from 'axios'
import BackNav from 'components/BackNav.vue'

const $q = useQuasar()
const today = date.formatDate(Date.now(), 'YYYY-MM-DD')
const area = ref('')
const weatherData = ref(null)
const loadingWeather = ref(false)
const showHourly = ref([])
const dateRange = reactive({ from: today })
const showDateFrom = ref(false)

const VC_API_KEY = 'MWXSN4NYNQBKTY7PWCA5XR5TJ'

const fetchWeatherData = async () => {
  if (!area.value) {
    $q.notify({ type: 'negative', message: 'Podaj lokalizację.' })
    return
  }
  loadingWeather.value = true
  try {
    const query = encodeURIComponent(area.value.trim())
    const dateStr = dateRange.from
    // Visual Crossing pozwala na zakresy, ale tu pobieramy 1 dzień (można rozwinąć na zakres)
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}/${dateStr}?unitGroup=metric&key=${VC_API_KEY}&lang=pl&include=hours`
    const response = await axios.get(url)
    weatherData.value = response.data
    showHourly.value = Array(weatherData.value.days?.length || 1).fill(false)
  } catch (error) {
    console.error('Błąd pobierania pogody:', error)
    $q.notify({ type: 'negative', message: 'Nie udało się pobrać danych Visual Crossing.' })
  } finally {
    loadingWeather.value = false
  }
}

const toggleHourlyData = (index) => {
  showHourly.value[index] = !showHourly.value[index]
}

const isValidWeatherDate = dateObj => {
  let picked
  if (typeof dateObj === 'string') {
    picked = date.extractDate(dateObj.replace(/\//g, '-'), 'YYYY-MM-DD')
  } else {
    picked = dateObj
  }
  const todayDate = date.extractDate(today, 'YYYY-MM-DD')
  const diff = date.getDateDiff(picked, todayDate, 'days')
  // Visual Crossing: historia i prognoza do 15 dni w przód, 7+ dni wstecz (darmowy plan)
  return diff >= -7 && diff <= 15
}

function formatSevereRisk (val) {
  // Visual Crossing: 10 = brak ryzyka, 0 = najwyższe ryzyko
  if (val === 10) return 'Brak ryzyka'
  if (val === 9) return 'Bardzo niskie'
  if (val === 8) return 'Niskie'
  if (val === 7) return 'Umiarkowane'
  if (val === 6) return 'Podwyższone'
  if (val === 5) return 'Wysokie'
  if (val <= 4) return 'Bardzo wysokie'
  return val
}
</script>

<style scoped>
.text-h5 {
  color: var(--military-primary, #2D3E2F);
}
.weather-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
