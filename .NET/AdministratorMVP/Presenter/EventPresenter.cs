using MVP.Models;
using MVP.Views;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.Button;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;
using static MVP.Views.EventView;
using MVP.Repositories;
using System.IO;
using System.Xml.Serialization;

namespace MVP.Presenters
{
    public class EventPresenter
    {
        private Models.IEventRepository _eventRepository;
        private readonly IEventView _view;
        private BindingSource _eventsBindingSource;
        private IEnumerable<Models.Event> _eventList;
        private readonly DataGridView _dataGridView;

        public EventPresenter(IEventView view, IEventRepository repository)
        {
            _view = view;
            _eventRepository = repository;
            _eventsBindingSource = new BindingSource();

            _view.CellClicked += OnCellClicked;
            _view.AddEvent += OnAddEvent;
            _view.DeleteEvent += OnRemoveEvent;
            _view.SaveEventsToFile += OnSaveEventsToFile;
            _view.LoadEventsFromFile += OnLoadEventsFromFile;

            _view.SetEventListBindingSource(_eventsBindingSource);

            _view.SortComboBoxSelectedIndexChanged += OnSortComboBoxSelectedIndexChanged;
            _view.FilterCriteriaSelected += OnFilterCriteriaSelected;

            LoadAllEventList();
        }
        private void LoadAllEventList()
        {
            _eventList = _eventRepository.GetAll();
            _eventsBindingSource.DataSource = _eventList;
        }
        private void OnAddEvent(object sender, EventArgs e)
        {
            try
            {
                Event newEvent = new Event(_view.Title, _view.Description, _view.Date, _view.Type, _view.Priority);
                _eventRepository.Add(newEvent);

                LoadAllEventList();
                _view.Title = "";
                _view.Description = "";
                _view.Date = DateTime.Now;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private void OnRemoveEvent(object sender, EventArgs e)
        {
            try
            {
                Event newEvent = new Event(_view.Title, _view.Description, _view.Date, _view.Type, _view.Priority);
                foreach (var ev in _eventList)
                {
                    if (ev.Equals(newEvent))
                    {
                        _eventRepository.Remove(ev);
                    }
                }

                LoadAllEventList();
                _view.Title = "";
                _view.Description = "";
                _view.Date = DateTime.Now;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void OnCellClicked(object sender, CellClickedEventArgs e)
        {
            int rowIndex = e.RowIndex;
            string title = _view.GetCellValue(rowIndex, "Title").ToString();
            string description = _view.GetCellValue(rowIndex, "Description").ToString();
            DateTime date = Convert.ToDateTime(_view.GetCellValue(rowIndex, "Date"));
            EventType type = (EventType)Enum.Parse(typeof(EventType), _view.GetCellValue(rowIndex, "Type").ToString());
            EventPriority priority = (EventPriority)Enum.Parse(typeof(EventPriority), _view.GetCellValue(rowIndex, "Priority").ToString());

            _view.PassCellValues(title, description, date, type, priority);
        }
        private void OnSaveEventsToFile(object sender, EventArgs e)
        {
            SaveFileDialog saveFileDialog = new SaveFileDialog();
            saveFileDialog.Filter = "XML files (*.xml)|*.xml";
            saveFileDialog.FilterIndex = 1;
            saveFileDialog.RestoreDirectory = true;

            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                string filePath = saveFileDialog.FileName;

                XmlSerializer serializer = new XmlSerializer(typeof(List<Event>));
                using (StreamWriter writer = new StreamWriter(filePath))
                {
                    serializer.Serialize(writer, _eventRepository.GetAll());
                }
            }

        }
        private void OnLoadEventsFromFile(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "XML files (*.xml)|*.xml";
            openFileDialog.FilterIndex = 1;
            openFileDialog.RestoreDirectory = true;

            if (openFileDialog.ShowDialog() == DialogResult.OK)
            {
                string filePath = openFileDialog.FileName;

                try
                {
                    XmlSerializer serializer = new XmlSerializer(typeof(List<Event>));
                    using (StreamReader reader = new StreamReader(filePath))
                    {
                        List<Event> loadedEvents = (List<Event>)serializer.Deserialize(reader);
                        _eventRepository.SetAllEvents(loadedEvents);
                        LoadAllEventList();
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"An error occurred while loading the file: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }

        }
        private void OnSortComboBoxSelectedIndexChanged(object sender, string selectedSortCriteria)
        {
            string columnName;
            switch (selectedSortCriteria)
            {
                case "Type":
                    columnName = "Type";
                    break;
                case "Priority":
                    columnName = "Priority";
                    break;
                case "Date":
                    columnName = "Date";
                    break;
                default:
                    columnName = "Title";
                    break;
            }

            List<Event> sortedEvents = _eventRepository.SortEvents(columnName);
            _eventRepository.SetAllEvents(sortedEvents);
            LoadAllEventList();
        }
        private void OnFilterCriteriaSelected(object sender, Tuple<string, string, string> e)
        {
            List<Event> filteredEvents = _eventRepository.FilterEvents(e.Item1,e.Item2,e.Item3);
            _eventRepository.SetAllEvents(filteredEvents);
            LoadAllEventList();
        }

    }
}

