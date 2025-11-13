const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/communication', component: () => import('pages/nato/NatoAlphabetPage.vue') },
      { path: '/training', component: () => import('pages/training/TrainingPage.vue') },
      { path: '/tactics', component: () => import('pages/tactics/TacticsPage.vue') },
      { path: '/tactics/maneuvers', component: () => import('pages/tactics/TacticsManeuversPage.vue') },
      { path: '/tactics/procedures', component: () => import('pages/tactics/TacticsProceduresPage.vue') },
      { path: '/tactics/command', component: () => import('pages/tactics/CommandPage.vue') },
      { path: '/topography', component: () => import('pages/topography/TopographyPage.vue') },
      { path: '/topography/mgrs', component: () => import('pages/topography/articles/MgrsPage.vue') },
      { path: '/shooting', component: () => import('pages/shooting/ShootingPage.vue') },
      { path: '/shooting/basics', component: () => import('pages/shooting/BasicsPage.vue') },
      { path: '/shooting/ballistics', component: () => import('pages/shooting/BallisticsPage.vue') },
      { path: '/shooting/optics', component: () => import('pages/shooting/OpticsPage.vue') },
      { path: '/shooting/angular-measurements', component: () => import('pages/shooting/AngularMeasurementsPage.vue') },
      { path: '/map', component: () => import('pages/topography/TopographyPage.vue') },
      { path: '/reports', component: () => import('pages/reports/ReportsPage.vue') },
      { path: '/emergency', component: () => import('pages/emergency/EmergencyPage.vue') },
      { path: '/unit', component: () => import('pages/unit/UnitPage.vue') },
      { path: '/equipment', component: () => import('pages/equipment/EquipmentPage.vue') },
      { path: '/tools', component: () => import('pages/tools/ToolsPage.vue') },
      { path: '/tools/distance', component: () => import('pages/tools/DistanceCalculatorPage.vue') },
      { path: '/tools/settings', component: () => import('pages/tools/SettingsCalculatorPage.vue') },
      { path: '/tools/mils-moa', component: () => import('pages/tools/MilsMoaConverterPage.vue') },
      { path: '/abc', component: () => import('pages/abc/AbcPage.vue') },
      { path: '/abc/rotation', name: 'abc-rotation', component: () => import('pages/abc/AbcRotationPage.vue') },
      { path: '/abc/backpack', name: 'abc-backpack', component: () => import('pages/abc/AbcBackpackPage.vue') },
      { path: '/ranks', component: () => import('pages/ranks/RanksPage.vue') },
      { path: '/regulations', component: () => import('pages/regulations/RegulationsPage.vue') },
      { path: '/firearms-law', component: () => import('pages/emergency/FirearmsLawPage.vue') },
      { path: '/drill', component: () => import('pages/emergency/DrillPage.vue') },
      // TCCC
      { path: '/tccc', component: () => import('pages/tccc/TcccPage.vue') },
      { path: '/tccc/:nr', component: () => import('pages/tccc/TcccChapterPage.vue') }
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
