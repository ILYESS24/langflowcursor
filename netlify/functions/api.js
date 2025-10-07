// Netlify Function pour l'API Langflow
const { Handler } = require('@netlify/functions');

// Import du backend Python via subprocess
const { spawn } = require('child_process');
const path = require('path');

exports.handler = async (event, context) => {
  // Configuration CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Gestion des requêtes OPTIONS (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Chemin vers le backend Python
    const backendPath = path.join(__dirname, '../../src/backend');
    
    // Démarrer le serveur Python
    const pythonProcess = spawn('python', ['-m', 'uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '8000'], {
      cwd: backendPath,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    // Attendre que le serveur démarre
    await new Promise((resolve, reject) => {
      pythonProcess.stdout.on('data', (data) => {
        if (data.toString().includes('Uvicorn running')) {
          resolve();
        }
      });
      
      pythonProcess.stderr.on('data', (data) => {
        console.error('Python error:', data.toString());
      });

      setTimeout(() => resolve(), 2000); // Timeout de 2 secondes
    });

    // Faire la requête vers l'API Python
    const apiUrl = `http://localhost:8000${event.path}`;
    const response = await fetch(apiUrl, {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
        ...event.headers
      },
      body: event.body
    });

    const data = await response.json();

    // Arrêter le processus Python
    pythonProcess.kill();

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Erreur API:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Erreur serveur',
        message: error.message
      })
    };
  }
};
