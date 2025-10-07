@echo off
echo 🚀 DÉPLOIEMENT DU BACKEND COMPLET ALL AI SUR RENDER.COM
echo ========================================================
echo.

echo 📋 Instructions de déploiement sur Render.com
echo.

echo 🌐 ÉTAPE 1 : Accéder à Render.com
echo =================================
echo 1. Ouvrez votre navigateur
echo 2. Allez sur : https://render.com
echo 3. Cliquez sur "Get Started for Free"
echo 4. Connectez-vous avec votre compte GitHub
echo 5. Autorisez Render à accéder à vos repositories
echo.
pause

echo 🆕 ÉTAPE 2 : Créer un Web Service
echo ================================
echo 1. Cliquez sur "New +"
echo 2. Choisissez "Web Service"
echo 3. Connectez votre repository GitHub
echo 4. Sélectionnez votre repository "langflowcursor-main"
echo 5. Cliquez sur "Connect"
echo.
pause

echo ⚙️ ÉTAPE 3 : Configuration du Service
echo ====================================
echo Configuration de base :
echo - Name: all-ai-backend
echo - Environment: Python 3
echo - Region: Oregon (US West)
echo - Branch: main
echo - Root Directory: (laisser vide)
echo.
echo Configuration du build :
echo - Build Command: pip install -e .
echo - Start Command: uvicorn allai.main:create_app --host 0.0.0.0 --port $PORT
echo.
pause

echo 🔑 ÉTAPE 4 : Variables d'Environnement
echo =====================================
echo Ajoutez ces variables dans l'onglet "Environment" :
echo.
echo ALL_AI_SECRET_KEY=your-secret-key-change-in-production-12345
echo ALL_AI_SUPERUSER=admin
echo ALL_AI_SUPERUSER_PASSWORD=admin123
echo ALL_AI_CORS_ORIGINS=https://68eee78a.all-ai-frontend.pages.dev,https://all-ai-frontend.pages.dev
echo ALL_AI_LOG_LEVEL=INFO
echo ALL_AI_HOST=0.0.0.0
echo ALL_AI_PORT=$PORT
echo.
pause

echo 🗄️ ÉTAPE 5 : Ajouter PostgreSQL
echo ===============================
echo 1. Cliquez sur "New +"
echo 2. Choisissez "PostgreSQL"
echo 3. Configuration :
echo    - Name: all-ai-database
echo    - Database: allai
echo    - User: allai
echo    - Plan: Free
echo    - Region: Oregon (US West)
echo 4. Cliquez sur "Create Database"
echo.
pause

echo 🔴 ÉTAPE 6 : Ajouter Redis
echo ==========================
echo 1. Cliquez sur "New +"
echo 2. Choisissez "Redis"
echo 3. Configuration :
echo    - Name: all-ai-redis
echo    - Plan: Free
echo    - Region: Oregon (US West)
echo 4. Cliquez sur "Create Redis"
echo.
pause

echo 🔗 ÉTAPE 7 : Connecter les Services
echo ==================================
echo 1. Retournez à votre Web Service
echo 2. Allez dans l'onglet "Environment"
echo 3. Ajoutez les variables de base de données :
echo    - ALL_AI_DATABASE_URL=<PostgreSQL URL from database>
echo    - ALL_AI_REDIS_URL=<Redis URL from redis>
echo.
echo 💡 Copiez les URLs depuis vos services PostgreSQL et Redis
echo.
pause

echo 🚀 ÉTAPE 8 : Déployer
echo ====================
echo 1. Cliquez sur "Create Web Service"
echo 2. Attendez le déploiement (5-10 minutes)
echo 3. Vérifiez les logs pour vous assurer que tout fonctionne
echo.
pause

echo 🧪 ÉTAPE 9 : Test du Déploiement
echo ================================
echo Une fois déployé, testez avec ces commandes :
echo.
echo Health Check :
echo curl https://votre-backend.onrender.com/health
echo.
echo Test d'authentification :
echo curl -X POST https://votre-backend.onrender.com/api/v1/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
echo.
echo API Documentation :
echo https://votre-backend.onrender.com/docs
echo.
pause

echo 🎉 DÉPLOIEMENT TERMINÉ !
echo ========================
echo.
echo 📋 Prochaines étapes :
echo 1. Copiez l'URL de votre backend (ex: https://all-ai-backend.onrender.com)
echo 2. Mettez à jour le frontend avec cette URL
echo 3. Testez l'application complète
echo.
echo 💡 Pour voir les logs : Render Dashboard → Votre service → Logs
echo 💡 Pour redéployer : Render Dashboard → Votre service → Manual Deploy
echo.

pause
