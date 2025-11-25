<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav color="black"/>
      <div class="page-container">
        <div class="page-header">
          <h1 class="page-title">
            Stopnie wojskowe w Polsce
          </h1>
          <p class="page-subtitle">Wojska lądowe i marynarka</p>
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
    </div>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
// Korpus szeregowych
import szeregowy from 'assets/ranks/szeregowy.jpg'
import stSzer from 'assets/ranks/st_szer.jpg'
import stSzerSpec from 'assets/ranks/st_szer_spec.jpg'
// Podoficerowie młodsi
import kapral from 'assets/ranks/kapral.jpg'
import stKapral from 'assets/ranks/st_kapral.jpg'
import plutonowy from 'assets/ranks/plutonowy.jpg'
// Podoficerowie starsi
import sierzant from 'assets/ranks/sierzant.jpg'
import stSierz from 'assets/ranks/st_sierz.jpg'
import mlChor from 'assets/ranks/ml_chor.jpg'
// Oficerowie młodsi
import podporucznik from 'assets/ranks/podporucznik.jpg'
import porucznik from 'assets/ranks/porucznik.jpg'
import kapitan from 'assets/ranks/kapitan.jpg'
// Oficerowie starsi
import major from 'assets/ranks/major.jpg'
import podpulkownik from 'assets/ranks/podpulkownik.jpg'
import pulkownik from 'assets/ranks/pulkownik.jpg'
// Generałowie
import genBrygady from 'assets/ranks/gen_brygady.jpg'
import genDywizji from 'assets/ranks/gen_dywizji.jpg'
import genBroni from 'assets/ranks/gen_broni.jpg'
import general from 'assets/ranks/general.jpg'

const sections = [
  {
    title: 'KORPUS SZEREGOWYCH',
    groups: [
      { title: 'Szeregowy', image: szeregowy },
      { title: 'Starszy szeregowy', image: stSzer },
      { title: 'Starszy szeregowy specjalista', image: stSzerSpec }
    ]
  },
  {
    title: 'KORPUS PODOFICERÓW',
    groups: [
      { title: 'Kapral', image: kapral },
      { title: 'Starszy kapral', image: stKapral },
      { title: 'Plutonowy', image: plutonowy },
      { title: 'Sierżant', image: sierzant },
      { title: 'Starszy sierżant', image: stSierz },
      { title: 'Młodszy chorąży', image: mlChor }
    ]
  },
  {
    title: 'KORPUS OFICERÓW',
    groups: [
      { title: 'Podporucznik', image: podporucznik },
      { title: 'Porucznik', image: porucznik },
      { title: 'Kapitan', image: kapitan },
      { title: 'Major', image: major },
      { title: 'Podpułkownik', image: podpulkownik },
      { title: 'Pułkownik', image: pulkownik }
    ]
  },
  {
    title: 'GENERAŁOWIE',
    groups: [
      { title: 'Generał brygady', image: genBrygady },
      { title: 'Generał dywizji', image: genDywizji },
      { title: 'Generał broni', image: genBroni },
      { title: 'Generał', image: general }
    ]
  }
]
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
  background: #2b2d2b;
  border: 1px solid #384c38;
  color: #f5f7fa;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(44,62,47,0.13);
}
.page-header .text-h3,
.page-header .text-h4,
.page-header .text-h5,
.page-header .text-h6 {
  color: #f5f7fa !important;
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
