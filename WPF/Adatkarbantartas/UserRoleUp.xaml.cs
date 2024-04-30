using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
using System.Net.Http;
using Newtonsoft.Json;


namespace Adatkarbantartas
{
    /// <summary>
    /// Interaction logic for UserRoleUp.xaml
    /// </summary>
    public partial class UserRoleUp : Window
    {
        public UserRoleUp()
        {
            InitializeComponent();
        }

        private async void Button_Click(object sender, RoutedEventArgs e)
        {
            
            if (string.IsNullOrWhiteSpace(txt_Email.Text) || string.IsNullOrWhiteSpace(txt_Role.Text))
            {
                MessageBox.Show("Email and Role must not be empty.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

           
            var data = new
            {
                role = txt_Role.Text,
                email = txt_Email.Text
            };

            try
            {
                
                string jsonData = JsonConvert.SerializeObject(data);

                using (var client = new HttpClient())
                {
                    var content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    var response = await client.PostAsync("https://localhost:7083/api/Auth/AssignRole", content);

                    
                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Role assigned successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                    }
                    else
                    {
                        MessageBox.Show("Failed to assign role. Server returned error: " + response.StatusCode.ToString(), "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("An error occurred while processing the request: " + ex.Message, "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
           
            txt_Email.Clear();
            txt_Role.Clear();
        }
    }
}
