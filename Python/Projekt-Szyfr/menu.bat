@echo off
chcp 1250>nul

:menu
echo Szyfr Stanis³aw Kopeæ
echo.
echo 1. Uruchom Program
echo 2. Wyœwietl opis problemu
echo 3. Backup inputu outputu i raportu
echo 4. Exit (wyjœcie)
echo.

set /p choice=Wybierz opcjê(1-4) 

if %choice%==1 goto opcja1
if %choice%==2 goto opcja2
if %choice%==3 goto opcja3
if %choice%==4 goto exit
echo wybrano niew³aœciw¹ opcjê z zakresu 1-4
goto menu
:opcja1
echo opcja 1
IF EXIST raport.html DEL raport.html
IF NOT EXIST output mkdir output
echo "<HTML>" >> raport.html
DEL /Q output
for /f "delims=" %%a in ('dir /b input') do (
	echo Przetwarzanie --- %%a
    call python szyfr.py %%a
)

call python raport.py
goto menu
:opcja2
echo Program deszyfruje podany ci¹g znaków, o ile zosta³ on zaszyfrowany funkcj¹ (p*key+q)mod33
goto menu
:opcja3
IF NOT EXIST backups mkdir backups
set name=%date%--%TIME:~1,7%
set name=%name::=-%
IF EXIST raport.html mkdir backups\%name%
robocopy input backups\%name%\input
robocopy output backups\%name%\output
copy raport.html backups\%name%\raport.html
goto menu
:exit
