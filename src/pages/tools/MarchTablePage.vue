<!-- eslint-disable camelcase -->
<template>
  <q-page class="q-pa-md flex row">
    <div class="march-main-container q-mx-auto" :style="mainContainerStyle">
      <BackNav color="black" parentPath="/tools" />
      <div class="text-h5 text-center q-mb-md flex items-center justify-center">
        Tabela marszu
        <q-btn flat round dense icon="info_outline" class="q-ml-sm" @click="showInfoDialog = true" aria-label="Instrukcja" />
      </div>
      <div class="row items-start justify-center">
        <div class="flex column" :class="isMobile ? 'col-12' : ''" style="width:100%;">
          <div class="q-mb-md column q-gutter-sm">
            <template v-if="!isMobile">
              <div class="row items-center q-gutter-xs">
                <q-input v-model="search" label="Wyszukaj teren (nazwa lub MGRS)" outlined dense @keyup.enter="searchArea" class="col" />
                <q-select
                  v-model="selectedMapLayer"
                  :options="mapLayerOptions"
                  dense outlined emit-value map-options
                  style="min-width:120px;max-width:180px;"
                  :dropdown-icon="'layers'"
                  aria-label="Wybierz warstwę mapy"
                  class="col-auto q-ml-sm"
                />
              </div>
              <div class="row items-center q-gutter-xs">
                <q-btn label="Pokaż teren" color="primary" class="q-my-sm" @click="searchArea" />
                <q-checkbox v-model="showMgrsGrid" label="Grid MGRS" color="green" class="q-ml-md" />
                <q-checkbox v-model="preserveTable24h" label="Zachowaj tabelę 24h" color="amber-8" class="q-ml-md" />
                <q-btn flat dense icon="my_location" label="Moje położenie" color="primary" class="q-ml-sm" @click="centerOnUserLocation" :disable="locating" aria-label="Ustaw na moją lokalizację" />
                <q-toggle
                  v-model="inputMode"
                  :label="inputMode === 'map' ? 'punkty na mapie' : 'wpisz gridy'"
                  true-value="map"
                  false-value="grid"
                  color="primary"
                  class="q-ml-md"
                />
                <q-btn flat dense round icon="palette" class="q-ml-xs" @click="showPaletteDialog = true" aria-label="Kolory" />
              </div>
              <div class="row items-center q-gutter-xs q-mt-xs">
                <q-select
                  v-model="mgrsZoneMode"
                  :options="mgrsZoneModeOptions"
                  label="Kontekst strefy"
                  dense outlined emit-value map-options
                  style="min-width: 150px; max-width: 200px;"
                />
                <q-select
                  v-if="mgrsZoneMode === 'manual'"
                  v-model="manualMgrsZoneLabel"
                  :options="mgrsZoneOptions"
                  label="Strefa robocza"
                  dense outlined
                  style="min-width: 170px; max-width: 220px;"
                />
                <q-chip dense square color="green-9" text-color="white">
                  Aktywna: {{ activeMgrsZoneLabel || 'auto' }}
                </q-chip>
                <q-chip dense square color="grey-8" text-color="white">
                  Granica strefy nie nadpisuje punktów
                </q-chip>
              </div>
            </template>
            <template v-else>
              <q-card flat bordered class="march-mobile-panel">
                <q-card-section class="q-pa-sm">
                  <div class="march-mobile-section-title">Wyszukiwanie i mapa</div>
                  <q-input v-model="search" label="Nazwa terenu lub MGRS" outlined dense @keyup.enter="searchArea" class="full-width" />
                  <div class="row q-col-gutter-sm q-mt-sm">
                    <div class="col-7">
                      <q-btn label="Pokaż teren" color="primary" class="full-width" @click="searchArea" />
                    </div>
                    <div class="col-5">
                      <q-btn flat dense icon="my_location" label="Moja poz." color="primary" class="full-width" @click="centerOnUserLocation" :disable="locating" aria-label="Ustaw na moją lokalizację" />
                    </div>
                  </div>
                  <q-select
                    v-model="selectedMapLayer"
                    :options="mapLayerOptions"
                    dense outlined emit-value map-options
                    label="Warstwa mapy"
                    :dropdown-icon="'layers'"
                    aria-label="Wybierz warstwę mapy"
                    class="full-width q-mt-sm"
                  />
                </q-card-section>
              </q-card>

              <q-card flat bordered class="march-mobile-panel">
                <q-expansion-item icon="tune" label="Ustawienia mapy i sesji" header-class="march-mobile-expansion__header" expand-separator>
                  <div class="q-pa-sm">
                    <div class="text-caption text-grey-7 q-mb-xs">Tryb dodawania punktów</div>
                    <q-btn-toggle
                      v-model="inputMode"
                      spread
                      unelevated
                      toggle-color="primary"
                      :options="[
                        { label: 'Mapa', value: 'map', icon: 'place' },
                        { label: 'MGRS', value: 'grid', icon: 'grid_on' }
                      ]"
                      class="full-width"
                    />
                    <div class="column q-gutter-sm q-mt-md">
                      <q-toggle v-model="showMgrsGrid" label="Pokaż grid MGRS" color="green" />
                      <q-toggle v-model="preserveTable24h" label="Zachowaj tabelę 24h" color="amber-8" />
                    </div>
                    <q-btn flat no-caps icon="palette" label="Kolory mapy" color="primary" class="q-mt-md" @click="showPaletteDialog = true" />
                    <q-select
                      v-model="mgrsZoneMode"
                      :options="mgrsZoneModeOptions"
                      label="Kontekst strefy"
                      dense outlined emit-value map-options
                      class="full-width q-mt-md"
                    />
                    <q-select
                      v-if="mgrsZoneMode === 'manual'"
                      v-model="manualMgrsZoneLabel"
                      :options="mgrsZoneOptions"
                      label="Strefa robocza"
                      dense outlined
                      class="full-width q-mt-sm"
                    />
                    <div class="row q-gutter-xs q-mt-md">
                      <q-chip dense square color="green-9" text-color="white">
                        Aktywna: {{ activeMgrsZoneLabel || 'auto' }}
                      </q-chip>
                      <q-chip dense square color="grey-8" text-color="white" class="march-mobile-chip-wide">
                        Granica strefy nie nadpisuje punktów
                      </q-chip>
                    </div>
                  </div>
                </q-expansion-item>
              </q-card>
            </template>

            <q-dialog v-model="showPaletteDialog">
              <q-card style="min-width:340px;max-width:95vw;">
                <q-card-section class="text-h6">Dostosuj kolory mapy</q-card-section>
                <q-card-section>
                  <div class="q-mb-md">
                    <div v-for="(item, idx) in paletteItems" :key="item.key" class="row items-center q-gutter-sm q-mb-sm">
                      <span class="col">{{ item.label }}</span>
                      <div
                        class="col-auto cursor-pointer"
                        :style="`width:32px;height:32px;border-radius:6px;border:2px solid #ccc;background:${item.color}`"
                        @click="openColorPicker(idx)"
                      ></div>
                    </div>
                  </div>
                  <q-dialog v-model="showColorPickerDialog">
                    <q-card style="min-width:220px;max-width:95vw;">
                      <q-card-section class="text-h6">Wybierz kolor</q-card-section>
                      <q-card-section>
                        <q-color v-model="paletteItems[selectedPaletteIdx].color" format="hex" panel="palette" @update:model-value="onPaletteColorChange" />
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn flat label="OK" color="primary" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Zamknij" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <div id="march-map"
            :style="isMobile ? 'height: 60vh; min-height: 320px; max-height: 80vh' : 'height: 600px'"
            style="width:100%;border-radius:8px;overflow:hidden;"
            class="q-mb-md"
          ></div>
          <div v-if="!isMobile" class="q-mb-md row items-center q-gutter-xs">
            <q-btn label="Dodaj punkt" color="green-7" @click="handleAddPoint" :disable="false" />
            <q-btn label="Dodaj z MGRS" color="green-9" outline @click="showRouteMgrsDialog = true" />
            <q-btn label="Dodaj pkt spec." color="blue-7" @click="showSpecialDialog = true" :disable="false" />
            <q-btn label="Usuń ostatni" color="red-9" @click="removeLastPin" :disable="pins.length === 0" />
            <q-btn icon="file_download" color="primary" label="GPX" @click="exportGPX" :disable="pins.length < 2" />
            <q-btn icon="access_time" color="secondary" @click="showEtaDialog = true" />
            <q-btn icon="picture_as_pdf" color="grey-9" @click="showPdfDialog = true" />
            <q-btn icon="delete" color="negative" @click="clearAll" />
          </div>
          <div v-else class="q-mb-md column q-gutter-sm">
            <q-card flat bordered class="march-mobile-panel">
              <q-card-section class="q-pa-sm">
                <div class="march-mobile-section-title">Dodawanie punktów</div>
                <div class="march-mobile-action-grid">
                  <q-btn icon="add_location_alt" label="Dodaj punkt" color="green-7" @click="handleAddPoint" class="full-width" />
                  <q-btn icon="grid_on" label="Z MGRS" color="green-9" outline @click="showRouteMgrsDialog = true" class="full-width" />
                  <q-btn icon="place" label="Punkt spec." color="blue-7" @click="showSpecialDialog = true" class="full-width" />
                  <q-btn icon="undo" label="Usuń ostatni" color="red-9" @click="removeLastPin" :disable="pins.length === 0" class="full-width" />
                </div>
              </q-card-section>
            </q-card>

            <q-card flat bordered class="march-mobile-panel">
              <q-card-section class="q-pa-sm">
                <div class="march-mobile-section-title">Narzędzia i eksport</div>
                <div class="march-mobile-action-grid">
                  <q-btn icon="file_download" label="GPX" color="primary" @click="exportGPX" :disable="pins.length < 2" class="full-width" />
                  <q-btn icon="access_time" label="ETA" color="secondary" @click="showEtaDialog = true" class="full-width" />
                  <q-btn icon="picture_as_pdf" label="PDF" color="grey-9" @click="showPdfDialog = true" class="full-width" />
                  <q-btn icon="delete" label="Wyczyść" color="negative" @click="clearAll" class="full-width" />
                </div>
              </q-card-section>
            </q-card>
          </div>

          <q-dialog v-model="showGridDialog">
              <q-card style="min-width:320px;max-width:95vw;">
                <q-card-section class="text-h6">Dodaj punkt przez grid MGRS</q-card-section>
                <q-card-section>
                  <div class="q-mb-md">
                    <q-input v-model="mgrsPrefix" label="Prefix MGRS (np. 34UEC lub EC)" dense outlined />
                  </div>
                  <div class="q-mb-md">
                    <q-input v-model="mgrsEasting" label="Easting (2–5 cyfr)" dense outlined maxlength="5" />
                  </div>
                  <div class="q-mb-md">
                    <q-input v-model="mgrsNorthing" label="Northing (2–5 cyfr)" dense outlined maxlength="5" />
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Anuluj" color="primary" v-close-popup @click="showGridDialog = false" />
                  <q-btn flat label="OK" color="primary" @click="addGridPoint" />
                </q-card-actions>
              </q-card>
          </q-dialog>
          <q-dialog v-model="showRouteMgrsDialog">
              <q-card style="min-width:320px;max-width:95vw;">
                <q-card-section class="text-h6">Dodaj punkt do trasy z MGRS</q-card-section>
                <q-card-section>
                  <q-input
                    v-model="routeMgrsInput"
                    label="MGRS (np. 34UEC1234512345 lub EC1234512345)"
                    dense outlined
                    autofocus
                    @keyup.enter="addRoutePointFromMgrs"
                  />
                  <div class="text-caption q-mt-sm">
                    Pełny MGRS działa zawsze. Skrót bez numeru strefy wymaga aktywnego kontekstu strefy.
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Anuluj" color="primary" v-close-popup @click="showRouteMgrsDialog = false" />
                  <q-btn flat label="Dodaj" color="primary" @click="addRoutePointFromMgrs" />
                </q-card-actions>
              </q-card>
          </q-dialog>
          <q-dialog v-model="showSpecialDialog">
              <q-card style="min-width:320px;max-width:95vw;">
                <q-card-section class="text-h6">Dodaj punkt specjalny</q-card-section>
                <q-card-section>
                  <q-select
                    v-model="specialType"
                    :options="specialTypes"
                    label="Typ punktu"
                    dense outlined emit-value map-options
                  />
                  <q-input
                    v-if="specialType === 'INNY'"
                    v-model="specialCustomName"
                    label="Nazwa własna punktu"
                    dense outlined class="q-mt-md"
                  />
                  <div v-if="inputMode === 'grid' || showSpecialMgrsInputs">
                    <q-input v-model="specialMgrsPrefix" label="Prefix MGRS (np. 34UEC lub EC)" dense outlined class="q-mt-md" />
                    <q-input v-model="specialMgrsEasting" label="Easting (2–5 cyfr)" dense outlined maxlength="5" class="q-mt-md" />
                    <q-input v-model="specialMgrsNorthing" label="Northing (2–5 cyfr)" dense outlined maxlength="5" class="q-mt-md" />
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Anuluj" color="primary" v-close-popup />
                  <q-btn flat label="OK" color="primary" @click="handleSpecialDialogOk"
                    :disable="(inputMode === 'grid' || showSpecialMgrsInputs) && (!specialType || !canResolveMgrsPrefix(specialMgrsPrefix) || specialMgrsEasting.length < 2 || specialMgrsEasting.length > 5 || specialMgrsNorthing.length < 2 || specialMgrsNorthing.length > 5)"
                  />
                </q-card-actions>
              </q-card>
          </q-dialog>

          <!-- Dialog wyboru typu punktu dla lokalizacji użytkownika -->
          <q-dialog v-model="showUserLocationDialog">
            <q-card style="min-width:320px;max-width:95vw;">
              <q-card-section class="text-h6">Dodaj swoją lokalizację</q-card-section>
              <q-card-section>
                <p>Wybierz jak chcesz dodać obecną lokalizację do tabeli marszu:</p>
              </q-card-section>
              <q-card-actions vertical>
                <q-btn label="Dodaj jako punkt trasy" color="primary" @click="addUserLocationAsRoute" class="full-width" />
                <q-btn label="Dodaj jako punkt specjalny" color="blue-7" @click="addUserLocationAsSpecial" class="full-width" />
                <q-btn label="Anuluj" flat color="grey" v-close-popup class="full-width" />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="showPointActionsDialog">
            <q-card style="min-width:320px;max-width:95vw;">
              <q-card-section class="text-h6">Punkt na mapie</q-card-section>
              <q-card-section v-if="selectedPointContext">
                <div class="text-body1">{{ selectedPointContext.label }}</div>
                <div class="q-mt-sm">
                  <q-chip dense square color="green-9" text-color="white">{{ selectedPointContext.mgrs || 'Brak MGRS' }}</q-chip>
                </div>
                <div class="text-caption q-mt-sm">
                  {{ selectedPointContext.lat.toFixed(6) }}, {{ selectedPointContext.lng.toFixed(6) }}
                </div>
                <div class="text-caption text-grey-6 q-mt-sm">
                  {{ selectedPointContext.note || 'Brak opisu' }}
                </div>
              </q-card-section>
              <q-card-actions align="right" class="q-gutter-sm">
                <q-btn flat label="Nawiguj do" color="primary" @click="navigateToSelectedPoint" />
                <q-btn flat label="Opis" color="secondary" @click="openPointNoteDialog" />
                <q-btn flat label="Edycja" color="orange" @click="openPointEditDialog" />
                <q-btn flat label="Zamknij" color="grey" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="showPointNoteDialog">
            <q-card style="min-width:320px;max-width:95vw;">
              <q-card-section class="text-h6">Opis punktu</q-card-section>
              <q-card-section>
                <q-input
                  v-model="pointNoteDraft"
                  type="textarea"
                  autogrow
                  dense outlined
                  label="Notatka"
                />
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Anuluj" color="grey" v-close-popup @click="showPointNoteDialog = false" />
                <q-btn flat label="Zapisz" color="primary" @click="savePointNote" />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="showPointEditDialog">
            <q-card style="min-width:320px;max-width:95vw;">
              <q-card-section class="text-h6">Edycja punktu</q-card-section>
              <q-card-section>
                <q-input
                  v-model="pointEditDraft"
                  type="textarea"
                  autogrow
                  dense outlined
                  label="Opis / uwagi"
                />
              </q-card-section>
              <q-card-actions align="between">
                <q-btn flat label="Usuń punkt" color="negative" @click="deleteSelectedPoint" />
                <div class="row q-gutter-sm">
                  <q-btn flat label="Anuluj" color="grey" v-close-popup @click="showPointEditDialog = false" />
                  <q-btn flat label="Zapisz" color="primary" @click="savePointEdit" />
                </div>
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- Tabele marszu pod mapą na desktopie -->
          <div v-if="!isMobile">
            <q-table
              v-if="routeTable.length > 0"
              :rows="routeTable"
              :columns="columns"
              row-key="id"
              flat
              dense
              class="march-table-bg shadow-1 q-mb-md"
            >
              <template v-slot:body-cell-uwagi="props">
                <q-td :props="props">
                  <q-input
                    v-model="pins[props.rowIndex].note"
                    dense
                    borderless
                    type="textarea"
                    autogrow
                    @blur="calculateRoute()"
                    style="white-space: pre-line; word-break: break-word; min-width: 120px; max-width: 100%;"
                  />
                </q-td>
              </template>
            </q-table>
            <q-table
              v-if="specialPoints.length > 0"
              :rows="specialPointsTable"
              :columns="specialColumns"
              row-key="__rowKey"
              flat
              dense
              class="march-table-bg shadow-1"
              title="Punkty specjalne"
            />
          </div>
          <!-- Tabele marszu z boku na mobile -->
          <div v-else>
              <q-table
                v-if="routeTable.length > 0"
                :rows="routeTable"
                :columns="columns"
                row-key="id"
                flat
                dense
                grid
                hide-header
                class="march-table-bg shadow-1 q-mb-md mobile-march-table"
                :dark="$q.dark.isActive || themeClass === 'theme-dark'"
              />
              <q-table
                v-if="specialPoints.length > 0"
                :rows="specialPointsTable"
                :columns="specialColumns"
                row-key="__rowKey"
                flat
                dense
                grid
                hide-header
                class="march-table-bg shadow-1 mobile-march-table"
                title="Punkty specjalne"
                :dark="$q.dark.isActive || themeClass === 'theme-dark'"
              />
          </div>
        </div>
      </div>
      <q-dialog v-model="showEtaDialog">
        <q-card style="min-width:320px;max-width:95vw;">
          <q-card-section class="text-h6">Szacowanie czasu marszu</q-card-section>
          <q-card-section>
            <div v-for="(seg, i) in etaSegments" :key="i" class="q-mb-sm">
              <div class="row items-center q-gutter-sm">
                <div class="text-caption">Odcinek {{ i+1 }} ({{ seg.distance }} m):</div>
                <q-option-group
                  v-model="seg.terrain"
                  :options="terrainTypes.map(t => ({ label: t, value: t }))"
                  type="radio"
                  inline
                />
              </div>
            </div>
            <div class="row q-gutter-md q-mt-md">
              <q-select v-model="breakEvery" :options="breakEveryOptions" label="Przerwa co (min)" dense outlined style="min-width:120px;" />
              <q-select v-model="breakLength" :options="breakLengthOptions" label="Długość przerwy (min)" dense outlined style="min-width:120px;" />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Zamknij" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="showPdfDialog">
        <q-card style="min-width:320px;max-width:95vw;">
          <q-card-section class="text-h6">Eksport PDF</q-card-section>
          <q-card-section>
            <q-option-group
              v-model="pdfOptions"
              :options="[
                { label: 'Załącz mapę', value: 'map' },
                { label: 'Nadaj nazwę', value: 'name' },
                ...(specialPoints.length > 0 ? [{ label: 'Dodaj punkty specjalne', value: 'specialPoints' }] : []),
                ...(routeTable.length > 0 ? [{ label: 'Dodaj tabelę', value: 'routeTable' }] : [])
              ]"
              type="checkbox"
            />
            <div v-if="pdfOptions.includes('map')">
              <q-option-group
                v-model="pdfMapOptions"
                :options="[
                  { label: 'Dodaj linie trasy', value: 'routeLines' },
                  { label: 'Dodaj punkty trasy', value: 'routeMarkers' },
                  { label: 'Dodaj siatkę MGRS', value: 'mgrsGrid' }
                ]"
                type="checkbox"
              />
            </div>
            <div v-if="pdfOptions.includes('name')" class="q-mt-md">
              <q-input
                v-model="pdfCustomName"
                label="Nazwa trasy (własna)"
                dense outlined
                @input="onCustomNameInput"
                :disable="pdfSelectedName !== ''"
                class="q-mb-sm"
              />
              <q-select
                v-model="pdfSelectedName"
                :options="predefinedRouteNames"
                label="Wybierz nazwę trasy"
                dense outlined emit-value map-options
                @update:model-value="onDropdownSelect"
                :disable="pdfCustomName !== ''"
              />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Anuluj" color="primary" v-close-popup />
            <q-btn flat label="OK" color="primary" @click="handlePdfExport" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="showInfoDialog">
        <q-card style="min-width:340px;max-width:95vw;">
          <q-card-section class="text-h6">Instrukcja korzystania z Tabeli marszu</q-card-section>
          <q-card-section style="max-height:60vh;overflow:auto;">
            <ol style="padding-left: 1.2em;">
              <li><b>Tryby dodawania punktów:</b> Po prawej stronie przycisku „MOJE POŁOŻENIE” znajduje się przełącznik trybu:
                <ul>
                  <li><b>Punkty na mapie:</b> Domyślny tryb. Kliknij „Dodaj punkt”, a następnie wskaż miejsce na mapie.</li>
                  <li><b>Wpisz gridy (MGRS):</b> Przełącz tryb, kliknij „Dodaj punkt” i wpisz współrzędne MGRS w dialogu. Punkt zostanie dodany do trasy i wyświetlony na mapie.</li>
                </ul>
                Możesz też kliknąć „Dodaj z MGRS” i wkleić pełny zapis MGRS albo skrót zgodny z aktywną strefą. Wszystkie punkty są uwzględniane w trasie i eksporcie do PDF.
              </li>
              <li><b>Dodawanie punktów specjalnych:</b> Kliknij „Dodaj pkt spec.”, wybierz typ punktu (np. PZPR, MEDEVAC, OP, BAZA lub INNY), a następnie wskaż miejsce na mapie lub wpisz grid w zależności od trybu.</li>
              <li><b>Usuwanie punktów:</b> Kliknij „Usuń ostatni”, aby usunąć ostatnio dodany punkt (trasy lub specjalny).</li>
              <li><b>Czyszczenie wszystkiego:</b> Kliknij ikonę kosza, aby usunąć wszystkie punkty i wyczyścić tabelę.</li>
              <li><b>Eksport danych:</b>
                <ul>
                  <li><b>GPX:</b> Pobierz trasę do pliku GPX.</li>
                  <li><b>PDF:</b> Kliknij ikonę PDF, aby wygenerować dokument. Przed eksportem zaznacz, które elementy mają znaleźć się w pliku PDF (np. trasę, punkty specjalne, mapę, nazwę trasy), a następnie kliknij „Eksportuj”.</li>
                </ul>
              </li>
              <li><b>Wyszukiwanie terenu:</b> Wpisz nazwę miejsca lub współrzędne MGRS i kliknij „Pokaż teren”.</li>
              <li><b>Obliczanie czasu marszu:</b> Kliknij ikonę zegara, aby zobaczyć szacowany czas przejścia trasy.</li>
              <li><b>Wybór warstwy mapy:</b> Nad mapą znajduje się rozwijany selektor, który pozwala przełączać pomiędzy warstwami: OpenStreetMap, Topograficzna, Satelitarna. Zmiana warstwy natychmiast aktualizuje widok mapy.</li>
              <li><b>Dostosowanie kolorów elementów mapy:</b> Kliknij ikonę palety obok przełącznika trybu punktów, aby otworzyć dialog zmiany kolorów. Możesz wybrać kolor siatki MGRS, linii marszu oraz markerów trasy. Po kliknięciu w kwadratowy podgląd koloru pojawi się paleta kolorów. Zmiana koloru natychmiast aktualizuje widok mapy i eksportowane pliki.</li>
            </ol>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Zamknij" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div v-if="routeTable.length > 0" class="q-mt-md text-h6 text-center">ETA: {{ formatEta(etaResult) }}</div>
    </div>
  </q-page>
</template>

<script setup>

import BackNav from 'components/BackNav.vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-rotate'
import { ref, onMounted, onBeforeUnmount, reactive, computed, watchEffect, watch } from 'vue'
import { useQuasar } from 'quasar'
import * as mgrs from 'mgrs'
import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import leafletImage from 'leaflet-image'
import * as utm from 'utm'
import geomagnetism from 'geomagnetism'
import { useRouter } from 'vue-router'
import { useNavigationStore } from 'stores/navigation-store'
import { useMarchTableSessionStore } from 'stores/march-table-session-store'

const $q = useQuasar()
const router = useRouter()
const navigationStore = useNavigationStore()
const marchTableSessionStore = useMarchTableSessionStore()

const showLoading = (message) => {
  if ($q?.loading?.show) {
    $q.loading.show({ message })
  }
}

const hideLoading = () => {
  if ($q?.loading?.hide) {
    $q.loading.hide()
  }
}

// Ikony SVG z public/icons/
// Dialog do wpisywania gridów
const showGridDialog = ref(false)
const mgrsPrefix = ref('')
const mgrsEasting = ref('')
const mgrsNorthing = ref('')
const showRouteMgrsDialog = ref(false)
const routeMgrsInput = ref('')
const preserveTable24h = computed({
  get: () => marchTableSessionStore.keep24h,
  set: (value) => marchTableSessionStore.setKeep24h(value)
})
let isRestoringMarchTable = false

const isLayerLoading = ref(false)
function handleAddPoint () {
  if (inputMode.value === 'map') {
    enablePinMode()
  } else {
    // Wyciągnij prefix MGRS z centralnego punktu mapy
    if (map.value) {
      const center = map.value.getCenter()
      // Prefix MGRS: pierwsze 5 znaków
      const mgrsFull = mgrs.forward([center.lng, center.lat], 5)
      mgrsPrefix.value = mgrsFull.slice(0, 5)
    } else {
      mgrsPrefix.value = ''
    }
    mgrsEasting.value = ''
    mgrsNorthing.value = ''
    showGridDialog.value = true
  }
}

function buildMgrsReference (prefix, easting, northing) {
  const cleanPrefix = (prefix || '').trim().toUpperCase().replace(/\s+/g, '')
  const cleanEasting = (easting || '').trim()
  const cleanNorthing = (northing || '').trim()

  const resolvedPrefix = resolveMgrsPrefix(cleanPrefix)
  if (!resolvedPrefix) return null
  if (!/^\d+$/.test(cleanEasting) || !/^\d+$/.test(cleanNorthing)) return null

  const precision = Math.max(cleanEasting.length, cleanNorthing.length)
  if (precision < 2 || precision > 5) return null

  return resolvedPrefix + cleanEasting.padStart(precision, '0') + cleanNorthing.padStart(precision, '0')
}

function parseMgrsRouteReference (rawValue) {
  const cleanValue = (rawValue || '').trim().toUpperCase().replace(/\s+/g, '')
  if (!cleanValue) return null

  if (/^[0-9]{1,2}[C-HJ-NP-X][A-HJ-NP-Z]{2}\d{2,10}$/.test(cleanValue)) {
    const digitsMatch = /^[0-9]{1,2}[C-HJ-NP-X][A-HJ-NP-Z]{2}(\d+)$/.exec(cleanValue)
    if (!digitsMatch || digitsMatch[1].length % 2 !== 0) return null
    return cleanValue
  }

  const shortMatch = /^([A-HJ-NP-Z]{2})(\d{2,10})$/.exec(cleanValue)
  if (!shortMatch || shortMatch[2].length % 2 !== 0) return null

  const resolvedPrefix = resolveMgrsPrefix(shortMatch[1])
  if (!resolvedPrefix) return null

  return `${resolvedPrefix}${shortMatch[2]}`
}

function getPointMgrs (lat, lng) {
  try {
    return mgrs.forward([lng, lat], 5)
  } catch {
    return ''
  }
}

function getRoutePointMarkerIcon (index) {
  if (index === 0) return iconHome
  if (index === pins.value.length - 1) return iconFlag
  return iconPin
}

function getSpecialPointMarkerIcon (type) {
  if (type === 'PZPR') return iconPzpr
  if (type === 'MEDEVAC') return iconMedevac
  if (type === 'OP') return iconOp
  if (type === 'BAZA') return iconBaza
  return iconOther
}

function buildPointContext (kind, index) {
  const source = kind === 'route' ? pins.value[index] : specialPoints.value[index]
  if (!source) return null
  const mgrsAddress = getPointMgrs(source.lat, source.lng)
  const label = kind === 'route'
    ? `Punkt trasy ${index + 1}`
    : `${source.type}${source.name && source.name !== source.type ? ` - ${source.name}` : ''}`
  return {
    kind,
    index,
    lat: source.lat,
    lng: source.lng,
    mgrs: mgrsAddress,
    label,
    note: source.note || source.uwagi || '',
    type: source.type || 'route'
  }
}

function removePointHistoryEntry (kind, index) {
  pointHistory.value = pointHistory.value
    .filter(entry => !(entry.type === kind && entry.idx === index))
    .map(entry => {
      if (entry.type === kind && entry.idx > index) {
        return { ...entry, idx: entry.idx - 1 }
      }
      return entry
    })
}

function openPointActions (kind, index) {
  const context = buildPointContext(kind, index)
  if (!context) return
  selectedPointContext.value = context
  showPointActionsDialog.value = true
}

function navigateToSelectedPoint () {
  if (!selectedPointContext.value) return
  const context = selectedPointContext.value
  if (map.value && typeof map.value.getCenter === 'function' && typeof map.value.getZoom === 'function') {
    const center = map.value.getCenter()
    navigationStore.setMarchTableMapView({
      lat: center.lat,
      lng: center.lng,
      zoom: map.value.getZoom()
    })
  }
  navigationStore.setTarget({
    lat: context.lat,
    lng: context.lng,
    mgrs: context.mgrs,
    label: context.label,
    note: context.note,
    kind: context.kind,
    type: context.type
  })
  showPointActionsDialog.value = false
  router.push({ path: '/tools/navigate-to', query: { mapLayer: selectedMapLayer.value } }).catch(() => {})
}

function openPointNoteDialog () {
  if (!selectedPointContext.value) return
  pointNoteDraft.value = selectedPointContext.value.note || ''
  showPointActionsDialog.value = false
  showPointNoteDialog.value = true
}

function openPointEditDialog () {
  if (!selectedPointContext.value) return
  pointEditDraft.value = selectedPointContext.value.note || ''
  showPointActionsDialog.value = false
  showPointEditDialog.value = true
}

function savePointNote () {
  if (!selectedPointContext.value) return
  const context = selectedPointContext.value
  if (context.kind === 'route' && pins.value[context.index]) {
    pins.value[context.index].note = pointNoteDraft.value.trim()
  } else if (context.kind === 'special' && specialPoints.value[context.index]) {
    specialPoints.value[context.index].note = pointNoteDraft.value.trim()
  }
  showPointNoteDialog.value = false
  calculateRoute()
}

function savePointEdit () {
  if (!selectedPointContext.value) return
  const context = selectedPointContext.value
  if (context.kind === 'route' && pins.value[context.index]) {
    pins.value[context.index].note = pointEditDraft.value.trim()
  } else if (context.kind === 'special' && specialPoints.value[context.index]) {
    specialPoints.value[context.index].note = pointEditDraft.value.trim()
  }
  showPointEditDialog.value = false
  calculateRoute()
}

function deleteSelectedPoint () {
  if (!selectedPointContext.value) return
  const context = selectedPointContext.value
  if (context.kind === 'route') {
    pins.value.splice(context.index, 1)
    removePointHistoryEntry('pin', context.index)
  } else if (context.kind === 'special') {
    specialPoints.value.splice(context.index, 1)
    removePointHistoryEntry('special', context.index)
  }
  showPointEditDialog.value = false
  showPointActionsDialog.value = false
  selectedPointContext.value = null
  calculateRoute()
}

function buildMarchTableSnapshot () {
  const mapCenter = map.value && typeof map.value.getCenter === 'function' ? map.value.getCenter() : null
  return {
    pins: pins.value.map(pin => ({
      lat: pin.lat,
      lng: pin.lng,
      note: pin.note || ''
    })),
    specialPoints: specialPoints.value.map(point => ({
      lat: point.lat,
      lng: point.lng,
      type: point.type,
      name: point.name,
      note: point.note || ''
    })),
    history: pointHistory.value.map(entry => ({
      type: entry.type,
      idx: entry.idx
    })),
    inputMode: inputMode.value,
    showMgrsGrid: showMgrsGrid.value,
    mgrsZoneMode: mgrsZoneMode.value,
    manualMgrsZoneLabel: manualMgrsZoneLabel.value,
    selectedMapLayer: selectedMapLayer.value,
    search: search.value,
    mapView: mapCenter
      ? {
          lat: mapCenter.lat,
          lng: mapCenter.lng,
          zoom: typeof map.value.getZoom === 'function' ? map.value.getZoom() : 13
        }
      : null
  }
}

function applyMarchTableSnapshot (snapshot) {
  if (!snapshot) return false

  pins.value = Array.isArray(snapshot.pins)
    ? snapshot.pins.map(pin => ({
      lat: Number(pin.lat),
      lng: Number(pin.lng),
      note: pin.note || ''
    }))
    : []

  specialPoints.value = Array.isArray(snapshot.specialPoints)
    ? snapshot.specialPoints.map(point => ({
      lat: Number(point.lat),
      lng: Number(point.lng),
      type: point.type || 'INNY',
      name: point.name || point.type || 'INNY',
      note: point.note || ''
    }))
    : []

  pointHistory.value = Array.isArray(snapshot.history)
    ? snapshot.history.map(entry => ({
      type: entry.type,
      idx: entry.idx,
      marker: null
    }))
    : [
        ...pins.value.map((_, idx) => ({ type: 'pin', marker: null, idx })),
        ...specialPoints.value.map((_, idx) => ({ type: 'special', marker: null, idx }))
      ]

  inputMode.value = snapshot.inputMode || 'map'
  showMgrsGrid.value = !!snapshot.showMgrsGrid
  mgrsZoneMode.value = snapshot.mgrsZoneMode || 'auto'
  manualMgrsZoneLabel.value = snapshot.manualMgrsZoneLabel || ''
  search.value = snapshot.search || ''

  if (snapshot.selectedMapLayer && snapshot.selectedMapLayer !== selectedMapLayer.value) {
    selectedMapLayer.value = snapshot.selectedMapLayer
  }

  calculateRoute()
  return true
}

function persistMarchTableSession () {
  if (isRestoringMarchTable) return
  marchTableSessionStore.saveSnapshot(buildMarchTableSnapshot())
}

// Dodaje punkt do trasy i aktualizuje mapę/tabelę
function addPinToRoute (lat, lng) {
  pins.value.push({ lat, lng })
  pointHistory.value.push({ type: 'pin', marker: null, idx: pins.value.length - 1 })
  calculateRoute()
}

function addGridPoint () {
  if (!mgrsPrefix.value || !canResolveMgrsPrefix(mgrsPrefix.value) || mgrsEasting.value.length < 2 || mgrsEasting.value.length > 5 || mgrsNorthing.value.length < 2 || mgrsNorthing.value.length > 5) {
    $q.notify({ type: 'negative', message: 'Wypełnij wszystkie pola MGRS! Prefix musi mieć 2 lub 5 znaków, easting i northing od 2 do 5 cyfr.' })
    return
  }
  const mgrsFull = buildMgrsReference(mgrsPrefix.value, mgrsEasting.value, mgrsNorthing.value)
  if (!mgrsFull) {
    $q.notify({ type: 'negative', message: 'Nieprawidłowy adres MGRS!' })
    return
  }
  try {
    const [lng, lat] = mgrs.toPoint(mgrsFull)
    addPinToRoute(lat, lng)
    showGridDialog.value = false
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Nieprawidłowy adres MGRS!' })
  }
}

function addRoutePointFromMgrs () {
  const mgrsFull = parseMgrsRouteReference(routeMgrsInput.value)
  if (!mgrsFull) {
    $q.notify({ type: 'negative', message: 'Podaj pełny MGRS albo skrót zgodny z aktywną strefą.' })
    return
  }

  try {
    const [lng, lat] = mgrs.toPoint(mgrsFull)
    addPinToRoute(lat, lng)
    showRouteMgrsDialog.value = false
    routeMgrsInput.value = ''
    $q.notify({ type: 'positive', message: 'Dodano punkt do trasy.' })
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Nieprawidłowy adres MGRS!' })
  }
}
const iconHome = L.icon({
  iconUrl: '/icons/home.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconFlag = L.icon({
  iconUrl: '/icons/flag.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconPin = L.icon({
  iconUrl: '/icons/pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconPzpr = L.icon({
  iconUrl: '/icons/pzpr.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconMedevac = L.icon({
  iconUrl: '/icons/medevac.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconOp = L.icon({
  iconUrl: '/icons/op.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconBaza = L.icon({
  iconUrl: '/icons/baza.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})
const iconOther = L.icon({
  iconUrl: '/icons/other.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})

const search = ref('')
const map = ref(null)
const pins = ref([])
const markers = ref([])
const polylines = ref([])
// Stack historii: każdy wpis to { type: 'pin'|'special', marker, idx }
const pointHistory = ref([])
const pinMode = ref(false)
const routeTable = ref([])

// Lokalizacja użytkownika
const userLocationMarker = ref(null)
const userLocation = ref(null)
const showUserLocationDialog = ref(false)

const showInfoDialog = ref(false)
const showPointActionsDialog = ref(false)
const showPointNoteDialog = ref(false)
const showPointEditDialog = ref(false)
const pointNoteDraft = ref('')
const pointEditDraft = ref('')
const selectedPointContext = ref(null)
// --- Special Points State ---
const showSpecialDialog = ref(false)
const showSpecialMgrsInputs = ref(false)
const specialType = ref('')
const specialCustomName = ref('')
const specialTypes = [
  { label: 'PZPR', value: 'PZPR' },
  { label: 'MEDEVAC', value: 'MEDEVAC' },
  { label: 'OP', value: 'OP' },
  { label: 'BAZA', value: 'BAZA' },
  { label: 'INNY', value: 'INNY' }
]
const specialPoints = ref([]) // {lat, lng, type, name}
let addSpecialMode = false

// Tryb dodawania punktów: 'map' (domyślnie) lub 'grid'
const inputMode = ref('map')
function handleSpecialDialogOk () {
  if (inputMode.value === 'grid' || showSpecialMgrsInputs.value) {
    if (!specialMgrsPrefix.value || !canResolveMgrsPrefix(specialMgrsPrefix.value) || specialMgrsEasting.value.length < 2 || specialMgrsEasting.value.length > 5 || specialMgrsNorthing.value.length < 2 || specialMgrsNorthing.value.length > 5) {
      $q.notify({ type: 'negative', message: 'Wypełnij wszystkie pola MGRS! Prefix musi mieć 2 lub 5 znaków, easting i northing od 2 do 5 cyfr.' })
      return
    }
    const mgrsFull = buildMgrsReference(specialMgrsPrefix.value, specialMgrsEasting.value, specialMgrsNorthing.value)
    if (!mgrsFull) {
      $q.notify({ type: 'negative', message: 'Nieprawidłowy adres MGRS!' })
      return
    }
    try {
      const [lng, lat] = mgrs.toPoint(mgrsFull)
      specialPoints.value.push({ lat, lng, type: specialType.value, name: specialCustomName.value || specialType.value, note: '' })
      pointHistory.value.push({ type: 'special', marker: null, idx: specialPoints.value.length - 1 })
      showSpecialDialog.value = false
      showSpecialMgrsInputs.value = false
      addSpecialMode = false
      calculateRoute()
      return
    } catch (e) {
      $q.notify({ type: 'negative', message: 'Nieprawidłowy adres MGRS!' })
      return
    }
  }
  showSpecialDialog.value = false
  addSpecialMode = true
}
// Inputy do dialogu punktu specjalnego (grid)
const specialMgrsPrefix = ref('')
const specialMgrsEasting = ref('')
const specialMgrsNorthing = ref('')

watch(showSpecialDialog, (val) => {
  if (val && inputMode.value === 'grid' && map.value) {
    const center = map.value.getCenter()
    const mgrsFull = mgrs.forward([center.lng, center.lat], 5)
    specialMgrsPrefix.value = mgrsFull.slice(0, 5)
    specialMgrsEasting.value = ''
    specialMgrsNorthing.value = ''
  }
  // Resetuj flagę gdy dialog jest zamykany
  if (!val) {
    showSpecialMgrsInputs.value = false
  }
})

const columns = [
  { name: 'lp', label: 'Lp.', field: 'lp', align: 'left' },
  { name: 'strefa', label: 'Strefa', field: 'zoneLabel', align: 'left' },
  { name: 'mgrs', label: 'MGRS', field: 'mgrs', align: 'left' },
  // { name: 'easting', label: 'Easting (UTM)', field: 'easting', align: 'left' },
  // { name: 'northing', label: 'Northing (UTM)', field: 'northing', align: 'left' },
  { name: 'azymut', label: 'Azymut', field: 'azymut', align: 'left' },
  { name: 'azymutBusola', label: 'Azymut busola', field: 'azymutBusola', align: 'left' },
  { name: 'odleglosc', label: 'Odległość (m)', field: 'odleglosc', align: 'left' },
  { name: 'uwagi', label: 'Uwagi', field: 'uwagi', align: 'left' }
]

// Columns for special points table
const specialColumns = [
  { name: 'type', label: 'Typ', field: 'type', align: 'left' },
  { name: 'strefa', label: 'Strefa', field: 'zoneLabel', align: 'left' },
  { name: 'mgrs', label: 'MGRS', field: 'mgrs', align: 'left' }
]

// Compute display rows for special points table
const specialPointsTable = computed(() => {
  return specialPoints.value.map((pt, idx) => {
    // MGRS conversion
    let mgrsStr = ''
    let zoneLabel = ''
    try {
      mgrsStr = mgrs.forward([pt.lng, pt.lat], 5)
      zoneLabel = getZoneLabelFromLatLng(pt.lat, pt.lng)
    } catch (e) {}
    return {
      __rowKey: pt.__rowKey,
      type: pt.type,
      zoneLabel,
      name: pt.name,
      mgrs: mgrsStr,
      azymut: '-',
      odleglosc: '-'
    }
  })
})

// Add a unique row key for q-table
function addSpecialPointRowKey () {
  specialPoints.value.forEach((pt, idx) => {
    pt.__rowKey = idx + '-' + pt.type + '-' + pt.name + '-' + pt.lat + '-' + pt.lng
  })
}

watchEffect(() => {
  addSpecialPointRowKey()
})

const isMobile = computed(() => $q.screen.width < 600)

const showEtaDialog = ref(false)
const showPdfDialog = ref(false)
const pdfOptions = ref([])
const pdfMapOptions = ref([])
const pdfCustomName = ref('')
const pdfSelectedName = ref('')
const predefinedRouteNames = [
  'Trasa A',
  'Trasa B',
  'Trasa C',
  'Trasa powrotna A',
  'Trasa powrotna B',
  'Trasa powrotna C'
]

function onCustomNameInput (val) {
  if (val && pdfSelectedName.value) {
    pdfSelectedName.value = ''
  }
}
function onDropdownSelect (val) {
  if (val && pdfCustomName.value) {
    pdfCustomName.value = ''
  }
}
const terrainTypes = ['ciężki', 'średni', 'łatwy']
const terrainSpeeds = { ciężki: 1.5, średni: 3, łatwy: 5 }
const etaSegments = reactive([])
const breakEvery = ref(60)
const breakLength = ref(10)
const breakEveryOptions = [30, 45, 60, 90]
const breakLengthOptions = [5, 10, 15]

const currentMapZoneLabel = ref('')
const mgrsZoneMode = ref('auto')
const manualMgrsZoneLabel = ref('')
const mgrsZoneModeOptions = [
  { label: 'Auto', value: 'auto' },
  { label: 'Ręczna', value: 'manual' }
]

function formatZoneLabel (zoneNum, zoneLetter) {
  if (typeof zoneNum !== 'number' || !zoneLetter) return ''
  return `${zoneNum}${zoneLetter}`
}

function compareZoneLabels (left, right) {
  const leftMatch = /^([0-9]{1,2})([A-Z])$/.exec(left || '')
  const rightMatch = /^([0-9]{1,2})([A-Z])$/.exec(right || '')
  const leftZone = leftMatch ? Number(leftMatch[1]) : 0
  const rightZone = rightMatch ? Number(rightMatch[1]) : 0
  if (leftZone !== rightZone) return leftZone - rightZone
  return (leftMatch ? leftMatch[2].charCodeAt(0) : 0) - (rightMatch ? rightMatch[2].charCodeAt(0) : 0)
}

function getZoneLabelFromLatLng (lat, lng) {
  try {
    const utmPoint = utm.fromLatLon(lat, lng)
    return formatZoneLabel(utmPoint.zoneNum, utmPoint.zoneLetter)
  } catch {
    return ''
  }
}

function resolveMgrsPrefix (prefix) {
  const cleanPrefix = (prefix || '').trim().toUpperCase().replace(/\s+/g, '')
  if (/^[0-9]{1,2}[C-HJ-NP-X][A-HJ-NP-Z]{2}$/.test(cleanPrefix)) {
    return cleanPrefix
  }
  if (/^[A-HJ-NP-Z]{2}$/.test(cleanPrefix)) {
    const zoneLabel = activeMgrsZoneLabel.value || currentMapZoneLabel.value
    if (!zoneLabel) return null
    return `${zoneLabel}${cleanPrefix}`
  }
  return null
}

function canResolveMgrsPrefix (prefix) {
  return !!resolveMgrsPrefix(prefix)
}

function normalizeMgrsSearchInput (rawValue) {
  const cleanValue = (rawValue || '').trim().toUpperCase().replace(/\s+/g, '')
  if (/^[0-9]{1,2}[C-HJ-NP-X][A-HJ-NP-Z]{2}\d+$/.test(cleanValue)) {
    return cleanValue
  }

  const shortMatch = /^([A-HJ-NP-Z]{2})(\d+)$/.exec(cleanValue)
  if (!shortMatch) return null

  const resolvedPrefix = resolveMgrsPrefix(shortMatch[1])
  if (!resolvedPrefix) return null

  return `${resolvedPrefix}${shortMatch[2]}`
}

const activeMgrsZoneLabel = computed(() => {
  if (mgrsZoneMode.value === 'manual' && manualMgrsZoneLabel.value) {
    return manualMgrsZoneLabel.value
  }
  return currentMapZoneLabel.value || manualMgrsZoneLabel.value || ''
})

const mgrsZoneOptions = computed(() => {
  const labels = new Set()
  if (currentMapZoneLabel.value) labels.add(currentMapZoneLabel.value)
  routeTable.value.forEach(row => {
    if (row.zoneLabel) labels.add(row.zoneLabel)
  })
  if (manualMgrsZoneLabel.value) labels.add(manualMgrsZoneLabel.value)
  return Array.from(labels).sort(compareZoneLabels)
})

// Synchronizuj etaSegments z routeTable
watchEffect(() => {
  etaSegments.length = 0
  for (let i = 1; i < routeTable.value.length; i++) {
    etaSegments.push({
      idx: i,
      terrain: 'średni',
      distance: parseFloat(routeTable.value[i].odleglosc)
    })
  }
})

const showPaletteDialog = ref(false)
const showColorPickerDialog = ref(false)
const selectedPaletteIdx = ref(0)
const paletteItems = reactive([
  { key: 'mgrs', label: 'Siatka MGRS', color: '#008800' },
  { key: 'route', label: 'Linie marszu', color: '#888888' },
  { key: 'marker', label: 'Markery trasy', color: '#808080' }
])
const colorMgrsGrid = ref(paletteItems[0].color)
const colorRouteLine = ref(paletteItems[1].color)
const colorRouteMarker = ref(paletteItems[2].color)

function openColorPicker (idx) {
  selectedPaletteIdx.value = idx
  showColorPickerDialog.value = true
}

function onPaletteColorChange (val) {
  // Synchronizuj kolory z resztą aplikacji
  colorMgrsGrid.value = paletteItems[0].color
  colorRouteLine.value = paletteItems[1].color
  colorRouteMarker.value = paletteItems[2].color
  updateColorsInEditor()
  // Synchronizuj z edytorem trasy (np. podgląd, mapy, markery)
  if (selectedPaletteIdx.value === 0) {
    // Siatka MGRS
    colorMgrsGrid.value = val
  } else if (selectedPaletteIdx.value === 1) {
    // Linie marszu
    colorRouteLine.value = val
  } else if (selectedPaletteIdx.value === 2) {
    // Markery trasy
    colorRouteMarker.value = val
  }
  updateColorsInEditor()
}

// Dynamiczna maska koloru markerów SVG przez CSS filter
watch(colorRouteMarker, (val) => {
  const styleTagId = 'dynamic-marker-filter-style'
  let styleTag = document.getElementById(styleTagId)
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = styleTagId
    document.head.appendChild(styleTag)
  }
  // Filter: czarny SVG + maska koloru
  styleTag.textContent = `.leaflet-marker-icon[src$='.svg'] { filter: brightness(0) saturate(100%) sepia(1) hue-rotate(0deg) drop-shadow(0 0 0 ${val}); }`
})

function updateColorsInEditor () {
  // Zmień kolor siatki MGRS
  if (map.value && map.value._mgrsGridLayer) {
    const gridLayer = map.value._mgrsGridLayer
    // Przerysuj kafle siatki z nowym kolorem
    if (gridLayer._tiles) {
      Object.values(gridLayer._tiles).forEach(tileObj => {
        const tile = tileObj.el
        if (tile && tile.getContext) {
          const ctx = tile.getContext('2d')
          ctx.clearRect(0, 0, tile.width, tile.height)
        }
      })
      gridLayer.redraw && gridLayer.redraw()
    }
  }
  // Zmień kolor linii marszu
  polylines.value.forEach(l => {
    if (l.setStyle) l.setStyle({ color: colorRouteLine.value })
    if (l.setStyle && l.options && l.options.radius) {
      l.setStyle({ fillColor: colorRouteMarker.value, color: colorRouteMarker.value })
    }
  })
}

const etaResult = computed(() => {
  let totalDist = 0
  let totalTime = 0 // w minutach
  let timeSinceBreak = 0
  etaSegments.forEach(seg => {
    const speed = terrainSpeeds[seg.terrain] // km/h
    const distKm = seg.distance / 1000
    const time = distKm / speed * 60 // min
    totalDist += distKm
    totalTime += time
    timeSinceBreak += time
    if (timeSinceBreak >= breakEvery.value) {
      totalTime += breakLength.value
      timeSinceBreak = 0
    }
  })
  return { totalTime, totalDist }
})

function formatEta (result) {
  const minutes = result.totalTime
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  return `${h > 0 ? h + 'h ' : ''}${m}min (${result.totalDist.toFixed(2)} km)`
}

// Prosta funkcja debounce
function debounce (fn, delay) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Debounce dla generowania siatki MGRS i rerenderowania elementów mapy
const debouncedMapRerender = debounce(() => {
  if (!map.value) return
  if (showMgrsGrid.value) {
    // Siatka MGRS
    if (map.value._mgrsGridLayer) {
      map.value.removeLayer(map.value._mgrsGridLayer)
      map.value._mgrsGridLayer = null
    }
    const overlayPane = map.value.getPanes().overlayPane
    if (overlayPane) {
      Array.from(overlayPane.querySelectorAll('canvas.leaflet-mgrs-grid')).forEach(c => c.remove())
    }
    const layers = drawMgrsGrid(map.value, false)
    if (layers && layers.length > 0) {
      map.value._mgrsGridLayer = layers[0]
    }
    setTimeout(() => {
      const overlayPane2 = map.value.getPanes().overlayPane
      const mgrsCanvas = overlayPane2 && overlayPane2.querySelector('canvas.leaflet-mgrs-grid')
      if (!mgrsCanvas && showMgrsGrid.value) {
        if (map.value._mgrsGridLayer) {
          map.value.removeLayer(map.value._mgrsGridLayer)
          map.value._mgrsGridLayer = null
        }
        const layers2 = drawMgrsGrid(map.value, false)
        if (layers2 && layers2.length > 0) {
          map.value._mgrsGridLayer = layers2[0]
        }
      }
    }, 400)
  }
  rerenderMapElements()
}, 650)

async function searchArea () {
  if (!search.value) return
  const normalizedMgrs = normalizeMgrsSearchInput(search.value)
  if (normalizedMgrs) {
    try {
      const digitPart = normalizedMgrs.slice(normalizedMgrs.match(/^[0-9]{1,2}[C-HJ-NP-X][A-HJ-NP-Z]{2}/)?.[0].length || 0)
      if (digitPart.length % 2 !== 0) {
        $q.notify({ type: 'negative', message: 'MGRS musi mieć parzystą liczbę cyfr po strefie i kwadracie 100 km.' })
        return
      }
      const [lng, lat] = mgrs.toPoint(normalizedMgrs)
      if (map.value) map.value.setView([lat, lng], 15)
      return
    } catch (e) {
      $q.notify({ type: 'negative', message: 'Nie udało się odczytać MGRS dla wybranej strefy roboczej.' })
      return
    }
  }
  // Wyszukiwanie po nazwie przez Nominatim
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search.value)}`
  try {
    const res = await fetch(url)
    const data = await res.json()
    if (data && data.length > 0) {
      const { lat, lon } = data[0]
      if (map.value) map.value.setView([parseFloat(lat), parseFloat(lon)], 13)
    } else {
      // Możesz dodać powiadomienie o braku wyników
    }
  } catch (e) {
    // Możesz dodać obsługę błędów
  }
}

function enablePinMode () {
  pinMode.value = true
}

// Centralny rerender wszystkich elementów mapy
function rerenderMapElements () {
  if (!map.value) return
  // Usuń markery trasy
  markers.value.forEach(marker => {
    try { map.value.removeLayer(marker) } catch (e) {}
  })
  markers.value = []
  const routeMarkersByIndex = []
  // Dodaj markery trasy
  pins.value.forEach((p, idx) => {
    const marker = L.marker([p.lat, p.lng], { icon: getRoutePointMarkerIcon(idx) }).addTo(map.value)
    marker.on('click', () => openPointActions('route', idx))
    markers.value.push(marker)
    routeMarkersByIndex[idx] = marker
  })
  // Usuń i dodaj markery specjalne
  pointHistory.value.forEach(entry => {
    if (entry.type === 'special' && entry.marker) {
      try { map.value.removeLayer(entry.marker) } catch (e) {}
    }
  })
  const specialMarkersByIndex = []
  specialPoints.value.forEach((pt, idx) => {
    const marker = L.marker([pt.lat, pt.lng], { icon: getSpecialPointMarkerIcon(pt.type) }).addTo(map.value)
    marker.on('click', () => openPointActions('special', idx))
    specialMarkersByIndex[idx] = marker
  })
  pointHistory.value.forEach(entry => {
    if (entry.type === 'pin' && routeMarkersByIndex[entry.idx]) {
      entry.marker = routeMarkersByIndex[entry.idx]
    }
    if (entry.type === 'special' && specialMarkersByIndex[entry.idx]) {
      entry.marker = specialMarkersByIndex[entry.idx]
    }
  })
  // Usuń i dodaj linie trasy
  polylines.value.forEach(l => map.value && map.value.removeLayer(l))
  polylines.value = []
  if (pins.value.length > 1) {
    const latlngs = pins.value.map(p => [p.lat, p.lng])
    const polyline = L.polyline(latlngs, { color: colorRouteLine.value || '#888', weight: 2 }).addTo(map.value)
    polylines.value.push(polyline)
    pins.value.forEach(p => {
      const greyDot = L.circleMarker([p.lat, p.lng], {
        radius: 4,
        color: 'grey',
        fillColor: 'grey',
        fillOpacity: 1,
        weight: 0
      }).addTo(map.value)
      polylines.value.push(greyDot)
    })
  }
}

function clearAll () {
  // Usuń wszystkie markery trasowe z mapy
  if (map.value) {
    markers.value.forEach(marker => {
      try { map.value.removeLayer(marker) } catch (e) {}
    })
    // Usuń wszystkie markery specjalne z mapy
    pointHistory.value.forEach(entry => {
      if (entry.marker) {
        try { map.value.removeLayer(entry.marker) } catch (e) {}
      }
    })
    // Usuń wszystkie linie z mapy
    polylines.value.forEach(l => {
      try { map.value.removeLayer(l) } catch (e) {}
    })
    // Usuń marker lokalizacji użytkownika
    if (userLocationMarker.value) {
      try { map.value.removeLayer(userLocationMarker.value) } catch (e) {}
      userLocationMarker.value = null
      userLocation.value = null
    }
  }
  pins.value = []
  specialPoints.value = []
  routeTable.value = []
  markers.value = []
  polylines.value = []
  pointHistory.value = []
  showPointActionsDialog.value = false
  showPointNoteDialog.value = false
  showPointEditDialog.value = false
  selectedPointContext.value = null
  pointNoteDraft.value = ''
  pointEditDraft.value = ''
  navigationStore.setMarchTableMapView(null)
  marchTableSessionStore.clearSnapshot()
}

const locating = ref(false)

function centerOnUserLocation () {
  if (!map.value) return
  locating.value = true
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        userLocation.value = { lat: latitude, lng: longitude }

        // Usuń stary marker lokalizacji użytkownika, jeśli istnieje
        if (userLocationMarker.value) {
          map.value.removeLayer(userLocationMarker.value)
          userLocationMarker.value = null
        }

        map.value.setView([latitude, longitude], 15, { animate: false })
        // Wymuś przeliczenie rozmiaru mapy i ponowne rysowanie siatki po centrowaniu
        setTimeout(() => {
          map.value.invalidateSize()
          rerenderMapElements()
          // Reset transformacji canvasu siatki MGRS
          const overlayPane = map.value.getPanes().overlayPane
          if (overlayPane) {
            overlayPane.style.transform = 'none'
          }
          if (map.value._mgrsGridLayer && map.value._mgrsGridLayer._canvas) {
            map.value._mgrsGridLayer._canvas.style.transform = 'none'
          }
          if (map.value._mgrsGridLayer && typeof map.value._mgrsGridLayer._draw === 'function') {
            map.value._mgrsGridLayer._draw()
          }

          // Dodaj marker lokalizacji użytkownika z pulsującym efektem
          const pulsingIcon = L.divIcon({
            className: 'user-location-marker',
            html: '<div class="pulse-ring"></div><div class="pulse-dot"></div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })

          userLocationMarker.value = L.marker([latitude, longitude], { icon: pulsingIcon }).addTo(map.value)

          // Dodaj event listener na kliknięcie markera
          userLocationMarker.value.on('click', () => {
            showUserLocationDialog.value = true
          })
        }, 400)
        locating.value = false
        $q.notify({ type: 'positive', message: 'Ustawiono widok na Twoją lokalizację.' })
      },
      (err) => {
        locating.value = false
        $q.notify({ type: 'negative', message: `${err.message}` })
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  } else {
    locating.value = false
    $q.notify({ type: 'negative', message: 'Geolokalizacja nie jest obsługiwana.' })
  }
}

function addUserLocationAsRoute () {
  if (!userLocation.value) return
  addPinToRoute(userLocation.value.lat, userLocation.value.lng)
  showUserLocationDialog.value = false
  $q.notify({ type: 'positive', message: 'Dodano lokalizację jako punkt trasy' })
}

async function addUserLocationAsSpecial () {
  if (!userLocation.value) return
  showUserLocationDialog.value = false
  specialPoints.value.push({
    lat: userLocation.value.lat,
    lng: userLocation.value.lng,
    type: 'INNY',
    name: 'Lokalizacja użytkownika',
    note: ''
  })
  pointHistory.value.push({ type: 'special', marker: null, idx: specialPoints.value.length - 1 })
  calculateRoute()
  $q.notify({ type: 'positive', message: 'Dodano lokalizację jako punkt specjalny' })
}

function calculateRoute () {
  const normalizeAzimuth = (value) => {
    const normalized = ((value % 360) + 360) % 360
    return Math.round(normalized)
  }
  // Update route table
  routeTable.value = []
  let areaDeclinationDeg = null
  try {
    let lat = null
    let lng = null
    if (map.value && typeof map.value.getCenter === 'function') {
      const center = map.value.getCenter()
      lat = center.lat
      lng = center.lng
    } else if (pins.value.length > 0) {
      lat = pins.value[0].lat
      lng = pins.value[0].lng
    }
    if (typeof lat === 'number' && typeof lng === 'number') {
      currentMapZoneLabel.value = getZoneLabelFromLatLng(lat, lng)
      const model = geomagnetism.model(new Date())
      areaDeclinationDeg = model.point([lat, lng]).decl
    }
  } catch (e) {}

  for (let i = 0; i < pins.value.length; i++) {
    let azymut = '-'
    let azymutBusola = '-'
    let odleglosc = '-'
    let mgrsStr = ''
    let utmE = '-'
    let utmN = '-'
    let zoneLabel = ''
    try {
      mgrsStr = mgrs.forward([pins.value[i].lng, pins.value[i].lat], 5)
      const utmRes = utm.fromLatLon(pins.value[i].lat, pins.value[i].lng)
      utmE = Math.round(utmRes.easting)
      utmN = Math.round(utmRes.northing)
      zoneLabel = formatZoneLabel(utmRes.zoneNum, utmRes.zoneLetter)
    } catch (e) {}
    if (i > 0) {
      const prev = pins.value[i - 1]
      const curr = pins.value[i]
      // Calculate azimuth (bearing)
      const dLon = (curr.lng - prev.lng) * Math.PI / 180
      const y = Math.sin(dLon) * Math.cos(curr.lat * Math.PI / 180)
      const x = Math.cos(prev.lat * Math.PI / 180) * Math.sin(curr.lat * Math.PI / 180) -
        Math.sin(prev.lat * Math.PI / 180) * Math.cos(curr.lat * Math.PI / 180) * Math.cos(dLon)
      let brng = Math.atan2(y, x) * 180 / Math.PI
      brng = (brng + 360) % 360
      azymut = Math.round(brng)
      if (typeof areaDeclinationDeg === 'number') {
        azymutBusola = normalizeAzimuth(brng - areaDeclinationDeg)
      }
      // Calculate distance (meters)
      const R = 6371000
      const dLat = (curr.lat - prev.lat) * Math.PI / 180
      const dLng = (curr.lng - prev.lng) * Math.PI / 180
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(prev.lat * Math.PI / 180) * Math.cos(curr.lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      odleglosc = Math.round(R * c)
    }
    routeTable.value.push({
      lp: i + 1,
      zoneLabel,
      mgrs: mgrsStr,
      easting: utmE,
      northing: utmN,
      azymut,
      azymutBusola,
      odleglosc: i === 0 ? '-' : odleglosc,
      uwagi: pins.value[i].note || ''
    })
  }

  rerenderMapElements()
  persistMarchTableSession()
}

// Eksport PDF
// Rysowanie linii trasy na canvasie PDF
function ctxDrawRouteLinesOnCanvas (canvas, map, pins) {
  if (!pins || pins.length < 2) return
  const ctx = canvas.getContext('2d')
  ctx.save()
  // Synchronize with editor route style
  // Use user-selected color
  const routeColor = (typeof colorRouteLine.value !== 'undefined' && colorRouteLine.value) ? colorRouteLine.value : '#888'
  const routeWidth = 2 // default, update if dynamic
  ctx.strokeStyle = routeColor
  ctx.lineWidth = routeWidth
  ctx.beginPath()
  for (let i = 1; i < pins.length; i++) {
    const prev = map.latLngToContainerPoint([pins[i - 1].lat, pins[i - 1].lng])
    const curr = map.latLngToContainerPoint([pins[i].lat, pins[i].lng])
    ctx.moveTo(prev.x, prev.y)
    ctx.lineTo(curr.x, curr.y)
  }
  ctx.stroke()
  ctx.restore()
}

// Rysowanie markerów trasy na canvasie PDF
function ctxDrawRouteMarkersOnCanvas (canvas, map, pins) {
  if (!pins || pins.length === 0) return
  const ctx = canvas.getContext('2d')
  ctx.save()
  const markerColor = (typeof colorRouteMarker.value !== 'undefined' && colorRouteMarker.value) ? colorRouteMarker.value : 'grey'
  for (let i = 0; i < pins.length; i++) {
    const p = map.latLngToContainerPoint([pins[i].lat, pins[i].lng])
    ctx.beginPath()
    ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI)
    ctx.fillStyle = markerColor
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()
  }
  ctx.restore()
}
function handlePdfExport () {
  showPdfDialog.value = false
  showLoading('Generowanie PDF...')
  let routeName = ''
  if (pdfOptions.value.includes('name')) {
    routeName = pdfCustomName.value || pdfSelectedName.value || 'Tabela marszu'
  }
  if (pdfOptions.value.includes('map') && map.value) {
    // Tymczasowo ukryj linie trasy i markery jeśli nie są zaznaczone
    const showLines = pdfMapOptions.value.includes('routeLines')
    const showMarkers = pdfMapOptions.value.includes('routeMarkers')
    // Ukryj linie trasy
    polylines.value.forEach(l => {
      if (!showLines) l.setStyle({ opacity: 0 })
      else l.setStyle({ opacity: 1 })
    })
    // Ukryj markery
    markers.value.forEach(m => {
      if (!showMarkers) m.setOpacity(0)
      else m.setOpacity(1)
    })

    // leaflet-image wymaga iconUrl; tymczasowo usuń markery bez obrazka (np. divIcon)
    const detachedMarkers = []
    map.value.eachLayer(layer => {
      if (!(layer instanceof L.Marker)) return
      const iconUrl = layer?.options?.icon?.options?.iconUrl
      if (typeof iconUrl !== 'string' || iconUrl.length === 0) {
        if (map.value.hasLayer(layer)) {
          map.value.removeLayer(layer)
          detachedMarkers.push(layer)
        }
      }
    })

    map.value.invalidateSize()
    map.value.setZoom(map.value.getZoom()) // force repaint
    map.value.eachLayer(l => {
      if (l.redraw) l.redraw()
    })
    polylines.value.forEach(l => l.redraw())
    // Wait for two animation frames and a longer timeout to ensure overlays are painted
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          leafletImage(map.value, function (err, canvas) {
            let mapImgData = null
            let mapImgDims = null
            if (!err && canvas) {
              // Rysuj siatkę MGRS tylko jeśli wybrano checkbox
              if (pdfMapOptions.value.includes('mgrsGrid')) {
                drawMgrsGridOnCanvas(canvas, map.value, map.value.getBounds())
              }
              // Rysuj linie trasy tylko jeśli wybrano checkbox
              if (pdfMapOptions.value.includes('routeLines')) {
                ctxDrawRouteLinesOnCanvas(canvas, map.value, pins.value)
              }
              // Rysuj markery trasy tylko jeśli wybrano checkbox
              if (pdfMapOptions.value.includes('routeMarkers')) {
                ctxDrawRouteMarkersOnCanvas(canvas, map.value, pins.value)
              }
              mapImgData = canvas.toDataURL('image/png')
              mapImgDims = { width: canvas.width, height: canvas.height }
            }
            // Przywróć widoczność linii i markerów
            polylines.value.forEach(l => l.setStyle({ opacity: 1 }))
            markers.value.forEach(m => m.setOpacity(1))
            detachedMarkers.forEach(marker => marker.addTo(map.value))

            if (err) {
              $q.notify({ type: 'warning', message: 'Nie udało się dodać obrazu mapy do PDF. Zapisano dokument bez mapy.' })
            }

            exportPDF(routeName, mapImgData, mapImgDims)
            hideLoading()
            pdfMapOptions.value = []
          })
        }, 400)
      })
    })
  } else {
    // (Brak gridLayers do usuwania w tym bloku)
    exportPDF(routeName, null, null)
    hideLoading()
  }
}

// Helper to draw MGRS grid on a canvas
function drawMgrsGridOnCanvas (canvas, map, bounds) {
  const ctx = canvas.getContext('2d')
  const gridColor = (typeof colorMgrsGrid.value !== 'undefined' && colorMgrsGrid.value) ? colorMgrsGrid.value : '#008800'

  // 1) Najpierw próbujemy skopiować już narysowaną siatkę z kafli warstwy MGRS
  // To gwarantuje zgodność 1:1 z widokiem na mapie i eliminuje błędy projekcji.
  let copiedGridTiles = false
  const mapEl = map.getContainer && map.getContainer()
  if (mapEl) {
    const mapRect = mapEl.getBoundingClientRect()
    const gridTiles = mapEl.querySelectorAll('.leaflet-mgrs-grid-tile')
    gridTiles.forEach((tile) => {
      if (!(tile instanceof HTMLCanvasElement)) return
      const rect = tile.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return
      const x = rect.left - mapRect.left
      const y = rect.top - mapRect.top
      try {
        ctx.drawImage(tile, x, y, rect.width, rect.height)
        copiedGridTiles = true
      } catch {}
    })
  }
  if (copiedGridTiles) return

  // 2) Fallback: ręczne rysowanie siatki (gdy warstwa MGRS nie jest aktywna na mapie)
  const sw = bounds.getSouthWest()
  const ne = bounds.getNorthEast()
  const zoom = map.getZoom ? map.getZoom() : 13
  let gridStep = 1000
  if (zoom < 6) gridStep = 10000
  if (zoom < 4) gridStep = 100000

  const minLat = Math.min(sw.lat, ne.lat)
  const maxLat = Math.max(sw.lat, ne.lat)
  const minLng = Math.min(sw.lng, ne.lng)
  const maxLng = Math.max(sw.lng, ne.lng)

  // Dla fallbacku używamy strefy ze środka widoku
  let zoneNum = 34
  let zoneLetter = 'U'
  try {
    const center = map.getCenter()
    const centerUtm = utm.fromLatLon(center.lat, center.lng)
    zoneNum = centerUtm.zoneNum
    zoneLetter = centerUtm.zoneLetter
  } catch {}

  let minE = Infinity; let maxE = -Infinity; let minN = Infinity; let maxN = -Infinity
  const samplePoints = [
    [minLat, minLng], [minLat, maxLng], [maxLat, minLng], [maxLat, maxLng],
    [(minLat + maxLat) / 2, (minLng + maxLng) / 2]
  ]
  samplePoints.forEach(([lat, lng]) => {
    try {
      const utmPt = utm.fromLatLon(lat, lng, zoneNum)
      minE = Math.min(minE, utmPt.easting)
      maxE = Math.max(maxE, utmPt.easting)
      minN = Math.min(minN, utmPt.northing)
      maxN = Math.max(maxN, utmPt.northing)
    } catch {}
  })

  minE = Math.floor(minE / gridStep) * gridStep
  maxE = Math.ceil(maxE / gridStep) * gridStep
  minN = Math.floor(minN / gridStep) * gridStep
  maxN = Math.ceil(maxN / gridStep) * gridStep

  ctx.strokeStyle = gridColor
  ctx.fillStyle = gridColor
  ctx.lineWidth = 1
  ctx.font = 'bold 12px Arial'

  // Pionowe (easting)
  let eIdx = 0
  const eLabelEvery = zoom >= 11 ? 1 : (zoom >= 8 ? 2 : 3)
  for (let e = minE; e <= maxE; e += gridStep) {
    const points = []
    for (let i = 0; i <= 20; i++) {
      const n = minN + ((maxN - minN) * i / 20)
      try {
        const ll = utm.toLatLon(e, n, zoneNum, zoneLetter)
        points.push([ll.latitude, ll.longitude])
      } catch {}
    }
    if (points.length < 2) continue

    ctx.beginPath()
    points.forEach((ll, i) => {
      const p = map.latLngToContainerPoint(ll)
      if (i === 0) ctx.moveTo(p.x, p.y)
      else ctx.lineTo(p.x, p.y)
    })
    ctx.stroke()

    if (eIdx % eLabelEvery === 0) {
      for (let i = 0; i < points.length; i++) {
        const p = map.latLngToContainerPoint(points[i])
        if (p.y >= 0 && p.y <= 25 && p.x >= 10 && p.x <= canvas.width - 10) {
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillText(String(Math.floor(e / gridStep)).padStart(2, '0').slice(-2), p.x, 2)
          break
        }
      }
    }
    eIdx++
  }

  // Poziome (northing)
  let nIdx = 0
  const nLabelEvery = zoom >= 11 ? 1 : (zoom >= 8 ? 2 : 3)
  for (let n = minN; n <= maxN; n += gridStep) {
    const points = []
    for (let i = 0; i <= 20; i++) {
      const e = minE + ((maxE - minE) * i / 20)
      try {
        const ll = utm.toLatLon(e, n, zoneNum, zoneLetter)
        points.push([ll.latitude, ll.longitude])
      } catch {}
    }
    if (points.length < 2) continue

    ctx.beginPath()
    points.forEach((ll, i) => {
      const p = map.latLngToContainerPoint(ll)
      if (i === 0) ctx.moveTo(p.x, p.y)
      else ctx.lineTo(p.x, p.y)
    })
    ctx.stroke()

    if (nIdx % nLabelEvery === 0) {
      for (let i = 0; i < points.length; i++) {
        const p = map.latLngToContainerPoint(points[i])
        if (p.x >= 0 && p.x <= 25 && p.y >= 10 && p.y <= canvas.height - 10) {
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          ctx.fillText(String(Math.floor(n / gridStep)).padStart(2, '0').slice(-2), 2, p.y)
          break
        }
      }
    }
    nIdx++
  }
}

// Nowa warstwa siatki MGRS na bazie L.GridLayer
const MGRSGridLayer = L.GridLayer.extend({
  createTile: function (coords) {
    const tile = L.DomUtil.create('canvas', 'leaflet-mgrs-grid-tile')
    const size = this.getTileSize()
    tile.width = size.x
    tile.height = size.y
    const ctx = tile.getContext('2d')
    const map = this._map

    // Oblicz granice TEGO KONKRETNEGO KAFLA zamiast całej mapy
    const nwPoint = coords.scaleBy(size)
    const sePoint = nwPoint.add(size)
    const nw = map.unproject(nwPoint, coords.z)
    const se = map.unproject(sePoint, coords.z)

    const zoom = map.getZoom ? map.getZoom() : 13
    let gridStep = 1000
    if (zoom < 6) gridStep = 10000
    if (zoom < 4) gridStep = 100000

    // Użyj granic kafla zamiast całej mapy
    const minLat = Math.min(nw.lat, se.lat)
    const maxLat = Math.max(nw.lat, se.lat)
    const minLng = Math.min(nw.lng, se.lng)
    const maxLng = Math.max(nw.lng, se.lng)

    // Określ dominującą strefę UTM na podstawie środka kafla
    const centerLat = (minLat + maxLat) / 2
    const centerLng = (minLng + maxLng) / 2
    let dominantZone, dominantLetter
    try {
      const centerUtm = utm.fromLatLon(centerLat, centerLng)
      dominantZone = centerUtm.zoneNum
      dominantLetter = centerUtm.zoneLetter
    } catch {
      return tile // Jeśli nie można określić strefy, zwróć pusty kafel
    }

    // Sprawdź czy kafel przecina granicę strefy UTM
    const cornerZones = []
    const sampleCorners = [
      [minLat, minLng], [minLat, maxLng], [maxLat, minLng], [maxLat, maxLng]
    ]
    for (const [lat, lng] of sampleCorners) {
      try {
        const utmPt = utm.fromLatLon(lat, lng)
        if (!cornerZones.find(z => z.zoneNum === utmPt.zoneNum)) {
          cornerZones.push({ zoneNum: utmPt.zoneNum, zoneLetter: utmPt.zoneLetter })
        }
      } catch {}
    }
    const crossesZoneBoundary = cornerZones.length > 1

    const samplePoints = [
      [minLat, minLng], [minLat, maxLng], [maxLat, minLng], [maxLat, maxLng],
      [(minLat + maxLat) / 2, minLng], [(minLat + maxLat) / 2, maxLng],
      [minLat, (minLng + maxLng) / 2], [maxLat, (minLng + maxLng) / 2]
    ]

    const renderZones = []
    const registerZone = (zoneNum, zoneLetter) => {
      if (typeof zoneNum !== 'number' || !zoneLetter) return
      if (!renderZones.some(zone => zone.zoneNum === zoneNum && zone.zoneLetter === zoneLetter)) {
        renderZones.push({ zoneNum, zoneLetter })
      }
    }

    registerZone(dominantZone, dominantLetter)
    cornerZones.forEach(zone => registerZone(zone.zoneNum, zone.zoneLetter))

    const drawZoneGrid = (zoneNum, zoneLetter) => {
      let minE = Infinity
      let maxE = -Infinity
      let minN = Infinity
      let maxN = -Infinity

      for (const [lat, lng] of samplePoints) {
        try {
          const utmPt = utm.fromLatLon(lat, lng, zoneNum)
          minE = Math.min(minE, utmPt.easting)
          maxE = Math.max(maxE, utmPt.easting)
          minN = Math.min(minN, utmPt.northing)
          maxN = Math.max(maxN, utmPt.northing)
        } catch {}
      }

      if (![minE, maxE, minN, maxN].every(Number.isFinite)) return

      minE = Math.floor(minE / gridStep) * gridStep - gridStep
      maxE = Math.ceil(maxE / gridStep) * gridStep + gridStep
      minN = Math.floor(minN / gridStep) * gridStep - gridStep
      maxN = Math.ceil(maxN / gridStep) * gridStep + gridStep

      ctx.strokeStyle = (typeof colorMgrsGrid.value !== 'undefined' && colorMgrsGrid.value) ? colorMgrsGrid.value : '#008800'
      ctx.lineWidth = 1
      ctx.font = 'bold 13px Arial'
      ctx.fillStyle = (typeof colorMgrsGrid.value !== 'undefined' && colorMgrsGrid.value) ? colorMgrsGrid.value : '#008800'

      const drawBadge = (text, x, y, options = {}) => {
        const badgeFont = options.font || 'bold 12px Arial'
        const badgeBackground = options.background || 'rgba(17, 24, 39, 0.82)'
        const badgeTextColor = options.color || '#f8fafc'
        const paddingX = options.paddingX ?? 5
        const paddingY = options.paddingY ?? 3

        ctx.save()
        ctx.font = badgeFont
        const metrics = ctx.measureText(text)
        const fontSizeMatch = /^(?:bold\s+)?(\d+(?:\.\d+)?)px/.exec(badgeFont)
        const fontSize = fontSizeMatch ? Number(fontSizeMatch[1]) : 12
        const boxWidth = Math.ceil(metrics.width + paddingX * 2)
        const boxHeight = Math.ceil(fontSize + paddingY * 2)
        const boxX = Math.round(x - boxWidth / 2)
        const boxY = Math.round(y - boxHeight / 2)

        ctx.fillStyle = badgeBackground
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)'
        ctx.lineWidth = 1
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight)
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight)
        ctx.fillStyle = badgeTextColor
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y + 0.5)
        ctx.restore()
      }

      let labelFrequency = 1
      if (zoom < 8) {
        labelFrequency = 3
      } else if (zoom < 11) {
        labelFrequency = 2
      }

      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      let eastingIndex = 0
      for (let e = minE; e <= maxE; e += gridStep) {
        const points = []
        const nSteps = 20
        for (let i = 0; i <= nSteps; i++) {
          const n = minN + (maxN - minN) * (i / nSteps)
          try {
            const latlng = utm.toLatLon(e, n, zoneNum, zoneLetter)
            if (latlng.latitude >= minLat - 0.1 && latlng.latitude <= maxLat + 0.1 &&
                latlng.longitude >= minLng - 0.1 && latlng.longitude <= maxLng + 0.1) {
              points.push([latlng.latitude, latlng.longitude])
            }
          } catch {}
        }
        if (points.length > 1) {
          ctx.beginPath()
          const firstPoint = map.project(points[0], coords.z)
          ctx.moveTo(firstPoint.x - coords.x * size.x, firstPoint.y - coords.y * size.y)
          for (let i = 1; i < points.length; i++) {
            const p = map.project(points[i], coords.z)
            ctx.lineTo(p.x - coords.x * size.x, p.y - coords.y * size.y)
          }
          ctx.stroke()

          const shouldShowLabel = eastingIndex % labelFrequency === 0
          if (shouldShowLabel) {
            for (let i = 0; i < points.length; i++) {
              const p = map.project(points[i], coords.z)
              const tileY = p.y - coords.y * size.y
              const tileX = p.x - coords.x * size.x
              if (tileY >= 0 && tileY <= 30 && tileX >= 10 && tileX <= size.x - 10) {
                const label = String(Math.floor(e / gridStep)).padStart(2, '0').slice(-2)
                drawBadge(label, tileX, 12, {
                  font: 'bold 11px Arial',
                  paddingX: 4,
                  paddingY: 2
                })
                break
              }
            }
          }
          eastingIndex++
        }
      }

      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      let northingIndex = 0
      for (let n = minN; n <= maxN; n += gridStep) {
        const points = []
        const eSteps = 20
        for (let i = 0; i <= eSteps; i++) {
          const e = minE + (maxE - minE) * (i / eSteps)
          try {
            const latlng = utm.toLatLon(e, n, zoneNum, zoneLetter)
            if (latlng.latitude >= minLat - 0.1 && latlng.latitude <= maxLat + 0.1 &&
                latlng.longitude >= minLng - 0.1 && latlng.longitude <= maxLng + 0.1) {
              points.push([latlng.latitude, latlng.longitude])
            }
          } catch {}
        }
        if (points.length > 1) {
          ctx.beginPath()
          const firstPoint = map.project(points[0], coords.z)
          ctx.moveTo(firstPoint.x - coords.x * size.x, firstPoint.y - coords.y * size.y)
          for (let i = 1; i < points.length; i++) {
            const p = map.project(points[i], coords.z)
            ctx.lineTo(p.x - coords.x * size.x, p.y - coords.y * size.y)
          }
          ctx.stroke()

          const shouldShowLabel = northingIndex % labelFrequency === 0
          if (shouldShowLabel) {
            for (let i = 0; i < points.length; i++) {
              const p = map.project(points[i], coords.z)
              const tileX = p.x - coords.x * size.x
              const tileY = p.y - coords.y * size.y
              if (tileX >= 0 && tileX <= 30 && tileY >= 10 && tileY <= size.y - 10) {
                const label = String(Math.floor(n / gridStep)).padStart(2, '0').slice(-2)
                drawBadge(label, 14, tileY, {
                  font: 'bold 11px Arial',
                  paddingX: 4,
                  paddingY: 2
                })
                break
              }
            }
          }
          northingIndex++
        }

        if (zoom >= 10) {
          const squareStep = 100000
          const minSquareE = Math.floor(minE / squareStep) * squareStep
          const maxSquareE = Math.ceil(maxE / squareStep) * squareStep
          const minSquareN = Math.floor(minN / squareStep) * squareStep
          const maxSquareN = Math.ceil(maxN / squareStep) * squareStep

          ctx.font = 'bold 13px Arial'
          for (let squareE = minSquareE; squareE <= maxSquareE; squareE += squareStep) {
            for (let squareN = minSquareN; squareN <= maxSquareN; squareN += squareStep) {
              try {
                const centerLatLng = utm.toLatLon(squareE + (squareStep / 2), squareN + (squareStep / 2), zoneNum, zoneLetter)
                const centerPoint = map.project([centerLatLng.latitude, centerLatLng.longitude], coords.z)
                const tileX = centerPoint.x - coords.x * size.x
                const tileY = centerPoint.y - coords.y * size.y
                if (tileX < 18 || tileX > size.x - 18 || tileY < 18 || tileY > size.y - 18) continue

                const squareLabel = mgrs.forward([centerLatLng.longitude, centerLatLng.latitude], 0).slice(0, 5)
                drawBadge(squareLabel, tileX, tileY, {
                  font: 'bold 13px Arial',
                  background: 'rgba(11, 18, 32, 0.84)',
                  color: '#ffffff',
                  paddingX: 7,
                  paddingY: 4
                })
              } catch {}
            }
          }
        }
      }
    }

    renderZones.forEach(zone => drawZoneGrid(zone.zoneNum, zone.zoneLetter))

    // Rysuj granice stref UTM jeśli kafel przecina granicę
    if (crossesZoneBoundary) {
      ctx.strokeStyle = '#FF0000'
      ctx.lineWidth = 2.5
      ctx.setLineDash([])

      // Rysuj pionową linię granicy strefy
      const zoneBoundaryPoints = []
      // Znajdź gdzie dokładnie przebiega granica (różnica w zoneNum)
      for (let latStep = 0; latStep <= 40; latStep++) {
        const lat = minLat + (maxLat - minLat) * (latStep / 40)
        // Próbkuj długości geograficzne aby znaleźć granicę
        for (let lngStep = 0; lngStep <= 40; lngStep++) {
          const lng = minLng + (maxLng - minLng) * (lngStep / 40)
          try {
            const utmHere = utm.fromLatLon(lat, lng)
            const utmNext = utm.fromLatLon(lat, lng + 0.001)
            // Jeśli zmienia się strefa, to jest granica
            if (utmHere.zoneNum !== utmNext.zoneNum) {
              zoneBoundaryPoints.push([lat, lng])
              break
            }
          } catch {}
        }
      }

      if (zoneBoundaryPoints.length > 1) {
        ctx.beginPath()
        const firstPt = map.project(zoneBoundaryPoints[0], coords.z)
        ctx.moveTo(firstPt.x - coords.x * size.x, firstPt.y - coords.y * size.y)
        for (let i = 1; i < zoneBoundaryPoints.length; i++) {
          const pt = map.project(zoneBoundaryPoints[i], coords.z)
          ctx.lineTo(pt.x - coords.x * size.x, pt.y - coords.y * size.y)
        }
        ctx.stroke()

        // Dodaj etykiety kwadratów 100km po obu stronach granicy
        if (zoom >= 8) {
          ctx.font = 'bold 16px Arial'
          ctx.fillStyle = '#FF0000'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          // Szukaj punktu granicy najbardziej zbliżonego do środka kafla,
          // żeby etykiety były widoczne po obu stronach tej samej linii granicznej.
          const tileCenterX = size.x / 2
          const tileCenterY = size.y / 2
          let anchorIdx = -1
          let anchorX = 0
          let anchorY = 0
          let bestDist = Infinity

          for (let i = 0; i < zoneBoundaryPoints.length; i++) {
            const p = map.project(zoneBoundaryPoints[i], coords.z)
            const x = p.x - coords.x * size.x
            const y = p.y - coords.y * size.y
            if (x < 0 || x > size.x || y < 0 || y > size.y) continue
            const d = (x - tileCenterX) ** 2 + (y - tileCenterY) ** 2
            if (d < bestDist) {
              bestDist = d
              anchorIdx = i
              anchorX = x
              anchorY = y
            }
          }

          // Fallback: środek listy punktów granicy
          if (anchorIdx === -1) {
            anchorIdx = Math.floor(zoneBoundaryPoints.length / 2)
            const fallbackPt = map.project(zoneBoundaryPoints[anchorIdx], coords.z)
            anchorX = fallbackPt.x - coords.x * size.x
            anchorY = fallbackPt.y - coords.y * size.y
          }

          const [anchorLat, anchorLng] = zoneBoundaryPoints[anchorIdx]

          // Wyznacz lokalną normalną do linii granicy (w pikselach), aby przesunąć napisy
          // po przeciwnych stronach tej samej granicy.
          const prevIdx = Math.max(0, anchorIdx - 1)
          const nextIdx = Math.min(zoneBoundaryPoints.length - 1, anchorIdx + 1)
          const prevPtPx = map.project(zoneBoundaryPoints[prevIdx], coords.z)
          const nextPtPx = map.project(zoneBoundaryPoints[nextIdx], coords.z)
          let dx = nextPtPx.x - prevPtPx.x
          let dy = nextPtPx.y - prevPtPx.y
          const len = Math.sqrt(dx * dx + dy * dy) || 1
          dx /= len
          dy /= len
          // normalna do stycznej (dx,dy)
          let nx = -dy
          let ny = dx
          const nLen = Math.sqrt(nx * nx + ny * ny) || 1
          nx /= nLen
          ny /= nLen

          const labelOffsetPx = 54
          const margin = 18
          const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

          // Odczytaj oznaczenia po lewej/prawej geograficznie od granicy.
          // Używamy przesunięć po długości geograficznej, bo granica stref UTM jest południkowa.
          let leftSquare = ''
          let rightSquare = ''
          try {
            leftSquare = mgrs.forward([anchorLng - 0.01, anchorLat], 0).slice(0, 5)
          } catch {}
          try {
            rightSquare = mgrs.forward([anchorLng + 0.01, anchorLat], 0).slice(0, 5)
          } catch {}

          if (leftSquare) {
            const lx = clamp(anchorX - nx * labelOffsetPx, margin, size.x - margin)
            const ly = clamp(anchorY - ny * labelOffsetPx, margin, size.y - margin)
            ctx.fillText(leftSquare, lx, ly)
          }

          if (rightSquare) {
            const rx = clamp(anchorX + nx * labelOffsetPx, margin, size.x - margin)
            const ry = clamp(anchorY + ny * labelOffsetPx, margin, size.y - margin)
            ctx.fillText(rightSquare, rx, ry)
          }
        }
      }

      // Resetuj ustawienia rysowania
      ctx.setLineDash([])
      ctx.lineWidth = 1
    }

    return tile
  }
})

// Replace drawMgrsGrid to use the custom layer

function drawMgrsGrid (map, forPdf = false, retry = 0) {
  if (map._mgrsGridLayer) {
    try { map.removeLayer(map._mgrsGridLayer) } catch (e) {}
    map._mgrsGridLayer = null
  }
  // Sprawdź czy overlayPane istnieje
  const overlayPane = map.getPanes && map.getPanes().overlayPane
  if (!overlayPane) {
    if (retry < 5) {
      setTimeout(() => drawMgrsGrid(map, forPdf, retry + 1), 100)
    }
    return []
  }
  // Dodaj nową warstwę
  const gridLayer = new MGRSGridLayer()
  gridLayer.addTo(map)
  map._mgrsGridLayer = gridLayer
  return [gridLayer]
}

// Ustawia orientację mapy na północ (jeśli obsługiwane)
// function resetNorthUp () {
//   if (!map.value) return
//   // Leaflet domyślnie nie obsługuje rotacji mapy, ale jeśli jest plugin do rotacji:
//   if (typeof map.value.setBearing === 'function') {
//     map.value.setBearing(0)
//     $q.notify({ type: 'positive', message: 'Północ ustawiona u góry.' })
//   } else {
//     $q.notify({ type: 'info', message: 'Mapa jest już zorientowana na północ (Leaflet).' })
//   }
// }

function exportPDF (routeName = '', mapImgData = null, mapImgDims = null) {
  // Use Roboto if available, else fallback to helvetica
  const doc = new JsPDF()
  try {
    doc.setFont('Roboto', 'normal')
  } catch (e) {
    doc.setFont('helvetica', 'normal')
  }
  let y = 16
  // Dodaj nazwę jeśli wybrano
  if (pdfOptions.value.includes('name')) {
    doc.text(routeName || 'Tabela marszu', 14, y)
    y += 8
  }
  // Dodaj trasę jeśli wybrano
  if (pdfOptions.value.includes('routeTable') && routeTable.value.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [columns.map(col => col.name !== 'odleglosc' ? col.label : 'Dystans (m)')],
      body: routeTable.value.map(row => columns.map(col => row[col.field])),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [45, 62, 47] }
    })
    y = doc.lastAutoTable.finalY + 8
  }
  // Dodaj punkty specjalne jeśli wybrano
  if (pdfOptions.value.includes('specialPoints') && specialPointsTable.value.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [specialColumns.map(col => col.label)],
      body: specialPointsTable.value.map(row => specialColumns.map(col => row[col.field])),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [45, 62, 47] },
      margin: { left: 14, right: 14 }
    })
    y = doc.lastAutoTable.finalY + 8
  }
  // Dodaj mapę jeśli wybrano i jest screenshot
  if (pdfOptions.value.includes('map') && mapImgData && mapImgDims) {
    // Szerokość PDF: 210mm, marginesy 14px, szerokość mapy ~180mm
    const pdfWidth = doc.internal.pageSize.getWidth()
    const imgWidth = pdfWidth - 28
    // Zachowaj proporcje mapy
    const aspect = mapImgDims.height / mapImgDims.width
    const imgHeight = imgWidth * aspect
    doc.addImage(mapImgData, 'PNG', 14, y, imgWidth, imgHeight)
    y += imgHeight + 8
  }
  doc.save((routeName ? routeName.replace(/\s+/g, '-') : 'tabela-marszu') + '.pdf')
}

onMounted(() => {
  map.value = L.map('march-map', { renderer: L.canvas() }).setView([52.2297, 21.0122], 13)
  baseLayers = {
    osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19
    }),
    topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenTopoMap',
      maxZoom: 17
    }),
    tourist: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }),
    sat: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 19
    })
  }
  baseLayer = baseLayers[selectedMapLayer.value]
  baseLayer.addTo(map.value)

  const storedMarchTableSnapshot = marchTableSessionStore.loadSnapshot()
  if (storedMarchTableSnapshot) {
    isRestoringMarchTable = true
    try {
      applyMarchTableSnapshot(storedMarchTableSnapshot)
      if (storedMarchTableSnapshot.mapView && Number.isFinite(storedMarchTableSnapshot.mapView.lat) && Number.isFinite(storedMarchTableSnapshot.mapView.lng)) {
        map.value.setView([
          storedMarchTableSnapshot.mapView.lat,
          storedMarchTableSnapshot.mapView.lng
        ], storedMarchTableSnapshot.mapView.zoom || 13, { animate: false })
      }
    } finally {
      isRestoringMarchTable = false
    }
  } else {
    const storedMapView = navigationStore.consumeMarchTableMapView()
    if (storedMapView && Number.isFinite(storedMapView.lat) && Number.isFinite(storedMapView.lng)) {
      const targetZoom = Number.isFinite(storedMapView.zoom) ? storedMapView.zoom : map.value.getZoom()
      map.value.setView([storedMapView.lat, storedMapView.lng], targetZoom, { animate: false })
    }
  }

  setTimeout(() => {
    if (map.value) {
      map.value.invalidateSize()
      calculateRoute()
    }
  }, 0)

  // Funkcja do automatycznego ustawiania bearing mapy zgodnie z kierunkiem UTM
  function updateMapBearingToUtm () {
    const center = map.value.getCenter()
    currentMapZoneLabel.value = getZoneLabelFromLatLng(center.lat, center.lng)
    const utmCenter = utm.fromLatLon(center.lat, center.lng)
    // Punkt 1km na północ w tej samej strefie
    const utmNorthEasting = utmCenter.easting
    const utmNorthNorthing = utmCenter.northing + 1000
    const latlngNorth = utm.toLatLon(utmNorthEasting, utmNorthNorthing, utmCenter.zoneNum, utmCenter.zoneLetter)
    const dLat = latlngNorth.latitude - center.lat
    const dLng = latlngNorth.longitude - center.lng
    const angleRad = Math.atan2(dLng, dLat)
    const angleDeg = -angleRad * 180 / Math.PI
    if (typeof map.value.setBearing === 'function') {
      map.value.setBearing(angleDeg)
      console.log('[Leaflet.Rotate] Ustawiono bearing mapy:', angleDeg)
    }
  }

  // Ustaw bearing na starcie i po każdym ruchu/zoomie
  map.value.on('moveend zoomend', updateMapBearingToUtm)
  setTimeout(updateMapBearingToUtm, 500)
  map.value.on('click', (e) => {
    if (addSpecialMode) {
      const type = specialType.value
      const name = type === 'INNY' ? specialCustomName.value : type
      specialPoints.value.push({ lat: e.latlng.lat, lng: e.latlng.lng, type, name, note: '' })
      pointHistory.value.push({ type: 'special', marker: null, idx: specialPoints.value.length - 1 })
      addSpecialMode = false
      specialType.value = ''
      specialCustomName.value = ''
      calculateRoute()
      return
    }
    if (!pinMode.value) return
    pins.value.push({ lat: e.latlng.lat, lng: e.latlng.lng })
    pointHistory.value.push({ type: 'pin', marker: null, idx: pins.value.length - 1 })
    pinMode.value = false
    calculateRoute()
  })

  // Debounce dla generowania siatki MGRS i rerenderowania elementów mapy
  function debounce (fn, delay) {
    let timeout
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => fn.apply(this, args), delay)
    }
  }

  const debouncedMapRerender = debounce(() => {
    if (showMgrsGrid.value && map.value) {
      if (map.value._mgrsGridLayer) {
        map.value.removeLayer(map.value._mgrsGridLayer)
        map.value._mgrsGridLayer = null
      }
      const layers = drawMgrsGrid(map.value, false)
      if (layers && layers.length > 0) {
        map.value._mgrsGridLayer = layers[0]
      }
    } else if (map.value && map.value._mgrsGridLayer) {
      map.value.removeLayer(map.value._mgrsGridLayer)
      map.value._mgrsGridLayer = null
    }
    rerenderMapElements()
    persistMarchTableSession()
  }, 350)
  map.value.on('zoomend moveend resize', debouncedMapRerender)
  const mapContainer = document.getElementById('march-map')
  if (window.ResizeObserver && mapContainer) {
    const resizeObserver = new ResizeObserver(() => {
      debouncedMapRerender()
    })
    resizeObserver.observe(mapContainer)
  }
  if (showMgrsGrid.value) debouncedMapRerender()
})

// Add this function if missing
function updateMarkerIcons () {
  markers.value.forEach((marker, idx) => {
    if (idx === 0) {
      marker.setIcon(iconHome)
    } else if (idx === markers.value.length - 1) {
      marker.setIcon(iconFlag)
    } else {
      marker.setIcon(iconPin)
    }
  })
}

function removeLastPin () {
  if (pointHistory.value.length === 0) return
  const last = pointHistory.value.pop()
  if (last.type === 'pin') {
    // Usuń z pins
    if (last.idx >= 0 && last.idx < pins.value.length) {
      pins.value.splice(last.idx, 1)
    } else {
      // fallback: usuń ostatni jeśli coś się rozjechało
      pins.value.pop()
    }
    // Usuń marker z mapy
    if (last.marker && map.value) {
      try { map.value.removeLayer(last.marker) } catch (e) {}
    }
    // Usuń marker z tablicy markers (po referencji, nie po idx)
    const markerIdx = markers.value.indexOf(last.marker)
    if (markerIdx !== -1) markers.value.splice(markerIdx, 1)
    updateMarkerIcons()
    polylines.value.forEach(l => map.value && map.value.removeLayer(l))
    polylines.value = []
    calculateRoute()
  } else if (last.type === 'special') {
    if (last.idx >= 0 && last.idx < specialPoints.value.length) {
      specialPoints.value.splice(last.idx, 1)
    } else {
      specialPoints.value.pop()
    }
    if (last.marker && map.value) {
      try { map.value.removeLayer(last.marker) } catch (e) {}
    }
    if (specialPoints.value.length === 0) {
      specialPoints.value = []
    }
  }
}

const showMgrsGrid = ref(false)

watch(showMgrsGrid, (val) => {
  if (!map.value) return
  try {
    // Usuwamy starą warstwę jeśli istnieje
    if (map.value._mgrsGridLayer) {
      try { map.value.removeLayer(map.value._mgrsGridLayer) } catch (e) {}
      map.value._mgrsGridLayer = null
    }
    // Usuń wszystkie stare canvasy z overlayPane
    const overlayPane = map.value && map.value.getPanes && map.value.getPanes().overlayPane
    if (overlayPane) {
      Array.from(overlayPane.querySelectorAll('canvas.leaflet-mgrs-grid')).forEach(c => c.remove())
    }
    if (val) {
      // Dodajemy nową warstwę
      const layers = drawMgrsGrid(map.value, true)
      if (layers && layers.length > 0) {
        map.value._mgrsGridLayer = layers[0]
      }
    }
  } catch (err) {
    // Zabezpieczenie: nie blokuj UI
    map.value._mgrsGridLayer = null
  }
  if (!isRestoringMarchTable) {
    persistMarchTableSession()
  }
})

watch(showPdfDialog, (val) => {
  if (val) {
    pdfMapOptions.value = []
  }
})

// Resetowanie trybu po zmianie inputMode
watch(inputMode, (val, oldVal) => {
  if (val !== oldVal) {
    pinMode.value = false
  }
  if (!isRestoringMarchTable) {
    persistMarchTableSession()
  }
})

const mapLayerOptions = [
  { label: 'OpenStreetMap', value: 'osm' },
  { label: 'Topograficzna', value: 'topo' },
  { label: 'Turystyczna', value: 'tourist' },
  { label: 'Satelitarna', value: 'sat' }
]
const selectedMapLayer = ref('osm')
let baseLayer = null
let baseLayers = {}

// Eksport GPX
function exportGPX () {
  if (!pins.value || pins.value.length < 2) return
  let gpx = '<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="WOT" xmlns="http://www.topografix.com/GPX/1/1">\n<trk><name>Trasa marszu</name><trkseg>'
  pins.value.forEach(p => {
    gpx += `\n<trkpt lat="${p.lat}" lon="${p.lng}"></trkpt>`
  })
  gpx += '\n</trkseg></trk>\n</gpx>'
  const blob = new Blob([gpx], { type: 'application/gpx+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'trasa-marszu.gpx'
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}

watch(selectedMapLayer, (val, oldVal) => {
  if (map.value && baseLayers[val] && !isLayerLoading.value) {
    isLayerLoading.value = true
    showLoading('Ładowanie warstwy mapy...')
    if (baseLayer) map.value.removeLayer(baseLayer)
    baseLayer = baseLayers[val]
    baseLayer.addTo(map.value)
    // Nasłuchuj tileload i tileerror
    let loadedTiles = 0
    let errorTiles = 0
    let expectedTiles = 0
    const onTileLoad = () => {
      loadedTiles++
      if (loadedTiles + errorTiles >= expectedTiles) {
        finishLayerLoad()
      }
    }
    const onTileError = () => {
      errorTiles++
      if (loadedTiles + errorTiles >= expectedTiles) {
        finishLayerLoad()
      }
    }
    function finishLayerLoad () {
      baseLayer.off('tileload', onTileLoad)
      baseLayer.off('tileerror', onTileError)
      setTimeout(() => {
        map.value.invalidateSize()
        debouncedMapRerender()
        hideLoading()
        isLayerLoading.value = false
      }, 200)
    }
    // Określ liczbę kafelków do załadowania
    expectedTiles = Math.max(8, Math.floor(map.value.getSize().x / 256) * Math.floor(map.value.getSize().y / 256))
    baseLayer.on('tileload', onTileLoad)
    baseLayer.on('tileerror', onTileError)
    // Fallback: jeśli po 3s nie załadowało się nic, odblokuj
    setTimeout(() => {
      if (isLayerLoading.value) finishLayerLoad()
    }, 3000)
  }
  if (!isRestoringMarchTable) {
    persistMarchTableSession()
  }
})

watch(preserveTable24h, (enabled) => {
  if (isRestoringMarchTable) return
  if (enabled) {
    persistMarchTableSession()
  }
})
// Dynamiczny styl kontenera mapy na desktopie
const mainContainerStyle = computed(() => {
  if (isMobile.value) return 'width:100%;max-width:100vw;'
  return 'width:95vw;max-width:2500px;'
})

// Automatyczne przeliczenie rozmiaru mapy po zmianie szerokości kontenera
let resizeObserver = null
onMounted(() => {
  const mapDiv = document.getElementById('march-map')
  if (mapDiv && map.value) {
    resizeObserver = new window.ResizeObserver(() => {
      map.value.invalidateSize()
    })
    resizeObserver.observe(mapDiv)
  }
})
onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<style scoped>
#march-map { min-height: 300px; min-width: 100%; }
.text-h5 {
  color: var(--military-primary, #2D3E2F);
}
.march-table-bg {
  background: var(--military-light, #F5F5F5) !important;
}
.theme-dark .march-table-bg,
.theme-dark .q-table,
.theme-dark .q-table th,
.theme-dark .q-table td {
  background: #232526 !important;
  color: #f2f2f2 !important;
  border-color: #444 !important;
}
.theme-dark .q-table thead th {
  background: #181a1b !important;
  color: #f2f2f2 !important;
}
/* Poprawa rozmieszczenia przycisków na mobile */
.march-btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
.march-btn {
  min-width: 140px;
}
.march-mobile-panel {
  border-radius: 16px;
  overflow: hidden;
}

.march-mobile-section-title {
  margin-bottom: 10px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(45, 62, 47, 0.82);
}

.march-mobile-action-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.march-mobile-chip-wide {
  max-width: 100%;
  white-space: normal;
  height: auto;
  line-height: 1.2;
  padding-top: 6px;
  padding-bottom: 6px;
}

.march-mobile-expansion__header {
  min-height: 52px;
}

.theme-dark .march-mobile-section-title {
  color: rgba(242, 242, 242, 0.82);
}
@media (max-width: 600px) {
  .march-main-container {
    padding-bottom: 8px;
  }

  .march-mobile-panel {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    box-shadow: 0 8px 24px rgba(17, 24, 39, 0.08);
  }

  .theme-dark .march-mobile-panel {
    background: rgba(35, 37, 38, 0.94);
  }

  .mobile-march-table {
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
  }

  .mobile-march-table :deep(.q-table__middle),
  .mobile-march-table :deep(.q-table__grid-content),
  .mobile-march-table :deep(.q-table__container) {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  .mobile-march-table :deep(.q-table__grid-item) {
    width: 100%;
  }

  .march-btn {
    flex: 1 1 100%;
    min-width: 0;
    max-width: 100%;
  }

  .march-mobile-action-grid :deep(.q-btn) {
    min-height: 44px;
    border-radius: 12px;
  }

  .row.items-center.no-wrap.q-gutter-xs > .row.items-center.no-wrap.q-gutter-xs.q-ml-md {
    flex-wrap: wrap;
    gap: 4px;
    margin-left: 0 !important;
  }
  .row.items-center.no-wrap.q-gutter-xs > .row.items-center.no-wrap.q-gutter-xs.q-ml-md > * {
    flex: 1 1 100%;
    min-width: 0;
    max-width: 100%;
  }
}

/* Leaflet marker SVG na czarno */
.leaflet-marker-icon[src$='.svg'] {
  filter: invert(1) grayscale(1);
}
.leaflet-mgrs-grid {
  z-index: 1500 !important;
  pointer-events: none;
}
</style>

<style>
/* Pulsujący marker lokalizacji użytkownika (niezależny od scoped) */
.user-location-marker {
  position: relative;
}

/* Taktyczna maska mapy - odcienie szarości */
.theme-tactical #march-map .leaflet-tile-pane {
  filter: grayscale(1) brightness(0.55) contrast(1.1);
}

.pulse-dot {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #4285F4;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 8px rgba(66, 133, 244, 0.6);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  cursor: pointer;
}

.pulse-ring {
  position: absolute;
  width: 40px;
  height: 40px;
  background: rgba(66, 133, 244, 0.3);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse-animation 2s ease-out infinite;
  z-index: 1;
  cursor: pointer;
}

@keyframes pulse-animation {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}
</style>
