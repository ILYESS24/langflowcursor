#!/usr/bin/env python3
"""
Script de démarrage pour ALL AI Application Complète
Configure le PYTHONPATH et démarre l'application FastAPI avec fichiers statiques
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
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.staticfiles import StaticFiles
    from fastapi.responses import FileResponse
    
    print("🚀 Démarrage de ALL AI Application Complète...")
    
    # Créer une application FastAPI
    app = FastAPI(
        title="ALL AI Application", 
        version="1.0.0",
        description="Application complète ALL AI (Backend + Frontend)"
    )
    
    # Configuration CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Chemin vers les fichiers statiques du frontend
    static_path = Path(__file__).parent / "src" / "frontend" / "build"
    static_path_env = os.environ.get("ALL_AI_STATIC_FILES_PATH")
    if static_path_env:
        static_path = Path(__file__).parent / static_path_env
    
    # Monter les fichiers statiques si le dossier existe
    if static_path.exists():
        app.mount("/static", StaticFiles(directory=str(static_path / "assets")), name="static")
        print(f"📁 Fichiers statiques montés depuis: {static_path}")
    else:
        print(f"⚠️  Dossier statique non trouvé: {static_path}")
    
    @app.get("/")
    async def serve_frontend():
        """Servir le frontend React"""
        index_file = static_path / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file))
        else:
            return {
                "message": "ALL AI Application is running!", 
                "status": "operational",
                "version": "1.0.0",
                "note": "Frontend files not found, serving API only"
            }
    
    @app.get("/health")
    async def health():
        return {
            "status": "healthy", 
            "message": "ALL AI Application is operational",
            "timestamp": "2025-10-07T16:00:00Z"
        }
    
    @app.get("/api/v1/status")
    async def api_status():
        return {
            "api": "ALL AI API",
            "version": "v1",
            "status": "active",
            "endpoints": ["/", "/health", "/api/v1/status"]
        }
    
    # Servir tous les autres fichiers statiques
    @app.get("/{full_path:path}")
    async def serve_static_files(full_path: str):
        """Servir les fichiers statiques du frontend"""
        # Si c'est une route API, laisser passer
        if full_path.startswith("api/"):
            return {"error": "API endpoint not found"}
        
        # Chercher le fichier dans le dossier build
        file_path = static_path / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(str(file_path))
        
        # Si c'est une route frontend, servir index.html (pour React Router)
        index_file = static_path / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file))
        
        return {"error": "File not found"}
    
    # Démarrer le serveur
    port = int(os.environ.get("PORT", 8000))
    print(f"🌐 Application démarrée sur le port {port}")
    print(f"🌍 Frontend accessible sur: http://localhost:{port}")
    print(f"🔧 API accessible sur: http://localhost:{port}/api/v1/")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info"
    )
