$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue) -or -not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw 'Node.js and npm are required to build from source. Install Node.js LTS from https://nodejs.org/ and rerun this script.'
}
npm ci --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
npm run build
if ($LASTEXITCODE -ne 0) { throw 'Installer build failed.' }
Write-Host "Installer built in $PSScriptRoot\release"
