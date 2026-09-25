$ErrorActionPreference = 'Stop'

$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
  throw 'Python is required to render the certificate preview.'
}

python -m pip install PyMuPDF
python (Join-Path $PSScriptRoot 'render-certificate.py')