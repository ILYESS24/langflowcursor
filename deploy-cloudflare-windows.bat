@echo off
echo 🚀 Déploiement sur Cloudflare Pages...
echo =====================================

echo [1/4] Vérification de Wrangler CLI...
wrangler --version
if errorlevel 1 (
    echo Installation de Wrangler CLI...
    npm install -g wrangler
)

echo [2/4] Connexion à Cloudflare...
echo Une fenêtre de navigateur va s'ouvrir
wrangler login

echo [3/4] Déploiement du frontend...
cd src/frontend
wrangler pages deploy build --project-name langflow-frontend

echo [4/4] ✅ Déploiement terminé !
echo.
echo 🌐 Votre application est accessible sur :
echo    https://langflow-frontend.pages.dev
echo.
pause
