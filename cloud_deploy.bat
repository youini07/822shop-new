@echo off
chcp 65001 >nul
title 822 SHOP One-Click Cloud Deployer (리뉴얼 버전)
setlocal enabledelayedexpansion
cd /d "%~dp0"

:: [안전 장치] Git 저장소 확인
if not exist ".git" (
    echo ==========================================================
    echo [경고] 현재 폴더에 Git 저장소(.git)가 연결되어 있지 않습니다!
    echo ==========================================================
    echo.
    echo 이 폴더는 아직 깃허브(GitHub)와 연결되지 않았습니다.
    echo 이전 폴더(catalog_app)에서 .git 폴더를 복사해 오시거나,
    echo 새로운 깃허브 저장소를 만드신 후 연결하셔야 배포가 가능합니다!
    echo.
    echo 자세한 해결 방법은 AI가 안내해 드린 문서를 참고해 주세요.
    echo ==========================================================
    pause
    exit /b 1
)

:: 0. Build Client
echo ==========================================
echo [0/3] 프론트엔드(Client) 빌드 중...
echo ==========================================
pushd client
call npm run build:local
if errorlevel 1 (
    echo [ERROR] 프론트엔드 빌드에 실패했습니다.
    popd
    pause
    exit /b 1
)
popd
echo [OK] 프론트엔드 빌드 성공!
echo.

:: 1. Sync to GitHub
echo ==========================================
echo [1/3] 깃허브(GitHub)로 코드 업로드 중...
echo ==========================================
git add .
git status

git diff --staged --quiet
if %errorlevel% == 0 (
    echo [INFO] 변경된 사항이 없습니다. 강제 재배포를 시작합니다...
    git commit --allow-empty -m "Auto-deploy: Force redeploy (%date% %time%)"
) else (
    git commit -m "Auto-deploy: Update from local PC (%date% %time%)"
)

git push origin master
if errorlevel 1 (
    echo [ERROR] 깃허브 업로드(git push)에 실패했습니다.
    pause
    exit /b 1
)
echo [OK] 깃허브 업로드 완료. Railway 배포가 자동으로 시작됩니다!
echo.

:: 2. Wait and Sync Data
echo ==========================================
echo [2/3] Railway 서버 빌드 대기 중 (약 4분 소요)...
echo ==========================================
timeout /t 240 /nobreak >nul

echo [INFO] 라이브 서버 데이터 동기화 명령 전송...
curl.exe -s --max-time 600 "https://www.822shop.com/api/sync"
echo.

:: 3. Verify
echo ==========================================
echo [3/3] 배포 상태 확인...
echo ==========================================
echo [버전 체크]
curl.exe -s "https://www.822shop.com/api/deploy-check"
echo.
echo [상품 갯수 체크]
curl.exe -s "https://www.822shop.com/api/debug-products-count"
echo.
echo ==========================================
echo [COMPLETE] 클라우드 배포 프로세스가 완료되었습니다!
echo 접속 주소: https://www.822shop.com
echo ==========================================
pause