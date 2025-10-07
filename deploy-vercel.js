import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Déploiement automatique de Langflow sur Vercel');
console.log('================================================');

try {
    // Vérifier que le frontend existe
    console.log('[1/4] Vérification du frontend...');
    if (!fs.existsSync('src/frontend/package.json')) {
        throw new Error('Frontend non trouvé');
    }
    console.log('✅ Frontend trouvé');
    
    // Installer Vercel CLI
    console.log('[2/4] Installation de Vercel CLI...');
    try {
        execSync('vercel --version', { stdio: 'pipe' });
        console.log('✅ Vercel CLI déjà installé');
    } catch {
        console.log('📦 Installation de Vercel CLI...');
        execSync('npm install -g vercel', { stdio: 'inherit' });
        console.log('✅ Vercel CLI installé');
    }
    
    // Déployer sur Vercel
    console.log('[3/4] Déploiement sur Vercel...');
    execSync('cd src/frontend && vercel --prod --yes', { stdio: 'inherit' });
    
    console.log('[4/4] ✅ Déploiement terminé !');
    console.log('\n🌐 Votre application Langflow est maintenant en ligne !');
    console.log('📱 Frontend déployé sur Vercel');
    console.log('🔧 Backend à déployer séparément sur Railway/Render');
    
} catch (error) {
    console.error('❌ Erreur lors du déploiement:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifiez votre connexion internet');
    console.log('2. Assurez-vous que Node.js est installé');
    console.log('3. Vérifiez que le frontend est configuré');
}
