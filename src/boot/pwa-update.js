// src/boot/pwa-update.js
if (process.env.MODE === 'pwa') {
  import('../../src-pwa/register-service-worker')
}
