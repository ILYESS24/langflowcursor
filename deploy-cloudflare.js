import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Déploiement automatique de Langflow sur Cloudflare Pages');
console.log('=========================================================');

try {
    // Vérifier que nous sommes dans le bon répertoire
    console.log('[1/8] Vérification de l\'environnement...');
    if (!fs.existsSync('src/frontend/package.json')) {
        throw new Error('Frontend non trouvé');
    }
    console.log('✅ Frontend trouvé');
    
    // Installer les dépendances frontend
    console.log('[2/8] Installation des dépendances frontend...');
    execSync('cd src/frontend && npm install', { stdio: 'inherit' });
    console.log('✅ Dépendances installées');
    
    // Construire le frontend
    console.log('[3/8] Construction du frontend...');
    execSync('cd src/frontend && npm run build', { stdio: 'inherit' });
    console.log('✅ Frontend construit');
    
    // Vérifier que le build existe
    console.log('[4/8] Vérification du build...');
    if (!fs.existsSync('src/frontend/build')) {
        throw new Error('Build frontend non trouvé');
    }
    console.log('✅ Build frontend trouvé');
    
    // Installer Wrangler CLI
    console.log('[5/8] Installation de Wrangler CLI...');
    try {
        execSync('wrangler --version', { stdio: 'pipe' });
        console.log('✅ Wrangler CLI déjà installé');
    } catch {
        console.log('📦 Installation de Wrangler CLI...');
        execSync('npm install -g wrangler', { stdio: 'inherit' });
        console.log('✅ Wrangler CLI installé');
    }
    
    // Créer un script de déploiement
    console.log('[6/8] Création du script de déploiement...');
    const deployScript = `#!/bin/bash
echo "🚀 Déploiement sur Cloudflare Pages..."
echo "====================================="

# Se connecter à Cloudflare
echo "[1/4] Connexion à Cloudflare..."
wrangler login

# Déployer le frontend
echo "[2/4] Déploiement du frontend..."
cd src/frontend
wrangler pages deploy build --project-name langflow-frontend

# Déployer le backend (Workers)
echo "[3/4] Déploiement du backend..."
cd ../..
wrangler deploy

echo "[4/4] ✅ Déploiement terminé !"
echo "🌐 Votre application est maintenant en ligne sur Cloudflare !"
`;

    fs.writeFileSync('deploy-cloudflare.sh', deployScript);
    console.log('✅ Script de déploiement créé');
    
    // Créer un script Windows
    const deployScriptWin = `@echo off
echo 🚀 Déploiement sur Cloudflare Pages...
echo =====================================

echo [1/4] Connexion à Cloudflare...
wrangler login

echo [2/4] Déploiement du frontend...
cd src/frontend
wrangler pages deploy build --project-name langflow-frontend

echo [3/4] Déploiement du backend...
cd ../..
wrangler deploy

echo [4/4] ✅ Déploiement terminé !
echo 🌐 Votre application est maintenant en ligne sur Cloudflare !
pause
`;

    fs.writeFileSync('deploy-cloudflare.bat', deployScriptWin);
    console.log('✅ Script Windows créé');
    
    // Pousser le code sur GitHub
    console.log('[7/8] Poussée du code sur GitHub...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Add Cloudflare Pages deployment configuration"', { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('✅ Code poussé sur GitHub');
    
    console.log('[8/8] ✅ Configuration terminée !');
    console.log('\n🌐 Prochaines étapes :');
    console.log('1. Double-cliquez sur deploy-cloudflare.bat');
    console.log('2. Connectez-vous à Cloudflare dans le navigateur');
    console.log('3. Attendez 2-3 minutes');
    console.log('4. Votre application sera en ligne !');
    console.log('\n🔗 URLs de déploiement :');
    console.log('   Frontend : https://langflow-frontend.pages.dev');
    console.log('   Backend  : https://langflow-backend.workers.dev');
    
} catch (error) {
    console.error('❌ Erreur lors du déploiement:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifiez votre connexion internet');
    console.log('2. Assurez-vous que Node.js est installé');
    console.log('3. Vérifiez que le frontend est configuré');
}
