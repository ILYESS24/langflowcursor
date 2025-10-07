# 🚀 DÉPLOIEMENT MANUEL - BACKEND COMPLET ALL AI

## 🎯 **ÉTAPES DE DÉPLOIEMENT**

### 🔐 **Étape 1 : Connexion à Railway**

**Ouvrez un terminal et exécutez :**
```bash
railway login
```

**Suivez les instructions :**
1. Appuyez sur **Entrée** pour ouvrir le navigateur
2. **Connectez-vous** avec votre compte GitHub
3. **Autorisez** Railway à accéder à votre compte
4. **Retournez** au terminal

---

### 🏗️ **Étape 2 : Création du Projet**

```bash
railway init all-ai-backend
```

**Choisissez :**
- **Template** : Empty Project
- **Nom** : all-ai-backend

---

### 🗄️ **Étape 3 : Ajout de PostgreSQL**

```bash
railway add postgresql
```

**Attendez** que PostgreSQL soit configuré.

---

### 🔴 **Étape 4 : Ajout de Redis**

```bash
railway add redis
```

**Attendez** que Redis soit configuré.

---

### ⚙️ **Étape 5 : Configuration des Variables**

```bash
railway variables set ALL_AI_SECRET_KEY=your-secret-key-change-in-production
railway variables set ALL_AI_SUPERUSER=admin
railway variables set ALL_AI_SUPERUSER_PASSWORD=admin123
railway variables set ALL_AI_CORS_ORIGINS=https://68eee78a.all-ai-frontend.pages.dev,https://all-ai-frontend.pages.dev
railway variables set ALL_AI_LOG_LEVEL=INFO
```

---

### 🚀 **Étape 6 : Déploiement**

```bash
railway up
```

**Attendez** que le déploiement se termine (5-10 minutes).

---

### 🌐 **Étape 7 : Obtenir l'URL**

```bash
railway domain
```

**Copiez** l'URL affichée (ex: `https://all-ai-backend-production.up.railway.app`)

---

## 🎯 **DÉPLOIEMENT VIA L'INTERFACE WEB**

### 🌐 **Alternative : Interface Web Railway**

1. **Aller sur** : https://railway.app
2. **Se connecter** avec GitHub
3. **Cliquer** sur "New Project"
4. **Choisir** "Deploy from GitHub repo"
5. **Sélectionner** votre repository
6. **Configurer** :
   - **Build Command** : `pip install -e .`
   - **Start Command** : `uvicorn allai.main:create_app --host 0.0.0.0 --port $PORT`
7. **Ajouter** PostgreSQL et Redis
8. **Configurer** les variables d'environnement
9. **Déployer**

---

## 🔧 **VARIABLES D'ENVIRONNEMENT**

### ✅ **Variables Automatiques (déjà configurées)**
- `ALL_AI_DATABASE_URL` - PostgreSQL
- `ALL_AI_REDIS_URL` - Redis
- `ALL_AI_HOST` - 0.0.0.0
- `ALL_AI_PORT` - $PORT

### 🔑 **Variables à Configurer**
```bash
ALL_AI_SECRET_KEY=your-secret-key-change-in-production
ALL_AI_SUPERUSER=admin
ALL_AI_SUPERUSER_PASSWORD=admin123
ALL_AI_CORS_ORIGINS=https://68eee78a.all-ai-frontend.pages.dev,https://all-ai-frontend.pages.dev
ALL_AI_LOG_LEVEL=INFO
```

---

## 🧪 **TEST DU DÉPLOIEMENT**

### ✅ **1. Health Check**
```bash
curl https://votre-backend.railway.app/health
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
curl -X POST https://votre-backend.railway.app/api/v1/login \
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

### 📊 **3. Test des Endpoints**
```bash
curl https://votre-backend.railway.app/api/v1/flows
curl https://votre-backend.railway.app/api/v1/users
curl https://votre-backend.railway.app/docs
```

---

## 🔗 **CONNEXION FRONTEND**

### 📝 **Mise à jour de l'URL du backend**

**Dans le fichier :** `src/frontend/src/customization/config-constants.ts`

```typescript
export const PROXY_TARGET = "https://votre-backend.railway.app";
```

### 🔄 **Redéployer le frontend**

```bash
cd src/frontend
npm run build
wrangler pages deploy build --project-name=all-ai-frontend
```

---

## 📊 **MONITORING**

### 📋 **Voir les logs**
```bash
railway logs
```

### 🌐 **Dashboard Railway**
- **URL** : https://railway.app/dashboard
- **Métriques** : CPU, RAM, Réseau
- **Logs** : En temps réel

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
- **Backend** : `https://votre-backend.railway.app`
- **Frontend** : `https://68eee78a.all-ai-frontend.pages.dev`
- **API Docs** : `https://votre-backend.railway.app/docs`

---

## 🆘 **DÉPANNAGE**

### ❌ **Problèmes courants :**

#### 🔧 **Erreur de build**
```bash
# Vérifier les logs
railway logs
# Redéployer
railway up
```

#### 🗄️ **Erreur de base de données**
```bash
# Vérifier les variables
railway variables
# Redémarrer
railway restart
```

#### 🔐 **Erreur d'authentification**
```bash
# Vérifier les variables d'auth
railway variables set ALL_AI_SUPERUSER=admin
railway variables set ALL_AI_SUPERUSER_PASSWORD=admin123
```

---

## 🎯 **PROCHAINES ÉTAPES**

1. ✅ **Déployer le backend** sur Railway
2. 🔗 **Connecter le frontend** au backend
3. 🧪 **Tester l'application** complète
4. 🎨 **Personnaliser** l'interface
5. 🚀 **Mettre en production**

**Votre backend complet ALL AI sera opérationnel !** 🎉
