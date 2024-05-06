@echo off
chcp 1250>nul

:menu
echo Szyfr Stanis�aw Kope�
echo.
echo 1. Uruchom Program
echo 2. Wy�wietl opis problemu
echo 3. Backup inputu outputu i raportu
echo 4. Exit (wyj�cie)
echo.

set /p choice=Wybierz opcj�(1-4) 

if %choice%==1 goto opcja1
if %choice%==2 goto opcja2
if %choice%==3 goto opcja3
if %choice%==4 goto exit
echo wybrano niew�a�ciw� opcj� z zakresu 1-4
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
echo Program deszyfruje podany ci�g znak�w, o ile zosta� on zaszyfrowany funkcj� (p*key+q)mod33
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
