using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
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
            CheckShowPassword.Checked += (s, e) => TogglePasswordVisibility(true);
            CheckShowPassword.Unchecked += (s, e) => TogglePasswordVisibility(false);
            PasswordBox.PasswordChanged += (s, e) => PasswordLogin.Text = PasswordBox.Password;
            this.Closing += LoginWindow_Closing;
        }

        private void LoginWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            MessageBoxResult result = MessageBox.Show("Are you sure you want to close the application?", "Confirmation", MessageBoxButton.YesNo);
            if (result == MessageBoxResult.No)
            {
                e.Cancel = true;
            }
        }

        private void TogglePasswordVisibility(bool showPassword)
        {
            if (showPassword)
            {
                PasswordLogin.Visibility = Visibility.Visible;
                PasswordBox.Visibility = Visibility.Collapsed;
                PasswordLogin.Text = PasswordBox.Password;
            }
            else
            {
                PasswordLogin.Visibility = Visibility.Collapsed;
                PasswordBox.Visibility = Visibility.Visible;
            }
        }

        private void ClearLabel_PreviewMouseDown(object sender, MouseButtonEventArgs e)
        {
            PasswordBox.Clear();
            PasswordLogin.Clear();
            EmailLogin.Clear();
        }

        public class User
        {
            public string Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
        }

        public class TokenResponse
        {
            public User User { get; set; }
            public string Token { get; set; }
        }

        private async Task Button_Click_Async(object sender, RoutedEventArgs e)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://localhost:7083");

            var loginData = new
            {
               email = EmailLogin.Text,
               password = PasswordLogin.Text 
            };

            var json = JsonConvert.SerializeObject(loginData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PostAsync("/api/Auth/login", content);

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();

                var tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(responseBody);

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(tokenResponse.Token);

          
                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadJwtToken(tokenResponse.Token);
                var roleClaims = jwtToken.Claims.Where(claim => claim.Type == "role").Select(claim => claim.Value);

                if (roleClaims.Contains("ADMIN"))
                {
                    MessageBox.Show($"Hello there, {tokenResponse.User.FirstName} {tokenResponse.User.LastName}");
                }
                else
                {
                    MessageBox.Show("Sorry, you're not an admin, please leave.");
                }
            }
            else
            {
                MessageBox.Show($"The login request was not successful. Status code: {response.StatusCode}. Response body: {await response.Content.ReadAsStringAsync()}");
                MessageBox.Show("The login request was not successful. Please check your email and/or password.");
            }


        }

        private async void Button_Click(object sender, RoutedEventArgs e)
        {
            Button_Click_Async(sender, e);
        }
    }
}
