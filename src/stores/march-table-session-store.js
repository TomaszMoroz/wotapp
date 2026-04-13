import { defineStore } from 'pinia'

const KEEP_FLAG_KEY = 'wot_march_table_keep_24h'
const SNAPSHOT_KEY = 'wot_march_table_snapshot'
const SNAPSHOT_TTL_MS = 24 * 60 * 60 * 1000

let snapshotTimer = null

function readKeepFlag () {
  try {
    if (typeof localStorage === 'undefined') return false
    return localStorage.getItem(KEEP_FLAG_KEY) === '1'
  } catch {
    return false
  }
}

function writeKeepFlag (enabled) {
  try {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(KEEP_FLAG_KEY, enabled ? '1' : '0')
  } catch {
    // ignore storage errors
  }
}

function clearSnapshotTimer () {
  if (snapshotTimer != null) {
    clearTimeout(snapshotTimer)
    snapshotTimer = null
  }
}

function readSnapshotRecord () {
  try {
    if (typeof localStorage === 'undefined') return null
    const raw = localStorage.getItem(SNAPSHOT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed.expiresAt !== 'number') return null
    if (parsed.expiresAt <= Date.now()) {
      localStorage.removeItem(SNAPSHOT_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function scheduleSnapshotExpiry (expiresAt) {
  clearSnapshotTimer()
  const delay = expiresAt - Date.now()
  if (delay <= 0) {
    clearStoredSnapshot()
    return
  }
  snapshotTimer = setTimeout(() => {
    clearStoredSnapshot()
  }, delay)
}

function clearStoredSnapshot () {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(SNAPSHOT_KEY)
    }
  } catch {
    // ignore storage errors
  }
  clearSnapshotTimer()
}

function cloneSnapshot (snapshot) {
  if (!snapshot) return null
  return JSON.parse(JSON.stringify(snapshot))
}

const initialSnapshotRecord = readSnapshotRecord()
if (initialSnapshotRecord) {
  scheduleSnapshotExpiry(initialSnapshotRecord.expiresAt)
}

export const useMarchTableSessionStore = defineStore('marchTableSession', {
  state: () => ({
    keep24h: readKeepFlag(),
    snapshot: initialSnapshotRecord ? initialSnapshotRecord.data : null
  }),
  actions: {
    setKeep24h (enabled) {
      this.keep24h = !!enabled
      writeKeepFlag(this.keep24h)
      if (!this.keep24h) {
        this.clearSnapshot()
      }
    },
    saveSnapshot (snapshot) {
      if (!this.keep24h) return
      const clonedSnapshot = cloneSnapshot(snapshot)
      const record = {
        expiresAt: Date.now() + SNAPSHOT_TTL_MS,
        data: clonedSnapshot
      }
      this.snapshot = clonedSnapshot
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(record))
        }
      } catch {
        // ignore storage errors
      }
      scheduleSnapshotExpiry(record.expiresAt)
    },
    loadSnapshot () {
      if (!this.keep24h) {
        this.snapshot = null
        return null
      }
      const record = readSnapshotRecord()
      if (!record) {
        this.snapshot = null
        return null
      }
      this.snapshot = record.data
      scheduleSnapshotExpiry(record.expiresAt)
      return cloneSnapshot(record.data)
    },
    clearSnapshot () {
      this.snapshot = null
      clearStoredSnapshot()
    }
  }
})
