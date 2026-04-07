<template>
  <q-page class="modern-bg page-shell dashboard-page-shell">
    <section class="page-hero dashboard-hero q-mb-lg">
      <div class="dashboard-hero__bg-logo" aria-hidden="true">
        <img :src="logo721" alt="" class="dashboard-hero__logo" />
      </div>

      <div class="dashboard-hero__inner">
        <div class="page-hero__content">
          <h1 class="page-hero__title">Dashboard</h1>
          <p class="page-hero__subtitle">
            Dostęp do modułów, narzędzi, materiałów szkoleniowych.
          </p>
          <div class="page-hero__meta">
            <q-chip dense class="feature-chip">
              <q-icon name="bolt" size="14px" class="q-mr-xs" />
              10 sekcji
            </q-chip>
            <q-chip dense class="feature-chip">
              <q-icon name="offline_pin" size="14px" class="q-mr-xs" />
              Gotowa do działania offline
            </q-chip>
          </div>
        </div>
      </div>
    </section>

    <section class="dashboard-tiles q-mb-xl">
      <div class="feature-grid">
        <q-card v-for="tile in tiles" :key="tile.label" class="feature-card" flat bordered @click="navigateTo(tile.route)">
          <q-card-section class="feature-card__body">
            <div class="feature-icon" :class="tile.tone">
              <q-icon :name="tile.icon" color="white" size="28px" />
            </div>
            <div class="feature-kicker">{{ tile.label }}</div>
            <div class="feature-title">{{ tile.title }}</div>
            <div class="feature-description">{{ tile.desc }}</div>
          </q-card-section>
        </q-card>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import logo721 from 'assets/721.jpeg'

const router = useRouter()

const tiles = [
  { label: 'Cargo', icon: 'storage', desc: 'Moje skróty i szybkie przejścia', route: '/cargo', title: 'Cargo', tone: 'tone-earth' },
  { label: 'Narzędzia', icon: 'build', desc: 'Pomoce, kalkulatory i utility', route: '/tools', title: 'Narzędzia', tone: 'tone-forest' },
  { label: 'Stopnie i prawo', icon: 'military_tech', desc: 'Regulamin, prawo, procedury', route: '/emergency', title: 'Stopnie, regulamin i prawo', tone: 'tone-khaki' },
  { label: 'Wyposażenie', icon: 'inventory', desc: 'Broń etatowa i materiały', route: '/equipment', title: 'Wyposażenie', tone: 'tone-stone' },
  { label: 'Meldunki', icon: 'description', desc: 'Raporty i wzory dokumentów', route: '/reports', title: 'Meldunki', tone: 'tone-sky' },
  { label: 'Strzelectwo', icon: 'gps_fixed', desc: 'Balistyka, teoria i technika', route: '/shooting', title: 'Strzelectwo', tone: 'tone-earth' },
  { label: 'TCCC', icon: 'medical_services', desc: 'Taktyczna pomoc poszkodowanym', route: '/tccc', title: 'TCCC', tone: 'tone-sky' },
  { label: 'Taktyka', icon: 'school', desc: 'Dowodzenie, procedury, manewry', route: '/tactics', title: 'Taktyka i dowodzenie', tone: 'tone-forest' },
  { label: 'Topografia', icon: 'map', desc: 'Mapy, MGRS i nawigacja', route: '/topography', title: 'Topografia', tone: 'tone-khaki' },
  { label: 'ABC', icon: 'info', desc: 'Podstawowe informacje dla nowych', route: '/abc', title: 'ABC', tone: 'tone-stone' }
]

function navigateTo (path) {
  router.push(path).catch(() => {})
}
</script>

<style scoped>
.page-shell {
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-page-shell {
  padding: 16px;
}

body.body--dark .dashboard-page-shell {
  background: var(--app-surface) !important;
}

.dashboard-hero {
  min-height: 228px;
  background: linear-gradient(135deg, #fbfcfd 0%, #f2f5f8 58%, #eef2f4 100%);
}

body.body--dark .dashboard-hero {
  background: var(--app-surface) !important;
  border: 1px solid var(--app-border) !important;
  box-shadow: var(--app-shadow-soft) !important;
}

.dashboard-hero__inner {
  position: relative;
  z-index: 2;
  display: block;
}

.dashboard-hero__bg-logo {
  position: absolute;
  right: -18px;
  top: 50%;
  transform: translateY(-50%);
  width: clamp(170px, 34vw, 300px);
  height: clamp(170px, 34vw, 300px);
  padding: 14px;
  opacity: 0.12;
  pointer-events: none;
  border-radius: 36px;
  overflow: hidden;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.74) 0%, rgba(255, 255, 255, 0.3) 52%, rgba(255, 255, 255, 0) 76%);
}

body.body--dark .dashboard-hero__bg-logo {
  opacity: 0.1;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 52%, rgba(255, 255, 255, 0) 76%);
}

.dashboard-hero__logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  filter: grayscale(1) saturate(0.15) contrast(1.08) brightness(0.94);
  border-radius: inherit;
}

@media (max-width: 820px) {
  .dashboard-hero {
    min-height: 196px;
  }

  .dashboard-hero__bg-logo {
    right: -24px;
    top: 48%;
    width: 180px;
    height: 180px;
    opacity: 0.09;
  }

  .dashboard-page-shell {
    padding: 14px;
  }
}

@media (max-width: 520px) {
  .dashboard-hero {
    min-height: 176px;
    padding: 20px;
  }

  .dashboard-hero__bg-logo {
    right: -20px;
    top: 50%;
    width: 180px;
    height: 180px;
    padding: 10px;
    opacity: 0.08;
    border-radius: 30px;
  }

  .dashboard-page-shell {
    padding: 12px;
  }

  .page-hero__title {
    font-size: clamp(1.65rem, 8vw, 2.1rem);
  }

  .page-hero__subtitle {
    margin-top: 8px;
    font-size: 0.95rem;
  }

  .page-hero__meta {
    margin-top: 12px;
    gap: 8px;
  }
}
</style>
