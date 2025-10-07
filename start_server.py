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
    
    try:
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
    except ImportError as e:
        print(f"❌ Erreur d'import: {e}")
        print("🔧 Tentative de démarrage avec une application minimale...")
        
        # Créer une application FastAPI minimale
        from fastapi import FastAPI
        from fastapi.middleware.cors import CORSMiddleware
        
        app = FastAPI(title="ALL AI Backend", version="1.0.0")
        
        # Configuration CORS
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        
        @app.get("/")
        async def root():
            return {"message": "ALL AI Backend is running!", "status": "minimal"}
        
        @app.get("/health")
        async def health():
            return {"status": "healthy", "message": "ALL AI Backend minimal mode"}
        
        # Démarrer le serveur
        port = int(os.environ.get("PORT", 8000))
        uvicorn.run(
            app,
            host="0.0.0.0",
            port=port,
            log_level="info"
        )
