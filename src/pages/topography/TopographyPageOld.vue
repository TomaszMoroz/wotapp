<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-md">🗺️ Topografia</div>

    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <q-card>
          <q-card-section>
            <div class="text-h6 q-mb-md">📖 Wybierz zagadnienie topograficzne</div>

            <q-select
              v-model="selectedTopic"
              :options="sortedTopics"
              label="Wyszukaj i wybierz zagadnienie"
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="name"
              option-value="id"
              @filter="filterTopics"
              @update:model-value="onTopicSelected"
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

        <!-- Prezentacja wybranego zagadnienia -->
        <div v-if="selectedTopic" class="q-mt-lg">
          <q-card class="shadow-5">
            <q-card-section class="bg-primary text-white">
              <div class="row items-center">
                <div class="col">
                  <div class="text-h5 q-mb-xs">{{ selectedTopic.name }}</div>
                  <q-chip
                    :icon="selectedTopic.icon"
                    :color="selectedTopic.color"
                    text-color="white"
                    size="sm"
                  >
                    {{ selectedTopic.category }}
                  </q-chip>
                </div>
                <div class="col-auto">
                  <q-avatar size="48px" :color="selectedTopic.color" text-color="white">
                    <q-icon :name="selectedTopic.icon" size="24px" />
                  </q-avatar>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="row items-center q-mb-md">
                <q-icon name="description" color="grey-6" size="20px" class="q-mr-sm" />
                <div class="text-h6 text-grey-8">Treść zagadnienia</div>
                <q-space />
                <q-chip size="sm" color="green-1" text-color="green-8" icon="verified">
                  Materiał WOT
                </q-chip>
              </div>

              <q-card class="modern-content-container" bordered>
                <q-card-section class="content-header">
                  <div class="row items-center">
                    <q-icon name="military_tech" color="primary" size="18px" class="q-mr-sm" />
                    <span class="text-caption text-primary font-weight-medium">
                      MATERIAŁ SZKOLENIOWY
                    </span>
                    <q-space />
                    <q-chip size="xs" color="orange-1" text-color="orange-8" icon="school">
                      Topografia
                    </q-chip>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section class="content-section-modern">
                  <div class="content-text-wrapper">
                    <div class="content-text" v-html="selectedTopic.content"></div>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section class="content-footer">
                  <div class="row items-center text-caption text-grey-6">
                    <q-icon name="info" size="14px" class="q-mr-xs" />
                    Materiał do nauki i szkolenia
                    <q-space />
                    <q-icon name="security" size="14px" class="q-mr-xs" />
                    Do użytku służbowego
                  </div>
                </q-card-section>
              </q-card>
            </q-card-section>

            <q-separator v-if="selectedTopic.tips" />

            <q-card-section v-if="selectedTopic.tips" class="bg-blue-1">
              <div class="row items-center q-mb-md">
                <q-icon name="tips_and_updates" color="blue-8" size="20px" class="q-mr-sm" />
                <div class="text-h6 text-blue-8">Wskazówki praktyczne</div>
              </div>
              <q-banner inline-actions class="bg-blue-2 text-blue-9">
                {{ selectedTopic.tips }}
                <template v-slot:action>
                  <q-btn flat color="blue-8" icon="info" size="sm" />
                </template>
              </q-banner>
            </q-card-section>

            <q-separator />

            <q-card-actions align="between" class="q-pa-md">
              <q-chip icon="map" color="grey-4" text-color="grey-8" size="sm">
                Topografia WOT
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
                  @click="printTopic"
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
                <q-icon name="map" size="40px" />
              </q-avatar>

              <div class="text-h6 text-grey-6 q-mt-md q-mb-sm">
                Wybierz zagadnienie topograficzne z listy powyżej
              </div>

              <q-chip color="grey-4" text-color="grey-8" icon="info">
                Dostępnych jest {{ allTopics.length }} zagadnień
              </q-chip>

              <q-separator class="q-my-md" />

              <div class="row justify-center q-gutter-md">
                <q-chip
                  v-for="category in ['Mapy i kompas', 'Orientacja', 'Analiza terenu', 'Współrzędne']"
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
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

defineOptions({
  name: 'TopographyPage'
})

const $q = useQuasar()

// Dane aplikacji
const selectedTopic = ref(null)
const filteredOptions = ref([])

// Wszystkie zagadnienia topograficzne
const allTopics = [
  {
    id: 1,
    name: 'Odczytywanie mapy topograficznej',
    category: 'Mapy i kompas',
    icon: 'map',
    color: 'orange',
    content: `
      <h3>ODCZYTYWANIE MAPY TOPOGRAFICZNEJ</h3>

      <h4>ELEMENTY MAPY</h4>
      <ul>
        <li><strong>Skala:</strong> Stosunek odległości na mapie do rzeczywistej</li>
        <li><strong>Siatka współrzędnych:</strong> System kwadratów do określania pozycji</li>
        <li><strong>Legenda:</strong> Objaśnienie symboli i znaków</li>
        <li><strong>Deklinacja magnetyczna:</strong> Różnica między północą magnetyczną a mapową</li>
      </ul>

      <h4>WSPÓŁRZĘDNE GRID</h4>
      <p><strong>Format 6-cyfrowy:</strong> 123456 (3 cyfry wschód + 3 cyfry północ)</p>
      <p><strong>Format 8-cyfrowy:</strong> 12345678 (4 cyfry wschód + 4 cyfry północ)</p>
      <p><strong>Dokładność:</strong></p>
      <ul>
        <li>6 cyfr = ±100m</li>
        <li>8 cyfr = ±10m</li>
      </ul>

      <h4>LINIE WARSTWICOWE</h4>
      <p><strong>Zasady:</strong></p>
      <ul>
        <li>Zbliżone linie = stromy teren</li>
        <li>Oddalone linie = łagodny teren</li>
        <li>Zamknięte koła = wzniesienia/zagłębienia</li>
      </ul>

      <h4>FORMY TERENU</h4>
      <ul>
        <li><strong>Grzbiet:</strong> Wydłużone wzniesienie</li>
        <li><strong>Dolina:</strong> Obniżenie między wzniesieniami</li>
        <li><strong>Siodło:</strong> Przełęcz między dwoma wzniesieniami</li>
        <li><strong>Depresja:</strong> Zamknięte obniżenie</li>
      </ul>
    `,
    tips: 'Zawsze sprawdzaj datę mapy i deklinację magnetyczną. Stare mapy mogą mieć nieaktualne informacje o infrastrukturze.'
  },
  {
    id: 2,
    name: 'Orientacja w terenie',
    category: 'Orientacja',
    icon: 'explore',
    color: 'teal',
    content: `
      <h3>ORIENTACJA W TERENIE</h3>

      <h4>METODY ORIENTACJI</h4>

      <h4>1. ORIENTACJA WEDŁUG KOMPASU</h4>
      <ul>
        <li>Ustaw mapę według północy magnetycznej</li>
        <li>Uwzględnij deklinację magnetyczną</li>
        <li>Używaj tylnej iglicy do celowania</li>
      </ul>

      <h4>2. ORIENTACJA WEDŁUG PUNKTÓW CHARAKTERYSTYCZNYCH</h4>
      <ul>
        <li>Znajdź 2-3 charakterystyczne punkty w terenie</li>
        <li>Zidentyfikuj je na mapie</li>
        <li>Określ swoją pozycję względem nich</li>
      </ul>

      <h4>3. TRIANGULACJA</h4>
      <p><strong>Krok 1:</strong> Wybierz 3 widoczne punkty charakterystyczne</p>
      <p><strong>Krok 2:</strong> Zmierz azymuty do każdego punktu</p>
      <p><strong>Krok 3:</strong> Przerysuj linie na mapę</p>
      <p><strong>Krok 4:</strong> Punkt przecięcia = Twoja pozycja</p>

      <h4>TECHNIKI MARSZU</h4>
      <ul>
        <li><strong>Marsz na azymut:</strong> Podążanie w określonym kierunku</li>
        <li><strong>Attack point:</strong> Łatwy do znalezienia punkt blisko celu</li>
        <li><strong>Handrail:</strong> Liniowy obiekt prowadzący do celu (droga, rzeka)</li>
        <li><strong>Catching feature:</strong> Duży obiekt za celem (bezpieczeństwo)</li>
      </ul>

      <h4>BŁĘDY DO UNIKANIA</h4>
      <ul>
        <li>Nieprawidłowe trzymanie kompasu</li>
        <li>Ignorowanie deklinacji magnetycznej</li>
        <li>Brak potwierdzenia pozycji</li>
        <li>Przechodzenie z kompasu na GPS bez weryfikacji</li>
      </ul>
    `,
    tips: 'Zawsze miej plan B. Jeśli nawigacja elektroniczna zawiedzie, umiejętność czytania mapy i kompasu może uratować życie.'
  },
  {
    id: 3,
    name: 'Ocena terenu taktycznego',
    category: 'Analiza terenu',
    icon: 'terrain',
    color: 'brown',
    content: `
      <h3>OCENA TERENU TAKTYCZNEGO</h3>

      <h4>AKRONIM OCOKA (OAKOC)</h4>

      <h4>O - OBSERWACJA I POLE OGNIA</h4>
      <ul>
        <li>Czy teren zapewnia dobre pole obserwacji?</li>
        <li>Jakie są sektory ostrzału?</li>
        <li>Gdzie są martwe pola?</li>
        <li>Czy przeciwnik może obserwować nasze pozycje?</li>
      </ul>

      <h4>C - COVER I CONCEALMENT (OSŁONY I UKRYCIE)</h4>
      <ul>
        <li><strong>Cover:</strong> Ochrona przed ogniem (beton, ziemia, metal)</li>
        <li><strong>Concealment:</strong> Ukrycie przed obserwacją (krzaki, dym)</li>
        <li>Naturalne osłony vs. sztuczne</li>
        <li>Pozycje zapasowe</li>
      </ul>

      <h4>O - OBSTACLES (PRZESZKODY)</h4>
      <ul>
        <li>Naturalne: rzeki, wąwozy, bagna</li>
        <li>Sztuczne: zasieki, miny, barykady</li>
        <li>Jak wpływają na manewru?</li>
        <li>Można je obejść czy trzeba pokonać?</li>
      </ul>

      <h4>K - KEY TERRAIN (TEREN KLUCZOWY)</h4>
      <ul>
        <li>Punkty decydujące o sukcesie misji</li>
        <li>Wzgórza dominujące</li>
        <li>Węzły komunikacyjne</li>
        <li>Przeprawy przez rzeki</li>
      </ul>

      <h4>A - AVENUES OF APPROACH (KIERUNKI NATARCIA)</h4>
      <ul>
        <li>Trasy umożliwiające przemieszczanie sił</li>
        <li>Główne drogi i ścieżki</li>
        <li>Naturalne korytarze</li>
        <li>Ograniczenia dla pojazdów</li>
      </ul>

      <h4>PRAKTYCZNE ZASTOSOWANIE</h4>
      <ul>
        <li>Zawsze oceniaj teren przed zajęciem pozycji</li>
        <li>Planuj trasy wycofania</li>
        <li>Identyfikuj pozycje alternatywne</li>
        <li>Uwzględniaj warunki pogodowe</li>
      </ul>
    `,
    tips: 'Teren to najważniejszy czynnik taktyczny. Dobra znajomość terenu może zrekompensować przewagę liczebną przeciwnika.'
  },
  {
    id: 4,
    name: 'Systemy współrzędnych',
    category: 'Współrzędne',
    icon: 'gps_fixed',
    color: 'blue',
    content: `
      <h3>SYSTEMY WSPÓŁRZĘDNYCH</h3>

      <h4>SYSTEM UTM (Universal Transverse Mercator)</h4>
      <p><strong>Zastosowanie:</strong> Podstawowy system dla sił zbrojnych NATO</p>
      <p><strong>Podział:</strong> 60 stref po 6° długości geograficznej</p>
      <p><strong>Polska:</strong> Głównie strefy 33N i 34N</p>

      <h4>FORMAT GRID</h4>
      <p><strong>Pełny format:</strong> 34UEB 12345 67890</p>
      <ul>
        <li>34U = strefa UTM</li>
        <li>EB = oznaczenie 100km kwadratu</li>
        <li>12345 = współrzędna wschodnia (5 cyfr)</li>
        <li>67890 = współrzędna północna (5 cyfr)</li>
      </ul>

      <h4>SKRÓCONE FORMATY</h4>
      <p><strong>6-cyfrowy:</strong> 123678 (dokładność ±100m)</p>
      <p><strong>8-cyfrowy:</strong> 12346789 (dokładność ±10m)</p>
      <p><strong>10-cyfrowy:</strong> 1234567890 (dokładność ±1m)</p>

      <h4>SYSTEM MGRS (Military Grid Reference System)</h4>
      <ul>
        <li>Wojskowa wersja UTM</li>
        <li>Używa liter zamiast liczb dla niektórych oznaczeń</li>
        <li>Standard NATO</li>
      </ul>

      <h4>WSPÓŁRZĘDNE GEOGRAFICZNE</h4>
      <p><strong>Format dziesiętny:</strong> 52.237049, 21.017532</p>
      <p><strong>Format DMS:</strong> 52°14'13.4"N 21°01'03.1"E</p>
      <p><strong>Zastosowanie:</strong> GPS cywilny, mapy internetowe</p>

      <h4>KONWERSJA MIĘDZY SYSTEMAMI</h4>
      <ul>
        <li>GPS → MGRS: Funkcja w większości urządzeń GPS</li>
        <li>Mapy online: Często pokazują różne formaty</li>
        <li>Aplikacje mobilne: GridRef, MGRS Tools</li>
      </ul>

      <h4>PRAKTYCZNE WSKAZÓWKI</h4>
      <ul>
        <li>Zawsze podawaj system współrzędnych</li>
        <li>Sprawdzaj zgodność między urządzeniami</li>
        <li>Używaj map w tym samym systemie</li>
        <li>Weryfikuj współrzędne przed przekazaniem</li>
      </ul>
    `,
    tips: 'W operacjach mieszanych (wojsko + służby cywilne) ustal jeden system współrzędnych dla wszystkich uczestników.'
  }
]

// Computed properties
const sortedTopics = computed(() => {
  if (filteredOptions.value.length > 0) {
    return [...filteredOptions.value].sort((a, b) => a.name.localeCompare(b.name))
  }
  return [...allTopics].sort((a, b) => a.name.localeCompare(b.name))
})

// Methods
const filterTopics = (val, update) => {
  if (val === '') {
    update(() => {
      filteredOptions.value = allTopics
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    filteredOptions.value = allTopics.filter(v =>
      v.name.toLowerCase().indexOf(needle) > -1 ||
      v.category.toLowerCase().indexOf(needle) > -1
    )
  })
}

const onTopicSelected = (topic) => {
  selectedTopic.value = topic
}

const copyToClipboard = async () => {
  if (!selectedTopic.value) return

  const text = selectedTopic.value.name + '\n\n' +
               selectedTopic.value.content.replace(/<[^>]*>/g, '') +
               (selectedTopic.value.tips ? '\n\nWskazówki: ' + selectedTopic.value.tips : '')

  try {
    await navigator.clipboard.writeText(text)
    $q.notify({
      type: 'positive',
      message: 'Skopiowano do schowka',
      position: 'top'
    })
  } catch (err) {
    $q.notify({
      type: 'negative',
      message: 'Błąd kopiowania',
      position: 'top'
    })
  }
}

const printTopic = () => {
  if (!selectedTopic.value) return

  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
      <html>
        <head>
          <title>${selectedTopic.value.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1976d2; }
            pre { white-space: pre-wrap; font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <h1>${selectedTopic.value.name}</h1>
          <p><strong>Kategoria:</strong> ${selectedTopic.value.category}</p>
          <div>${selectedTopic.value.content}</div>
          ${selectedTopic.value.tips ? `<h3>Wskazówki praktyczne:</h3><p>${selectedTopic.value.tips}</p>` : ''}
        </body>
      </html>
    `)
  printWindow.document.close()
  printWindow.print()
}

onMounted(() => {
  filteredOptions.value = allTopics
})
</script>

<style scoped>
/* Nowoczesne style dla zagadnień topograficznych */

.modern-content-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1f5fe;
}

.content-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 12px 16px;
  border-bottom: 1px solid #dee2e6;
}

.content-section-modern {
  background: #ffffff;
  padding: 0;
  position: relative;
}

.content-text-wrapper {
  background: linear-gradient(145deg, #fafbfc 0%, #ffffff 100%);
  border: 1px solid #f1f3f4;
  border-radius: 8px;
  margin: 16px;
  position: relative;
  overflow: hidden;
}

.content-text-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff9800, #ffc107, #ff9800);
}

.content-text {
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #2c3e50;
  margin: 0;
  padding: 20px;
  font-weight: 400;
  text-rendering: optimizeLegibility;
}

.content-text h3 {
  color: #ff9800;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  border-bottom: 2px solid #fff3e0;
  padding-bottom: 8px;
}

.content-text h4 {
  color: #424242;
  font-size: 15px;
  font-weight: 500;
  margin: 16px 0 8px 0;
}

.content-text ul {
  margin: 8px 0 16px 20px;
  padding: 0;
}

.content-text li {
  margin: 4px 0;
}

.content-text p {
  margin: 8px 0;
}

.content-text strong {
  color: #ff9800;
  font-weight: 600;
}

.content-footer {
  background: #f8f9fa;
  padding: 8px 16px;
  border-top: 1px solid #dee2e6;
}

/* Hover effect dla całego kontenera */
.modern-content-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsywność */
@media (max-width: 768px) {
  .content-text {
    font-size: 12px;
    padding: 16px;
    letter-spacing: 0.1px;
  }

  .content-text-wrapper {
    margin: 12px;
  }

  .modern-content-container {
    border-radius: 8px;
  }
}

/* Smooth transitions */
.q-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.q-btn {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Typography enhancements */
.text-caption {
  font-weight: 500;
}
</style>
