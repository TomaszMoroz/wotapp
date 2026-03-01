<template>
  <q-page class="page-background">
    <div class="container q-pa-sm">

      <div class="row justify-center">
        <div class="col-12 col-md-8 col-lg-6">
          <BackNav color="black"/>
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
                dropdown-auto-width
                popup-content-class="meldunki-dropdown-full"
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
              <q-card-section :class="[$q.dark.isActive ? 'bg-grey-5 text-white' : 'bg-primary text-white']">
                <div class="row items-center">
                  <div class="col">
                    <div class="text-h5 q-mb-xs">{{ selectedReport.name }}</div>
                    <q-chip
                      :icon="selectedReport.icon"
                      :color="selectedReport.color"
                      text-color="white"
                      size="sm"
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
                  <q-space />

                </div>

                <q-card class="modern-report-container bg-grey-4" bordered>
                  <q-card-section>
                    <div class="row items-center bg-grey-3">
                      <q-icon name="military_tech" color="primary" size="18px" class="q-mr-sm" />
                      <span class="text-caption text-primary font-weight-medium">
                        DOKUMENT SŁUŻBOWY
                      </span>
                      <q-space />
                      <q-chip size="xs" color="black" text-color="white" icon="schedule">
                        Wzór
                      </q-chip>
                    </div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="report-content-modern">
                    <div class="report-text-wrapper">
                      <pre class="report-text">{{ selectedReport.content }}</pre>
                    </div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="report-footer">
                    <div class="row items-center text-caption text-grey-6">
                      <q-icon name="info" size="14px" class="q-mr-xs" />
                      Wypełnij pola oznaczone [NAWIASAMI KWADRATOWYMI]
                      <q-space />
                      <q-icon name="security" size="14px" class="q-mr-xs" />
                    </div>
                  </q-card-section>
                </q-card>
              </q-card-section>

              <q-separator />

              <q-card-actions align="between" class="q-pa-md">
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
                    v-for="category in ['Meldunki medyczne', 'Meldunki taktyczne', 'Meldunki logistyczne', 'Meldunki operacyjne']"
                    :key="category"
                    color="blue-1"
                    text-color="blue-8"
                    size="sm"
                    icon="folder"
                  >
                    {{ category }}
                  </q-chip>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Dane aplikacji
const selectedReport = ref(null)
const filteredOptions = ref([])

// Wszystkie wzory meldunków - alfabetycznie sortowane
const allReports = [
  {
    id: 2,
    name: 'MIST REPORT - Raport medyczny',
    category: 'Meldunki medyczne',
    icon: 'healing',
    color: 'pink',
    content: `RAPORT M.I.S.T. - RAPORT MEDYCZNY

M (MECHANISM OF INJURY) - MECHANIZM URAZU:
   [OPIS JAK DOSZŁO DO URAZU]

I (INJURIES SUSTAINED) - ODNIESIONE URAZY:
   [SZCZEGÓŁOWY OPIS OBRAŻEŃ]

S (SIGNS AND SYMPTOMS) - OBJAWY, PARAMETRY ŻYCIOWE:
   [TĘTNO, CIŚNIENIE, ODDECH, ŚWIADOMOŚĆ]

T (TREATMENT GIVEN) - ZASTOSOWANE LECZENIE:
   [LISTA WYKONANYCH CZYNNOŚCI MEDYCZNYCH]

DODATKOWE INFORMACJE:
- Czas urazu: [CZAS]
- Wiek poszkodowanego: [WIEK]
- Alergies: [ALERGIE]
- Medications: [LEKI]
- Past medical history: [HISTORIA CHORÓB]
- Last oral intake: [OSTATNI POSIŁEK]

Przykład:
M: Odłamek granatu w prawą nogę
I: Rana odłamkowa uda prawego, krwawienie zewnętrzne
S: Tętno 110/min, świadomość przytomna, ból 8/10
T: Opatrunek uciskowy, podano morfina 10mg`
  },
  {
    id: 3,
    name: 'MELDUNEK MEDEVAC',
    category: 'Meldunki medyczne',
    icon: 'emergency',
    color: 'pink',
    content: `MELDUNEK MEDEVAC - EWAKUACJA MEDYCZNA

1. WSPÓŁRZĘDNE PUNKTU PODJĘCIA:
   [GRID/WSPÓŁRZĘDNE]

2. CZ. RADIOWA, KRYPTONIM, CRYPTO/PLAINTEXT:
   [CZĘSTOTLIWOŚĆ, ZNAK WYWOŁAWCZY]

3. LICZBA PACJENTÓW ZE WZGLĘDU NA PRIORYTET:
   A - pilny (2h) B - priorytetowy (4h) C - rutynowy (24h)
   [LICZBA W KAŻDEJ KATEGORII]

4. SPRZĘT SPECJALISTYCZNY:
   A - brak  B - wyciągarka  C - sprzęt ekstrakcyjny  D - respirator
   [POTRZEBNY SPRZĘT]

5. LICZBA PACJENTÓW ZE WZGLĘDU NA TYP:
   L - leżący    A - siedzący
   [NA NOSZACH / CHODZĄCY]

6. BEZPIECZEŃSTWO W REJONIE PODJĘCIA:
   N - brak npl.  P - możliwy npl.  E - wróg w rejonie  X - kontakt ogniowy
   [SYTUACJA TAKTYCZNA]

7. OZNACZENIE PUNKTU PODJĘCIA:
   A - panel B - pirotechnika C - dym D - brak E - inne
   [SPOSÓB OZNAKOWANIA]

8. LICZBA PACJENTÓW - STATUS:
   A - żołnierz koalicji  B - cywil koalicji  C - żołnierz spoza koalicji  D - cywil  E - jeniec/HVT
   [STATUS RANNYCH]

9. ZAGROŻENIE NBC, OPIS TERENU, UZUPEŁNIENIE APTECZKI:
   [DODATKOWE INFORMACJE]

Przykład: 1: GRID 12345 67890  2: 30.000 ALFA21  3: 2A, 1B  4: A  5: 2L, 1A  6: N  7: C  8: 3A  9: Teren równy, las iglasty`
  },
  {
    id: 7,
    name: 'SALUTE - Obserwacja przeciwnika',
    category: 'Meldunki taktyczne',
    icon: 'visibility',
    color: 'red-4',
    content: `MELDUNEK SALUTE - OBSERWACJA PRZECIWNIKA

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

Przykład: 4 rozbijają obóz GRID 12345 67890 Szwedzkie 1200 4 x AUG, 1 x Carl Gustaf M4`
  },
  {
    id: 8,
    name: 'SALTR - Kontakt z przeciwnikiem',
    category: 'Meldunki taktyczne',
    icon: 'warning',
    color: 'red-4',
    content: `MELDUNEK SALTR - KONTAKT Z PRZECIWNIKIEM

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

Przykład: Zostaliśmy zaatakowani przez przeciwnika w sile drużyny. Przeciwnik prowadzi lekki ogień z broni strzeleckiej oraz prowadzi ostrzał moździerzowy. GRID to 12345 67890. Czas to 0500. Zajęliśmy pozycje obronne, Alfa flankuje przeciwnika od zachodu.`
  },
  {
    id: 15,
    name: 'SAS',
    category: 'Meldunki taktyczne',
    icon: 'report_problem',
    color: 'red-4',
    content: `MELDUNEK SAS
  S – STRATY/STAN:
    [STRATY W LUDZIACH – ranni, KIA]

  A – AMUNICJA:
    [STAN AMUNICJI]

  S – SPRZĘT:
    [STRATY W SPRZĘCIE NIEZBĘDNYM DO WYKONANIA ZADANIA]`
  },
  {
    id: 9,
    name: 'LACE - Stan gotowości bojowej',
    category: 'Meldunki logistyczne',
    icon: 'inventory_2',
    color: 'orange-5',
    content: `MELDUNEK LACE - STAN GOTOWOŚCI BOJOWEJ

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

GOTOWOŚĆ OGÓLNA: [ZIELONY/ŻÓŁTY/CZERWONY]`
  },
  {
    id: 10,
    name: 'GOTWA - Wydzielenie sił',
    category: 'Meldunki proceduralne',
    icon: 'group_work',
    color: 'blue-5',
    content: `MELDUNEK GOTWA - WYDZIELENIE SIŁ

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

Przykład: Ramzes, biorę RTO i kaemistę i idziemy sprawdzić teren pod punkt obserwacyjny. Wrócimy najpóźniej o 1430. Jeśli nie wrócimy do tego czasu, przejmujesz dowodzenie – skontaktuj się z TOC i raportuj sytuację. Jeśli zostaniecie zaatakowani, wycofajcie się do RV i czekajcie na nas do 1500.`
  },
  {
    id: 11,
    name: 'SITREP - Raport stanu drużyny',
    category: 'Meldunki operacyjne',
    icon: 'fact_check',
    color: 'teal-6',
    content: `SITREP - RAPORT DOTYCZĄCY AKTUALNEGO STANU DRUŻYNY

1. DATA/CZAS:
   [DATA, GODZINA]

2. POZYCJA:
   [GRID/WSPÓŁRZĘDNE]

3. STAN OSOBOWY:
   [LICZBA ŻOŁNIERZY, RANNI, KIA]

4. STAN AMUNICJI:
   [OPIS, PROCENTY, BRAKI]

5. STAN SPRZĘTU:
   [SPRAWNY/USZKODZONY, BRAKI]

6. DZIAŁANIA W TOKU:
   [KRÓTKI OPIS]

7. UWAGI:
   [DODATKOWE INFORMACJE]`
  },
  {
    id: 12,
    name: 'UXO/IED SPOTREP - Niewybuch/Ładunek',
    category: 'Meldunki operacyjne',
    icon: 'report_problem',
    color: 'teal-6',
    content: `UXO/IED SPOTREP - RAPORT DOTYCZĄCY ODKRYCIA NIEWYBUCHU / IMPROWIZOWANEGO ŁADUNKU WYBUCHOWEGO

1. WSPÓŁRZĘDNE PUNKTU PODJĘCIA:
   [GRID/WSPÓŁRZĘDNE]

2. CZ. RADIOWA, KRYPTONIM, CRYPTO/PLAINTEXT:
   [CZĘSTOTLIWOŚĆ, ZNAK WYWOŁAWCZY]

3. OPIS OBIEKTU:
   [RODZAJ, KSZTAŁT, WIELKOŚĆ, OZNACZENIA]

4. ZAGROŻENIE:
   [OPIS ZAGROŻENIA, DYSTANS BEZPIECZEŃSTWA]

5. PODJĘTE DZIAŁANIA:
   [ZABEZPIECZENIE, OZNACZENIE, EWAKUACJA]

6. UWAGI:
   [DODATKOWE INFORMACJE]`
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
body.body--dark .q-card,
body.body--dark .modern-report-container,
body.body--dark .report-text-wrapper {
  background: #232526 !important;
  color: #f2f2f2 !important;
  border-color: #444950 !important;
}
body.body--dark .report-text {
  background: transparent !important;
  color: #f2f2f2 !important;
}
body.body--dark .report-footer {
  background: #232526 !important;
  color: #bdbdbd !important;
  border-top: 1px solid #444950 !important;
}

body.body--dark .bg-grey-5.text-white,
body.body--dark .bg-grey-5 .text-h5,
body.body--dark .bg-grey-5 {
  color: #2e2e2e !important;
}

  .meldunki-dropdown-full {
    max-height: none !important;
    height: auto !important;
  }
  .hero-section, .page-header {
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    color: #232b23;
    box-shadow: 0 4px 16px rgba(44,62,47,0.07);
    border-radius: 12px;
    margin-bottom: 2rem;
    padding: 1.5rem;
    text-align: center;
  }
  .hero-section .text-h3,
  .hero-section .text-h4,
  .hero-section .text-h5,
  .hero-section .text-h6,
  .page-header .text-h3,
  .page-header .text-h4,
  .page-header .text-h5,
  .page-header .text-h6 {
    color: #232b23 !important;
  }

.modern-report-container {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(185, 188, 185, 0.08);
  border: 1.5px solid #bdbdbd;
  background: #f7f7f9;
  transition: box-shadow 0.3s, background 0.3s;
}
@media (prefers-color-scheme: dark) {
  .modern-report-container {
    background: #232b23;
    border: 1.5px solid #bdbdbd;
    box-shadow: 0 8px 32px rgba(44,62,47,0.18);
  }
}

.report-header {
  background: #f8f9fa;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.2px;
  color: #232b23;
}
@media (prefers-color-scheme: dark) {
  .report-header {
    background: #232b23;
    border-bottom: 1px solid #384c38;
    color: #f5f7fa;
  }
}

.report-content-modern {
  background: transparent;
  padding: 0;
  position: relative;
}

.report-text-wrapper {
  background: #f7f7f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: none;
}
@media (prefers-color-scheme: dark) {
  .report-text-wrapper {
    background: #f7f7f9;
    border-color: #e0e0e0;
  }
}

.report-text-wrapper::before {
  display: none;
}

.report-text {
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #070907;
  margin: 0;
  padding: 20px;
  white-space: pre-wrap;
  background: transparent;
  border: none;
  font-weight: 400;
  letter-spacing: 0.25px;
  text-rendering: optimizeLegibility;
}
@media (prefers-color-scheme: dark) {
  .report-text {
    color: #232b23;
  }
}

.report-footer {
  background: #f8f9fa;
  padding: 8px 16px;
  border-top: 1px solid #e0e0e0;
  font-size: 0.98rem;
  color: #232b23;
  font-weight: 500;
}
@media (prefers-color-scheme: dark) {
  .report-footer {
    background: #f8f9fa;
    border-top: 1px solid #e0e0e0;
    color: #232b23;
  }
}

.modern-report-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(44,62,47,0.13);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 768px) {
  .report-text {
    font-size: 12px;
    padding: 16px;
    letter-spacing: 0.1px;
  }
  .report-text-wrapper {
    margin: 12px;
  }
  .modern-report-container {
    border-radius: 8px;
  }
}

.q-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.q-btn {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.text-caption {
  font-weight: 500;
}

body.body--dark .reports-tile {
  border: 1.5px solid #444950 !important;
  background: #2c313a !important;
}
</style>
