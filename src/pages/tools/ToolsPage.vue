<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav />
      <!-- Header Section -->
      <div class="text-center q-mb-xl">
        <div class="hero-section q-pa-lg rounded-borders">
          <div class="text-h3 text-weight-bold text-primary q-mb-sm">Narzędzia</div>
          <div class="text-body1 text-grey-6">Kalkulatory i narzędzia wojskowe</div>
        </div>
      </div>

      <!-- Tools Grid -->
      <div class="tools-grid q-mb-xl">
        <!-- Kalkulator odległości -->
        <q-card
          class="tool-card military-primary-card"
          clickable
          @click="navigateTo('/tools/distance')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="straighten" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Kalkulator odległości</div>
            <div class="text-caption text-grey-4">Pomiar przez tysiączne</div>
          </q-card-section>
        </q-card>

        <!-- GROT Offset -->
        <q-card
          class="tool-card military-brown-card"
          clickable
          @click="navigateTo('/training')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="gps_fixed" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">GROT Offset</div>
            <div class="text-caption text-grey-4">Korekta celowania</div>
          </q-card-section>
        </q-card>

        <!-- Alfabet NATO -->
        <q-card
          class="tool-card military-green-card"
          clickable
          @click="navigateTo('/communication')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="record_voice_over" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Alfabet NATO</div>
            <div class="text-caption text-grey-4">Komunikacja fonetyczna</div>
          </q-card-section>
        </q-card>

        <!-- Trening korekty celowania -->
        <q-card
          class="tool-card military-dark-card"
          clickable
          @click="navigateTo('/tools/settings')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="tune" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Trening korekty celowania</div>
            <div class="text-caption text-grey-4">Symulacja nastaw</div>
          </q-card-section>
        </q-card>

        <!-- Konwerter MILS - MOA -->
        <q-card
          class="tool-card military-accent-card"
          clickable
          @click="navigateTo('/tools/mils-moa')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="swap_horiz" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Konwerter MILS - MOA</div>
            <div class="text-caption text-grey-4">Przelicznik jednostek</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'ToolsPage'
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
  background: #232b23;
  border: 1px solid #384c38;
  color: #f5f7fa;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 16px rgba(44,62,47,0.13);
}
.hero-section .text-h3,
.hero-section .text-h4,
.hero-section .text-h5,
.hero-section .text-h6 {
  color: #f5f7fa !important;
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin: 0 auto;
}

.tool-card {
  flex: 0 0 280px;
  width: 280px;
  height: 180px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  overflow: hidden;
  position: relative;
}

.tool-card:hover {
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

.military-dark-card {
  background: linear-gradient(135deg, #2C3E50 0%, #1A252F 100%);
  color: white;
}

.military-accent-card {
  background: linear-gradient(135deg, #4A5D31 0%, #2D3E2F 100%);
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
@media (max-width: 640px) {
  .tool-card {
    flex: 0 0 100%;
    width: 100%;
    max-width: 320px;
  }
}

/* Tablet and small desktop - 2 per row */
@media (min-width: 641px) and (max-width: 1024px) {
  .tools-grid {
    max-width: 608px; /* 2 * 280px + 1 * 24px gap + padding */
  }
}

/* Desktop - 3 per row */
@media (min-width: 1025px) and (max-width: 1440px) {
  .tools-grid {
    max-width: 888px; /* 3 * 280px + 2 * 24px gap + padding */
  }
}

/* Large desktop - 4 per row */
@media (min-width: 1441px) {
  .tools-grid {
    max-width: 1168px; /* 4 * 280px + 3 * 24px gap + padding */
  }
}
</style>
