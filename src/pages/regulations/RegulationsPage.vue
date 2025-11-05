<template>
  <q-page padding>
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">
          <q-icon name="description" class="title-icon" />
          Regulaminy
        </h1>
        <p class="page-subtitle">Dokumenty i przepisy wojskowe</p>
      </div>

      <div class="regulations-grid">
        <div class="regulation-card">
          <q-icon name="shield" class="regulation-icon" />
          <h3>Regulamin Służby Wojskowej</h3>
          <p>Podstawowe przepisy dotyczące służby w Siłach Zbrojnych RP</p>
          <q-btn flat color="primary" label="Wkrótce" />
        </div>

        <div class="regulation-card">
          <q-icon name="security" class="regulation-icon" />
          <h3>Regulamin Musztry</h3>
          <p>Zasady wykonywania ćwiczeń musztry i ceremonii wojskowych</p>
          <q-btn flat color="primary" label="Wkrótce" />
        </div>

        <div class="regulation-card">
          <q-icon name="gavel" class="regulation-icon" />
          <h3>Prawo Wojskowe</h3>
          <p>Podstawowe akty prawne dotyczące służby wojskowej</p>
          <q-btn flat color="primary" label="Wkrótce" />
        </div>

        <div class="regulation-card">
          <q-icon name="local_hospital" class="regulation-icon" />
          <h3>Regulamin Sanitarny</h3>
          <p>Przepisy dotyczące opieki medycznej i higieny w wojsku</p>
          <q-btn flat color="primary" label="Wkrótce" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegulationsPage'
})
</script>

<style lang="scss" scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
  border-radius: 12px;
  color: white;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.title-icon {
  font-size: 2.5rem;
}

.page-subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.regulations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.regulation-card {
  background: var(--q-color-surface);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #e0e0e0;
}

.regulation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.regulation-icon {
  font-size: 3rem;
  color: var(--q-primary);
  margin-bottom: 1rem;
}

.regulation-card h3 {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--q-text-primary);
}

.regulation-card p {
  font-size: 1rem;
  color: var(--q-text-secondary);
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

/* Dark mode support */
body.body--dark {
  .regulation-card {
    background: var(--q-dark);
    border-color: #444;
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }

  .title-icon {
    font-size: 2rem;
  }

  .regulations-grid {
    grid-template-columns: 1fr;
  }

  .regulation-card {
    padding: 1.5rem;
  }

  .regulation-icon {
    font-size: 2.5rem;
  }
}
</style>
