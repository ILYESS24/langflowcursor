# 🌐 DÉPLOIEMENT VIA L'INTERFACE WEB RAILWAY

## 🎯 **MÉTHODE RECOMMANDÉE - INTERFACE WEB**

Puisque la session Railway CLI a expiré, utilisons l'interface web qui est plus simple et plus fiable.

---

## 🚀 **ÉTAPES DE DÉPLOIEMENT**

### 🌐 **Étape 1 : Accéder à Railway**

1. **Ouvrez votre navigateur**
2. **Allez sur** : https://railway.app
3. **Connectez-vous** avec votre compte GitHub

---

### 🆕 **Étape 2 : Créer un Nouveau Projet**

1. **Cliquez** sur "New Project"
2. **Choisissez** "Deploy from GitHub repo"
3. **Sélectionnez** votre repository `langflowcursor-main`
4. **Cliquez** sur "Deploy Now"

---

### 🗄️ **Étape 3 : Ajouter PostgreSQL**

1. **Dans votre projet**, cliquez sur "New"
2. **Choisissez** "Database" → "PostgreSQL"
3. **Attendez** que PostgreSQL soit configuré
4. **Notez** les variables d'environnement générées

---

### 🔴 **Étape 4 : Ajouter Redis**

1. **Cliquez** sur "New"
2. **Choisissez** "Database" → "Redis"
3. **Attendez** que Redis soit configuré
4. **Notez** les variables d'environnement générées

---

### ⚙️ **Étape 5 : Configurer l'Application**

1. **Cliquez** sur votre service d'application
2. **Allez** dans l'onglet "Variables"
3. **Ajoutez** les variables suivantes :

#### 🔑 **Variables d'Environnement :**
```bash
ALL_AI_SECRET_KEY=your-secret-key-change-in-production-12345
ALL_AI_SUPERUSER=admin
ALL_AI_SUPERUSER_PASSWORD=admin123
ALL_AI_CORS_ORIGINS=https://68eee78a.all-ai-frontend.pages.dev,https://all-ai-frontend.pages.dev
ALL_AI_LOG_LEVEL=INFO
ALL_AI_HOST=0.0.0.0
ALL_AI_PORT=$PORT
```

#### 🗄️ **Variables de Base de Données (automatiques) :**
```bash
ALL_AI_DATABASE_URL=${{Postgres.DATABASE_URL}}
ALL_AI_REDIS_URL=${{Redis.REDIS_URL}}
```

---

### 🔧 **Étape 6 : Configurer le Build**

1. **Dans l'onglet "Settings"**
2. **Configurez** :
   - **Build Command** : `pip install -e .`
   - **Start Command** : `uvicorn allai.main:create_app --host 0.0.0.0 --port $PORT`
   - **Health Check Path** : `/health`

---

### 🚀 **Étape 7 : Déployer**

1. **Cliquez** sur "Deploy"
2. **Attendez** que le build se termine (5-10 minutes)
3. **Vérifiez** les logs pour s'assurer que tout fonctionne

---

## 🧪 **TEST DU DÉPLOIEMENT**

### ✅ **1. Health Check**
```bash
curl https://votre-backend.railway.app/health
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

### 📊 **3. API Documentation**
Visitez : `https://votre-backend.railway.app/docs`

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

### 📋 **Logs en temps réel**
- **Railway Dashboard** → Votre projet → Logs
- **Métriques** : CPU, RAM, Réseau
- **Health checks** automatiques

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
- Vérifiez les logs dans Railway Dashboard
- Assurez-vous que toutes les variables sont configurées

#### 🗄️ **Erreur de base de données**
- Vérifiez que PostgreSQL est bien connecté
- Vérifiez la variable `ALL_AI_DATABASE_URL`

#### 🔐 **Erreur d'authentification**
- Vérifiez les variables `ALL_AI_SUPERUSER` et `ALL_AI_SUPERUSER_PASSWORD`

---

## 🎯 **AVANTAGES DE L'INTERFACE WEB**

### ✅ **Plus Simple :**
- Pas besoin de CLI
- Interface graphique intuitive
- Configuration visuelle

### ✅ **Plus Fiable :**
- Pas de problèmes de session
- Déploiement automatique
- Monitoring intégré

### ✅ **Plus Rapide :**
- Déploiement en un clic
- Configuration en quelques minutes
- Logs en temps réel

---

## 🚀 **PROCHAINES ÉTAPES**

1. ✅ **Déployer** via l'interface web Railway
2. 🔗 **Connecter** le frontend au backend
3. 🧪 **Tester** l'application complète
4. 🎨 **Personnaliser** l'interface
5. 🚀 **Mettre en production**

**Votre backend complet ALL AI sera opérationnel !** 🎉
