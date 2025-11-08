<template>
  <q-page class="page-background">
    <div class="container q-pa-md">
      <BackNav />
      <div class="text-h4 q-mb-md">👥 Informacje o Jednostce</div>

      <div class="row q-gutter-md">
        <div class="col-12 col-md-4">
          <q-card>
            <q-card-section class="bg-primary text-white text-center">
              <q-avatar size="80px" class="q-mb-sm">
                <img src="https://via.placeholder.com/80x80/0078d4/ffffff?text=WOT">
              </q-avatar>
              <div class="text-h6">1. Brygada OT</div>
              <div class="text-caption">Warszawa</div>
            </q-card-section>
            <q-card-section>
              <q-list dense>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>Komendant</q-item-label>
                    <q-item-label>płk Adam Kowalski</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>Zastępca</q-item-label>
                    <q-item-label>mjr Anna Nowak</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>Liczba żołnierzy</q-item-label>
                    <q-item-label>1,250</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-8">
          <q-card class="q-mb-md">
            <q-card-section>
              <div class="text-h6">Struktura organizacyjna</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-tree
                :nodes="orgStructure"
                node-key="label"
                default-expand-all
              />
            </q-card-section>
          </q-card>

          <q-card>
            <q-card-section>
              <div class="text-h6">Personel</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-table
                :rows="personnel"
                :columns="columns"
                row-key="id"
                :pagination="{ rowsPerPage: 5 }"
              >
                <template v-slot:body-cell-avatar="props">
                  <q-td :props="props">
                    <q-avatar size="40px">
                      <img :src="`https://via.placeholder.com/40x40/0078d4/ffffff?text=${props.row.name.charAt(0)}`">
                    </q-avatar>
                  </q-td>
                </template>
                <template v-slot:body-cell-status="props">
                  <q-td :props="props">
                    <q-chip
                      :color="props.row.status === 'Obecny' ? 'positive' : 'orange'"
                      text-color="white"
                      dense
                    >
                      {{ props.row.status }}
                    </q-chip>
                  </q-td>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import BackNav from 'components/BackNav.vue'

defineOptions({
  name: 'UnitPage'
})

const orgStructure = ref([
  {
    label: '1. Brygada OT',
    children: [
      {
        label: '1. Batalion',
        children: [
          { label: '1. Kompania' },
          { label: '2. Kompania' },
          { label: '3. Kompania' }
        ]
      },
      {
        label: '2. Batalion',
        children: [
          { label: '1. Kompania' },
          { label: '2. Kompania' }
        ]
      }
    ]
  }
])

const columns = [
  { name: 'avatar', label: '', field: 'avatar', align: 'center' },
  { name: 'name', label: 'Imię i nazwisko', field: 'name', align: 'left' },
  { name: 'rank', label: 'Stopień', field: 'rank', align: 'left' },
  { name: 'position', label: 'Stanowisko', field: 'position', align: 'left' },
  { name: 'status', label: 'Status', field: 'status', align: 'center' }
]

const personnel = ref([
  {
    id: 1,
    name: 'Adam Kowalski',
    rank: 'płk',
    position: 'Komendant',
    status: 'Obecny'
  },
  {
    id: 2,
    name: 'Anna Nowak',
    rank: 'mjr',
    position: 'Zastępca komendanta',
    status: 'Obecny'
  },
  {
    id: 3,
    name: 'Jan Wiśniewski',
    rank: 'kpt.',
    position: 'Dowódca 1. kompanii',
    status: 'Na urlopie'
  },
  {
    id: 4,
    name: 'Maria Kowalczyk',
    rank: 'por.',
    position: 'Oficer łączności',
    status: 'Obecny'
  },
  {
    id: 5,
    name: 'Piotr Zieliński',
    rank: 'sier.',
    position: 'Dowódca drużyny',
    status: 'Obecny'
  }
])
</script>
