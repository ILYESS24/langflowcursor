import json
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import sys
import os

# Ajouter le répertoire backend au path
sys.path.append(os.path.join(os.path.dirname(__file__), '../../src/backend/base'))

def handler(event, context):
    """
    Netlify Function pour servir l'API backend
    """
    try:
        # Parser la requête
        path = event.get('path', '')
        method = event.get('httpMethod', 'GET')
        headers = event.get('headers', {})
        body = event.get('body', '')
        
        # Headers de réponse
        response_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
        
        # Gestion des requêtes OPTIONS (CORS preflight)
        if method == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': response_headers,
                'body': json.dumps({'message': 'CORS preflight'})
            }
        
        # Routes de l'API
        if path == '/api/health' or path == '/health':
            return {
                'statusCode': 200,
                'headers': response_headers,
                'body': json.dumps({
                    'message': 'ALL AI Backend API is running on Netlify Functions!',
                    'status': 'operational',
                    'version': '1.0.0'
                })
            }
        
        elif path == '/api/v1/flows':
            if method == 'GET':
                return {
                    'statusCode': 200,
                    'headers': response_headers,
                    'body': json.dumps({
                        'flows': [],
                        'total': 0,
                        'message': 'ALL AI API - Flows endpoint'
                    })
                }
            elif method == 'POST':
                return {
                    'statusCode': 201,
                    'headers': response_headers,
                    'body': json.dumps({
                        'id': 'flow_123',
                        'name': 'Nouveau Flow',
                        'message': 'Flow créé avec succès'
                    })
                }
        
        elif path == '/api/v1/components':
            return {
                'statusCode': 200,
                'headers': response_headers,
                'body': json.dumps({
                    'components': [],
                    'total': 0,
                    'message': 'ALL AI API - Components endpoint'
                })
            }
        
        elif path == '/api/v1/run':
            if method == 'POST':
                return {
                    'statusCode': 200,
                    'headers': response_headers,
                    'body': json.dumps({
                        'result': 'Flow executed successfully',
                        'output': 'Hello from ALL AI on Netlify Functions!',
                        'execution_time': '0.5s',
                        'status': 'completed'
                    })
                }
        
        elif path == '/api/v1/login':
            if method == 'POST':
                return {
                    'statusCode': 200,
                    'headers': response_headers,
                    'body': json.dumps({
                        'access_token': 'token_123',
                        'token_type': 'bearer',
                        'user': {
                            'id': 'user_123',
                            'username': 'demo_user'
                        }
                    })
                }
        
        elif path == '/api/v1/signup':
            if method == 'POST':
                return {
                    'statusCode': 201,
                    'headers': response_headers,
                    'body': json.dumps({
                        'message': 'User created successfully',
                        'user': {
                            'id': 'user_123',
                            'username': 'demo_user'
                        }
                    })
                }
        
        elif path == '/api/v1/auth':
            return {
                'statusCode': 200,
                'headers': response_headers,
                'body': json.dumps({
                    'authenticated': True,
                    'user': {'id': 'demo_user'}
                })
            }
        
        # Route par défaut
        else:
            return {
                'statusCode': 404,
                'headers': response_headers,
                'body': json.dumps({
                    'error': 'Endpoint not found',
                    'path': path,
                    'available_endpoints': [
                        '/api/health',
                        '/api/v1/flows',
                        '/api/v1/components',
                        '/api/v1/run',
                        '/api/v1/login',
                        '/api/v1/signup',
                        '/api/v1/auth'
                    ]
                })
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            })
        }
