import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Déploiement du backend Langflow sur Railway');
console.log('==============================================');

try {
    console.log('[1/6] Vérification de la configuration...');
    
    // Vérifier que les fichiers de configuration existent
    if (!fs.existsSync('railway.json')) {
        throw new Error('Fichier railway.json non trouvé');
    }
    if (!fs.existsSync('Procfile')) {
        throw new Error('Fichier Procfile non trouvé');
    }
    if (!fs.existsSync('pyproject.toml')) {
        throw new Error('Fichier pyproject.toml non trouvé');
    }
    console.log('✅ Configuration Railway trouvée');

    console.log('[2/6] Installation de Railway CLI...');
    try {
        execSync('railway --version', { stdio: 'ignore' });
        console.log('✅ Railway CLI déjà installé');
    } catch {
        console.log('Installation de Railway CLI...');
        execSync('npm install -g @railway/cli', { stdio: 'inherit' });
        console.log('✅ Railway CLI installé');
    }

    console.log('[3/6] Poussée du code sur GitHub...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Add Railway backend deployment configuration"', { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('✅ Code poussé sur GitHub');

    console.log('[4/6] ✅ Configuration terminée !');
    console.log('\n🌐 Prochaines étapes pour déployer sur Railway :');
    console.log('1. Allez sur https://railway.app');
    console.log('2. Créez un compte et connectez GitHub');
    console.log('3. Cliquez sur "New Project"');
    console.log('4. Sélectionnez "Deploy from GitHub repo"');
    console.log('5. Choisissez votre repo: ILYESS24/langflowcursor');
    console.log('6. Railway détectera automatiquement railway.json');
    console.log('7. Cliquez sur "Deploy"');
    console.log('\n⏱️  Temps de déploiement : 5-10 minutes');
    console.log('🌐 URL backend : https://your-app.railway.app');
    console.log('\n🔧 Après le déploiement :');
    console.log('1. Copiez l\'URL du backend Railway');
    console.log('2. Mettez à jour le frontend avec cette URL');
    console.log('3. Redéployez le frontend sur Cloudflare');

} catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifiez votre connexion internet');
    console.log('2. Assurez-vous que Git est configuré');
    console.log('3. Vérifiez que les fichiers de configuration existent');
    console.log('4. Installez Node.js si nécessaire');
}
