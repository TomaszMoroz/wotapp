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
                <div v-html="selectedManeuver.content"></div>
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

defineOptions({
  name: 'TacticsManeuversPage'
})

const router = useRouter()
const searchQuery = ref('')
const selectedManeuver = ref(null)

const maneuvers = [
  {
    id: 1,
    title: 'Walka w terenie zabudowanym',
    category: 'Taktyki miejskie',
    content: `
      <h4>Podstawowe zasady walki w terenie zabudowanym:</h4>
      <ul>
        <li><strong>Zasada połączonego ruchu:</strong> Zawsze poruszaj się w parach lub grupach</li>
        <li><strong>Kontrola punktów kluczowych:</strong> Zabezpiecz skrzyżowania i wzniesienia</li>
        <li><strong>Komunikacja:</strong> Utrzymuj stały kontakt radiowy z jednostką</li>
        <li><strong>Używanie osłon:</strong> Wykorzystuj budynki i pojazdy jako osłonę</li>
      </ul>

      <h5>Procedura wchodzenia do budynku:</h5>
      <ol>
        <li>Zabezpiecz zewnętrzne podejścia</li>
        <li>Sprawdź okna i alternatywne wejścia</li>
        <li>Wejdź szybko i sprawnie</li>
        <li>Sprawdź wszystkie pomieszczenia systematycznie</li>
      </ol>
    `
  },
  {
    id: 2,
    title: 'Obrona pozycyjna',
    category: 'Techniki defensywne',
    content: `
      <h4>Elementy obrony pozycyjnej:</h4>
      <ul>
        <li><strong>Wybór pozycji:</strong> Wysokość terenu, pole obserwacji, możliwości ostrzału</li>
        <li><strong>Fortyfikacje:</strong> Okopy, stanowiska ogniowe, przeszkody</li>
        <li><strong>Pola ognia:</strong> Wzajemne wsparcie stanowisk</li>
        <li><strong>Rezerwa:</strong> Siły do kontrataków</li>
      </ul>

      <h5>Zasady rozmieszczenia:</h5>
      <p>Pozycje obronne powinny być rozmieszczone w sposób umożliwiający wzajemne wsparcie ogniowe.
      Każde stanowisko powinno mieć określone sektory ostrzału i wyznaczone cele priorytetowe.</p>
    `
  },
  {
    id: 3,
    title: 'Atak koordynowany',
    category: 'Manewry ofensywne',
    content: `
      <h4>Fazy ataku koordynowanego:</h4>
      <ol>
        <li><strong>Rozpoznanie:</strong> Zbieranie informacji o przeciwniku</li>
        <li><strong>Planowanie:</strong> Opracowanie planu ataku</li>
        <li><strong>Przygotowanie:</strong> Zajęcie pozycji wyjściowych</li>
        <li><strong>Atak:</strong> Wykonanie skoordynowanego uderzenia</li>
        <li><strong>Eksploatacja:</strong> Wykorzystanie sukcesu</li>
      </ol>

      <h5>Koordinacja działań:</h5>
      <ul>
        <li>Synchronizacja ruchów jednostek</li>
        <li>Wsparcie ogniowe</li>
        <li>Komunikacja między elementami</li>
        <li>Zabezpieczenie skrzydeł</li>
      </ul>
    `
  },
  {
    id: 4,
    title: 'Patrol rozpoznawczy',
    category: 'Rozpoznanie',
    content: `
      <h4>Rodzaje patroli:</h4>
      <ul>
        <li><strong>Patrol obszarowy:</strong> Rozpoznanie określonego terenu</li>
        <li><strong>Patrol punktowy:</strong> Sprawdzenie konkretnego obiektu</li>
        <li><strong>Patrol kontaktowy:</strong> Nawiązanie kontaktu z przeciwnikiem</li>
      </ul>

      <h5>Organizacja patrolu:</h5>
      <p>Patrol składa się z:</p>
      <ul>
        <li>Dowódcy patrolu</li>
        <li>Obserwatora</li>
        <li>Łącznika radiowego</li>
        <li>Zabezpieczenia</li>
      </ul>
    `
  },
  {
    id: 5,
    title: 'Marsz taktyczny',
    category: 'Przemieszczanie',
    content: `
      <h4>Zasady marszu taktycznego:</h4>
      <ul>
        <li><strong>Formacja:</strong> Dostosowana do terenu i sytuacji</li>
        <li><strong>Tempo:</strong> Kontrolowane, dostosowane do najsłabszego ogniwa</li>
        <li><strong>Zabezpieczenie:</strong> Awangarda, ariergarda, zabezpieczenie skrzydeł</li>
        <li><strong>Łączność:</strong> Stały kontakt między elementami</li>
      </ul>

      <h5>Formacje marszu:</h5>
      <ul>
        <li>Kolumna - dla szybkiego przemieszczania</li>
        <li>Linia - dla maksymalnej siły ognia</li>
        <li>Klin - dla ataku</li>
        <li>Vee - dla obrony</li>
      </ul>
    `
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
