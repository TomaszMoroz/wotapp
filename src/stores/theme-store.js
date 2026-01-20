import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    themeMode: localStorage.getItem('wot_theme_mode') || 'light'
  }),
  actions: {
    setThemeMode (mode) {
      this.themeMode = mode
      localStorage.setItem('wot_theme_mode', mode)
    }
  }
})
