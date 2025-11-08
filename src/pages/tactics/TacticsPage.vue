<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav />
      <!-- Header Section -->
      <div class="text-center q-mb-xl">
        <div class="hero-section q-pa-lg rounded-borders">
          <div class="text-h3 text-weight-bold text-primary q-mb-sm">Taktyka i Procedury</div>
          <div class="text-body1 text-grey-6">Materiały szkoleniowe i procedury wojskowe</div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="categories-grid q-mb-xl">
        <!-- Taktyka -->
        <q-card
          class="category-card military-primary-card"
          clickable
          @click="navigateTo('/tactics/maneuvers')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="military_tech" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Taktyka</div>
            <div class="text-caption text-grey-4">Manewry i formacje</div>
          </q-card-section>
        </q-card>

        <!-- Procedury -->
        <q-card
          class="category-card military-brown-card"
          clickable
          @click="navigateTo('/tactics/procedures')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="fact_check" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Procedury</div>
            <div class="text-caption text-grey-4">Protokoły medyczne i inne</div>
          </q-card-section>
        </q-card>

        <!-- Dowodzenie -->
        <q-card
          class="category-card military-green-card"
          clickable
          @click="navigateTo('/tactics/command')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="psychology" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Dowodzenie</div>
            <div class="text-caption text-grey-4">Metody i procedury dowodzenia</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BackNav from 'components/BackNav.vue'

defineOptions({
  name: 'TacticsPage'
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

.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin: 0 auto;
}

.category-card {
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

.category-card:hover {
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
  .category-card {
    flex: 0 0 100%;
    width: 100%;
    max-width: 320px;
  }
}
</style>
