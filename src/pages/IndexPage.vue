<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <!-- Header Section -->
      <div class="text-center q-mb-xl">
        <div class="hero-section q-pa-lg rounded-borders">
          <div class="logo-wrapper q-mb-md">
            <img src="~/assets/721.jpeg" alt="WOT Logo" class="wot-logo" />
          </div>
          <div class="text-h3 text-weight-bold text-primary q-mb-sm">Dashboard</div>
          <div class="text-subtitle1 text-grey-7 q-mb-md">aplikacja wewnętrzna</div>
          <div class="text-body1 text-grey-6">Wybierz sekcję aby rozpocząć pracę</div>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="cards-grid q-mb-xl">
        <q-card
          class="dashboard-card military-primary-card"
          clickable
          @click="navigateTo('/equipment')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="inventory" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Wyposażenie</div>
            <div class="text-caption text-grey-4">Sprzęt wojskowy</div>
          </q-card-section>
          <!-- <q-card-section class="card-footer">
            <q-chip size="sm" color="rgba(255,255,255,0.7)" text-color="white" icon="volume_up">
              Wymowa
            </q-chip>
          </q-card-section> -->
        </q-card>

        <q-card
          class="dashboard-card military-brown-card"
          clickable
          @click="navigateTo('/tools')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="build" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Narzędzia</div>
            <div class="text-caption text-grey-4">Kalkulatory wojskowe</div>
          </q-card-section>
          <!-- <q-card-section class="card-footer">
            <q-chip size="sm" color="rgba(255,255,255,0.2)" text-color="white" icon="calculate">
              Kalkulator
            </q-chip>
          </q-card-section> -->
        </q-card>

        <q-card
          class="dashboard-card military-green-card"
          clickable
          @click="navigateTo('/tactics')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="school" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Taktyka</div>
            <div class="text-caption text-grey-4">Materiały szkoleniowe</div>
          </q-card-section>
          <!-- <q-card-section class="card-footer">
            <q-chip size="sm" color="rgba(255,255,255,0.2)" text-color="white" icon="menu_book">
              Szkolenia
            </q-chip>
          </q-card-section> -->
        </q-card>

        <q-card
          class="dashboard-card military-secondary-card"
          clickable
          @click="navigateTo('/map')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="map" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Topografia</div>
            <div class="text-caption text-grey-4">Mapy i orientacja</div>
          </q-card-section>
          <!-- <q-card-section class="card-footer">
            <q-chip size="sm" color="rgba(255,255,255,0.2)" text-color="white" icon="explore">
              Nawigacja
            </q-chip>
          </q-card-section> -->
        </q-card>

        <q-card
          class="dashboard-card military-dark-card"
          clickable
          @click="navigateTo('/reports')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="description" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Meldunki</div>
            <div class="text-caption text-grey-4">Raporty wojskowe</div>
          </q-card-section>
          <!-- <q-card-section class="card-footer">
            <q-chip size="sm" color="rgba(255,255,255,0.2)" text-color="white" icon="assignment">
              Formularze
            </q-chip>
          </q-card-section> -->
        </q-card>

        <q-card
          class="dashboard-card military-accent-card"
          clickable
          @click="navigateTo('/emergency')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="military_tech" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Stopnie</div>
            <div class="text-caption text-grey-4">Regulaminy wojskowe</div>
          </q-card-section>
          <!-- <q-card-section class="card-footer">
            <q-chip size="sm" color="rgba(255,255,255,0.2)" text-color="white" icon="emergency">
              Alerty
            </q-chip>
          </q-card-section> -->
        </q-card>
      </div>

      <!-- Status Bar -->
      <!-- <div class="text-center">
        <div class="status-bar q-pa-md rounded-borders">
          <div class="row items-center justify-center q-gutter-md">
            <q-chip color="positive" text-color="white" icon="offline_pin" class="q-px-md">
              Tryb offline dostępny
            </q-chip>
            <q-chip color="military-dark" text-color="white" icon="security" class="q-px-md">
              Zabezpieczona komunikacja
            </q-chip>
            <q-chip color="military-brown" text-color="white" icon="update" class="q-px-md">
              Wersja 1.0.0
            </q-chip>
          </div>
        </div>
      </div> -->
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'IndexPage'
})

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.page-background {
  background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  background: white;
  border: 1px solid rgba(139, 69, 19, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wot-logo {
  max-width: 120px;
  max-height: 120px;
  width: auto;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}

.dashboard-card {
  height: 200px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  overflow: hidden;
  position: relative;
}

.dashboard-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.military-primary-card {
  background: linear-gradient(135deg, #2D3E2F 0%, #1A2A1C 100%);
  color: white;
}

.military-brown-card {
  background: linear-gradient(135deg, #8B4513 0%, #5D2F0A 100%);
  color: white;
}

.military-green-card {
  background: linear-gradient(135deg, #556B2F 0%, #3A4A20 100%);
  color: white;
}

.military-secondary-card {
  background: linear-gradient(135deg, #4A5D31 0%, #334021 100%);
  color: white;
}

.military-dark-card {
  background: linear-gradient(135deg, #1A1A1A 0%, #000000 100%);
  color: white;
}

.military-accent-card {
  background: linear-gradient(135deg, #704214 0%, #4A2C0E 100%);
  color: white;
}

.card-icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  backdrop-filter: blur(10px);
}

.card-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}

.status-bar {
  background: rgba(245, 245, 245, 0.95);
  border: 1px solid rgba(139, 69, 19, 0.3);
  backdrop-filter: blur(10px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .dashboard-card {
    height: 160px;
  }

  .hero-section {
    margin: 0 -16px;
    border-radius: 0;
  }

  .text-h3 {
    font-size: 2rem;
  }

  .wot-logo {
    max-width: 100px;
    max-height: 100px;
  }
}

@media (max-width: 480px) {
  .card-icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .dashboard-card {
    height: 140px;
  }

  .status-bar .row {
    flex-direction: column;
    gap: 8px;
  }

  .wot-logo {
    max-width: 80px;
    max-height: 80px;
  }
}
</style>
