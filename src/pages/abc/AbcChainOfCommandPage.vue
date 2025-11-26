<template>
  <q-page class="q-pa-md">
    <BackNav color="black" parentPath="/abc"/>
    <div class="text-h4 text-weight-bold q-mb-md">Droga służbowa</div>
    <div class="text-subtitle1 text-grey-7 q-mb-lg">Zasady komunikacji i meldowania w WOT</div>
    <q-card class="q-mb-lg">
      <q-card-section>
        <h5>Droga Służbowa: Zasady i Priorytety</h5>
        <ol>
          <li>
            <strong>Podstawowa Zasada Komunikacji</strong>
            <p>Zawsze kieruj wszystkie prośby, pytania, meldunki i wnioski za pośrednictwem bezpośredniego przełożonego.</p>
            <p>Twój bezpośredni przełożony (np. dowódca drużyny/plutonu) jest pierwszym i głównym filtrem informacji. Jest odpowiedzialny za znajomość Twojej sytuacji i musi ją zatwierdzić lub przekazać wyżej.</p>
            <p><strong>Pominięcie bezpośredniego przełożonego jest naruszeniem dyscypliny i podważa jego autorytet.</strong></p>
          </li>
          <li>
            <strong>Procedury Wyjazdów i Powołań</strong>
            <p>Pamiętaj o konieczności uzyskania oficjalnego pozwolenia na wszelkie działania wykraczające poza regulaminowy czas służby lub stały rejon dyslokacji.</p>
            <p>Dotyczy to zwłaszcza poza-planowych powołań, zmian w harmonogramie lub opuszczenia terenu jednostki (np. przepustka lub urlop). Każda nieobecność musi być formalnie zatwierdzona.</p>
          </li>
          <li>
            <strong>Wyjątki od Reguły</strong>
            <p>Jedynymi uzasadnionymi wyjątkami od bezwzględnego przestrzegania drogi służbowej są:</p>
            <ul>
              <li><strong>Sytuacje krytyczne:</strong> Bezpośrednie zagrożenie życia, zdrowia lub mienia.</li>
              <li><strong>Skargi i zażalenia:</strong> Składane na bezpośredniego przełożonego, kierowane do przełożonego nadrzędnego.</li>
            </ul>
          </li>
        </ol>
        <p class="q-mt-md"><strong>Wniosek:</strong> Przestrzeganie drogi służbowej to wyraz szacunku dla hierarchii i podstawa sprawnego funkcjonowania pododdziału.</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import BackNav from 'components/BackNav.vue'
</script>

<style scoped>
</style>
