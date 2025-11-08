<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav color="black"/>

      <!-- Header with navigation -->
      <div class="text-h4 q-mb-md">Wyposażenie</div>

      <!-- Breadcrumb navigation -->
      <div v-if="currentView !== 'weapons'" class="q-mb-md">
        <q-btn
          flat
          icon="arrow_back"
          label="Powrót"
          @click="goBack"
          color="primary"
        />
      </div>

      <!-- Main weapons view -->
      <div v-if="currentView === 'weapons'" class="weapons-grid">
        <q-card
          v-for="weapon in weapons"
          :key="weapon.id"
          class="weapon-card cursor-pointer"
          @click="showWeaponDetails(weapon.id)"
        >
          <q-card-section class="text-center">
            <div class="text-h6 q-mt-md">{{ weapon.name }}</div>
            <div class="text-caption text-grey">{{ weapon.category }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Weapon details view -->
      <div v-if="currentView === 'details'" class="weapon-details">
        <q-card>
          <q-card-section>
            <div class="row q-gutter-md">
              <div class="col-12 col-md-8">
                <div class="text-h5 q-mb-md">{{ selectedWeapon.name }}</div>
                <div class="text-subtitle1 text-grey q-mb-md">{{ selectedWeapon.fullName }}</div>
              </div>
            </div>

            <!-- Technical specifications - responsive layout -->
            <div class="specs-container">
              <!-- Desktop table view -->
              <q-table
                :rows="selectedWeapon.specs"
                :columns="specColumns"
                row-key="parameter"
                flat
                bordered
                separator="cell"
                no-data-label="Brak danych technicznych"
                :rows-per-page-options="[0]"
                rows-per-page="0"
                class="gt-sm"
              >
                <template v-slot:body-cell-parameter="props">
                  <q-td :props="props" class="text-weight-medium">
                    {{ props.value }}
                  </q-td>
                </template>
                <template v-slot:body-cell-value="props">
                  <q-td :props="props">
                    {{ props.value }}
                  </q-td>
                </template>
              </q-table>

              <!-- Mobile card view -->
              <div class="lt-md">
                <q-card
                  v-for="spec in selectedWeapon.specs"
                  :key="spec.parameter"
                  class="spec-card q-mb-sm"
                  flat
                  bordered
                >
                  <q-card-section class="row items-center no-wrap">
                    <div class="col">
                      <div class="text-weight-medium text-primary q-mb-xs">
                        {{ spec.parameter }}
                      </div>
                      <div class="text-body2">
                        {{ spec.value }}
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
                        <img
                v-if="selectedWeapon.image"
                :src="selectedWeapon.image"
                :alt="selectedWeapon.name"
                class="weapon-detail-image"
              />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import visImg from 'assets/vis.png'
import BackNav from 'components/BackNav.vue'

defineOptions({
  name: 'EquipmentPage'
})

// Navigation state
const currentView = ref('weapons')
const selectedWeaponId = ref(null)

// Table columns for technical specifications
const specColumns = [
  {
    name: 'parameter',
    required: true,
    label: 'Parametr',
    align: 'left',
    field: 'parameter',
    sortable: false
  },
  {
    name: 'value',
    required: true,
    label: 'Wartość',
    align: 'left',
    field: 'value',
    sortable: false
  }
]

// Weapons data
const weapons = [
  {
    id: 'vis100',
    name: 'VIS 100',
    fullName: 'Pistolet VIS 100',
    category: 'Broń krótka',
    icon: 'gps_fixed',
    image: visImg,
    color: 'primary',
    specs: [
      { parameter: 'Nabój', value: '9 x 19 mm' },
      { parameter: 'Zasada działania', value: 'Krótki odrzut lufy, ryglowanej przez przekoszenie lufy' },
      { parameter: 'System spustu', value: 'Single Action / Double Action' },
      { parameter: 'Siła spustu', value: 'SA/DA 25N/50N' },
      { parameter: 'Droga spustu', value: 'ok. 14 mm' },
      { parameter: 'Pojemność magazynka', value: '15 nabojów' },
      { parameter: 'Wysokość (bez magazynka)', value: '136 mm' },
      { parameter: 'Wysokość (z magazynkiem)', value: '142 mm' },
      { parameter: 'Długość', value: '197 mm' },
      { parameter: 'Szerokość', value: '32 mm' },
      { parameter: 'Długość lufy', value: '110 mm' },
      { parameter: 'Skok gwintu lufy', value: '250 mm' },
      { parameter: 'Długość linii celowania', value: '156 mm' },
      { parameter: 'Masa pistoletu (bez magazynka)', value: '695 g' },
      { parameter: 'Masa magazynka pustego', value: '90 g' },
      { parameter: 'Prędkość wylotowa pocisku V₀', value: '~360 m/s' },
      { parameter: 'Energia wylotowa pocisku E₀', value: '~518 J' },
      { parameter: 'Zasięg zagrożenia', value: 'ok 2000 m' },
      { parameter: 'Taktyczny zasięg rażenia', value: 'ok 150 m' },
      { parameter: 'Skupienie na odległości 25 m', value: '≤ 14 cm' },
      { parameter: 'Odl. średniego punktu trafień od pkt. kontrolnego', value: '≤ 5 cm' },
      { parameter: 'Przyrządy celownicze', value: 'otwarte, szczerbinkowe, wyregulowane na 25 m, kontrastowe / trytowe' },
      { parameter: 'Zabezpieczenie', value: 'Automatyczna, wewnętrzna blokada iglicy, sterowana spustem. Zwalniacz kurka. Przerywacz' },
      { parameter: 'Mechanizm spustowo-uderzeniowy', value: 'SA/DA (z kurkiem zewnętrznym)' }
    ]
  },
  {
    id: 'msbs',
    name: 'MSBS GROT',
    fullName: 'Modułowy System Broni Strzeleckiej GROT',
    category: 'Karabin szturmowy',
    icon: 'military_tech',
    color: 'secondary',
    specs: [
      { parameter: 'Amunicja', value: '5.56 x 45 mm NATO' },
      { parameter: 'Prędkość wylotowa', value: 'V0= 890 m/s' },
      { parameter: 'Energia wylotowa', value: '1 600J' },
      { parameter: 'Zasada działania', value: 'odprowadzenie gazów przez boczny otwór w lufie' },
      { parameter: 'Rodzaj ognia', value: 'pojedynczy, ciągły' },
      { parameter: 'Szybkostrzelność teoretyczna', value: '700÷900 strz./min.' },
      { parameter: 'Zasięg', value: '~500 m' },
      { parameter: 'Długość z kolbą wysuniętą (wersja klasyczna)', value: '900 mm' },
      { parameter: 'Długość z kolbą złożoną (wersja klasyczna)', value: '843 mm' },
      { parameter: 'Długość (wersja bezkolbowa)', value: '675 mm' },
      { parameter: 'Długość lufy', value: '406 mm' },
      { parameter: 'Liczba bruzd w lufie', value: '6' },
      { parameter: 'Skok bruzd w lufie', value: '178 mm' },
      { parameter: 'Przyrządy celownicze', value: 'mechaniczne i optoelektroniczne przyłączane do szyny Picatinny' },
      { parameter: 'Masa broni bez magazynka (wersja klasyczna)', value: '3650 g' },
      { parameter: 'Masa broni bez magazynka (wersja bull-pup)', value: '3750 g' },
      { parameter: 'Pojemność magazynka', value: '30, 60 naboi' }
    ]
  },
  {
    id: 'kwbor',
    name: 'KW BOR',
    fullName: 'Karabinek wyborowy BOR',
    category: 'Broń precyzyjna',
    icon: 'my_location',
    color: 'accent',
    specs: [
      { parameter: 'Kaliber', value: '7,62 mm' },
      { parameter: 'Nabój', value: '7,62 × 51 mm NATO' },
      { parameter: 'Magazynek', value: '10 nab., 5 nab.' },
      { parameter: 'Długość całkowita (z urządzeniem wylotowym)', value: '1038 mm' },
      { parameter: 'Długość całkowita (bez urządzenia wylotowego)', value: '980 mm' },
      { parameter: 'Długość lufy', value: '660 mm' },
      { parameter: 'Masa broni (bez celownika optycznego i amunicji)', value: '6,5 kg' },
      { parameter: 'Prędkość początkowa pocisku', value: '870 m/s' },
      { parameter: 'Energia początkowa pocisku', value: '3500 J' },
      { parameter: 'Zasięg skuteczny', value: '1000 – 1600 m' },
      { parameter: 'Siła spustu', value: '9-25 N' }
    ]
  },
  {
    id: 'ukm200p',
    name: 'UKM 200P',
    fullName: 'Uniwersalny Karabin Maszynowy 200P',
    category: 'Karabin maszynowy',
    icon: 'settings',
    color: 'warning',
    specs: [
      { parameter: 'Amunicja', value: '7,62 mm × 51 NATO w taśmie rozsypnej M13' },
      { parameter: 'Długość lufy', value: '540 mm' },
      { parameter: 'Masa', value: '10 kg' },
      { parameter: 'Pojemność magazynka', value: '100/200 szt.' },
      { parameter: 'Szybkostrzelność', value: '700-900 strz./min.' },
      { parameter: 'Przeznaczenie', value: 'Zwalczanie siły żywej, środków ogniowych, sprzętu technicznego' },
      { parameter: 'Warunki użycia', value: 'W każdym terenie i w dowolnych warunkach meteorologicznych, zarówno w dzień jak i w nocy' },
      { parameter: 'Charakterystyka', value: 'Zmodyfikowany uniwersalny karabin maszynowy opracowany w celu poprawy niezawodności, trwałości oraz ergonomii' }
    ]
  },
  {
    id: 'rpg7',
    name: 'RPG-7',
    fullName: 'Ręczny Przeciwpancerny Granatnik',
    category: 'Broń przeciwpancerna',
    icon: 'rocket_launch',
    color: 'negative',
    specs: [
      { parameter: 'Państwo pochodzenia', value: 'ZSRR' },
      { parameter: 'Kaliber wyrzutni', value: '40 mm' },
      { parameter: 'Kaliber głowic granatu', value: '40–105 mm' },
      { parameter: 'Długość całkowita', value: '1000 mm' },
      { parameter: 'Długość lufy', value: '650 mm' },
      { parameter: 'Masa broni (niezaładowany z celownikiem)', value: '6,30 kg' },
      { parameter: 'Prędkość początkowa pocisku', value: '120 m/s' },
      { parameter: 'Prędkość maksymalna pocisku', value: '295 m/s' },
      { parameter: 'Szybkostrzelność praktyczna', value: '4–6 strz./min.' },
      { parameter: 'Zasięg skuteczny', value: '300–500 m' },
      { parameter: 'Zasięg maksymalny', value: '1100 m' },
      { parameter: 'Przebijalność pancerza (PG-7V)', value: '260 mm' },
      { parameter: 'Przebijalność pancerza (PG-7VR)', value: '700 mm + ERA' },
      { parameter: 'Obsługa', value: '2 (celowniczy, amunicyjny)' },
      { parameter: 'Celownik podstawowy', value: 'optyczny PGO-7 (powiększenie 2,7×)' },
      { parameter: 'Celownik zapasowy', value: 'mechaniczny (muszka i szczerbinka)' },
      { parameter: 'Produkcja', value: 'od 1961 roku' },
      { parameter: 'Stabilizacja lotu', value: 'zestaw lotek rozkładanych w locie' },
      { parameter: 'Czas samoniszczenia', value: 'ok. 4,5 sekundy' }
    ]
  },
  {
    id: 'lmp2017',
    name: 'LMP 2017',
    fullName: 'Lekki Moździerz Piechoty 2017',
    category: 'Moździerz',
    icon: 'architecture',
    color: 'info',
    specs: [
      { parameter: 'Kaliber lufy', value: '60mm' },
      { parameter: 'Długość całkowita broni', value: '852 mm' },
      { parameter: 'Długość lufy', value: '650 mm' },
      { parameter: 'Masa moździerza', value: '6500 g ± 200 g' },
      { parameter: 'Zakres kątów podniesienia', value: 'od 45° do 85°' },
      { parameter: 'Minimalna donośność strzelania', value: '120 m' },
      { parameter: 'Maksymalna donośność strzelania', value: '1300 m' },
      { parameter: 'Mechanizm odpalający', value: '4-pozycyjny (obrotowy 360°): S-safe, T-trigger, A-automatic, T-trigger' },
      { parameter: 'Szybkostrzelność praktyczna', value: 'do 10 strz./min.' },
      { parameter: 'Szybkostrzelność teoretyczna', value: 'do 25 strz./min.' },
      { parameter: 'Maksymalna liczba pocisków ogniem ciągłym', value: 'do 40 strz./min.' },
      { parameter: 'Trwałość lufy', value: 'minimum 1500 strzałów' },
      { parameter: 'Typ celownika', value: 'cieczowy grawitacyjny' },
      { parameter: 'Podświetlenie celownika', value: 'czasowe (10s) - światło dzienne i podczerwień' },
      { parameter: 'Obsługa', value: 'dwóch żołnierzy' },
      { parameter: 'Materiały konstrukcji', value: 'płyta oporowa: duralumin, zamek: tytan, lufa: stal' },
      { parameter: 'Amunicja', value: 'kaliber 60,4 mm zgodna z STANAG 4425.2' },
      { parameter: 'Ciśnienie przy strzale', value: '25 MPa' },
      { parameter: 'Przeznaczenie', value: 'głównie dla jednostek Wojsk Obrony Terytorialnej' }
    ]
  },
  {
    id: 'm72ec',
    name: 'M72 EC MK1',
    fullName: 'Granatnik M72 EC MK1',
    category: 'Broń przeciwpancerna',
    icon: 'rocket_launch',
    color: 'deep-orange',
    specs: [
      { parameter: 'Kaliber', value: '66 mm' },
      { parameter: 'Długość rozłożony', value: '980 mm' },
      { parameter: 'Długość złożony', value: '780 mm' },
      { parameter: 'Masa', value: '3,44 kg' },
      { parameter: 'Prędkość pocisku', value: '200 m/s' },
      { parameter: 'Zasięg', value: '20-1200 m' }
    ]
  },
  {
    id: 'granatnikgp',
    name: 'Granatnik GP',
    fullName: 'Granatnik GP',
    category: 'Granatnik',
    icon: 'gps_not_fixed',
    color: 'purple',
    specs: [
      { parameter: 'Amunicja', value: '40 mm x 46SR LV' },
      { parameter: 'Masa', value: '1,5 kg' },
      { parameter: 'Długość', value: '295 mm' },
      { parameter: 'Szerokość (z celownikiem)', value: '92 mm' },
      { parameter: 'Wysokość', value: '142 mm' },
      { parameter: 'Długość lufy', value: '200 mm' },
      { parameter: 'Skok bruzd', value: '1200 mm' },
      { parameter: 'Liczba bruzd', value: '6' },
      { parameter: 'Prędkość początkowa pocisku', value: '78 m/s' },
      { parameter: 'Donośność', value: '350 m' },
      { parameter: 'Szybkostrzelność teoretyczna', value: '5-7 strz./min.' }
    ]
  }
]

// Computed property to get selected weapon
const selectedWeapon = computed(() => {
  return weapons.find(weapon => weapon.id === selectedWeaponId.value)
})

// Navigation methods
const showWeaponDetails = (weaponId) => {
  selectedWeaponId.value = weaponId
  currentView.value = 'details'
}

const goBack = () => {
  if (currentView.value === 'details') {
    currentView.value = 'weapons'
    selectedWeaponId.value = null
  }
}
</script>

<style scoped>
.weapons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.weapon-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  min-height: 180px;
  display: flex;
  align-items: center;
}

.weapon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.weapon-image {
  width: 80px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 10px;
}

.weapon-detail-image {
  width: 300px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 20px;
}

.weapon-details {
  margin-top: 20px;
}

/* Responsive specifications styling */
.specs-container {
  margin-top: 20px;
}

.spec-card {
  border-radius: 8px;
  transition: all 0.2s ease;
}

.spec-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.spec-card .q-card__section {
  padding: 12px 16px;
}

/* Mobile optimizations */
@media (max-width: 600px) {
  .weapons-grid {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .weapon-card {
    min-height: 140px;
  }

  .spec-card {
    margin-bottom: 8px;
  }

  .spec-card .q-card__section {
    padding: 10px 14px;
  }
}
</style>
