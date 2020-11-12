@ECHO OFF

WHERE node >nul 2>&1
IF %ERRORLEVEL% NEQ 0 ECHO "node not found. please install node." 

WHERE mkdocs >nul 2>&1
IF %ERRORLEVEL% NEQ 0 ECHO "mkdocs not found. please install python & mkdocs." 

SET CURDIR=%~dp0
CD "./tools/html-formatter-generator"
npm install
yarn build
CD %CURDIR%
mkdocs gh-deploy