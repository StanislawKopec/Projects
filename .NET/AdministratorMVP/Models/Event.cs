using System;

namespace MVP.Models
{
    public enum EventType
    {
        Praca,
        Rodzina,
        Rozrywka,
        Zdrowie,
        Sport 
    }

    public enum EventPriority
    {
        Wysoki,
        Średni,
        Niski
    }

    [Serializable]
    public class Event
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public EventType Type { get; set; }
        public EventPriority Priority { get; set; }
        public Event()
        {
            Title = string.Empty;
            Description = string.Empty;
            Date = DateTime.MinValue;
            Type = EventType.Praca; 
            Priority = EventPriority.Wysoki; 
        }
        public Event(string title, string description, DateTime date, EventType type, EventPriority priority)
        {
            Title = title;
            Description = description;
            Date = date;
            Type = type;
            Priority = priority;
        }

        public Event(Event eventModel)
        {
            Title = eventModel.Title;
            Description = eventModel.Description;
            Date = eventModel.Date;
            Type = eventModel.Type;
            Priority = eventModel.Priority;
        }
        public override string ToString()
        {
            return $"Title: {Title}, Description: {Description}, Date: {Date}, Type: {Type}, Priority: {Priority}";
        }
        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            Event other = (Event)obj;

            return Title == other.Title && Description == other.Description && Date == other.Date && Type == other.Type && Priority == other.Priority;
        }
        public override int GetHashCode()
        {
            return Type.GetHashCode();
        }
    }

}