#!/bin/bash

echo "🚀 Déploiement Langflow sur Railway.app"
echo "======================================"
echo

echo "[1/4] Vérification de Railway CLI..."
if ! command -v railway &> /dev/null; then
    echo "[ERROR] Railway CLI non installé. Installez avec: npm install -g @railway/cli"
    exit 1
fi

echo "[2/4] Connexion à Railway..."
echo "Ouvrez votre navigateur et connectez-vous avec GitHub"
railway login

echo "[3/4] Initialisation du projet..."
railway init

echo "[4/4] Déploiement..."
railway up

echo
echo "✅ Déploiement terminé !"
echo "Votre application est accessible sur l'URL affichée ci-dessus"
echo
