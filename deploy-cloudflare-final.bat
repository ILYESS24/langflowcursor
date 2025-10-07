@echo off
echo 🚀 Déploiement final de Langflow sur Cloudflare Pages
echo ====================================================
echo.

echo [1/6] Vérification de Wrangler CLI...
wrangler --version
if errorlevel 1 (
    echo [ERROR] Wrangler CLI non installé
    pause
    exit /b 1
)
echo [SUCCESS] Wrangler CLI trouvé

echo [2/6] Connexion à Cloudflare...
echo [INFO] Une fenêtre de navigateur va s'ouvrir pour la connexion
wrangler login

echo [3/6] Déploiement du frontend sur Cloudflare Pages...
cd src/frontend
wrangler pages deploy build --project-name langflow-frontend --compatibility-date 2024-01-01

echo [4/6] Retour au répertoire racine...
cd ../..

echo [5/6] Déploiement du backend sur Cloudflare Workers...
wrangler deploy

echo [6/6] ✅ Déploiement terminé !
echo.
echo 🎉 Votre Langflow est maintenant en ligne sur Cloudflare !
echo.
echo 🌐 URLs de votre application :
echo    Frontend : https://langflow-frontend.pages.dev
echo    Backend  : https://langflow-backend.workers.dev
echo.
echo 📋 Prochaines étapes :
echo    1. Ouvrez https://langflow-frontend.pages.dev
echo    2. Créez un compte admin
echo    3. Commencez à créer vos workflows !
echo.
pause
