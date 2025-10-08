# 🚀 Guide de Déploiement Vercel + Railway pour Langflow 2.0

## ✅ **Configuration Terminée !**

Votre projet est maintenant configuré pour :
- **Frontend** : Vercel (gratuit)
- **Backend** : Railway (gratuit)

## 🎯 **Architecture de Déploiement :**

```
Frontend (React) → Vercel → Backend (FastAPI) → Railway
```

## 📋 **Étapes de Déploiement :**

### **Étape 1 : Déployer le Backend sur Railway**

1. **Allez sur** [railway.app](https://railway.app)
2. **Cliquez "Start a New Project"**
3. **Connectez GitHub**
4. **Sélectionnez "Deploy from GitHub repo"**
5. **Choisissez** `ILYESS24/langflow2.0`
6. **Railway détectera** `railway.json` automatiquement
7. **Attendez 2-3 minutes** pour le déploiement

### **Étape 2 : Déployer le Frontend sur Vercel**

1. **Allez sur** [vercel.com](https://vercel.com)
2. **Cliquez "Sign Up"** et connectez GitHub
3. **Cliquez "New Project"**
4. **Sélectionnez** `ILYESS24/langflow2.0`
5. **Configuration automatique** :
   - **Framework Preset** : Vite
   - **Root Directory** : `src/frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `build`
6. **Variables d'environnement** :
   - `VITE_PROXY_TARGET` : `https://langflow-backend.railway.app`
   - `BACKEND_URL` : `https://langflow-backend.railway.app`
7. **Cliquez "Deploy"**

## 🌐 **URLs de Votre Application :**

- **Frontend** : `https://langflow2-0.vercel.app`
- **Backend** : `https://langflow-backend.railway.app`
- **API Docs** : `https://langflow-backend.railway.app/docs`

## 🔑 **Connexion :**
- **Username** : `admin`
- **Password** : `admin123`

## 💰 **Coûts :**
- **Vercel** : 100% GRATUIT
- **Railway** : 100% GRATUIT ($5 de crédit/mois)
- **Total** : 100% GRATUIT

## ⏱️ **Temps de Déploiement :**
- **Railway (Backend)** : 2-3 minutes
- **Vercel (Frontend)** : 1-2 minutes
- **Total** : 3-5 minutes

## 🎉 **Avantages de cette Configuration :**

- ✅ **100% GRATUIT**
- ✅ **Très rapide** (Vercel est ultra-rapide)
- ✅ **Très fiable** (Railway est stable)
- ✅ **SSL automatique** sur les deux plateformes
- ✅ **Déploiement automatique** depuis GitHub
- ✅ **CDN global** (Vercel)

## 🔧 **Configuration Automatique :**

### **Vercel détectera automatiquement :**
- ✅ **Framework** : Vite/React
- ✅ **Build command** : `npm run build`
- ✅ **Output directory** : `build`
- ✅ **Routing** : Configuration dans `vercel.json`

### **Railway détectera automatiquement :**
- ✅ **Python** : Backend FastAPI
- ✅ **Start command** : `python start-simple.py`
- ✅ **Health check** : `/health`
- ✅ **Variables d'environnement** : Configurées

## 🚀 **Prochaines Étapes :**

1. **Déployez d'abord Railway** (backend)
2. **Copiez l'URL Railway** (ex: `https://langflow-backend.railway.app`)
3. **Déployez Vercel** (frontend) avec l'URL Railway
4. **Testez votre application** !

## 🎯 **Résultat Final :**

Votre Langflow 2.0 sera accessible sur :
- **Frontend** : `https://langflow2-0.vercel.app`
- **Backend** : `https://langflow-backend.railway.app`

**Configuration optimale : Frontend ultra-rapide sur Vercel + Backend stable sur Railway !** 🚀
