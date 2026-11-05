#!/usr/bin/env bash
# Fabrique dist/pv-conseil-copropriete.zip (skill importable dans Claude).
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p dist
rm -f dist/pv-conseil-copropriete.zip
zip -rq dist/pv-conseil-copropriete.zip pv-conseil-copropriete \
  -x '*/__pycache__/*' '*/candidats/*' '*/brand.proposition.json' '*.pyc'
echo "dist/pv-conseil-copropriete.zip"
unzip -l dist/pv-conseil-copropriete.zip | tail -1
