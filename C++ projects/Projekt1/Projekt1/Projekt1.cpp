

#include <iostream>
#include <vector>
#include <stdlib.h>
#include <fstream>
#include <sstream>

using namespace std;

class Vehicle {
public:
	virtual void GenerujRaport() = 0;
	virtual string GetClass() = 0;
	virtual string GetParameters() = 0;
	virtual string GetNumbers() = 0;
};

class Truck : public Vehicle {
	string Clas;
	string Numbers;
	int Tonnage;
	string License;
public:
	Truck(string clas, string numbers, int tonnage, string license) {
		Clas = clas;
		Numbers = numbers;
		Tonnage = tonnage;
		License = license;
	}
	void Wypisz() {
		cout << Numbers << endl;
		cout << Tonnage << endl;
		cout << License << endl;
	}
	string GetNumbers() {
		return Numbers;
	}
	int getTonnage() {
		return Tonnage;
	}
	string getLicense() {
		return License;
	}
	virtual string GetParameters() {
		stringstream ss;
		string s;
		ss << Clas << " " << Numbers << " " << Tonnage << " " << License;
		getline(ss, s);
		s = ss.str();
		return s;
	}
	virtual string GetClass() {
		return "Truck";
	}
	void GenerujRaport() {
		cout << "Klasa: " << Clas << endl;
		cout << "Pojazd: " << Numbers << endl;
		cout << "Prawo jazdy: " << License << endl;
		cout << "Pojemnosc: " << Tonnage << endl;
	}

	~Truck() {

	}
};

class PassengerVehicle : public Vehicle {
	string Clas;
	string Numbers;
	string License;
	int PassengerLimit;
public:
	PassengerVehicle(string clas, string numbers, string license, int passengerLimit) {
		Clas = clas;
		Numbers = numbers;
		License = license;
		PassengerLimit = passengerLimit;
	}
	void Wypisz() {
		cout << Numbers << endl;
		cout << License << endl;
		cout << PassengerLimit << endl;
	}
	string GetNumbers() {
		return Numbers;
	}
	string getLicense() {
		return License;
	}
	int getPassengerLimit() {
		return PassengerLimit;
	}
	virtual string GetClass() {
		return "PassengerVehicle";
	}
	virtual string GetParameters() {
		stringstream ss;
		string s;
		ss << Clas << " " << Numbers << " " << License << " " << PassengerLimit;
		getline(ss, s);
		s = ss.str();
		return s;
	}
	void GenerujRaport() {
		cout << "Klasa: " << Clas << endl;
		cout << "Pojazd: " << Numbers << endl;
		cout << "Prawo jazdy: " << License << endl;
		cout << "Liczba wolnych miejsc: " << PassengerLimit << endl;
	}
	~PassengerVehicle() {

	}
};


int main() {
	int x = 0;
	string klasa;
	string rejestracja;
	int pojemnosc;
	string licencja;
	vector <unique_ptr<Vehicle>> vehicles;
	string pojazd;

	fstream newfile;

	newfile.open("data.txt", ios::in);
	if (newfile.is_open()) {
		string tp;
		while (getline(newfile, tp)) {
			stringstream S;
			string word;
			string word1;
			S << tp;
			S >> word1 >> word;
			string buffer;
			int i = 0;
			if (word == "Truck") {
				string klasa;
				string rejestracja;
				double pojemnosc;
				string licenjca;
				if (S >> klasa >> rejestracja >> pojemnosc >> licencja) {
					S >> klasa >> rejestracja >> pojemnosc >> licencja;
				}
				else {
					cout << "Bledne dane" << endl;
				}

				Truck c(klasa, rejestracja, pojemnosc, licencja);
				vehicles.push_back(make_unique<Truck>(c));
			}
			else if (word == "PassengerVehicle") {
				string klasa;
				string rejestracja;
				string licencja;
				int miejsca;
				while (S >> buffer) {
					if (S >> klasa >> rejestracja >> licencja >> miejsca) {
						S >> klasa >> rejestracja >> licencja >> miejsca;
					}
					else {
						cout << "Bledne dane" << endl;
					}
				}
				PassengerVehicle c(klasa, rejestracja, licencja, miejsca);
				vehicles.push_back(make_unique<PassengerVehicle>(c));
			}
		}
		newfile.close();
	}
	else {
		cout << "Nie mozna otowrzyc pliku" << endl;
	}

	while (x != 1) {
		cout << "Wybierz akcje:" << endl << "1) Koniec " << endl << "2) Dodaj pojazd" << endl << "3) Usun pojazd" << endl << "4) Generuj raport" << endl;
		cin >> x;
		switch (x) {
		case 1:
			cout << "Koniec" << endl;
			break;
		case 2:
			cout << "Podaj kategorie pojazdu" << endl;
			cin >> klasa;
			if (klasa == "Truck") {
				string klasa = "Truck";
				cout << "rejestracja" << endl;
				cin >> rejestracja;
				cout << "pojemnosc" << endl;
				cin >> pojemnosc;
				while (!cin.good()) {
					cin.clear();
					std::cin.ignore();
					cin >> pojemnosc;
				}
				cout << "licencja" << endl;
				cin >> licencja;
				Truck c(klasa, rejestracja, pojemnosc, licencja);
				vehicles.push_back(make_unique<Truck>(c));
			}

			else if (klasa == "PassengerVehicle") {
				int miejsca;
				string klasa = "PassengerVehicle";
				cout << "rejestracja" << endl;
				cin >> rejestracja;
				cout << "ilosc miejsc" << endl;
				cin >> miejsca;
				while (!cin.good()) {
					cin.clear();
					std::cin.ignore();
					cin >> pojemnosc;
				}
				cout << "licencja" << endl;
				cin >> licencja;
				PassengerVehicle c(klasa, rejestracja, licencja, miejsca);
				vehicles.push_back(make_unique<PassengerVehicle>(c));
			}
			else {
				cout << "Nie ma takiej kategorii" << endl;
				cout << "Wpisz jedną z mozliwych: Truck, PassengerVehicle" << endl;
			}

			newfile.open("data.txt", ios::out | ios::app);
			if (newfile.is_open())
			{
				for (int i = 0; vehicles.size() > i; ++i) {
					Vehicle* wsk;
					wsk = vehicles[i].get();
					if (wsk->GetClass() == "Truck") {
						newfile << wsk->GetParameters() << endl;
					}
					else if (wsk->GetClass() == "PassengerVehicle") {
						newfile << wsk->GetParameters() << endl;
					}
				}
				newfile.close();
			}
			else {
				cout << "Nie mozna otowrzyc pliku" << endl;
			}
			break;
		case 3:
			cout << "Wybierz pojazd do usuniecia, po numerze rejestracji" << endl;
			cin >> pojazd;
			for (int i = 0; vehicles.size() > i; ++i) {
				Vehicle* wsk;
				wsk = vehicles[i].get();
				if (wsk->GetNumbers() == rejestracja) {
					vehicles.erase(vehicles.begin() + i);
					break;
				}
			}
			cout << "Nie ma takiego pojazdu" << endl;

			newfile.open("data.txt", ios::out);
			if (newfile.is_open())
			{
				for (int i = 0; vehicles.size() > i; ++i) {
					Vehicle* wsk;
					wsk = vehicles[i].get();
					if (wsk->GetClass() == "Truck") {
						newfile << wsk->GetParameters();
					}
					else if (wsk->GetClass() == "PassengerVehicle") {
						newfile << wsk->GetParameters();
					}
				}
				newfile.close();
			}
			else {
				cout << "Nie mozna otowrzyc pliku" << endl;
			}

			break;
		case 4:
			string rejestracja;
			cin >> rejestracja;
			for (int i = 0; vehicles.size() > i; ++i) {
				Vehicle* wsk;
				wsk = vehicles[i].get();
				if (wsk->GetNumbers() == rejestracja) {
					wsk->GenerujRaport();
					break;
				}
			}
			cout << "Nie ma takiego pojazdu" << endl;
			break;
		}
	}
}
