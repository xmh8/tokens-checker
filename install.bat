@echo off
mkdir input 2>nul
mkdir output 2>nul
echo. > input/tokens.txt
echo. > output/valid.txt 
echo. > output/invalid.txt
echo @echo off > start.bat
echo tsc ^&^& node dist/index.js >> start.bat
npm install typescript -g && npm install && tsc