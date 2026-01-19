import { Dark } from 'quasar'

export default async () => {
  // Do not enable dark mode automatically; will be controlled by user in MainLayout
  Dark.set(false)
}
