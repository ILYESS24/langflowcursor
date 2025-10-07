# 🚀 Déploiement Backend Langflow sur Railway

## ✅ **Configuration terminée !**

Votre backend Langflow est maintenant configuré pour Railway. Voici comment le déployer :

## 🌐 **Étapes de déploiement :**

### **1. Allez sur Railway :**
```
https://railway.app
```

### **2. Créez un compte :**
- Cliquez sur **"Sign Up"**
- Connectez-vous avec **GitHub**
- Autorisez Railway à accéder à vos repos

### **3. Créez un nouveau projet :**
- Cliquez sur **"New Project"**
- Sélectionnez **"Deploy from GitHub repo"**

### **4. Sélectionnez votre repository :**
- Choisissez **`ILYESS24/langflowcursor`**
- Railway détectera automatiquement `railway.json`

### **5. Configurez le déploiement :**
- **Nom du projet** : `langflow-backend`
- **Branche** : `main`
- **Build command** : Détecté automatiquement
- **Start command** : Détecté automatiquement

### **6. Déployez :**
- Cliquez sur **"Deploy"**
- Attendez 5-10 minutes
- Votre backend sera en ligne !

## 🔧 **Configuration automatique :**

Railway détectera automatiquement :
- ✅ **Python 3.11.6** (spécifié dans `runtime.txt`)
- ✅ **Dépendances** (depuis `pyproject.toml`)
- ✅ **Commande de démarrage** (depuis `Procfile`)
- ✅ **Variables d'environnement** (depuis `railway.json`)

## 🌐 **URL de votre backend :**

Après le déploiement, Railway vous donnera une URL comme :
```
https://langflow-backend-production-xxxx.up.railway.app
```

## 🔄 **Mise à jour du frontend :**

Une fois le backend déployé :

1. **Copiez l'URL du backend** Railway
2. **Mettez à jour** `src/frontend/src/customization/config-constants.ts`
3. **Remplacez** `http://localhost:7860` par l'URL Railway
4. **Redéployez** le frontend sur Cloudflare

## 💰 **Coûts Railway :**

- ✅ **500 heures/mois** gratuites
- ✅ **$5 de crédit** gratuit
- ✅ **Suffisant** pour commencer
- ✅ **Pas de carte de crédit** requise

## 🚀 **Avantages de Railway :**

- ✅ **Déploiement automatique** depuis GitHub
- ✅ **Base de données** incluse
- ✅ **SSL automatique**
- ✅ **Monitoring** intégré
- ✅ **Logs** en temps réel

## 📊 **Monitoring :**

- **Logs** : Accessibles via le dashboard Railway
- **Métriques** : CPU, RAM, réseau
- **Health checks** : Automatiques
- **Redémarrage** : Automatique en cas de problème

## 🆘 **En cas de problème :**

### **Build échoue :**
1. Vérifiez les logs dans Railway
2. Assurez-vous que `pyproject.toml` est correct
3. Vérifiez la version Python

### **Application ne démarre pas :**
1. Vérifiez les logs de démarrage
2. Assurez-vous que le port est correct
3. Vérifiez les variables d'environnement

### **Erreurs de dépendances :**
1. Vérifiez `pyproject.toml`
2. Assurez-vous que toutes les dépendances sont listées
3. Vérifiez la version Python

## 🎯 **Prochaines étapes :**

1. **Déployez** sur Railway (5-10 minutes)
2. **Copiez** l'URL du backend
3. **Mettez à jour** le frontend
4. **Redéployez** le frontend
5. **Testez** l'application complète

## 📞 **Support :**

- 📚 [Documentation Railway](https://docs.railway.app/)
- 💬 [Discord Railway](https://discord.gg/railway)
- 🐛 [Issues GitHub](https://github.com/railwayapp/cli/issues)

---

## 🎉 **Résumé :**

**Votre backend Langflow est prêt pour Railway !**

1. **Allez sur** https://railway.app
2. **Connectez GitHub** et sélectionnez votre repo
3. **Déployez** en un clic
4. **Copiez l'URL** du backend
5. **Mettez à jour** le frontend
6. **Votre Langflow complet** sera en ligne !

**Votre application complète sera en ligne dans 10-15 minutes !** 🚀
