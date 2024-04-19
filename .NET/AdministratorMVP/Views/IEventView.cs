using MVP.Models;
using System;
using System.Collections.Generic;
using System.Windows.Forms;
using static MVP.Views.EventView;

namespace MVP.Views
{
    public delegate void CellClickedEventHandler(object sender, CellClickedEventArgs e);
    public interface IEventView
    {
        string Title { get; set; }
        string Description { get; set; }
        DateTime Date { get; set; }
        EventType Type { get; set; }
        EventPriority Priority { get; set; }

        event EventHandler AddEvent;
        event EventHandler DeleteEvent;
        event EventHandler SaveEventsToFile;
        event EventHandler LoadEventsFromFile;
        event CellClickedEventHandler CellClicked;
        event EventHandler<string> SortComboBoxSelectedIndexChanged;
        event EventHandler<Tuple<string, string,string>> FilterCriteriaSelected;

        object GetCellValue(int rowIndex, string columnName);
        void PassCellValues(string title, string description, DateTime date, EventType type, EventPriority priority);


        // Methods to update UI elements
        void ShowEvents(IEnumerable<Event> events);
        void ShowEventDetails(Event eventData);
        void ShowMessage(string message);
        void SetEventListBindingSource(BindingSource eventList);
    }
}