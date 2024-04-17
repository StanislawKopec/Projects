using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Serialization;

namespace pracownicy
{
    public partial class Pracownicy : Form
    {
        private List<Pracownik> listaPracownikow = new List<Pracownik>();
        public Pracownicy()
        {
            InitializeComponent();
            comboBox1.Items.Add("młodszy programista");
            comboBox1.Items.Add("projektant");
            comboBox1.Items.Add("inżynier");

            dataGridView1.DataSource = listaPracownikow;
            dataGridView1.CellClick += DataGridView1_CellClick;
            
        }

        private void groupBox1_Enter(object sender, EventArgs e)
        {

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }


        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(textBox1.Text) ) 
            {
                errorProvider1.SetError(textBox1, "To pole jest wymagane.");
                return;

            }
            else
            {
                errorProvider1.Clear();
            }
            if (string.IsNullOrEmpty(textBox2.Text))
            {
                errorProvider1.SetError(textBox2, "To pole jest wymagane.");
                return;
            }
            else
            {
                errorProvider1.Clear();
            }
            if (!(numericUpDown1.Value >0))
            {
                errorProvider1.SetError(numericUpDown1, "To pole jest wymagane.");
                return;
            }
            else
            {
                errorProvider1.Clear();
            }
            if (string.IsNullOrEmpty(comboBox1.Text))
            {
                errorProvider1.SetError(comboBox1, "To pole jest wymagane.");
                return;
            }
            else
            {
                errorProvider1.Clear();
            }
            if (!radioButton3.Checked && !radioButton1.Checked && !radioButton2.Checked)
            {
                errorProvider1.SetError(radioButton1, "");
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
            {
                string umowa = "";
                if (radioButton1.Checked) umowa = radioButton1.Text;
                if (radioButton2.Checked) umowa = radioButton2.Text;
                if (radioButton2.Checked) umowa = radioButton2.Text;
                Pracownik p = new Pracownik(textBox1.Text, textBox2.Text, dateTimePicker1.Value,numericUpDown1.Value,comboBox1.Text, umowa);
                listaPracownikow.Add(p);
                textBox1.Text = "";
                textBox2.Text = "";
                dateTimePicker1.Value = DateTime.Now;
                numericUpDown1.Value = 4000;
                comboBox1.SelectedIndex = -1;
                radioButton1.Checked = false;
                radioButton2.Checked = false;
                radioButton3.Checked = false;

                dataGridView1.DataSource = null;
                dataGridView1.DataSource = listaPracownikow;
            }
        }

        string nazwaPliku = "pracownicy.xml";

        private void button2_Click(object sender, EventArgs e)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Pracownik>));
            using (TextWriter writer = new StreamWriter(nazwaPliku))
            {
                serializer.Serialize(writer, listaPracownikow);
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {
            List<Pracownik> listaPracownikow;
            XmlSerializer serializer = new XmlSerializer(typeof(List<Pracownik>));
            try
            {
                using (TextReader reader = new StreamReader(nazwaPliku))
                {
                    listaPracownikow = (List<Pracownik>)serializer.Deserialize(reader);
                    dataGridView1.DataSource = null;
                    dataGridView1.DataSource = listaPracownikow;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("An error occurred during deserialization: " + ex.Message);
            }


        }

        private void DataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            Debug.WriteLine(e.RowIndex.ToString(), e.ColumnIndex, dataGridView1.Rows.Count);
            foreach (DataGridViewColumn column in dataGridView1.Columns)
            {
                string columnName = column.Name;
                // Use the columnName as needed, such as displaying it in a list or adding it to an array
                Debug.WriteLine(columnName);
            }
            if (e.RowIndex >= 0 && e.ColumnIndex >= 0 && e.RowIndex < dataGridView1.Rows.Count)
            {
                DataGridViewRow selectedRow = dataGridView1.Rows[e.RowIndex];

                textBox1.Text = selectedRow.Cells["Imie"].Value.ToString();
                textBox2.Text = selectedRow.Cells["Nazwisko"].Value.ToString();
                dateTimePicker1.Value = Convert.ToDateTime(selectedRow.Cells["DataUrodzenia"].Value);
                numericUpDown1.Value = Convert.ToDecimal(selectedRow.Cells["Pensja"].Value);
                comboBox1.Text = selectedRow.Cells["Stanowisko"].Value.ToString();

                string rodzajUmowy = selectedRow.Cells["RodzajUmowy"].Value.ToString();
                if (radioButton1.Text == rodzajUmowy)
                    radioButton1.Checked = true;
                else if (radioButton2.Text == rodzajUmowy)
                    radioButton2.Checked = true;
                else if (radioButton3.Text == rodzajUmowy)
                    radioButton3.Checked = true;

            }
        }

    }
}
