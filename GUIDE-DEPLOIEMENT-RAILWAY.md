# 🚀 GUIDE DE DÉPLOIEMENT - BACKEND COMPLET ALL AI

## 🎯 **DÉPLOIEMENT SUR RAILWAY.APP**

### 📋 **Étape 1 : Préparation**

#### 🔧 **1.1 Installer Railway CLI**
```bash
npm install -g @railway/cli
```

#### 🔐 **1.2 Se connecter à Railway**
```bash
railway login
```

---

### 🏗️ **Étape 2 : Création du Projet**

#### 🆕 **2.1 Créer un nouveau projet**
```bash
railway init all-ai-backend
```

#### 🗄️ **2.2 Ajouter PostgreSQL**
```bash
railway add postgresql
```

#### 🔴 **2.3 Ajouter Redis**
```bash
railway add redis
```

---

### ⚙️ **Étape 3 : Configuration**

#### 🔑 **3.1 Variables d'environnement obligatoires**
```bash
railway variables set ALL_AI_SECRET_KEY=your-secret-key-change-in-production
railway variables set ALL_AI_SUPERUSER=admin
railway variables set ALL_AI_SUPERUSER_PASSWORD=admin123
railway variables set ALL_AI_CORS_ORIGINS=https://68eee78a.all-ai-frontend.pages.dev,https://all-ai-frontend.pages.dev
railway variables set ALL_AI_LOG_LEVEL=INFO
```

#### 🔧 **3.2 Variables automatiques (déjà configurées)**
- `ALL_AI_DATABASE_URL` - Automatiquement configurée par PostgreSQL
- `ALL_AI_REDIS_URL` - Automatiquement configurée par Redis
- `ALL_AI_HOST` - Automatiquement configurée (0.0.0.0)
- `ALL_AI_PORT` - Automatiquement configurée ($PORT)

---

### 🚀 **Étape 4 : Déploiement**

#### 📤 **4.1 Déployer l'application**
```bash
railway up
```

#### 🌐 **4.2 Obtenir l'URL du backend**
```bash
railway domain
```

---

### 🔍 **Étape 5 : Vérification**

#### ✅ **5.1 Tester le health check**
```bash
curl https://votre-backend.railway.app/health
```

#### 🔐 **5.2 Tester l'authentification**
```bash
curl -X POST https://votre-backend.railway.app/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

---

## 🎯 **DÉPLOIEMENT AUTOMATIQUE**

### 🖱️ **Option 1 : Via l'Interface Web**

1. **Aller sur** : https://railway.app
2. **Se connecter** avec GitHub
3. **Cliquer** sur "New Project"
4. **Choisir** "Deploy from GitHub repo"
5. **Sélectionner** votre repository
6. **Ajouter** PostgreSQL et Redis
7. **Configurer** les variables d'environnement
8. **Déployer**

### 🖱️ **Option 2 : Via le Script Automatique**

```bash
# Exécuter le script de déploiement
deploy-railway-backend.bat
```

---

## 🔧 **CONFIGURATION AVANCÉE**

### 🗄️ **Base de Données PostgreSQL**

#### 📊 **Tables principales :**
- `flows` - Workflows utilisateur
- `users` - Utilisateurs
- `api_keys` - Clés API
- `projects` - Projets
- `files` - Fichiers uploadés
- `chat_messages` - Messages de chat

#### 🔧 **Migration automatique :**
Les migrations de base de données sont exécutées automatiquement au démarrage.

### 🔴 **Cache Redis**

#### ⚡ **Utilisé pour :**
- Cache des composants
- Sessions utilisateur
- Cache des réponses API
- Queue des tâches

---

## 🌐 **CONNEXION FRONTEND**

### 🔗 **Mise à jour de l'URL du backend**

#### 📝 **Dans le frontend :**
```typescript
// src/frontend/src/customization/config-constants.ts
export const PROXY_TARGET = "https://votre-backend.railway.app";
```

#### 🔄 **Redéployer le frontend :**
```bash
cd src/frontend
npm run build
wrangler pages deploy build --project-name=all-ai-frontend
```

---

## 📊 **MONITORING ET LOGS**

### 📋 **Voir les logs**
```bash
railway logs
```

### 📈 **Monitoring**
- **Railway Dashboard** : https://railway.app/dashboard
- **Métriques** : CPU, RAM, Réseau
- **Logs** : En temps réel

---

## 🔧 **GESTION DU PROJET**

### 🔄 **Redéployer**
```bash
railway up
```

### 🛑 **Arrêter**
```bash
railway down
```

### 🔧 **Variables d'environnement**
```bash
# Voir toutes les variables
railway variables

# Ajouter une variable
railway variables set KEY=value

# Supprimer une variable
railway variables delete KEY
```

---

## 🎊 **RÉSULTAT FINAL**

### ✅ **Backend Complet Déployé :**
- 🚀 **FastAPI** avec tous les endpoints
- 🗄️ **PostgreSQL** pour la base de données
- 🔴 **Redis** pour le cache
- 🔐 **Authentification** complète
- 📊 **Monitoring** intégré
- 🌐 **HTTPS** automatique
- 📈 **Scalabilité** automatique

### 🔗 **URLs :**
- **Backend** : `https://votre-backend.railway.app`
- **Frontend** : `https://68eee78a.all-ai-frontend.pages.dev`
- **API Docs** : `https://votre-backend.railway.app/docs`

---

## 🆘 **DÉPANNAGE**

### ❌ **Problèmes courants :**

#### 🔧 **Erreur de connexion à la base de données**
```bash
# Vérifier les variables
railway variables
# Redéployer
railway up
```

#### 🔐 **Erreur d'authentification**
```bash
# Vérifier les variables d'auth
railway variables set ALL_AI_SUPERUSER=admin
railway variables set ALL_AI_SUPERUSER_PASSWORD=admin123
```

#### 🌐 **Erreur CORS**
```bash
# Mettre à jour les origines autorisées
railway variables set ALL_AI_CORS_ORIGINS=https://votre-frontend.com
```

---

## 🎯 **PROCHAINES ÉTAPES**

1. ✅ **Déployer le backend** sur Railway
2. 🔗 **Connecter le frontend** au backend
3. 🧪 **Tester l'application** complète
4. 🎨 **Personnaliser** l'interface
5. 🚀 **Mettre en production**

**Votre backend complet ALL AI sera opérationnel !** 🎉
