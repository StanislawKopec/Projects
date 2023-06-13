#pragma once
#include "pch.h"
#include <iostream>
#include <vector>
#include <sstream>
#include <msclr\marshal_cppstd.h>

using namespace System;
using namespace::Data;
using namespace System::Data::SqlClient;

using namespace std;

class Zadanie;
class Pracownik;

const string connectionString1 = "Server=tcp:projektstudia.database.windows.net,1433;Initial Catalog=projekt;Persist Security Info=False;User ID=StanislawK;Password=Kopec123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
//"Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=projekt;Integrated Security=True"
template<typename T>
std::string toString(const T& value)
{
	std::ostringstream oss;
	oss << value;
	return oss.str();
}

class DataProjektu
{
public:
	DataProjektu(int, int, int);
	~DataProjektu();

	std::string WyswietlDate();

	int rok;
	int miesiac;
	int dzien;
};

class Projekt
{
public:
	Projekt();
	Projekt( string nazwa);
	~Projekt();

	vector<Zadanie> WyswietlZadania();
	Zadanie ZnajdzZadaniePoNazwie(string nazwaZadania);
	void DodajZadanie(Zadanie zadanie, int i);
	int id;
	string nazwa;
	vector<Zadanie> zadania;
private:
	vector<Pracownik> pracownicy;

};

class Zadanie
{
public:
	Zadanie(string nazwa, string status);
	Zadanie(string nazwa, string status, string pracownikZadania);
	Zadanie();
	~Zadanie();

	void PrzydzielPracownika(Pracownik pracownik, int i, String^ nazwaZadania);
	void ZmienStatusZadania(std::string status, int i, String^ nazwaZadania);

	std::string pracownikString;
	std::string statusZadania;
	Pracownik* pracownikZadania;
	std::string nazwaZadania;

private:
};


class Pracownik
{
public:
	Pracownik();
	Pracownik(int id, std::string imie, std::string nazwisko, std::string stanowisko);
	~Pracownik();

	void ZmienStatusZadania(Zadanie zadanie);

	std::string imie, nazwisko, stanowisko;
	int id;
private:
	
	vector<Zadanie> przydzieloneZadania;
};
