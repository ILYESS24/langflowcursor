@echo off
echo 🚀 DÉPLOIEMENT DU BACKEND COMPLET ALL AI SUR RAILWAY.APP
echo ========================================================
echo.

echo 📋 Vérification des prérequis...
echo.

REM Vérifier si Railway CLI est installé
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Railway CLI n'est pas installé
    echo 📦 Installation de Railway CLI...
    npm install -g @railway/cli
    if %errorlevel% neq 0 (
        echo ❌ Erreur lors de l'installation de Railway CLI
        echo 💡 Installez manuellement : npm install -g @railway/cli
        pause
        exit /b 1
    )
)

echo ✅ Railway CLI installé
echo.

echo 🔐 Connexion à Railway...
railway login
if %errorlevel% neq 0 (
    echo ❌ Erreur de connexion à Railway
    echo 💡 Connectez-vous manuellement : railway login
    pause
    exit /b 1
)

echo ✅ Connecté à Railway
echo.

echo 🏗️  Création du projet Railway...
railway init all-ai-backend
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la création du projet
    pause
    exit /b 1
)

echo ✅ Projet créé
echo.

echo 🗄️  Ajout de PostgreSQL...
railway add postgresql
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'ajout de PostgreSQL
    pause
    exit /b 1
)

echo ✅ PostgreSQL ajouté
echo.

echo 🔴 Ajout de Redis...
railway add redis
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'ajout de Redis
    pause
    exit /b 1
)

echo ✅ Redis ajouté
echo.

echo ⚙️  Configuration des variables d'environnement...
railway variables set ALL_AI_SECRET_KEY=your-secret-key-change-in-production
railway variables set ALL_AI_SUPERUSER=admin
railway variables set ALL_AI_SUPERUSER_PASSWORD=admin123
railway variables set ALL_AI_CORS_ORIGINS=https://68eee78a.all-ai-frontend.pages.dev,https://all-ai-frontend.pages.dev
railway variables set ALL_AI_LOG_LEVEL=INFO

echo ✅ Variables configurées
echo.

echo 🚀 Déploiement du backend...
railway up
if %errorlevel% neq 0 (
    echo ❌ Erreur lors du déploiement
    pause
    exit /b 1
)

echo ✅ Backend déployé !
echo.

echo 🌐 Récupération de l'URL du backend...
railway domain
echo.

echo 🎉 DÉPLOIEMENT TERMINÉ !
echo ========================
echo.
echo 📋 Prochaines étapes :
echo 1. Copiez l'URL du backend affichée ci-dessus
echo 2. Mettez à jour le frontend avec cette URL
echo 3. Testez l'application complète
echo.
echo 💡 Pour voir les logs : railway logs
echo 💡 Pour redéployer : railway up
echo.

pause
