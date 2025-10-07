# 🚀 Guide de déploiement du backend Langflow

## ✅ **Frontend restauré !**

J'ai restauré la vraie interface Langflow. Maintenant, déployons le backend pour que tout fonctionne.

## 🎯 **Étapes pour déployer le backend :**

### **Option 1 : Script automatique (Recommandé)**

1. **Double-cliquez sur** `deploy-backend-railway.bat`
2. **Suivez les instructions** à l'écran
3. **Connectez-vous** à Railway via le navigateur
4. **Attendez** le déploiement (5-10 minutes)

### **Option 2 : Manuel**

1. **Allez sur** [https://railway.app](https://railway.app)
2. **Créez un compte** et connectez GitHub
3. **Cliquez sur** "New Project"
4. **Sélectionnez** "Deploy from GitHub repo"
5. **Choisissez** `ILYESS24/langflowcursor`
6. **Railway détectera** automatiquement `railway.json`
7. **Cliquez sur** "Deploy"

## 🔧 **Après le déploiement du backend :**

1. **Copiez l'URL** du backend Railway (ex: `https://langflow-backend-production-xxxx.up.railway.app`)

2. **Mettez à jour** le frontend :
   - Ouvrez `src/frontend/src/customization/config-constants.ts`
   - Remplacez `PROXY_TARGET` par l'URL Railway

3. **Redéployez** le frontend :
   ```bash
   cd src/frontend
   npm run build
   wrangler pages deploy build --project-name langflow-frontend
   ```

## 🌐 **URLs finales :**

- **Frontend** : `https://langflow-frontend.pages.dev`
- **Backend** : `https://your-backend.railway.app`

## 💰 **Coûts :**

- ✅ **Frontend** : 100% gratuit sur Cloudflare
- ✅ **Backend** : 500 heures/mois gratuites sur Railway
- ✅ **Total** : Gratuit pour commencer

## 🎉 **Résultat final :**

Votre **Langflow complet** sera en ligne avec :
- ✅ **Vraie interface** Langflow
- ✅ **Backend fonctionnel** 
- ✅ **Authentification** complète
- ✅ **Toutes les fonctionnalités** disponibles

## 🆘 **En cas de problème :**

### **Backend ne démarre pas :**
1. Vérifiez les logs dans Railway
2. Assurez-vous que `pyproject.toml` est correct
3. Vérifiez la version Python

### **Frontend ne se connecte pas :**
1. Vérifiez l'URL du backend
2. Assurez-vous que CORS est configuré
3. Vérifiez les variables d'environnement

---

## 🎯 **Résumé :**

**Votre vraie interface Langflow est restaurée !**

1. **Exécutez** `deploy-backend-railway.bat`
2. **Connectez-vous** à Railway
3. **Déployez** le backend
4. **Mettez à jour** le frontend
5. **Votre Langflow complet** sera en ligne !

**Votre application sera fonctionnelle dans 10-15 minutes !** 🚀
