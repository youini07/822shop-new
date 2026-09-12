@echo off
cd /d "%~dp0"

echo [1/3] Frontend Client Starting...
start "Frontend Client" cmd /k "cd client && npm run dev"

echo [2/3] Waiting for server 3 seconds...
ping 127.0.0.1 -n 4 > nul

echo [3/3] Opening local homepage (http://localhost:4000)...
start http://localhost:4000

echo ===========================================================
echo [Backend Server] Backend runs here. (For error check)
echo ===========================================================
cd server
npm start

echo Backend server closed. Check error messages.
pause
