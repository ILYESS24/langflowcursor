import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Déploiement local de Langflow');
console.log('================================');

try {
    // Vérifier Python
    console.log('[1/6] Vérification de Python...');
    execSync('python --version', { stdio: 'pipe' });
    console.log('✅ Python trouvé');
    
    // Installer Langflow
    console.log('[2/6] Installation de Langflow...');
    execSync('pip install langflow', { stdio: 'inherit' });
    console.log('✅ Langflow installé');
    
    // Créer un script de démarrage
    console.log('[3/6] Création du script de démarrage...');
    const startScript = `#!/usr/bin/env python3
import subprocess
import sys
import os

print("🚀 Démarrage de Langflow...")
print("==========================")

# Changer vers le répertoire du projet
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Démarrer Langflow
try:
    subprocess.run([sys.executable, "-m", "langflow", "run", "--host", "0.0.0.0", "--port", "7860"], check=True)
except KeyboardInterrupt:
    print("\\n👋 Arrêt de Langflow")
except Exception as e:
    print(f"❌ Erreur: {e}")
`;

    fs.writeFileSync('start-langflow.py', startScript);
    console.log('✅ Script de démarrage créé');
    
    // Créer un script batch pour Windows
    const batchScript = `@echo off
echo 🚀 Démarrage de Langflow...
echo ==========================
python start-langflow.py
pause`;

    fs.writeFileSync('start-langflow.bat', batchScript);
    console.log('✅ Script batch créé');
    
    // Créer un script shell pour Linux/Mac
    const shellScript = `#!/bin/bash
echo "🚀 Démarrage de Langflow..."
echo "=========================="
python3 start-langflow.py`;

    fs.writeFileSync('start-langflow.sh', shellScript);
    console.log('✅ Script shell créé');
    
    // Démarrer Langflow
    console.log('[4/6] Démarrage de Langflow...');
    console.log('🌐 Langflow sera accessible sur : http://localhost:7860');
    console.log('⏹️  Appuyez sur Ctrl+C pour arrêter');
    
    // Démarrer en arrière-plan
    const child = execSync('python start-langflow.py', { 
        stdio: 'inherit',
        detached: true 
    });
    
    console.log('[5/6] ✅ Langflow démarré !');
    console.log('[6/6] ✅ Déploiement terminé !');
    
    console.log('\n🎉 Votre Langflow est maintenant en ligne !');
    console.log('🌐 URL : http://localhost:7860');
    console.log('\n🔧 Commandes utiles :');
    console.log('   start-langflow.bat  # Démarrer (Windows)');
    console.log('   start-langflow.sh   # Démarrer (Linux/Mac)');
    console.log('   python start-langflow.py  # Démarrer directement');
    
} catch (error) {
    console.error('❌ Erreur lors du déploiement:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Installez Python 3.8+');
    console.log('2. Vérifiez que pip est installé');
    console.log('3. Assurez-vous que le port 7860 est libre');
}
