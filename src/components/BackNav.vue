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
  },
  showBack: {
    type: Boolean,
    default: true
  },
  customBack: {
    type: Function,
    default: null
  },
  parentPath: {
    type: String,
    default: null
  }
})

const navBtnColor = computed(() => props.color === 'black' ? 'black' : 'white')
const navBtnTextColor = computed(() => props.color === 'black' ? 'black' : 'white')

// Określ, czy można wrócić o jeden poziom wyżej (czyli nie jesteśmy na dashboardzie ani na głównej sekcji)

const canGoBack = computed(() => {
  if (!props.showBack) return false
  // Nie pokazuj strzałki na dashboardzie
  return route.path !== '/'
})

function getParentPath () {
  // Ucinamy ostatni segment ścieżki (np. /tools/equipment -> /tools)
  const segments = route.path.split('/').filter(Boolean)
  if (segments.length === 0) return '/'
  segments.pop()
  return '/' + segments.join('/')
}

function goBack () {
  if (props.parentPath) {
    if (props.parentPath !== route.path) {
      router.push(props.parentPath)
    }
    return
  }
  if (props.customBack) {
    props.customBack()
    return
  }
  const parent = getParentPath()
  if (parent === route.path || route.path === '/') {
    // Jeśli już jesteśmy na root lub nie ma gdzie wracać, nie rób nic
    return
  }
  router.push(parent)
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
