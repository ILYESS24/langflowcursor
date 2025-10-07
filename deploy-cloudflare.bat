@echo off
echo 🚀 Déploiement sur Cloudflare Pages...
echo =====================================

echo [1/4] Connexion à Cloudflare...
wrangler login

echo [2/4] Déploiement du frontend...
cd src/frontend
wrangler pages deploy build --project-name langflow-frontend

echo [3/4] Déploiement du backend...
cd ../..
wrangler deploy

echo [4/4] ✅ Déploiement terminé !
echo 🌐 Votre application est maintenant en ligne sur Cloudflare !
pause
