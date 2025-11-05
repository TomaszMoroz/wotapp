const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/communication', component: () => import('pages/nato/NatoAlphabetPage.vue') },
      { path: '/training', component: () => import('pages/training/TrainingPage.vue') },
      { path: '/tactics', component: () => import('pages/tactics/TacticsPage.vue') },
      { path: '/map', component: () => import('pages/topography/TopographyPage.vue') },
      { path: '/reports', component: () => import('pages/reports/ReportsPage.vue') },
      { path: '/emergency', component: () => import('pages/emergency/EmergencyPage.vue') },
      { path: '/unit', component: () => import('pages/unit/UnitPage.vue') },
      { path: '/equipment', component: () => import('pages/equipment/EquipmentPage.vue') },
      { path: '/tools', component: () => import('pages/tools/ToolsPage.vue') },
      { path: '/tools/distance', component: () => import('pages/tools/DistanceCalculatorPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
