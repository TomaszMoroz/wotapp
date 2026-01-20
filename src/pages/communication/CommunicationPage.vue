body.body--dark .communication-tile {
  border: 1.5px solid #444950 !important;
  background: #2c313a !important;
}
<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav />

      <div class="text-h4 q-mb-md">Komunikacja</div>

      <!-- Kategorie komunikacji -->
      <div class="q-mb-lg">
        <q-tabs v-model="activeCategory" class="text-grey" active-color="primary" indicator-color="primary" align="justify">
          <q-tab name="teoria" icon="book" label="TEORIA" />
          <q-tab name="signal" icon="cell_tower" label="Signal" />
          <q-tab name="atak" icon="warning" label="Atak" />
          <q-tab name="radio" icon="radio" label="Radio" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeCategory" animated>
          <q-tab-panel name="teoria">
            <div class="text-h6 q-mb-md">Teoria Łączności Radiowej WOT</div>

            <!-- Wyszukiwarka -->
            <q-input
              v-model="searchQuery"
              outlined
              placeholder="Wyszukaj frazę w teorii..."
              class="q-mb-md"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <!-- Filtry kategorii -->
            <div class="q-mb-md">
              <q-btn-toggle
                v-model="categoryFilter"
                toggle-color="primary"
                :options="categoryOptions"
                class="q-mb-sm"
              />
            </div>

            <!-- Wyniki wyszukiwania -->
            <div v-if="searchQuery && filteredContent.length > 0" class="q-mb-md">
              <q-banner class="bg-positive text-white">
                <q-icon name="info" class="q-mr-sm" />
                Znaleziono {{ filteredContent.length }} wyników dla "{{ searchQuery }}"
              </q-banner>
            </div>

            <!-- Ekspandery z teorią -->
            <div class="theory-content">
              <q-expansion-item
                v-for="(section, index) in visibleSections"
                :key="index"
                :label="section.title"
                :caption="section.description"
                icon="book"
                class="q-mb-sm"
                :default-opened="searchQuery && section.matches"
              >
                <div class="q-pa-md" v-html="section.content"></div>
              </q-expansion-item>
            </div>
          </q-tab-panel>

          <q-tab-panel name="signal">
            <div class="text-h6 q-mb-md">Signal - Komunikator Szyfrowany</div>
            <q-list separator>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="green" text-color="white" icon="verified" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Grupa WOT Secure</q-item-label>
                  <q-item-label caption>5 nowych wiadomości</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-chip color="green" text-color="white" size="sm">🔒</q-chip>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="blue" text-color="white" icon="security" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Dowództwo</q-item-label>
                  <q-item-label caption>Rozkazy dzienne</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-chip color="blue" text-color="white" size="sm">VIP</q-chip>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="atak">
            <div class="text-h6 q-mb-md">⚠️ Komunikacja Ataku</div>
            <q-banner class="bg-negative text-white q-mb-md">
              <template v-slot:avatar>
                <q-icon name="warning" />
              </template>
              Używaj tylko w sytuacjach bojowych!
            </q-banner>
            <q-list separator>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="red" text-color="white" icon="emergency" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Kanał Taktyczny Alpha</q-item-label>
                  <q-item-label caption>Częstotliwość: 146.520 MHz</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn color="red" icon="mic" size="sm" />
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="orange" text-color="white" icon="support_agent" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Wsparcie Ogniowe</q-item-label>
                  <q-item-label caption>Częstotliwość: 146.540 MHz</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn color="orange" icon="mic" size="sm" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="radio">
            <div class="text-h6 q-mb-md">📻 Komunikacja Radiowa</div>
            <div class="row q-gutter-md">
              <div class="col-12 col-md-6">
                <q-card>
                  <q-card-section>
                    <div class="text-subtitle1">Częstotliwości</div>
                  </q-card-section>
                  <q-card-section>
                    <q-list dense>
                      <q-item>
                        <q-item-section>
                          <q-item-label>Kanał 1 - Dowództwo</q-item-label>
                          <q-item-label caption>146.500 MHz</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-btn color="primary" icon="play_arrow" size="sm" />
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label>Kanał 2 - Logistyka</q-item-label>
                          <q-item-label caption>146.510 MHz</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-btn color="secondary" icon="play_arrow" size="sm" />
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label>Kanał 3 - Medyczny</q-item-label>
                          <q-item-label caption>146.530 MHz</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-btn color="positive" icon="play_arrow" size="sm" />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-md-6">
                <q-card>
                  <q-card-section>
                    <div class="text-subtitle1">Status radia</div>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-center">
                      <q-circular-progress
                        show-value
                        font-size="12px"
                        :value="radioSignal"
                        size="80px"
                        :thickness="0.2"
                        color="positive"
                        track-color="grey-3"
                        class="q-ma-md"
                      >
                        {{ radioSignal }}%
                      </q-circular-progress>
                      <div>Siła sygnału</div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <div class="row q-gutter-md">
        <div class="col-12 col-md-6">
          <q-card>
            <q-card-section>
              <div class="text-h6">Wiadomości</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-list separator>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar color="primary" text-color="white">K</q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Komendant Jednostki</q-item-label>
                    <q-item-label caption>Ćwiczenia w piątek o 18:00</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>10:30</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar color="secondary" text-color="white">D</q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Dowódca Drużyny</q-item-label>
                    <q-item-label caption>Sprawdź wyposażenie</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>9:15</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card>
            <q-card-section>
              <div class="text-h6">Kontakty awaryjne</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="phone" color="negative" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Numer alarmowy</q-item-label>
                    <q-item-label caption>112</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat icon="call" color="negative" />
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="security" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Dyżurny jednostki</q-item-label>
                    <q-item-label caption>+48 xxx xxx xxx</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat icon="call" color="primary" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="q-mt-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Nowa wiadomość</div>
          </q-card-section>
          <q-card-section>
            <q-form>
              <q-select
                v-model="recipient"
                :options="contacts"
                label="Odbiorca"
                class="q-mb-md"
              />
              <q-input
                v-model="message"
                type="textarea"
                label="Wiadomość"
                rows="3"
                class="q-mb-md"
              />
              <q-btn color="primary" label="Wyślij" icon="send" />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { ref, computed } from 'vue'

defineOptions({
  name: 'CommunicationPage'
})

const activeCategory = ref('teoria')
const searchQuery = ref('')
const categoryFilter = ref('all')

// Opcje kategorii dla filtrowania
const categoryOptions = [
  { label: 'Wszystkie', value: 'all' },
  { label: 'Podstawy', value: 'podstawy' },
  { label: 'TDR', value: 'tdr' },
  { label: 'Łączność', value: 'lacznosc' },
  { label: 'Telegramy', value: 'telegramy' },
  { label: 'Procedury', value: 'procedury' }
]

// Dane teoretyczne z załącznika
const theoryData = [
  {
    title: 'Podstawy Korespondencji Radiowej',
    category: 'podstawy',
    description: 'Wprowadzenie do przepisów i zasad bezpieczeństwa łączności',
    content: `
      <h6>Wprowadzenie do przepisów korespondencji radiowej</h6>
      <p>Łączność między wojskowymi środkami radiowymi nawiązuje się i utrzymuje zgodnie z jednolitymi przepisami korespondencji w relacjach radiowych Wojska Polskiego.</p>

      <h6>Przepisy korespondencji ustalają:</h6>
      <ul>
        <li>Zasady nawiązania łączności i prowadzenia korespondencji w kanałach radiowych</li>
        <li>Zasady opracowywania telegramów i sygnałów</li>
        <li>Wytyczne do prowadzenia rozmów przez środki radiowe</li>
        <li>Wymagania w zakresie prowadzenia dokumentacji</li>
        <li>Podstawowe obowiązki osób funkcyjnych</li>
      </ul>

      <h6>Bezpieczeństwo łączności</h6>
      <p>Osoby funkcyjne przed przystąpieniem do pracy przez środki łączności radiowej powinni być przeszkoleni z przestrzegania warunków bezpieczeństwa łączności.</p>

      <div class="bg-warning q-pa-sm q-mt-md">
        <strong>UWAGA:</strong> Zabrania się nadawania tekstem niezamaskowanym informacji zawierających tajemnicę państwową i służbową.
      </div>
    `
  },
  {
    title: 'Tabela Dyżurnego Radiotelegrafisty (TDR)',
    category: 'tdr',
    description: 'Kodowanie rozmów służbowych i sprawdzanie tożsamości',
    content: `
      <h6>TDR-87-P / TDR-96</h6>
      <p>Tabela dyżurnego radiotelegrafisty jest przeznaczona do prowadzenia służbowych rozmów w nie utajnionych relacjach radiowych.</p>

      <h6>Charakterystyka TDR:</h6>
      <ul>
        <li>Zawiera 100 pól ponumerowanych od 00 do 99</li>
        <li>Klucze zmieniają się raz na dobę o godzinie 00:01</li>
        <li>Służy do kodowania zwrotów służbowych i liter alfabetu</li>
        <li>Wykorzystywana do sprawdzania tożsamości korespondentów</li>
      </ul>

      <h6>Sposób kodowania:</h6>
      <p>Zwrot koduje się za pomocą par liter z klucza pionowego i poziomego. Przy pracy kluczem telegraficznym dodaje się literę "Z" na początku grupy.</p>

      <div class="bg-info q-pa-sm q-mt-md">
        <strong>Przykład:</strong> Grupa "kw" oznacza "Podajcie hasło", a "zsh" to zakodowana liczba "26".
      </div>
    `
  },
  {
    title: 'Nawiązywanie Łączności Radiowej',
    category: 'lacznosc',
    description: 'Sposoby i procedury nawiązywania łączności',
    content: `
      <h6>Definicja</h6>
      <p>Nawiązywanie łączności radiowej to proces zidentyfikowania i sprawdzenia tożsamości współpracujących korespondentów oraz uzyskania danego rodzaju i jakości łączności.</p>

      <h6>Sposoby nawiązywania łączności:</h6>
      <h6>1. Sposób długotrwały</h6>
      <ul>
        <li>Stosowany w relacjach dalekosiężnych</li>
        <li>Podczas silnych zakłóceń i słabej słyszalności</li>
        <li>Przykład: ORACZ ORACZ ORACZ TU OPOKA OPOKA ODBIÓR</li>
      </ul>

      <h6>2. Sposób standardowy</h6>
      <ul>
        <li>Uniwersalny dla sieci i kierunków radiowych</li>
        <li>Przykład: ORACZ TU OPOKA ODBIÓR</li>
      </ul>

      <h6>3. Sposób skrócony</h6>
      <ul>
        <li>Przy dobrej słyszalności</li>
        <li>Przykład: TU OPOKA ODBIÓR</li>
      </ul>

      <div class="bg-primary text-white q-pa-sm q-mt-md">
        <strong>Jakość łączności:</strong> Słuchową łączność uważa się za zadawalającą przy słyszalności min. 3 punkty (QSA3) i czytelności min. 4 punkty (QRK4).
      </div>
    `
  },
  {
    title: 'Telegramy i Sygnały',
    category: 'telegramy',
    description: 'Opracowywanie, nadawanie i odbiór telegramów',
    content: `
      <h6>Definicje</h6>
      <p><strong>Telegram</strong> - dokumentalna informacja operacyjna przekazywana w kanałach radiowych przez techniczne środki łączności.</p>
      <p><strong>Sygnał</strong> - krótka informacja do natychmiastowego wykonania.</p>

      <h6>Kategorie pilności telegramów:</h6>
      <ol>
        <li><strong>WULKAN (WLK)</strong> - natychmiast poza wszelką kolejnością</li>
        <li><strong>POWIETRZE (WZD)</strong> - po telegramach WLK</li>
        <li><strong>RAKIETA (RKT)</strong> - po telegramach WLK, WZD</li>
        <li><strong>SAMOLOT (SML)</strong> - po telegramach WLK, WZD, RKT</li>
        <li><strong>ZWYKŁY</strong> - po wszystkich innych kategoriach</li>
      </ol>

      <h6>Budowa telegramu:</h6>
      <ul>
        <li><strong>Nagłówek:</strong> numer, ilość grup, data, czas</li>
        <li><strong>Część adresowa:</strong> kategoria pilności, adres</li>
        <li><strong>Tekst telegramu:</strong> treść wiadomości</li>
        <li><strong>Podpis:</strong> identyfikacja nadawcy</li>
      </ul>

      <div class="bg-negative text-white q-pa-sm q-mt-md">
        <strong>Ważne:</strong> Telegramy kategorii WULKAN i POWIETRZE przerywają nadawanie wszystkich innych kategorii.
      </div>
    `
  },
  {
    title: 'Sprawdzanie Tożsamości',
    category: 'procedury',
    description: 'Procedury weryfikacji korespondentów radiowych',
    content: `
      <h6>Cel sprawdzania tożsamości</h6>
      <p>Identyfikacja radiostacji w celu wyeliminowania prób włączenia się radiostacji przeciwnika prowadzących dywersję radiową.</p>

      <h6>Kiedy sprawdzać tożsamość:</h6>
      <ul>
        <li>Podczas pierwszego seansu na nowych danych radiowych</li>
        <li>Gdy radiostacja nie występuje w tabeli danych</li>
        <li>Przy podejrzeniu próby nawiązania łączności przez radiostację obcą</li>
        <li>Przed nadaniem rozkazów bojowych</li>
      </ul>

      <h6>Procedura z TDR:</h6>
      <ol>
        <li><strong>Zapytanie:</strong> Nadanie "Podajcie hasło" + dowolna liczba dwucyfrowa</li>
        <li><strong>Odpowiedź:</strong> Obliczenie grupy tożsamościowej i nadanie</li>
        <li><strong>Wzajemna odpowiedź:</strong> Potwierdzenie przez radiostację sprawdzającą</li>
        <li><strong>Zakończenie:</strong> "Zrozumiałem" / "OK"</li>
      </ol>

      <h6>Wzór obliczenia grupy tożsamościowej:</h6>
      <p>Liczba dowolna + numer sieci + liczba porządkowa radiostacji = grupa tożsamościowa</p>

      <div class="bg-orange text-white q-pa-sm q-mt-md">
        <strong>Przykład:</strong> 2+6+3+2+7+2 = 22 → kodowanie jako "sv" (zsv)
      </div>
    `
  },
  {
    title: 'Służbowe Skróty Radiowe',
    category: 'procedury',
    description: 'Najważniejsze skróty używane w łączności radiowej',
    content: `
      <h6>Podstawowe skróty QRA-QUZ:</h6>
      <div class="q-table-container">
        <table class="q-table">
          <tr><td><strong>QRV</strong></td><td>Jestem gotów (do pracy gotów)</td></tr>
          <tr><td><strong>QTC</strong></td><td>Przyjmijcie telegram</td></tr>
          <tr><td><strong>QSA</strong></td><td>Wasze sygnały są... (1-5)</td></tr>
          <tr><td><strong>QRK</strong></td><td>Wasze sygnały są czytelne</td></tr>
          <tr><td><strong>QSV</strong></td><td>Dajcie strojenie</td></tr>
          <tr><td><strong>QBE</strong></td><td>Wyłączam radiostację</td></tr>
        </table>
      </div>

      <h6>Skróty operacyjne:</h6>
      <div class="q-table-container">
        <table class="q-table">
          <tr><td><strong>K</strong></td><td>Koniec nadawania, oczekuję odpowiedzi</td></tr>
          <tr><td><strong>R</strong></td><td>Odebrano, potwierdzenie</td></tr>
          <tr><td><strong>AR</strong></td><td>Koniec nadawania, odpowiedzi nie potrzeba</td></tr>
          <tr><td><strong>AS</strong></td><td>Czekać</td></tr>
          <tr><td><strong>BK</strong></td><td>Przerwać nadawanie</td></tr>
        </table>
      </div>

      <h6>Skróty kontrolne:</h6>
      <div class="q-table-container">
        <table class="q-table">
          <tr><td><strong>RPT</strong></td><td>Powtórzyć, powtarzam</td></tr>
          <tr><td><strong>AL</strong></td><td>Wszystko co tylko było nadane</td></tr>
          <tr><td><strong>AB</strong></td><td>Wszystko przed...</td></tr>
          <tr><td><strong>AA</strong></td><td>Wszystko po...</td></tr>
        </table>
      </div>

      <div class="bg-info text-white q-pa-sm q-mt-md">
        <strong>Uwaga:</strong> W łączności telefonicznej używa się treści skrótów, nie ich kodów literowych.
      </div>
    `
  }
]

// Funkcja wyszukiwania i filtrowania
const filteredContent = computed(() => {
  if (!searchQuery.value) return []

  const query = searchQuery.value.toLowerCase()
  const results = []

  theoryData.forEach(section => {
    const titleMatch = section.title.toLowerCase().includes(query)
    const contentMatch = section.content.toLowerCase().includes(query)
    const descriptionMatch = section.description.toLowerCase().includes(query)

    if (titleMatch || contentMatch || descriptionMatch) {
      results.push({
        ...section,
        matches: true
      })
    }
  })

  return results
})

// Sekcje do wyświetlenia (filtrowane lub wszystkie)
const visibleSections = computed(() => {
  if (searchQuery.value) {
    return filteredContent.value
  }

  if (categoryFilter.value === 'all') {
    return theoryData
  }

  return theoryData.filter(section => section.category === categoryFilter.value)
})

const recipient = ref(null)
const message = ref('')
const radioSignal = ref(85)
const contacts = ['Komendant Jednostki', 'Dowódca Drużyny', 'Wszyscy żołnierze']
</script>

<style scoped>
.page-background {
  background-color: #f4f7fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.q-card {
  border-radius: 8px;
  overflow: hidden;
}

.q-card-section {
  padding: 16px;
}

.q-separator {
  margin: 8px 0;
}

.q-btn {
  min-width: 120px;
}

.q-input {
  max-width: 400px;
}

.q-select {
  max-width: 300px;
}

.q-table {
  width: 100%;
}

.q-table-container {
  max-width: 100%;
  overflow-x: auto;
}
</style>
