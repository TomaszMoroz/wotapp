<template>
  <q-page class="modern-bg">
    <div class="dashboard-container">
      <BackNav color="black"/>

      <!-- Header with navigation -->
      <div class="page-header q-mb-md">
        <div class="text-h4 text-weight-bold text-dashboard-header">Wyposażenie</div>
      </div>

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
      <div v-if="currentView === 'weapons'" class="dashboard-tiles tiles-grid">
        <q-card
          v-for="weapon in weapons"
          :key="weapon.id"
          class="modern-tile cursor-pointer"
          @click="showWeaponDetails(weapon.id)"
        >
          <q-card-section class="tile-content">
            <div class="tile-label-row">
              <span class="tile-label">{{ weapon.name }}</span>
            </div>
            <q-chip class="tile-desc-chip-big" color="grey-3" text-color="grey-8" dense>{{ weapon.category }}</q-chip>
          </q-card-section>
        </q-card>
      </div>

      <!-- Weapon details view -->
      <div v-if="currentView === 'details'" class="weapon-details dashboard-tiles">
        <q-card class="dashboard-tile q-pa-md">
          <q-card-section>
            <div class="row q-gutter-md">
              <div class="col-12 col-md-8">
                <div class="text-h5 text-weight-bold q-mb-md">{{ selectedWeapon.name }}</div>
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
import ukmImg from 'assets/ukm.png'
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
    id: 'ukm2000p',
    name: 'UKM 2000P',
    fullName: 'Uniwersalny Karabin Maszynowy 200P',
    category: 'Karabin maszynowy',
    icon: 'settings',
    image: ukmImg,
    color: 'warning',
    specs: [
      { parameter: 'Kaliber [mm]', value: '7,62' },
      { parameter: 'Nabój', value: '7,62x51 mm NATO' },
      { parameter: 'Masa broni bez amunicji [kg]', value: '8,4' },
      { parameter: 'Masa lufy [kg]', value: '2,2' },
      { parameter: 'Długość karabinu ze złożoną oporą naramienną [mm]', value: '1182' },
      { parameter: 'Wysokość broni [mm]', value: '213**' },
      { parameter: 'Szerokość broni [mm]', value: '120**' },
      { parameter: 'Długość lufy bez urządzenia wylotowego [mm]', value: '540' },
      { parameter: 'Liczba bruzd [szt.]', value: '4' },
      { parameter: 'Skok bruzd [mm]', value: '328' },
      { parameter: 'Odległość celowania [m]', value: '1500' },
      { parameter: 'Prędkość początkowa pocisku z rdzeniem ołowianym [m/s]', value: '840' },
      { parameter: 'Zasięg skuteczny [m]', value: '1500***' },
      { parameter: 'Odległość strzału bezwzględnego do popiersia [m]', value: '420' },
      { parameter: 'Odległość strzału bezwzględnego do biegnącego [m]', value: '640' },
      { parameter: 'Szybkostrzelność teoretyczna [strz./min]', value: '700 - 850' },
      { parameter: 'Szybkostrzelność praktyczna [strz./min]', value: '250' },
      { parameter: 'Pojemność skrzynki nabojowej [szt.]', value: '100 i 200' }
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
      { parameter: 'Typ broni', value: 'nieautomatyczna, jednostrzałowa podwieszana' },
      { parameter: 'Kaliber broni [mm]', value: '40' },
      { parameter: 'Nabój [mm]', value: '40x46 mm LV' },
      { parameter: 'Masa broni [kg]', value: '1,35' },
      { parameter: 'Długość broni [mm]', value: '296' },
      { parameter: 'Szerokość broni z celownikiem mech. [mm]', value: '95' },
      { parameter: 'Wysokość broni [mm]', value: '140' },
      { parameter: 'Długość lufy [mm]', value: '214' },
      { parameter: 'Skok bruzd [mm]', value: '1200' },
      { parameter: 'Liczba bruzd [szt.]', value: '6' },
      { parameter: 'Prędkość początkowa pocisku [m/s]', value: '80 +/-5' },
      { parameter: 'Donośność skuteczna [m]', value: '≥ 350' },
      { parameter: 'Szybkostrzelność teoretyczna strz./min', value: '5-7' }
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
.tile-icon-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px 0 rgba(130,120,88,0.13);
}

.modern-bg {
  background: #f7f8f9;
  min-height: 100vh;
}

/* Dashboard container for max-width and responsive padding */
.dashboard-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 32px 24px 32px 24px;
}
@media (max-width: 600px) {
  .dashboard-container {
    padding: 16px 6px 24px 6px;
  }
}

/* Dashboard style for tiles/cards */
.dashboard-tiles {
  max-width: 900px;
  margin: 0 auto 0 auto;
  padding: 0 0 24px 0;
}
@media (max-width: 600px) {
  .dashboard-tiles {
    padding: 0 0 12px 0;
  }
}

.page-header {
  max-width: 900px;
  margin: 0 auto 24px auto;
  padding: 0 0 8px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
@media (max-width: 600px) {
  .page-header {
    padding: 0 0 4px 0;
  }
}

.text-dashboard-header {
  color: #0f2c05;
}
/* --- Dashboard tile/card styles from IndexPage.vue --- */
.tiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 36px;
  justify-items: center;
  margin-top: 12px;
}
.modern-tile {
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 4px 24px 0 rgba(15,44,5,0.10);
  cursor: pointer;
  transition: box-shadow 0.18s, transform 0.18s;
  min-height: 170px;
  width: 100%;
  max-width: 270px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  border: none;
}
.modern-tile:hover {
  box-shadow: 0 8px 32px 0 rgba(101,71,63,0.18);
  transform: translateY(-2px) scale(1.03);
}
.tile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 38px 0 28px 0;
}
.tile-label-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}
.tile-label {
  text-align: center;
  font-size: 1.13rem;
  font-weight: 600;
  color: #0f2c05;
}
.tile-desc-chip-big {
  margin-top: 10px;
  font-size: 1.08rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 12px;
  min-height: 36px;
}

.weapon-detail-image {
  width: 100%;
  object-fit: contain;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
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
  background: #f5f5f5;
  border: 1.5px solid #171716;
}
.spec-card:hover {
  box-shadow: 0 4px 12px rgba(15,44,5,0.10);
}
.spec-card .q-card__section {
  padding: 12px 16px;
}

@media (max-width: 600px) {
  .dashboard-tile {
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
