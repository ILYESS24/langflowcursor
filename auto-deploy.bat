@echo off
echo 🚀 Déploiement automatique de Langflow
echo =====================================
echo.

echo [INFO] Vérification de Railway CLI...
railway --version
if errorlevel 1 (
    echo [ERROR] Railway CLI non installé
    pause
    exit /b 1
)

echo [INFO] Tentative de connexion à Railway...
echo [INFO] Si une fenêtre de navigateur s'ouvre, connectez-vous avec GitHub
railway login

echo [INFO] Initialisation du projet...
railway init --name langflow-app

echo [INFO] Déploiement en cours...
railway up

echo [INFO] Récupération de l'URL...
railway status

echo.
echo ✅ Déploiement terminé !
echo Votre application Langflow est maintenant en ligne !
echo.
pause
