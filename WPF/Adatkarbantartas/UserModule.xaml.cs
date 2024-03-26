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
using System.Net.Http;
using Newtonsoft.Json;

namespace Adatkarbantartas
{
    /// <summary>
    /// Interaction logic for UserModule.xaml
    /// </summary>
    public partial class UserModule : Window
    {
        public UserModule()
        {
            InitializeComponent();
        }



        private async void Save_Button_Click(object sender, RoutedEventArgs e)
        {
            var client = new HttpClient();

            var user = new
            {
                firstName = txt_Firstname.Text,
                lastName = txt_Lastname.Text,
                password = txt_Password.Text,
                email = txt_Email.Text
            };

            var json = JsonConvert.SerializeObject(user);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var url = "https://localhost:7083/api/Auth/register";
            var response = await client.PostAsync(url, data);

            string result = await response.Content.ReadAsStringAsync();
            MessageBox.Show(result);
        }

        private void Clear_Button_Click(object sender, RoutedEventArgs e)
        {
            txt_Firstname.Clear();
            txt_Lastname.Clear();
            txt_Password.Clear();
            txt_Email.Clear();
        }

        
    }
}
