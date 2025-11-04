<template>
  <q-page class="nato-page">
    <div class="container q-pa-md">
      <!-- Header -->
      <div class="page-header q-mb-xl">
        <div class="row items-center q-gutter-md">
          <q-icon name="record_voice_over" size="3rem" color="primary" />
          <div>
            <div class="text-h4 text-weight-bold text-primary">Alfabet NATO</div>
            <div class="text-subtitle1 text-grey-7">Międzynarodowy alfabet fonetyczny do komunikacji radiowej</div>
          </div>
        </div>
      </div>

      <div class="row q-gutter-lg">
        <!-- Panel wyszukiwania -->
        <div class="col-12 col-lg-4">
          <q-card class="search-card">
            <q-card-section class="card-header">
              <div class="text-h6 text-weight-bold">🔍 Wyszukiwanie</div>
            </q-card-section>

            <q-card-section>
              <q-input
                v-model="searchQuery"
                label="Litera lub słowo fonetyczne"
                outlined
                clearable
                @input="onSearchInput"
                class="q-mb-lg"
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>

              <!-- Szybki dostęp do liter -->
              <div class="q-mb-lg">
                <div class="text-subtitle2 q-mb-sm text-weight-medium">⚡ Szybki dostęp:</div>
                <div class="letters-grid">
                  <q-btn
                    v-for="item in natoAlphabet"
                    :key="item.letter"
                    :label="item.letter"
                    size="sm"
                    :outline="!isSelected(item)"
                    :color="isSelected(item) ? 'primary' : 'grey-5'"
                    @click="selectLetter(item)"
                    class="letter-btn"
                  />
                </div>
              </div>

              <!-- Panel wyniku -->
              <div v-if="selectedLetter" class="result-section">
                <q-card flat bordered class="result-card">
                  <q-card-section class="result-header">
                    <div class="row items-center">
                      <div class="col">
                        <div class="text-h3 text-weight-bold">{{ selectedLetter.letter }}</div>
                        <div class="text-h6">{{ selectedLetter.word }}</div>
                      </div>
                      <div class="col-auto">
                        <q-btn
                          fab
                          :icon="isPlaying ? 'stop' : 'volume_up'"
                          :color="isPlaying ? 'negative' : 'primary'"
                          @click="toggleSpeech"
                          :loading="isLoading"
                        />
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <div class="phonetic-section q-mb-md">
                      <div class="text-subtitle2 text-weight-medium q-mb-xs">🗣️ Wymowa:</div>
                      <div class="text-h6 text-primary phonetic-text">{{ selectedLetter.phonetic }}</div>
                    </div>

                    <div class="example-section">
                      <div class="text-subtitle2 text-weight-medium q-mb-xs">💬 Przykład:</div>
                      <div class="text-body1 example-text">"{{ selectedLetter.example }}"</div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Panel alfabetu -->
        <div class="col-12 col-lg-8">
          <q-card class="alphabet-card">
            <q-card-section class="card-header">
              <div class="row items-center justify-between">
                <div class="text-h6 text-weight-bold">📻 Pełny alfabet NATO</div>
                <q-btn
                  flat
                  icon="play_arrow"
                  label="Odtwórz wszystkie"
                  color="white"
                  @click="playAllLetters"
                />
              </div>
            </q-card-section>

            <q-card-section class="alphabet-grid-section">
              <div class="alphabet-grid">
                <div
                  v-for="item in filteredAlphabet"
                  :key="item.letter"
                  class="alphabet-item"
                  :class="{ 'selected': isSelected(item) }"
                  @click="selectLetter(item)"
                >
                  <div class="letter-display">{{ item.letter }}</div>
                  <div class="word-display">{{ item.word }}</div>
                  <div class="phonetic-display">{{ item.phonetic }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Sekcja informacyjna -->
          <q-card class="info-card q-mt-lg">
            <q-card-section class="card-header">
              <div class="text-h6 text-weight-bold">ℹ️ Informacje o alfabecie NATO</div>
            </q-card-section>

            <q-card-section>
              <div class="info-content">
                <h4>📡 Zastosowanie</h4>
                <p>Alfabet NATO (ICAO) jest używany w komunikacji radiowej dla jednoznacznego przekazywania liter. Szczególnie ważny w warunkach słabej jakości sygnału.</p>

                <h4>🎯 Zasady użycia</h4>
                <ul>
                  <li>Mów powoli i wyraźnie</li>
                  <li>Używaj przy podawaniu kodów, współrzędnych i identyfikatorów</li>
                  <li>W przypadku wątpliwości powtórz komunikat</li>
                  <li>Pamiętaj o międzynarodowej wymowie</li>
                </ul>

                <h4>💡 Przykłady praktyczne</h4>
                <div class="examples-list">
                  <div class="example-item">
                    <strong>Współrzędne:</strong> "Delta Quebec 1234 5678"
                  </div>
                  <div class="example-item">
                    <strong>Znak wywoławczy:</strong> "Alfa Bravo Charlie"
                  </div>
                  <div class="example-item">
                    <strong>Kod operacji:</strong> "Oscar Papa Echo Romeo"
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({
  name: 'NatoAlphabetPage'
})

const searchQuery = ref('')
const selectedLetter = ref(null)
const isPlaying = ref(false)
const isLoading = ref(false)

const natoAlphabet = [
  { letter: 'A', word: 'Alpha', phonetic: 'AL-fah', example: 'Alpha Base, tu patrol jeden' },
  { letter: 'B', word: 'Bravo', phonetic: 'BRAH-voh', example: 'Bravo Team w pozycji' },
  { letter: 'C', word: 'Charlie', phonetic: 'CHAR-lee', example: 'Charlie checkpoint osiągnięty' },
  { letter: 'D', word: 'Delta', phonetic: 'DELL-tah', example: 'Delta sector pod kontrolą' },
  { letter: 'E', word: 'Echo', phonetic: 'ECK-oh', example: 'Echo platoon na pozycji' },
  { letter: 'F', word: 'Foxtrot', phonetic: 'FOKS-trot', example: 'Foxtrot do bazy, odbiór' },
  { letter: 'G', word: 'Golf', phonetic: 'GOLF', example: 'Golf waypoint oznaczony' },
  { letter: 'H', word: 'Hotel', phonetic: 'hoh-TELL', example: 'Hotel LZ przygotowane' },
  { letter: 'I', word: 'India', phonetic: 'IN-dee-ah', example: 'India route bezpieczna' },
  { letter: 'J', word: 'Juliet', phonetic: 'JEW-lee-ett', example: 'Juliet target zidentyfikowany' },
  { letter: 'K', word: 'Kilo', phonetic: 'KEY-loh', example: 'Kilo patrol powraca' },
  { letter: 'L', word: 'Lima', phonetic: 'LEE-mah', example: 'Lima checkpoint sprawdzony' },
  { letter: 'M', word: 'Mike', phonetic: 'MIKE', example: 'Mike team w ruchu' },
  { letter: 'N', word: 'November', phonetic: 'no-VEM-ber', example: 'November grid sprawdzony' },
  { letter: 'O', word: 'Oscar', phonetic: 'OSS-car', example: 'Oscar zone zabezpieczona' },
  { letter: 'P', word: 'Papa', phonetic: 'pah-PAH', example: 'Papa point osiągnięty' },
  { letter: 'Q', word: 'Quebec', phonetic: 'keh-BECK', example: 'Quebec sector w patrol' },
  { letter: 'R', word: 'Romeo', phonetic: 'ROW-me-oh', example: 'Romeo unit odpowiada' },
  { letter: 'S', word: 'Sierra', phonetic: 'see-AIR-rah', example: 'Sierra position zajęta' },
  { letter: 'T', word: 'Tango', phonetic: 'TANG-go', example: 'Tango route wybrana' },
  { letter: 'U', word: 'Uniform', phonetic: 'YOU-nee-form', example: 'Uniform patrol wychodzi' },
  { letter: 'V', word: 'Victor', phonetic: 'VIK-tah', example: 'Victor element gotowy' },
  { letter: 'W', word: 'Whiskey', phonetic: 'WISS-key', example: 'Whiskey team na miejscu' },
  { letter: 'X', word: 'X-ray', phonetic: 'ECKS-ray', example: 'X-ray checkpoint oznaczony' },
  { letter: 'Y', word: 'Yankee', phonetic: 'YANG-key', example: 'Yankee squad powraca' },
  { letter: 'Z', word: 'Zulu', phonetic: 'ZOO-loo', example: 'Zulu time 1400 hours' }
]

const filteredAlphabet = computed(() => {
  if (!searchQuery.value) return natoAlphabet

  const query = searchQuery.value.toLowerCase()
  return natoAlphabet.filter(item =>
    item.letter.toLowerCase().includes(query) ||
    item.word.toLowerCase().includes(query) ||
    item.phonetic.toLowerCase().includes(query)
  )
})

const isSelected = (item) => {
  return selectedLetter.value?.letter === item.letter
}

const selectLetter = (item) => {
  selectedLetter.value = item
  searchQuery.value = ''
}

const onSearchInput = () => {
  if (searchQuery.value && filteredAlphabet.value.length === 1) {
    selectedLetter.value = filteredAlphabet.value[0]
  } else if (!searchQuery.value) {
    selectedLetter.value = null
  }
}

const toggleSpeech = () => {
  if (!selectedLetter.value) return

  if (isPlaying.value) {
    speechSynthesis.cancel()
    isPlaying.value = false
    return
  }

  if ('speechSynthesis' in window) {
    isLoading.value = true

    // Tekst do wymówienia
    const textToSpeak = `${selectedLetter.value.letter} ${selectedLetter.value.word}`

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => {
      isLoading.value = false
      isPlaying.value = true
    }

    utterance.onend = () => {
      isPlaying.value = false
    }

    utterance.onerror = () => {
      isLoading.value = false
      isPlaying.value = false
    }

    speechSynthesis.speak(utterance)
  }
}

const playAllLetters = () => {
  if ('speechSynthesis' in window) {
    const allText = natoAlphabet.map(item => `${item.letter} ${item.word}`).join(', ')
    const utterance = new SpeechSynthesisUtterance(allText)
    utterance.lang = 'en-US'
    utterance.rate = 0.6
    speechSynthesis.speak(utterance)
  }
}
</script>

<style scoped>
.nato-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(25, 118, 210, 0.1);
}

.search-card,
.alphabet-card,
.info-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.card-header {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  border-radius: 16px 16px 0 0;
  margin: -16px -16px 16px -16px;
  padding: 16px;
}

.letters-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
}

.letter-btn {
  border-radius: 8px;
  font-weight: 600;
  min-width: 40px;
  height: 40px;
}

.result-section {
  margin-top: 24px;
}

.result-card {
  border: 2px solid #1976d2;
  border-radius: 12px;
  overflow: hidden;
}

.result-header {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(21, 101, 192, 0.1) 100%);
  border-bottom: 1px solid rgba(25, 118, 210, 0.2);
}

.phonetic-text {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 1px;
}

.example-text {
  font-style: italic;
  color: #424242;
  background: rgba(25, 118, 210, 0.05);
  padding: 8px 12px;
  border-radius: 8px;
  border-left: 4px solid #1976d2;
}

.alphabet-grid-section {
  padding: 0;
}

.alphabet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}

.alphabet-item {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.alphabet-item:hover {
  border-color: #1976d2;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.2);
}

.alphabet-item.selected {
  border-color: #1976d2;
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(21, 101, 192, 0.1) 100%);
}

.letter-display {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 8px;
}

.word-display {
  font-size: 1.2rem;
  font-weight: 600;
  color: #424242;
  margin-bottom: 4px;
}

.phonetic-display {
  font-size: 0.9rem;
  color: #666;
  font-family: 'Courier New', monospace;
}

.info-content h4 {
  color: #1976d2;
  margin: 1.5rem 0 0.5rem 0;
  font-weight: 600;
}

.info-content ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.info-content li {
  margin-bottom: 0.25rem;
}

.examples-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.example-item {
  background: rgba(25, 118, 210, 0.05);
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #1976d2;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .row {
    flex-direction: column;
  }

  .col-lg-4,
  .col-lg-8 {
    width: 100%;
  }

  .alphabet-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .letters-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .alphabet-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
  }

  .letter-display {
    font-size: 2rem;
  }

  .word-display {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .letters-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .alphabet-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .page-header .row {
    flex-direction: column;
    text-align: center;
  }

  .letter-btn {
    min-width: 35px;
    height: 35px;
    font-size: 0.8rem;
  }
}
</style>
