import { defineStore } from 'pinia'

const KEEP_KEY = 'wot_march_table_keep_24h'
const SESSION_KEY = 'wot_march_table_session_24h'
const SESSION_TTL_MS = 24 * 60 * 60 * 1000

function readKeepEnabled () {
  try {
    if (typeof localStorage === 'undefined') return false
    return localStorage.getItem(KEEP_KEY) === '1'
  } catch {
    return false
  }
}

function writeKeepEnabled (value) {
  try {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(KEEP_KEY, value ? '1' : '0')
  } catch {
    // ignore storage errors
  }
}

function readStoredSession () {
  try {
    if (typeof localStorage === 'undefined') return null
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed.expiresAt !== 'number' || parsed.expiresAt <= Date.now()) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function writeStoredSession (session) {
  try {
    if (typeof localStorage === 'undefined') return
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  } catch {
    // ignore storage errors
  }
}

export const useMarchTableStore = defineStore('marchTable', {
  state: () => ({
    keep24hEnabled: readKeepEnabled(),
    session: readStoredSession()
  }),
  actions: {
    setKeep24hEnabled (value) {
      this.keep24hEnabled = !!value
      writeKeepEnabled(this.keep24hEnabled)
      if (!this.keep24hEnabled) {
        this.clearSession()
      }
    },
    saveSession (data) {
      if (!this.keep24hEnabled) return
      const now = Date.now()
      this.session = {
        savedAt: now,
        expiresAt: now + SESSION_TTL_MS,
        data: JSON.parse(JSON.stringify(data))
      }
      writeStoredSession(this.session)
    },
    getSession () {
      const stored = readStoredSession()
      this.session = stored
      return stored
    },
    clearSession () {
      this.session = null
      writeStoredSession(null)
    }
  }
})
