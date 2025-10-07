import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔄 Remplacement automatique de "langflow" par "ALL AI"');
console.log('====================================================');

// Fonction pour remplacer dans un fichier
function replaceInFile(filePath, replacements) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    replacements.forEach(({ from, to }) => {
      const regex = new RegExp(from, 'gi');
      if (content.match(regex)) {
        content = content.replace(regex, to);
        modified = true;
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

// Fonction pour parcourir récursivement les dossiers
function processDirectory(dirPath, replacements, extensions = ['.js', '.ts', '.tsx', '.json', '.toml', '.md', '.yml', '.yaml']) {
  let processedCount = 0;
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Ignorer certains dossiers
        if (!['node_modules', '.git', 'build', 'dist', '.next'].includes(item)) {
          processedCount += processDirectory(fullPath, replacements, extensions);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (extensions.includes(ext)) {
          if (replaceInFile(fullPath, replacements)) {
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

// Définir les remplacements
const replacements = [
  { from: 'langflow', to: 'ALL AI' },
  { from: 'Langflow', to: 'ALL AI' },
  { from: 'LANGFLOW', to: 'ALL AI' },
  { from: 'LangFlow', to: 'ALL AI' },
  { from: 'lang-flow', to: 'all-ai' },
  { from: 'lang_flow', to: 'all_ai' },
  { from: 'docs.langflow.org', to: 'docs.allai.org' },
  { from: 'langflow.org', to: 'allai.org' },
  { from: 'langflow.dev', to: 'allai.dev' },
  { from: 'langflow-frontend', to: 'all-ai-frontend' },
  { from: 'langflow-backend', to: 'all-ai-backend' }
];

try {
  console.log('[1/3] Traitement des fichiers de configuration...');
  const configFiles = [
    'src/frontend/package.json',
    'pyproject.toml',
    'railway.json',
    'Procfile',
    'wrangler.toml',
    'wrangler-workers.toml'
  ];
  
  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      replaceInFile(file, replacements);
    }
  });
  
  console.log('[2/3] Traitement des fonctions Cloudflare...');
  const functionsDir = 'src/frontend/functions';
  if (fs.existsSync(functionsDir)) {
    processDirectory(functionsDir, replacements);
  }
  
  console.log('[3/3] Traitement des fichiers backend...');
  const backendDir = 'src/backend';
  if (fs.existsSync(backendDir)) {
    processDirectory(backendDir, replacements);
  }
  
  console.log('\n🎉 Remplacement terminé !');
  console.log('\n📊 Résumé :');
  console.log('✅ Fichiers de configuration mis à jour');
  console.log('✅ Fonctions Cloudflare mises à jour');
  console.log('✅ Fichiers backend mis à jour');
  console.log('✅ Noms de projets mis à jour');
  console.log('✅ URLs et domaines mis à jour');
  
  console.log('\n🚀 Prochaines étapes :');
  console.log('1. Reconstruisez le frontend : cd src/frontend && npm run build');
  console.log('2. Redéployez sur Cloudflare : wrangler pages deploy build --project-name all-ai-frontend');
  console.log('3. Testez l\'application : https://all-ai-frontend.pages.dev');
  
} catch (error) {
  console.error('❌ Erreur lors du remplacement:', error.message);
}
