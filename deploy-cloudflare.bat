@echo off
echo 🚀 Déploiement sur Cloudflare Pages...

REM Installer Wrangler CLI
npm install -g wrangler

REM Se connecter à Cloudflare
wrangler login

REM Déployer
wrangler pages deploy src/frontend/build --project-name langflow-frontend

echo ✅ Déploiement terminé !
echo 🌐 Votre application est accessible sur :
echo    https://langflow-frontend.pages.dev
pause
