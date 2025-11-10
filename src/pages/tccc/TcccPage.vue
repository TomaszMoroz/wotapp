<template>
  <q-page class="q-pa-md">
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
import { useRouter } from 'vue-router'
const router = useRouter()
const tcccChapters = [
  { nr: 1, title: 'Pomoc pod ostrzałem', short: 'Care Under Fire – działania pod ostrzałem' },
  { nr: 2, title: 'Taktyczna pomoc polowa', short: 'Tactical Field Care – ogólne zasady' },
  { nr: 3, title: 'Masywny krwotok', short: 'Tamowanie masywnych krwotoków' },
  { nr: 4, title: 'Udrożnienie dróg oddechowych', short: 'Zapewnienie drożności dróg oddechowych' },
  { nr: 5, title: 'Wentylacja/Oddychanie', short: 'Postępowanie przy zaburzeniach oddychania' },
  { nr: 6, title: 'Krążenie i wstrząs', short: 'Zasady postępowania z krążeniem i wstrząsem' },
  { nr: 7, title: 'Zapobieganie hipotermii', short: 'Ochrona przed wychłodzeniem' },
  { nr: 8, title: 'Uraz czaszkowo-mózgowy (TBI)', short: 'Postępowanie przy TBI' },
  { nr: 9, title: 'Uraz oka', short: 'Drążący uraz oka – postępowanie' },
  { nr: 10, title: 'Analgezja', short: 'Leczenie bólu na polu walki' },
  { nr: 11, title: 'Antybiotykoterapia', short: 'Antybiotyki w ranach bojowych' },
  { nr: 12, title: 'Oparzenia', short: 'Zasady postępowania z oparzeniami' },
  { nr: 13, title: 'Złamania i urazy kończyn', short: 'Unieruchomienie i kontrola tętna' },
  { nr: 14, title: 'Przygotowanie do ewakuacji', short: 'Ewakuacja i przygotowanie do transportu' },
  { nr: 15, title: 'Dokumentacja medyczna', short: 'Dokumentowanie zabiegów i stanu poszkodowanego' },
  { nr: 16, title: 'Komunikacja i łączność', short: 'Łączność z zespołem, dowództwem, ewakuacją' }
]
function goToTcccChapter (nr) {
  router.push(`/tccc/${nr}`)
}
</script>

<style scoped>
.tccc-chapters-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}
.tccc-chapter-tile {
  min-width: 220px;
  max-width: 320px;
  flex: 1 1 220px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.tccc-chapter-tile:hover {
  box-shadow: 0 2px 12px rgba(44,62,47,0.18);
  background: #f5f7fa;
}
</style>
