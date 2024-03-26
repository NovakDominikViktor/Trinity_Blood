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

        private void Products_MouseEnter(object sender, MouseEventArgs e)
        {
            Products.Source = new BitmapImage(new Uri("Open Box.png", UriKind.Relative));
        }

        private void Products_MouseLeave(object sender, MouseEventArgs e)
        {
            Products.Source = new BitmapImage(new Uri("Box.png", UriKind.Relative));
        }

        private void Orders_MouseEnter(object sender, MouseEventArgs e)
        {
            Orders.Source = new BitmapImage(new Uri("Orders_active.png", UriKind.Relative));
        }

        private void Orders_MouseLeave(object sender, MouseEventArgs e)
        {
            Orders.Source = new BitmapImage(new Uri("Orders.png", UriKind.Relative));
        }

        private void Comments_MouseEnter(object sender, MouseEventArgs e)
        {
            Comments.Source = new BitmapImage(new Uri("Comments_active.png", UriKind.Relative));
        }

        private void Comments_MouseLeave(object sender, MouseEventArgs e)
        {
            Comments.Source = new BitmapImage(new Uri("Comments.png", UriKind.Relative));
        }

        private void Categories_MouseEnter(object sender, MouseEventArgs e)
        {
            Categories.Source = new BitmapImage(new Uri("Category_active.png", UriKind.Relative));
        }

        private void Categories_MouseLeave(object sender, MouseEventArgs e)
        {
            Categories.Source = new BitmapImage(new Uri("Category.png", UriKind.Relative));
        }

        private void Users_MouseEnter(object sender, MouseEventArgs e)
        {
            Users.Source = new BitmapImage(new Uri("User_active.png", UriKind.Relative));
        }

        private void Users_MouseLeave(object sender, MouseEventArgs e)
        {
            Users.Source = new BitmapImage(new Uri("User.png", UriKind.Relative));
        }

    }
}
