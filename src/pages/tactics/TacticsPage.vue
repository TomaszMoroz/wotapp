<template>
  <q-page class="modern-bg">
    <div class="container q-pa-md">
      <BackNav />
      <!-- Header Section -->
      <div class="text-center q-mb-xl">
        <div class="modern-hero-section q-pa-lg rounded-borders">
          <div class="text-h3 text-weight-bold text-military-secondary q-mb-sm">Taktyka i Procedury</div>
          <div class="text-body1 text-military-dark">Materiały szkoleniowe i procedury wojskowe</div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="modern-categories-grid q-mb-xl">
        <!-- Taktyka -->
        <q-card
          class="modern-category-card bg-military-primary"
          clickable
          @click="navigateTo('/tactics/maneuvers')"
        >
          <q-card-section class="text-center">
            <div class="modern-card-icon-wrapper">
              <q-icon name="military_tech" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold text-white">Taktyka</div>
            <div class="text-caption text-military-light">Manewry i formacje</div>
          </q-card-section>
        </q-card>

        <!-- Procedury -->
        <q-card
          class="modern-category-card bg-military-brown"
          clickable
          @click="navigateTo('/tactics/procedures')"
        >
          <q-card-section class="text-center">
            <div class="modern-card-icon-wrapper">
              <q-icon name="fact_check" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold text-white">Procedury</div>
            <div class="text-caption text-military-light">Protokoły medyczne i inne</div>
          </q-card-section>
        </q-card>

        <!-- Dowodzenie -->
        <q-card
          class="modern-category-card bg-military-accent"
          clickable
          @click="navigateTo('/tactics/command')"
        >
          <q-card-section class="text-center">
            <div class="modern-card-icon-wrapper">
              <q-icon name="psychology" size="3rem" color="white" />
            </div>
            <div class="text-h6 q-mt-md text-weight-bold text-white">Dowodzenie</div>
            <div class="text-caption text-military-light">Metody i procedury dowodzenia</div>
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

.modern-bg {
  background: #F5F5F5;
  min-height: 100vh;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.modern-hero-section {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  border: 1px solid #e0e0e0;
}
.modern-categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
  margin: 0 auto;
}
.modern-category-card {
  flex: 0 0 280px;
  width: 280px;
  height: 180px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 16px rgba(0,0,0,0.09);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.modern-category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
.modern-card-icon-wrapper {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  backdrop-filter: blur(10px);
}
@media (max-width: 640px) {
  .modern-category-card {
    flex: 0 0 100%;
    width: 100%;
    max-width: 320px;
  }
}
</style>
