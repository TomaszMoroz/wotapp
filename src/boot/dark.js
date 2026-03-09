import { Dark } from 'quasar'

export default async () => {
  const themeMode = localStorage.getItem('wot_theme_mode') || 'light'
  Dark.set(themeMode === 'dark')
}
