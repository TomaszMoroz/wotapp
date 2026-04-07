<template>
  <q-page class="modern-bg page-shell q-pa-md">
    <div class="page-shell__inner">
      <BackNav color="black" />

      <section class="page-hero q-mb-lg">
        <div class="page-hero__content">
          <div class="page-hero__eyebrow">Zestaw narzędzi</div>
          <h1 class="page-hero__title">Narzędzia</h1>
          <p class="page-hero__subtitle">
            Kalkulatory i utility zaprojektowane do szybkiego użycia w szkoleniu i działaniach terenowych.
          </p>
        </div>
      </section>

      <section class="dashboard-tiles q-mb-xl">
        <div class="feature-grid">
          <q-card v-for="tool in tools" :key="tool.title" class="feature-card" flat bordered @click="navigateTo(tool.route)">
            <q-card-section class="feature-card__body">
              <div class="feature-icon" :class="tool.tone">
                <q-icon :name="tool.icon" color="white" size="28px" />
              </div>
              <div class="feature-kicker">{{ tool.category }}</div>
              <div class="feature-title">{{ tool.title }}</div>
              <div class="feature-description">{{ tool.desc || 'Praktyczne narzędzie pomocnicze' }}</div>
            </q-card-section>
          </q-card>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tools = [
  { title: 'Kalkulator odległości', icon: 'straighten', desc: 'Pomiar przez DWK1000', route: '/tools/distance', tone: 'tone-forest', category: 'Pomiar' },
  { title: 'GROT Offset', icon: 'gps_fixed', desc: 'Korekta celowania', route: '/training', tone: 'tone-earth', category: 'Strzelectwo' },
  { title: 'Alfabet NATO', icon: 'record_voice_over', desc: 'Znaki fonetyczne', route: '/communication', tone: 'tone-sky', category: 'Łączność' },
  { title: 'Trening korekty celowania', icon: 'tune', desc: 'Symulacja nastaw', route: '/tools/settings', tone: 'tone-khaki', category: 'Trening' },
  { title: 'Konwerter MILS - MOA', icon: 'swap_horiz', desc: 'Przelicznik jednostek', route: '/tools/mils-moa', tone: 'tone-stone', category: 'Przeliczenia' },
  { title: 'Pobrany sprzęt', icon: 'inventory_2', desc: 'Lista kontrolna', route: '/tools/equipment', tone: 'tone-earth', category: 'Logistyka' },
  { title: 'Pogoda', icon: 'cloud', desc: 'Prognoza i warunki', route: '/tools/weather', tone: 'tone-sky', category: 'Warunki' },
  { title: 'Tabela marszu', icon: 'table_chart', desc: 'Kreator marszu', route: '/tools/march-table', tone: 'tone-khaki', category: 'Planowanie' },
  { title: 'Rozpoznanie (F.R.)', icon: 'visibility', desc: 'Nauka i test', route: '/tools/recon', tone: 'tone-forest', category: 'Szkolenie' },
  { title: 'Detektor ruchu', icon: 'motion_photos_on', desc: 'Monitoring obrazu', route: '/tools/motion-detector', tone: 'tone-stone', category: 'Obserwacja' }
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
</style>
