#!/usr/bin/env bash
# Deploy PWA na kitbag721.pl przez FTP.
# Uzycie:
#   ./scripts/deploy-pwa.sh          -> build + upload
#   ./scripts/deploy-pwa.sh --no-build -> tylko upload dist/pwa
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .env.deploy ]; then
  echo "Brak .env.deploy (FTP_HOST/FTP_USER/FTP_PASS/FTP_REMOTE_DIR)" >&2
  exit 1
fi
# shellcheck disable=SC1091
set -a; source .env.deploy; set +a

if [ "${1:-}" != "--no-build" ]; then
  echo "== quasar build -m pwa"
  npx quasar build -m pwa
fi

echo "== FTP upload dist/pwa -> ${FTP_HOST}:${FTP_REMOTE_DIR}"
python3 scripts/ftp_upload.py "$(pwd)/dist/pwa"
echo "== DONE https://${FTP_HOST}/"
