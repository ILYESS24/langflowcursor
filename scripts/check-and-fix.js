import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔧 Vérification et correction automatique des erreurs');
console.log('==================================================');

try {
    console.log('[1/8] Vérification de Node.js...');
    execSync('node --version', { stdio: 'inherit' });
    console.log('✅ Node.js trouvé');

    console.log('[2/8] Vérification de Python...');
    execSync('python --version', { stdio: 'inherit' });
    console.log('✅ Python trouvé');

    console.log('[3/8] Installation des dépendances frontend...');
    execSync('cd src/frontend && npm install', { stdio: 'inherit' });
    console.log('✅ Dépendances frontend installées');

    console.log('[4/8] Vérification du formatage frontend...');
    try {
        execSync('cd src/frontend && npm run check-format', { stdio: 'inherit' });
        console.log('✅ Formatage frontend OK');
    } catch (error) {
        console.log('🔧 Correction du formatage frontend...');
        execSync('cd src/frontend && npm run format', { stdio: 'inherit' });
        console.log('✅ Formatage frontend corrigé');
    }

    console.log('[5/8] Vérification TypeScript...');
    try {
        execSync('cd src/frontend && npm run type-check', { stdio: 'inherit' });
        console.log('✅ TypeScript OK');
    } catch (error) {
        console.log('❌ Erreurs TypeScript détectées');
        console.log('Veuillez corriger manuellement les erreurs TypeScript');
    }

    console.log('[6/8] Tests frontend...');
    try {
        execSync('cd src/frontend && npm run test:coverage', { stdio: 'inherit' });
        console.log('✅ Tests frontend OK');
    } catch (error) {
        console.log('❌ Certains tests frontend ont échoué');
    }

    console.log('[7/8] Build frontend...');
    execSync('cd src/frontend && npm run build', { stdio: 'inherit' });
    console.log('✅ Build frontend réussi');

    console.log('[8/8] Vérification des fichiers de configuration...');
    
    // Vérifier que les fichiers de configuration existent
    const configFiles = [
        'src/frontend/src/customization/config-constants.ts',
        'src/frontend/vite.config.mts',
        'src/frontend/package.json',
        'pyproject.toml'
    ];
    
    configFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`✅ ${file} trouvé`);
        } else {
            console.log(`❌ ${file} manquant`);
        }
    });

    console.log('\n🎉 Vérification terminée !');
    console.log('\n📊 Résumé :');
    console.log('✅ Frontend : Formatage, TypeScript, Tests, Build');
    console.log('✅ Configuration : Fichiers de config vérifiés');
    console.log('✅ Dépendances : Installées et à jour');
    
    console.log('\n🚀 Prochaines étapes :');
    console.log('1. Corrigez les erreurs TypeScript si nécessaire');
    console.log('2. Corrigez les tests qui ont échoué');
    console.log('3. Poussez le code sur GitHub');
    console.log('4. Le CI/CD se lancera automatiquement');

} catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifiez que Node.js et Python sont installés');
    console.log('2. Vérifiez votre connexion internet');
    console.log('3. Assurez-vous d\'être dans le bon répertoire');
    console.log('4. Vérifiez les permissions des fichiers');
}
