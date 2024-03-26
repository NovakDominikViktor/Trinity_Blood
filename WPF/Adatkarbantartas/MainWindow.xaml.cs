using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Adatkarbantartas
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Image_MouseEnter(object sender, MouseEventArgs e)
        {
            Products.Source = new BitmapImage(new Uri("Open Box.png", UriKind.Relative));
        }

        private void Image_MouseLeave(object sender, MouseEventArgs e)
        {
            Products.Source = new BitmapImage(new Uri("Box.png", UriKind.Relative));
        }
    }
}
