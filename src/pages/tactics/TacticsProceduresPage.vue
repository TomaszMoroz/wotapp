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
          <div class="text-h4 text-weight-bold text-primary q-mb-sm">Procedury</div>
          <div class="text-body1 text-grey-6">Protokoły medyczne i procedury wojskowe</div>
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
                placeholder="Szukaj procedur..."
                outlined
                dense
                class="q-mb-md"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>

              <!-- Lista procedur -->
              <q-list separator>
                <q-item
                  v-for="procedure in filteredProcedures"
                  :key="procedure.id"
                  clickable
                  @click="selectProcedure(procedure)"
                  :class="{ 'bg-blue-1': selectedProcedure?.id === procedure.id }"
                >
                  <q-item-section>
                    <q-item-label class="text-weight-medium">{{ procedure.title }}</q-item-label>
                    <q-item-label caption>{{ procedure.category }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Treść -->
        <div class="col-md-7 col-sm-12">
          <q-card v-if="selectedProcedure" class="content-card">
            <q-card-section>
              <div class="text-h5 text-weight-bold q-mb-md">{{ selectedProcedure.title }}</div>
              <div class="text-subtitle2 text-grey-7 q-mb-lg">{{ selectedProcedure.category }}</div>

              <div class="content-body">
                <div v-html="selectedProcedure.content"></div>
              </div>
            </q-card-section>
          </q-card>

          <q-card v-else class="content-card">
            <q-card-section class="text-center">
              <q-icon name="fact_check" size="4rem" color="grey-5" class="q-mb-md" />
              <div class="text-h6 text-grey-6">Wybierz procedurę z listy</div>
              <div class="text-body2 text-grey-5">Kliknij na wybraną procedurę aby wyświetlić jej treść</div>
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

defineOptions({
  name: 'TacticsProceduresPage'
})

const router = useRouter()
const searchQuery = ref('')
const selectedProcedure = ref(null)

const procedures = [
  {
    id: 1,
    title: 'SMARCHE',
    category: 'Procedura medyczna ratunkowa',
    content: `
      <h4>Protokół SMARCHE - Pierwsza pomoc taktyczna</h4>
      <p>SMARCHE to akronim opisujący kolejność działań w pierwszej pomocy taktycznej:</p>

      <h5>S - Sprawdź (Size up the scene)</h5>
      <ul>
        <li>Oceń sytuację i bezpieczeństwo miejsca zdarzenia</li>
        <li>Sprawdź czy nie ma dodatkowych zagrożeń</li>
        <li>Upewnij się, że miejsce jest bezpieczne dla ratownika</li>
      </ul>

      <h5>M - Massive bleeding (Masywne krwawienie)</h5>
      <ul>
        <li>Natychmiastowe wykrycie i zatamowanie zewnętrznych, masywnych krwotoków</li>
        <li>Użyj stazy, bandaża uciskowego lub punktów nacisku</li>
        <li>Priorytet: zatamowanie krwotoku zagrażającego życiu</li>
      </ul>

      <h5>A - Airway (Drogi oddechowe)</h5>
      <ul>
        <li>Sprawdź i zabezpiecz drogi oddechowe</li>
        <li>Usuń ciała obce z jamy ustnej</li>
        <li>Zastosuj pozycję bezpieczną</li>
      </ul>

      <h5>R - Respiration (Oddech)</h5>
      <ul>
        <li>Oceń oddech poszkodowanego</li>
        <li>W razie potrzeby zastosuj sztuczne oddychanie</li>
        <li>Zabezpiecz odmo prężny</li>
      </ul>

      <h5>C - Circulation (Krążenie)</h5>
      <ul>
        <li>Sprawdź tętno i ciśnienie krwi</li>
        <li>Zabezpiecz dostęp żylny jeśli to możliwe</li>
        <li>Kontynuuj kontrolę krwotoków</li>
      </ul>

      <h5>H - Hypothermia/Head injury (Hipotermia/Uraz głowy)</h5>
      <ul>
        <li>Zapobiegaj hipotermii - okryj poszkodowanego</li>
        <li>Oceń stan neurologiczny</li>
        <li>Zabezpiecz kręgosłup szyjny przy urazach głowy</li>
      </ul>

      <h5>E - Evacuation (Ewakuacja)</h5>
      <ul>
        <li>Przygotuj poszkodowanego do transportu</li>
        <li>Wybierz odpowiedni sposób ewakuacji</li>
        <li>Kontynuuj monitorowanie podczas transportu</li>
      </ul>
    `
  },
  {
    id: 2,
    title: 'CCP - Punkt kontroli',
    category: 'Procedury bezpieczeństwa',
    content: `
      <h4>Checkpoint Control Procedure - Procedura kontroli punktu</h4>

      <h5>Przygotowanie punktu kontrolnego:</h5>
      <ol>
        <li><strong>Wybór lokalizacji:</strong> Strategiczne położenie, dobra widoczność</li>
        <li><strong>Oznakowanie:</strong> Wyraźne oznaczenie punktu kontrolnego</li>
        <li><strong>Zabezpieczenie:</strong> Pozycje strzeleckie i punkty obserwacyjne</li>
        <li><strong>Komunikacja:</strong> Łączność z centrum dowodzenia</li>
      </ol>

      <h5>Procedura kontroli pojazdów:</h5>
      <ol>
        <li>Zatrzymanie pojazdu w bezpiecznej odległości</li>
        <li>Wizualna ocena pojazdu i pasażerów</li>
        <li>Sprawdzenie dokumentów</li>
        <li>Kontrola bagażu jeśli to konieczne</li>
        <li>Pozwolenie na przejazd lub przekierowanie</li>
      </ol>

      <h5>Sygnały i komendy:</h5>
      <ul>
        <li><strong>STOP:</strong> Podniesiona ręka, sygnał świetlny</li>
        <li><strong>Podjedź bliżej:</strong> Gest ręką w kierunku siebie</li>
        <li><strong>Wyłącz silnik:</strong> Gest cięcia w poprzek szyi</li>
        <li><strong>Wysiądź:</strong> Wskazanie na zewnątrz pojazdu</li>
      </ul>
    `
  },
  {
    id: 3,
    title: 'MEDEVAC',
    category: 'Ewakuacja medyczna',
    content: `
      <h4>Medical Evacuation - Ewakuacja medyczna</h4>

      <h5>Kategorie priorytetów MEDEVAC:</h5>
      <ul>
        <li><strong>Priorytet 1 (URGENT):</strong> Natychmiastowe zagrożenie życia</li>
        <li><strong>Priorytet 2 (PRIORITY):</strong> Poważne urazy, stabilny stan</li>
        <li><strong>Priorytet 3 (ROUTINE):</strong> Lekkie urazy, chodzący ranny</li>
      </ul>

      <h5>Procedura zgłoszenia MEDEVAC:</h5>
      <ol>
        <li><strong>Linia 1:</strong> Lokalizacja (współrzędne GPS)</li>
        <li><strong>Linia 2:</strong> Częstotliwość radiowa i znak wywoławczy</li>
        <li><strong>Linia 3:</strong> Liczba poszkodowanych według priorytetów</li>
        <li><strong>Linia 4:</strong> Specjalny sprzęt potrzebny</li>
        <li><strong>Linia 5:</strong> Liczba pacjentów na noszach vs. siedzących</li>
        <li><strong>Linia 6:</strong> Bezpieczeństwo lądowiska (N/P/E/X)</li>
        <li><strong>Linia 7:</strong> Metoda oznakowania lądowiska</li>
        <li><strong>Linia 8:</strong> Narodowość i status pacjentów</li>
        <li><strong>Linia 9:</strong> Teren lądowiska</li>
      </ol>

      <h5>Przygotowanie lądowiska:</h5>
      <ul>
        <li>Minimum 25x25 metrów powierzchni płaskiej</li>
        <li>Usunięcie przeszkód i luźnych przedmiotów</li>
        <li>Oznakowanie kierunku wiatru</li>
        <li>Zabezpieczenie strefy lądowania</li>
      </ul>
    `
  },
  {
    id: 4,
    title: 'CASEVAC',
    category: 'Ewakuacja poszkodowanych',
    content: `
      <h4>Casualty Evacuation - Ewakuacja poszkodowanych</h4>

      <h5>Różnica między MEDEVAC a CASEVAC:</h5>
      <ul>
        <li><strong>MEDEVAC:</strong> Dedykowane śmigłowce medyczne z personelem</li>
        <li><strong>CASEVAC:</strong> Wykorzystanie dostępnych środków transportu</li>
      </ul>

      <h5>Środki transportu CASEVAC:</h5>
      <ul>
        <li>Pojazdy lądowe (ambulanse, pojazdy wojskowe)</li>
        <li>Śmigłowce transportowe</li>
        <li>Samoloty transportowe</li>
        <li>Transport wodny</li>
      </ul>

      <h5>Procedura CASEVAC:</h5>
      <ol>
        <li>Stabilizacja poszkodowanego</li>
        <li>Przygotowanie do transportu</li>
        <li>Wybór najszybszego dostępnego transportu</li>
        <li>Komunikacja z punktem docelowym</li>
        <li>Monitorowanie podczas transportu</li>
      </ol>

      <h5>Dokumentacja:</h5>
      <ul>
        <li>Karta poszkodowanego (DD Form 1380)</li>
        <li>Opis urazu i zastosowanego leczenia</li>
        <li>Czas zdarzenia i udzielenia pomocy</li>
        <li>Dane osobowe poszkodowanego</li>
      </ul>
    `
  },
  {
    id: 5,
    title: 'IED Response',
    category: 'Reakcja na zagrożenia',
    content: `
      <h4>Procedura reakcji na IED (Improvised Explosive Device)</h4>

      <h5>Natychmiastowe działania po wybuchu:</h5>
      <ol>
        <li><strong>STOP:</strong> Zatrzymaj się, nie ruszaj dalej</li>
        <li><strong>LOOK:</strong> Rozejrzyj się za kolejnymi zagrożeniami</li>
        <li><strong>LISTEN:</strong> Nasłuchuj komend i strzałów</li>
        <li><strong>THINK:</strong> Oceń sytuację przed działaniem</li>
      </ol>

      <h5>Procedura 5-C:</h5>
      <ul>
        <li><strong>Confirm:</strong> Potwierdź zagrożenie IED</li>
        <li><strong>Clear:</strong> Ewakuuj ludzi ze strefy niebezpiecznej</li>
        <li><strong>Call:</strong> Zgłoś incydent do przełożonych</li>
        <li><strong>Cordon:</strong> Ustanów kordon bezpieczeństwa</li>
        <li><strong>Control:</strong> Kontroluj dostęp do strefy</li>
      </ol>

      <h5>Strefa bezpieczeństwa:</h5>
      <ul>
        <li><strong>Minimum 100 metrów</strong> od podejrzanego przedmiotu</li>
        <li><strong>300 metrów</strong> od pojazdów-pułapek</li>
        <li>Uwzględnij fragmenty i odłamki</li>
        <li>Chroń się za solidnymi osłonami</li>
      </ul>

      <h5>Co robić w przypadku podejrzanego przedmiotu:</h5>
      <ul>
        <li><strong>NIE DOTYKAJ</strong> podejrzanego przedmiotu</li>
        <li><strong>NIE UŻYWAJ</strong> telefonów komórkowych w pobliżu</li>
        <li><strong>OZNACZ</strong> lokalizację z bezpiecznej odległości</li>
        <li><strong>ZGŁOŚ</strong> natychmiast jednostce EOD</li>
      </ul>
    `
  }
]

const filteredProcedures = computed(() => {
  if (!searchQuery.value) return procedures

  return procedures.filter(procedure =>
    procedure.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    procedure.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectProcedure = (procedure) => {
  selectedProcedure.value = procedure
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
  color: #8B4513;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.content-body h5 {
  color: #2D3E2F;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
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
  color: #8B4513;
  font-weight: 600;
}

.content-body p {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .container .row {
    flex-direction: column;
  }

  .content-list-card {
    min-height: auto;
    margin-bottom: 1rem;
  }
}
</style>
