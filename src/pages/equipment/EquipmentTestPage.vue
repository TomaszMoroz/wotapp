<template>
  <q-page class="q-pa-md">
    <BackNav title="Test z broni" />
    <div class="row q-col-gutter-md q-mb-lg">
      <q-card v-for="(question, idx) in questions" :key="idx" class="q-mb-md full-width">
        <q-card-section>
          <div class="text-h6 q-mb-sm">{{ idx + 1 }}. {{ question.question }}</div>
          <div v-if="question.image" class="q-mb-md equipment-test-image-wrapper">
            <div class="equipment-test-image-container">
              <img :src="question.image" class="equipment-test-image" @click="showImage(question.image)" />
              <q-btn round dense flat icon="search" class="equipment-test-image-zoom" @click.stop="showImage(question.image)" />
            </div>
          </div>
          <div v-if="question.type === 'single'">
            <q-option-group
              v-model="userAnswers[idx]"
              :options="question.answers.map((a, i) => ({ label: a, value: i }))"
              type="radio"
              color="primary"
            />
          </div>
          <div v-else-if="question.type === 'open'">
            <q-input v-model="userAnswers[idx]" type="textarea" autogrow label="Twoja odpowiedź" />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-btn color="primary" label="Sprawdź wynik" @click="checkResults" class="full-width q-mb-md" />
    <q-dialog v-model="showModal">
      <q-card class="equipment-test-modal-card">
        <q-card-section class="row items-center justify-end">
          <q-btn round dense flat icon="close" @click="showModal = false" />
        </q-card-section>
        <q-card-section>
          <img :src="modalImage" class="equipment-test-modal-image" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showResult">
      <q-card>
        <q-card-section>
          <div class="text-h6">Twój wynik: {{ score }}/{{ questions.length }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Zamknij" color="primary" v-close-popup @click="showResult = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import BackNav from 'components/BackNav.vue'
import visTestImg from 'assets/visTest.png'

const questions = [
  {
    question: 'Jaka jest maksymalna donośność naboju moździerzowego z pociskiem odłamkowym z dodatkowym ładunkiem miotającym O-LM60?',
    answers: ['1000m', '1100m', '1300m'],
    correct: 1,
    type: 'single'
  },
  {
    question: 'Podaj nazwy elementów pistoletu VIS 100 zgodnie z numeracją na schemacie.',
    type: 'multiinput-image',
    image: visTestImg,
    inputs: Array.from({ length: 16 }, (_, i) => ({ number: i + 1 })),
    correct: [
      'Zamek',
      'Lufa',
      'Dźwignia zatrzymywania zamka',
      'Przyrządy celownicze',
      'Kurek',
      'Dźwignia zwalniania kurka',
      'Nakładki chwytu',
      'Wkręt nakładek',
      'Uchwyt mocowania smyczy',
      'Magazynek',
      'Zatrzask magazynka',
      'Język spustowy',
      'Dźwignia do rozkładania pistoletu',
      'Szkielet chwytu',
      'Szyna Picatinny',
      'Zsp. sprężyny powrotnej'
    ]
  },
  {
    question: 'Co to jest absolute co-witness?',
    answers: [],
    correct: 'Takie ustawienie muszki względem znaku celowniczego, gdzie znak celowniczy opiera się podstawą o muszkę',
    type: 'open'
  },
  {
    question: 'Podaj kaliber Karabinu Wyborowego BOR.',
    answers: ['.308w', '7.62', '7.66'],
    correct: 1,
    type: 'single'
  },
  {
    question: 'Podaj wagę Karabinu Wyborowego BOR.',
    answers: ['7,5 kg', '5,7 kg', '6,2 kg'],
    correct: 0,
    type: 'single'
  },
  {
    question: 'Które z poniższych funkcji są charakterystyczne dla termowizora Rubin?',
    answers: [
      'Wykrywanie promieniowania UV',
      'Obrazowanie w podczerwieni',
      'Analiza widma światła widzialnego'
    ],
    correct: 1,
    type: 'single'
  },
  {
    question: 'Do jakiego głównego zastosowania przeznaczony jest noktowizor MU-3?',
    answers: [
      'Obserwacji i detekcji celów w całkowitej ciemności',
      'Pomiaru odległości za pomocą wbudowanego dalmierza',
      'Rejestracji obrazu w spektrum światła widzialnego'
    ],
    correct: 0,
    type: 'single'
  },
  {
    question: 'Czym różni się główne zastosowanie celownika termowizyjnego SCT Rubin od gogli noktowizyjnych MU-3?',
    answers: [
      'Rubin służy do obserwacji w świetle widzialnym, a MU-3 do detekcji ciepła',
      'Rubin umożliwia precyzyjne celowanie w oparciu o emisję ciepła. A MU-3 wspomaga widzenie w warunkach ograniczonego oświetlenia',
      'Rubin działa wyłącznie w dzień, a MU-3 wyłącznie w nocy'
    ],
    correct: 1,
    type: 'single'
  },
  {
    question: 'Która pozycja przełącznika ognia umożliwia strzelanie ze spustu w LMP-60?',
    answers: [
      'Tryb Pracy T',
      'Tryb Pracy S',
      'Tryb Pracy A'
    ],
    correct: 0,
    type: 'single'
  },
  {
    question: 'Jaki jest zasięg skuteczny granatnika GP40?',
    answers: [
      'od 40m do 400m',
      'od 50m do 400m',
      'od 50m do 350m'
    ],
    correct: 1,
    type: 'single'
  },
  {
    question: 'Z jakiego „zamka” strzela UKM-2000 P?',
    answers: [
      'Otwartego z iglicą ruchomą',
      'Zamkniętego z iglicą stałą',
      'Otwartego z iglicą stałą'
    ],
    correct: 2,
    type: 'single'
  },
  {
    question: 'Czy celowniczy sam nosi całą swoją amunicję?',
    answers: [
      'Tak, jak każdy członek sekcji',
      'Nie, amunicja jest rozdystrybuowana na członków sekcji',
      'Nie, amunicję nosi dla niego strzelec'
    ],
    correct: 1,
    type: 'single'
  },
  {
    question: 'Ile zapasowych luf ma celowniczy UKM?',
    answers: ['1', '2', '3'],
    correct: 0,
    type: 'single'
  },
  {
    question: 'Kim jest celowniczy UKM w sekcji L.P.?',
    answers: [
      'Wsparciem ogniowym',
      'Głównym środkiem ogniowym',
      'Pośrednim środkiem ogniowym'
    ],
    correct: 1,
    type: 'single'
  },
  {
    question: 'UKM-2000 P służy do wsparcia ogniowego pododdziału, eliminowania siły żywej przeciwnika, sprzętu lekkiego przeciwnika, oraz eliminowania czołgów oraz lekkich i średnich pojazdów przeciwnika.',
    answers: ['Prawda', 'Fałsz'],
    correct: 1,
    type: 'single'
  },
  {
    question: 'Amunicja smugowa służy do:',
    answers: [
      'Oddziaływania na psychikę przeciwnika',
      'Łatwiejszego wcelowania się w cel',
      'Doświetlania celu'
    ],
    correct: 1,
    type: 'single'
  },
  {
    question: 'Co powoduje przesuwanie się taśmy po strzale?',
    answers: [
      'Mechanizm przesuwu taśmy, uruchamiany przez cofającą się rolkę na suwadle',
      'Cofający się tłok',
      'Cofająca się lufa'
    ],
    correct: 0,
    type: 'single'
  },
  {
    question: 'Skok gwintu w lufie wynosi:',
    answers: [
      '250 mm',
      '240 mm',
      '255 mm'
    ],
    correct: 0,
    type: 'single'
  },
  {
    question: 'Siła spustu w systemie SA:',
    answers: [
      '25N',
      '50N',
      '5kg'
    ],
    correct: 0,
    type: 'single'
  },
  {
    question: 'Jaka jest prędkość początkowa pocisku?',
    answers: [
      '360 m/s',
      '400 m/s',
      '500 m/s'
    ],
    correct: 0,
    type: 'single'
  },
  {
    question: 'Zasada działania:',
    answers: [
      'Krótki odrzut lufy',
      'Swobodny odrzut zamka',
      'Obrót lufy'
    ],
    correct: 0,
    type: 'single'
  },
  {
    question: 'Jakie bezpieczniki posiada VIS-100?',
    answers: [],
    correct: 'Wewnętrzny blokada iglicy, zewnętrzny bezpiecznik skrzydełkowy, przerywacz',
    type: 'open'
  },
  {
    question: 'Podaj nazwy elementów pistoletu VIS 100 zgodnie z numeracją na schemacie.',
    type: 'multiinput-image',
    image: visTestImg,
    inputs: Array.from({ length: 16 }, (_, i) => ({ number: i + 1 })),
    correct: [
      'Zamek',
      'Lufa',
      'Dźwignia zatrzymywania zamka',
      'Przyrządy celownicze',
      'Kurek',
      'Dźwignia zwalniania kurka',
      'Nakładki chwytu',
      'Wkręt nakładek',
      'Uchwyt mocowania smyczy',
      'Magazynek',
      'Zatrzask magazynka',
      'Język spustowy',
      'Dźwignia do rozkładania pistoletu',
      'Szkielet chwytu',
      'Szyna Picatinny',
      'Zsp. sprężyny powrotnej'
    ]
  }
]

const userAnswers = ref(Array(questions.length).fill(null))
const showModal = ref(false)
const modalImage = ref('')
const showResult = ref(false)
const score = ref(0)

function showImage (img) {
  modalImage.value = img
  showModal.value = true
}

function checkResults () {
  let points = 0
  questions.forEach((q, i) => {
    if (q.type === 'single' && userAnswers.value[i] === q.correct) points++
    // pytania otwarte nie są oceniane automatycznie
  })
  score.value = points
  showResult.value = true
}
</script>

<style scoped>
.equipment-test-image-wrapper {
  position: relative;
  max-width: 320px;
}
.equipment-test-image-container {
  position: relative;
}
.equipment-test-image {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
}
.equipment-test-image-zoom {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255,255,255,0.85);
  z-index: 2;
}
.equipment-test-modal-card {
  max-width: 90vw;
  max-height: 90vh;
}
.equipment-test-modal-image {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
}
@media (max-width: 600px) {
  .equipment-test-image-wrapper {
    max-width: 100vw;
  }
  .equipment-test-modal-card {
    max-width: 100vw;
    max-height: 100vh;
  }
  .equipment-test-modal-image {
    max-height: 70vh;
  }
}
</style>
