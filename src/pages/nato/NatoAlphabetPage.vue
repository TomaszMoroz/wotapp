<template>
  <q-page class="nato-page">
    <div class="container q-pa-md">
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

      <!-- Alphabet Grid -->
      <div class="alphabet-grid">
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
import { ref } from 'vue'

defineOptions({
  name: 'NatoAlphabetPage'
})

const isPlaying = ref(false)

const natoAlphabet = [
  { letter: 'A', word: 'Alpha', phonetic: 'AL-fah' },
  { letter: 'B', word: 'Bravo', phonetic: 'BRAH-voh' },
  { letter: 'C', word: 'Charlie', phonetic: 'CHAR-lee' },
  { letter: 'D', word: 'Delta', phonetic: 'DELL-tah' },
  { letter: 'E', word: 'Echo', phonetic: 'ECK-oh' },
  { letter: 'F', word: 'Foxtrot', phonetic: 'FOKS-trot' },
  { letter: 'G', word: 'Golf', phonetic: 'GOLF' },
  { letter: 'H', word: 'Hotel', phonetic: 'hoh-TELL' },
  { letter: 'I', word: 'India', phonetic: 'IN-dee-ah' },
  { letter: 'J', word: 'Juliet', phonetic: 'JEW-lee-ett' },
  { letter: 'K', word: 'Kilo', phonetic: 'KEY-loh' },
  { letter: 'L', word: 'Lima', phonetic: 'LEE-mah' },
  { letter: 'M', word: 'Mike', phonetic: 'MIKE' },
  { letter: 'N', word: 'November', phonetic: 'no-VEM-ber' },
  { letter: 'O', word: 'Oscar', phonetic: 'OSS-car' },
  { letter: 'P', word: 'Papa', phonetic: 'pah-PAH' },
  { letter: 'Q', word: 'Quebec', phonetic: 'keh-BECK' },
  { letter: 'R', word: 'Romeo', phonetic: 'ROW-me-oh' },
  { letter: 'S', word: 'Sierra', phonetic: 'see-AIR-rah' },
  { letter: 'T', word: 'Tango', phonetic: 'TANG-go' },
  { letter: 'U', word: 'Uniform', phonetic: 'YOU-nee-form' },
  { letter: 'V', word: 'Victor', phonetic: 'VIK-tah' },
  { letter: 'W', word: 'Whiskey', phonetic: 'WISS-key' },
  { letter: 'X', word: 'X-ray', phonetic: 'ECKS-ray' },
  { letter: 'Y', word: 'Yankee', phonetic: 'YANG-key' },
  { letter: 'Z', word: 'Zulu', phonetic: 'ZOO-loo' }
]

const playLetter = (item) => {
  if (isPlaying.value) {
    speechSynthesis.cancel()
    isPlaying.value = false
    return
  }

  if ('speechSynthesis' in window) {
    // Odtwarzaj tylko słowo kodowe
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
