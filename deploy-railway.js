import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Déploiement automatique de Langflow sur Railway');
console.log('================================================');

try {
    // Vérifier Railway CLI
    console.log('[1/5] Vérification de Railway CLI...');
    execSync('railway --version', { stdio: 'inherit' });
    
    // Créer un projet Railway
    console.log('[2/5] Création du projet Railway...');
    execSync('railway init --name langflow-app', { stdio: 'inherit' });
    
    // Déployer
    console.log('[3/5] Déploiement en cours...');
    execSync('railway up', { stdio: 'inherit' });
    
    // Récupérer l'URL
    console.log('[4/5] Récupération de l\'URL...');
    const status = execSync('railway status', { encoding: 'utf8' });
    console.log(status);
    
    console.log('[5/5] ✅ Déploiement terminé !');
    console.log('Votre application Langflow est maintenant en ligne !');
    
} catch (error) {
    console.error('❌ Erreur lors du déploiement:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Connectez-vous manuellement: railway login');
    console.log('2. Vérifiez votre connexion internet');
    console.log('3. Assurez-vous que Railway CLI est installé');
}
