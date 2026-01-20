body.body--dark .tactics-tile {
  border: 1.5px solid #444950 !important;
  background: #2c313a !important;
}
<template>
  <q-page class="modern-bg">
    <div class="container q-pa-md">
      <BackNav color="black"/>

      <!-- Header -->
      <div class="modern-header-section q-mb-lg">
        <div class="modern-hero-section q-pa-lg rounded-borders">
          <div class="text-h4 text-weight-bold text-military-secondary q-mb-sm">Procedury</div>
          <div class="text-body1 text-military-dark">Protokoły medyczne i procedury wojskowe</div>
        </div>
      </div>

      <div class="row modern-content-grid q-gutter-lg">
        <!-- Lista treści -->
        <div class="col-md-4 col-sm-12">
          <q-card class="modern-content-list-card">
            <q-card-section>
              <div class="text-h6 q-mb-md text-military-secondary">Spis treści</div>
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
                  :class="{ 'bg-military-light': selectedProcedure?.id === procedure.id }"
                >
                  <q-item-section>
                    <q-item-label class="text-weight-medium text-military-dark">{{ procedure.title }}</q-item-label>
                    <q-item-label caption class="text-military-secondary">{{ procedure.category }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Treść -->
        <div class="col-md-7 col-sm-12">
          <q-card v-if="selectedProcedure" class="modern-content-card">
            <q-card-section>
              <div class="text-h5 text-weight-bold q-mb-md text-military-secondary">{{ selectedProcedure.title }}</div>
              <div class="text-subtitle2 q-mb-lg text-military-dark">{{ selectedProcedure.category }}</div>
              <div class="modern-content-body">
                <div v-html="selectedProcedure.content"></div>
              </div>
            </q-card-section>
          </q-card>
          <q-card v-else class="modern-content-card">
            <q-card-section class="text-center">
              <q-icon name="fact_check" size="4rem" color="military-secondary" class="q-mb-md" />
              <div class="text-h6 text-military-secondary">Wybierz procedurę z listy</div>
              <div class="text-body2 text-military-dark">Kliknij na wybraną procedurę aby wyświetlić jej treść</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import BackNav from 'components/BackNav.vue'

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
      </ul>

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
  },
  {
    id: 6,
    title: 'SLLS - Zatrzymanie i czuwanie',
    category: 'Procedury ruchu',
    content: `
      <h4>Procedura SLLS - Zatrzymanie i czuwanie</h4>

      <h5>S (STOP) - ZATRZYMAJ SIĘ:</h5>
      <ul>
        <li>✓ Oddział zatrzymany</li>
        <li>✓ Pozycje zabezpieczone</li>
        <li>✓ Obserwatorzy wystawieni</li>
      </ul>

      <h5>L (LISTEN) - NASŁUCHUJ:</h5>
      <ul>
        <li>Czas nasłuchiwania: [MINUTY] min</li>
        <li>Odgłosy wykryte:</li>
        <li>□ Brak podejrzanych dźwięków</li>
        <li>□ Wykryto: [OPIS DŹWIĘKÓW]</li>
      </ul>

      <h5>L (LOOK) - OBSERWUJ:</h5>
      <ul>
        <li>Czas obserwacji: [MINUTY] min</li>
        <li>Obserwacje:</li>
        <li>□ Brak ruchu przeciwnika</li>
        <li>□ Wykryto: [OPIS OBSERWACJI]</li>
      </ul>

      <h5>S (SMELL) - WĘSZ/CZUJNOŚĆ:</h5>
      <ul>
        <li>Wykryte zapachy:</li>
        <li>□ Brak podejrzanych zapachów</li>
        <li>□ Wykryto: [OPIS - DYM, SPALINY, ETC.]</li>
      </ul>

      <h5>OCENA BEZPIECZEŃSTWA:</h5>
      <ul>
        <li>🟢 Bezpieczne - kontynuujemy misję</li>
        <li>🟡 Podejrzane - zwiększona czujność</li>
        <li>🔴 Niebezpieczne - zmiana trasy/wycofanie</li>
      </ul>

      <p><strong>DECYZJA:</strong> [ZIELONY/ŻÓŁTY/CZERWONY]</p>

      <p><strong>Przykład:</strong> Zatrzymaliśmy się na 5 minut w lesie przed wejściem na otwartą przestrzeń. Przez 2 minuty nasłuchiwaliśmy - cisza. Przez 2 minuty obserwowaliśmy otwartą przestrzeń - brak ruchu. Wszystko czyste, idziemy dalej.</p>
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
</script>

<style scoped>

.modern-bg {
  background: #F5F5F5;
  min-height: 100vh;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
}
.modern-header-section {
  margin-bottom: 2.5rem;
}
.modern-hero-section {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  border: 1px solid #e0e0e0;
}
.modern-content-grid {
  display: flex;
  flex-direction: row;
  gap: 32px;
}
.modern-content-list-card,
.modern-content-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  min-height: 600px;
  border: 1px solid #e0e0e0;
}
.modern-content-body {
  line-height: 1.6;
  color: #111;
}
.modern-content-body h4 {
  color: #8B4513;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}
.modern-content-body h5 {
  color: #2D3E2F;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
}
.modern-content-body ul,
.modern-content-body ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}
.modern-content-body li {
  margin-bottom: 0.5rem;
}
.modern-content-body strong {
  color: #8B4513;
  font-weight: 600;
}
.modern-content-body p {
  margin-bottom: 1rem;
}
@media (max-width: 768px) {
  .modern-content-grid {
    flex-direction: column;
    gap: 16px;
  }
  .modern-content-list-card {
    min-height: auto;
    margin-bottom: 1rem;
  }
}
</style>
