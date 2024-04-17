using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace KalkulatorKopec
{
    public partial class Form1 : Form
    {

        public Form1()
        {
            InitializeComponent();
        }

        private void groupBox1_Enter(object sender, EventArgs e)
        {
            
        }

        private void button1_Click(object sender, EventArgs e)
        {
            textBox1.Text += button1.Text;
        }

        private void button13_Click(object sender, EventArgs e)
        {
            textBox1.Text += button13.Text;
        }
        

        private void button5_Click(object sender, EventArgs e)
        {
            textBox1.Text += button5.Text;
        }

        private void button14_Click(object sender, EventArgs e)
        {
            textBox1.Text += button14.Text;
        }

        private void button15_Click(object sender, EventArgs e)
        {
            textBox1.Text += button15.Text;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            textBox1.Text += button2.Text;
        }

        private void button3_Click(object sender, EventArgs e)
        {
            textBox1.Text += button3.Text;
        }

        private void button6_Click(object sender, EventArgs e)
        {
            textBox1.Text += button6.Text;
        }

        private void button7_Click(object sender, EventArgs e)
        {
            textBox1.Text += button7.Text;
        }

        private void button9_Click(object sender, EventArgs e)
        {
            textBox1.Text += button9.Text;
        }

        private void button11_Click(object sender, EventArgs e)
        {
            textBox1.Text += button11.Text;
        }

        private void button4_Click(object sender, EventArgs e)
        {
            textBox1.Text += button4.Text;
        }

        private void button8_Click(object sender, EventArgs e)
        {
            textBox1.Text += button8.Text;
        }

        private void button12_Click(object sender, EventArgs e)
        {
            string pattern = "^(-?\\d+(\\.\\d+)?)(\\s*[\\+\\-\\*\\/]\\s*-?\\d+(\\.\\d+)?)*$";
            Regex rg = new Regex(pattern);
            if (rg.IsMatch(textBox1.Text))
            {
                DataTable dt = new DataTable();
                try
                {
                    object result = dt.Compute(textBox1.Text, "");
                    if (result is double && double.IsInfinity((double)result))
                    {
                        MessageBox.Show("Dzielenie przez zero jest zakazane");
                    }
                    else
                    {
                        textBox1.Text = result.ToString();
                    }
                }
                catch (OverflowException)
                {
                    MessageBox.Show("Przepelniłeś bufor. ");
                }
            }
            else
            {
                MessageBox.Show("Błąd, prawdopodobnie wpisałeś niepoprawne działanie");

            }

        }
        private void button10_Click(object sender, EventArgs e)
        {
            textBox1.Text += button10.Text;
        }
        private void button16_Click(object sender, EventArgs e)
        {
            if (textBox1.Text.Length > 0)
            {
                textBox1.Text = textBox1.Text.Remove(textBox1.Text.Length - 1);
            }
        }

        private void button19_Click(object sender, EventArgs e)
        {
            textBox1.Text = textBox1.Text + ".";
        }
        private void button20_Click(object sender, EventArgs e)
        {
            textBox1.Text = "";
        }

    }
}
