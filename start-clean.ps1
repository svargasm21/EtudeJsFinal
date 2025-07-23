#!/usr/bin/env pwsh

# Script para limpiar cache y ejecutar EtudeJS sin problemas de CSS

Write-Host "🧹 Limpiando cache de Next.js..." -ForegroundColor Yellow

# Navegar al directorio del proyecto
Set-Location "c:\Users\aiize\OneDrive\Documentos\EtudeJs"

# Limpiar cache de Next.js
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "✅ Cache .next eliminado" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No se encontró cache .next" -ForegroundColor Blue
}

# Limpiar cache de TypeScript
if (Test-Path "tsconfig.tsbuildinfo") {
    Remove-Item -Force tsconfig.tsbuildinfo
    Write-Host "✅ Cache de TypeScript eliminado" -ForegroundColor Green
}

Write-Host "🚀 Iniciando servidor de desarrollo sin Turbopack..." -ForegroundColor Cyan

# Ejecutar Next.js sin Turbopack
npx next dev
