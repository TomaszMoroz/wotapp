<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <!-- Header Section -->
      <div class="text-center q-mb-xl">
        <div class="hero-section q-pa-lg rounded-borders">
          <div class="text-h3 text-weight-bold text-primary q-mb-sm">Strzelectwo</div>
          <div class="text-body1 text-grey-6">Balistyka, techniki strzelania i szkolenie strzeleckie</div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="categories-grid q-mb-xl">
        <!-- Podstawy strzelania -->
        <q-card
          class="category-card military-primary-card"
          clickable
          @click="navigateTo('/shooting/basics')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="gps_fixed" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Podstawy strzelania</div>
            <div class="text-caption text-grey-4">Postawa, chwyt, celowanie</div>
          </q-card-section>
        </q-card>

        <!-- Balistyka -->
        <q-card
          class="category-card military-brown-card"
          clickable
          @click="navigateTo('/shooting/ballistics')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="trending_up" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Balistyka</div>
            <div class="text-caption text-grey-4">Trajektoria i poprawki</div>
          </q-card-section>
        </q-card>

        <!-- Miary kątowe -->
        <q-card
          class="category-card military-green-card"
          clickable
          @click="navigateTo('/shooting/angular-measurements')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="straighten" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Miary kątowe</div>
            <div class="text-caption text-grey-4">Tysiączne, MOA, mil-dot</div>
          </q-card-section>
        </q-card>

        <!-- Optyka i celowniki -->
        <q-card
          class="category-card military-dark-card"
          clickable
          @click="navigateTo('/shooting/optics')"
        >
          <q-card-section class="text-center">
            <div class="card-icon-wrapper">
              <q-icon name="center_focus_strong" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold">Optyka i celowniki</div>
            <div class="text-caption text-grey-4">Lunety, kolimatory</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'ShootingPage'
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

/* Mobile responsiveness */
@media (max-width: 640px) {
  .category-card {
    flex: 0 0 100%;
    width: 100%;
    max-width: 320px;
  }
}
</style>
