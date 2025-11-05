<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <!-- Header -->
      <div class="header-section q-mb-lg">
        <q-btn
          flat
          icon="arrow_back"
          label="Powrót"
          @click="goBack"
          class="text-white q-mb-md"
        />
        <div class="hero-section q-pa-lg rounded-borders">
          <div class="text-h4 text-weight-bold text-primary q-mb-sm">Taktyka</div>
          <div class="text-body1 text-grey-6">Manewry i formacje wojskowe</div>
        </div>
      </div>

      <div class="row q-gutter-lg">
        <!-- Lista treści -->
        <div class="col-md-4 col-sm-12">
          <q-card class="content-list-card">
            <q-card-section>
              <div class="text-h6 q-mb-md">Spis treści</div>

              <!-- Filtrowanie -->
              <q-input
                v-model="searchQuery"
                placeholder="Szukaj manewrów..."
                outlined
                dense
                class="q-mb-md"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>

              <!-- Lista manewrów -->
              <q-list separator>
                <q-item
                  v-for="maneuver in filteredManeuvers"
                  :key="maneuver.id"
                  clickable
                  @click="selectManeuver(maneuver)"
                  :class="{ 'bg-blue-1': selectedManeuver?.id === maneuver.id }"
                >
                  <q-item-section>
                    <q-item-label class="text-weight-medium">{{ maneuver.title }}</q-item-label>
                    <q-item-label caption>{{ maneuver.category }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Treść -->
        <div class="col-md-7 col-sm-12">
          <q-card v-if="selectedManeuver" class="content-card">
            <q-card-section>
              <div class="text-h5 text-weight-bold q-mb-md">{{ selectedManeuver.title }}</div>
              <div class="text-subtitle2 text-grey-7 q-mb-lg">{{ selectedManeuver.category }}</div>

              <div class="content-body">
                <div v-if="selectedManeuver.id === 1">
                  <h4>Okrężna</h4>
                  <!-- <p>Podstawowy manewr taktyczny polegający na obejściu przeciwnika i ataku z flanki lub tyłu.</p> -->

                  <div class="diagram-container q-my-lg">
                    <img :src="okrImg" alt="Diagram manewru okrężnego" class="tactical-diagram" />
                  </div>

                  <!-- <h5>Zasady wykonania:</h5>
                  <ul>
                    <li><strong>Rozpoznanie:</strong> Określ pozycję i siłę przeciwnika</li>
                    <li><strong>Podział sił:</strong> Część wiąże przeciwnika, część wykonuje manewr</li>
                    <li><strong>Koordynacja:</strong> Synchronizacja obu elementów</li>
                    <li><strong>Wykorzystanie terenu:</strong> Ukrycie ruchu obchodzącego</li>
                  </ul>

                  <h5>Zalety manewru:</h5>
                  <ul>
                    <li>Zaskoczenie przeciwnika</li>
                    <li>Atak na słabiej bronione pozycje</li>
                    <li>Zmuszenie do walki na dwa fronty</li>
                    <li>Możliwość okrążenia i odcięcia</li>
                  </ul> -->
                </div>

                <div v-else-if="selectedManeuver.id === 2">
                  <h4>Manewr hak</h4>
                  <!-- <p>Taktyczny manewr polegający na wykonaniu gwałtownego skrętu i ataku z nieoczekiwanej strony.</p> -->

                  <div class="diagram-container q-my-lg">
                    <img :src="hakImg" alt="Diagram manewru hak" class="tactical-diagram" />
                  </div>

                  <!-- <h5>Charakterystyka manewru:</h5>
                  <ul>
                    <li><strong>Szybkość:</strong> Gwałtowna zmiana kierunku</li>
                    <li><strong>Zaskoczenie:</strong> Niespodziewany atak z flanki</li>
                    <li><strong>Koncentracja siły:</strong> Skupienie na wybranym punkcie</li>
                    <li><strong>Elastyczność:</strong> Możliwość szybkiej adaptacji</li>
                  </ul>

                  <h5>Zastosowanie:</h5>
                  <ul>
                    <li>Przełamanie obrony liniowej</li>
                    <li>Wykorzystanie luki w ugrupowaniu</li>
                    <li>Odwrót z kontaktem</li>
                    <li>Przeciwuderzenie</li>
                  </ul>

                  <h5>Wymogi realizacji:</h5>
                  <ul>
                    <li>Dobra znajomość terenu</li>
                    <li>Sprawna łączność</li>
                    <li>Przygotowane pozycje</li>
                    <li>Rezerwa gotowa do działania</li>
                  </ul> -->
                </div>

                <div v-else-if="selectedManeuver.id === 3">
                  <h4>Formacja podwójny sierżant</h4>
                  <!-- <p>Klasyczna formacja wojskowa stosowana w marszu i walce, zapewniająca optymalną kontrolę i siłę ognia.</p> -->

                  <div class="diagram-container q-my-lg">
                    <img :src="sier1Img" alt="podwójny sierżant - formacja podstawowa" class="tactical-diagram q-mb-md" />
                    <img :src="sier2Img" alt="podwójny sierżant - rozwinięcie" class="tactical-diagram q-mb-md" />
                    <img :src="sier3Img" alt="podwójny sierżant - warianty" class="tactical-diagram" />
                  </div>

                  <!-- <h5>Struktura formacji:</h5>
                  <ul>
                    <li><strong>Pierwszy szereg:</strong> Żołnierze z bronią podstawową</li>
                    <li><strong>Drugi szereg:</strong> Wsparcie i dowodzenie</li>
                    <li><strong>Odstępy:</strong> Standardowe 1-2 metry między żołnierzami</li>
                    <li><strong>Głębokość:</strong> 3-5 metrów między szeregami</li>
                  </ul>

                  <h5>Zalety formacji:</h5>
                  <ul>
                    <li>Maksymalna siła ognia do przodu</li>
                    <li>Łatwa kontrola dowodzenia</li>
                    <li>Możliwość szybkiego rozwinięcia</li>
                    <li>Wzajemne wsparcie żołnierzy</li>
                  </ul>

                  <h5>Zastosowanie:</h5>
                  <ul>
                    <li>Atak na pozycje obronne</li>
                    <li>Marsz przez teren otwarty</li>
                    <li>Obrona liniowa</li>
                    <li>Przeglądy i defilady</li>
                  </ul> -->
                </div>

                <div v-else-if="selectedManeuver.id === 4">
                  <h4>Organizacja zasadzki</h4>
                  <p>Taktyka polegająca na ukrytym oczekiwaniu na przeciwnika i niespodziewanym ataku w korzystnym momencie.</p>

                  <div class="diagram-container q-my-lg">
                    <img :src="zas1Img" alt="Zasadzka - pozycje podstawowe" class="tactical-diagram q-mb-md" />
                    <img :src="zas2Img" alt="Zasadzka - fazy realizacji" class="tactical-diagram" />
                  </div>

                  <h5>Fazy organizacji zasadzki:</h5>
                  <ol>
                    <li><strong>Rozpoznanie:</strong> Wybór miejsca i tras przeciwnika</li>
                    <li><strong>Planowanie:</strong> Rozmieszczenie sił i środków</li>
                    <li><strong>Zajęcie pozycji:</strong> Ukrycie i przygotowanie</li>
                    <li><strong>Oczekiwanie:</strong> Zachowanie dyscypliny i ukrycia</li>
                    <li><strong>Atak:</strong> Skoordynowane uderzenie</li>
                    <li><strong>Odwrót:</strong> Szybkie wycofanie się</li>
                  </ol>

                  <h5>Kluczowe elementy:</h5>
                  <ul>
                    <li><strong>Zaskoczenie:</strong> Całkowite ukrycie intencji</li>
                    <li><strong>Szybkość:</strong> Błyskawiczny atak i odwrót</li>
                    <li><strong>Wybór miejsca:</strong> Dogodne warunki terenowe</li>
                    <li><strong>Drogi odwrotu:</strong> Zabezpieczone trasy ewakuacji</li>
                  </ul>

                  <h5>Rodzaje zasadzek:</h5>
                  <ul>
                    <li>Zasadzka punktowa - na konkretny cel</li>
                    <li>Zasadzka obszarowa - na większą jednostkę</li>
                    <li>Zasadzka przeciwkonwojowa - na transport</li>
                    <li>Zasadzka przeciwpatrole - na grupy rozpoznawcze</li>
                  </ul>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card v-else class="content-card">
            <q-card-section class="text-center">
              <q-icon name="military_tech" size="4rem" color="grey-5" class="q-mb-md" />
              <div class="text-h6 text-grey-6">Wybierz manewer z listy</div>
              <div class="text-body2 text-grey-5">Kliknij na wybrany manewer aby wyświetlić jego treść</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Import images
import okrImg from 'assets/okr.png'
import hakImg from 'assets/hak.png'
import sier1Img from 'assets/sier1.png'
import sier2Img from 'assets/sier2.png'
import sier3Img from 'assets/sier3.png'
import zas1Img from 'assets/zas1.png'
import zas2Img from 'assets/zas2.png'

defineOptions({
  name: 'TacticsManeuversPage'
})

const router = useRouter()
const searchQuery = ref('')
const selectedManeuver = ref(null)

const maneuvers = [
  {
    id: 1,
    title: 'Okrężna',
    category: 'Manewr taktyczny'
  },
  {
    id: 2,
    title: 'Hak',
    category: 'Manewr taktyczny'
  },
  {
    id: 3,
    title: 'Podwójny sierżant',
    category: 'Formacja taktyczna'
  },
  {
    id: 4,
    title: 'Zasadzka',
    category: 'Działania specjalne'
  }
]

const filteredManeuvers = computed(() => {
  if (!searchQuery.value) return maneuvers

  return maneuvers.filter(maneuver =>
    maneuver.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    maneuver.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectManeuver = (maneuver) => {
  selectedManeuver.value = maneuver
}

const goBack = () => {
  router.push('/tactics')
}
</script>

<style scoped>
.page-background {
  background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.hero-section {
  background: white;
  border: 1px solid rgba(139, 69, 19, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.content-list-card,
.content-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-height: 600px;
}

.content-body {
  line-height: 1.6;
}

.content-body h4 {
  color: #2D3E2F;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.content-body h5 {
  color: #8B4513;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
}

.content-body ul,
.content-body ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.content-body li {
  margin-bottom: 0.5rem;
}

.content-body strong {
  color: #2D3E2F;
  font-weight: 600;
}

.diagram-container {
  text-align: center;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.tactical-diagram {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background: white;
  padding: 8px;
  object-fit: contain;
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .container .row {
    flex-direction: column;
  }

  .content-list-card {
    min-height: auto;
    margin-bottom: 1rem;
  }

  .diagram-container {
    padding: 0.5rem;
    margin: 0.5rem 0;
  }

  .tactical-diagram {
    width: 100%;
    max-width: 100%;
    padding: 4px;
  }
}

@media (max-width: 480px) {
  .tactical-diagram {
    width: 100%;
    max-width: 100%;
    padding: 2px;
  }

  .diagram-container {
    padding: 0.25rem;
  }
}
</style>
