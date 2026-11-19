<template>
  <div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-6 col-md-3">
        <q-select v-model="hourFrom" :options="HOURS" label="Godzina od" outlined dense emit-value map-options />
      </div>
      <div class="col-6 col-md-3">
        <q-select v-model="hourTo" :options="HOURS" label="Godzina do" outlined dense emit-value map-options />
      </div>
      <div class="col-6 col-md-3">
        <q-input v-model.number="droneWeight" type="number" min="50" max="25000" label="Masa drona [g]" outlined dense />
      </div>
      <div class="col-6 col-md-3">
        <q-input
          v-model.number="customWind" type="number" min="1" max="30" step="0.5"
          label="Limit wiatru [m/s]" outlined dense clearable
        />
      </div>
    </div>
    <div class="text-caption sig-muted q-mb-md">
      Analiza dla: <b>{{ droneTier.label }}</b> — wiatr {{ fmt1(droneTier.wind) }} m/s, porywy {{ fmt1(droneTier.gust) }} m/s ({{ droneTier.src }}).
      Limit z instrukcji BSP nadpisuje model/klasę.
    </div>
    <q-select
      :model-value="pickedModel"
      :options="DRONE_MODELS"
      :option-label="m => `${m.name} · ${m.g} g · ${fmt1(m.wind)} m/s`"
      label="Model BSP — limit wg specyfikacji DJI"
      outlined dense clearable
      class="q-mb-sm"
      @update:model-value="onPickModel"
    />
    <div class="text-caption sig-muted q-mb-xs">lub klasa UE (analiza dla górnej granicy masy klasy — szacunek):</div>
    <div class="row q-gutter-xs q-mb-md">
      <q-chip
        v-for="c in DRONE_CLASSES" :key="c.label"
        clickable dense outline :color="!pickedModel && droneWeight === c.g ? 'primary' : 'grey-6'"
        @click="droneWeight = c.g; pickedModel = null; customWind = null"
      >{{ c.label }}</q-chip>
    </div>

    <div class="row items-center q-gutter-sm q-mb-md">
      <q-btn color="primary" icon="flight_takeoff" label="Oceń warunki lotu" no-caps :loading="loading" @click="assess" />
      <q-btn
        v-if="result" flat round dense icon="refresh" color="primary"
        :loading="loading" @click="assess" aria-label="Odśwież dane"
      >
        <q-tooltip>Odśwież dane dla tego samego zestawu</q-tooltip>
      </q-btn>
      <q-btn
        v-if="result" flat round dense icon="picture_as_pdf" color="primary"
        @click="openPdfDialog" aria-label="Zapisz do PDF"
      >
        <q-tooltip>Zapisz ocenę do PDF</q-tooltip>
      </q-btn>
      <span v-if="result && lastUpdate" class="text-caption sig-muted">aktualizacja: {{ lastUpdate }}</span>
    </div>

    <template v-if="result">
      <!-- Potwierdzenie punktu -->
      <div class="sig-panel loc-confirm q-mb-md">
        <q-icon name="place" color="primary" size="sm" class="q-mr-xs" />
        <b>{{ result.placeLabel }}</b>
        <span class="sig-muted"> → {{ result.lat.toFixed(4) }}°N, {{ result.lon.toFixed(4) }}°E, wys. {{ Math.round(result.elevation) }} m n.p.m.</span>
        <div class="text-caption sig-muted">Model Open-Meteo, siatka ~9 km — dane dla najbliższego węzła siatki.</div>
      </div>

      <!-- Werdykt -->
      <q-banner :class="['verdict', 'q-mb-md', verdictClass]" rounded>
        <template #avatar><q-icon :name="result.verdict.icon" size="md" /></template>
        <div class="text-h6 text-weight-bold">{{ result.verdict.label }}</div>
        <div
          v-for="(r, i) in result.verdict.reasons" :key="i"
          class="text-body2" :class="r.level === 'no' ? 'text-weight-bold' : 'sig-muted'"
        >• {{ r.text }}</div>
        <div v-if="!result.verdict.reasons.length" class="text-body2">Brak istotnych zagrożeń w wybranym oknie.</div>
      </q-banner>

      <!-- Wiatr wg wysokości -->
      <div class="text-subtitle2 q-mb-xs">
        Wiatr wg wysokości (okno {{ hourFrom }}:00–{{ hourTo }}:00)
        <div class="text-caption sig-muted">
          Ocena dla: {{ result.tierLabel }} — limit wiatru {{ fmt1(result.tierWind) }} m/s, porywy {{ fmt1(result.tierGust) }} m/s
          ({{ result.tierSrc }}). „Blisko limitu" = powyżej {{ fmt1(result.tierWind * 0.8) }} m/s (80% limitu).
        </div>
      </div>
      <q-markup-table flat bordered dense class="q-mb-md wind-table">
        <thead>
          <tr><th>Wys.</th><th>Śr. [m/s]</th><th>Maks. [m/s]</th><th>Kier.</th><th>Ocena</th></tr>
        </thead>
        <tbody>
          <tr v-for="row in result.wind" :key="row.level">
            <td>{{ row.level }}</td>
            <td>{{ row.avg }}</td>
            <td>{{ row.max }}</td>
            <td>{{ row.dir }}</td>
            <td :class="row.statusClass">{{ row.status }}</td>
          </tr>
          <tr>
            <td>porywy</td>
            <td>—</td>
            <td>{{ result.gustMax }}</td>
            <td>—</td>
            <td :class="result.gustClass">{{ result.gustStatus }}</td>
          </tr>
        </tbody>
      </q-markup-table>

      <!-- Rozkład czasowy: kwadranse -->
      <div class="text-subtitle2 q-mb-xs">
        Rozkład w oknie — {{ result.quarterMode ? 'co 15 min' : 'co godzinę' }}
      </div>
      <div class="text-caption sig-muted q-mb-xs">
        Komórka = kwadrans: <b>duża liczba</b> — wiatr na 10 m [m/s], mała — poryw + kierunek, kropla — opad.
        Tło: <span class="legend-warn">bursztyn</span> = powyżej 80% limitu, <span class="legend-no">czerwone</span> = powyżej limitu drona.
        Kliknij komórkę, by zobaczyć szczegóły.
      </div>
      <div class="qgrid q-mb-md">
        <div v-for="row in result.hourGrid" :key="row.hour" class="qrow">
          <div class="qhour">{{ row.hour }}</div>
          <div v-for="(c, i) in row.cells" :key="i" class="qcell" :class="c.cls" @click="slotDetail = c">
            <div class="qwind">{{ fmt1(c.w10) }}</div>
            <div class="qsub">{{ fmt1(c.g) }}<template v-if="c.dir != null">&nbsp;{{ dirName(c.dir) }}</template></div>
            <q-icon v-if="c.pr > 0" name="water_drop" color="blue-6" size="10px" class="qdrop" />
          </div>
        </div>
      </div>

      <!-- Kluczowe parametry -->
      <div class="row q-col-gutter-sm q-mb-md">
        <div v-for="s in result.stats" :key="s.label" class="col-6 col-sm-3">
          <div class="sig-panel stat-box">
            <div class="text-caption sig-muted">{{ s.label }}</div>
            <div class="text-subtitle1 text-weight-bold">{{ s.value }}</div>
          </div>
        </div>
      </div>

      <!-- Rady praktyczne -->
      <div class="row q-col-gutter-md">
        <div v-for="col in result.advice" :key="col.title" class="col-12 col-sm-6">
          <div class="sig-panel advice-col">
            <div class="text-subtitle2 q-mb-sm text-primary">{{ col.title }}</div>
            <div class="text-caption sig-muted q-mb-xs">Dla pilota</div>
            <ul class="advice-list q-mb-sm"><li v-for="(a, i) in col.pilot" :key="'p'+i">{{ a }}</li></ul>
            <div class="text-caption sig-muted q-mb-xs">Sprzęt</div>
            <ul class="advice-list"><li v-for="(a, i) in col.gear" :key="'g'+i">{{ a }}</li></ul>
          </div>
        </div>
      </div>
      <div class="text-caption sig-muted q-mb-md">Okno: {{ result.wxSummary }}</div>
    </template>

    <q-dialog :model-value="!!slotDetail" @update:model-value="slotDetail = null">
      <q-card v-if="slotDetail" style="min-width: 300px; max-width: 92vw">
        <q-card-section class="row items-center q-pb-sm">
          <div class="text-subtitle1 text-weight-bold">Kwadrans {{ slotDetail.time }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-markup-table flat dense>
            <tbody>
              <tr><td>Wiatr 10 m</td><td>{{ fmt1(slotDetail.w10) }} m/s</td></tr>
              <tr><td>Porywy</td><td>{{ fmt1(slotDetail.g) }} m/s</td></tr>
              <tr><td>Kierunek</td><td>{{ slotDetail.dir != null ? `${dirName(slotDetail.dir)} (${Math.round(slotDetail.dir)}°)` : '—' }}</td></tr>
              <tr><td>Wiatr 80 m</td><td>{{ fmt1(slotDetail.w80) }} m/s</td></tr>
              <tr><td>Wiatr 120 m *</td><td>{{ fmt1(slotDetail.w120) }} m/s</td></tr>
              <tr><td>Wiatr 180 m *</td><td>{{ fmt1(slotDetail.w180) }} m/s</td></tr>
              <tr><td>Temperatura</td><td>{{ fmt1(slotDetail.temp) }} °C</td></tr>
              <tr><td>Opad</td><td>{{ slotDetail.pr.toFixed(1).replace('.', ',') }} mm</td></tr>
              <tr>
                <td>Widzialność</td>
                <td>{{ slotDetail.vis != null ? fmtVis(slotDetail.vis) + (slotDetail.vis < 1000 ? ' — mgła/zamglenie' : '') : '—' }}</td>
              </tr>
              <tr><td>Warunki</td><td>{{ wxDesc(slotDetail.code) }}</td></tr>
            </tbody>
          </q-markup-table>
          <div class="text-caption sig-muted q-mt-xs">* poziomy 120/180 m — dane godzinowe (brak pomiaru 15-min)</div>
          <div class="q-mt-sm text-body2">
            Ocena dla klasy {{ droneTier.label }}:
            <b :class="slotDetail.cls === 'q-no' ? 'text-negative' : slotDetail.cls === 'q-warn' ? 'text-warning' : 'text-positive'">
              {{ slotDetail.cls === 'q-no' ? 'za silny wiatr' : slotDetail.cls === 'q-warn' ? 'blisko limitu' : 'w normie' }}
            </b>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="pdfDlg">
      <q-card style="min-width: 300px; max-width: 92vw">
        <q-card-section class="row items-center q-pb-sm">
          <div class="text-subtitle1 text-weight-bold">Zapisz ocenę do PDF</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-option-group
            v-model="pdfSections" :options="PDF_SECTIONS" type="checkbox" dense
            class="pdf-opts q-mb-sm"
          />
          <div v-if="pdfSections.includes('grid') && result">
            <div class="text-caption sig-muted q-mb-xs">Godziny w tabeli rozkładu:</div>
            <div class="row q-gutter-xs">
              <q-chip
                v-for="h in pdfHourList" :key="h" clickable dense outline
                :color="pdfHours.includes(h) ? 'primary' : 'grey-6'"
                @click="togglePdfHour(h)"
              >{{ h }}</q-chip>
            </div>
            <div class="row q-gutter-xs q-mt-xs">
              <q-btn flat dense no-caps size="sm" label="wszystkie" @click="pdfHours = [...pdfHourList]" />
              <q-btn flat dense no-caps size="sm" label="żadna" @click="pdfHours = []" />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" icon="picture_as_pdf" label="Generuj PDF" no-caps @click="generatePdf" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'
import * as mgrs from 'mgrs'
import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { robotoRegularB64, robotoBoldB64 } from 'src/assets/fonts/roboto-pdf'

const props = defineProps({
  location: { type: String, required: true },
  date: { type: String, required: true }
})

const $q = useQuasar()
const HOURS = Array.from({ length: 25 }, (_, i) => ({ label: `${i}:00`, value: i }))
// Rzeczywiste masy i oficjalne limity wiatru (m/s, wiatr ustalony) wg specyfikacji DJI
const DRONE_MODELS = [
  { g: 250, name: 'DJI Mini 5 Pro', wind: 12 },
  { g: 249, name: 'DJI Mini 4 Pro', wind: 10.7 },
  { g: 377, name: 'DJI Avata 2', wind: 10.7 },
  { g: 720, name: 'DJI Air 3', wind: 12 },
  { g: 895, name: 'DJI Mavic 3', wind: 12 },
  { g: 963, name: 'DJI Mavic 3 Pro', wind: 12 },
  { g: 3770, name: 'DJI Matrice 30T', wind: 12 },
  { g: 4310, name: 'DJI Inspire 3', wind: 12 },
  { g: 6470, name: 'DJI Matrice 350', wind: 12 }
]
// Klasy UE (kategorie otwarte): C0 <250 g, C1 <900 g, C2 <4 kg, C3/C4 <25 kg
const DRONE_CLASSES = [
  { g: 249, label: 'C0 <250 g' },
  { g: 899, label: 'C1 <900 g' },
  { g: 3999, label: 'C2 <4 kg' },
  { g: 24999, label: 'C3/C4 <25 kg' }
]

const hourFrom = ref(6)
const hourTo = ref(18)
const droneWeight = ref(895)
const customWind = ref(null)
const pickedModel = ref(DRONE_MODELS.find(m => m.g === 895))
const loading = ref(false)
const result = ref(null)
const lastUpdate = ref('')
const slotDetail = ref(null)
const pdfDlg = ref(false)
const pdfSections = ref(['verdict', 'wind', 'stats', 'grid', 'advice', 'summary'])
const pdfHours = ref([])
const PDF_SECTIONS = [
  { label: 'Werdykt i uzasadnienie', value: 'verdict' },
  { label: 'Wiatr wg wysokości', value: 'wind' },
  { label: 'Parametry kluczowe (temp., opady, VLOS)', value: 'stats' },
  { label: 'Rozkład w oknie (kwadranse)', value: 'grid' },
  { label: 'Rady praktyczne', value: 'advice' },
  { label: 'Podsumowanie okna', value: 'summary' }
]

const fmt1 = v => (v != null && !isNaN(v)) ? v.toFixed(1).replace('.', ',') : '—'

function onPickModel (m) {
  pickedModel.value = m
  if (m) {
    droneWeight.value = m.g
    customWind.value = null
  }
}

watch(droneWeight, w => {
  if (pickedModel.value && w !== pickedModel.value.g) pickedModel.value = null
})

// Limit wiatru, w kolejności: 1) limit z instrukcji wpisany przez użytkownika,
// 2) oficjalna specyfikacja DJI dla wybranego modelu, 3) szacunek dla klasy EU
// (najniższy typowy limit BSP w klasie — oznaczony jako szacunek).
// Limit porywów ≈ limit ×1,2 (szacunek praktyczny — producenci nie podają limitu porywów).
const droneTier = computed(() => {
  const cw = Number(customWind.value)
  if (cw > 0) {
    return { label: 'limit własny', wind: cw, gust: Math.round(cw * 1.2 * 10) / 10, src: 'z instrukcji BSP' }
  }
  const m = pickedModel.value
  if (m) {
    return { label: m.name, wind: m.wind, gust: Math.round(m.wind * 1.2 * 10) / 10, src: 'specyfikacja DJI' }
  }
  const w = Number(droneWeight.value) || 0
  const src = 'szacunek dla klasy — zweryfikuj z instrukcją BSP'
  if (w < 250) return { label: 'C0 <250 g', wind: 8, gust: 9.6, src }
  if (w < 900) return { label: 'C1 <900 g', wind: 10.7, gust: 12.8, src }
  if (w < 4000) return { label: 'C2 <4 kg', wind: 12, gust: 14.4, src }
  return { label: 'C3/C4 <25 kg', wind: 12, gust: 14.4, src }
})

const MGRS_RE = /^\d{1,2}[A-Z]{3}\d*$/i

async function resolvePoint (raw) {
  const compact = raw.trim().replace(/\s+/g, '')
  if (MGRS_RE.test(compact)) {
    try {
      const [lon, lat] = mgrs.toPoint(compact.toUpperCase())
      return { lat, lon, label: 'MGRS ' + raw.trim().toUpperCase() }
    } catch {
      throw new Error('Nieprawidłowe koordynaty MGRS (strefa, litery lub parzysta liczba cyfr)')
    }
  }
  const geo = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
    params: { name: raw.trim(), count: 10, language: 'pl', format: 'json' }
  })
  const hits = geo.data?.results || []
  const hit = hits.find(h => h.country_code === 'PL') || hits[0]
  if (!hit) throw new Error('Nie znaleziono lokalizacji')
  return {
    lat: hit.latitude,
    lon: hit.longitude,
    label: [hit.name, hit.admin1, hit.country].filter(Boolean).join(', ')
  }
}

const DIR16 = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
const dirName = deg => DIR16[Math.round(deg / 22.5) % 16]
const fmtVis = v => v >= 1000 ? `${(v / 1000).toFixed(1).replace('.', ',')} km` : `${Math.round(v)} m`

// Kody WMO weathercode -> opis PL
const WX_DESC = {
  0: 'bezchmurnie',
  1: 'przeważnie pogodnie',
  2: 'częściowe zachmurzenie',
  3: 'pochmurno',
  45: 'mgła',
  48: 'mgła osadzająca szadź',
  51: 'słaba mżawka',
  53: 'mżawka',
  55: 'gęsta mżawka',
  56: 'marznąca mżawka',
  57: 'gęsta marznąca mżawka',
  61: 'słaby deszcz',
  63: 'deszcz',
  65: 'intensywny deszcz',
  66: 'marznący deszcz',
  67: 'intensywny marznący deszcz',
  71: 'słaby śnieg',
  73: 'śnieg',
  75: 'intensywny śnieg',
  77: 'ziarna śniegu',
  80: 'przelotny deszcz',
  81: 'przelotny deszcz',
  82: 'silny przelotny deszcz',
  85: 'przelotny śnieg',
  86: 'silny przelotny śnieg',
  95: 'burza',
  96: 'burza z gradem',
  99: 'burza z silnym gradem'
}
const wxDesc = c => c == null ? '—' : (WX_DESC[c] || `kod ${c}`)

function dirStats (degs) {
  if (!degs.length) return { dir: null, coherence: 1 }
  const rad = degs.map(d => d * Math.PI / 180)
  const s = rad.reduce((a, x) => a + Math.sin(x), 0) / rad.length
  const c = rad.reduce((a, x) => a + Math.cos(x), 0) / rad.length
  return { dir: (Math.atan2(s, c) * 180 / Math.PI + 360) % 360, coherence: Math.hypot(s, c) }
}

function summarize (arr, idx) {
  const vals = idx.map(i => arr?.[i]).filter(v => v !== null && v !== undefined)
  if (!vals.length) return null
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length
  return { avg: +avg.toFixed(1), min: +Math.min(...vals).toFixed(1), max: +Math.max(...vals).toFixed(1) }
}

async function assess () {
  if (!props.location?.trim()) {
    $q.notify({ type: 'negative', message: 'Podaj lokalizację lub koordynaty MGRS.' })
    return
  }
  loading.value = true
  result.value = null
  try {
    const pt = await resolvePoint(props.location)
    const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: pt.lat,
        longitude: pt.lon,
        hourly: 'temperature_2m,apparent_temperature,relativehumidity_2m,precipitation,weathercode,cloudcover,cloudcover_low,visibility,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_80m,winddirection_120m,winddirection_180m,winddirection_10m,windgusts_10m,freezinglevel_height,cape',
        minutely_15: 'wind_speed_10m,wind_speed_80m,wind_gusts_10m,wind_direction_10m,precipitation,temperature_2m,weathercode,visibility',
        daily: 'sunrise,sunset',
        wind_speed_unit: 'ms',
        timezone: 'Europe/Warsaw',
        start_date: props.date,
        end_date: props.date
      }
    })

    const h = data.hourly
    if (!h?.time?.length) throw new Error('Brak danych pogodowych dla wybranego punktu/daty')
    const idx = h.time
      .map((t, i) => ({ t, i }))
      .filter(({ t }) => {
        const hr = +t.slice(11, 13)
        return hr >= hourFrom.value && hr < hourTo.value
      })
      .map(({ i }) => i)
    if (!idx.length) throw new Error('Brak danych dla wybranego okna godzinowego')

    const tier = droneTier.value
    const windLevels = [
      { level: '10 m', speed: 'windspeed_10m', dir: 'winddirection_10m' },
      { level: '80 m', speed: 'windspeed_80m', dir: 'winddirection_80m' },
      { level: '120 m', speed: 'windspeed_120m', dir: 'winddirection_120m' },
      { level: '180 m', speed: 'windspeed_180m', dir: 'winddirection_180m' }
    ]
    let dirVar = 1
    const wind = windLevels.map(l => {
      const s = summarize(h[l.speed], idx)
      const dirs = idx.map(i => h[l.dir]?.[i]).filter(v => v != null)
      const ds = dirStats(dirs)
      if (l.level === '10 m') dirVar = ds.coherence
      if (!s) {
        return { level: l.level, avg: '—', max: '—', dir: '—', status: 'brak danych', statusClass: 'sig-muted', over: false, near: false }
      }
      const over = s.max > tier.wind
      const near = !over && s.max > tier.wind * 0.8
      const overHrs = idx
        .map(i => ({ t: h.time[i].slice(11, 16), v: h[l.speed]?.[i] }))
        .filter(x => x.v != null && x.v > tier.wind)
        .map(x => x.t)
      const overSpan = overHrs.length ? ` (${overHrs[0]}–${overHrs[overHrs.length - 1]})` : ''
      return {
        level: l.level,
        avg: s.avg,
        max: s.max,
        dir: ds.dir != null ? dirName(ds.dir) : '—',
        status: over ? `za silny (>${tier.wind})` : near ? 'blisko limitu' : 'ok',
        statusClass: over ? 'text-negative text-weight-bold' : near ? 'text-warning text-weight-bold' : 'text-positive',
        over,
        near,
        overSpan
      }
    })
    const gustArr = h.windgusts_10m || []
    const gustMax = Math.max(0, ...idx.map(i => gustArr[i] || 0))

    // Kp (aktywność geomagnetyczna) z NOAA SWPC — wpływa na GNSS/RTH drona
    let kpMax = null
    let kpPredicted = false
    try {
      const kr = await axios.get('https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json', { timeout: 8000 })
      const entries = (kr.data || [])
        .map(({ time_tag: t, kp, observed: kind }) => ({ d: new Date(t + 'Z'), kp: +kp, kind }))
        .filter(x => !isNaN(x.kp))
        .filter(x => x.d.toLocaleDateString('sv-SE') === props.date)
        .filter(x => x.d.getHours() < hourTo.value && x.d.getHours() + 3 > hourFrom.value)
      if (entries.length) {
        const top = entries.reduce((a, b) => (b.kp > a.kp ? b : a))
        kpMax = top.kp
        kpPredicted = top.kind === 'predicted'
      }
    } catch { /* brak danych Kp — pomijamy */ }

    const temp = summarize(h.temperature_2m, idx)
    const vis = summarize(h.visibility, idx)
    const precip = idx.reduce((a, i) => a + (h.precipitation[i] || 0), 0)
    const cloudLow = summarize(h.cloudcover_low, idx)
    const freeze = summarize(h.freezinglevel_height, idx)
    const cape = summarize(h.cape, idx)
    const codes = idx.map(i => h.weathercode[i])
    const thunder = codes.some(c => c >= 95)

    // Rozkład w oknie: kwadranse z minutely_15, fallback na dane godzinowe
    const hIdxByHour = new Map()
    h.time.forEach((t, i) => {
      const k = t.slice(0, 13)
      if (!hIdxByHour.has(k)) hIdxByHour.set(k, i)
    })
    const m = data.minutely_15
    const slots = []
    if (m?.time?.length) {
      m.time.forEach((t, i) => {
        if (t.slice(0, 10) !== props.date) return
        const hr = +t.slice(11, 13)
        if (hr < hourFrom.value || hr >= hourTo.value) return
        const hi = hIdxByHour.get(t.slice(0, 13))
        slots.push({
          time: t.slice(11, 16),
          w10: m.wind_speed_10m?.[i] ?? null,
          g: m.wind_gusts_10m?.[i] ?? null,
          dir: m.wind_direction_10m?.[i] ?? null,
          w80: m.wind_speed_80m?.[i] ?? null,
          w120: hi != null ? (h.windspeed_120m?.[hi] ?? null) : null,
          w180: hi != null ? (h.windspeed_180m?.[hi] ?? null) : null,
          pr: m.precipitation?.[i] ?? 0,
          temp: m.temperature_2m?.[i] ?? null,
          vis: m.visibility?.[i] ?? null,
          code: m.weathercode?.[i] ?? null
        })
      })
    }
    const quarterMode = slots.length > 1
    if (!quarterMode) {
      idx.forEach(i => {
        slots.push({
          time: h.time[i].slice(11, 16),
          w10: h.windspeed_10m?.[i] ?? null,
          g: gustArr[i] ?? null,
          dir: h.winddirection_10m?.[i] ?? null,
          w80: h.windspeed_80m?.[i] ?? null,
          w120: h.windspeed_120m?.[i] ?? null,
          w180: h.windspeed_180m?.[i] ?? null,
          pr: h.precipitation?.[i] ?? 0,
          temp: h.temperature_2m?.[i] ?? null,
          vis: h.visibility?.[i] ?? null,
          code: h.weathercode?.[i] ?? null
        })
      })
    }
    const hourGridMap = new Map()
    for (const s of slots) {
      const hh = s.time.slice(0, 2) + ':00'
      if (!hourGridMap.has(hh)) hourGridMap.set(hh, [])
      const over = (s.w10 != null && s.w10 > tier.wind) || (s.g != null && s.g > tier.gust)
      const near = !over && ((s.w10 != null && s.w10 > tier.wind * 0.8) || (s.g != null && s.g > tier.gust * 0.8))
      hourGridMap.get(hh).push({ ...s, cls: over ? 'q-no' : near ? 'q-warn' : '' })
    }
    const hourGrid = [...hourGridMap.entries()].map(([hour, cells]) => ({ hour, cells }))

    // Podsumowanie okna: opady, mgła/zamglenie, burza, temperatura
    const prSum = +slots.reduce((a, s) => a + (s.pr || 0), 0).toFixed(1)
    const prTimes = slots.filter(s => s.pr > 0).map(s => s.time)
    const fogTimes = slots.filter(s => s.vis != null && s.vis < 1000).map(s => s.time)
    const tsTimes = slots.filter(s => s.code != null && s.code >= 95).map(s => s.time)
    const tempsArr = slots.map(s => s.temp).filter(v => v != null)
    const wxSummary = [
      `opady ${String(prSum).replace('.', ',')} mm` + (prTimes.length ? ` (${prTimes[0]}–${prTimes[prTimes.length - 1]})` : ''),
      fogTimes.length ? `mgła/zamglenie ${fogTimes[0]}–${fogTimes[fogTimes.length - 1]}` : 'bez mgły',
      tsTimes.length ? `BURZA od ${tsTimes[0]}` : 'bez burzy',
      tempsArr.length ? `temp ${fmt1(Math.min(...tempsArr))}…${fmt1(Math.max(...tempsArr))}°C` : null
    ].filter(Boolean).join(' · ')

    const noGo = []
    const caution = []
    const okItems = []
    const span = hrs => hrs.length ? ` (${hrs[0]}–${hrs[hrs.length - 1]})` : ''
    const hrsAt = (arr, pred) => idx.filter(i => pred(arr?.[i])).map(i => h.time[i].slice(11, 16))

    // Wiatr: poziomy ponad limit / blisko limitu / w normie
    const overLevels = wind.filter(w => w.over).map(w => `${w.level} (maks ${fmt1(w.max)} m/s${w.overSpan})`)
    const nearLevels = wind.filter(w => w.near).map(w => `${w.level} (maks ${fmt1(w.max)} m/s)`)
    const okLevels = wind.filter(w => !w.over && !w.near && w.status !== 'brak danych').map(w => w.level)
    if (overLevels.length) noGo.push(`wiatr ponad limit ${fmt1(tier.wind)} m/s na wys. ${overLevels.join(', ')}`)
    else if (nearLevels.length) caution.push(`wiatr blisko limitu na wys. ${nearLevels.join(', ')}`)
    if (okLevels.length) okItems.push(`wiatr w normie: wys. ${okLevels.join(', ')}`)
    else if (!overLevels.length) okItems.push('wiatr w normie na wszystkich poziomach')

    // Porywy
    const gustOverHrs = hrsAt(gustArr, v => v != null && v > tier.gust)
    if (gustMax > tier.gust) noGo.push(`porywy ponad limit ${fmt1(tier.gust)} m/s${span(gustOverHrs)} (maks ${fmt1(gustMax)})`)
    else if (gustMax > tier.gust * 0.8) caution.push(`porywy do ${fmt1(gustMax)} m/s`)
    else okItems.push(`porywy ${fmt1(gustMax)} m/s — w normie`)

    // Burza / konwekcja
    const tsHrs = hrsAt(h.weathercode, c => c >= 95)
    if (thunder) noGo.push(`burza w oknie${span(tsHrs)}`)
    else okItems.push('bez burzy')
    if (cape && cape.max > 1000) noGo.push(`CAPE ${Math.round(cape.max)} — silna konwekcja`)
    else if (cape && cape.max > 500) caution.push(`CAPE ${Math.round(cape.max)} — możliwe prądy wznoszące`)
    else if (cape) okItems.push(`CAPE ${Math.round(cape.max)} — brak konwekcji`)

    // Widzialność
    const visBadHrs = hrsAt(h.visibility, v => v != null && v < 500)
    if (vis && vis.min < 500) noGo.push(`widzialność <500 m${span(visBadHrs)} — utrata VLOS`)
    else if (vis && vis.min < 3000) caution.push(`widzialność ${fmtVis(vis.min)} — ograniczony VLOS`)
    else if (vis) okItems.push(`widzialność ${fmtVis(vis.min)} — dobry VLOS`)

    // Opady / oblodzenie
    const icing = freeze && freeze.min < 400 && precip > 0
    if (icing) noGo.push('ryzyko oblodzenia śmigieł (poziom zamarzania <400 m + opady)')
    else if (precip > 0) caution.push(`opady ${String(precip.toFixed(1)).replace('.', ',')} mm${prTimes.length ? ` (${prTimes[0]}–${prTimes[prTimes.length - 1]})` : ''}`)
    else okItems.push('bez opadów')

    // Aktywność geomagnetyczna (Kp) — degradacja GNSS/RTH
    const kpSuffix = kpPredicted ? ' (prognoza)' : ''
    if (kpMax != null && kpMax >= 7) noGo.push(`Kp ${fmt1(kpMax)}${kpSuffix} — silna burza geomagnetyczna, GPS/RTH zawodne`)
    else if (kpMax != null && kpMax >= 5) caution.push(`Kp ${fmt1(kpMax)}${kpSuffix} — burza geomagnetyczna, możliwe zakłócenia GNSS`)
    else if (kpMax != null) okItems.push(`Kp ${fmt1(kpMax)}${kpSuffix} — GNSS bez zakłóceń`)

    // Pozostałe uwagi
    if (dirVar < 0.35) caution.push('zmienny kierunek wiatru — możliwa turbulencja')
    if (temp && temp.min < 0) caution.push(`mróz ${temp.min}°C — mniejsza pojemność baterii`)
    const w180 = summarize(h.windspeed_180m, idx)
    const w10 = summarize(h.windspeed_10m, idx)
    if (w180 && w10 && w180.max > w10.max * 1.7) {
      caution.push('wiatr wyraźnie narasta z wysokością — unikać wysokich przelotów')
    }

    // Werdykt: ograniczenie wyłącznie wysokościowe → miększy tytuł
    const firstOverIdx = wind.findIndex(w => w.over)
    const windOnlyNoGo = noGo.length === 1 && overLevels.length > 0 && firstOverIdx > 0
    const safeLevel = windOnlyNoGo ? wind[firstOverIdx - 1].level : null
    const verdict = noGo.length
      ? windOnlyNoGo
        ? { label: `LOT OGRANICZONY DO ${safeLevel.toUpperCase()}`, icon: 'warning', cls: 'verdict--warn' }
        : { label: 'NIE LATAĆ', icon: 'cancel', cls: 'verdict--no' }
      : caution.length
        ? { label: 'LATAĆ Z OGRANICZENIAMI', icon: 'warning', cls: 'verdict--warn' }
        : { label: 'WARUNKI DOBRE DO LOTU', icon: 'check_circle', cls: 'verdict--go' }

    const gustStatus = gustMax > tier.gust ? 'za silne' : gustMax > tier.gust * 0.8 ? 'blisko limitu' : 'ok'
    const gustClass = gustMax > tier.gust ? 'text-negative text-weight-bold' : gustMax > tier.gust * 0.8 ? 'text-warning text-weight-bold' : 'text-positive'

    result.value = {
      placeLabel: pt.label,
      lat: data.latitude,
      lon: data.longitude,
      elevation: data.elevation,
      verdict: {
        ...verdict,
        reasons: [...noGo.map(t => ({ text: t, level: 'no' })), ...caution.map(t => ({ text: t, level: 'caution' }))]
      },
      verdictCls: verdict.cls,
      wind,
      hourGrid,
      quarterMode,
      wxSummary,
      tierLabel: tier.label,
      tierWind: tier.wind,
      tierGust: tier.gust,
      tierSrc: tier.src,
      gustMax: gustMax.toFixed(1),
      gustStatus,
      gustClass,
      stats: [
        { label: 'Temp. min/maks', value: temp ? `${temp.min} / ${temp.max}°C` : '—' },
        { label: 'Opady w oknie', value: `${precip.toFixed(1)} mm` },
        { label: 'Widzialność min', value: vis ? fmtVis(vis.min) : '—' },
        { label: 'Chmury niskie', value: cloudLow ? `${cloudLow.avg}%` : '—' },
        { label: 'Poziom zamarzania', value: freeze ? `${Math.round(freeze.min)} m` : '—' },
        { label: 'CAPE maks', value: cape ? `${Math.round(cape.max)} J/kg` : '—' },
        { label: 'Kp maks', value: kpMax != null ? fmt1(kpMax) : '—' },
        { label: 'Wschód słońca', value: (data.daily?.sunrise?.[0] || '').slice(11) || '—' },
        { label: 'Zachód słońca', value: (data.daily?.sunset?.[0] || '').slice(11) || '—' }
      ],
      advice: buildAdvice({ temp, vis, precip, gustMax, icing, thunder, cape, tier, freeze })
    }
    lastUpdate.value = new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  } catch (e) {
    console.error(e)
    $q.notify({ type: 'negative', message: (e.response || e.request) ? 'Nie udało się pobrać danych Open-Meteo.' : e.message })
  } finally {
    loading.value = false
  }
}

const verdictClass = computed(() => result.value?.verdictCls || '')

const pdfHourList = computed(() => (result.value?.hourGrid || []).map(r => r.hour))

function togglePdfHour (h) {
  pdfHours.value = pdfHours.value.includes(h)
    ? pdfHours.value.filter(x => x !== h)
    : [...pdfHours.value, h]
}

function openPdfDialog () {
  pdfHours.value = [...pdfHourList.value]
  pdfDlg.value = true
}

// Małe ikony wektorowe zjawisk w komórkach siatki PDF — kropla tylko przy realnym opadzie (jak w GUI)
function pdfWxIcon (doc, c, x, y) {
  const code = c.code
  let kind = null
  if (code >= 95) kind = 'storm'
  else if ([71, 73, 75, 77, 85, 86, 56, 57, 66, 67].includes(code)) kind = 'snow'
  else if (c.pr > 0) kind = 'rain'
  else if (code === 45 || code === 48 || (c.vis != null && c.vis < 1000)) kind = 'fog'
  else if (c.cls === 'q-no' || c.cls === 'q-warn') kind = 'wind'
  if (!kind) return
  doc.saveGraphicsState()
  doc.setLineWidth(0.6)
  if (kind === 'fog') {
    doc.setDrawColor(120, 120, 120)
    for (let i = 0; i < 3; i++) doc.line(x, y + 0.8 + i * 1.7, x + 5.2, y + 0.8 + i * 1.7)
  } else if (kind === 'rain') {
    doc.setFillColor(41, 128, 185)
    doc.triangle(x + 1.2, y + 2.6, x + 4.4, y + 2.6, x + 2.8, y, 'F')
    doc.circle(x + 2.8, y + 3.4, 1.7, 'F')
  } else if (kind === 'snow') {
    doc.setDrawColor(52, 152, 219)
    const cx = x + 2.6
    const cy = y + 2.4
    for (const a of [0, 60, 120]) {
      const rad = a * Math.PI / 180
      doc.line(cx - Math.cos(rad) * 2.4, cy - Math.sin(rad) * 2.4, cx + Math.cos(rad) * 2.4, cy + Math.sin(rad) * 2.4)
    }
  } else if (kind === 'storm') {
    doc.setFillColor(60, 60, 60)
    doc.triangle(x + 2.6, y, x + 5.4, y, x + 3.2, y + 2.6, 'F')
    doc.triangle(x + 0.6, y + 2.6, x + 4.2, y + 2.6, x + 2.0, y + 5.4, 'F')
  } else if (kind === 'wind') {
    doc.setDrawColor(60, 60, 60)
    doc.line(x, y + 1.2, x + 3.6, y + 1.2)
    doc.circle(x + 4.2, y + 1.9, 0.8, 'S')
    doc.line(x, y + 3.6, x + 2.6, y + 3.6)
    doc.circle(x + 3.2, y + 4.3, 0.8, 'S')
  }
  doc.restoreGraphicsState()
}

function generatePdf () {
  const r = result.value
  if (!r) return
  const doc = new JsPDF()
  doc.addFileToVFS('Roboto-Regular.ttf', robotoRegularB64.split(',')[1])
  doc.addFileToVFS('Roboto-Bold.ttf', robotoBoldB64.split(',')[1])
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal')
  doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold')
  doc.setFont('Roboto', 'normal')

  const sec = pdfSections.value
  const PW = doc.internal.pageSize.getWidth()
  let y = 15
  const para = (text, opts = {}) => {
    const lines = doc.splitTextToSize(text, PW - 28)
    doc.text(lines, 14, y, opts)
    y += lines.length * (opts.lineHeight || 5)
  }

  // Nagłówek
  doc.setFont('Roboto', 'bold')
  doc.setFontSize(15)
  doc.text('Ocena warunków lotu BSP', 14, y)
  y += 8
  doc.setFont('Roboto', 'normal')
  doc.setFontSize(9)
  para(`${r.placeLabel} - ${r.lat.toFixed(4)}N, ${r.lon.toFixed(4)}E, wys. ${Math.round(r.elevation)} m n.p.m.`)
  para(`Data: ${props.date} · Okno: ${hourFrom.value}:00-${hourTo.value}:00 · Wygenerowano: ${lastUpdate.value || '-'}`)
  para(`BSP: ${r.tierLabel} - limit wiatru ${fmt1(r.tierWind)} m/s, porywy ${fmt1(r.tierGust)} m/s (${r.tierSrc})`)
  doc.setTextColor(120, 120, 120)
  para('Model Open-Meteo, siatka ~9 km - dane dla najbliższego węzła siatki.', { lineHeight: 4 })
  doc.setTextColor(0, 0, 0)
  y += 3

  // Werdykt
  if (sec.includes('verdict')) {
    const vc = r.verdictCls === 'verdict--no' ? [211, 47, 47] : r.verdictCls === 'verdict--warn' ? [194, 120, 3] : [46, 125, 50]
    doc.setFont('Roboto', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...vc)
    doc.text(r.verdict.label, 14, y)
    y += 6
    doc.setFont('Roboto', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(0, 0, 0)
    if (r.verdict.reasons.length) {
      for (const reason of r.verdict.reasons) {
        if (reason.level === 'no') doc.setFont('Roboto', 'bold')
        para(`• ${reason.text}`)
        if (reason.level === 'no') doc.setFont('Roboto', 'normal')
      }
    } else {
      para('Brak istotnych zagrożeń w wybranym oknie.')
    }
    y += 4
  }

  const tableOpts = {
    styles: { font: 'Roboto', fontSize: 8.5, cellPadding: 1.6 },
    headStyles: { font: 'Roboto', fontStyle: 'bold', fillColor: [45, 62, 47], fontSize: 8.5 },
    margin: { left: 14, right: 14 },
    theme: 'grid'
  }

  // Wiatr wg wysokości
  if (sec.includes('wind')) {
    doc.setFont('Roboto', 'bold')
    doc.setFontSize(10)
    doc.text('Wiatr wg wysokości [m/s]', 14, y)
    y += 3
    autoTable(doc, {
      ...tableOpts,
      startY: y,
      head: [['Wys.', 'Śr.', 'Maks.', 'Kier.', 'Ocena']],
      body: [
        ...r.wind.map(w => [w.level, w.avg, w.max, w.dir, w.status]),
        ['porywy', '—', r.gustMax, '—', r.gustStatus]
      ]
    })
    y = doc.lastAutoTable.finalY + 3
    doc.setFont('Roboto', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(120, 120, 120)
    para(`„Blisko limitu" = powyżej ${fmt1(r.tierWind * 0.8)} m/s (80% limitu).`, { lineHeight: 4 })
    doc.setTextColor(0, 0, 0)
    y += 2
  }

  // Parametry kluczowe
  if (sec.includes('stats')) {
    doc.setFont('Roboto', 'bold')
    doc.setFontSize(10)
    doc.text('Parametry kluczowe', 14, y)
    y += 3
    autoTable(doc, {
      ...tableOpts,
      startY: y,
      body: r.stats.map(s => [s.label, s.value])
    })
    y = doc.lastAutoTable.finalY + 6
  }

  // Rozkład w oknie (kwadranse)
  const gridRows = (r.hourGrid || []).filter(row => pdfHours.value.includes(row.hour))
  if (sec.includes('grid') && gridRows.length) {
    doc.setFont('Roboto', 'bold')
    doc.setFontSize(10)
    doc.text(`Rozkład w oknie ${r.quarterMode ? '(co 15 min)' : '(co godzinę)'} - wiatr 10 m / poryw + kierunek [m/s]`, 14, y)
    y += 3
    const cellData = []
    autoTable(doc, {
      ...tableOpts,
      startY: y,
      head: [['Godz.', ':00', ':15', ':30', ':45']],
      body: gridRows.map((row, ri) => {
        cellData[ri] = row.cells
        return [
          row.hour,
          ...[0, 1, 2, 3].map(i => {
            const c = row.cells[i]
            if (!c) return ''
            let t = `${fmt1(c.w10)}\n${fmt1(c.g)} ${c.dir != null ? dirName(c.dir) : ''}`
            if (c.pr > 0) t += '\n+opad'
            return t
          })
        ]
      }),
      didParseCell (d) {
        if (d.section !== 'body' || d.column.index === 0) return
        const cls = cellData[d.row.index]?.[d.column.index - 1]?.cls
        if (cls === 'q-no') {
          d.cell.styles.fillColor = [198, 40, 40]
          d.cell.styles.textColor = [255, 255, 255]
        } else if (cls === 'q-warn') {
          d.cell.styles.fillColor = [255, 179, 0]
        }
      },
      didDrawCell (d) {
        if (d.section !== 'body' || d.column.index === 0) return
        const c = cellData[d.row.index]?.[d.column.index - 1]
        if (!c) return
        pdfWxIcon(doc, c, d.cell.x + d.cell.width - 6.4, d.cell.y + 1)
      }
    })
    y = doc.lastAutoTable.finalY + 3
    doc.setFont('Roboto', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(120, 120, 120)
    para('Komórka: górna liczba = wiatr 10 m, dolna = poryw + kierunek. Bursztyn = >80% limitu, czerwony = ponad limit. +opad = opad w kwadransie. Ikona w prawym rogu komórki = zjawisko: kropla — opad >0 mm (jak w aplikacji), piorun — burza, gwiazdka — śnieg/marznące opady, kreski — mgła, spirala — silny wiatr.', { lineHeight: 4 })
    doc.setTextColor(0, 0, 0)
    y += 2
  }

  // Rady praktyczne
  if (sec.includes('advice') && r.advice?.length) {
    doc.setFont('Roboto', 'bold')
    doc.setFontSize(10)
    doc.text('Rady praktyczne', 14, y)
    y += 5
    doc.setFontSize(9)
    for (const col of r.advice) {
      doc.setFont('Roboto', 'bold')
      para('Dla pilota')
      doc.setFont('Roboto', 'normal')
      for (const a of col.pilot) para(`• ${a}`)
      y += 1
      doc.setFont('Roboto', 'bold')
      para('Sprzęt')
      doc.setFont('Roboto', 'normal')
      for (const a of col.gear) para(`• ${a}`)
      y += 2
    }
  }

  // Podsumowanie okna
  if (sec.includes('summary') && r.wxSummary) {
    doc.setFont('Roboto', 'bold')
    doc.setFontSize(9)
    para(`Okno: ${r.wxSummary}`)
    y += 2
  }

  // Stopka
  doc.setFont('Roboto', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(140, 140, 140)
  doc.text('KitBag 721 · kitbag721.pl · dane: Open-Meteo (progn.) · Dokument poglądowy - decyzję o locie podejmuje dowódca/pilot', 14, doc.internal.pageSize.getHeight() - 8)
  doc.setTextColor(0, 0, 0)

  pdfDlg.value = false
  doc.save(`ocena-bsp-${props.date}.pdf`)
}

function buildAdvice ({ temp, vis, precip, gustMax, icing, thunder, cape, tier, freeze }) {
  const pilot = []
  const gear = []
  if (temp && temp.min < 0) {
    pilot.push('Ciepło się ubrać, uważać na odmrożenia')
    gear.push('Trzymać baterie przy ciele — zimno skraca czas lotu')
  }
  if (precip > 0) {
    pilot.push('Ochrona przed opadami, suche rękawice')
    gear.push('Osłonić sprzęt przed deszczem/śniegiem (elektronika, kamera)')
  }
  if (gustMax > 10) pilot.push('Osłonić ciało od wiatru')
  if (icing) {
    pilot.push('UWAGA NA OBLODZENIE — unikać warstwy chmur i mżawki')
    gear.push(`Poziom zamarzania ~${Math.round(freeze.min)} m — nie wznosić powyżej`)
  }
  if (vis && vis.min < 3000) pilot.push('Ograniczona widoczność — kontrolować otoczenie, radar pogodowy')
  if (thunder || (cape && cape.max > 500)) {
    pilot.push('Kontrolować otoczenie i radar pogodowy — ryzyko konwekcji')
    gear.push('Mieć plan awaryjnego lądowania')
  }
  if (vis && vis.min >= 3000 && precip === 0 && !icing) pilot.push('Warunki pozwalają na standardowe operowanie')
  if (!gear.length) gear.push('Standardowe procedury przedlotowe')
  gear.push(`Limit wiatru dla klasy ${tier.label}: ${tier.wind} m/s (porywy ${tier.gust} m/s)`)
  return [{ title: 'Rady praktyczne', pilot, gear }]
}
</script>

<style scoped>
.sig-panel {
  background: var(--app-surface-2, rgba(0, 0, 0, 0.02));
}

.sig-muted {
  color: var(--app-text-muted, #617080);
}

.loc-confirm {
  border: 1px solid var(--app-border, rgba(0, 0, 0, 0.1));
  border-radius: 10px;
  padding: 10px 12px;
}

.verdict {
  border-left: 5px solid;
}
.verdict--go {
  background: rgba(46, 125, 50, 0.12);
  border-left-color: #2e7d32;
}
.verdict--warn {
  background: rgba(249, 168, 37, 0.12);
  border-left-color: #f9a825;
}
.verdict--no {
  background: rgba(198, 40, 40, 0.12);
  border-left-color: #c62828;
}

.stat-box {
  border: 1px solid var(--app-border, rgba(0, 0, 0, 0.08));
  border-radius: 10px;
  padding: 8px 10px;
  height: 100%;
}

.advice-col {
  border: 1px solid var(--app-border, rgba(0, 0, 0, 0.1));
  border-radius: 12px;
  padding: 12px 14px;
  height: 100%;
}

.advice-list {
  margin: 0;
  padding-left: 18px;
}
.advice-list li {
  margin-bottom: 4px;
}

.wind-table {
  font-size: 12px;
}
.wind-table td, .wind-table th {
  padding: 4px 6px;
}
.wind-table td:first-child {
  font-weight: 600;
}

.qgrid {
  border: 1px solid var(--app-border, rgba(0, 0, 0, 0.1));
  border-radius: 10px;
  padding: 8px;
  background: var(--app-surface-2, rgba(0, 0, 0, 0.02));
}

.qrow {
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
}
.qrow:last-child {
  margin-bottom: 0;
}

.qhour {
  width: 42px;
  flex: 0 0 42px;
  font-weight: 600;
  font-size: 12px;
  align-self: center;
}

.qcell {
  flex: 1;
  min-width: 0;
  text-align: center;
  border-radius: 6px;
  padding: 3px 2px;
  border: 1px solid var(--app-border, rgba(0, 0, 0, 0.08));
  position: relative;
  cursor: pointer;
}

.qcell.q-warn {
  background: rgba(249, 168, 37, 0.18);
  border-color: #f9a825;
}
.qcell.q-no {
  background: rgba(198, 40, 40, 0.18);
  border-color: #c62828;
}

.qwind {
  font-weight: 700;
  font-size: 13px;
  line-height: 1.2;
}

.qsub {
  font-size: 10px;
  line-height: 1.2;
  color: var(--app-text-muted, #617080);
}

.qdrop {
  position: absolute;
  top: 2px;
  right: 2px;
}

.legend-warn {
  background: rgba(249, 168, 37, 0.25);
  border-radius: 4px;
  padding: 0 4px;
}
.legend-no {
  background: rgba(198, 40, 40, 0.22);
  border-radius: 4px;
  padding: 0 4px;
}
</style>
