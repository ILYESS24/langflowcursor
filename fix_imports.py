#!/usr/bin/env python3
"""
Script pour corriger tous les imports all-ai vers langflow
"""

import os
import re
from pathlib import Path

def fix_imports_in_file(file_path):
    """Corrige les imports dans un fichier Python"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remplacer les imports all-ai par langflow
        original_content = content
        content = re.sub(r'from all-ai\.', 'from langflow.', content)
        content = re.sub(r'import all-ai\.', 'import langflow.', content)
        
        # Si le contenu a changé, sauvegarder
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Corrigé: {file_path}")
            return True
        return False
    except Exception as e:
        print(f"❌ Erreur avec {file_path}: {e}")
        return False

def main():
    """Corrige tous les fichiers Python dans src/backend/base/langflow"""
    base_path = Path("src/backend/base/langflow")
    
    if not base_path.exists():
        print("❌ Répertoire src/backend/base/langflow non trouvé")
        return
    
    fixed_count = 0
    total_count = 0
    
    # Parcourir tous les fichiers Python
    for py_file in base_path.rglob("*.py"):
        total_count += 1
        if fix_imports_in_file(py_file):
            fixed_count += 1
    
    print(f"\n🎯 Résumé: {fixed_count}/{total_count} fichiers corrigés")

if __name__ == "__main__":
    main()
