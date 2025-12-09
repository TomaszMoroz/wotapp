<template>
  <q-page class="q-pa-md" style="max-width: 800px; margin: auto;">
    <BackNav color="black" parentPath="/tools" />
    <div class="text-h5 text-weight-bold q-mb-md">Pogoda</div>
    <div class="text-subtitle2 q-mb-lg">Prognoza pogody dla wybranego obszaru</div>
    <q-card class="q-pa-md">
      <q-card-section>
        <q-input v-model="area" label="Podaj lokalizację (np. miasto)" filled class="q-mb-md" />
        <q-input
          label="Wybierz datę początkową"
          v-model="dateRange.from"
          @click="showDateFrom = !showDateFrom"
          filled
          class="q-mb-md"
        >
          <template v-slot:append>
            <q-icon name="event" />
          </template>
        </q-input>
        <q-date
          v-if="showDateFrom"
          v-model="dateRange.from"
          mask="YYYY-MM-DD"
          @update:model-value="showDateFrom = !showDateFrom"
        />
        <q-input
          label="Wybierz datę końcową"
          v-model="dateRange.to"
          @click="showDateTo = !showDateTo"
          filled
          class="q-mb-md"
        >
          <template v-slot:append>
            <q-icon name="event" />
          </template>
        </q-input>
        <q-date
          v-if="showDateTo"
          v-model="dateRange.to"
          mask="YYYY-MM-DD"
          @update:model-value="showDateTo = !showDateTo"
        />
        <q-btn
          :loading="loadingWeather"
          label="Pobierz prognozę pogody"
          color="primary"
          @click="fetchWeatherData"
          class="q-mb-md"
        />
      </q-card-section>
      <q-card-section v-if="weatherData">
        <q-list bordered class="weather-list q-mb-md">
          <q-item-label header>Prognoza pogody</q-item-label>
          <q-item v-for="(data, index) in weatherData.forecast.forecastday" :key="index">
            <q-item-section>
              <div class="column q-gutter-y-sm q-mb-md">
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Data:</div>
                  <div>{{ data.date }}</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Warunki:</div>
                  <div>{{ data.day.condition.text }}</div>
                  <img v-if="data.day.condition.icon" :src="fixIconUrl(data.day.condition.icon)" alt="icon" style="width:32px;height:32px;vertical-align:middle;" />
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Maks. temp:</div>
                  <div>{{ data.day.maxtemp_c }}°C</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Min. temp:</div>
                  <div>{{ data.day.mintemp_c }}°C</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Wilgotność:</div>
                  <div>{{ data.day.avghumidity }}%</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">UV:</div>
                  <div>{{ data.day.uv }}</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Punkt rosy:</div>
                  <div>{{ data.hour && data.hour.length ? data.hour[0].dewpoint_c + '°C' : '-' }}</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Czy będzie padać:</div>
                  <div>{{ data.day.daily_will_it_rain ? 'Tak' : 'Nie' }} ({{ data.day.daily_chance_of_rain }}%)</div>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <div class="text-weight-bold">Czy będzie śnieżyć:</div>
                  <div>{{ data.day.daily_will_it_snow ? 'Tak' : 'Nie' }} ({{ data.day.daily_chance_of_snow }}%)</div>
                </div>
                <div class="q-mt-sm">
                  <div class="text-weight-bold">Dane astronomiczne:</div>
                  <div>Wschód słońca: {{ data.astro.sunrise }}</div>
                  <div>Zachód słońca: {{ data.astro.sunset }}</div>
                  <div>Wschód księżyca: {{ data.astro.moonrise }}</div>
                  <div>Zachód księżyca: {{ data.astro.moonset }}</div>
                  <div>Faza księżyca: {{ data.astro.moon_phase }}</div>
                  <div>Oświetlenie księżyca: {{ data.astro.moon_illumination }}%</div>
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
                      <div v-for="(hour, hourIndex) in data.hour" :key="hourIndex">
                        <q-card flat bordered class="q-pa-sm q-mb-sm" style="background:#f7f8fa;">
                          <div class="row items-center q-gutter-x-md">
                            <div class="text-weight-bold">{{ hour.time.split(' ')[1] }}</div>
                            <div>{{ hour.temp_c }}°C</div>
                            <div>Odczuwalna: {{ hour.feelslike_c }}°C</div>
                            <div>{{ hour.condition.text }}</div>
                            <div>Wiatr: {{ hour.wind_kph }} km/h</div>
                            <div>Kierunek: {{ hour.wind_dir }}</div>
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
const dateRange = reactive({ from: today, to: '' })
const showDateFrom = ref(false)
const showDateTo = ref(false)

const WEATHER_API_KEY = '0446e39ac5e64d6697684411252001'

const fetchWeatherData = async () => {
  if (!area.value) {
    $q.notify({ type: 'negative', message: 'Podaj lokalizację.' })
    return
  }
  loadingWeather.value = true
  try {
    const params = {
      key: WEATHER_API_KEY,
      q: area.value,
      days: calculateDays(dateRange.from, dateRange.to),
      lang: 'pl'
    }
    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', { params })
    weatherData.value = response.data
    showHourly.value = Array(weatherData.value.forecast.forecastday.length).fill(false)
  } catch (error) {
    console.error('Błąd pobierania pogody:', error)
    $q.notify({ type: 'negative', message: 'Nie udało się pobrać danych pogodowych.' })
  } finally {
    loadingWeather.value = false
  }
}

function fixIconUrl (url) {
  if (url && url.startsWith('//')) {
    return 'https:' + url
  }
  return url
}

const calculateDays = (start, end) => {
  if (!end) return 1
  const diffDays = Math.abs(date.getDateDiff(start, end, 'days'))
  return diffDays > 10 ? 10 : diffDays === 0 ? 1 : diffDays
}

const toggleHourlyData = (index) => {
  showHourly.value[index] = !showHourly.value[index]
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
