#!/usr/bin/env python3
"""
Script de démarrage optimisé pour Railway
"""
import os
import sys
from pathlib import Path

# Ajouter le répertoire backend au PYTHONPATH
backend_path = Path(__file__).parent / "src" / "backend" / "base"
sys.path.insert(0, str(backend_path))

if __name__ == "__main__":
    # Configuration pour Railway
    port = int(os.environ.get("PORT", 8000))
    host = "0.0.0.0"
    
    print(f"🚀 Starting Langflow 2.0 on {host}:{port}")
    print(f"🔧 Environment: {os.environ.get('RAILWAY_ENVIRONMENT', 'development')}")
    
    # Importer et démarrer l'application
    try:
        from langflow.main import create_app
        import uvicorn
        
        app = create_app()
        
        # Configuration optimisée pour Railway
        uvicorn.run(
            app, 
            host=host, 
            port=port, 
            log_level="info",
            access_log=True,
            loop="asyncio"
        )
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("🔧 Trying alternative startup method...")
        
        # Alternative: utiliser gunicorn
        try:
            import subprocess
            cmd = [
                "gunicorn",
                "--bind", f"{host}:{port}",
                "--workers", "1",
                "--timeout", "120",
                "--worker-class", "uvicorn.workers.UvicornWorker",
                "langflow.main:create_app"
            ]
            print(f"🚀 Starting with gunicorn: {' '.join(cmd)}")
            subprocess.run(cmd)
        except Exception as e2:
            print(f"❌ Gunicorn error: {e2}")
            sys.exit(1)
    except Exception as e:
        print(f"❌ Error starting application: {e}")
        sys.exit(1)
