$ErrorActionPreference = 'Stop'

$html = Get-Content -Raw (Join-Path $PSScriptRoot 'index.html')
$javascript = Get-Content -Raw (Join-Path $PSScriptRoot 'script.js')

$requiredMarkup = @(
  'id="project-lab"',
  'id="projectSearch"',
  'id="projectResults"',
  'id="projectStatus"',
  'data-filter="ai"',
  'data-filter="web"',
  'data-filter="foundations"'
)

foreach ($marker in $requiredMarkup) {
  if ($html -notmatch [regex]::Escape($marker)) {
    throw "Missing HTML marker: $marker"
  }
}

if (($html -split 'class="lab-card"').Count -ne 7) {
  throw 'Expected six Project Lab cards'
}

foreach ($hook in @('updateProjectLab', 'activeProjectFilter', 'projectEmpty')) {
  if ($javascript -notmatch [regex]::Escape($hook)) {
    throw "Missing JavaScript hook: $hook"
  }
}

node --check (Join-Path $PSScriptRoot 'script.js')
Write-Output 'Project Lab validation passed.'
