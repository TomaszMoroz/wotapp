<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-md">📋 Wzory Meldunków</div>

    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <q-card>
          <q-card-section>
            <div class="text-h6 q-mb-md">� Wybierz wzór meldunku</div>

            <q-select
              v-model="selectedReport"
              :options="sortedReports"
              label="Wyszukaj i wybierz meldunek"
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="name"
              option-value="id"
              @filter="filterReports"
              @update:model-value="onReportSelected"
              class="q-mb-md"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Brak wyników wyszukiwania
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" :color="scope.opt.color" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.category }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>
        </q-card>

        <!-- Prezentacja wybranego meldunku -->
        <div v-if="selectedReport" class="q-mt-lg">
          <q-card class="shadow-5">
            <q-card-section class="bg-primary text-white">
              <div class="row items-center">
                <div class="col">
                  <div class="text-h5 q-mb-xs">{{ selectedReport.name }}</div>
                  <q-chip
                    :icon="selectedReport.icon"
                    :color="selectedReport.color"
                    text-color="white"
                    size="sm"
                  >
                  >
                    {{ selectedReport.category }}
                  </q-chip>
                </div>
                <div class="col-auto">
                  <q-avatar size="48px" :color="selectedReport.color" text-color="white">
                    <q-icon :name="selectedReport.icon" size="24px" />
                  </q-avatar>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="row items-center q-mb-md">
                <q-icon name="description" color="grey-6" size="20px" class="q-mr-sm" />
                <div class="text-h6 text-grey-8">Treść meldunku</div>
              </div>

              <q-card bordered class="bg-grey-1">
                <q-card-section>
                  <pre class="report-text">{{ selectedReport.content }}</pre>
                </q-card-section>
              </q-card>
            </q-card-section>

            <q-separator v-if="selectedReport.instructions" />

            <q-card-section v-if="selectedReport.instructions" class="bg-blue-1">
              <div class="row items-center q-mb-md">
                <q-icon name="lightbulb" color="blue-8" size="20px" class="q-mr-sm" />
                <div class="text-h6 text-blue-8">Instrukcje wypełnienia</div>
              </div>
              <q-banner inline-actions class="bg-blue-2 text-blue-9">
                {{ selectedReport.instructions }}
                <template v-slot:action>
                  <q-btn flat color="blue-8" icon="info" size="sm" />
                </template>
              </q-banner>
            </q-card-section>

            <q-separator />

            <q-card-actions align="between" class="q-pa-md">
              <q-chip icon="schedule" color="grey-4" text-color="grey-8" size="sm">
                Wzór NATO
              </q-chip>

              <div class="row q-gutter-sm">
                <q-btn
                  unelevated
                  color="primary"
                  icon="content_copy"
                  label="Kopiuj"
                  @click="copyToClipboard"
                  size="sm"
                />
                <q-btn
                  unelevated
                  color="green"
                  icon="print"
                  label="Drukuj"
                  @click="printReport"
                  size="sm"
                />
              </div>
            </q-card-actions>
          </q-card>
        </div>

        <!-- Stan początkowy -->
        <div v-else class="q-mt-lg">
          <q-card class="text-center q-pa-lg">
            <q-card-section>
              <q-avatar size="80px" color="grey-3" text-color="grey-6">
                <q-icon name="description" size="40px" />
              </q-avatar>

              <div class="text-h6 text-grey-6 q-mt-md q-mb-sm">
                Wybierz wzór meldunku z listy powyżej
              </div>

              <q-chip color="grey-4" text-color="grey-8" icon="info">
                Dostępnych jest {{ allReports.length }} wzorów meldunków
              </q-chip>

              <q-separator class="q-my-md" />

              <div class="row justify-center q-gutter-md">
                <q-chip
                  v-for="category in ['Meldunki taktyczne', 'Meldunki logistyczne', 'Meldunki operacyjne']"
                  :key="category"
                  color="blue-1"
                  text-color="blue-8"
                  size="sm"
                  icon="folder"
                >
                >
                  {{ category }}
                </q-chip>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

defineOptions({
  name: 'ReportsPage'
})

const $q = useQuasar()

// Dane aplikacji
const selectedReport = ref(null)
const filteredOptions = ref([])

// Wszystkie wzory meldunków - alfabetycznie sortowane
const allReports = [
  {
    id: 7,
    name: 'SALUTE - Obserwacja przeciwnika',
    category: 'Meldunki taktyczne',
    icon: 'visibility',
    color: 'red',
    content: `MELDUNEK SALUTE - OBSERWACJA PRZECIWNIKA

Data: [DATA]
Godzina: [GODZINA]
Obserwator: [STOPIEŃ, NAZWISKO]
Pozycja obserwatora: [GRID/WSPÓŁRZĘDNE]

S (SIZE) - LICZEBNOŚĆ:
[LICZBA ŻOŁNIERZY/POJAZDÓW]

A (ACTIVITY) - AKTYWNOŚĆ:
[OPIS CZYNNOŚCI PRZECIWNIKA]

L (LOCATION) - LOKALIZACJA:
[GRID/WSPÓŁRZĘDNE PRZECIWNIKA]

U (UNIFORMS) - MUNDURY:
[OPIS UMUNDUROWANIA/OZNAKOWANIA]

T (TIME) - CZAS:
[CZAS OBSERWACJI]

E (EQUIPMENT) - SPRZĘT:
[LISTA ZAUWAŻONEGO SPRZĘTU]

DODATKOWE INFORMACJE:
[KIERUNEK PRZEMIESZCZANIA, ZACHOWANIE]

Przykład: 4 rozbijają obóz GRID 12345 67890 Szwedzkie 1200 4 x AUG, 1 x Carl Gustaf M4

Meldunek złożył: [STOPIEŃ, NAZWISKO]`,
    instructions: 'Używaj do raportowania zaobserwowanej aktywności przeciwnika. Przekazuj przez RTO do TOC. Bądź precyzyjny w opisie lokalizacji i sprzętu.'
  },
  {
    id: 8,
    name: 'SALTR - Kontakt z przeciwnikiem',
    category: 'Meldunki taktyczne',
    icon: 'warning',
    color: 'red',
    content: `MELDUNEK SALTR - KONTAKT Z PRZECIWNIKIEM

Data: [DATA]
Godzina: [GODZINA]
Dowódca: [STOPIEŃ, NAZWISKO]
Pozycja własna: [GRID/WSPÓŁRZĘDNE]

S (SITUATION) - SYTUACJA SIŁ WŁASNYCH:
[OPIS STANU WŁASNEGO ODDZIAŁU]

A (ACTION) - AKCJE PRZECIWNIKA:
[OPIS DZIAŁAŃ NIEPRZYJACIELA]

L (LOCATION) - LOKALIZACJA KONTAKTU:
[GRID/WSPÓŁRZĘDNE MIEJSCA KONTAKTU]

T (TIME) - CZAS KONTAKTU:
[CZAS NAWIĄZANIA KONTAKTU]

R (REACTION) - REAKCJA SIŁ WŁASNYCH:
[OPIS PODEJMOWANYCH DZIAŁAŃ]

STAN WŁASNY:
- Ranni: [LICZBA]
- KIA: [LICZBA]
- Sprzęt uszkodzony: [LISTA]

WSPARCIE:
[POTRZEBNE WSPARCIE/EWAKUACJA]

Przykład: Zostaliśmy zaatakowani przez przeciwnika w sile drużyny. Przeciwnik prowadzi lekki ogień z broni strzeleckiej oraz prowadzi ostrzał moździerzowy. GRID to 12345 67890. Czas to 0500. Zajęliśmy pozycje obronne, Alfa flankuje przeciwnika od zachodu.

Meldunek złożył: [STOPIEŃ, NAZWISKO]`,
    instructions: 'Używaj po nawiązaniu kontaktu z przeciwnikiem (także ogniowego). Przekazuj natychmiast przez RTO do TOC w celu aktualizacji sytuacji.'
  },
  {
    id: 9,
    name: 'LACE - Stan gotowości bojowej',
    category: 'Meldunki logistyczne',
    icon: 'inventory_2',
    color: 'orange',
    content: `MELDUNEK LACE - STAN GOTOWOŚCI BOJOWEJ

Data: [DATA]
Godzina: [GODZINA]
Jednostka: [NAZWA JEDNOSTKI]
Raportuje: [STOPIEŃ, NAZWISKO]

L (LIQUIDS) - PŁYNY/WYŻYWIENIE:
- Woda: [ZIELONY/ŻÓŁTY/CZERWONY] ([PROCENT]%)
- Racje żywnościowe: [ZIELONY/ŻÓŁTY/CZERWONY] ([PROCENT]%)

A (AMMUNITION) - AMUNICJA:
- 5.56mm: [ZIELONY/ŻÓŁTY/CZERWONY] ([PROCENT]%)
- 7.62mm: [ZIELONY/ŻÓŁTY/CZERWONY] ([PROCENT]%)
- Granaty: [ZIELONY/ŻÓŁTY/CZERWONY] ([PROCENT]%)
- Inne: [LISTA Z KOLORAMI]

C (CASUALTIES) - STRATY:
- Ranni: [LICZBA] (stan: [OPIS])
- KIA: [LICZBA]
- Chorzy: [LICZBA]

E (EQUIPMENT) - SPRZĘT:
- Sprawny: [LISTA]
- Uszkodzony: [LISTA]
- Utracony: [LISTA]

KODY KOLORÓW:
🟢 Zielony: 70-100%
🟡 Żółty: 30-70%
🔴 Czerwony: 0-30%

GOTOWOŚĆ OGÓLNA: [ZIELONY/ŻÓŁTY/CZERWONY]

Meldunek złożył: [STOPIEŃ, NAZWISKO]`,
    instructions: 'Raportuj po kontakcie ogniowym lub zakończeniu misji. Zbierz dane od operatorów indywidualnie. Podsumowanie wysyłaj przez RTO do TOC.'
  },
  {
    id: 10,
    name: 'GOTWA - Wydzielenie sił',
    category: 'Meldunki proceduralne',
    icon: 'group_work',
    color: 'blue',
    content: `MELDUNEK GOTWA - WYDZIELENIE SIŁ

Data: [DATA]
Godzina: [GODZINA]
Przekazuje: [STOPIEŃ, NAZWISKO]
Odbiera: [STOPIEŃ, NAZWISKO]

G (GOING) - GDZIE IDZIEMY:
[DOKŁADNE MIEJSCE DOCELOWE/GRID]

O (OTHERS) - Z KIM IDZIEMY:
[LISTA OSÓB W GRUPIE]

T (TIME) - CZAS POWROTU:
[PLANOWANY CZAS POWROTU]

W (WHAT) - CO ROBIĆ W PRZYPADKU PROBLEMÓW:
[INSTRUKCJE DLA POZOSTAJĄCYCH]

A (ACTION) - DZIAŁANIA W PRZYPADKU ATAKU:
[PROCEDURY AWARYJNE]

ŁĄCZNOŚĆ:
- Częstotliwość: [CZĘSTOTLIWOŚĆ]
- Hasła: [HASŁA ROZPOZNAWCZE]
- Check-in co: [CZAS] minut

RV (PUNKT ZBORNY):
[LOKALIZACJA ZAPASOWA]

Przykład: Ramzes, biorę RTO i kaemistę i idziemy sprawdzić teren pod punkt obserwacyjny. Wrócimy najpóźniej o 1430. Jeśli nie wrócimy do tego czasu, przejmujesz dowodzenie – skontaktuj się z TOC i raportuj sytuację. Jeśli zostaniecie zaatakowani, wycofajcie się do RV i czekajcie na nas do 1500.

Meldunek przekazał: [STOPIEŃ, NAZWISKO]`,
    instructions: 'Używaj przy odłączaniu jednostki od głównych sił. Osoba wydzielająca przekazuje info do C2, C2 wydzielający się - do kolejnej osoby w łańcuchu dowodzenia.'
  },
  {
    id: 11,
    name: 'SLLS - Zatrzymanie i czuwanie',
    category: 'Meldunki proceduralne',
    icon: 'pause_circle',
    color: 'green',
    content: `PROCEDURA SLLS - ZATRZYMANIE I CZUWANIE

Data: [DATA]
Godzina rozpoczęcia: [GODZINA]
Pozycja: [GRID/WSPÓŁRZĘDNE]
Dowódca: [STOPIEŃ, NAZWISKO]

S (STOP) - ZATRZYMAJ SIĘ:
✓ Oddział zatrzymany
✓ Pozycje zabezpieczone
✓ Obserwatorzy wystawieni

L (LISTEN) - NASŁUCHUJ:
Czas nasłuchiwania: [MINUTY] min
Odgłosy wykryte:
□ Brak podejrzanych dźwięków
□ Wykryto: [OPIS DŹWIĘKÓW]

L (LOOK) - OBSERWUJ:
Czas obserwacji: [MINUTY] min
Obserwacje:
□ Brak ruchu przeciwnika
□ Wykryto: [OPIS OBSERWACJI]

S (SMELL) - WĘSZ/CZUJNOŚĆ:
Wykryte zapachy:
□ Brak podejrzanych zapachów
□ Wykryto: [OPIS - DYM, SPALINY, ETC.]

WYNIK PROCEDURY:
□ Teren bezpieczny - kontynuacja marszu
□ Wykryto aktywność - zmiana trasy
□ Podejrzenia - przedłużenie obserwacji

CZAS ZAKOŃCZENIA: [GODZINA]
DECYZJA: [OPIS DALSZYCH DZIAŁAŃ]

UWAGI:
[DODATKOWE SPOSTRZEŻENIA]

Procedurę przeprowadził: [STOPIEŃ, NAZWISKO]`,
    instructions: 'Stosuj co kilka/kilkanaście minut marszu w rejonie wysokiego ryzyka. Pozwala zidentyfikować czy obecność została wykryta przez przeciwnika.'
  }
]

// Computed properties
const sortedReports = computed(() => {
  if (filteredOptions.value.length > 0) {
    return filteredOptions.value
  }
  return [...allReports].sort((a, b) => a.name.localeCompare(b.name))
})

// Metody
const filterReports = (val, update) => {
  update(() => {
    if (val === '') {
      filteredOptions.value = allReports
    } else {
      const needle = val.toLowerCase()
      filteredOptions.value = allReports.filter(report =>
        report.name.toLowerCase().includes(needle) ||
        report.category.toLowerCase().includes(needle)
      )
    }
  })
}

const onReportSelected = (report) => {
  selectedReport.value = report
}

const copyToClipboard = async () => {
  if (selectedReport.value) {
    try {
      await navigator.clipboard.writeText(selectedReport.value.content)
      $q.notify({
        color: 'green',
        message: 'Tekst meldunku został skopiowany do schowka',
        icon: 'content_copy'
      })
    } catch (err) {
      $q.notify({
        color: 'red',
        message: 'Błąd kopiowania do schowka',
        icon: 'error'
      })
    }
  }
}

const printReport = () => {
  if (selectedReport.value) {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedReport.value.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1976d2; }
            pre { white-space: pre-wrap; font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <h1>${selectedReport.value.name}</h1>
          <h2>${selectedReport.value.category}</h2>
          <pre>${selectedReport.value.content}</pre>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }
}

onMounted(() => {
  filteredOptions.value = allReports
})
</script>

<style scoped>
/* Minimalne style - głównie używamy natywnych komponentów Quasar */

.report-text {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
  color: #37474f;
  margin: 0;
  white-space: pre-wrap;
  background: transparent;
}

/* Responsywność */
@media (max-width: 768px) {
  .report-text {
    font-size: 12px;
  }
}

/* Smooth transitions dla lepszego UX */
.q-card {
  transition: all 0.3s ease;
}

.q-btn {
  transition: all 0.2s ease;
}
</style>
