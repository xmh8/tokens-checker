@echo off
echo @echo off > start.bat
echo tsc ^&^& node dist/index.js >> start.bat
npm install typescript -g && npm install && tsc