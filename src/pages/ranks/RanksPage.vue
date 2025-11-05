<template>
  <q-page padding>
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">
          Stopnie wojskowe w Polsce
        </h1>
        <p class="page-subtitle">Wojska lądowe</p>
      </div>

      <div class="ranks-sections">
        <div class="rank-section" v-for="section in sections" :key="section.title">
          <h2 class="section-title">{{ section.title }}</h2>
          <div class="ranks-grid">
            <div class="rank-card" v-for="group in section.groups" :key="group.title" :class="{ 'generals-card': group.title === 'Generałowie' }">
              <div class="rank-insignia" :class="{ 'generals-insignia': group.title === 'Generałowie' }">
                <img :src="group.image" :alt="group.title" />
              </div>
              <div class="rank-info">
                <h3 class="rank-name">{{ group.title }}</h3>
                <p class="rank-category">{{ group.subtitle }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import szerImg from 'assets/szer.jpg'
import kaprImg from 'assets/kapr.jpg'
import seirImg from 'assets/seir.jpg'
import porImg from 'assets/por.jpg'
import pulkImg from 'assets/pulk.jpg'
import genImg from 'assets/gen.jpg'

export default defineComponent({
  name: 'RanksPage',
  setup () {
    const sections = [
      {
        title: 'KORPUS SZEREGOWYCH',
        groups: [
          {
            title: 'Szeregowi',
            image: szerImg
          }
        ]
      },
      {
        title: 'KORPUS PODOFICERÓW',
        groups: [
          {
            title: 'Podoficerowie młodsi',
            image: kaprImg
          },
          {
            title: 'Podoficerowie starsi',
            image: seirImg
          }
        ]
      },
      {
        title: 'KORPUS OFICERÓW',
        groups: [
          {
            title: 'Oficerowie młodsi',
            image: porImg
          },
          {
            title: 'Oficerowie starsi',
            image: pulkImg
          },
          {
            title: 'Generałowie',
            image: genImg
          }
        ]
      }
    ]

    return { sections }
  }
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
  background: linear-gradient(135deg, #42a5f5 0%, #1976d2 100%);
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

.ranks-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.rank-section {
  background: var(--q-color-surface);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0 0 1.5rem 0;
  color: var(--q-primary);
  text-align: center;
  padding: 0.5rem;
  background: rgba(66, 165, 245, 0.1);
  border-radius: 8px;
  border-left: 4px solid var(--q-primary);
}

.ranks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.rank-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #e0e0e0;
}

.rank-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.rank-insignia {
  width: 250px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.rank-insignia img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Special styling for generals section with rectangular image */
.generals-insignia {
  width: 300px;
  height: 200px;
}

.generals-insignia img {
  object-fit: contain;
}

.generals-card {
  min-width: 500px;
}

.rank-info {
  flex: 1;
}

.rank-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.rank-category {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

/* Dark mode support */
body.body--dark {
  .rank-card {
    background: var(--q-dark);
    border-color: #444;
  }

  .rank-name {
    color: white;
  }

  .rank-category {
    color: #ccc;
  }

  .rank-insignia {
    background: #333;
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

  .ranks-grid {
    grid-template-columns: 1fr;
  }

  .rank-card {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .generals-insignia {
    width: 250px;
    height: 160px;
  }

  .generals-card {
    min-width: auto;
  }

  .rank-insignia {
    width: 180px;
    height: 150px;
  }

  .rank-name {
    font-size: 1rem;
  }

  .rank-category {
    font-size: 0.85rem;
  }

  .section-title {
    font-size: 1.1rem;
  }
}
</style>
