import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Déploiement automatique de Langflow sur Render.com');
console.log('===================================================');

try {
    // Vérifier que render.yaml existe
    console.log('[1/3] Vérification de la configuration...');
    if (!fs.existsSync('render.yaml')) {
        throw new Error('Fichier render.yaml non trouvé');
    }
    console.log('✅ Configuration Render trouvée');
    
    // Pousser le code sur GitHub
    console.log('[2/3] Poussée du code sur GitHub...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Deploy to Render"', { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('✅ Code poussé sur GitHub');
    
    console.log('[3/3] ✅ Déploiement configuré !');
    console.log('\n🌐 Prochaines étapes :');
    console.log('1. Allez sur https://render.com');
    console.log('2. Créez un compte et connectez GitHub');
    console.log('3. Sélectionnez "New Web Service"');
    console.log('4. Choisissez votre repo: ILYESS24/langflowcursor');
    console.log('5. Render détectera automatiquement render.yaml');
    console.log('6. Cliquez sur "Deploy"');
    console.log('\n⏱️  Temps de déploiement : 5-10 minutes');
    console.log('🌐 URL : https://langflow-backend.onrender.com');
    
} catch (error) {
    console.error('❌ Erreur lors du déploiement:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifiez votre connexion internet');
    console.log('2. Assurez-vous que Git est configuré');
    console.log('3. Vérifiez que le repo GitHub est accessible');
}
