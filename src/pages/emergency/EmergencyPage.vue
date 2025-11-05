<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <!-- Header Section -->
      <div class="text-center q-mb-xl">
        <div class="hero-section q-pa-lg rounded-borders">
          <div class="text-h3 text-weight-bold text-primary q-mb-sm">Stopnie i Regulaminy</div>
          <div class="text-body1 text-grey-6">Wojskowe oznaczenia i przepisy</div>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="cards-grid q-mb-xl">
        <!-- Stopnie Wojskowe -->
        <q-card
          class="dashboard-card military-primary-card"
          clickable
          @click="navigateTo('/ranks')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="military_tech" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Stopnie Wojskowe</div>
            <div class="text-caption text-grey-4">Oznaczenia i hierarchia WOT</div>
          </q-card-section>
        </q-card>

        <!-- Regulaminy -->
        <q-card
          class="dashboard-card military-brown-card"
          clickable
          @click="navigateTo('/regulations')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="gavel" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Regulaminy</div>
            <div class="text-caption text-grey-4">Przepisy i procedury WOT</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'EmergencyPage'
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

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 600px;
  margin: 0 auto;
}

.dashboard-card {
  height: 180px;
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

/* Mobile responsiveness */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
