using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Windows;

namespace Adatkarbantartas
{
    public partial class ModifyUserWindow : Window
    {
        public event EventHandler UserDeleted;

        public ModifyUserWindow()
        {
            InitializeComponent();
        }

        public ModifyUserWindow(string userId, string firstName, string lastName, string email)
        {
            InitializeComponent();
            txt_Id.Text = userId;
            txt_Firstnam.Text = firstName;
            txt_Lastname.Text = lastName;
            txt_Email.Text = email;
        }

        private async void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txt_Firstnam.Text) ||
                string.IsNullOrWhiteSpace(txt_Lastname.Text) ||
                string.IsNullOrWhiteSpace(txt_Email.Text))
            {
                MessageBox.Show("Minden mezőt ki kell tölteni!");
                return;
            }

            var result = MessageBox.Show("Biztosan törölni szeretné ezt a felhasználót?", "Felhasználó törlése", MessageBoxButton.YesNo, MessageBoxImage.Warning);
            if (result == MessageBoxResult.No)
            {
                return;
            }

            try
            {
                var httpClient = new HttpClient();
                var response = await httpClient.DeleteAsync($"https://localhost:7083/api/User/{txt_Id.Text}");

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Felhasználó sikeresen törölve!");
                    UserDeleted?.Invoke(this, EventArgs.Empty);
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Hiba történt a felhasználó törlése közben.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}");
            }
        }

        private async void Button_Click(object sender, RoutedEventArgs e)
        {

            if (string.IsNullOrWhiteSpace(txt_Firstnam.Text) ||
                string.IsNullOrWhiteSpace(txt_Lastname.Text) ||
                string.IsNullOrWhiteSpace(txt_Email.Text))
            {
                MessageBox.Show("Minden mezőt ki kell tölteni!");
                return;
            }

            var newUser = new
            {
                id = txt_Id.Text,
                firstName = txt_Firstnam.Text,
                lastName = txt_Lastname.Text,
                email = txt_Email.Text
            };

            try
            {

                var httpClient = new HttpClient();
                var jsonContent = JsonConvert.SerializeObject(newUser);
                var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                var response = await httpClient.PutAsync($"https://localhost:7083/api/User/{txt_Id.Text}", httpContent);


                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Felhasználó sikeresen frissítve!");
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Hiba történt a felhasználó frissítése közben.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}");
            }
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            txt_Id.Clear();
            txt_Firstnam.Clear();
            txt_Lastname.Clear();
            txt_Email.Clear();
        }
    }
}
