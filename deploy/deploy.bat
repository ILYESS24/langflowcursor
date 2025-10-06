@echo off
REM 🚀 Script de déploiement automatisé pour Langflow (Windows)
REM Supporte : Render, Railway, Fly.io

setlocal enabledelayedexpansion

echo.
echo 🚀 Déploiement Langflow
echo =======================
echo.

REM Vérification des prérequis
echo [INFO] Vérification des prérequis...

REM Vérifier Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git n'est pas installé
    pause
    exit /b 1
)

REM Vérifier que nous sommes dans un repo Git
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Ce n'est pas un repository Git
    pause
    exit /b 1
)

echo [SUCCESS] Prérequis vérifiés
echo.

:MENU
echo Choisissez votre plateforme :
echo 1) Render.com (Recommandé)
echo 2) Railway.app
echo 3) Fly.io
echo 4) Afficher les instructions pour toutes les plateformes
echo 5) Quitter
echo.
set /p choice="Votre choix (1-5): "

if "%choice%"=="1" goto RENDER
if "%choice%"=="2" goto RAILWAY
if "%choice%"=="3" goto FLY
if "%choice%"=="4" goto ALL_INSTRUCTIONS
if "%choice%"=="5" goto EXIT
echo [ERROR] Choix invalide. Veuillez choisir 1-5.
goto MENU

:RENDER
echo.
echo [INFO] Déploiement sur Render.com...
echo.
echo 1. Poussez votre code sur GitHub :
echo    git add .
echo    git commit -m "Deploy to Render"
echo    git push origin main
echo.
echo 2. Allez sur https://render.com
echo 3. Créez un compte et connectez GitHub
echo 4. Sélectionnez "New Web Service"
echo 5. Choisissez votre repo Langflow
echo 6. Render détectera automatiquement render.yaml
echo 7. Cliquez sur "Deploy"
echo.
echo [SUCCESS] Instructions Render affichées
pause
goto END

:RAILWAY
echo.
echo [INFO] Déploiement sur Railway.app...
echo.
echo 1. Installez Railway CLI :
echo    npm install -g @railway/cli
echo.
echo 2. Connectez-vous :
echo    railway login
echo.
echo 3. Initialisez le projet :
echo    railway init
echo.
echo 4. Déployez :
echo    railway up
echo.
echo [SUCCESS] Instructions Railway affichées
pause
goto END

:FLY
echo.
echo [INFO] Déploiement sur Fly.io...
echo.
echo 1. Installez Fly CLI :
echo    curl -L https://fly.io/install.sh | sh
echo    (ou téléchargez depuis https://fly.io/docs/hands-on/install-flyctl/)
echo.
echo 2. Connectez-vous :
echo    fly auth login
echo.
echo 3. Lancez le déploiement :
echo    fly launch
echo.
echo 4. Déployez :
echo    fly deploy
echo.
echo [SUCCESS] Instructions Fly.io affichées
pause
goto END

:ALL_INSTRUCTIONS
echo.
echo 📋 Instructions complètes pour toutes les plateformes
echo =====================================================
echo.
echo 🎯 RENDER.COM (Recommandé)
echo -------------------------
echo 1. Poussez votre code sur GitHub
echo 2. Allez sur https://render.com
echo 3. Créez un compte et connectez GitHub
echo 4. Sélectionnez "New Web Service"
echo 5. Choisissez votre repo Langflow
echo 6. Render détectera automatiquement render.yaml
echo 7. Cliquez sur "Deploy"
echo.
echo 🚂 RAILWAY.APP
echo -------------
echo 1. Installez Railway CLI: npm install -g @railway/cli
echo 2. Connectez-vous: railway login
echo 3. Initialisez: railway init
echo 4. Déployez: railway up
echo.
echo ✈️  FLY.IO
echo ---------
echo 1. Installez Fly CLI: curl -L https://fly.io/install.sh | sh
echo 2. Connectez-vous: fly auth login
echo 3. Lancez: fly launch
echo 4. Déployez: fly deploy
echo.
echo ☁️  CLOUDFLARE PAGES (Frontend uniquement)
echo ------------------------------------------
echo 1. Allez sur https://pages.cloudflare.com
echo 2. Connectez votre repo GitHub
echo 3. Configurez:
echo    - Build command: cd src/frontend && npm install && npm run build
echo    - Build output: src/frontend/build
echo 4. Déployez le backend séparément sur Railway/Fly.io
echo.
pause
goto MENU

:EXIT
echo [INFO] Au revoir !
goto END

:END
endlocal
