<template>
  <div class="back-nav q-mb-md row items-center q-gutter-sm">
    <q-btn
      v-if="canGoBack"
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
import { computed } from 'vue'
const router = useRouter()
const route = useRoute()
const props = defineProps({
  color: {
    type: String,
    default: null
  }
})

const navBtnColor = computed(() => props.color === 'black' ? 'black' : 'white')
const navBtnTextColor = computed(() => props.color === 'black' ? 'black' : 'white')

// Określ, czy można wrócić o jeden poziom wyżej (czyli nie jesteśmy na dashboardzie ani na głównej sekcji)
const canGoBack = computed(() => {
  // Dashboard
  if (route.path === '/') return false
  // Jeśli jest parent w matched i nie jest to root
  if (route.matched.length > 1 && route.matched[route.matched.length - 2].path !== '/') return true
  // Jeśli jest child route (np. /equipment/:weaponId)
  if (route.matched.length > 1 && route.matched[route.matched.length - 2].path === '/') return true
  // Jeśli obecny route ma children (czyli jest zbiorem podstron), nie pokazuj strzałki
  if (route.matched.length && route.matched[route.matched.length - 1].children && route.matched[route.matched.length - 1].children.length > 0) {
    return false
  }
  // Domyślnie: jeśli nie jesteśmy na root, pokaż strzałkę
  return route.path !== '/'
})

function getParentPath () {
  // Jeśli jesteśmy na childzie (np. /equipment/weaponId), wróć do parenta (np. /equipment)
  if (route.matched.length > 1) {
    const parent = route.matched[route.matched.length - 2]
    if (parent && parent.path !== '/') {
      // Zbuduj ścieżkę parenta z parametrami, jeśli trzeba
      let parentPath = parent.path
      // Zamień parametry na wartości z obecnego route
      if (parentPath.includes(':')) {
        Object.entries(route.params).forEach(([key, value]) => {
          parentPath = parentPath.replace(`:${key}`, value)
        })
      }
      return parentPath
    }
    // Jeśli parent to root, wróć do dashboardu
    if (parent && parent.path === '/') {
      return '/'
    }
  }
  // Domyślnie dashboard
  return '/'
}

function goBack () {
  // Jeśli jest historia, wróć o krok
  if (window.history.length > 1) {
    router.back()
    return
  }
  // W innym przypadku, wróć do parenta
  const parent = getParentPath()
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
