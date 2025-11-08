<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav />

      <!-- Header -->
      <div class="header-section q-mb-lg">
        <q-btn
          flat
          icon="arrow_back"
          label="Powrót"
          @click="goBack"
          class="text-white q-mb-md"
        />
        <div class="hero-section q-pa-lg rounded-borders">
          <div class="text-h4 text-weight-bold text-primary q-mb-sm">Warunki użycia broni palnej</div>
          <div class="text-body1 text-grey-6">Art. 45 - Środki przymusu bezpośredniego i broń palna</div>
        </div>
      </div>

      <!-- Content -->
      <q-card class="content-card">
        <q-card-section class="q-pa-lg">
          <div class="law-header q-mb-lg">
            <div class="text-h5 q-mb-sm">Art. 45. [Warunki użycia broni palnej]</div>
            <div class="text-body2 text-grey-6 q-mb-md">
              Dziennik Ustaw Dz.U.2025.555 t.j. - Akt obowiązujący<br>
              Wersja od: 25 lipca 2025 r.
            </div>
          </div>

          <div class="law-content">
            <p class="intro-text q-mb-lg">
              <strong>Broni palnej można użyć, gdy zaistnieje co najmniej jeden z następujących przypadków:</strong>
            </p>

            <!-- Punkt 1 -->
            <div class="law-section q-mb-lg">
              <div class="section-number">1)</div>
              <div class="section-content">
                <h6 class="section-title">Konieczność odparcia bezpośredniego, bezprawnego zamachu na:</h6>
                <ul class="law-list">
                  <li><strong>a)</strong> życie, zdrowie lub wolność uprawnionego lub innej osoby albo konieczność przeciwdziałania czynnościom zmierzającym bezpośrednio do takiego zamachu,</li>
                  <li><strong>b)</strong> ważne obiekty, urządzenia lub obszary albo konieczność przeciwdziałania czynnościom zmierzającym bezpośrednio do takiego zamachu,</li>
                  <li><strong>c)</strong> mienie, który stwarza jednocześnie bezpośrednie zagrożenie życia, zdrowia lub wolności uprawnionego lub innej osoby, albo konieczność przeciwdziałania czynnościom zmierzającym bezpośrednio do takiego zamachu,</li>
                  <li><strong>d)</strong> nienaruszalność granicy państwowej przez osobę, która wymusza przekroczenie granicy państwowej przy użyciu pojazdu, broni palnej lub innego niebezpiecznego przedmiotu albo działa w inny sposób bezpośrednio zagrażający życiu, zdrowiu lub wolności uprawnionego lub innej osoby lub wspólnie z inną osobą, która posługuje się taką bronią, przedmiotem lub sposobem,</li>
                  <li><strong>e)</strong> bezpieczeństwo konwoju lub doprowadzenia;</li>
                </ul>
              </div>
            </div>

            <!-- Punkt 2 -->
            <div class="law-section q-mb-lg">
              <div class="section-number">2)</div>
              <div class="section-content">
                <h6 class="section-title">Konieczność przeciwstawienia się osobie:</h6>
                <ul class="law-list">
                  <li><strong>a)</strong> niepodporządkowującej się wezwaniu do natychmiastowego porzucenia broni, materiału wybuchowego lub innego niebezpiecznego przedmiotu, którego użycie może zagrozić życiu, zdrowiu lub wolności uprawnionego lub innej osoby,</li>
                  <li><strong>b)</strong> która usiłuje bezprawnie odebrać broń palną uprawnionemu lub innej osobie uprawnionej do jej posiadania;</li>
                </ul>
              </div>
            </div>

            <!-- Punkt 3 -->
            <div class="law-section q-mb-lg">
              <div class="section-number">3)</div>
              <div class="section-content">
                <h6 class="section-title">Bezpośredni pościg za osobą, wobec której:</h6>
                <ul class="law-list">
                  <li><strong>a)</strong> użycie broni palnej było dopuszczalne w przypadkach określonych w pkt 1 lit. a-d i pkt 2,</li>
                  <li><strong>b)</strong> istnieje uzasadnione podejrzenie, że popełniła przestępstwo, o którym mowa w art. 115 § 20, art. 148, art. 156 § 1, art. 163-165, art. 197, art. 252 i art. 280-282 ustawy z dnia 6 czerwca 1997 r. - Kodeks karny;</li>
                </ul>
              </div>
            </div>

            <!-- Punkt 4 -->
            <div class="law-section q-mb-lg">
              <div class="section-number">4)</div>
              <div class="section-content">
                <h6 class="section-title">Konieczność:</h6>
                <ul class="law-list">
                  <li><strong>a)</strong> ujęcia osoby:
                    <ul class="sublist">
                      <li>– wobec której użycie broni palnej było dopuszczalne w przypadkach określonych w pkt 1 lit. a-d i pkt 2,</li>
                      <li>– wobec której istnieje uzasadnione podejrzenie, że popełniła przestępstwo, o którym mowa w art. 115 § 20, art. 148, art. 156 § 1, art. 163-165, art. 197, art. 252 i art. 280-282 ustawy z dnia 6 czerwca 1997 r. - Kodeks karny,</li>
                      <li>– dokonującej zamachu, o którym mowa w pkt 1 lit. d lub e,</li>
                      <li>– jeżeli schroniła się w miejscu trudno dostępnym, a z okoliczności zdarzenia wynika, że może użyć broni palnej lub innego niebezpiecznego przedmiotu,</li>
                    </ul>
                  </li>
                  <li><strong>b)</strong> ujęcia lub udaremnienia ucieczki osoby zatrzymanej, tymczasowo aresztowanej lub odbywającej karę pozbawienia wolności lub osoby, wobec której zarządzono zatrzymanie i doprowadzenie celem odbycia kary pozbawienia wolności, jeżeli:
                    <ul class="sublist">
                      <li>– ucieczka tej osoby stwarza zagrożenie życia lub zdrowia uprawnionego lub innej osoby,</li>
                      <li>– istnieje uzasadnione podejrzenie, że osoba ta może użyć materiałów wybuchowych, broni palnej lub innego niebezpiecznego przedmiotu,</li>
                      <li>– pozbawienie wolności nastąpiło lub ma nastąpić w związku z uzasadnionym podejrzeniem lub stwierdzeniem popełnienia przestępstwa, o którym mowa w art. 115 § 20, art. 148, art. 156 § 1, art. 163-165, art. 197, art. 252 i art. 280-282 ustawy z dnia 6 czerwca 1997 r. - Kodeks karny,</li>
                    </ul>
                  </li>
                  <li><strong>c)</strong> ujęcia lub udaremnienia ucieczki osoby zatrzymanej, tymczasowo aresztowanej lub odbywającej karę pozbawienia wolności w związku z uzasadnionym podejrzeniem lub stwierdzeniem popełnienia lub przygotowania do popełnienia przestępstwa, o którym mowa w:
                    <ul class="sublist">
                      <li>– art. 5 ust. 1 pkt 2 ustawy z dnia 24 maja 2002 r. o Agencji Bezpieczeństwa Wewnętrznego oraz Agencji Wywiadu (Dz. U. z 2024 r. poz. 812, 1222, 1562, 1684 i 1871 oraz z 2025 r. poz. 179),</li>
                      <li>– art. 2 ust. 1 pkt 1 ustawy z dnia 9 czerwca 2006 r. o Centralnym Biurze Antykorupcyjnym (Dz. U. z 2024 r. poz. 184, 1222 i 1871 oraz z 2025 r. poz. 179),</li>
                      <li>– art. 5 ust. 1 pkt 1 ustawy z dnia 9 czerwca 2006 r. o Służbie Kontrwywiadu Wojskowego oraz Służbie Wywiadu Wojskowego (Dz. U. z 2024 r. poz. 1405 oraz z 2025 r. poz. 179);</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Punkt 5 -->
            <div class="law-section q-mb-lg">
              <div class="section-number">5)</div>
              <div class="section-content">
                <h6 class="section-title">Konieczność udaremnienia ucieczki osoby pozbawionej wolności z aresztu śledczego lub zakładu karnego oraz osoby konwojowanej lub doprowadzanej, a także pościg za tą osobą.</h6>
              </div>
            </div>

            <!-- Ostrzeżenie -->
            <q-banner class="bg-warning text-dark q-mt-lg" rounded>
              <template v-slot:avatar>
                <q-icon name="warning" color="dark" />
              </template>
              <strong>UWAGA:</strong> Niniejszy tekst ma charakter informacyjny. W sprawach prawnych należy zawsze kierować się aktualnym brzmieniem przepisów.
            </q-banner>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BackNav from 'components/BackNav.vue'

defineOptions({
  name: 'FirearmsLawPage'
})

const router = useRouter()

const goBack = () => {
  router.push('/emergency')
}
</script>

<style scoped>
.page-background {
  background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
  min-height: 100vh;
}

.container {
  max-width: 1000px;
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

.law-header {
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 1rem;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #1a1a1a;
}

.law-section {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-number {
  font-weight: bold;
  font-size: 1.1rem;
  color: #8B4513;
  min-width: 30px;
  flex-shrink: 0;
}

.section-content {
  flex: 1;
}

.section-title {
  color: #2D3E2F;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.law-list {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.law-list > li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
  padding-left: 1rem;
  position: relative;
}

.law-list > li strong {
  color: #8B4513;
  margin-right: 0.5rem;
}

.sublist {
  margin-top: 0.5rem;
  margin-left: 1rem;
  list-style: none;
  padding-left: 0;
}

.sublist li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
  font-size: 0.95rem;
  color: #444;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }

  .law-section {
    flex-direction: column;
    gap: 0.5rem;
  }

  .section-number {
    min-width: auto;
  }

  .law-list > li {
    padding-left: 0.5rem;
  }

  .sublist {
    margin-left: 0.5rem;
  }
}
</style>
