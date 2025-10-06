# 🌐 Alternative : Déploiement sur Cloudflare Pages

## ⚠️ Limitation importante

**Cloudflare Pages** est optimisé pour les sites statiques (frontend uniquement). Pour Langflow, vous devrez :

1. **Déployer le frontend** sur Cloudflare Pages
2. **Déployer le backend** sur une autre plateforme (Railway, Fly.io, etc.)

## 🔧 Configuration Cloudflare Pages

### 1. Frontend uniquement

```yaml
# Configuration pour Cloudflare Pages
build_command: cd src/frontend && npm install && npm run build
build_output_directory: src/frontend/build
root_directory: /
```

### 2. Variables d'environnement

```
VITE_PROXY_TARGET=https://votre-backend.railway.app
BACKEND_URL=https://votre-backend.railway.app
```

## 🚀 Plateformes recommandées pour le backend

### Railway.app
- **Avantages** : Simple, rapide, support Python natif
- **Coût** : Plan gratuit disponible
- **Déploiement** : Connect GitHub, déploie automatiquement

### Fly.io
- **Avantages** : Performant, global, Docker natif
- **Coût** : Plan gratuit généreux
- **Déploiement** : Via CLI ou GitHub Actions

### Heroku
- **Avantages** : Mature, écosystème riche
- **Coût** : Payant uniquement (plus de plan gratuit)
- **Déploiement** : Via Git ou GitHub

## 📋 Étapes de déploiement hybride

1. **Déployez le backend** sur Railway/Fly.io
2. **Configurez les variables d'environnement** du backend
3. **Déployez le frontend** sur Cloudflare Pages
4. **Configurez les variables d'environnement** du frontend
5. **Testez la connexion** entre frontend et backend

## 🔗 Configuration CORS

Assurez-vous que votre backend autorise les requêtes depuis Cloudflare Pages :

```python
# Dans votre configuration Langflow
LANGFLOW_CORS_ORIGINS=https://votre-site.pages.dev
```

## 💡 Recommandation

Pour une **expérience optimale**, nous recommandons **Render.com** qui gère automatiquement :
- Frontend et backend sur la même plateforme
- Configuration CORS automatique
- Base de données incluse
- Déploiement simplifié
