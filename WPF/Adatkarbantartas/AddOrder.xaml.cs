using MySql.Data.MySqlClient;
using System;
using System.Windows;

namespace Adatkarbantartas
{
    public partial class AddOrder : Window
    {
        private string connectionString = "Server=localhost;Port=3306;Database=auth;Uid=root;Pwd=;";

        public AddOrder()
        {
            InitializeComponent();
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtUserId.Text) || string.IsNullOrWhiteSpace(txtProductId.Text) || string.IsNullOrWhiteSpace(txtQuantity.Text) || string.IsNullOrWhiteSpace(txtTotalPrice.Text) || string.IsNullOrWhiteSpace(txtOrderStatus.Text) || dpOrderDate.SelectedDate == null || string.IsNullOrWhiteSpace(txtAddress.Text) || string.IsNullOrWhiteSpace(txtCity.Text) || string.IsNullOrWhiteSpace(txtPhoneNumber.Text) || string.IsNullOrWhiteSpace(txtZipCode.Text))
            {
                MessageBox.Show("Minden mező kitöltése kötelező.");
                return;
            }

            if (!int.TryParse(txtQuantity.Text, out int quantity))
            {
                MessageBox.Show("Érvénytelen mennyiség formátum.");
                return;
            }

            if (!decimal.TryParse(txtTotalPrice.Text, out decimal totalPrice))
            {
                MessageBox.Show("Érvénytelen összeg formátum.");
                return;
            }

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "INSERT INTO orders (UserId, ProductId, Quantity, TotalPrice, OrderStatus, OrderDate, Address, City, PhoneNumber, ZipCode) VALUES (@UserId, @ProductId, @Quantity, @TotalPrice, @OrderStatus, @OrderDate, @Address, @City, @PhoneNumber, @ZipCode)";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@UserId", txtUserId.Text);
                    command.Parameters.AddWithValue("@ProductId", int.Parse(txtProductId.Text));
                    command.Parameters.AddWithValue("@Quantity", quantity);
                    command.Parameters.AddWithValue("@TotalPrice", totalPrice);
                    command.Parameters.AddWithValue("@OrderStatus", txtOrderStatus.Text);
                    command.Parameters.AddWithValue("@OrderDate", dpOrderDate.SelectedDate);
                    command.Parameters.AddWithValue("@Address", txtAddress.Text);
                    command.Parameters.AddWithValue("@City", txtCity.Text);
                    command.Parameters.AddWithValue("@PhoneNumber", txtPhoneNumber.Text);
                    command.Parameters.AddWithValue("@ZipCode", txtZipCode.Text);

                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show("Az új rendelés mentése sikeresen megtörtént.");
                        DialogResult = true;
                    }
                    else
                    {
                        MessageBox.Show("Az új rendelés mentése sikertelen.");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt az új rendelés mentése közben: " + ex.Message);
            }
        }

        private void ClearButton_Click(object sender, RoutedEventArgs e)
        {
            txtUserId.Clear();
            txtProductId.Clear();
            txtQuantity.Clear();
            txtTotalPrice.Clear();
            txtOrderStatus.Clear();
            dpOrderDate.SelectedDate = null;
            txtAddress.Clear();
            txtCity.Clear();
            txtPhoneNumber.Clear();
            txtZipCode.Clear();
        }
    }
}
