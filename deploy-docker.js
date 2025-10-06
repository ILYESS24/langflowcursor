import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Déploiement automatique de Langflow via Docker');
console.log('================================================');

try {
    // Vérifier Docker
    console.log('[1/5] Vérification de Docker...');
    execSync('docker --version', { stdio: 'pipe' });
    console.log('✅ Docker trouvé');
    
    // Créer un Dockerfile simple
    console.log('[2/5] Création du Dockerfile...');
    const dockerfile = `FROM python:3.11-slim

WORKDIR /app

# Installer les dépendances système
RUN apt-get update && apt-get install -y \\
    gcc \\
    g++ \\
    && rm -rf /var/lib/apt/lists/*

# Copier les fichiers de configuration
COPY pyproject.toml ./
COPY Procfile ./
COPY runtime.txt ./

# Installer Python dependencies
RUN pip install --no-cache-dir langflow

# Exposer le port
EXPOSE 7860

# Commande de démarrage
CMD ["python", "-m", "langflow", "run", "--host", "0.0.0.0", "--port", "7860"]`;

    fs.writeFileSync('Dockerfile.simple', dockerfile);
    console.log('✅ Dockerfile créé');
    
    // Construire l'image Docker
    console.log('[3/5] Construction de l\'image Docker...');
    execSync('docker build -f Dockerfile.simple -t langflow-app .', { stdio: 'inherit' });
    console.log('✅ Image Docker construite');
    
    // Démarrer le conteneur
    console.log('[4/5] Démarrage du conteneur...');
    execSync('docker run -d -p 7860:7860 --name langflow-container langflow-app', { stdio: 'inherit' });
    console.log('✅ Conteneur démarré');
    
    // Vérifier le statut
    console.log('[5/5] Vérification du déploiement...');
    execSync('docker ps', { stdio: 'inherit' });
    
    console.log('\n🎉 Déploiement terminé !');
    console.log('🌐 Votre application Langflow est accessible sur :');
    console.log('   http://localhost:7860');
    console.log('\n🔧 Commandes utiles :');
    console.log('   docker logs langflow-container  # Voir les logs');
    console.log('   docker stop langflow-container  # Arrêter');
    console.log('   docker start langflow-container # Redémarrer');
    
} catch (error) {
    console.error('❌ Erreur lors du déploiement:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Installez Docker Desktop');
    console.log('2. Vérifiez que Docker est démarré');
    console.log('3. Assurez-vous que le port 7860 est libre');
}
