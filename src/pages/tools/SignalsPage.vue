<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav color="black" />

      <div class="page-header q-mb-lg">
        <div class="text-primary text-h4 text-weight-bold">Kryptonimy i sygnały</div>
        <div class="text-grey-7 text-subtitle1">Generator kryptonimów, haseł, odzewu i sygnałów rozpoznawczych</div>
      </div>

      <q-banner dense class="bg-amber-1 text-dark q-mb-lg" rounded>
        <template #avatar><q-icon name="info" color="amber-9" /></template>
        <b>Aplikacja nie zapisuje treści.</b> Wygenerowane kryptonimy, hasła i sygnały istnieją tylko na tym ekranie — są automatycznie czyszczone po wyjściu z modułu. Skopiuj je przyciskiem, zanim je wyczyścisz lub zamkniesz stronę.
      </q-banner>

      <!-- KRYPTONIMY -->
      <q-card class="q-mb-lg" flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-sm">
            <q-icon name="badge" class="q-mr-sm" color="primary" />Kryptonimy
          </div>

          <q-option-group
            v-model="csMode"
            :options="[
              { label: 'Według ról', value: 'roles' },
              { label: 'Motyw tematyczny', value: 'theme' },
              { label: 'Pełny los', value: 'random' }
            ]"
            type="radio"
            inline
            class="q-mb-md"
          />

          <q-select
            v-if="csMode !== 'random'"
            v-model="csTheme"
            :options="themeOptions"
            label="Motyw kryptonimów"
            outlined
            dense
            emit-value
            map-options
            class="q-mb-md"
          />

          <div v-if="csMode !== 'roles'" class="q-mb-md" style="max-width: 220px;">
            <q-input v-model.number="csCount" type="number" label="Ile kryptonimów" outlined dense min="1" max="20" />
          </div>

          <!-- Presety ról -->
          <div v-if="csMode === 'roles'" class="q-mb-md role-presets">
            <div class="text-caption text-grey-7 q-mb-sm">Role i liczba kryptonimów</div>
            <div
              v-for="(p, pi) in rolePresets"
              :key="p.key"
              class="preset-row"
            >
              <div class="preset-row__name">
                <q-input
                  v-if="editingPreset === p.key"
                  v-model="presetName"
                  dense borderless autofocus
                  @keyup.enter="savePresetName(p)"
                  @blur="savePresetName(p)"
                  class="text-body1 text-weight-medium"
                />
                <span v-else class="text-body1 text-weight-medium">{{ p.label }}</span>
              </div>
              <div class="preset-row__stepper">
                <q-btn flat round dense icon="remove" color="grey-7" size="sm" :disable="p.count <= 0" @click="p.count = Math.max(0, p.count - 1)" />
                <span class="preset-row__count">{{ p.count }}</span>
                <q-btn flat round dense icon="add" color="primary" size="sm" :disable="p.count >= p.max" @click="p.count = Math.min(p.max, p.count + 1)" />
              </div>
              <div class="preset-row__actions">
                <q-btn flat round dense icon="edit" color="grey-6" size="sm" @click="startPresetEdit(p)" />
                <q-btn flat round dense icon="delete" color="negative" size="sm" @click="rolePresets.splice(pi, 1)" />
              </div>
            </div>
            <q-btn flat dense color="primary" icon="add" label="Dodaj rolę" no-caps size="sm" class="q-mt-xs" @click="addPreset" />
          </div>

          <q-btn color="primary" icon="casino" label="Generuj kryptonimy" no-caps @click="generateCallsigns" class="q-mb-md" />

          <div v-if="callsigns.length" class="callsign-groups q-mb-xs">
            <div v-for="g in groupedCallsigns" :key="g.base" class="callsign-group q-mb-sm">
              <div class="row items-center no-wrap q-mb-xs">
                <q-input
                  v-if="editingGroup === g.base"
                  v-model="editGroupName"
                  dense borderless autofocus
                  @keyup.enter="saveGroupEdit(g.base)"
                  @blur="saveGroupEdit(g.base)"
                  class="text-subtitle2 text-primary text-weight-bold"
                  style="max-width: 160px;"
                />
                <template v-else>
                  <span class="cs-group__title">{{ g.base }}</span>
                  <span class="cs-count">{{ g.items.length }}</span>
                  <q-btn
                    v-if="g.base !== '—'"
                    flat round dense size="sm" icon="edit" color="grey-6"
                    @click="startGroupEdit(g.base)"
                  />
                </template>
                <q-space />
                <q-btn round flat size="sm" icon="remove" color="grey-7" @click="removeForRole(g.base)" />
                <q-btn round flat size="sm" icon="add" color="primary" @click="addCalls(g.base)" />
              </div>
              <div
                v-for="it in g.items"
                :key="it.id"
                class="row items-center no-wrap cs-row q-px-sm q-py-xs"
              >
                <span v-if="it.num" class="cs-num">{{ it.num }}</span>
                <div class="col cs-word">
                  <q-input
                    v-if="editingIdx === it.id"
                    v-model="editWord"
                    dense borderless autofocus
                    @keyup.enter="saveEdit(it.id)"
                    @blur="saveEdit(it.id)"
                    class="text-weight-bold text-uppercase"
                  />
                  <template v-else>
                    <span class="cs-word__text text-weight-bold text-uppercase" @click="startEdit(it.id)">{{ it.word }}</span>
                    <span class="text-caption text-grey-6 q-ml-sm">{{ it.themeLabel }}</span>
                  </template>
                </div>
                <div class="row no-wrap items-center">
                  <q-btn flat round dense size="sm" icon="edit" color="grey-6" @click="startEdit(it.id)" />
                  <q-btn flat round dense size="sm" icon="content_copy" color="grey-6" @click="copy(`${roleDisplay(it)} ${it.word}`)" />
                  <q-btn flat round dense size="sm" icon="delete" color="negative" @click="removeById(it.id)" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="callsigns.length" class="row items-center q-mt-sm q-gutter-sm">
            <q-btn flat dense color="primary" icon="content_copy" label="Kopiuj wszystkie" no-caps size="sm" @click="copyAll(callsigns.map(c => `${roleDisplay(c)} ${c.word}`))" />
            <span class="text-caption text-grey-6">{{ callsigns.length }} kryptonimów</span>
          </div>
        </q-card-section>
      </q-card>

      <!-- HASŁO I ODZEW -->
      <q-card class="q-mb-lg" flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-sm">
            <q-icon name="key" class="q-mr-sm" color="primary" />Hasło i odzew
          </div>
          <div class="row q-col-gutter-sm q-mb-md items-end">
            <div class="col-6 col-sm-4">
              <q-select v-model="pwSyllables" :options="PASSWORD_SYLLABLES" label="Liczba sylab" outlined dense emit-value map-options />
            </div>
            <div class="col-6">
              <q-btn color="primary" icon="casino" label="Generuj parę" no-caps @click="generatePassword" />
            </div>
          </div>

          <q-card v-if="password" flat bordered class="bg-grey-1">
            <q-card-section class="row items-center q-gutter-sm">
              <div class="col">
                <div class="text-caption text-grey-7">Hasło</div>
                <div class="text-h6 text-weight-bold text-uppercase">{{ password.haslo }}</div>
              </div>
              <q-icon name="swap_horiz" size="sm" color="grey-6" />
              <div class="col">
                <div class="text-caption text-grey-7">Odzew</div>
                <div class="text-h6 text-weight-bold text-uppercase">{{ password.odzew }}</div>
              </div>
              <q-btn flat round dense icon="content_copy" color="grey-6" @click="copy(`${password.haslo} – ${password.odzew}`)" />
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>

      <!-- SYGNAŁY BLIŻSZE -->
      <q-card class="q-mb-lg" flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-sm">
            <q-icon name="front_hand" class="q-mr-sm" color="primary" />Sygnał bliższy (wizualny)
          </div>
          <q-btn color="primary" icon="casino" label="Generuj sygnał" no-caps class="q-mb-md" @click="generateNear" />

          <q-card v-if="nearSignal" flat bordered class="bg-grey-1">
            <q-card-section class="row items-center q-gutter-sm">
              <q-icon :name="nearSignal.icon" size="md" color="primary" />
              <div class="col text-body1">{{ nearSignal.text }}</div>
              <q-btn flat round dense icon="content_copy" color="grey-6" @click="copy(nearSignal.text)" />
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>

      <!-- SYGNAŁY DALSZE -->
      <q-card class="q-mb-lg" flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-sm">
            <q-icon name="flare" class="q-mr-sm" color="primary" />Sygnał dalszy (wizualny)
          </div>
          <q-btn color="primary" icon="casino" label="Generuj sygnały" no-caps class="q-mb-md" @click="generateFar" />

          <template v-if="farDay || farNight">
            <q-card v-if="farDay" flat bordered class="bg-grey-1 q-mb-sm">
              <q-card-section>
                <div class="text-caption text-grey-7 q-mb-xs">Wersja dzienna</div>
                <div class="row items-center q-gutter-sm">
                  <div class="far-chip" :style="{ backgroundColor: farDay.colorHex, borderColor: farDay.colorBorder }" />
                  <div class="text-body1 text-weight-medium">{{ farDay.symbol }} {{ farDay.color }} {{ farDay.placement }}</div>
                  <q-btn flat round dense icon="content_copy" color="grey-6" @click="copy(farDay.text)" />
                </div>
              </q-card-section>
            </q-card>

            <q-card v-if="farNight" flat bordered class="bg-grey-1">
              <q-card-section>
                <div class="text-caption text-grey-7 q-mb-xs">Wersja nocna — błyski światła</div>
                <div class="row items-center q-gutter-sm">
                  <div class="row items-center q-gutter-xs">
                    <template v-for="(g, gi) in farNight.groups" :key="gi">
                      <div v-for="n in g.count" :key="gi + '-' + n" class="far-flash-dot" :style="{ backgroundColor: g.hex, boxShadow: '0 0 8px ' + g.hex }" />
                      <div v-if="gi < farNight.groups.length - 1" class="text-caption text-grey-6 q-mx-xs">—</div>
                    </template>
                  </div>
                  <div class="col text-body1 text-weight-medium">{{ farNight.text }}</div>
                  <q-btn flat round dense icon="content_copy" color="grey-6" @click="copy(farNight.text)" />
                </div>
              </q-card-section>
            </q-card>
          </template>
        </q-card-section>
      </q-card>

      <q-btn outline color="negative" icon="delete_sweep" label="Wyczyść wszystko" no-caps @click="clearAll" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { Notify } from 'quasar'
import BackNav from 'components/BackNav.vue'
import {
  CALLSIGN_THEMES, PASSWORD_WORDS, PASSWORD_SYLLABLES,
  NEAR_SIGNALS, FAR_DAY_COLORS, FAR_DAY_SYMBOLS, FAR_DAY_PLACEMENTS, FAR_NIGHT_COLORS
} from './signalsData'

// --- Kryptonimy ---
const csMode = ref('roles')
const csTheme = ref('zwierzeta')
const csCount = ref(5)
const callsigns = ref([])

// Presety ról — edytowalne nazwy, liczniki +/−, usuwanie i dodawanie
const rolePresets = reactive([
  { key: 'p1', label: 'TOC', count: 1, max: 5, numbered: false },
  { key: 'p2', label: 'D-ca', count: 2, max: 9, numbered: true },
  { key: 'p3', label: 'Puton', count: 1, max: 9, numbered: true },
  { key: 'p4', label: 'Sekcja', count: 2, max: 9, numbered: true },
  { key: 'p5', label: 'Okólnik', count: 1, max: 5, numbered: false, okolnik: true },
  { key: 'p6', label: 'Własny', count: 0, max: 9, numbered: true }
])

const editingPreset = ref(null)
const presetName = ref('')

function startPresetEdit (p) {
  editingPreset.value = p.key
  presetName.value = p.label
}

function savePresetName (p) {
  const name = presetName.value.trim()
  if (name) p.label = name
  editingPreset.value = null
}

function addPreset () {
  rolePresets.push({
    key: 'p' + Date.now(),
    label: 'Nowa rola',
    count: 1,
    max: 9,
    numbered: true
  })
}

const themeOptions = CALLSIGN_THEMES.map(t => ({ label: t.label, value: t.key }))

function pick (arr) { return arr[Math.floor(Math.random() * arr.length)] }
function shuffle (arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateCallsigns () {
  // Motyw: z wyboru albo losowy (jeden losowy dla wszystkich — spójny tematycznie)
  const theme = csMode.value === 'random'
    ? pick(CALLSIGN_THEMES)
    : (CALLSIGN_THEMES.find(t => t.key === csTheme.value) || CALLSIGN_THEMES[0])
  const words = shuffle(theme.words)

  const items = []

  if (csMode.value === 'roles') {
    const tasks = rolePresets.map(p => ({ base: p.label, count: p.count, numbered: p.numbered, okolnik: p.okolnik }))
    tasks.forEach(t => {
      const n = Math.min(9, Math.max(0, Number(t.count) || 0))
      for (let i = 1; i <= n; i++) {
        items.push({ base: t.base, num: (t.numbered || n > 1) ? i : null, themeLabel: theme.label, okolnik: t.okolnik })
      }
    })
    if (!items.length) {
      Notify.create({ type: 'warning', message: 'Ustaw liczbę kryptonimów dla przynajmniej jednej roli' })
      callsigns.value = []
      return
    }
  } else {
    const count = Math.min(20, Math.max(1, Number(csCount.value) || 1))
    for (let i = 0; i < count; i++) items.push({ base: null, num: null, themeLabel: theme.label })
  }

  // Przydziel słowa — Okólnik ze zbiorczej puli motywu (zoo, cyrk, ocean…)
  const okolnikWords = shuffle(theme.okolnik || theme.words)
  let wIdx = 0
  let oIdx = 0
  const result = items.map((it) => ({
    ...it,
    id: nextId++,
    word: it.okolnik
      ? okolnikWords[oIdx++ % okolnikWords.length]
      : words[wIdx++ % words.length]
  }))
  callsigns.value = result
  lastTheme.value = theme
  editingIdx.value = -1
}

// --- Edycja / dodawanie / usuwanie kryptonimów ---
const editingIdx = ref(-1)
const editWord = ref('')
const lastTheme = ref(null)
let nextId = 1

// Wyświetlana rola: „D-ca 1”, „TOC” lub pusta
function roleDisplay (cs) {
  return cs.num ? `${cs.base} ${cs.num}` : (cs.base || '')
}

// Grupowanie wyników po roli (zachowuje kolejność pierwszego wystąpienia)
const groupedCallsigns = computed(() => {
  const groups = []
  const byBase = new Map()
  callsigns.value.forEach(cs => {
    const base = cs.base || '—'
    if (!byBase.has(base)) {
      const g = { base, items: [] }
      byBase.set(base, g)
      groups.push(g)
    }
    byBase.get(base).items.push(cs)
  })
  return groups
})

function startEdit (id) {
  editingIdx.value = id
  editWord.value = callsigns.value.find(c => c.id === id)?.word || ''
}

function saveEdit (id) {
  const w = editWord.value.trim()
  const cs = callsigns.value.find(c => c.id === id)
  if (cs && w) cs.word = w.toLowerCase()
  editingIdx.value = -1
}

function addCalls (base) {
  const theme = lastTheme.value
  if (!theme) return
  const groupItems = callsigns.value.filter(c => (c.base || '—') === base)
  const hasNums = groupItems.some(c => c.num)
  const nextNum = hasNums ? Math.max(...groupItems.map(c => c.num)) + 1 : null
  const pool = groupItems.some(c => c.okolnik) ? (theme.okolnik || theme.words) : theme.words
  const used = new Set(callsigns.value.map(c => c.word))
  const free = pool.filter(w => !used.has(w))
  const word = free.length ? pick(free) : pick(pool)
  callsigns.value.push({
    id: nextId++,
    base: base === '—' ? null : base,
    num: nextNum,
    word,
    themeLabel: theme.label,
    okolnik: groupItems.some(c => c.okolnik)
  })
}

function removeForRole (base) {
  for (let i = callsigns.value.length - 1; i >= 0; i--) {
    if ((callsigns.value[i].base || '—') === base) {
      callsigns.value.splice(i, 1)
      return
    }
  }
}

function removeById (id) {
  const i = callsigns.value.findIndex(c => c.id === id)
  if (i >= 0) callsigns.value.splice(i, 1)
  if (editingIdx.value === id) editingIdx.value = -1
}

// --- Edycja nazwy roli (cała grupa) ---
const editingGroup = ref(null)
const editGroupName = ref('')

function startGroupEdit (base) {
  editingGroup.value = base
  editGroupName.value = base
}

function saveGroupEdit (oldBase) {
  const name = editGroupName.value.trim()
  if (name && name !== oldBase) {
    callsigns.value.forEach(cs => {
      if ((cs.base || '—') === oldBase) cs.base = name
    })
  }
  editingGroup.value = null
}

// --- Hasło i odzew ---
const pwSyllables = ref(3)
const password = ref(null)

function generatePassword () {
  const pool = PASSWORD_WORDS[pwSyllables.value] || PASSWORD_WORDS[3]
  const haslo = pick(pool)
  let odzew = pick(pool)
  while (odzew === haslo && pool.length > 1) odzew = pick(pool)
  password.value = { haslo, odzew }
}

// --- Sygnał bliższy ---
const nearSignal = ref(null)

function generateNear () {
  nearSignal.value = pick(NEAR_SIGNALS)
}

// --- Sygnał dalszy ---
const farDay = ref(null)
const farNight = ref(null)

function generateFar () {
  const color = pick(FAR_DAY_COLORS)
  const symbol = pick(FAR_DAY_SYMBOLS)
  const placement = pick(FAR_DAY_PLACEMENTS)
  const colorCap = color.key.charAt(0).toUpperCase() + color.key.slice(1)
  farDay.value = {
    color: color.key,
    colorHex: color.hex,
    colorBorder: color.border,
    symbol,
    placement,
    text: `${colorCap} ${symbol} ${placement}`
  }

  const nightGroups = []
  const n = 2 + Math.floor(Math.random() * 3) // 2-4 grupy
  for (let i = 0; i < n; i++) {
    nightGroups.push({ ...pick(FAR_NIGHT_COLORS), count: 1 + Math.floor(Math.random() * 3) })
  }
  farNight.value = {
    groups: nightGroups,
    text: nightGroups.map(g => `${g.count}× ${g.key}`).join(' — ') + ' (błyski)'
  }
}

// --- Clipboard / clear ---
async function copy (text) {
  try {
    await navigator.clipboard.writeText(text)
    Notify.create({ type: 'positive', message: 'Skopiowano', timeout: 1200 })
  } catch {
    Notify.create({ type: 'negative', message: 'Nie udało się skopiować' })
  }
}

function copyAll (items) {
  copy(items.join('\n'))
}

function clearAll () {
  callsigns.value = []
  password.value = null
  nearSignal.value = null
  farDay.value = null
  farNight.value = null
  editingIdx.value = -1
  lastTheme.value = null
}

// Automatyczne czyszczenie po wyjściu z modułu
onBeforeUnmount(() => {
  clearAll()
})
</script>

<style scoped>
/* Wyniki kryptonimów — czyste karty grup w stylu aplikacji */
.callsign-group {
  border: 1px solid var(--app-border, rgba(0, 0, 0, 0.12));
  border-radius: 12px;
  padding: 10px 12px;
  background: var(--app-surface-2, rgba(0, 0, 0, 0.02));
}

.cs-group__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--app-primary, #2f5d50);
  letter-spacing: 0.02em;
}

.cs-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  margin-left: 8px;
  border-radius: 999px;
  background: var(--app-primary, #2f5d50);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
}

.cs-row {
  border-bottom: 1px solid var(--app-border, rgba(0, 0, 0, 0.08));
  min-height: 48px;
}

.cs-row:last-child {
  border-bottom: none;
}

.cs-num {
  min-width: 22px;
  color: var(--app-text-muted, #617080);
  font-size: 0.85rem;
}

.cs-word {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cs-word__text {
  letter-spacing: 0.06em;
  font-size: 1.05rem;
  cursor: pointer;
}

/* Cele dotykowe ≥40px na mobile */
.role-presets .q-btn,
.callsign-group .q-btn {
  min-width: 40px;
  min-height: 40px;
}

/* Presety ról — zwarte wiersze */
.role-presets {
  border: 1px solid var(--app-border, rgba(0, 0, 0, 0.1));
  border-radius: 12px;
  padding: 8px 12px;
  background: var(--app-surface-2, rgba(0, 0, 0, 0.02));
}

.preset-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 1px solid var(--app-border, rgba(0, 0, 0, 0.06));
}

.preset-row:last-of-type {
  border-bottom: none;
}

.preset-row__name {
  flex: 1;
  min-width: 0;
}

.preset-row__stepper {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.preset-row__count {
  min-width: 26px;
  text-align: center;
  font-size: 1.05rem;
  font-weight: 700;
}

.preset-row__actions {
  display: flex;
  flex-shrink: 0;
  margin-left: 4px;
}

.far-chip {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 3px solid;
  flex-shrink: 0;
}

.far-flash-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
