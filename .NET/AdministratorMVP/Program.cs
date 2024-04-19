using MVP.Models;
using MVP.Presenters;
using MVP.Views;
using MVP.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MVP
{
    static class Program
    {
        /// <summary>
        /// Główny punkt wejścia dla aplikacji.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            IEventView eventView = new EventView();
            IEventRepository eventRepository = new EventRepository();
            new EventPresenter(eventView, eventRepository);
            Application.Run((Form)eventView);
            Application.Run(new EventView());
        }
    }
}
