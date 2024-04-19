using MVP.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP.Repositories
{
    public class EventRepository : IEventRepository
    {
        private List<Event> eventsDatabase;
        private List<Event> originalEvents;

        public EventRepository()
        {
            eventsDatabase = new List<Event>()
            {
                new Event("Title1", "Description1", DateTime.Now, EventType.Praca, EventPriority.Wysoki),
                new Event("Title2", "Description2", DateTime.Now, EventType.Rodzina, EventPriority.Średni),
                new Event("Title3", "Description3", DateTime.Now, EventType.Rozrywka, EventPriority.Niski)
            };
            originalEvents = eventsDatabase.ToList();
        }

        public IEnumerable<Event> GetAll()
        {
            var eventList = new List<Event>();

            foreach (var evt in eventsDatabase)
            {
                eventList.Add(new Event(evt));
            }

            return eventList;
        }

        public void Add(Event newEvent)
        {
            eventsDatabase.Add(newEvent);
            originalEvents.Add(newEvent);
        }
        public void Remove(Event newEvent)
        {
            eventsDatabase.Remove(newEvent);
            originalEvents.Remove(newEvent);
        }
        public void SetAllEvents(List<Event> events)
        {
            eventsDatabase = events;
        }
        public List<Event> SortEvents(string columnName)
        {
            switch (columnName)
            {
                case "Type":
                    return eventsDatabase.OrderBy(e => e.Type).ToList();
                case "Priority":
                    return eventsDatabase.OrderBy(e => e.Priority).ToList();
                case "Date":
                    return eventsDatabase.OrderBy(e => e.Date).ToList();
                default:
                    return eventsDatabase.OrderBy(e => e.Title).ToList();
            }
        }

        public List<Event> FilterEvents(string filterCriteria1, string filterCriteria2, string filterCriteria3)
        {
            List<Event> filteredEvents =originalEvents.ToList();
            switch (filterCriteria1)
            {
                case "Type":
                    filteredEvents = filteredEvents.Where(e => e.Type.ToString().Equals(filterCriteria2)).ToList();
                    break;
                case "Priority":
                    filteredEvents = filteredEvents.Where(e => e.Priority.ToString().Equals(filterCriteria2)).ToList();
                    break;
                case "Date":
                    if (filterCriteria2.Equals("After"))
                    {
                        filteredEvents = filteredEvents
                            .Where(e => e.Date > DateTime.Parse(filterCriteria3))
                            .OrderBy(e => e.Date) // Sort events ascendingly by date
                            .ToList();
                    }
                    else
                    {
                        filteredEvents = filteredEvents
                            .Where(e => e.Date <= DateTime.Parse(filterCriteria3))
                            .OrderByDescending(e => e.Date) // Sort events descendingly by date
                            .ToList();
                    }
                    break;
                default:
                    filteredEvents = new List<Event>(originalEvents); 
                    break;
            }
            return filteredEvents;
        }
    }
}
