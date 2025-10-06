# 🚀 Déploiement direct depuis votre ordinateur

## 🎯 **Railway.app - Déploiement en ligne de commande**

### ✅ **Prérequis installés :**
- ✅ Railway CLI installé
- ✅ Configuration créée (`railway.json`, `Procfile`)
- ✅ Code poussé sur GitHub

## 🔧 **Déploiement en 4 commandes :**

### **1. Connexion à Railway :**
```bash
railway login
```
- Railway ouvrira votre navigateur
- Connectez-vous avec GitHub
- Autorisez l'accès

### **2. Initialisation du projet :**
```bash
railway init
```
- Railway détectera votre projet
- Créera un nouveau projet sur Railway

### **3. Déploiement :**
```bash
railway up
```
- Railway déploiera votre application
- Vous donnera une URL publique

### **4. Vérification :**
```bash
railway status
```
- Vérifier le statut du déploiement

## 🚀 **Script automatique :**

### **Windows :**
```bash
deploy-now.bat
```

### **Linux/Mac :**
```bash
chmod +x deploy-now.sh
./deploy-now.sh
```

## 🌐 **Votre application sera accessible sur :**
`https://votre-projet.railway.app`

## 💰 **Coûts :**
- ✅ **100% GRATUIT** pour commencer
- ✅ **$5 de crédit gratuit** par mois
- ✅ **Base de données incluse**
- ✅ **SSL automatique**

## 🔧 **Commandes utiles :**

### **Voir les logs :**
```bash
railway logs
```

### **Redémarrer l'application :**
```bash
railway restart
```

### **Voir les variables d'environnement :**
```bash
railway variables
```

### **Ajouter une variable d'environnement :**
```bash
railway variables set NOM_VARIABLE=valeur
```

## 🆘 **En cas de problème :**

### **Railway ne se connecte pas :**
1. Vérifiez votre connexion internet
2. Réessayez `railway login`
3. Autorisez Railway dans GitHub

### **Déploiement échoue :**
1. Vérifiez les logs : `railway logs`
2. Assurez-vous que `railway.json` existe
3. Vérifiez que `Procfile` est présent

### **Application ne démarre pas :**
1. Vérifiez les logs : `railway logs`
2. Assurez-vous que Python 3.11 est spécifié
3. Vérifiez les variables d'environnement

## 🎉 **Après le déploiement :**

1. **Attendez 2-3 minutes** (premier déploiement)
2. **Cliquez sur l'URL** fournie par Railway
3. **Créez un compte admin** Langflow
4. **Commencez à créer vos workflows !**

## 📞 **Support :**

- 🚂 **Railway** : [docs.railway.app](https://docs.railway.app)
- 💬 **Langflow** : [Discord](https://discord.gg/EqksyE2EX9)

**Votre Langflow sera en ligne en moins de 5 minutes !** 🚀
