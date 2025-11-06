<template>
  <q-page class="mgrs-page">
    <div class="container q-pa-md">
      <!-- Header -->
      <div class="page-header q-mb-xl">
        <div class="row items-center q-gutter-md">
          <q-btn
            flat
            round
            icon="arrow_back"
            color="primary"
            @click="goBack"
            class="q-mr-md"
          />
          <q-icon name="grid_3x3" size="3rem" color="primary" />
          <div>
            <div class="text-h4 text-weight-bold text-primary">Współrzędne MGRS</div>
            <div class="text-subtitle1 text-grey-7">Military Grid Reference System - NATO</div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="content-section">
        <q-card class="content-card">
          <q-card-section>
            <div class="text-center q-mb-lg">
              <img :src="mgrsImg" alt="MGRS System" class="mgrs-image" />
            </div>

            <div class="article-content">
              <div class="text-h5 q-mb-md">System współrzędnych MGRS</div>

              <h4>Opis systemu:</h4>
              <p>MGRS, czyli Military Grid Reference System, to standard systemu współrzędnych używany przez wojsko (np. NATO) do precyzyjnego określania położenia na mapach. System ten opiera się na siatce prostokątnej, która dzieli Ziemię na strefy i kwadraty, a jego celem jest ułatwienie szybkiej i dokładnej lokalizacji obiektów oraz meldowania pozycji.</p>

              <h4>System siatki:</h4>
              <p>MGRS tworzy ogólnoświatową siatkę opartą na systemach UTM (Universal Transverse Mercator) i UPS (Universal Polar Stereographic).</p>

              <h4>Strefy:</h4>
              <p>Dzieli on świat na 60 stref podłużnych (każda 6° szerokości) i 20 stref poprzecznych (każda 8° wysokości), oznaczanych literami od C do X (z wyłączeniem I i O).</p>

              <h4>Identyfikacja kwadratów:</h4>
              <p>W ramach każdej strefy tworzone są kwadraty o wymiarach 100x100 km, identyfikowane za pomocą dwuliterowych oznaczeń (np. w przykładzie 4Q FJ 1234 6789, FJ to identyfikator kwadratu 100 km).</p>

              <h4>Określanie pozycji:</h4>
              <p>Współrzędna podaje pełny adres, który składa się z identyfikatora strefy (np. 4Q), identyfikatora kwadratu 100 km (np. FJ) oraz współrzędnych liczbowych w metrach (np. 1234 6789), które precyzują położenie w obrębie danego kwadratu.</p>

              <h4>Zastosowanie:</h4>
              <p>Jest używany do lokalizowania obiektów, określania własnej pozycji i wskazywania celów podczas operacji lądowych, a także do precyzyjnego pozycjonowania GPS.</p>

              <h4>Przykład - Warszawa:</h4>
              <ul>
                <li><strong>Pełna współrzędna:</strong> 34U DC 98765 43210</li>
                <li><strong>Strefa:</strong> 34U (strefa UTM dla Polski)</li>
                <li><strong>Kwadrat 100km:</strong> DC</li>
                <li><strong>Pozycja w kwadracie:</strong> 98765 43210 (dokładność 1m)</li>
              </ul>

              <h4>Inne przykłady w Polsce:</h4>
              <ul>
                <li><strong>Kraków:</strong> 34U DA 15678 34567</li>
                <li><strong>Gdańsk:</strong> 34U EB 23456 78901</li>
                <li><strong>Wrocław:</strong> 33U XU 87654 32109</li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Import image from assets
import mgrsImg from '../../assets/mgrs.png'

defineOptions({
  name: 'MgrsPage'
})

const router = useRouter()

const goBack = () => {
  router.push('/topography')
}
</script>

<style scoped>
.mgrs-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(25, 118, 210, 0.1);
}

.content-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.mgrs-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.article-content {
  line-height: 1.6;
  font-size: 1rem;
}

.article-content h3,
.article-content h4,
.article-content h5 {
  color: #1976d2;
  margin-bottom: 1rem;
  font-weight: bold;
}

.article-content h4 {
  color: #424242;
  margin: 1.5rem 0 0.5rem 0;
  font-weight: 600;
}

.article-content ul,
.article-content ol {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.article-content li {
  margin-bottom: 0.25rem;
}

.article-content strong {
  color: #1976d2;
  font-weight: 600;
}

.article-content p {
  margin: 0.5rem 0;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 8px !important;
  }

  .page-header {
    padding: 16px;
    margin-bottom: 16px !important;
  }

  .page-header .row {
    gap: 12px !important;
  }

  .page-header .text-h4 {
    font-size: 1.5rem;
  }

  .article-content {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 4px !important;
  }

  .page-header {
    padding: 12px;
    margin-bottom: 12px !important;
  }

  .page-header .row {
    flex-direction: column;
    text-align: center;
    gap: 8px !important;
  }

  .page-header .text-h4 {
    font-size: 1.25rem;
  }

  .page-header .text-subtitle1 {
    font-size: 0.9rem;
  }

  .article-content {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .article-content h3 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  .article-content h4 {
    font-size: 1rem;
    margin: 1rem 0 0.5rem 0;
  }
}
</style>
