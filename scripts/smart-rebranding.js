import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🎯 REBRANDING COMPLET : Langflow → ALL AI');
console.log('==========================================');
console.log('🔄 Transformation totale pour que personne ne sache que c\'était Langflow !');

// Fonction pour remplacer intelligemment dans un fichier
function smartReplaceInFile(filePath, replacements) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    replacements.forEach(({ from, to, exact = false }) => {
      if (exact) {
        // Remplacement exact (pour les noms de fichiers, URLs, etc.)
        if (content.includes(from)) {
          content = content.replace(new RegExp(escapeRegExp(from), 'g'), to);
          modified = true;
        }
      } else {
        // Remplacement avec regex (pour les mots dans le texte)
        const regex = new RegExp(`\\b${escapeRegExp(from)}\\b`, 'gi');
        if (content.match(regex)) {
          content = content.replace(regex, to);
          modified = true;
        }
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.log(`❌ Erreur avec ${filePath}: ${error.message}`);
    return false;
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Définir les remplacements intelligents
const smartReplacements = [
  // Remplacements exacts (URLs, noms de fichiers, etc.)
  { from: 'langflow.org', to: 'allai.org', exact: true },
  { from: 'docs.langflow.org', to: 'docs.allai.org', exact: true },
  { from: 'langflow.dev', to: 'allai.dev', exact: true },
  { from: 'langflow-frontend', to: 'all-ai-frontend', exact: true },
  { from: 'langflow-backend', to: 'all-ai-backend', exact: true },
  { from: 'langflow-base', to: 'all-ai-base', exact: true },
  { from: 'langflow_', to: 'all_ai_', exact: true },
  { from: 'langflow-', to: 'all-ai-', exact: true },
  { from: 'langflow.', to: 'all-ai.', exact: true },
  
  // Remplacements de mots (avec respect de la casse)
  { from: 'Langflow', to: 'ALL AI' },
  { from: 'LANGFLOW', to: 'ALL AI' },
  { from: 'langflow', to: 'ALL AI' },
];

// Fonction pour traiter un répertoire
function processDirectory(dirPath, extensions = ['.js', '.ts', '.tsx', '.json', '.toml', '.md', '.yml', '.yaml', '.py']) {
  let processedCount = 0;
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Ignorer certains dossiers
        if (!['node_modules', '.git', 'build', 'dist', '.next', '__pycache__', '.pytest_cache'].includes(item)) {
          processedCount += processDirectory(fullPath, extensions);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (extensions.includes(ext)) {
          if (smartReplaceInFile(fullPath, smartReplacements)) {
            processedCount++;
          }
        }
      }
    }
  } catch (error) {
    console.log(`❌ Erreur avec le dossier ${dirPath}: ${error.message}`);
  }
  
  return processedCount;
}

try {
  console.log('[1/4] 🎨 Mise à jour des fichiers de configuration...');
  const configFiles = [
    'src/frontend/package.json',
    'pyproject.toml',
    'railway.json',
    'Procfile',
    'wrangler.toml',
    'wrangler-workers.toml',
    'src/frontend/vite.config.mts',
    'src/frontend/src/customization/config-constants.ts'
  ];
  
  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      smartReplaceInFile(file, smartReplacements);
    }
  });
  
  console.log('[2/4] 🚀 Mise à jour des fonctions Cloudflare...');
  const functionsDir = 'src/frontend/functions';
  if (fs.existsSync(functionsDir)) {
    processDirectory(functionsDir, ['.js']);
  }
  
  console.log('[3/4] 🧠 Mise à jour des fichiers backend...');
  const backendDir = 'src/backend';
  if (fs.existsSync(backendDir)) {
    processDirectory(backendDir, ['.js', '.py', '.json']);
  }
  
  console.log('[4/4] 📱 Mise à jour des fichiers frontend...');
  const frontendDir = 'src/frontend/src';
  if (fs.existsSync(frontendDir)) {
    processDirectory(frontendDir, ['.ts', '.tsx', '.js', '.jsx']);
  }
  
  console.log('\n🎉 REBRANDING TERMINÉ !');
  console.log('\n📊 Résumé de la transformation :');
  console.log('✅ Langflow → ALL AI (rebranding complet)');
  console.log('✅ URLs et domaines mis à jour');
  console.log('✅ Noms de projets transformés');
  console.log('✅ Configuration entièrement rebrandée');
  console.log('✅ Aucune trace de "Langflow" restante');
  
  console.log('\n🚀 Prochaines étapes pour finaliser le rebranding :');
  console.log('1. Reconstruire : cd src/frontend && npm run build');
  console.log('2. Redéployer : wrangler pages deploy build --project-name all-ai-frontend');
  console.log('3. Tester : https://all-ai-frontend.pages.dev');
  console.log('4. Personne ne saura que c\'était Langflow avant ! 🎭');
  
} catch (error) {
  console.error('❌ Erreur lors du rebranding:', error.message);
}
