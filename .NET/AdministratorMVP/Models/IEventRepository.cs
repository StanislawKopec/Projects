using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP.Models
{

    public interface IEventRepository
    {
        IEnumerable<Event> GetAll();
        void Add(Event newEvent);
        void Remove(Event newEvent);
        void SetAllEvents(List<Event> events);
        List<Event> SortEvents(string columnName);
        List<Event> FilterEvents(string s1,string s2, string s3);
    }

}
