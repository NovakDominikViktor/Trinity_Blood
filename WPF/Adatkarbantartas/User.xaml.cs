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
    /// Interaction logic for User.xaml
    /// </summary>
    public partial class User : Window
    {
        public User()
        {
            InitializeComponent();
        }

       private void Manage_Users(object sender, MouseButtonEventArgs e)
        {
            UserModule userModule = new UserModule();
            userModule.Show();
        }

        private void User_Role_Up(object sender, MouseButtonEventArgs e)
        {

        }



        private void dtg_User_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }

        private void _MouseEnter(object sender, MouseEventArgs e)
        {
            //Products.Source = new BitmapImage(new Uri("Open Box.png", UriKind.Relative));
        }

        private void Products_MouseLeave(object sender, MouseEventArgs e)
        {
            //Products.Source = new BitmapImage(new Uri("Box.png", UriKind.Relative));
        }
    }
}
