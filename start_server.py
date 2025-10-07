#!/usr/bin/env python3
"""
Script de démarrage pour ALL AI Backend
Configure le PYTHONPATH et démarre l'application FastAPI
"""

import sys
import os
from pathlib import Path

# Ajouter le répertoire backend/base au PYTHONPATH
backend_base = Path(__file__).parent / "src" / "backend" / "base"
sys.path.insert(0, str(backend_base))

# Importer et démarrer l'application
if __name__ == "__main__":
    import uvicorn
    from langflow.main import create_app
    
    # Créer l'application
    app = create_app()
    
    # Démarrer le serveur
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info"
    )
