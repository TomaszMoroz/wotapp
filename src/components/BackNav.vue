<template>
  <div class="back-nav q-mb-md row items-center q-gutter-sm">
    <q-btn
      flat
      round
      icon="arrow_back"
      :color="navBtnColor"
      :text-color="navBtnTextColor"
      size="md"
      @click="goBack"
      aria-label="Powrót poziom wyżej"
    />
    <q-btn
      flat
      round
      icon="home"
      :color="navBtnColor"
      :text-color="navBtnTextColor"
      size="md"
      @click="goDashboard"
      aria-label="Powrót do dashboardu"
    />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { computed } from 'vue'
const router = useRouter()
const route = useRoute()
const $q = useQuasar()

// Dynamiczne kolory przycisków w zależności od trybu
const isDark = computed(() => $q.dark.isActive)
const navBtnColor = computed(() => isDark.value ? 'white' : 'primary')
const navBtnTextColor = computed(() => isDark.value ? 'primary' : 'white')

// Mapowanie ścieżek do sekcji nadrzędnych
const parentMap = {
  '/tools/distance': '/tools',
  '/tools/settings': '/tools',
  '/tools/mils-moa': '/tools',
  '/equipment': '/tools',
  '/training/old': '/tools',

  '/shooting/basics': '/shooting',
  '/shooting/ballistics': '/shooting',
  '/shooting/optics': '/shooting',
  '/shooting/angular-measurements': '/shooting',

  '/topography/mgrs': '/topography',

  '/tactics/maneuvers': '/tactics',
  '/tactics/procedures': '/tactics',
  '/tactics/command': '/tactics',

  '/firearms-law': '/emergency',
  '/drill': '/emergency',

  // Sekcje główne
  '/tools': '/',
  '/shooting': '/',
  '/topography': '/',
  '/tactics': '/',
  '/training': '/',
  '/unit': '/',
  '/reports': '/',
  '/nato': '/',
  '/ranks': '/',
  '/regulations': '/',
  '/emergency': '/',
  '/communication': '/',
  '/map': '/'
}

function getParentPath (path) {
  // Najpierw sprawdź pełną ścieżkę
  if (parentMap[path]) return parentMap[path]
  // Potem spróbuj bez parametrów (np. /tools/123)
  const base = path.split('/').slice(0, 3).join('/')
  if (parentMap[base]) return parentMap[base]
  // Domyślnie dashboard
  return '/'
}

function goBack () {
  const parent = getParentPath(route.path)
  if (parent === route.path) {
    window.location.reload()
  } else {
    router.push(parent)
  }
}
function goDashboard () {
  router.push('/')
}
</script>

<style scoped>
.back-nav {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
}
@media (max-width: 600px) {
  .back-nav {
    gap: 0.25rem;
  }
}
</style>
