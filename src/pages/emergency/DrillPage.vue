<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <div class="hero-section q-pa-lg q-mb-lg">
        <div class="row items-center">
          <div class="col">
            <div class="text-h4 text-weight-bold text-brown-8 q-mb-sm">
              <q-icon name="military_tech" class="q-mr-md" />
              Musztra Wojskowa
            </div>
            <div class="text-subtitle1 text-grey-7">
              Regulamin musztry dla Wojsk Obrony Terytorialnej
            </div>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              round
              icon="arrow_back"
              color="brown-6"
              size="lg"
              @click="goBack"
            />
          </div>
        </div>
      </div>

      <div class="content-card q-pa-lg">
        <div class="pdf-controls q-mb-md">
          <q-btn
            color="brown-6"
            icon="download"
            label="Pobierz PDF"
            :href="pdfUrl"
            target="_blank"
            download="musztra.pdf"
            class="q-mr-md"
          />
          <q-btn
            color="brown-6"
            icon="open_in_new"
            label="Otwórz w nowej karcie"
            @click="openInNewTab"
          />
        </div>

        <div class="pdf-container">
          <iframe
            v-if="pdfBlobUrl"
            :src="pdfBlobUrl"
            class="pdf-iframe"
            frameborder="0"
          />
          <div v-else class="loading-container q-pa-xl text-center">
            <q-spinner-dots size="50px" color="brown-6" />
            <div class="q-mt-md text-grey-7">Ładowanie PDF...</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

defineComponent({
  name: 'DrillPage'
})

const router = useRouter()
const pdfUrl = '/musztra.pdf'
const pdfBlobUrl = ref(null)

const loadPDF = async () => {
  try {
    const response = await fetch(pdfUrl)
    if (!response.ok) {
      throw new Error('Nie można załadować PDF')
    }
    const blob = await response.blob()
    pdfBlobUrl.value = URL.createObjectURL(blob)
  } catch (error) {
    console.error('Błąd ładowania PDF:', error)
  }
}

const goBack = () => {
  router.push('/emergency')
}

const openInNewTab = () => {
  window.open(pdfUrl, '_blank')
}

onMounted(() => {
  loadPDF()
})

onUnmounted(() => {
  if (pdfBlobUrl.value) {
    URL.revokeObjectURL(pdfBlobUrl.value)
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
  padding-bottom: 16px;
}

.pdf-container {
  width: 100%;
  height: 800px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
}

@media (max-width: 768px) {
  .pdf-container {
    height: 600px;
  }

  .hero-section .text-h4 {
    font-size: 1.5rem;
  }
}
</style>
