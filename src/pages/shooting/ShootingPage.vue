<template>
  <q-page class="modern-bg page-shell q-pa-md">
    <div class="page-shell__inner">
      <BackNav color="black" />

      <section class="page-hero q-mb-lg">
        <div class="page-hero__content">
          <div class="page-hero__eyebrow">Sekcja szkoleniowa</div>
          <h1 class="page-hero__title">Strzelectwo</h1>
          <p class="page-hero__subtitle">
            Balistyka, techniki strzelania i materiały do przygotowania praktycznego.
          </p>
        </div>
      </section>

      <section class="dashboard-tiles q-mb-xl">
        <div class="feature-grid">
          <q-card v-for="section in sections" :key="section.route" class="feature-card" flat bordered @click="navigateTo(section.route)">
            <q-card-section class="feature-card__body">
              <div class="feature-icon" :class="section.tone">
                <q-icon :name="section.icon" color="white" size="28px" />
              </div>
              <div class="feature-kicker">{{ section.kicker }}</div>
              <div class="feature-title">{{ section.title }}</div>
              <div class="feature-description">{{ section.desc }}</div>
            </q-card-section>
          </q-card>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BackNav from 'components/BackNav.vue'

defineOptions({
  name: 'ShootingPage'
})

const router = useRouter()

const sections = [
  { route: '/shooting/basics', icon: 'gps_fixed', title: 'Podstawy strzelania', desc: 'Postawa, chwyt i prawidłowe celowanie.', tone: 'tone-forest', kicker: 'Fundamenty' },
  { route: '/shooting/ballistics', icon: 'trending_up', title: 'Balistyka', desc: 'Trajektoria lotu pocisku i poprawki.', tone: 'tone-earth', kicker: 'Teoria' },
  { route: '/shooting/angular-measurements', icon: 'straighten', title: 'Miary kątowe', desc: 'Tysięczne, MOA i siatki celownicze.', tone: 'tone-khaki', kicker: 'Przeliczenia' },
  { route: '/shooting/optics', icon: 'center_focus_strong', title: 'Optyka i celowniki', desc: 'Lunety, kolimatory i praktyczne ustawienia.', tone: 'tone-sky', kicker: 'Sprzęt' }
]

const navigateTo = (path) => {
  router.push(path).catch(() => {})
}
</script>

<style scoped>
.page-shell {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
