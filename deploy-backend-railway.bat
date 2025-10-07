@echo off
echo 🚀 Déploiement du backend Langflow sur Railway
echo ==============================================

echo [1/5] Vérification de Railway CLI...
railway --version
if errorlevel 1 (
    echo Installation de Railway CLI...
    npm install -g @railway/cli
    echo ✅ Railway CLI installé
) else (
    echo ✅ Railway CLI trouvé
)

echo [2/5] Connexion à Railway...
echo Une fenêtre de navigateur va s'ouvrir pour la connexion
railway login

echo [3/5] Création du projet Railway...
railway init

echo [4/5] Déploiement du backend...
railway up

echo [5/5] ✅ Déploiement terminé !
echo.
echo 🌐 Votre backend est maintenant en ligne !
echo Copiez l'URL fournie par Railway et mettez à jour le frontend.
echo.
echo 🔧 Prochaines étapes :
echo 1. Copiez l'URL du backend Railway
echo 2. Mettez à jour src/frontend/src/customization/config-constants.ts
echo 3. Remplacez PROXY_TARGET par l'URL Railway
echo 4. Redéployez le frontend
echo.
pause
