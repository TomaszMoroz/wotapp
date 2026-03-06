<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav color="black"/>

      <!-- Header -->
      <div class="page-header q-mb-xl">
        <div class="row items-center q-gutter-md">
          <q-icon name="record_voice_over" size="3rem" color="primary" />
          <div>
            <div class="text-h4 text-weight-bold text-primary">Alfabet NATO</div>
            <div class="text-subtitle1 text-grey-7">Międzynarodowy alfabet fonetyczny</div>
          </div>
        </div>
      </div>

      <!-- Mode Selection -->
      <div v-if="!testMode" class="q-mb-lg">
        <div class="row q-gutter-md">
          <q-btn
            color="primary"
            icon="quiz"
            label="Test: Litery → Wymowa"
            class="col"
            @click="startTest('letter-to-word')"
            unelevated
          />
          <q-btn
            color="secondary"
            icon="speed"
            label="Test: Słowo → Litery (Na czas)"
            class="col"
            @click="startTest('word-to-letters')"
            unelevated
          />
        </div>
      </div>

      <!-- Test Mode: Letter to Word -->
      <div v-if="testMode === 'letter-to-word'" class="test-container">
        <div class="test-header q-mb-md">
          <div class="text-h5 text-weight-bold">Pytanie {{ currentQuestionIndex + 1 }}/{{ testQuestions.length }}</div>
          <div class="row q-gutter-sm">
            <q-btn
              flat
              round
              dense
              icon="refresh"
              color="primary"
              @click="resetTest"
            >
              <q-tooltip>Zrestartuj test</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              icon="close"
              color="negative"
              @click="exitTest"
            >
              <q-tooltip>Zakończ test</q-tooltip>
            </q-btn>
          </div>
        </div>

        <q-card class="test-card">
          <q-card-section class="text-center">
            <div class="test-letter">{{ testQuestions[currentQuestionIndex]?.letter }}</div>
            <div class="text-subtitle1 q-mt-md">Wpisz wymowę tej litery:</div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="userAnswer"
              outlined
              label="Twoja odpowiedź"
              @keyup.enter="checkAnswer"
              ref="answerInput"
              autofocus
              :disable="showingResult"
            />
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              color="primary"
              label="Sprawdź"
              @click="checkAnswer"
              :disable="!userAnswer || showingResult"
              unelevated
              size="lg"
            />
          </q-card-actions>
        </q-card>

        <!-- Result Display -->
        <div v-if="showingResult" class="q-mt-md">
          <q-card :class="isCorrect ? 'correct-answer' : 'incorrect-answer'">
            <q-card-section>
              <div class="text-h6 text-center">
                <q-icon :name="isCorrect ? 'check_circle' : 'cancel'" size="2rem" />
                {{ isCorrect ? 'Poprawnie!' : 'Niepoprawnie' }}
              </div>
              <div v-if="!isCorrect" class="text-center q-mt-sm">
                Prawidłowa odpowiedź: <strong>{{ testQuestions[currentQuestionIndex]?.word }}</strong>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Progress -->
        <q-linear-progress
          :value="(currentQuestionIndex + 1) / testQuestions.length"
          color="primary"
          class="q-mt-lg"
          size="8px"
        />
      </div>

      <!-- Test Mode: Word to Letters -->
      <div v-if="testMode === 'word-to-letters'" class="test-container">
        <div class="test-header q-mb-md">
          <div>
            <div class="text-h5 text-weight-bold">Przeliteruj słowo</div>
            <div class="text-subtitle1">Czas: {{ formatTime(elapsedTime) }}</div>
          </div>
          <div class="row q-gutter-sm">
            <q-btn
              flat
              round
              dense
              icon="refresh"
              color="primary"
              @click="resetTest"
            >
              <q-tooltip>Zrestartuj test</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              icon="close"
              color="negative"
              @click="exitTest"
            >
              <q-tooltip>Zakończ test</q-tooltip>
            </q-btn>
          </div>
        </div>

        <q-card class="test-card">
          <q-card-section class="text-center">
            <div class="test-word">{{ currentWord }}</div>
            <div class="text-subtitle1 q-mt-md">Wpisz litery w zapisie fonetycznym (oddziel spacją):</div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="userLettersAnswer"
              outlined
              label="Np: Alpha Bravo Charlie"
              @keyup.enter="checkWordToLetters"
              ref="lettersInput"
              autofocus
              :disable="showingResult"
            />
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              color="primary"
              label="Sprawdź"
              @click="checkWordToLetters"
              :disable="!userLettersAnswer || showingResult"
              unelevated
              size="lg"
            />
          </q-card-actions>
        </q-card>

        <!-- Result Display -->
        <div v-if="showingResult" class="q-mt-md">
          <q-card :class="isCorrect ? 'correct-answer' : 'incorrect-answer'">
            <q-card-section>
              <div class="text-h6 text-center">
                <q-icon :name="isCorrect ? 'check_circle' : 'cancel'" size="2rem" />
                {{ isCorrect ? 'Brawo!' : 'Spróbuj jeszcze raz' }}
              </div>
              <div class="text-center q-mt-sm">
                Czas: <strong>{{ formatTime(finalTime) }}</strong>
              </div>
              <div v-if="!isCorrect" class="text-center q-mt-sm">
                Prawidłowa odpowiedź: <strong>{{ correctWordToLetters }}</strong>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Test Results -->
      <div v-if="testCompleted" class="test-results q-mt-md">
        <q-card>
          <q-card-section class="text-center">
            <div class="text-h4 text-primary">Test zakończony!</div>
            <div class="text-h6 q-mt-md">
              Wynik: {{ correctAnswers }}/{{ testQuestions.length }}
            </div>
            <div class="text-h5 q-mt-sm">
              {{ Math.round((correctAnswers / testQuestions.length) * 100) }}%
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              color="primary"
              label="Powrót do alfabetu"
              @click="exitTest"
              unelevated
            />
            <q-btn
              color="secondary"
              label="Powtórz test"
              @click="startTest(lastTestMode)"
              unelevated
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Alphabet Grid -->
      <div v-if="!testMode" class="alphabet-grid">
        <div
          v-for="item in natoAlphabet"
          :key="item.letter"
          class="alphabet-card"
          @click="playLetter(item)"
        >
          <div class="speaker-icon">
            <q-icon name="volume_up" size="1.2rem" color="primary" />
          </div>

          <div class="letter-display">{{ item.letter }}</div>
          <div class="word-display">{{ item.word }}</div>
          <div class="phonetic-display">{{ item.phonetic }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onUnmounted, nextTick } from 'vue'
import BackNav from 'components/BackNav.vue'

defineOptions({
  name: 'NatoAlphabetPage'
})

const isPlaying = ref(false)

const natoAlphabet = [
  { letter: 'A', word: 'Alpha', phonetic: 'AL-fah', variants: ['alpha', 'alfa'] },
  { letter: 'B', word: 'Bravo', phonetic: 'BRAH-voh', variants: ['bravo'] },
  { letter: 'C', word: 'Charlie', phonetic: 'CHAR-lee', variants: ['charlie', 'charli'] },
  { letter: 'D', word: 'Delta', phonetic: 'DELL-tah', variants: ['delta'] },
  { letter: 'E', word: 'Echo', phonetic: 'ECK-oh', variants: ['echo'] },
  { letter: 'F', word: 'Foxtrot', phonetic: 'FOKS-trot', variants: ['foxtrot', 'fox trot'] },
  { letter: 'G', word: 'Golf', phonetic: 'GOLF', variants: ['golf'] },
  { letter: 'H', word: 'Hotel', phonetic: 'hoh-TELL', variants: ['hotel'] },
  { letter: 'I', word: 'India', phonetic: 'IN-dee-ah', variants: ['india'] },
  { letter: 'J', word: 'Juliet', phonetic: 'JEW-lee-ett', variants: ['juliet', 'juliett'] },
  { letter: 'K', word: 'Kilo', phonetic: 'KEY-loh', variants: ['kilo'] },
  { letter: 'L', word: 'Lima', phonetic: 'LEE-mah', variants: ['lima'] },
  { letter: 'M', word: 'Mike', phonetic: 'MIKE', variants: ['mike'] },
  { letter: 'N', word: 'November', phonetic: 'no-VEM-ber', variants: ['november'] },
  { letter: 'O', word: 'Oscar', phonetic: 'OSS-car', variants: ['oscar'] },
  { letter: 'P', word: 'Papa', phonetic: 'pah-PAH', variants: ['papa'] },
  { letter: 'Q', word: 'Quebec', phonetic: 'keh-BECK', variants: ['quebec', 'quebeck'] },
  { letter: 'R', word: 'Romeo', phonetic: 'ROW-me-oh', variants: ['romeo'] },
  { letter: 'S', word: 'Sierra', phonetic: 'see-AIR-rah', variants: ['sierra', 'siera'] },
  { letter: 'T', word: 'Tango', phonetic: 'TANG-go', variants: ['tango'] },
  { letter: 'U', word: 'Uniform', phonetic: 'YOU-nee-form', variants: ['uniform'] },
  { letter: 'V', word: 'Victor', phonetic: 'VIK-tah', variants: ['victor'] },
  { letter: 'W', word: 'Whiskey', phonetic: 'WISS-key', variants: ['whiskey', 'whisky'] },
  { letter: 'X', word: 'X-ray', phonetic: 'ECKS-ray', variants: ['x-ray', 'xray', 'x ray'] },
  { letter: 'Y', word: 'Yankee', phonetic: 'YANG-key', variants: ['yankee', 'yankie'] },
  { letter: 'Z', word: 'Zulu', phonetic: 'ZOO-loo', variants: ['zulu'] }
]

// Test state
const testMode = ref(null) // 'letter-to-word' or 'word-to-letters'
const lastTestMode = ref(null)
const testQuestions = ref([])
const currentQuestionIndex = ref(0)
const userAnswer = ref('')
const userLettersAnswer = ref('')
const showingResult = ref(false)
const isCorrect = ref(false)
const correctAnswers = ref(0)
const testCompleted = ref(false)
const answerInput = ref(null)
const lettersInput = ref(null)

// Word to letters test state
const currentWord = ref('')
const elapsedTime = ref(0)
const finalTime = ref(0)
const timerInterval = ref(null)
const correctWordToLetters = ref('')

const playLetter = (item) => {
  if (isPlaying.value) {
    speechSynthesis.cancel()
    isPlaying.value = false
    return
  }

  if ('speechSynthesis' in window) {
    const textToSpeak = item.word

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => {
      isPlaying.value = true
    }

    utterance.onend = () => {
      isPlaying.value = false
    }

    utterance.onerror = () => {
      isPlaying.value = false
    }

    speechSynthesis.speak(utterance)
  }
}

// Test functions
const startTest = (mode) => {
  testMode.value = mode
  lastTestMode.value = mode
  testCompleted.value = false
  currentQuestionIndex.value = 0
  correctAnswers.value = 0
  userAnswer.value = ''
  userLettersAnswer.value = ''
  showingResult.value = false

  if (mode === 'letter-to-word') {
    // Generate 10 random letters
    const shuffled = [...natoAlphabet].sort(() => Math.random() - 0.5)
    testQuestions.value = shuffled.slice(0, 10)
  } else if (mode === 'word-to-letters') {
    // Generate random word (5-8 characters)
    const words = ['COBRA', 'DELTA', 'FALCON', 'ECHO', 'TIGER', 'VIPER', 'WHISKY', 'ZULU', 'BRAVO', 'TANGO', 'SIERRA', 'YANKEE']
    currentWord.value = words[Math.floor(Math.random() * words.length)]
    elapsedTime.value = 0
    startTimer()

    // Calculate correct answer
    const letters = currentWord.value.split('')
    correctWordToLetters.value = letters
      .map(letter => natoAlphabet.find(item => item.letter === letter)?.word)
      .join(' ')
  }
}

const exitTest = () => {
  testMode.value = null
  testCompleted.value = false
  stopTimer()
}

const resetTest = () => {
  if (lastTestMode.value) {
    startTest(lastTestMode.value)
  }
}

const checkAnswer = async () => {
  if (!userAnswer.value || showingResult.value) return

  const currentQuestion = testQuestions.value[currentQuestionIndex.value]
  const normalizedAnswer = userAnswer.value.toLowerCase().trim()

  // Check if answer matches any variant
  isCorrect.value = currentQuestion.variants.some(variant =>
    variant.toLowerCase() === normalizedAnswer
  )

  if (isCorrect.value) {
    correctAnswers.value++
  }

  showingResult.value = true

  // Wait 2 seconds before moving to next question
  setTimeout(() => {
    if (currentQuestionIndex.value < testQuestions.value.length - 1) {
      currentQuestionIndex.value++
      userAnswer.value = ''
      showingResult.value = false
      isCorrect.value = false

      // Focus input
      nextTick(() => {
        if (answerInput.value) {
          answerInput.value.focus()
        }
      })
    } else {
      testCompleted.value = true
      testMode.value = null
    }
  }, 2000)
}

const checkWordToLetters = () => {
  if (!userLettersAnswer.value || showingResult.value) return

  stopTimer()
  finalTime.value = elapsedTime.value

  // Normalize user answer
  const userWords = userLettersAnswer.value
    .toLowerCase()
    .trim()
    .split(/\s+/)

  // Get correct letters
  const letters = currentWord.value.split('')
  const correctWords = letters.map(letter =>
    natoAlphabet.find(item => item.letter === letter)
  )

  // Check if all letters match (using variants)
  isCorrect.value = letters.length === userWords.length &&
    userWords.every((word, index) => {
      const correctItem = correctWords[index]
      return correctItem && correctItem.variants.some(variant =>
        variant.toLowerCase() === word
      )
    })

  showingResult.value = true

  if (isCorrect.value) {
    correctAnswers.value = 1
  }
}

const startTimer = () => {
  stopTimer()
  timerInterval.value = setInterval(() => {
    elapsedTime.value++
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Cleanup
onUnmounted(() => {
  stopTimer()
  if (isPlaying.value) {
    speechSynthesis.cancel()
  }
})
</script>

<style scoped>
.nato-page {
  background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(139, 69, 19, 0.3);
}

.alphabet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.alphabet-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.alphabet-card:hover {
  border-color: #1976d2;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.2);
}

.alphabet-card:active {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
}

.speaker-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(25, 118, 210, 0.1);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.alphabet-card:hover .speaker-icon {
  background: rgba(25, 118, 210, 0.2);
  transform: scale(1.1);
}

.letter-display {
  font-size: 3rem;
  font-weight: bold;
  color: #1976d2;
  margin: 16px 0 12px 0;
  line-height: 1;
}

.word-display {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.phonetic-display {
  font-size: 0.95rem;
  color: #6c757d;
  font-family: 'Courier New', monospace;
  font-style: italic;
}

/* Test Styles */
.test-container {
  max-width: 600px;
  margin: 0 auto;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.test-card {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.test-letter {
  font-size: 6rem;
  font-weight: bold;
  color: #1976d2;
  line-height: 1;
  margin: 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.test-word {
  font-size: 3rem;
  font-weight: bold;
  color: #1976d2;
  line-height: 1;
  margin: 20px 0;
  letter-spacing: 0.3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.correct-answer {
  background: linear-gradient(135deg, #43a047 0%, #66bb6a 100%);
  color: white;
  animation: slideIn 0.3s ease-out;
}

.correct-answer .q-icon {
  color: white;
}

.incorrect-answer {
  background: linear-gradient(135deg, #e53935 0%, #ef5350 100%);
  color: white;
  animation: slideIn 0.3s ease-out;
}

.incorrect-answer .q-icon {
  color: white;
}

.test-results {
  max-width: 500px;
  margin: 0 auto;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .test-letter {
    font-size: 4rem;
  }

  .test-word {
    font-size: 2rem;
    letter-spacing: 0.2rem;
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .alphabet-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }

  .alphabet-card {
    padding: 20px 16px;
  }

  .letter-display {
    font-size: 2.5rem;
  }

  .word-display {
    font-size: 1.1rem;
  }

  .phonetic-display {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .alphabet-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .alphabet-card {
    padding: 16px 12px;
  }

  .letter-display {
    font-size: 2rem;
    margin: 12px 0 8px 0;
  }

  .word-display {
    font-size: 1rem;
  }

  .phonetic-display {
    font-size: 0.8rem;
  }

  .speaker-icon {
    width: 28px;
    height: 28px;
    top: 8px;
    right: 8px;
  }

  .page-header .row {
    flex-direction: column;
    text-align: center;
  }
}
</style>
