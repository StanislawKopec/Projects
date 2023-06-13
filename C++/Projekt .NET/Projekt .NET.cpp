#include "pch.h"
#include "klasy.h"

int main()
{
	vector<Projekt> projekty;
	vector<Pracownik> pracownicy;

	try {
		String^ connectionString = gcnew String(connectionString1.c_str());
		SqlConnection sqlConn(connectionString);
		sqlConn.Open();

		String^ sqlQuery = "SELECT * FROM Pracownicy";
		SqlCommand command(sqlQuery, % sqlConn);

		SqlDataReader^ reader = command.ExecuteReader();
		while (reader->Read()) {

			pracownicy.push_back(Pracownik(reader->GetInt32(0),msclr::interop::marshal_as<string>(reader->GetString(1)), msclr::interop::marshal_as<string>(reader->GetString(2)), msclr::interop::marshal_as<string>(reader->GetString(3))));
		}
		reader->Close();



		String^ sqlQuery2 = "SELECT * FROM Projekty";
		SqlCommand command2(sqlQuery2, % sqlConn);

		SqlDataReader^ reader2 = command2.ExecuteReader();
		while (reader2->Read()) {

			projekty.push_back(Projekt(msclr::interop::marshal_as<string>(reader2->GetString(1))));


		}
		reader2->Close();
		
		for (int i = 1; i -1  < projekty.size(); i++)
		{
			String^ sqlQuery3 = "SELECT * FROM [dbo].Zadania" + i;
			SqlCommand command3(sqlQuery3, % sqlConn);

			SqlDataReader^ reader3 = command3.ExecuteReader();
			while (reader3->Read()) {

				if (reader3->IsDBNull(3))
					projekty[i - 1].zadania.push_back((Zadanie(msclr::interop::marshal_as<string>(reader3->GetString(1)), msclr::interop::marshal_as<string>(reader3->GetString(2)))));
				else
					projekty[i - 1].zadania.push_back((Zadanie(msclr::interop::marshal_as<string>(reader3->GetString(1)), msclr::interop::marshal_as<string>(reader3->GetString(2)), msclr::interop::marshal_as<string>(reader3->GetString(3)))));

			}
			reader3->Close();
		}

		sqlConn.Close();
	}
	catch(exception ex){
		cerr << ex.what() << endl;
	}
	int x = 0;
	int x2 = 0;
	int x3 = 0;
	while (x != 1) {
		cout << "Wybierz akcje:" << endl << "1) Koniec " << endl << "2) Wyswietl projekty" << endl
			<< "3) Wyswietl pracownikow" << endl << "4) Dodaj projekt" << endl;

		while (!(cin >> x)) {
			cin.clear(); 
			cin.ignore(); 
		}
		switch (x) {
		case 1:
			cout << "Koniec" << endl;
			break;
		case 2:
			float progresProjektu;
			float ukonczoneZadania;
			float wszystkieZadania;
			
			for (int i = 0; i < projekty.size(); i++)
			{
				ukonczoneZadania = 0;
				wszystkieZadania = 0;
				vector<Zadanie> v = projekty[i].WyswietlZadania();
				for (int j = 0; j < v.size(); j++)
				{
					wszystkieZadania++;
					if (v[j].statusZadania == "Skonczone")
						ukonczoneZadania++;
				}
				if (wszystkieZadania == 0)
					progresProjektu = 0;
				else
					progresProjektu = ukonczoneZadania / wszystkieZadania;

				cout << i << " " << projekty[i].nazwa << " " << progresProjektu * 100 << "%" << endl;
			}
			cout << endl;

				cout << "Wybierz akcje:" << endl << "1) Koniec " << endl << "2) Sprawdz projekt po nazwie" << endl;
				while (!(cin >> x2)) {
					cin.clear();
					cin.ignore();
				}
				switch (x2) {
				case 1:

					cout << "Koniec" << endl;
					break;

				case 2:

					string nazwaProjektu;
					cin >> nazwaProjektu;

					for (int i = 0; i < projekty.size(); i++)
					{
						if (projekty[i].nazwa == nazwaProjektu)
						{
							vector<Zadanie> v = projekty[i].WyswietlZadania();
							cout << projekty[i].nazwa << endl;

							for (int j = 0; j < v.size(); j++)
							{
								if (v[j].pracownikString != "")
									cout << v[j].nazwaZadania << " " << v[j].statusZadania << " " << v[j].pracownikString << endl;
								else
									cout << v[j].nazwaZadania << " " << v[j].statusZadania << " " << "Nieprzydzielone" << endl;
							}
							cout << "Wybierz akcje:" << endl << "1) Koniec " << endl << "2) Dodaj zadanie do projektu" << endl << "3) Edytuj zadanie" << endl;

							while (!(cin >> x3)) {
								cin.clear();
								cin.ignore();
							}
							string nazwaZadania;
							string n;
							string n1;
							string n2;
							int id;
							
							switch (x3) {
							case 1:

								cout << "Koniec" << endl;
								break;

							case 2:

								cout << "Podaj nazwe zadania: ";
								cin >> nazwaZadania;

								projekty[i].DodajZadanie(Zadanie(nazwaZadania, "Nierozpoczete"), i + 1);

								break;

							case 3:
								cout << "Podaj nazwe zadania: ";
								cin >> nazwaZadania;
								cout << endl;

								Zadanie z = projekty[i].ZnajdzZadaniePoNazwie(nazwaZadania);

								int x4 = 0;
								string statusZadania;
								cout << "Wybierz akcje:" << endl << "1) Koniec " << endl << "2) Przydziel pracownika" << endl << "3) Zmien status zadania" << endl;
								cin >> x4;
								switch (x4) {
								case 1:
									cout << "Koniec" << endl;
									break;
								case 2:
									cout << "Przydziel pracownika do zadania" << endl;
									cout << "id: ";
									cin >> id;
									cout << endl;
									cout << "imie: ";
									cin >> n;
									cout << "nazwisko: ";
									cin >> n1;
									cout << "stanowisko: ";
									cin >> n2;
									cout << endl;

									z.PrzydzielPracownika(Pracownik(id, n, n1, n2), i + 1, gcnew String(nazwaZadania.c_str()));
									break;
								case 3:
									cout << "Zmien status zadania:" << endl;
									cout << "1)Skonczone" << endl;
									cout << "2)W trakcie" << endl;
									cout << "3)Nierozpoczete" << endl;
									int x;
									while (!(cin >> x)) {
										cin.clear();
										cin.ignore();
									}
									switch (x) {
									case 1:
										z.ZmienStatusZadania("Skonczone", i + 1, gcnew String(nazwaZadania.c_str()));
										break;

									case 2:
										z.ZmienStatusZadania("W trakcie", i + 1, gcnew String(nazwaZadania.c_str()));
										break;
									case 3:
										z.ZmienStatusZadania("Nierozpoczete", i + 1, gcnew String(nazwaZadania.c_str()));
										break;
									default:
										cout << "Nie ma takiej opcji" << endl;
										break;
									}
								}

								break;

							}


						}
						else if(i == projekty.size()-1)
							cout << "Nie ma takiego projektu" << endl;
					}
					cout << endl;

					break;
				}
			

			break;
		case 3:
			 
			for (int i = 0; i < pracownicy.size(); i++)
			{
				cout << pracownicy[i].id<< " " << pracownicy[i].imie << " " << pracownicy[i].nazwisko << " " << pracownicy[i].stanowisko << endl;
			}
			cout << endl;

			break;
		case 4:
			int iloscProjektow = projekty.size() + 1;

			string nazwaProjektu;

			cout << "Nazwa projektu: ";
			cin >> nazwaProjektu;
			Projekt nowy;

			try
			{
				String^ connectionString = gcnew String(connectionString1.c_str());
				SqlConnection sqlConn(connectionString);
				sqlConn.Open();

				String^ sqlQuery = "CREATE TABLE [dbo].Zadania" + iloscProjektow +
					"([Id] INT IDENTITY(1, 1)" +
					"NOT NULL, [nazwaZadania] VARCHAR(50) NOT NULL," +
					" [statusZadania]    VARCHAR(50) NOT NULL," +
					"[pracownikZadania] VARCHAR(50) NULL," +
					"PRIMARY KEY CLUSTERED([Id] ASC)" +
					"); ";
				SqlCommand command(sqlQuery, % sqlConn);

				command.ExecuteReader()->Close();

				String^ sqlQuery2 = "INSERT INTO Projekty VALUES(@nazwaProjektu)";
				SqlCommand command4(sqlQuery2, % sqlConn);

				command4.Parameters->AddWithValue("@nazwaProjektu", msclr::interop::marshal_as<String^>(nazwaProjektu));

				command4.ExecuteReader();
				nowy = Projekt(nazwaProjektu);
				projekty.push_back(nowy);

				sqlConn.Close();
			}
			catch (exception ex)
			{
				cerr << ex.what() << endl;
			}

			int y = 0;
			while (y != 1)
			{
				cout << "Wybierz akcje:" << endl << "1) Koniec " << endl << "2) dodaj zadanie" << endl;
				while (!(cin >> y)) {
					cin.clear();
					cin.ignore();
				}
				switch (y)
				{
				case 1:
					cout << "Koniec" << endl;
					break;

				case 2:
					string nazwaZadania;
					cout << "Podaj nazwe zadania: ";
					cin >> nazwaZadania;
					nowy.DodajZadanie(Zadanie(nazwaZadania, "Nierozpoczete"), projekty.size());

				}
			}

			break;
		}
	}
}
