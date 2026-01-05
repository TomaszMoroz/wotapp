<template>
  <q-card class="cargo-shortcuts-card q-pa-xl">
    <div class="cargo-header">
      <div class="tile-icon-bg cargo-icon-bg">
        <q-icon name="storage" size="32px" color="white" class="cargo-header-icon" />
      </div>
      <div>
        <div class="cargo-title">Moje skróty</div>
        <div class="cargo-subtitle">Szybki dostęp do wybranych sekcji</div>
      </div>
    </div>
    <q-tabs v-model="tab" dense align="left" class="cargo-tabs q-mt-lg q-mb-lg" active-color="primary" indicator-color="primary">
      <q-tab name="edit" label="Lista stron" icon="list" />
      <q-tab name="tiles" label="Moje skróty" icon="apps" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="edit">
        <div class="routes-section">
          <div class="section-title">Wszystkie strony</div>
          <q-input v-model="search" label="Szukaj strony" dense outlined class="search-input q-mb-md" clearable />
          <div class="tiles-grid">
            <template v-for="item in filteredGroupedRoutes">
              <div
                v-if="item.isGroup"
                :key="'group-' + item.group"
                class="route-group-label"
                :style="{gridColumn: '1/-1', fontWeight: 'bold', fontSize: '1.1rem', margin: '12px 0 4px 0'}"
              >
                {{ item.group }}
              </div>
              <q-card
                v-else
                :key="item.path"
                class="route-tile"
                :class="{ selected: isShortcut(item) }"
                @click="toggleShortcut(item)"
              >
                <q-card-section class="tile-content">
                  <div class="tile-label">{{ item.label }}</div>
                  <q-icon v-if="isShortcut(item)" name="check_circle" color="primary" size="20px" class="tile-check" />
                </q-card-section>
              </q-card>
            </template>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="tiles">
        <div class="shortcuts-section">
          <div v-if="shortcuts.length === 0" class="empty-state text-grey-6">
            <div class="empty-icon-wrap">
              <div class="tile-icon-bg cargo-icon-bg">
                <q-icon name="mdi-package-variant" size="32px" color="white" />
              </div>
            </div>
            <div class="empty-title">Brak skrótów</div>
            <div class="empty-desc">Dodaj skróty z listy stron.</div>
          </div>
          <div v-else class="tiles-grid">
            <q-card v-for="shortcut in shortcuts" :key="shortcut.id" class="shortcut-tile" @click="goToShortcut(shortcut)">
              <q-card-section class="tile-content">
                <div class="tile-label">{{ shortcut.label }}</div>
                <q-btn icon="delete" color="negative" flat round size="sm" class="tile-remove" @click.stop="removeShortcut(shortcut.id)" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const shortcuts = ref([])
const search = ref('')
const tab = ref('tiles')

// Nowa struktura grupowana i alfabetyczna
const groupedRoutes = [
  {
    group: 'ABC',
    children: [
      { path: '/abc', label: 'ABC' },
      { path: '/abc/rotation', label: 'Co zabrać na rotację' },
      { path: '/abc/backpack', label: 'Pakowanie plecaka' },
      { path: '/abc/chain', label: 'Droga służbowa' },
      { path: '/abc/cyber', label: 'Cyberbezpieczeństwo' },
      { path: '/abc/kts', label: 'KTS' },
      { path: '/abc/fitness', label: 'Fitness' }
    ]
  },
  {
    group: 'Mapa',
    children: [
      { path: '/map', label: 'Mapa' }
    ]
  },
  {
    group: 'Narzędzia',
    children: [
      { path: '/tools', label: 'Narzędzia' },
      { path: '/tools/distance', label: 'Kalkulator odległości' },
      { path: '/tools/recon', label: 'Rozpoznanie' },
      { path: '/tools/recon/learn', label: 'Rozpoznanie nauka' },
      { path: '/tools/recon/test', label: 'Rozpoznanie test' },
      { path: '/tools/settings', label: 'Kalkulator ustawień' },
      { path: '/tools/mils-moa', label: 'Konwerter mils/moa' },
      { path: '/tools/equipment', label: 'Wyposażenie narzędzi' },
      { path: '/tools/weather', label: 'Pogoda' },
      { path: '/tools/march-table', label: 'Tabela marszu' }
    ]
  },
  {
    group: 'Raporty',
    children: [
      { path: '/reports', label: 'Raporty' }
    ]
  },
  {
    group: 'Stopnie, regulamin, prawo',
    children: [
      { path: '/emergency', label: 'Stopnie, regulamin, prawo' },
      { path: '/ranks', label: 'Stopnie Wojskowe' },
      { path: '/regulations', label: 'Regulamin' },
      { path: '/firearms-law', label: 'Warunki użycia broni palnej' },
      { path: '/drill', label: 'Musztra' }
    ]
  },
  {
    group: 'Strzelectwo',
    children: [
      { path: '/shooting', label: 'Strzelectwo' },
      { path: '/shooting/basics', label: 'Podstawy strzelania' },
      { path: '/shooting/ballistics', label: 'Balistyka' },
      { path: '/shooting/angular-measurements', label: 'Miary kątowe' },
      { path: '/shooting/optics', label: 'Optyka i celowniki' }
    ]
  },
  {
    group: 'Taktyka',
    children: [
      { path: '/tactics', label: 'Taktyka, dowodzenie, procedury' },
      { path: '/tactics/maneuvers', label: 'Manewry taktyczne' },
      { path: '/tactics/procedures', label: 'Procedury taktyczne' },
      { path: '/tactics/command', label: 'Dowodzenie' },
      { path: '/tactics/radio', label: 'Łączność taktyczna' }
    ]
  },
  {
    group: 'TCCC',
    children: [
      { path: '/tccc', label: 'TCCC' }
    ]
  },
  {
    group: 'Topografia',
    children: [
      { path: '/topography', label: 'Topografia' },
      { path: '/topography/mgrs', label: 'Siatka MGRS' }
    ]
  },
  {
    group: 'Wyposażenie',
    children: [
      { path: '/equipment', label: 'Wyposażenie' }
    ]
  },
  {
    group: 'Łączność',
    children: [
      { path: '/communication', label: 'Alfabet NATO' }
    ]
  }
]

// Sortowanie grup i dzieci alfabetycznie
groupedRoutes.sort((a, b) => a.group.localeCompare(b.group, 'pl'))
groupedRoutes.forEach(g => g.children.sort((a, b) => a.label.localeCompare(b.label, 'pl')))

// Filtrowanie i spłaszczanie do wyświetlenia
const filteredGroupedRoutes = computed(() => {
  const result = []
  groupedRoutes.forEach(group => {
    // Jeśli nie ma wyszukiwania, dodaj grupę i jej dzieci
    if (!search.value) {
      result.push({ isGroup: true, group: group.group })
      group.children.forEach(child => result.push({ ...child, group: group.group }))
    } else {
      // Jeśli jest wyszukiwanie, tylko pasujące dzieci
      const matching = group.children.filter(r => r.label.toLowerCase().includes(search.value.toLowerCase()) || r.path.toLowerCase().includes(search.value.toLowerCase()))
      if (matching.length) {
        result.push({ isGroup: true, group: group.group })
        matching.forEach(child => result.push({ ...child, group: group.group }))
      }
    }
  })
  return result
})

function loadShortcuts () {
  const saved = localStorage.getItem('cargoShortcuts')
  if (saved) {
    shortcuts.value = JSON.parse(saved)
  }
}

function saveShortcuts () {
  localStorage.setItem('cargoShortcuts', JSON.stringify(shortcuts.value))
}

function isShortcut (route) {
  return shortcuts.value.some(s => s.route === route.path)
}

function toggleShortcut (route) {
  if (isShortcut(route)) {
    shortcuts.value = shortcuts.value.filter(s => s.route !== route.path)
  } else {
    shortcuts.value.push({
      id: Date.now().toString(),
      label: route.label,
      route: route.path
    })
  }
  saveShortcuts()
}

function removeShortcut (id) {
  shortcuts.value = shortcuts.value.filter(s => s.id !== id)
  saveShortcuts()
}

function goToShortcut (shortcut) {
  // Zapisz flagę w sessionStorage, że wejście nastąpiło przez Cargo
  sessionStorage.setItem('fromCargoShortcut', '1')
  router.push(shortcut.route)
}

loadShortcuts()

</script>

<style scoped>
.cargo-icon-bg {
  background: #827858;
}
/* Card container for shortcuts */
/* Apple-style card container */
.cargo-shortcuts-card {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 32px 0 rgba(60,60,60,0.09);
  border-radius: 20px;
  background: #fff;
  padding: 0;
}
.cargo-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px 32px 0 32px;
  border-bottom: 1px solid #f0f0f5;
}
.cargo-header-icon {
  flex-shrink: 0;
}
.cargo-title {
  font-size: 2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 2px;
}
.cargo-subtitle {
  font-size: 1.1rem;
  color: #888;
}
.cargo-add-btn {
  margin-left: auto;
}
.tiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 0 0 32px 0;
}
.shortcut-tile, .route-tile {
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(60,60,60,0.07);
  transition: box-shadow 0.2s, border 0.2s;
  background: #f7f7fa;
  border: 2px solid transparent;
}
.shortcut-tile:hover, .route-tile:hover {
  box-shadow: 0 4px 24px 0 rgba(60,60,60,0.12);
}
.route-tile.selected {
  border: 2px solid #1976d2;
  background: #e3f2fd;
}
.tile-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 18px 12px 18px;
  position: relative;
}
.tile-label {
  font-size: 1.1rem;
  font-weight: 500;
  color: #222;
}
.tile-path {
  font-size: 0.95rem;
  color: #888;
  word-break: break-all;
}
.tile-remove {
  position: absolute;
  top: 8px;
  right: 8px;
}
.tile-check {
  position: absolute;
  top: 8px;
  right: 8px;
}
.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #222;
}
.search-input {
  max-width: 400px;
}
.empty-state {
  padding: 48px 32px 32px 32px;
  text-align: left;
}
.empty-icon-wrap {
  margin-bottom: 12px;
}
.empty-title {
  font-size: 1.3rem;
  font-weight: 500;
  color: #222;
  margin-bottom: 4px;
}
.empty-desc {
  font-size: 1rem;
  color: #888;
}
.dialog-title {
  font-size: 1.2rem;
  font-weight: 500;
  color: #222;
}
.cargo-select-popup {
  min-width: 220px;
}
</style>
