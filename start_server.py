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
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    
    print("🚀 Démarrage de ALL AI Backend...")
    
    # Créer une application FastAPI
    app = FastAPI(
        title="ALL AI Backend", 
        version="1.0.0",
        description="Backend pour l'application ALL AI"
    )
    
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
        return {
            "message": "ALL AI Backend is running!", 
            "status": "operational",
            "version": "1.0.0"
        }
    
    @app.get("/health")
    async def health():
        return {
            "status": "healthy", 
            "message": "ALL AI Backend is operational",
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
    
    # Démarrer le serveur
    port = int(os.environ.get("PORT", 8000))
    print(f"🌐 Serveur démarré sur le port {port}")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info"
    )
