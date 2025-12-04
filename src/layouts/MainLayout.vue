<template>
  <q-layout view="lHh Lpr lFf" class="dashboard-bg">
    <q-dialog v-model="pwaUpdateDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="system_update" color="primary" size="md" class="q-mr-md" />
          <div class="text-h6">Dostępna jest nowa wersja aplikacji!</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="ZAKTUALIZUJ" @click="reloadPwa" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-header elevated class="bg-military-primary dashboard-header">
          <q-dialog v-model="pushDialog" persistent>
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
          </q-dialog>
      <q-toolbar class="q-px-md dashboard-toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-mr-sm text-white"
        />
        <q-toolbar-title class="text-weight-bold text-white dashboard-title">
          <div class="row items-center no-wrap">
            <span class="q-ml-sm">Kit Bag App</span>
          </div>
        </q-toolbar-title>
        <span class="dashboard-version">v1.1.2</span>
        <q-btn
          v-if="showInstall && !isMobile && false"
          flat
          dense
          icon="download"
          label="Zainstaluj aplikację"
          class="q-ml-md text-white"
          @click="installPwa"
        />
        <q-btn
          flat
          dense
          icon="notifications"
          aria-label="Włącz powiadomienia push"
          @click="pushDialog = true"
          class="q-ml-md text-white"
        />
      </q-toolbar>
      <!-- Usunięto komunikaty z górnego paska -->
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="dashboard-drawer bg-military-light"
      :width="280"
    >

      <q-list class="q-mt-sm">

        <!-- Dashboard - zawsze widoczny -->
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
            <q-item-label caption :class="isActiveRoute('/') && 'text-white'">Strona główna</q-item-label>
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
          <img :src="logo721" alt="WOT 721 Logo" class="wot-logo-drawer" />
          <div class="text-caption text-grey-6 q-mt-sm">Aplikacja wewnętrzna</div>
          <div class="text-caption text-grey-7 q-mt-sm">Kontakt: Tomasz Mo83</div>
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

    <q-page-container>
      <div class="dashboard-content-wrapper">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import logo721 from 'assets/721.jpeg'

const deferredPrompt = ref(null)
const showInstall = ref(false)
const isMobile = /android|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i.test(navigator.userAgent)

const pwaUpdateDialog = ref(false)

function reloadPwa () {
  window.location.reload(true)
}

onMounted(() => {
  window.addEventListener('pwa-update-available', () => {
    pwaUpdateDialog.value = true
  })
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

async function enablePushNotifications () {
  pushDialog.value = false
  console.log('[PWA] enablePushNotifications start')
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.error('[PWA] Brak wsparcia dla serviceWorker/PushManager')
    $q.notify({ type: 'negative', message: 'Twoja przeglądarka nie obsługuje powiadomień push.' })
    return
  }
  try {
    const permission = await Notification.requestPermission()
    console.log('[PWA] Notification permission:', permission)
    if (permission !== 'granted') {
      $q.notify({ type: 'warning', message: 'Brak zgody na powiadomienia.' })
      return
    }
    const reg = await navigator.serviceWorker.ready
    console.log('[PWA] serviceWorker ready:', reg)
    const vapidRes = await fetch('https://kitabag.smallhost.pl/api/push/vapidPublicKey')
    const { publicKey } = await vapidRes.json()
    console.log('[PWA] VAPID publicKey:', publicKey)
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    })
    console.log('[PWA] pushManager.subscribe result:', sub)
    const resp = await fetch('https://kitabag.smallhost.pl/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub)
    })
    console.log('[PWA] backend subscribe response:', resp)
    pushEnabled.value = true
    $q.notify({ type: 'positive', message: 'Powiadomienia push zostały włączone!' })
  } catch (e) {
    console.error('[PWA] Błąd rejestracji powiadomień:', e)
    $q.notify({ type: 'negative', message: 'Błąd rejestracji powiadomień: ' + (e?.message || e) })
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
:root {
  --active-menu-bg: #4A5D31;
}

.bg-military-active {
  background-color: var(--active-menu-bg, #4A5D31) !important;
}
/* Dashboard Modern Theme */
.dashboard-bg {
  background: var(--military-light, #F5F5F5);
  min-height: 100vh;
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
.dashboard-drawer {
  border-right: 1px solid #e0e0e0;
  background: var(--military-light, #F5F5F5);
}
.dashboard-drawer-header {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  color: var(--military-secondary, #4A5D31);
}
.dashboard-content-wrapper {
  padding: 24px 0 0 0;
  min-height: 100vh;
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
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 2px solid #2D3E2F;
  transition: transform 0.2s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.wot-logo-drawer:hover {
  transform: scale(1.05);
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
</style>
