#!/usr/bin/env python3
"""
Script de démarrage optimisé pour Render
"""
import os
import sys
from pathlib import Path

# Ajouter le répertoire backend au PYTHONPATH
backend_path = Path(__file__).parent / "src" / "backend" / "base"
sys.path.insert(0, str(backend_path))

if __name__ == "__main__":
    import uvicorn
    from langflow.main import create_app
    
    # Configuration pour Render
    port = int(os.environ.get("PORT", 8000))
    host = "0.0.0.0"
    
    print(f"🚀 Starting Langflow 2.0 on {host}:{port}")
    
    # Créer l'application
    app = create_app()
    
    # Démarrer avec uvicorn
    uvicorn.run(
        app,
        host=host,
        port=port,
        log_level="info",
        access_log=True
    )
