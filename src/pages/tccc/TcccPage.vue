<template>
  <q-page class="tccc-bg q-pa-md">
  <BackNav color="black" :showBack="false"/>
  <div class="text-h4 text-weight-bold q-mb-md">TCCC – Taktyczna Pomoc Poszkodowanym na Polu Walki</div>
    <div class="text-subtitle1 text-grey-7 q-mb-xs">Wytyczne dla personelu medycznego (2024)</div>
    <div class="text-body2 text-grey-8 q-mb-lg">
      <strong>Podręcznik:</strong> TAKTYCZNA POMOC POSZKODOWANYM NA POLU WALKI (TCCC)<br>
      WYTYCZNE DLA PERSONELU MEDYCZNEGO<br>
      z 25 stycznia 2024 roku<br>
      ŁÓDŹ 2024
    </div>
    <div class="tccc-chapters-grid">
      <q-card v-for="chapter in tcccChapters" :key="chapter.nr" class="tccc-chapter-tile q-ma-xs" @click="goToTcccChapter(chapter.nr)">
        <q-card-section class="q-pa-sm">
          <div class="text-weight-bold text-primary">{{ chapter.nr }}. {{ chapter.title }}</div>
          <div class="text-caption text-grey-7">{{ chapter.short }}</div>
        </q-card-section>
      </q-card>
    </div>
    <!-- Usunięto pobieranie PDF na życzenie użytkownika -->
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const tcccChapters = [
  { nr: 1, title: 'Podstawowy plan zarządzania dla taktycznej pomocy poszkodowanym podczas ewakuacji' },
  { nr: 2, title: 'Pomoc pod ostrzałem', short: 'Care Under Fire – działania pod ostrzałem' },
  { nr: 3, title: 'Taktyczna pomoc polowa', short: 'Tactical Field Care – ogólne zasady' },
  { nr: 4, title: 'Masywny krwotok', short: 'Tamowanie masywnych krwotoków' },
  { nr: 5, title: 'Udrożnienie dróg oddechowych', short: 'Zapewnienie drożności dróg oddechowych' },
  { nr: 6, title: 'Wentylacja/Oddychanie', short: 'Postępowanie przy zaburzeniach oddychania' },
  { nr: 7, title: 'Krążenie i wstrząs', short: 'Zasady postępowania z krążeniem i wstrząsem' },
  { nr: 8, title: 'Zapobieganie hipotermii', short: 'Ochrona przed wychłodzeniem' },
  { nr: 9, title: 'Uraz czaszkowo-mózgowy (TBI)', short: 'Postępowanie przy TBI' },
  { nr: 10, title: 'Drążący uraz oka', short: 'Drążący uraz oka – postępowanie' },
  { nr: 11, title: 'Analgezja', short: 'Leczenie bólu na polu walki' },
  { nr: 12, title: 'Antybiotykoterapia', short: 'Antybiotyki w ranach bojowych' },
  { nr: 13, title: 'Wytrzewienie jamy brzusznej', short: 'Postepowanie przy wytrzewieniu' },
  { nr: 14, title: 'Oparzenia', short: 'Postepowanie przy oparzeniach' },
  { nr: 15, title: 'RKO', short: 'Resucucytacja krazeniowo oddechowa' },
  { nr: 16, title: 'Dokumentacja medyczna', short: 'Dokumentowanie zabiegów i stanu poszkodowanego' },
  { nr: 17, title: 'Komunikacja i łączność', short: 'Łączność z zespołem, dowództwem, ewakuacją' }
]
function goToTcccChapter (nr) {
  router.push(`/tccc/${nr}`)
}
</script>

<style scoped>
.tccc-bg {
  background: #f5f7fa;
  min-height: 100vh;
}
.tccc-chapters-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}
.tccc-chapter-tile {
  width: 240px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.tccc-chapter-tile:hover {
  box-shadow: 0 2px 12px rgba(44,62,47,0.18);
  background: #f5f7fa;
}
</style>
