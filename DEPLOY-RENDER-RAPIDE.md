# 🚀 DÉPLOIEMENT RAPIDE - RENDER.COM

## 🎯 **DÉPLOIEMENT EN 10 MINUTES**

### 🌐 **Étape 1 : Accéder à Render**
1. **Aller sur** : https://render.com
2. **Se connecter** avec GitHub
3. **Autoriser** Render

### 🆕 **Étape 2 : Créer Web Service**
1. **Cliquer** sur "New +" → "Web Service"
2. **Connecter** votre repository `langflowcursor-main`
3. **Configuration :**
   ```bash
   Name: all-ai-backend
   Environment: Python 3
   Build Command: pip install -e .
   Start Command: uvicorn allai.main:create_app --host 0.0.0.0 --port $PORT
   ```

### 🔑 **Étape 3 : Variables d'Environnement**
```bash
ALL_AI_SECRET_KEY=your-secret-key-change-in-production-12345
ALL_AI_SUPERUSER=admin
ALL_AI_SUPERUSER_PASSWORD=admin123
ALL_AI_CORS_ORIGINS=https://68eee78a.all-ai-frontend.pages.dev,https://all-ai-frontend.pages.dev
ALL_AI_LOG_LEVEL=INFO
ALL_AI_HOST=0.0.0.0
ALL_AI_PORT=$PORT
```

### 🗄️ **Étape 4 : Ajouter PostgreSQL**
1. **Cliquer** sur "New +" → "PostgreSQL"
2. **Configuration :**
   ```bash
   Name: all-ai-database
   Plan: Free
   ```

### 🔴 **Étape 5 : Ajouter Redis**
1. **Cliquer** sur "New +" → "Redis"
2. **Configuration :**
   ```bash
   Name: all-ai-redis
   Plan: Free
   ```

### 🔗 **Étape 6 : Connecter les Services**
1. **Retourner** au Web Service
2. **Ajouter** dans Environment :
   ```bash
   ALL_AI_DATABASE_URL=<PostgreSQL URL>
   ALL_AI_REDIS_URL=<Redis URL>
   ```

### 🚀 **Étape 7 : Déployer**
1. **Cliquer** sur "Create Web Service"
2. **Attendre** 5-10 minutes

---

## 🧪 **TEST RAPIDE**

### ✅ **Health Check**
```bash
curl https://votre-backend.onrender.com/health
```

### 🔐 **Test Auth**
```bash
curl -X POST https://votre-backend.onrender.com/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 📊 **API Docs**
Visitez : `https://votre-backend.onrender.com/docs`

---

## 🔗 **CONNEXION FRONTEND**

### 📝 **Mise à jour URL**
**Dans :** `src/frontend/src/customization/config-constants.ts`
```typescript
export const PROXY_TARGET = "https://votre-backend.onrender.com";
```

### 🔄 **Redéployer Frontend**
```bash
cd src/frontend
npm run build
wrangler pages deploy build --project-name=all-ai-frontend
```

---

## 🎊 **RÉSULTAT**

### ✅ **Backend Complet Opérationnel :**
- 🚀 **FastAPI** avec tous les endpoints
- 🗄️ **PostgreSQL** pour la base de données
- 🔴 **Redis** pour le cache
- 🔐 **Authentification** complète
- 📊 **Monitoring** intégré
- 🌐 **HTTPS** automatique

**Votre backend complet ALL AI sera opérationnel !** 🎉
