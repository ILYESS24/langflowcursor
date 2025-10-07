# 🚀 GUIDE DE DÉPLOIEMENT - RENDER.COM

## 🎯 **DÉPLOIEMENT SUR RENDER.COM**

### 🌐 **Étape 1 : Créer un Compte**

1. **Aller sur** : https://render.com
2. **Cliquer** sur "Get Started for Free"
3. **Se connecter** avec votre compte GitHub
4. **Autoriser** Render à accéder à vos repositories

---

### 🆕 **Étape 2 : Créer un Web Service**

1. **Cliquer** sur "New +"
2. **Choisir** "Web Service"
3. **Connecter** votre repository GitHub
4. **Sélectionner** votre repository `langflowcursor-main`

---

### ⚙️ **Étape 3 : Configuration du Service**

#### 🔧 **Configuration de base :**
```bash
Name: all-ai-backend
Environment: Python 3
Region: Oregon (US West)
Branch: main
Root Directory: (laisser vide)
```

#### 🏗️ **Configuration du build :**
```bash
Build Command: pip install -e .
Start Command: uvicorn allai.main:create_app --host 0.0.0.0 --port $PORT
```

#### 🔑 **Variables d'environnement :**
```bash
ALL_AI_SECRET_KEY=your-secret-key-change-in-production-12345
ALL_AI_SUPERUSER=admin
ALL_AI_SUPERUSER_PASSWORD=admin123
ALL_AI_CORS_ORIGINS=https://68eee78a.all-ai-frontend.pages.dev,https://all-ai-frontend.pages.dev
ALL_AI_LOG_LEVEL=INFO
ALL_AI_HOST=0.0.0.0
ALL_AI_PORT=$PORT
```

---

### 🗄️ **Étape 4 : Ajouter PostgreSQL**

1. **Cliquer** sur "New +"
2. **Choisir** "PostgreSQL"
3. **Configuration :**
   ```bash
   Name: all-ai-database
   Database: allai
   User: allai
   Plan: Free
   Region: Oregon (US West)
   ```
4. **Cliquer** sur "Create Database"

---

### 🔴 **Étape 5 : Ajouter Redis**

1. **Cliquer** sur "New +"
2. **Choisir** "Redis"
3. **Configuration :**
   ```bash
   Name: all-ai-redis
   Plan: Free
   Region: Oregon (US West)
   ```
4. **Cliquer** sur "Create Redis"

---

### 🔗 **Étape 6 : Connecter les Services**

1. **Retourner** à votre Web Service
2. **Aller** dans l'onglet "Environment"
3. **Ajouter** les variables de base de données :
   ```bash
   ALL_AI_DATABASE_URL=<PostgreSQL URL from database>
   ALL_AI_REDIS_URL=<Redis URL from redis>
   ```

---

### 🚀 **Étape 7 : Déployer**

1. **Cliquer** sur "Create Web Service"
2. **Attendre** le déploiement (5-10 minutes)
3. **Vérifier** les logs pour s'assurer que tout fonctionne

---

## 🧪 **TEST DU DÉPLOIEMENT**

### ✅ **1. Health Check**
```bash
curl https://votre-backend.onrender.com/health
```

**Réponse attendue :**
```json
{
  "status": "ok",
  "message": "ALL AI Backend is running"
}
```

### 🔐 **2. Test d'Authentification**
```bash
curl -X POST https://votre-backend.onrender.com/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Réponse attendue :**
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "user": {
    "id": "...",
    "username": "admin",
    "email": "admin@allai.dev"
  }
}
```

### 📊 **3. API Documentation**
Visitez : `https://votre-backend.onrender.com/docs`

---

## 🔗 **CONNEXION FRONTEND**

### 📝 **Mise à jour de l'URL du backend**

**Dans le fichier :** `src/frontend/src/customization/config-constants.ts`

```typescript
export const PROXY_TARGET = "https://votre-backend.onrender.com";
```

### 🔄 **Redéployer le frontend**

```bash
cd src/frontend
npm run build
wrangler pages deploy build --project-name=all-ai-frontend
```

---

## 📊 **MONITORING**

### 📋 **Logs en temps réel**
- **Render Dashboard** → Votre service → Logs
- **Métriques** : CPU, RAM, Réseau
- **Health checks** automatiques

### 🔧 **Gestion du service**
- **Redéployer** : Cliquer sur "Manual Deploy"
- **Variables** : Onglet "Environment"
- **Logs** : Onglet "Logs"

---

## 🎊 **RÉSULTAT FINAL**

### ✅ **Backend Complet Opérationnel :**
- 🚀 **FastAPI** avec tous les endpoints
- 🗄️ **PostgreSQL** pour la base de données
- 🔴 **Redis** pour le cache
- 🔐 **Authentification** complète
- 📊 **Monitoring** intégré
- 🌐 **HTTPS** automatique

### 🔗 **URLs :**
- **Backend** : `https://votre-backend.onrender.com`
- **Frontend** : `https://68eee78a.all-ai-frontend.pages.dev`
- **API Docs** : `https://votre-backend.onrender.com/docs`

---

## 🆘 **DÉPANNAGE**

### ❌ **Problèmes courants :**

#### 🔧 **Erreur de build**
- Vérifiez les logs dans Render Dashboard
- Assurez-vous que toutes les variables sont configurées
- Vérifiez que le build command est correct

#### 🗄️ **Erreur de base de données**
- Vérifiez que PostgreSQL est bien connecté
- Vérifiez la variable `ALL_AI_DATABASE_URL`
- Assurez-vous que la base de données est active

#### 🔐 **Erreur d'authentification**
- Vérifiez les variables `ALL_AI_SUPERUSER` et `ALL_AI_SUPERUSER_PASSWORD`
- Vérifiez que l'utilisateur admin est créé

#### 🌐 **Erreur CORS**
- Vérifiez la variable `ALL_AI_CORS_ORIGINS`
- Assurez-vous que l'URL du frontend est incluse

---

## 🎯 **AVANTAGES DE RENDER**

### ✅ **Facilité :**
- Interface web intuitive
- Configuration en quelques clics
- Déploiement automatique

### ✅ **Fiabilité :**
- Infrastructure stable
- Monitoring intégré
- Support 24/7

### ✅ **Économique :**
- Plan gratuit généreux
- Pas de frais cachés
- Scaling automatique

---

## 🚀 **PROCHAINES ÉTAPES**

1. ✅ **Déployer** sur Render.com
2. 🔗 **Connecter** le frontend au backend
3. 🧪 **Tester** l'application complète
4. 🎨 **Personnaliser** l'interface
5. 🚀 **Mettre en production**

**Votre backend complet ALL AI sera opérationnel !** 🎉
