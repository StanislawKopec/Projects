using MVP.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Windows.Forms;

namespace MVP.Views
{
    public partial class EventView : Form, IEventView
    {
        public event EventHandler AddEvent;
        public event EventHandler DeleteEvent;
        public event EventHandler SaveEventsToFile;
        public event EventHandler LoadEventsFromFile;
        public event CellClickedEventHandler CellClicked;
        public event EventHandler<string> SortComboBoxSelectedIndexChanged;
        public event EventHandler<Tuple<string, string,string>> FilterCriteriaSelected;

        public EventView()
        {
            InitializeComponent();
            dateTimePicker1.Visible = false;
            foreach (EventType eventType in Enum.GetValues(typeof(EventType)))
            {
                typeComboBox.Items.Add(eventType);
            }

            foreach (EventPriority eventPriority in Enum.GetValues(typeof(EventPriority)))
            {
                priorityComboBox.Items.Add(eventPriority);
            }
            sortComboBox.Items.Add("Type");
            sortComboBox.Items.Add("Priority");
            sortComboBox.Items.Add("Date");

            filterComboBox.Items.Add("None");
            filterComboBox.Items.Add("Type");
            filterComboBox.Items.Add("Priority");
            filterComboBox.Items.Add("Date");

            _associateAndRaiseViewEvents();
            dataGridView1.CellFormatting += dataGridView1_CellFormatting;
            dataGridView1.AllowUserToAddRows = false;
        }
        public class CellClickedEventArgs : EventArgs
        {
            public int RowIndex { get; }

            public CellClickedEventArgs(int rowIndex)
            {
                RowIndex = rowIndex;
            }
        }
        private void _associateAndRaiseViewEvents()
        {
            button1.Click += (sender, e) =>
            {
                if (string.IsNullOrEmpty(titleTextBox.Text))
                {
                    errorProvider1.SetError(titleTextBox, "To pole jest wymagane.");
                    return;

                }
                else
                {
                    errorProvider1.Clear();
                }
                if (string.IsNullOrEmpty(descriptionTextBox.Text))
                {
                    errorProvider1.SetError(descriptionTextBox, "To pole jest wymagane.");
                    return;
                }
                else
                {
                    errorProvider1.Clear();
                }
                if (typeComboBox.SelectedIndex == -1)
                {
                    errorProvider1.SetError(typeComboBox, "Type is required.");
                    return;
                }
                else
                {
                    errorProvider1.Clear();
                }
                if (priorityComboBox.SelectedIndex == -1)
                {
                    errorProvider1.SetError(typeComboBox, "Priority is required.");
                    return;
                }
                else
                {
                    errorProvider1.Clear();
                }

                bool czySaBledy = false;

                foreach (Control kontrolka in this.Controls)
                {
                    string errorMessage = errorProvider1.GetError(kontrolka);
                    if (!string.IsNullOrEmpty(errorMessage))
                    {
                        czySaBledy = true;
                        break;
                    }
                }

                if (!czySaBledy) AddEvent?.Invoke(this, EventArgs.Empty);
            };
            dataGridView1.CellClick += (sender, e) =>
            {
                if (e.RowIndex >= 0)
                {
                    CellClicked?.Invoke(this, new CellClickedEventArgs(e.RowIndex));
                }
            };
            button4.Click += (sender, e) =>
            {
                if (string.IsNullOrEmpty(titleTextBox.Text))
                {
                    errorProvider1.SetError(titleTextBox, "To pole jest wymagane.");
                    return;

                }
                else
                {
                    errorProvider1.Clear();
                }
                if (string.IsNullOrEmpty(descriptionTextBox.Text))
                {
                    errorProvider1.SetError(descriptionTextBox, "To pole jest wymagane.");
                    return;
                }
                else
                {
                    errorProvider1.Clear();
                }
                if (typeComboBox.SelectedIndex == -1)
                {
                    errorProvider1.SetError(typeComboBox, "Type is required.");
                    return;
                }
                else
                {
                    errorProvider1.Clear();
                }
                if (priorityComboBox.SelectedIndex == -1)
                {
                    errorProvider1.SetError(typeComboBox, "Priority is required.");
                    return;
                }
                else
                {
                    errorProvider1.Clear();
                }

                bool czySaBledy = false;

                foreach (Control kontrolka in this.Controls)
                {
                    string errorMessage = errorProvider1.GetError(kontrolka);
                    if (!string.IsNullOrEmpty(errorMessage))
                    {
                        czySaBledy = true;
                        break;
                    }
                }

                if (!czySaBledy)
                    DeleteEvent?.Invoke(this, EventArgs.Empty);
            };
            button3.Click += (sender, e) =>
            {
                SaveEventsToFile?.Invoke(this, EventArgs.Empty);
            };
            button2.Click += (sender, e) =>
            {
                LoadEventsFromFile?.Invoke(this, EventArgs.Empty);
            };

        }
        public object GetCellValue(int rowIndex, string columnName)
        {
            return dataGridView1.Rows[rowIndex].Cells[columnName].Value;
        }
        public void PassCellValues(string title, string description, DateTime date, EventType type, EventPriority priority)
        {
            titleTextBox.Text = title;
            descriptionTextBox.Text = description;
            dateTimePicker.Value = date;
            typeComboBox.SelectedItem = type;
            priorityComboBox.SelectedItem = priority;
        }
        public string Title
        {
            get => titleTextBox.Text;
            set => titleTextBox.Text = value;
        }

        public string Description
        {
            get => descriptionTextBox.Text;
            set => descriptionTextBox.Text = value;
        }

        public DateTime Date
        {
            get => dateTimePicker.Value;
            set => dateTimePicker.Value = value;
        }

        public EventType Type
        {
            get => (EventType)typeComboBox.SelectedItem;
            set => typeComboBox.SelectedItem = value;
        }

        public EventPriority Priority
        {
            get => (EventPriority)priorityComboBox.SelectedItem;
            set => priorityComboBox.SelectedItem = value;
        }

        public void SetEventListBindingSource(BindingSource eventList)
        {
            dataGridView1.DataSource = eventList;
        }

        public void ShowMessage(string message)
        {
            MessageBox.Show(message);
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }
        public void ShowEventDetails(Event eventData)
        {
            throw new NotImplementedException();
        }


        public void ShowEvents(IEnumerable<Event> events)
        {
            throw new NotImplementedException();
        }

        private void dataGridView1_CellFormatting(object sender, DataGridViewCellFormattingEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex >= 0)
            {
                var typeValue = dataGridView1["Type", e.RowIndex].Value;

                if (typeValue != null && Enum.TryParse(typeValue.ToString(), out EventType eventType))
                {
                    switch (eventType)
                    {
                        case EventType.Praca:
                            dataGridView1.Rows[e.RowIndex].DefaultCellStyle.BackColor = Color.LightGreen; 
                            break;
                        case EventType.Rodzina:
                            dataGridView1.Rows[e.RowIndex].DefaultCellStyle.BackColor = Color.LightBlue; 
                            break;
                        case EventType.Rozrywka:
                            dataGridView1.Rows[e.RowIndex].DefaultCellStyle.BackColor = Color.LightPink;
                            break;
                        case EventType.Sport:
                            dataGridView1.Rows[e.RowIndex].DefaultCellStyle.BackColor = Color.LightCoral;
                            break;
                        case EventType.Zdrowie:
                            dataGridView1.Rows[e.RowIndex].DefaultCellStyle.BackColor = Color.LightGray;
                            break;
                    }
                }
            }
        }

        private void sortComboBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            string selectedSortCriteria = sortComboBox.SelectedItem.ToString();
            SortComboBoxSelectedIndexChanged?.Invoke(this, selectedSortCriteria);
        }
        private void filterComboBox_SelectedIndexChanged_1(object sender, EventArgs e)
        {
            if (filterComboBox.SelectedItem.ToString() == "Type")
            {
                dateTimePicker1.Visible = false;
                comboBox1.DataSource = Enum.GetValues(typeof(EventType));
            }
            else if (filterComboBox.SelectedItem.ToString() == "Priority")
            {
                dateTimePicker1.Visible = false;
                comboBox1.DataSource = Enum.GetValues(typeof(EventPriority));
            }
            else if (filterComboBox.SelectedItem.ToString() == "Date")
            {
                dateTimePicker1.Visible = true;
                comboBox1.DataSource = new[] { "Before", "After"};
            }
            else if (filterComboBox.SelectedItem.ToString() == "None")
            {
                dateTimePicker1.Visible = false;
                comboBox1.DataSource = new[] {""};
            }
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (filterComboBox.SelectedItem.ToString() == "Date")
            {
                string selectedFilterCriteria1 = filterComboBox.SelectedItem.ToString();
                string selectedFilterCriteria2 = comboBox1.SelectedItem.ToString();
                string selectedFilterCriteria3 = dateTimePicker1.Text;
                FilterCriteriaSelected?.Invoke(this, Tuple.Create(selectedFilterCriteria1, selectedFilterCriteria2, selectedFilterCriteria3));
            }
            else
            {
                string selectedFilterCriteria1 = filterComboBox.SelectedItem.ToString();
                string selectedFilterCriteria2 = comboBox1.SelectedItem.ToString();
                FilterCriteriaSelected?.Invoke(this, Tuple.Create(selectedFilterCriteria1, selectedFilterCriteria2, ""));
            }
        }

        private void dateTimePicker1_ValueChanged(object sender, EventArgs e)
        {
            string selectedFilterCriteria1 = filterComboBox.SelectedItem.ToString();
            string selectedFilterCriteria2 = comboBox1.SelectedItem.ToString();
            string selectedFilterCriteria3 = dateTimePicker1.Text;
            FilterCriteriaSelected?.Invoke(this, Tuple.Create(selectedFilterCriteria1, selectedFilterCriteria2, selectedFilterCriteria3));
        }
    }

}
