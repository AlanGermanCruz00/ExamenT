#!/bin/bash

 
cd "$(dirname "$0")"

 

echo "🚀 Iniciando API Node.js..."
cd "api" 
npm install 
npm run build 

 
cd ..

echo "🚀 Iniciando Angular..."
cd "WEB-LOGIN" 
npm install 
ng serve --host 0.0.0.0 --port 4200 &  

 
cd ..

 

echo "✅ Proyectos Angular y Node.js iniciados."