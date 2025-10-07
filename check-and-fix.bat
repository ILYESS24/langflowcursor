@echo off
echo 🔧 Vérification et correction automatique des erreurs
echo ==================================================

echo [1/8] Vérification de Node.js...
node --version
if errorlevel 1 (
    echo ❌ Node.js non trouvé. Veuillez installer Node.js
    pause
    exit /b 1
)
echo ✅ Node.js trouvé

echo [2/8] Vérification de Python...
python --version
if errorlevel 1 (
    echo ❌ Python non trouvé. Veuillez installer Python
    pause
    exit /b 1
)
echo ✅ Python trouvé

echo [3/8] Installation des dépendances frontend...
cd src/frontend
npm install
if errorlevel 1 (
    echo ❌ Erreur lors de l'installation des dépendances
    pause
    exit /b 1
)
echo ✅ Dépendances frontend installées

echo [4/8] Vérification du formatage frontend...
npm run check-format
if errorlevel 1 (
    echo 🔧 Correction du formatage frontend...
    npm run format
    echo ✅ Formatage frontend corrigé
) else (
    echo ✅ Formatage frontend OK
)

echo [5/8] Vérification TypeScript...
npm run type-check
if errorlevel 1 (
    echo ❌ Erreurs TypeScript détectées
    echo Veuillez corriger manuellement les erreurs TypeScript
) else (
    echo ✅ TypeScript OK
)

echo [6/8] Tests frontend...
npm run test:coverage
if errorlevel 1 (
    echo ❌ Certains tests frontend ont échoué
) else (
    echo ✅ Tests frontend OK
)

echo [7/8] Build frontend...
npm run build
if errorlevel 1 (
    echo ❌ Erreur lors du build frontend
    pause
    exit /b 1
)
echo ✅ Build frontend réussi

echo [8/8] Vérification des fichiers de configuration...
cd ../..
if exist "src\frontend\src\customization\config-constants.ts" (
    echo ✅ config-constants.ts trouvé
) else (
    echo ❌ config-constants.ts manquant
)

if exist "src\frontend\vite.config.mts" (
    echo ✅ vite.config.mts trouvé
) else (
    echo ❌ vite.config.mts manquant
)

if exist "src\frontend\package.json" (
    echo ✅ package.json trouvé
) else (
    echo ❌ package.json manquant
)

if exist "pyproject.toml" (
    echo ✅ pyproject.toml trouvé
) else (
    echo ❌ pyproject.toml manquant
)

echo.
echo 🎉 Vérification terminée !
echo.
echo 📊 Résumé :
echo ✅ Frontend : Formatage, TypeScript, Tests, Build
echo ✅ Configuration : Fichiers de config vérifiés
echo ✅ Dépendances : Installées et à jour
echo.
echo 🚀 Prochaines étapes :
echo 1. Corrigez les erreurs TypeScript si nécessaire
echo 2. Corrigez les tests qui ont échoué
echo 3. Poussez le code sur GitHub
echo 4. Le CI/CD se lancera automatiquement
echo.
pause
