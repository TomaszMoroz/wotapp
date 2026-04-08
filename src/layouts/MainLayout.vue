<template>
  <q-layout :class="[themeClass, $q.dark.isActive ? 'theme-dark' : '']" view="lHh Lpr lFf" class="dashboard-bg" :dark="$q.dark.isActive">
    <q-dialog v-model="pwaUpdateDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="system_update" color="primary" size="md" class="q-mr-md" />
          <div class="text-h6">Zaktualizowano aplikację do najnowszej wersji.</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Zamknij" @click="handlePwaDialogClose" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-header elevated :class="[$q.dark.isActive ? 'google-dark-header' : 'bg-military-primary', 'dashboard-header']" :dark="$q.dark.isActive">
          <!-- <q-dialog v-model="pushDialog" persistent>
            <q-card>
              <q-card-section>
                <div class="text-h6">Włączyć powiadomienia push?</div>
                <div class="q-mt-sm">Aby otrzymywać komunikaty, szkolenia i alarmy, musisz wyrazić zgodę na powiadomienia push.</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Anuluj" color="primary" v-close-popup />
                <q-btn flat label="Włącz" color="positive" @click="enablePushNotifications" />
              </q-card-actions>
            </q-card>
          </q-dialog> -->
          <q-dialog v-model="pushDialog" persistent>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        {{ (pushEnabled || pushPermission === 'granted') ? 'Powiadomienia push są włączone' : 'Włączyć powiadomienia push?' }}
      </div>
      <div class="q-mt-sm">
        <template v-if="pushEnabled || pushPermission === 'granted'">
          Otrzymujesz komunikaty, szkolenia i alarmy. Możesz wyłączyć subskrypcję powiadomień push.
        </template>
        <template v-else>
          Aby otrzymywać komunikaty, szkolenia i alarmy, musisz wyrazić zgodę na powiadomienia push.
        </template>
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Anuluj" color="primary" v-close-popup />
      <q-btn
        v-if="!(pushEnabled || pushPermission === 'granted')"
        flat label="Włącz" color="positive" @click="enablePushNotifications"
      />
      <q-btn
        v-else
        flat label="Wyłącz" color="negative" @click="unsubscribePushNotifications"
      />
    </q-card-actions>
  </q-card>
</q-dialog>
      <q-toolbar class="q-px-sm q-px-md-md dashboard-toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-mr-sm dashboard-toolbar-btn"
        />
        <q-toolbar-title class="dashboard-title">
          <div class="dashboard-brand">
            <div class="dashboard-brand__mark">
              <q-icon name="shield" size="20px" />
            </div>
            <div class="dashboard-brand__copy">
              <span class="dashboard-brand__title">Kit Bag App</span>
              <span class="dashboard-brand__subtitle">szkolenie i narzędzia WOT</span>
            </div>
          </div>
        </q-toolbar-title>
        <span class="dashboard-version">v{{ appVersion }}</span>
        <q-btn
          v-if="showInstall && !isMobile && false"
          flat
          dense
          icon="download"
          label="Zainstaluj aplikację"
          class="q-ml-sm dashboard-toolbar-btn"
          @click="installPwa"
        />
        <q-btn
          flat
          dense
          icon="dark_mode"
          aria-label="Motyw"
          @click="cycleTheme"
          class="q-ml-sm dashboard-toolbar-btn"
        >
          <q-tooltip anchor="bottom middle">Zmień motyw: {{ themeLabel }}</q-tooltip>
        </q-btn>
        <q-btn
          flat
          dense
          :icon="(pushEnabled || pushPermission === 'granted') ? 'notifications_off' : 'notifications'"
          :aria-label="(pushEnabled || pushPermission === 'granted') ? 'Wyłącz powiadomienia push' : 'Włącz powiadomienia push'"
          @click="pushDialog = true"
          class="q-ml-sm dashboard-toolbar-btn"
        />
      </q-toolbar>
      <!-- Usunięto komunikaty z górnego paska -->
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :class="['dashboard-drawer', themeClass]"
      :width="280"
    >

      <q-list class="q-mt-sm">

        <!-- Dashboard - zawsze widoczny -->
        <q-item
          clickable
          @click="$router.push('/')"
          :class="isActiveRoute('/') ? 'active-menu' : ''"
          class="q-my-xs q-mx-sm rounded-borders nav-home-item"
        >
          <q-item-section avatar class="sidebar-logo-avatar">
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium nav-item__label">Dashboard</q-item-label>
            <q-item-label caption class="nav-item__caption">Strona główna</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Menu dla sekcji Narzędzia -->
        <template v-if="isInToolsSection">
          <q-separator class="q-my-md" />
          <q-item-label header class="text-grey-7 text-weight-bold q-px-md">
            Narzędzia
          </q-item-label>

          <q-item
            clickable
            @click="$router.push('/tools')"
            :class="isActiveRoute('/tools') && route.path === '/tools' ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="build" :color="isActiveRoute('/tools') && route.path === '/tools' ? 'white' : 'military-secondary'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Wszystkie narzędzia</q-item-label>
              <q-item-label caption :class="isActiveRoute('/tools') && 'text-white'">Lista</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push('/tools/distance')"
            :class="isActiveRoute('/tools/distance') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="straighten" :color="isActiveRoute('/tools/distance') ? 'white' : 'military-accent'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Kalkulator odległości</q-item-label>
              <q-item-label caption :class="isActiveRoute('/tools/distance') && 'text-white'">Pomiar przez DWK1000</q-item-label>
            </q-item-section>
          </q-item>
                    <q-item
            clickable
            @click="$router.push('/tools/settings')"
            :class="isActiveRoute('/tools/settings') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="tune" :color="isActiveRoute('/tools/settings') ? 'white' : 'military-brown'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Trening korekty celowania</q-item-label>
              <q-item-label caption :class="isActiveRoute('/tools/settings') && 'text-white'">Symulacja nastaw</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push('/tools/mils-moa')"
            :class="isActiveRoute('/tools/mils-moa') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="swap_horiz" :color="isActiveRoute('/tools/mils-moa') ? 'white' : 'military-accent'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Konwerter MILS - MOA</q-item-label>
              <q-item-label caption :class="isActiveRoute('/tools/mils-moa') && 'text-white'">Przelicznik jednostek</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            @click="$router.push('/training')"
            :class="isActiveRoute('/training') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="gps_fixed" :color="isActiveRoute('/training') ? 'white' : 'military-brown'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">GROT Offset</q-item-label>
              <q-item-label caption :class="isActiveRoute('/training') && 'text-white'">Kalkulator offsetu</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push('/communication')"
            :class="isActiveRoute('/communication') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="record_voice_over" :color="isActiveRoute('/communication') ? 'white' : 'military-green'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Alfabet NATO</q-item-label>
              <q-item-label caption :class="isActiveRoute('/communication') && 'text-white'">Komunikacja fonetyczna</q-item-label>
            </q-item-section>
          </q-item>

           <q-item
              clickable
              @click="$router.push('/tools/weather')"
              :class="isActiveRoute('/tools/weather') ? 'bg-military-active text-white' : ''"
              class="q-my-xs q-mx-sm rounded-borders"
            >
              <q-item-section avatar>
                <q-icon name="cloud" :color="isActiveRoute('/tools/weather') ? 'white' : 'military-blue'" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">Pogoda</q-item-label>
                <q-item-label caption :class="isActiveRoute('/tools/weather') && 'text-white'">Prognoza pogody</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              @click="$router.push('/tools/march-table')"
              :class="isActiveRoute('/tools/march-table') ? 'bg-military-active text-white' : ''"
              class="q-my-xs q-mx-sm rounded-borders"
            >
              <q-item-section avatar>
                <q-icon name="table_chart" :color="isActiveRoute('/tools/march-table') ? 'white' : 'military-grey'" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">Tabela marszu</q-item-label>
                <q-item-label caption :class="isActiveRoute('/tools/march-table') && 'text-white'">Kreator marszu</q-item-label>
              </q-item-section>
            </q-item>
        </template>

        <!-- Menu główne (gdy nie jesteśmy w narzędziach) -->
        <template v-else>
          <q-item
            clickable
            @click="$router.push('/equipment')"
            :class="isActiveRoute('/equipment') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="inventory" :color="isActiveRoute('/equipment') ? 'white' : 'military-primary'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Wyposażenie</q-item-label>
              <q-item-label caption :class="isActiveRoute('/equipment') && 'text-white'">Broń etatowa</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push('/tools')"
            :class="isActiveRoute('/tools') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="build" :color="isActiveRoute('/tools') ? 'white' : 'military-secondary'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Narzędzia</q-item-label>
              <q-item-label caption :class="isActiveRoute('/tools') && 'text-white'">Kalkulatory wojskowe</q-item-label>
            </q-item-section>
          </q-item>

            <q-item
              clickable
              @click="$router.push('/tools/weather')"
              :class="isActiveRoute('/tools/weather') ? 'bg-military-active text-white' : ''"
              class="q-my-xs q-mx-sm rounded-borders"
            >
              <q-item-section avatar>
                <q-icon name="cloud" :color="isActiveRoute('/tools/weather') ? 'white' : 'military-blue'" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">Pogoda</q-item-label>
                <q-item-label caption :class="isActiveRoute('/tools/weather') && 'text-white'">Prognoza pogody</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              @click="$router.push('/tools/march-table')"
              :class="isActiveRoute('/tools/march-table') ? 'bg-military-active text-white' : ''"
              class="q-my-xs q-mx-sm rounded-borders"
            >
              <q-item-section avatar>
                <q-icon name="table_chart" :color="isActiveRoute('/tools/march-table') ? 'white' : 'military-grey'" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">Tabela marszu</q-item-label>
                <q-item-label caption :class="isActiveRoute('/tools/march-table') && 'text-white'">Kreator marszu</q-item-label>
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
              <q-item-label class="text-weight-medium">Taktyka, procedury, dowodzenie</q-item-label>
              <q-item-label caption :class="isActiveRoute('/tactics') && 'text-white'">Materiały szkoleniowe</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push('/topography')"
            :class="isActiveRoute('/topography') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="map" :color="isActiveRoute('/topography') ? 'white' : 'military-green'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Topografia</q-item-label>
              <q-item-label caption :class="isActiveRoute('/topography') && 'text-white'">Mapy i nawigacja</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push('/shooting')"
            :class="isActiveRoute('/shooting') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="gps_fixed" :color="isActiveRoute('/shooting') ? 'white' : 'military-brown'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Strzelectwo</q-item-label>
              <q-item-label caption :class="isActiveRoute('/shooting') && 'text-white'">Balistyka i technika</q-item-label>
            </q-item-section>
          </q-item>

          <!-- TCCC -->
          <q-item
            clickable
            @click="$router.push('/tccc')"
            :class="isActiveRoute('/tccc') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="medical_services" :color="isActiveRoute('/tccc') ? 'white' : 'red-5'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">TCCC</q-item-label>
              <q-item-label caption :class="isActiveRoute('/tccc') && 'text-white'">Taktyczna pomoc</q-item-label>
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
              <q-item-label caption :class="isActiveRoute('/reports') && 'text-white'">Raporty wojskowe</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push('/emergency')"
            :class="isActiveRoute('/emergency') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="military_tech" :color="isActiveRoute('/emergency') ? 'white' : 'military-accent'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Stopnie</q-item-label>
              <q-item-label caption :class="isActiveRoute('/emergency') && 'text-white'">Regulaminy wojskowe, prawo</q-item-label>
            </q-item-section>
          </q-item>

          <!-- ABC na końcu -->
          <q-item
            clickable
            @click="$router.push('/abc')"
            :class="isActiveRoute('/abc') ? 'bg-military-active text-white' : ''"
            class="q-my-xs q-mx-sm rounded-borders"
          >
            <q-item-section avatar>
              <q-icon name="info" :color="isActiveRoute('/abc') ? 'white' : 'military-accent'" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">ABC</q-item-label>
              <q-item-label caption :class="isActiveRoute('/abc') && 'text-white'">Podstawowe informacje dla nowo wcielonych</q-item-label>
            </q-item-section>
          </q-item>

          <!-- Nowy layout -->
        </template>

        <q-separator class="q-my-md" />

        <!-- Logo 721 -->
        <div class="logo-section q-pa-md text-center">
          <div class="logo-mask-wrapper">
            <img :src="logo721" alt="WOT 721 Logo" class="wot-logo-drawer" />
            <div v-if="themeMode === 'tactical'" class="logo-dark-mask"></div>
          </div>
          <div class="text-caption text-grey-6 q-mt-sm">Aplikacja wewnętrzna</div>
          <div class="text-caption text-grey-7 q-mt-sm">Kontakt: Tomasz Mo 83</div>
          <div class="text-caption text-grey-7 q-mt-sm">tmoroz688@gmail.com</div>
        </div>

        <!-- <q-item-label header class="text-grey-7 text-weight-bold q-px-md">
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
        </q-item> -->
      </q-list>
    </q-drawer>

    <q-page-container :dark="$q.dark.isActive">
      <div class="dashboard-content-wrapper">
        <router-view v-slot="{ Component }">
          <component :is="Component" :dark="$q.dark.isActive" />
        </router-view>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import pkg from '../../package.json'
import { useQuasar, Dark } from 'quasar'
import { useRoute } from 'vue-router'
import logo721 from 'assets/721.jpeg'
import { storeToRefs } from 'pinia'
import { useThemeStore } from 'stores/theme-store'

const appVersion = pkg.version
const themeStore = useThemeStore()
const { themeMode } = storeToRefs(themeStore)

const themeClass = computed(() => {
  return ''
})

const themeLabel = computed(() => {
  if (themeMode.value === 'dark') return 'Ciemny'
  return 'Jasny'
})

function cycleTheme () {
  if (themeMode.value === 'light') themeStore.setThemeMode('dark')
  else themeStore.setThemeMode('light')
}

watch(themeMode, val => {
  Dark.set(val === 'dark')
}, { immediate: true })

const deferredPrompt = ref(null)
const showInstall = ref(false)
const isMobile = /android|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i.test(navigator.userAgent)

const pwaUpdateDialog = ref(false)

function handlePwaDialogClose () {
  // Wymuś przeładowanie po zamknięciu dialogu aktualizacji
  window.location.reload()
}

// function reloadPwa () {
//   window.location.reload(true)
// }

onMounted(() => {
  window.addEventListener('pwa-update-available', () => {
    pwaUpdateDialog.value = true
  })

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data && event.data.type === 'pwa-update-available') {
        pwaUpdateDialog.value = true
      }
    })
  }
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    showInstall.value = true
  })
  window.addEventListener('appinstalled', () => {
    showInstall.value = false
  })
})

function installPwa () {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    deferredPrompt.value.userChoice.then(() => {
      deferredPrompt.value = null
      showInstall.value = false
    })
  }
}
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

const isInToolsSection = computed(() => {
  return route.path.startsWith('/tools') || route.path === '/training' || route.path === '/communication'
})

const $q = useQuasar()

const pushEnabled = ref(false)
const pushDialog = ref(false)
// Dodaj reactive do śledzenia permission
const pushPermission = ref(typeof Notification !== 'undefined' ? Notification.permission : 'default')

// Przypomnienie o powiadomieniach po kilku dniach (np. 5 dni)
const PUSH_REMIND_KEY = 'push-remind-date-v1'
const PUSH_DENIED_KEY = 'push-denied-v1'
const REMIND_AFTER_DAYS = 5

function shouldRemindPush () {
  const denied = localStorage.getItem(PUSH_DENIED_KEY)
  if (!denied) return false
  const last = parseInt(localStorage.getItem(PUSH_REMIND_KEY) || '0', 10)
  const now = Date.now()
  return (now - last) > REMIND_AFTER_DAYS * 24 * 60 * 60 * 1000
}

onMounted(async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.getSubscription()
      pushEnabled.value = !!sub
    } catch (e) {
      pushEnabled.value = false
    }
  }
  pushPermission.value = typeof Notification !== 'undefined' ? Notification.permission : 'default'
  // Przypomnienie o powiadomieniach push po kilku dniach od odmowy
  if (!pushEnabled.value && shouldRemindPush()) {
    pushDialog.value = true
  }
})

async function unsubscribePushNotifications () {
  pushDialog.value = false
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.getSubscription()
      if (sub) {
        await sub.unsubscribe()
        setTimeout(checkPushSubscription, 300)
        $q.notify({ type: 'info', message: 'Subskrypcja powiadomień push została wyłączona.' })
        fetch('https://kitabag.smallhost.pl/api/push/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'push-unsubscribed', date: new Date().toISOString() })
        }).catch(() => {})
      } else {
        $q.notify({ type: 'info', message: 'Nie znaleziono aktywnej subskrypcji.' })
      }
    } catch (e) {
      $q.notify({ type: 'negative', message: 'Błąd podczas wyłączania subskrypcji.' })
    }
  }
}

async function enablePushNotifications () {
  pushDialog.value = false
  // Log analityczny: otwarcie dialogu
  fetch('https://kitabag.smallhost.pl/api/push/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: 'push-dialog-open', date: new Date().toISOString() })
  }).catch(() => {})
  console.log('[PWA] enablePushNotifications start')
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.error('[PWA] Brak wsparcia dla serviceWorker/PushManager')
    $q.notify({ type: 'negative', message: 'Twoja przeglądarka nie obsługuje powiadomień push (brak wsparcia Service Worker/PushManager).' })
    // Log analityczny: brak wsparcia
    fetch('https://kitabag.smallhost.pl/api/push/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'push-no-support', date: new Date().toISOString() })
    }).catch(() => {})
    return
  }
  try {
    if (typeof Notification === 'undefined') {
      $q.notify({ type: 'negative', message: 'Twoja przeglądarka nie obsługuje powiadomień push (brak wsparcia Notification API).' })
      return
    }
    const permission = await Notification.requestPermission()
    pushPermission.value = permission
    console.log('[PWA] Notification permission:', permission)
    if (permission !== 'granted') {
      $q.notify({ type: 'warning', message: 'Brak zgody na powiadomienia. Użytkownik odrzucił prośbę o powiadomienia.' })
      // Zapisz datę i status odmowy do localStorage
      localStorage.setItem(PUSH_DENIED_KEY, '1')
      localStorage.setItem(PUSH_REMIND_KEY, Date.now().toString())
      // Log analityczny: odmowa
      fetch('https://kitabag.smallhost.pl/api/push/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'push-denied', date: new Date().toISOString() })
      }).catch(() => {})
      return
    }
    // Jeśli zgoda, usuń info o odmowie
    localStorage.removeItem(PUSH_DENIED_KEY)
    localStorage.removeItem(PUSH_REMIND_KEY)
    let reg
    try {
      reg = await navigator.serviceWorker.ready
    } catch (err) {
      $q.notify({ type: 'negative', message: 'Błąd: Service Worker nie jest gotowy.' })
      throw err
    }
    console.log('[PWA] serviceWorker ready:', reg)
    let vapidRes, publicKey
    try {
      vapidRes = await fetch('https://kitabag.smallhost.pl/api/push/vapidPublicKey')
      if (!vapidRes.ok) throw new Error('Błąd pobierania klucza VAPID: ' + vapidRes.status)
      ;({ publicKey } = await vapidRes.json())
    } catch (err) {
      $q.notify({ type: 'negative', message: 'Błąd pobierania klucza VAPID z backendu.' })
      throw err
    }
    console.log('[PWA] VAPID publicKey:', publicKey)
    let sub
    try {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      })
    } catch (err) {
      $q.notify({ type: 'negative', message: 'Błąd subskrypcji pushManager. Użytkownik mógł już być subskrybowany lub odrzucił prośbę.' })
      throw err
    }
    console.log('[PWA] pushManager.subscribe result:', sub)
    let resp
    try {
      resp = await fetch('https://kitabag.smallhost.pl/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub)
      })
      if (!resp.ok) throw new Error('Błąd backendu: ' + resp.status)
    } catch (err) {
      $q.notify({ type: 'negative', message: 'Błąd rejestracji subskrypcji w backendzie.' })
      throw err
    }
    console.log('[PWA] backend subscribe response:', resp)
    pushEnabled.value = true
    $q.notify({ type: 'positive', message: 'Powiadomienia push zostały włączone!' })
    // Log analityczny: sukces
    fetch('https://kitabag.smallhost.pl/api/push/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'push-subscribed', date: new Date().toISOString() })
    }).catch(() => {})
  } catch (e) {
    console.error('[PWA] Błąd rejestracji powiadomień:', e)
    // $q.notify już wywołane wyżej dla każdego przypadku
    fetch('https://kitabag.smallhost.pl/api/push/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'push-error', error: e?.message || e, date: new Date().toISOString() })
    }).catch(() => {})
  }
}

async function checkPushSubscription () {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.getSubscription()
      pushEnabled.value = !!sub
    } catch (e) {
      pushEnabled.value = false
    }
  }
}

function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
</script>

<style scoped>
/* Overlay for sidebar logo in dark mode */
.sidebar-logo-avatar {
  position: relative;
}
.sidebar-dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(60, 60, 60, 0.72);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
}
.sidebar-overlay-logo {
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
  opacity: 0.92;
}
.sidebar-overlay-label {
  color: #f2f2f2;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 8px #222a;
}
:root {
  --active-menu-bg: #4A5D31;
}

.bg-military-active {
  background-color: var(--active-menu-bg, #4A5D31) !important;
}
/* Dashboard Modern Theme */
.dashboard-bg {
  background: var(--military-light, #faf6f6);
  min-height: 100vh;
}

/* Card/Tile universal style for dashboard and all pages */
.dashboard-card, .q-card, .section-card, .result-card, .modern-content-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 1.5px solid #e0e0e0;
  transition: box-shadow 0.2s, border 0.2s;
}
body.body--dark .dashboard-card, body.body--dark .q-card, body.body--dark .section-card, body.body--dark .result-card, body.body--dark .modern-content-card {
  background: #232526 !important;
  border: 1.5px solid #444 !important;
  box-shadow: 0 2px 12px rgba(0,0,0,0.25);
}
body.body--dark .dashboard-card .q-card__section .q-card__title,
body.body--dark .dashboard-card .section-title,
body.body--dark .dashboard-card .q-card__title,
body.body--dark .section-card .section-title,
body.body--dark .q-card__title,
body.body--dark .section-title,
body.body--dark .q-card__section .q-card__title {
  color: #f2f2f2 !important;
}
body.body--dark .dashboard-card,
body.body--dark .q-card,
body.body--dark .section-card,
body.body--dark .result-card,
body.body--dark .modern-content-card {
  background: #202124 !important;
  border: 2px solid #444 !important;
}
/* Add a subtle hover for interactivity */
.dashboard-card:hover, .q-card:hover, .section-card:hover, .result-card:hover, .modern-content-card:hover {
  box-shadow: 0 4px 18px rgba(0,0,0,0.13);
  border-color: #bdbdbd;
}
body.body--dark .dashboard-card:hover, body.body--dark .q-card:hover, body.body--dark .section-card:hover, body.body--dark .result-card:hover, body.body--dark .modern-content-card:hover {
  box-shadow: 0 4px 18px rgba(0,0,0,0.32);
  border-color: #888;
}
.dashboard-header {
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.dashboard-toolbar {
  min-height: 64px;
  background: none;
}
.dashboard-title {
  font-size: 1.25rem;
  letter-spacing: 0.01em;
}
.dashboard-version {
  color: #fff;
  font-size: 0.9rem;
  margin-left: 1.5rem;
  opacity: 0.7;
}
/* .dashboard-drawer {
  border-right: 1px solid #e0e0e0;
  background: var(--military-light, #ad9a9a);
} */
.dashboard-drawer-header {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  color: var(--military-secondary, #4A5D31);
}
.dashboard-content-wrapper {
  padding: 24px 0 0 0;
  min-height: 100vh;
}

body.body--dark .dashboard-content-wrapper {
  background: rgb(24, 26, 27) !important;
}

.text-military-secondary {
  color: var(--military-secondary, #4A5D31) !important;
}
.logo-section {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: auto;
}
/* Always show logo, responsive size */
.wot-logo-drawer {
  width: 120px;
  height: 120px;
  object-fit: contain;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 8px;
}
.wot-logo-drawer:hover {
  transform: scale(1.03);
}
body.body--dark .wot-logo-drawer {
  background: #f7f8fa;
  border-color: rgba(232, 234, 237, 0.12);
}
@media (min-width: 600px) {
  .wot-logo-drawer {
    width: 160px;
    height: 160px;
  }
}
:root {
  --military-primary: #2D3E2F;
  --military-secondary: #4A5D31;
  --military-accent: #556B2F;
  --military-green: #4A5D31;
  --military-brown: #8B4513;
  --military-dark: #1A1A1A;
  --military-light: #F5F5F5;
}
/* --- GLOBAL TILE/CARD CONTRAST FOR ALL THEMES --- */
.q-card, .section-card, .modern-content-card, .result-card {
  transition: background 0.2s, color 0.2s, border 0.2s;
}

body:not(.body--dark):not(.theme-tactical) .q-card,
body:not(.body--dark):not(.theme-tactical) .section-card,
body:not(.body--dark):not(.theme-tactical) .modern-content-card,
body:not(.body--dark):not(.theme-tactical) .result-card {
  background: #fff !important;
  border: 1.5px solid #e0e0e0 !important;
  color: #232526 !important;
}

body.body--dark .q-card,
body.body--dark .section-card,
body.body--dark .modern-content-card,
body.body--dark .result-card {
  background: #232526 !important;
  border: 2px solid #444 !important;
  color: #f2f2f2 !important;
}

body.body--dark .q-page,
body.body--dark .dashboard-bg {
  background: #181a1b !important;
}

.theme-tactical .q-card,
.theme-tactical .section-card,
.theme-tactical .modern-content-card,
.theme-tactical .result-card {
  background: #111 !important;
  border: 2px solid #c62828 !important;
  color: #c62828 !important;
}

.q-card__title, .section-title, .modern-content-card .q-card__title {
  font-weight: 700;
  font-size: 1.2rem;
}
body.body--dark .q-card__title,
body.body--dark .section-title,
body.body--dark .modern-content-card .q-card__title {
  color: #f2f2f2 !important;
}
.theme-tactical .q-card__title,
.theme-tactical .section-title,
.theme-tactical .modern-content-card .q-card__title {
  color: #c62828 !important;
}
/* Tactical dark mode: maska na logo w menu */
.logo-mask-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 22px;
}
.logo-dark-mask {
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  background: rgba(20,20,20,0.18);
  border-radius: 16px;
  pointer-events: none;
  z-index: 2;
}
.theme-tactical .text-tactical-red {
  color: #ff5252 !important;
}

/* --- 2026 UI refresh --- */
.dashboard-header {
  position: sticky;
  top: 0;
  z-index: 2000;
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

body.body--dark .dashboard-header {
  background: rgba(48, 49, 52, 0.92) !important;
  border-bottom-color: rgba(232, 234, 237, 0.12);
}

.dashboard-toolbar {
  min-height: 72px;
  gap: 8px;
}

.dashboard-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: inherit;
}

.dashboard-brand__mark {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.dashboard-brand__copy {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.dashboard-brand__title {
  font-size: 1.02rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.dashboard-brand__subtitle {
  font-size: 0.75rem;
  opacity: 0.8;
}

.dashboard-toolbar-btn {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  color: inherit !important;
}

.dashboard-toolbar-btn :deep(.q-icon),
.dashboard-toolbar-btn :deep(.q-btn__content) {
  color: inherit !important;
}

body.body--dark .dashboard-toolbar-btn {
  background: rgba(255, 255, 255, 0.06);
  color: var(--app-text, #e8eaed) !important;
}

.dashboard-version {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-weight: 600;
  letter-spacing: 0.02em;
}

body.body--dark .dashboard-version {
  background: rgba(255, 255, 255, 0.06);
  color: var(--app-text-muted, #9aa0a6) !important;
}

.dashboard-drawer {
  background: var(--app-surface, #fff) !important;
  color: var(--app-text, #18212f) !important;
  border-right: 1px solid var(--app-border, rgba(15, 23, 42, 0.08));
}

.dashboard-drawer .q-list {
  padding: 8px 6px 12px;
}

.dashboard-drawer .q-item {
  min-height: 58px;
  padding: 10px 12px;
  border-radius: 14px;
  background: transparent !important;
  transition: transform 0.16s ease, background 0.16s ease, box-shadow 0.16s ease;
}

.dashboard-drawer .q-item:hover {
  background: var(--app-surface-2, #f3f6fa) !important;
  transform: translateX(2px);
}

.dashboard-drawer .q-item__label,
.dashboard-drawer .q-item__section {
  color: var(--app-text, #18212f) !important;
}

.dashboard-drawer .q-item__label--caption,
.dashboard-drawer .text-caption {
  color: var(--app-text-muted, #617080) !important;
}

.dashboard-drawer .q-item .q-icon {
  color: var(--app-text-muted, #617080) !important;
}

.dashboard-drawer .q-item.active-menu,
.dashboard-drawer .q-item.bg-military-active {
  background: color-mix(in srgb, var(--app-primary, #2f5d50) 16%, transparent) !important;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--app-primary, #2f5d50) 20%, transparent);
}

.dashboard-drawer .q-item.active-menu .q-item__label,
.dashboard-drawer .q-item.bg-military-active .q-item__label,
.dashboard-drawer .q-item.active-menu .q-icon,
.dashboard-drawer .q-item.bg-military-active .q-icon {
  color: var(--app-primary-strong, #1f453b) !important;
}

body.body--dark .dashboard-drawer .q-item.active-menu,
body.body--dark .dashboard-drawer .q-item.bg-military-active {
  background: color-mix(in srgb, var(--app-accent, #a8c7fa) 18%, transparent) !important;
  box-shadow: inset 0 0 0 1px rgba(168, 199, 250, 0.16);
}

body.body--dark .dashboard-drawer .q-item.active-menu .q-item__label,
body.body--dark .dashboard-drawer .q-item.bg-military-active .q-item__label,
body.body--dark .dashboard-drawer .q-item.active-menu .q-icon,
body.body--dark .dashboard-drawer .q-item.bg-military-active .q-icon {
  color: var(--app-text, #e8eaed) !important;
}

.logo-section {
  border-top: 1px solid var(--app-border, rgba(15, 23, 42, 0.08));
}

@media (max-width: 640px) {
  .dashboard-toolbar {
    min-height: 58px;
    gap: 4px;
    padding-top: 6px;
    padding-bottom: 6px;
  }

  .dashboard-brand {
    gap: 8px;
  }

  .dashboard-brand__mark {
    width: 34px;
    height: 34px;
    border-radius: 11px;
  }

  .dashboard-brand__title {
    font-size: 0.95rem;
  }

  .dashboard-toolbar-btn {
    min-width: 36px;
    min-height: 36px;
    padding: 0;
  }

  .dashboard-brand__subtitle {
    display: none;
  }

  .dashboard-version {
    display: none;
  }
}
</style>
