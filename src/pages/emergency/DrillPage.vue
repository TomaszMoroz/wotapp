<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <!-- Header -->
      <div class="header-section q-mb-lg">
        <q-btn
          flat
          icon="arrow_back"
          label="Powrót"
          @click="goBack"
          class="text-white q-mb-md"
        />
        <div class="hero-section q-pa-lg rounded-borders">
          <div class="text-h4 text-weight-bold text-primary q-mb-sm">Musztra</div>
          <div class="text-body1 text-grey-6">Regulamin musztry wojskowej</div>
        </div>
      </div>

      <!-- PDF Viewer -->
      <q-card class="content-card">
        <q-card-section class="q-pa-md">
          <div class="pdf-controls q-mb-md">
            <div class="row items-center justify-between">
              <div class="text-h6">Regulamin Musztry</div>
              <div class="q-gutter-sm">
                <q-btn
                  icon="download"
                  label="Pobierz PDF"
                  color="primary"
                  @click="downloadPDF"
                  unelevated
                />
                <q-btn
                  icon="fullscreen"
                  label="Pełny ekran"
                  color="secondary"
                  @click="toggleFullscreen"
                  unelevated
                />
              </div>
            </div>
          </div>

          <!-- PDF Container -->
          <div class="pdf-container" ref="pdfContainer">
            <iframe
              ref="pdfFrame"
              :src="pdfUrl"
              class="pdf-iframe"
              frameborder="0"
              allowfullscreen
            />
          </div>

          <!-- Fallback dla przeglądarek bez wsparcia PDF -->
          <div v-if="!pdfSupported" class="pdf-fallback q-pa-lg text-center">
            <q-icon name="picture_as_pdf" size="4rem" color="grey-6" class="q-mb-md" />
            <div class="text-h6 q-mb-sm">Nie można wyświetlić PDF</div>
            <div class="text-body2 text-grey-6 q-mb-md">
              Twoja przeglądarka nie obsługuje wyświetlania plików PDF.
            </div>
            <q-btn
              icon="download"
              label="Pobierz plik PDF"
              color="primary"
              @click="downloadPDF"
              unelevated
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'DrillPage'
})

const router = useRouter()
const pdfContainer = ref(null)
const pdfFrame = ref(null)
const pdfSupported = ref(true)

// Import PDF z assets
import musztraPdf from 'assets/musztra.pdf'
const pdfUrl = musztraPdf

const goBack = () => {
  router.push('/emergency')
}

const downloadPDF = () => {
  const link = document.createElement('a')
  link.href = pdfUrl
  link.download = 'musztra.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const toggleFullscreen = () => {
  if (pdfContainer.value) {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      pdfContainer.value.requestFullscreen()
    }
  }
}

onMounted(() => {
  // Sprawdź wsparcie dla PDF
  if (!window.navigator.pdfViewerEnabled) {
    pdfSupported.value = false
  }

  // Obsługa błędów ładowania iframe
  if (pdfFrame.value) {
    pdfFrame.value.onerror = () => {
      pdfSupported.value = false
    }
  }
})
</script>

<style scoped>
.page-background {
  background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  background: white;
  border: 1px solid rgba(139, 69, 19, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.content-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-height: 600px;
}

.pdf-controls {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
}

.pdf-container {
  width: 100%;
  height: 80vh;
  min-height: 600px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
}

.pdf-fallback {
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
}

/* Fullscreen styles */
.pdf-container:fullscreen {
  background: white;
  padding: 20px;
}

.pdf-container:fullscreen .pdf-iframe {
  border-radius: 0;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }

  .pdf-controls .row {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .pdf-controls .q-gutter-sm {
    width: 100%;
    display: flex;
    gap: 0.5rem;
  }

  .pdf-controls .q-btn {
    flex: 1;
  }

  .pdf-container {
    height: 70vh;
    min-height: 400px;
  }
}

@media (max-width: 480px) {
  .pdf-controls .q-gutter-sm {
    flex-direction: column;
  }

  .pdf-controls .q-btn {
    width: 100%;
  }
}
</style>
