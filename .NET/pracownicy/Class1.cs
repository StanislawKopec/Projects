using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace pracownicy
{
   
    [Serializable]
    public class Pracownik : ISerializable
    {
        public string Imie { get; set; }
        public string Nazwisko { get; set; }
        public DateTime DataUrodzenia { get; set; }
        public decimal Pensja { get; set; }
        public string Stanowisko { get; set; }
        public string RodzajUmowy { get; set; }

        public Pracownik(string imie, string nazwisko, DateTime dataUrodzenia, decimal pensja, string stanowisko, string rodzajUmowy)
        {
            Imie = imie;
            Nazwisko = nazwisko;
            DataUrodzenia = dataUrodzenia;
            Pensja = pensja;
            Stanowisko = stanowisko;
            RodzajUmowy = rodzajUmowy;
        }

        public Pracownik()
        {
        }

        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            throw new NotImplementedException();
        }
    }
}
