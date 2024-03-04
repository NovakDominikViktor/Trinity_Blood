using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics.Eventing.Reader;
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
    /// Interaction logic for LoginScreen.xaml
    /// </summary>
    public partial class LoginScreen : Window
    {
        public LoginScreen()
        {
            InitializeComponent();
        }

        private void btnSubmit_Click(object sender, RoutedEventArgs e)
        {
            if(txtEmail.Text == "admin123@gmail.com" && txtPassword.Password == "password")
            {
                MainWindow objWindow = new MainWindow();
                MessageBox.Show("Successfully logged in!");
                objWindow.Show();
                this.Close();
            }
            else if(txtEmail.Text == "" || txtPassword.Password == "") 
            {
                MessageBox.Show("Missing login credentials!");
            }
            else
            {
                MessageBox.Show("Wrong E-mail, and/or password!");
            }
            
        }
    }
}
