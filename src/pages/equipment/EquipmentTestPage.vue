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
          <div v-else-if="question.type === 'fillblank'">
            <div class="q-mb-sm">
              <span v-for="(part, pIdx) in question.parts" :key="pIdx">
                <template v-if="typeof part === 'string'">{{ part }}</template>
                <template v-else>
                  <q-input v-model="userAnswers[idx][part.blankIdx]" dense standout style="display:inline-block;width:120px;margin:0 4px;vertical-align:middle;" :label="part.label" />
                </template>
              </span>
            </div>
          </div>
          <div v-else-if="question.type === 'multiinput-image'">
            <div v-for="(input, iIdx) in question.inputs" :key="iIdx" class="q-mb-sm">
              <q-input v-model="userAnswers[idx][iIdx]" :label="`Element ${input.number}`" />
            </div>
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
  // 1
  {
    question: 'Jaka jest maksymalna donośność naboju moździerzowego z pociskiem odłamkowym z dodatkowym ładunkiem miotającym O-LM60?',
    answers: ['1000m', '1100m', '1300m'],
    correct: 1,
    type: 'single'
  },
  // 2
  {
    question: 'Podaj kaliber Karabinu Wyborowego BOR.',
    answers: ['.308w', '7.62', '7.66'],
    correct: 1,
    type: 'single'
  },
  // 3
  {
    question: 'Podaj wagę Karabinu Wyborowego BOR.',
    answers: ['7,5 kg', '5,7 kg', '6,2 kg'],
    correct: 0,
    type: 'single'
  },
  // 4
  {
    question: 'Jaki jest skok gwintu w lufie karabinu wyborowego BOR?',
    answers: ['250 mm', '240 mm', '255 mm'],
    correct: 0,
    type: 'single'
  },
  // 5
  {
    question: 'Jaka jest prędkość początkowa pocisku karabinu wyborowego BOR?',
    answers: ['360 m/s', '400 m/s', '500 m/s'],
    correct: 0,
    type: 'single'
  },
  // 6
  {
    question: 'Które z poniższych funkcji są charakterystyczne dla termowizora Rubin?',
    answers: ['Wykrywanie promieniowania UV', 'Obrazowanie w podczerwieni', 'Analiza widma światła widzialnego'],
    correct: 1,
    type: 'single'
  },
  // 7
  {
    question: 'Do jakiego głównego zastosowania przeznaczony jest noktowizor MU-3?',
    answers: ['Obserwacji i detekcji celów w całkowitej ciemności', 'Pomiaru odległości za pomocą wbudowanego dalmierza', 'Rejestracji obrazu w spektrum światła widzialnego'],
    correct: 0,
    type: 'single'
  },
  // 8
  {
    question: 'Czym różni się główne zastosowanie celownika termowizyjnego SCT Rubin od gogli noktowizyjnych MU-3?',
    answers: ['Rubin służy do obserwacji w świetle widzialnym, a MU-3 do detekcji ciepła', 'Rubin umożliwia precyzyjne celowanie w oparciu o emisję ciepła. A MU-3 wspomaga widzenie w warunkach ograniczonego oświetlenia', 'Rubin działa wyłącznie w dzień, a MU-3 wyłącznie w nocy'],
    correct: 1,
    type: 'single'
  },
  // 9
  {
    question: 'Która pozycja przełącznika ognia umożliwia strzelanie ze spustu w LMP-60?',
    answers: ['Tryb Pracy T', 'Tryb Pracy S', 'Tryb Pracy A'],
    correct: 0,
    type: 'single'
  },
  // 10
  {
    question: 'Jaki jest zasięg skuteczny granatnika GP40?',
    answers: ['od 40m do 400m', 'od 50m do 400m', 'od 50m do 350m'],
    correct: 1,
    type: 'single'
  },
  // 11
  {
    question: 'Z jakiego „zamka” strzela UKM-2000 P?',
    answers: ['Otwartego z iglicą ruchomą', 'Zamkniętego z iglicą stałą', 'Otwartego z iglicą stałą'],
    correct: 2,
    type: 'single'
  },
  // 12
  {
    question: 'Czy celowniczy sam nosi całą swoją amunicję?',
    answers: ['Tak, jak każdy członek sekcji', 'Nie, amunicja jest rozdystrybuowana na członków sekcji', 'Nie, amunicję nosi dla niego strzelec'],
    correct: 1,
    type: 'single'
  },
  // 13
  {
    question: 'Ile zapasowych luf ma celowniczy UKM?',
    answers: ['1', '2', '3'],
    correct: 0,
    type: 'single'
  },
  // 14
  {
    question: 'Kim jest celowniczy UKM w sekcji L.P.?',
    answers: ['Wsparciem ogniowym', 'Głównym środkiem ogniowym', 'Pośrednim środkiem ogniowym'],
    correct: 1,
    type: 'single'
  },
  // 15
  {
    question: 'UKM-2000 P służy do wsparcia ogniowego pododdziału, eliminowania siły żywej przeciwnika, sprzętu lekkiego przeciwnika, oraz eliminowania czołgów oraz lekkich i średnich pojazdów przeciwnika.',
    answers: ['Prawda', 'Fałsz'],
    correct: 1,
    type: 'single'
  },
  // 16
  {
    question: 'Amunicja smugowa służy do:',
    answers: ['Oddziaływania na psychikę przeciwnika', 'Łatwiejszego wcelowania się w cel', 'Doświetlania celu'],
    correct: 1,
    type: 'single'
  },
  // 17
  {
    question: 'Co powoduje przesuwanie się taśmy po strzale?',
    answers: ['Mechanizm przesuwu taśmy, uruchamiany przez cofającą się rolkę na suwadle', 'Cofający się tłok', 'Cofająca się lufa'],
    correct: 0,
    type: 'single'
  },
  // 18
  {
    question: 'Siła spustu w systemie SA?',
    answers: ['25N', '50N', '5kg'],
    correct: 0,
    type: 'single'
  },
  // 19
  {
    question: 'Zasada działania pistoletu VIS-100?',
    answers: ['Krótki odrzut lufy', 'Swobodny odrzut zamka', 'Obrót lufy'],
    correct: 0,
    type: 'single'
  },
  // 20
  {
    question: 'Jakie bezpieczniki posiada VIS-100?',
    type: 'open',
    correct: 'Wewnętrzny blokada iglicy, zewnętrzny bezpiecznik skrzydełkowy, przerywacz'
  },
  // 21
  {
    question: 'Co to jest absolute co-witness?',
    type: 'open',
    correct: 'Takie ustawienie muszki względem znaku celowniczego, gdzie znak celowniczy opiera się podstawą o muszkę'
  },
  // 22
  {
    question: 'Podaj nazwy elementów pistoletu VIS 100 zgodnie z numeracją na schemacie.',
    type: 'multiinput-image',
    image: visTestImg,
    inputs: Array.from({ length: 16 }, (_, i) => ({ number: i + 1 })),
    correct: [
      'Zamek', 'Lufa', 'Dźwignia zatrzymywania zamka', 'Przyrządy celownicze', 'Kurek', 'Dźwignia zwalniania kurka', 'Nakładki chwytu', 'Wkręt nakładek', 'Uchwyt mocowania smyczy', 'Magazynek', 'Zatrzask magazynka', 'Język spustowy', 'Dźwignia do rozkładania pistoletu', 'Szkielet chwytu', 'Szyna Picatinny', 'Zsp. sprężyny powrotnej'
    ]
  },
  // --- Dodane na podstawie nowych screenów ---
  {
    question: 'W instrukcji producent przewiduje pracę naboju moździerzowego z pociskiem oświetleniowym S-LM60 w zakresie temperatur od 243K do 323K. Jakie są temperatury wyrażone w stopniach Celsjusza?',
    answers: [
      'od -40 stopni C do +40 stopni C',
      'od -30 stopni C do +50 stopni C',
      'od -35 stopni C do +45 stopni C'
    ],
    correct: 1,
    type: 'single'
  },
  {
    question: 'Zgodnie z Art. 358 § 1 i 2 KK żołnierz, który samowolnie dysponuje bronią, amunicją, materiałem wybuchowym lub innym środkiem walki, podlega karze aresztu wojskowego albo pozbawienia wolności do ... lat, a żołnierz, który samowolnie zabiera broń, amunicję, materiał wybuchowy lub inny środek walki, podlega karze pozbawienia wolności od ... do ... lat.',
    type: 'fillblank',
    parts: [
      'Zgodnie z Art. 358 § 1 i 2 KK żołnierz, który samowolnie dysponuje bronią, amunicją, materiałem wybuchowym lub innym środkiem walki, podlega karze aresztu wojskowego albo pozbawienia wolności do ',
      { blankIdx: 0, label: 'lat', correct: '3' },
      ' lat, a żołnierz, który samowolnie zabiera broń, amunicję, materiał wybuchowy lub inny środek walki, podlega karze pozbawienia wolności od ',
      { blankIdx: 1, label: 'od', correct: '1' },
      ' do ',
      { blankIdx: 2, label: 'do', correct: '10' },
      ' lat.'
    ]
  },
  {
    question: 'Zgodnie z Art. 359 KK żołnierz, który nie dopełniając obowiązku lub przekraczając uprawnienia w zakresie ochrony lub nadzoru nad bronią, amunicją, materiałem wybuchowym lub innym środkiem walki, powoduje choćby nieumyślnie ich utratę, podlega karze aresztu wojskowego albo pozbawienia wolności od ... miesięcy do ... lat.',
    type: 'fillblank',
    parts: [
      'Zgodnie z Art. 359 KK żołnierz, który nie dopełniając obowiązku lub przekraczając uprawnienia w zakresie ochrony lub nadzoru nad bronią, amunicją, materiałem wybuchowym lub innym środkiem walki, powoduje choćby nieumyślnie ich utratę, podlega karze aresztu wojskowego albo pozbawienia wolności od ',
      { blankIdx: 0, label: 'miesięcy', correct: '3' },
      ' miesięcy do ',
      { blankIdx: 1, label: 'lat', correct: '5' },
      ' lat.'
    ]
  },
  {
    question: 'Zgodnie z Art. 354 § 1 i 2 KK żołnierz, który nieostrożnie obchodzi się z bronią wojskową, amunicją, materiałem wybuchowym lub innym środkiem walki, albo ich nieostrożnie używa i przez to nieumyślnie powoduje naruszenie czynności narządu ciała lub rozstrój zdrowia innej osoby, podlega karze aresztu wojskowego albo pozbawienia wolności do ... lat, a jeżeli następstwem czynu jest śmierć innej osoby lub ciężki uszczerbek na jej zdrowiu, sprawca podlega karze pozbawienia wolności od ... do ... lat.',
    type: 'fillblank',
    parts: [
      'Zgodnie z Art. 354 § 1 i 2 KK żołnierz, który nieostrożnie obchodzi się z bronią wojskową, amunicją, materiałem wybuchowym lub innym środkiem walki, albo ich nieostrożnie używa i przez to nieumyślnie powoduje naruszenie czynności narządu ciała lub rozstrój zdrowia innej osoby, podlega karze aresztu wojskowego albo pozbawienia wolności do ',
      { blankIdx: 0, label: 'lat', correct: '3' },
      ' lat, a jeżeli następstwem czynu jest śmierć innej osoby lub ciężki uszczerbek na jej zdrowiu, sprawca podlega karze pozbawienia wolności od ',
      { blankIdx: 1, label: 'od', correct: '6' },
      ' do ',
      { blankIdx: 2, label: 'do', correct: '8' },
      ' lat.'
    ]
  }
]

const userAnswers = ref(Array(questions.length).fill(null))

// Ensure userAnswers is initialized for fillblank and multiinput-image questions
questions.forEach((q, idx) => {
  if (q.type === 'fillblank' && Array.isArray(q.parts)) {
    // Count blanks in parts
    const blanksCount = q.parts.filter(part => typeof part === 'object' && 'blankIdx' in part).length
    userAnswers.value[idx] = Array(blanksCount).fill('')
  } else if (q.type === 'fillblank' && Array.isArray(q.blanks)) {
    userAnswers.value[idx] = Array(q.blanks.length).fill('')
  } else if (q.type === 'multiinput-image' && Array.isArray(q.inputs)) {
    userAnswers.value[idx] = Array(q.inputs.length).fill('')
  }
})

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
