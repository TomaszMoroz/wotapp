import { Dark } from 'quasar'

export default async () => {
  const themeMode = localStorage.getItem('wot_theme_mode') || 'light'
  Dark.set(themeMode === 'dark' || themeMode === 'tactical')
  document.body.classList.remove('theme-dark', 'theme-tactical')
  if (themeMode === 'dark') document.body.classList.add('theme-dark')
  else if (themeMode === 'tactical') document.body.classList.add('theme-tactical')
}
