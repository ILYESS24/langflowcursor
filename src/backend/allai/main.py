# ALL AI Main Module
# This module imports and exposes the main FastAPI application from langflow

import sys
import os
from pathlib import Path

# Add the base langflow directory to the Python path
base_dir = Path(__file__).parent.parent / "base"
sys.path.insert(0, str(base_dir))

# Import the main application from langflow
from langflow.main import create_app

# Export the create_app function
__all__ = ["create_app"]
