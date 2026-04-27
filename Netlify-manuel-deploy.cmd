@echo off
chcp 65001 >nul
title Antep Fistik Marka - Netlify manuel deploy
cd /d "%~dp0"

echo.
echo ========================================
echo  Antep Fistik Marka - Netlify deploy
echo  Dizin: %CD%
echo ========================================
echo.

echo [1/2] npm run build ...
call npm run build
if errorlevel 1 (
  echo.
  echo BUILD HATASI.
  pause
  exit /b 1
)

echo.
echo [2/2] npx netlify deploy --prod
echo 401 / oturum: once bu pencerede  npx netlify login  calistirin.
echo.
call npx netlify deploy --prod
if errorlevel 1 (
  echo.
  echo DEPLOY HATASI. netlify login veya panelden Git deploy deneyin.
  pause
  exit /b 1
)

echo.
echo Bitti. Netlify ciktisindaki "Production URL" canli adrestir.
echo.
pause
