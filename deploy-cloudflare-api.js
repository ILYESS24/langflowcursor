import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Déploiement Langflow sur Cloudflare Pages via API');
console.log('===================================================');

try {
    // Vérifier que le build existe
    console.log('[1/5] Vérification du build...');
    if (!fs.existsSync('src/frontend/build')) {
        throw new Error('Build frontend non trouvé. Exécutez d\'abord: cd src/frontend && npm run build');
    }
    console.log('✅ Build frontend trouvé');
    
    // Créer un script de déploiement direct
    console.log('[2/5] Création du script de déploiement...');
    const deployScript = `#!/bin/bash
echo "🚀 Déploiement sur Cloudflare Pages..."
echo "====================================="

# Vérifier que wrangler est installé
if ! command -v wrangler &> /dev/null; then
    echo "Installation de Wrangler CLI..."
    npm install -g wrangler
fi

# Se connecter à Cloudflare (nécessite interaction manuelle)
echo "Connexion à Cloudflare..."
echo "Une fenêtre de navigateur va s'ouvrir"
wrangler login

# Déployer le frontend
echo "Déploiement du frontend..."
cd src/frontend
wrangler pages deploy build --project-name langflow-frontend

echo "✅ Déploiement terminé !"
echo "🌐 Votre application est accessible sur :"
echo "   https://langflow-frontend.pages.dev"
`;

    fs.writeFileSync('deploy-cloudflare.sh', deployScript);
    console.log('✅ Script de déploiement créé');
    
    // Créer un script Windows
    const deployScriptWin = `@echo off
echo 🚀 Déploiement sur Cloudflare Pages...
echo =====================================

echo [1/4] Vérification de Wrangler CLI...
wrangler --version
if errorlevel 1 (
    echo Installation de Wrangler CLI...
    npm install -g wrangler
)

echo [2/4] Connexion à Cloudflare...
echo Une fenêtre de navigateur va s'ouvrir
wrangler login

echo [3/4] Déploiement du frontend...
cd src/frontend
wrangler pages deploy build --project-name langflow-frontend

echo [4/4] ✅ Déploiement terminé !
echo.
echo 🌐 Votre application est accessible sur :
echo    https://langflow-frontend.pages.dev
echo.
pause
`;

    fs.writeFileSync('deploy-cloudflare-windows.bat', deployScriptWin);
    console.log('✅ Script Windows créé');
    
    // Créer un guide de déploiement web
    console.log('[3/5] Création du guide de déploiement web...');
    const webGuide = `# 🚀 Déploiement Langflow sur Cloudflare Pages

## Option 1 : Interface Web (Recommandé)

1. **Allez sur** https://pages.cloudflare.com
2. **Connectez votre repo** GitHub
3. **Sélectionnez** \`ILYESS24/langflowcursor\`
4. **Configurez** :
   - Build command: \`cd src/frontend && npm install && npm run build\`
   - Build output: \`src/frontend/build\`
   - Framework: \`Vite\`
5. **Déployez** en un clic

## Option 2 : Script automatique

### Windows :
\`\`\`bash
deploy-cloudflare-windows.bat
\`\`\`

### Linux/Mac :
\`\`\`bash
chmod +x deploy-cloudflare.sh
./deploy-cloudflare.sh
\`\`\`

## URLs de déploiement :
- **Frontend** : https://langflow-frontend.pages.dev
- **Backend** : À déployer séparément sur Railway/Render

## Coûts :
- ✅ **100% GRATUIT** pour commencer
- ✅ **500 builds/mois** gratuits
- ✅ **CDN global** gratuit
`;

    fs.writeFileSync('CLOUDFLARE-GUIDE.md', webGuide);
    console.log('✅ Guide de déploiement créé');
    
    // Pousser le code sur GitHub
    console.log('[4/5] Poussée du code sur GitHub...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Add Cloudflare Pages deployment scripts and guides"', { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('✅ Code poussé sur GitHub');
    
    console.log('[5/5] ✅ Configuration terminée !');
    console.log('\n🌐 Prochaines étapes :');
    console.log('1. Allez sur https://pages.cloudflare.com');
    console.log('2. Connectez votre repo GitHub');
    console.log('3. Sélectionnez ILYESS24/langflowcursor');
    console.log('4. Configurez le build avec les paramètres fournis');
    console.log('5. Déployez en un clic !');
    console.log('\n🔗 URLs de déploiement :');
    console.log('   Frontend : https://langflow-frontend.pages.dev');
    console.log('\n📋 Scripts disponibles :');
    console.log('   deploy-cloudflare-windows.bat  # Script Windows');
    console.log('   deploy-cloudflare.sh           # Script Linux/Mac');
    console.log('   CLOUDFLARE-GUIDE.md           # Guide complet');
    
} catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifiez que le build frontend existe');
    console.log('2. Exécutez: cd src/frontend && npm run build');
    console.log('3. Vérifiez votre connexion internet');
    console.log('4. Assurez-vous que Git est configuré');
}
