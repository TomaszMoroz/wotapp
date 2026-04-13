import { defineStore } from 'pinia'

const STORAGE_KEY = 'wot_navigation_target'
const MAP_VIEW_STORAGE_KEY = 'wot_march_table_map_view'

function readStoredTarget () {
  try {
    if (typeof sessionStorage === 'undefined') return null
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeStoredTarget (target) {
  try {
    if (typeof sessionStorage === 'undefined') return
    if (target) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(target))
    } else {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // ignore storage errors
  }
}

function readStoredMarchTableView () {
  try {
    if (typeof sessionStorage === 'undefined') return null
    const raw = sessionStorage.getItem(MAP_VIEW_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeStoredMarchTableView (view) {
  try {
    if (typeof sessionStorage === 'undefined') return
    if (view) {
      sessionStorage.setItem(MAP_VIEW_STORAGE_KEY, JSON.stringify(view))
    } else {
      sessionStorage.removeItem(MAP_VIEW_STORAGE_KEY)
    }
  } catch {
    // ignore storage errors
  }
}

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    target: readStoredTarget(),
    marchTableMapView: readStoredMarchTableView()
  }),
  actions: {
    setTarget (target) {
      this.target = target ? { ...target } : null
      writeStoredTarget(this.target)
    },
    clearTarget () {
      this.target = null
      writeStoredTarget(null)
    },
    setMarchTableMapView (view) {
      this.marchTableMapView = view ? { ...view } : null
      writeStoredMarchTableView(this.marchTableMapView)
    },
    consumeMarchTableMapView () {
      const view = this.marchTableMapView ? { ...this.marchTableMapView } : null
      this.marchTableMapView = null
      writeStoredMarchTableView(null)
      return view
    }
  }
})
