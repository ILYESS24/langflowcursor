# 🚀 Guide de déploiement Langflow sur Render.com

## 📋 Prérequis

1. **Compte GitHub** avec votre projet Langflow
2. **Compte Render.com** (gratuit)
3. **Base de données PostgreSQL** (incluse dans Render)

## 🔧 Configuration

### 1. Variables d'environnement

#### Backend (langflow-backend)
```
LANGFLOW_DATABASE_URL=postgresql://langflow_user:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/langflow_db
LANGFLOW_HOST=0.0.0.0
LANGFLOW_PORT=10000
LANGFLOW_LOG_LEVEL=INFO
LANGFLOW_CORS_ORIGINS=https://votre-frontend.onrender.com
LANGFLOW_SUPERUSER=admin
LANGFLOW_SUPERUSER_PASSWORD=<généré automatiquement>
```

#### Frontend (langflow-frontend)
```
BACKEND_URL=https://votre-backend.onrender.com
VITE_PROXY_TARGET=https://votre-backend.onrender.com
```

### 2. Déploiement automatique

1. **Connectez votre repo GitHub** à Render
2. **Sélectionnez le fichier `render.yaml`** pour la configuration
3. **Render déploiera automatiquement** :
   - Backend Python (FastAPI)
   - Frontend React
   - Base de données PostgreSQL

## 🌐 URLs de déploiement

- **Frontend** : `https://langflow-frontend.onrender.com`
- **Backend API** : `https://langflow-backend.onrender.com`
- **Health Check** : `https://langflow-backend.onrender.com/health_check`

## 💰 Coûts

- **Plan Starter** : Gratuit (avec limitations)
- **Base de données** : Gratuite (1GB)
- **Stockage** : Gratuit (1GB)

## 🔒 Sécurité

- **SSL automatique** sur tous les services
- **Variables d'environnement** sécurisées
- **CORS configuré** pour le frontend
- **Authentification** avec superutilisateur

## 📊 Monitoring

- **Logs en temps réel** dans le dashboard Render
- **Métriques de performance** incluses
- **Health checks** automatiques
- **Redémarrage automatique** en cas d'erreur

## 🚀 Déploiement

1. **Poussez votre code** sur GitHub
2. **Render détecte automatiquement** les changements
3. **Déploiement automatique** en quelques minutes
4. **Votre application** est accessible via les URLs générées

## 🔧 Personnalisation

### Domaine personnalisé
- Ajoutez votre domaine dans les paramètres Render
- **SSL automatique** pour votre domaine

### Mise à l'échelle
- **Upgrade vers un plan payant** pour plus de ressources
- **Auto-scaling** disponible sur les plans supérieurs

## 📞 Support

- **Documentation Render** : https://render.com/docs
- **Support communautaire** : Discord Langflow
- **Issues GitHub** : https://github.com/langflow-ai/langflow/issues
