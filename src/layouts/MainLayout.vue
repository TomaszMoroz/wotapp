<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-military-primary">
      <q-toolbar class="q-px-md">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-mr-sm text-white"
        />

        <q-toolbar-title class="text-weight-bold text-white">
          <div class="row items-center no-wrap">
            <q-icon name="shield" class="q-mr-sm" size="sm" color="white" />
          </div>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-military-light"
      :width="280"
    >
      <div class="q-pa-md bg-military-dark text-white">
        <div class="text-h6 text-weight-bold">Menu Główne</div>
        <div class="text-caption opacity-70">Wybierz sekcję</div>
      </div>

      <q-list class="q-mt-sm">
        <q-item
          clickable
          @click="$router.push('/')"
          :class="isActiveRoute('/') ? 'bg-military-active text-white' : ''"
          class="q-my-xs q-mx-sm rounded-borders"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" :color="isActiveRoute('/') ? 'white' : 'military-primary'" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">Dashboard</q-item-label>
            <q-item-label caption>Strona główna</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          @click="$router.push('/training')"
          :class="isActiveRoute('/training') ? 'bg-military-active text-white' : ''"
          class="q-my-xs q-mx-sm rounded-borders"
        >
          <q-item-section avatar>
            <q-icon name="gps_fixed" :color="isActiveRoute('/training') ? 'white' : 'military-secondary'" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">GROT - Offset</q-item-label>
            <q-item-label caption>Kalkulator balistyczny</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          @click="$router.push('/tactics')"
          :class="isActiveRoute('/tactics') ? 'bg-military-active text-white' : ''"
          class="q-my-xs q-mx-sm rounded-borders"
        >
          <q-item-section avatar>
            <q-icon name="school" :color="isActiveRoute('/tactics') ? 'white' : 'military-accent'" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">Taktyka</q-item-label>
            <q-item-label caption>Materiały szkoleniowe</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          @click="$router.push('/map')"
          :class="isActiveRoute('/map') ? 'bg-military-active text-white' : ''"
          class="q-my-xs q-mx-sm rounded-borders"
        >
          <q-item-section avatar>
            <q-icon name="map" :color="isActiveRoute('/map') ? 'white' : 'military-green'" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">Topografia</q-item-label>
            <q-item-label caption>Mapy i orientacja</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          @click="$router.push('/communication')"
          :class="isActiveRoute('/communication') ? 'bg-military-active text-white' : ''"
          class="q-my-xs q-mx-sm rounded-borders"
        >
          <q-item-section avatar>
            <q-icon name="record_voice_over" :color="isActiveRoute('/communication') ? 'white' : 'military-brown'" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">Alfabet NATO</q-item-label>
            <q-item-label caption>Komunikacja fonetyczna</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          @click="$router.push('/reports')"
          :class="isActiveRoute('/reports') ? 'bg-military-active text-white' : ''"
          class="q-my-xs q-mx-sm rounded-borders"
        >
          <q-item-section avatar>
            <q-icon name="description" :color="isActiveRoute('/reports') ? 'white' : 'military-dark'" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">Meldunki</q-item-label>
            <q-item-label caption>Raporty wojskowe</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item-label header class="text-grey-7 text-weight-bold q-px-md">
          Ustawienia
        </q-item-label>

        <q-item clickable class="q-my-xs q-mx-sm rounded-borders">
          <q-item-section avatar>
            <q-icon name="settings" color="military-secondary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">Konfiguracja</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable class="q-my-xs q-mx-sm rounded-borders">
          <q-item-section avatar>
            <q-icon name="info" color="military-secondary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">O aplikacji</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'MainLayout'
})

const route = useRoute()
const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const isActiveRoute = computed(() => (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
})
</script>

<style scoped>
/* Military Color Palette */
.bg-military-primary {
  background-color: #2D3E2F; /* Dark Military Green */
}

.bg-military-dark {
  background-color: #1A1A1A; /* Military Black */
}

.bg-military-light {
  background-color: #F5F5F5; /* Off White */
}

.bg-military-active {
  background-color: #4A5D31; /* Active Military Green */
}

.q-item {
  min-height: 56px;
  transition: all 0.2s ease;
}

.q-item:hover {
  background-color: rgba(74, 93, 49, 0.1); /* Light military green hover */
  transform: translateX(4px);
}

.q-item.bg-military-active:hover {
  background-color: #4A5D31 !important;
  transform: translateX(0);
}

/* Military color definitions for use in templates */
:root {
  --military-primary: #2D3E2F;
  --military-secondary: #8B4513;
  --military-accent: #556B2F;
  --military-green: #4A5D31;
  --military-brown: #8B4513;
  --military-dark: #1A1A1A;
  --military-light: #F5F5F5;
}
</style>
