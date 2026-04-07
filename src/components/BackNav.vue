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
      class="back-nav-btn"
      :class="{ 'back-nav-btn--dark': $q.dark.isActive }"
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
      class="back-nav-btn"
      :class="{ 'back-nav-btn--dark': $q.dark.isActive }"
      @click="goDashboard"
      aria-label="Powrót do dashboardu"
    />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useQuasar } from 'quasar'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

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

const navBtnColor = computed(() => {
  if ($q.dark.isActive) return 'grey-3'
  return props.color === 'black' ? 'grey-10' : 'white'
})

const navBtnTextColor = computed(() => {
  if ($q.dark.isActive) return 'grey-2'
  return props.color === 'black' ? 'grey-10' : 'white'
})

// Routes that are flat (single-segment) but belong to a subsection menu.
const SECTION_PARENT_MAP = {
  '/ranks': '/emergency',
  '/regulations': '/emergency',
  '/firearms-law': '/emergency',
  '/drill': '/emergency'
}

const canGoBack = computed(() => {
  if (!props.showBack) return false
  return route.path !== '/'
})

function getParentPath () {
  if (SECTION_PARENT_MAP[route.path]) {
    return SECTION_PARENT_MAP[route.path]
  }

  const segments = route.path.split('/').filter(Boolean)
  if (segments.length === 0) return '/'
  segments.pop()
  return '/' + segments.join('/')
}

function goBack () {
  if (sessionStorage.getItem('fromCargoShortcut') === '1') {
    sessionStorage.removeItem('fromCargoShortcut')
    router.push('/cargo')
    return
  }
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

.back-nav-btn {
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(10px);
}

.back-nav-btn--dark {
  background: rgba(48, 49, 52, 0.92);
  border-color: rgba(232, 234, 237, 0.12);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.24);
}

.back-nav-btn :deep(.q-icon),
.back-nav-btn :deep(.q-btn__content) {
  color: inherit !important;
}

@media (max-width: 600px) {
  .back-nav {
    gap: 0.25rem;
  }
}
</style>
