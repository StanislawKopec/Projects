#pragma once
#include "pch.h"
#include "klasy.h"


DataProjektu::DataProjektu(int dziem, int miesiac, int rok)
{
	dzien = dzien;
	miesiac = miesiac;
	rok = rok;
}

string DataProjektu::WyswietlDate()
{
	string data = toString(dzien) + ":" + toString(miesiac) + ":" + toString(rok);
	return data;
}

DataProjektu::~DataProjektu() {};


Projekt::Projekt()
{

};

Projekt::Projekt( string nazwa1)
{
	nazwa = nazwa1;
}

Projekt::~Projekt() {};

void Projekt::DodajZadanie(Zadanie zadanie, int i)
{
	zadania.push_back(zadanie);

	try
	{
		String^ connectionString = gcnew String(connectionString1.c_str());
		SqlConnection sqlConn(connectionString);
		sqlConn.Open();

		String^ sqlQuery = "insert into [dbo].[Zadania" + i + "](nazwaZadania, statusZadania) VALUES(@nazwaZadania, 'nieprzydzielone')";

		SqlCommand command(sqlQuery, % sqlConn);

		command.Parameters->AddWithValue("@nazwaZadania", msclr::interop::marshal_as<String^>(zadanie.nazwaZadania));


		command.ExecuteReader()->Close();
		sqlConn.Close();
	}
	catch (exception ex)
	{
		cerr << ex.what() << endl;
	}
};

vector<Zadanie> Projekt::WyswietlZadania()
{
	return zadania;
}

Zadanie Projekt::ZnajdzZadaniePoNazwie(string nazwaZadania)
{
	for (int i = 0; i < zadania.size(); i++)
	{
		if (nazwaZadania == zadania[i].nazwaZadania)
		{
			return zadania[i];
		}
	}
}

Zadanie::Zadanie()
{
	statusZadania = "Nierozpoczete";
	pracownikZadania = new Pracownik();
}

Zadanie::Zadanie(string nazwa, string status)
{
	nazwaZadania = nazwa;
	statusZadania = status;
	pracownikZadania = new Pracownik();
}

Zadanie::Zadanie(string nazwa, string status, string pracownik)
{
	nazwaZadania = nazwa;
	statusZadania = status;
	pracownikString = pracownik;
}

void Zadanie::PrzydzielPracownika(Pracownik pracownik, int i, String^ nazwaZadania)
{
	pracownikZadania = &pracownik;
	pracownikString = pracownik.imie + " " + pracownik.nazwisko;
	try
	{
		String^ connectionString = gcnew String(connectionString1.c_str());
		SqlConnection sqlConn(connectionString);
		sqlConn.Open();

		String^ sqlQuery = "UPDATE[dbo].[Zadania" + i + "]" +
			"SET[pracownikZadania] =" + "'" + gcnew String(pracownik.imie.c_str()) + " " + gcnew String(pracownik.nazwisko.c_str()) + "'" +
			"WHERE([nazwaZadania] = " +"'" + nazwaZadania + "'" + ")";

		SqlCommand command(sqlQuery, % sqlConn);

		command.ExecuteReader()->Close();
		sqlConn.Close();
	}
	catch (exception ex)
	{
		cerr << ex.what() << endl;
	}

}

void Zadanie::ZmienStatusZadania(string status, int i, String^ nazwaZadania)
{
	statusZadania = status;

	try
	{
		String^ connectionString = gcnew String(connectionString1.c_str());
		SqlConnection sqlConn(connectionString);
		sqlConn.Open();

		String^ sqlQuery = "UPDATE[dbo].[Zadania" + i + "]" +
			"SET[statusZadania] =" + "'" + gcnew String(status.c_str()) + "'" +
			"WHERE([nazwaZadania] =" +"'" + nazwaZadania + "'" + ")";

		SqlCommand command(sqlQuery, % sqlConn);

		command.ExecuteReader()->Close();
		sqlConn.Close();
	}
	catch (exception ex)
	{
		cerr << ex.what() << endl;
	}
}

Zadanie::~Zadanie() {};

Pracownik::Pracownik()
{
	imie = "nieprzydzielone";
	nazwisko = "";
	stanowisko = "";
}

Pracownik::Pracownik(int id1, string imie1, string nazwisko1, string stanowisko1)
{
	id = id1;
	imie = imie1;
	nazwisko = nazwisko1;
	stanowisko = stanowisko1;
}

void Pracownik::ZmienStatusZadania(Zadanie zadanie)
{
	/*
	cout << "Zmien status zadania:" << endl;
	cout << "1)Skonczone" << endl;
	cout << "2)W trakcie" << endl;
	cout << "3)Nierozpoczete" << endl;
	int x;
	cin >> x;
	switch (x) {
	case 1:
		zadanie.ZmienStatusZadania("Skonczone");
		break;

	case 2:
		zadanie.ZmienStatusZadania("W trakcie");
		break;
	case 3:
		zadanie.ZmienStatusZadania("Nierozpoczete");
		break;
	default:
		cout << "Nie ma takiej opcji" << endl;

	}*/
}


Pracownik::~Pracownik() {};