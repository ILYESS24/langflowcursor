@echo off
echo 🚀 Installation et déploiement automatique de Langflow
echo ====================================================
echo.

echo [1/8] Vérification de Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo [INFO] Python non trouvé. Installation...
    echo [INFO] Téléchargement de Python depuis python.org...
    echo [INFO] Veuillez installer Python manuellement depuis : https://www.python.org/downloads/
    echo [INFO] Assurez-vous de cocher "Add Python to PATH" lors de l'installation
    pause
    exit /b 1
) else (
    echo [SUCCESS] Python trouvé
)

echo [2/8] Vérification de pip...
pip --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] pip non trouvé
    pause
    exit /b 1
) else (
    echo [SUCCESS] pip trouvé
)

echo [3/8] Installation de Langflow...
pip install langflow
if errorlevel 1 (
    echo [ERROR] Échec de l'installation de Langflow
    pause
    exit /b 1
) else (
    echo [SUCCESS] Langflow installé
)

echo [4/8] Création du script de démarrage...
echo @echo off > start-langflow.bat
echo echo 🚀 Démarrage de Langflow... >> start-langflow.bat
echo echo ========================== >> start-langflow.bat
echo python -m langflow run --host 0.0.0.0 --port 7860 >> start-langflow.bat
echo pause >> start-langflow.bat

echo [5/8] Création du script de configuration...
echo @echo off > configure-langflow.bat
echo echo 🔧 Configuration de Langflow... >> configure-langflow.bat
echo echo =============================== >> configure-langflow.bat
echo python -m langflow run --host 0.0.0.0 --port 7860 --setup >> configure-langflow.bat
echo pause >> configure-langflow.bat

echo [6/8] Création du script d'arrêt...
echo @echo off > stop-langflow.bat
echo echo ⏹️ Arrêt de Langflow... >> stop-langflow.bat
echo echo ===================== >> stop-langflow.bat
echo taskkill /f /im python.exe >> stop-langflow.bat
echo echo [SUCCESS] Langflow arrêté >> stop-langflow.bat
echo pause >> stop-langflow.bat

echo [7/8] Création du script de statut...
echo @echo off > status-langflow.bat
echo echo 📊 Statut de Langflow... >> status-langflow.bat
echo echo ======================= >> status-langflow.bat
echo netstat -an ^| findstr :7860 >> status-langflow.bat
echo if errorlevel 1 ( >> status-langflow.bat
echo     echo [INFO] Langflow n'est pas en cours d'exécution >> status-langflow.bat
echo ^) else ( >> status-langflow.bat
echo     echo [SUCCESS] Langflow est en cours d'exécution sur le port 7860 >> status-langflow.bat
echo ^) >> status-langflow.bat
echo pause >> status-langflow.bat

echo [8/8] ✅ Installation terminée !
echo.
echo 🎉 Langflow est maintenant installé et prêt !
echo.
echo 📋 Scripts créés :
echo    start-langflow.bat    - Démarrer Langflow
echo    configure-langflow.bat - Configurer Langflow
echo    stop-langflow.bat     - Arrêter Langflow
echo    status-langflow.bat   - Vérifier le statut
echo.
echo 🌐 Pour démarrer Langflow :
echo    1. Double-cliquez sur start-langflow.bat
echo    2. Ouvrez votre navigateur sur http://localhost:7860
echo    3. Créez un compte admin
echo    4. Commencez à créer vos workflows !
echo.
echo ⏹️ Pour arrêter Langflow :
echo    Double-cliquez sur stop-langflow.bat
echo.
pause
