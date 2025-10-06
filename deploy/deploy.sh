#!/bin/bash

# 🚀 Script de déploiement automatisé pour Langflow
# Supporte : Render, Railway, Fly.io

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    print_message "Vérification des prérequis..."
    
    # Vérifier Git
    if ! command -v git &> /dev/null; then
        print_error "Git n'est pas installé"
        exit 1
    fi
    
    # Vérifier que nous sommes dans un repo Git
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Ce n'est pas un repository Git"
        exit 1
    fi
    
    print_success "Prérequis vérifiés"
}

# Déploiement sur Render
deploy_render() {
    print_message "Déploiement sur Render.com..."
    
    # Vérifier que le fichier render.yaml existe
    if [ ! -f "render.yaml" ]; then
        print_error "Fichier render.yaml non trouvé"
        exit 1
    fi
    
    print_message "1. Poussez votre code sur GitHub"
    echo "   git add ."
    echo "   git commit -m 'Deploy to Render'"
    echo "   git push origin main"
    echo ""
    
    print_message "2. Allez sur https://render.com"
    print_message "3. Créez un compte et connectez GitHub"
    print_message "4. Sélectionnez 'New Web Service'"
    print_message "5. Choisissez votre repo Langflow"
    print_message "6. Render détectera automatiquement render.yaml"
    print_message "7. Cliquez sur 'Deploy'"
    
    print_success "Instructions Render affichées"
}

# Déploiement sur Railway
deploy_railway() {
    print_message "Déploiement sur Railway.app..."
    
    # Vérifier Railway CLI
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI non installé"
        print_message "Installation de Railway CLI..."
        npm install -g @railway/cli
    fi
    
    print_message "1. Connexion à Railway..."
    railway login
    
    print_message "2. Initialisation du projet..."
    railway init
    
    print_message "3. Déploiement..."
    railway up
    
    print_success "Déploiement Railway terminé"
}

# Déploiement sur Fly.io
deploy_fly() {
    print_message "Déploiement sur Fly.io..."
    
    # Vérifier Fly CLI
    if ! command -v fly &> /dev/null; then
        print_warning "Fly CLI non installé"
        print_message "Installation de Fly CLI..."
        curl -L https://fly.io/install.sh | sh
    fi
    
    print_message "1. Connexion à Fly.io..."
    fly auth login
    
    print_message "2. Lancement du déploiement..."
    fly launch
    
    print_message "3. Déploiement..."
    fly deploy
    
    print_success "Déploiement Fly.io terminé"
}

# Menu principal
show_menu() {
    echo ""
    echo "🚀 Déploiement Langflow"
    echo "======================="
    echo ""
    echo "Choisissez votre plateforme :"
    echo "1) Render.com (Recommandé)"
    echo "2) Railway.app"
    echo "3) Fly.io"
    echo "4) Afficher les instructions pour toutes les plateformes"
    echo "5) Quitter"
    echo ""
}

# Instructions complètes
show_all_instructions() {
    echo ""
    echo "📋 Instructions complètes pour toutes les plateformes"
    echo "====================================================="
    echo ""
    
    echo "🎯 RENDER.COM (Recommandé)"
    echo "-------------------------"
    deploy_render
    echo ""
    
    echo "🚂 RAILWAY.APP"
    echo "-------------"
    print_message "1. Installez Railway CLI: npm install -g @railway/cli"
    print_message "2. Connectez-vous: railway login"
    print_message "3. Initialisez: railway init"
    print_message "4. Déployez: railway up"
    echo ""
    
    echo "✈️  FLY.IO"
    echo "---------"
    print_message "1. Installez Fly CLI: curl -L https://fly.io/install.sh | sh"
    print_message "2. Connectez-vous: fly auth login"
    print_message "3. Lancez: fly launch"
    print_message "4. Déployez: fly deploy"
    echo ""
    
    echo "☁️  CLOUDFLARE PAGES (Frontend uniquement)"
    echo "------------------------------------------"
    print_message "1. Allez sur https://pages.cloudflare.com"
    print_message "2. Connectez votre repo GitHub"
    print_message "3. Configurez:"
    print_message "   - Build command: cd src/frontend && npm install && npm run build"
    print_message "   - Build output: src/frontend/build"
    print_message "4. Déployez le backend séparément sur Railway/Fly.io"
    echo ""
}

# Fonction principale
main() {
    check_prerequisites
    
    while true; do
        show_menu
        read -p "Votre choix (1-5): " choice
        
        case $choice in
            1)
                deploy_render
                break
                ;;
            2)
                deploy_railway
                break
                ;;
            3)
                deploy_fly
                break
                ;;
            4)
                show_all_instructions
                ;;
            5)
                print_message "Au revoir !"
                exit 0
                ;;
            *)
                print_error "Choix invalide. Veuillez choisir 1-5."
                ;;
        esac
    done
}

# Exécution du script
main "$@"
