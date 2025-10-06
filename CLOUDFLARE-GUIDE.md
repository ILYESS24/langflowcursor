# 🚀 Déploiement Langflow sur Cloudflare Pages

## Option 1 : Interface Web (Recommandé)

1. **Allez sur** https://pages.cloudflare.com
2. **Connectez votre repo** GitHub
3. **Sélectionnez** `ILYESS24/langflowcursor`
4. **Configurez** :
   - Build command: `cd src/frontend && npm install && npm run build`
   - Build output: `src/frontend/build`
   - Framework: `Vite`
5. **Déployez** en un clic

## Option 2 : Script automatique

### Windows :
```bash
deploy-cloudflare-windows.bat
```

### Linux/Mac :
```bash
chmod +x deploy-cloudflare.sh
./deploy-cloudflare.sh
```

## URLs de déploiement :
- **Frontend** : https://langflow-frontend.pages.dev
- **Backend** : À déployer séparément sur Railway/Render

## Coûts :
- ✅ **100% GRATUIT** pour commencer
- ✅ **500 builds/mois** gratuits
- ✅ **CDN global** gratuit
