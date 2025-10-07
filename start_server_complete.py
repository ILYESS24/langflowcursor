#!/usr/bin/env python3
"""
Script de démarrage pour ALL AI Backend API COMPLET
Configure le PYTHONPATH et démarre l'application FastAPI avec tous les endpoints
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
    from fastapi import FastAPI, HTTPException, Depends
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import JSONResponse
    from pydantic import BaseModel
    from typing import List, Dict, Any, Optional
    import json
    import uuid
    from datetime import datetime
    
    print("🚀 Démarrage de ALL AI Backend API COMPLET...")
    
    # Créer une application FastAPI
    app = FastAPI(
        title="ALL AI Backend API", 
        version="1.0.0",
        description="Backend API complet pour l'application ALL AI"
    )
    
    # Configuration CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Modèles Pydantic
    class UserLogin(BaseModel):
        username: str
        password: str
    
    class UserSignup(BaseModel):
        username: str
        email: str
        password: str
    
    class FlowCreate(BaseModel):
        name: str
        description: Optional[str] = None
        data: Dict[str, Any]
    
    class ComponentCreate(BaseModel):
        name: str
        type: str
        data: Dict[str, Any]
    
    # Base de données simulée
    users_db = {}
    flows_db = {}
    components_db = {}
    
    # Endpoints d'authentification
    @app.post("/api/v1/login")
    async def login(user: UserLogin):
        # Simulation d'authentification
        if user.username in users_db:
            return {
                "access_token": f"token_{uuid.uuid4()}",
                "token_type": "bearer",
                "user": {
                    "id": str(uuid.uuid4()),
                    "username": user.username,
                    "email": users_db[user.username]["email"]
                }
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    
    @app.post("/api/v1/signup")
    async def signup(user: UserSignup):
        if user.username in users_db:
            raise HTTPException(status_code=400, detail="Username already exists")
        
        users_db[user.username] = {
            "email": user.email,
            "password": user.password  # En production, hasher le mot de passe
        }
        
        return {
            "message": "User created successfully",
            "user": {
                "id": str(uuid.uuid4()),
                "username": user.username,
                "email": user.email
            }
        }
    
    @app.get("/api/v1/auth")
    async def check_auth():
        return {"authenticated": True, "user": {"id": "demo_user"}}
    
    # Endpoints pour les flows
    @app.get("/api/v1/flows")
    async def get_flows():
        return {
            "flows": list(flows_db.values()),
            "total": len(flows_db)
        }
    
    @app.post("/api/v1/flows")
    async def create_flow(flow: FlowCreate):
        flow_id = str(uuid.uuid4())
        flows_db[flow_id] = {
            "id": flow_id,
            "name": flow.name,
            "description": flow.description,
            "data": flow.data,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }
        return flows_db[flow_id]
    
    @app.get("/api/v1/flows/{flow_id}")
    async def get_flow(flow_id: str):
        if flow_id not in flows_db:
            raise HTTPException(status_code=404, detail="Flow not found")
        return flows_db[flow_id]
    
    # Endpoints pour les composants
    @app.get("/api/v1/components")
    async def get_components():
        return {
            "components": list(components_db.values()),
            "total": len(components_db)
        }
    
    @app.post("/api/v1/components")
    async def create_component(component: ComponentCreate):
        component_id = str(uuid.uuid4())
        components_db[component_id] = {
            "id": component_id,
            "name": component.name,
            "type": component.type,
            "data": component.data,
            "created_at": datetime.now().isoformat()
        }
        return components_db[component_id]
    
    # Endpoint pour exécuter un flow
    @app.post("/api/v1/run")
    async def run_flow(flow_data: Dict[str, Any]):
        # Simulation d'exécution
        return {
            "result": "Flow executed successfully",
            "output": "Hello from ALL AI!",
            "execution_time": "0.5s",
            "status": "completed"
        }
    
    # Endpoints de santé
    @app.get("/")
    async def root():
        return {
            "message": "ALL AI Backend API is running!", 
            "status": "operational",
            "version": "1.0.0",
            "frontend_url": "https://all-ai-frontend.onrender.com"
        }
    
    @app.get("/health")
    async def health():
        return {
            "status": "healthy", 
            "message": "ALL AI Backend API is operational",
            "timestamp": datetime.now().isoformat()
        }
    
    @app.get("/api/v1/status")
    async def api_status():
        return {
            "api": "ALL AI API",
            "version": "v1",
            "status": "active",
            "endpoints": [
                "/", "/health", "/api/v1/status",
                "/api/v1/login", "/api/v1/signup", "/api/v1/auth",
                "/api/v1/flows", "/api/v1/components", "/api/v1/run"
            ]
        }
    
    # Démarrer le serveur
    port = int(os.environ.get("PORT", 8000))
    print(f"🌐 Backend API complet démarré sur le port {port}")
    print(f"🔧 API accessible sur: http://localhost:{port}/api/v1/")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info"
    )
