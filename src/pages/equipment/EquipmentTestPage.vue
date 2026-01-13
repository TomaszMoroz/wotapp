<template>
  <q-page class="equipment-test-page-bg q-pa-md">
    <div class="test-header-row">
      <div class="test-header-nav">
        <BackNav color="black"/>
      </div>
      <div class="test-header-title text-h4">Test</div>
    </div>
    <div v-for="cat in categories" :key="cat" class="q-mb-xl">
      <div class="text-subtitle2 q-mb-md" style="color:#222;">{{ cat }}</div>
      <div class="row q-col-gutter-md q-mb-lg">
        <q-card v-for="(question, idx) in questionsByCategory(cat)" :key="idx" class="q-mb-md full-width" :class="{ 'wrong-answer': showChecked && isQuestionWrong(question) }">
          <q-card-section>
            <div v-if="question.category" class="q-mb-xs text-caption text-weight-bold" style="color:#222; background:#e0e0e0; border-radius:6px; padding:2px 10px; min-width:120px; text-align:left;">
              {{ question.category }}
            </div>
            <div class="text-h6 q-mb-sm">{{ question.question }}</div>
            <div v-if="question.image" class="q-mb-md equipment-test-image-wrapper">
              <div class="equipment-test-image-container">
                <img :src="question.image" class="equipment-test-image" @click="showImage(question.image)" />
                <q-btn round dense flat icon="search" class="equipment-test-image-zoom" @click.stop="showImage(question.image)" />
              </div>
            </div>
            <div v-if="question.type === 'single'">
              <q-option-group
                v-model="userAnswers[question._idx]"
                :options="question.answers.map((a, i) => ({ label: a, value: i }))"
                type="radio"
                color="primary"
              />
            </div>
            <div v-else-if="question.type === 'open'">
              <q-input v-model="userAnswers[question._idx]" type="textarea" autogrow label="Twoja odpowiedź" />
            </div>
            <div v-else-if="question.type === 'fillblank'">
              <div class="q-mb-sm">
                <span v-for="(part, pIdx) in question.parts" :key="pIdx">
                  <template v-if="typeof part === 'string'">{{ part }}</template>
                  <template v-else>
                    <q-input v-model="userAnswers[question._idx][part.blankIdx]" dense standout style="display:inline-block;width:120px;margin:0 4px;vertical-align:middle;"
                      :label="part.label"
                      :class="{ 'wrong-answer-input': showChecked && !isFillBlankCorrect(question._idx, part.blankIdx) }"
                    />
                  </template>
                </span>
              </div>
            </div>
            <div v-else-if="question.type === 'multiinput-image'">
              <div v-for="(input, iIdx) in question.inputs" :key="iIdx" class="q-mb-sm">
                <q-select
                  v-model="userAnswers[question._idx][iIdx]"
                  :options="question.correct"
                  :label="`Element ${input.number}`"
                  dense
                  emit-value
                  map-options
                  :class="{ 'wrong-answer-input': showChecked && !isMultiInputCorrect(question._idx, iIdx) }"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-btn color="primary" label="Sprawdź wynik" @click="checkResults" class="full-width q-mb-md" />
    <q-btn color="negative" label="Reset" @click="resetTest" class="full-width q-mb-md" />
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
          <div class="text-h6">Twój wynik: {{ score }} trafnych odpowiedzi na {{ questions.length }} pytań</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Zamknij" color="primary" v-close-popup />
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
    type: 'single',
    category: 'Moździerz'
  },
  // 2
  {
    question: 'Podaj kaliber Karabinu Wyborowego BOR.',
    answers: ['.308w', '7.62', '7.66'],
    correct: 1,
    type: 'single',
    category: 'BOR'
  },
  // 3
  {
    question: 'Podaj wagę Karabinu Wyborowego BOR.',
    answers: ['7,5 kg', '5,7 kg', '6,2 kg'],
    correct: 0,
    type: 'single',
    category: 'BOR'
  },
  // 4
  {
    question: 'Jaki jest skok gwintu w lufie karabinu wyborowego BOR?',
    answers: ['250 mm', '240 mm', '255 mm'],
    correct: 0,
    type: 'single',
    category: 'BOR'
  },
  // 5
  {
    question: 'Jaka jest prędkość początkowa pocisku karabinu wyborowego BOR?',
    answers: ['360 m/s', '400 m/s', '500 m/s'],
    correct: 0,
    type: 'single',
    category: 'BOR'
  },
  // 6
  {
    question: 'Które z poniższych funkcji są charakterystyczne dla termowizora Rubin?',
    answers: ['Wykrywanie promieniowania UV', 'Obrazowanie w podczerwieni', 'Analiza widma światła widzialnego'],
    correct: 1,
    type: 'single',
    category: 'Opto'
  },
  // 7
  {
    question: 'Do jakiego głównego zastosowania przeznaczony jest noktowizor MU-3?',
    answers: ['Obserwacji i detekcji celów w całkowitej ciemności', 'Pomiaru odległości za pomocą wbudowanego dalmierza', 'Rejestracji obrazu w spektrum światła widzialnego'],
    correct: 0,
    type: 'single',
    category: 'Opto'
  },
  // 8
  {
    question: 'Czym różni się główne zastosowanie celownika termowizyjnego SCT Rubin od gogli noktowizyjnych MU-3?',
    answers: ['Rubin służy do obserwacji w świetle widzialnym, a MU-3 do detekcji ciepła', 'Rubin umożliwia precyzyjne celowanie w oparciu o emisję ciepła. A MU-3 wspomaga widzenie w warunkach ograniczonego oświetlenia', 'Rubin działa wyłącznie w dzień, a MU-3 wyłącznie w nocy'],
    correct: 1,
    type: 'single',
    category: 'Opto'
  },
  // 9
  {
    question: 'Która pozycja przełącznika ognia umożliwia strzelanie ze spustu w LMP-60?',
    answers: ['Tryb Pracy T', 'Tryb Pracy S', 'Tryb Pracy A'],
    correct: 0,
    type: 'single',
    category: 'Granatnik'
  },
  // 10
  {
    question: 'Jaki jest zasięg skuteczny granatnika GP40?',
    answers: ['od 40m do 400m', 'od 50m do 400m', 'od 50m do 350m'],
    correct: 1,
    type: 'single',
    category: 'Granatnik'
  },
  // 11
  {
    question: 'Z jakiego „zamka” strzela UKM-2000 P?',
    answers: ['Otwartego z iglicą ruchomą', 'Zamkniętego z iglicą stałą', 'Otwartego z iglicą stałą'],
    correct: 2,
    type: 'single',
    category: 'UKM'
  },
  // 12
  {
    question: 'Czy celowniczy sam nosi całą swoją amunicję?',
    answers: ['Tak, jak każdy członek sekcji', 'Nie, amunicja jest rozdystrybuowana na członków sekcji', 'Nie, amunicję nosi dla niego strzelec'],
    correct: 1,
    type: 'single',
    category: 'UKM'
  },
  // 13
  {
    question: 'Ile zapasowych luf ma celowniczy UKM?',
    answers: ['1', '2', '3'],
    correct: 0,
    type: 'single',
    category: 'UKM'
  },
  // 14
  {
    question: 'Kim jest celowniczy UKM w sekcji L.P.?',
    answers: ['Wsparciem ogniowym', 'Głównym środkiem ogniowym', 'Pośrednim środkiem ogniowym'],
    correct: 1,
    type: 'single',
    category: 'UKM'
  },
  // 15
  {
    question: 'UKM-2000 P służy do wsparcia ogniowego pododdziału, eliminowania siły żywej przeciwnika, sprzętu lekkiego przeciwnika, oraz eliminowania czołgów oraz lekkich i średnich pojazdów przeciwnika.',
    answers: ['Prawda', 'Fałsz'],
    correct: 1,
    type: 'single',
    category: 'UKM'
  },
  // 16
  {
    question: 'Amunicja smugowa służy do:',
    answers: ['Oddziaływania na psychikę przeciwnika', 'Łatwiejszego wcelowania się w cel', 'Doświetlania celu'],
    correct: 1,
    type: 'single',
    category: 'Granatnik'
  },
  // 17
  {
    question: 'Co powoduje przesuwanie się taśmy po strzale?',
    answers: ['Mechanizm przesuwu taśmy, uruchamiany przez cofającą się rolkę na suwadle', 'Cofający się tłok', 'Cofająca się lufa'],
    correct: 0,
    type: 'single',
    category: 'Granatnik'
  },
  // 18
  {
    question: 'Siła spustu w systemie SA?',
    answers: ['25N', '50N', '5kg'],
    correct: 0,
    type: 'single',
    category: 'VIS-100'
  },
  // 19
  {
    question: 'Zasada działania pistoletu VIS-100?',
    answers: ['Krótki odrzut lufy', 'Swobodny odrzut zamka', 'Obrót lufy'],
    correct: 0,
    type: 'single',
    category: 'VIS-100'
  },
  // 20
  {
    question: 'Jakie bezpieczniki posiada VIS-100?',
    type: 'open',
    correct: 'Wewnętrzny blokada iglicy, zewnętrzny bezpiecznik skrzydełkowy, przerywacz',
    category: 'VIS-100'
  },
  // 21
  {
    question: 'Co to jest absolute co-witness?',
    type: 'open',
    correct: 'Takie ustawienie muszki względem znaku celowniczego, gdzie znak celowniczy opiera się podstawą o muszkę',
    category: 'Celowniki'
  },
  // 22
  {
    question: 'Podaj nazwy elementów pistoletu VIS 100 zgodnie z numeracją na schemacie.',
    type: 'multiinput-image',
    image: visTestImg,
    inputs: Array.from({ length: 16 }, (_, i) => ({ number: i + 1 })),
    correct: [
      'Zamek', 'Lufa', 'Dźwignia zatrzymywania zamka', 'Przyrządy celownicze', 'Kurek', 'Dźwignia zwalniania kurka', 'Nakładki chwytu', 'Wkręt nakładek', 'Uchwyt mocowania smyczy', 'Magazynek', 'Zatrzask magazynka', 'Język spustowy', 'Dźwignia do rozkładania pistoletu', 'Szkielet chwytu', 'Szyna Picatinny', 'Zsp. sprężyny powrotnej'
    ],
    category: 'VIS-100'
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
    type: 'single',
    category: 'Moździerz'
  },
  {
    question: '',
    type: 'fillblank',
    parts: [
      'Zgodnie z Art. 358 § 1 i 2 KK żołnierz, który samowolnie dysponuje bronią, amunicją, materiałem wybuchowym lub innym środkiem walki, podlega karze aresztu wojskowego albo pozbawienia wolności do ',
      { blankIdx: 0, label: 'lat', correct: '3' },
      ' lat, a żołnierz, który samowolnie zabiera broń, amunicję, materiał wybuchowy lub inny środek walki, podlega karze pozbawienia wolności od ',
      { blankIdx: 1, label: 'od', correct: '1' },
      ' do ',
      { blankIdx: 2, label: 'do', correct: '10' },
      ' lat.'
    ],
    category: 'Prawo'
  },
  {
    question: '',
    type: 'fillblank',
    parts: [
      'Zgodnie z Art. 359 KK żołnierz, który nie dopełniając obowiązku lub przekraczając uprawnienia w zakresie ochrony lub nadzoru nad bronią, amunicją, materiałem wybuchowym lub innym środkiem walki, powoduje choćby nieumyślnie ich utratę, podlega karze aresztu wojskowego albo pozbawienia wolności od ',
      { blankIdx: 0, label: 'miesięcy', correct: '3' },
      ' miesięcy do ',
      { blankIdx: 1, label: 'lat', correct: '5' },
      ' lat.'
    ],
    category: 'Prawo'
  },
  {
    question: '',
    type: 'fillblank',
    parts: [
      'Zgodnie z Art. 354 § 1 i 2 KK żołnierz, który nieostrożnie obchodzi się z bronią wojskową, amunicją, materiałem wybuchowym lub innym środkiem walki, albo ich nieostrożnie używa i przez to nieumyślnie powoduje naruszenie czynności narządu ciała lub rozstrój zdrowia innej osoby, podlega karze aresztu wojskowego albo pozbawienia wolności do ',
      { blankIdx: 0, label: 'lat', correct: '3' },
      ' lat, a jeżeli następstwem czynu jest śmierć innej osoby lub ciężki uszczerbek na jej zdrowiu, sprawca podlega karze pozbawienia wolności od ',
      { blankIdx: 1, label: 'od', correct: '6' },
      ' do ',
      { blankIdx: 2, label: 'do', correct: '8' },
      ' lat.'
    ],
    category: 'Prawo'
  },
  // --- MSBS GROT questions from screenshots ---
  {
    question: 'Kaliber lufy MSBS GROT wynosi:',
    answers: ['5.45 mm', '5.56 mm', '7.62 mm'],
    correct: 1,
    type: 'single',
    category: 'GROT'
  },
  {
    question: 'W magazynku 5,56 GROT znajduje się:',
    answers: ['24 nabojów', '12 nabojów', '30 nabojów'],
    correct: 2,
    type: 'single',
    category: 'GROT'
  },
  {
    question: 'Masa karabinu bez magazynka i celownika optycznego wynosi:',
    answers: ['3500 g', '3100 g', '3.800 g'],
    correct: 2,
    type: 'single',
    category: 'GROT'
  },
  {
    question: 'Odległość strzału bezwzględnego:',
    answers: ['300 m', '350 m', '400 m'],
    correct: 1,
    type: 'single',
    category: 'GROT'
  },
  {
    question: 'Jaka jest prędkość początkowa pocisku:',
    answers: ['700 m/s', '870 m/s', '716 m/s'],
    correct: 0,
    type: 'single',
    category: 'GROT'
  },
  {
    question: 'Karabinek częściowo rozkłada się do:',
    answers: ['czyszczenia', 'naprawy', 'przeglądu'],
    correct: 0,
    type: 'single',
    category: 'GROT'
  },
  {
    question: 'Szybkostrzelność teoretyczna to:',
    answers: ['ok.600 - 700strz./min', 'ok.550 - 600strz./min', 'ok.700-900 strz./min'],
    correct: 2,
    type: 'single',
    category: 'GROT'
  },
  {
    question: 'Energia wylotowa pocisku z rdzeniem stalowym:',
    answers: ['2100 [J]', '1600 [J]', '1900 [J]'],
    correct: 1,
    type: 'single',
    category: 'GROT'
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

const categories = Array.from(new Set(questions.map(q => q.category)))
function questionsByCategory (cat) {
  return questions
    .map((q, idx) => ({ ...q, _idx: idx }))
    .filter(q => q.category === cat)
}

const showModal = ref(false)
const modalImage = ref('')
const showResult = ref(false)
const showChecked = ref(false)
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
  showChecked.value = true
  showResult.value = true
}

function isFillBlankCorrect (qIdx, blankIdx) {
  const q = questions[qIdx]
  const ans = userAnswers.value[qIdx]
  let blankCount = 0
  for (const part of q.parts) {
    if (typeof part === 'object' && 'blankIdx' in part) {
      if (blankCount === blankIdx) {
        return ans && ans[blankIdx]?.trim().toLowerCase() === part.correct.trim().toLowerCase()
      }
      blankCount++
    }
  }
  return false
}
function isMultiInputCorrect (qIdx, iIdx) {
  const q = questions[qIdx]
  const ans = userAnswers.value[qIdx]
  return ans && q.correct[iIdx] && ans[iIdx]?.trim().toLowerCase() === q.correct[iIdx].trim().toLowerCase()
}

function isQuestionWrong (question) {
  if (question.type === 'single') {
    return userAnswers.value[question._idx] !== question.correct
  }
  if (question.type === 'open') {
    return !userAnswers.value[question._idx] || userAnswers.value[question._idx].trim().toLowerCase() !== question.correct.trim().toLowerCase()
  }
  if (question.type === 'fillblank' && Array.isArray(question.parts)) {
    const ans = userAnswers.value[question._idx]
    let blankCount = 0
    for (const part of question.parts) {
      if (typeof part === 'object' && 'blankIdx' in part) {
        if (!ans || ans[blankCount]?.trim().toLowerCase() !== part.correct.trim().toLowerCase()) return true
        blankCount++
      }
    }
    return false
  }
  if (question.type === 'multiinput-image' && Array.isArray(question.inputs)) {
    const ans = userAnswers.value[question._idx]
    return !ans || question.correct.some((c, i) => ans[i]?.trim().toLowerCase() !== c.trim().toLowerCase())
  }
  return false
}

function resetTest () {
  userAnswers.value = Array(questions.length).fill(null)
  questions.forEach((q, idx) => {
    if (q.type === 'fillblank' && Array.isArray(q.parts)) {
      const blanksCount = q.parts.filter(part => typeof part === 'object' && 'blankIdx' in part).length
      userAnswers.value[idx] = Array(blanksCount).fill('')
    } else if (q.type === 'fillblank' && Array.isArray(q.blanks)) {
      userAnswers.value[idx] = Array(q.blanks.length).fill('')
    } else if (q.type === 'multiinput-image' && Array.isArray(q.inputs)) {
      userAnswers.value[idx] = Array(q.inputs.length).fill('')
    }
  })
  showResult.value = false
  score.value = 0
  showChecked.value = false
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
.wrong-answer {
  background: #d32f2f !important;
}
.wrong-answer-input {
  background: #d32f2f !important;
}
.q-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.q-mb-xl {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row.q-col-gutter-md.q-mb-lg {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.full-width.q-mb-md {
  width: 75vw;
  max-width: 1200px;
  min-width: 320px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 1200px) {
  .full-width.q-mb-md {
    width: 90vw;
    max-width: 100vw;
  }
}
@media (max-width: 600px) {
  .full-width.q-mb-md {
    width: 95vw;
    max-width: 100vw;
    min-width: 0;
  }
}

.test-header-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 75vw;
  max-width: 1200px;
  min-width: 320px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 32px;
}
.test-header-nav {
  margin-right: 24px;
  display: flex;
  align-items: center;
}
.test-header-title {
  flex: 1 1 auto;
  text-align: left;
  font-weight: 700;
}
@media (max-width: 1200px) {
  .test-header-row {
    width: 90vw;
    max-width: 100vw;
  }
}
@media (max-width: 600px) {
  .test-header-row {
    width: 95vw;
    max-width: 100vw;
    min-width: 0;
  }
  .test-header-title {
    font-size: 1.5rem;
  }
}
/* Match cargo-page background */
.equipment-test-page-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f6fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
