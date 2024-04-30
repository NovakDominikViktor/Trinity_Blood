using MySql.Data.MySqlClient;
using System;
using System.Windows;

namespace Adatkarbantartas
{
    public partial class ProductAddWindow : Window
    {
        private string connectionString = "Server=localhost;Port=3306;Database=auth;Uid=root;Pwd=;";

        public ProductAddWindow()
        {
            InitializeComponent();
        }

        private void Save_Button_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtProductName.Text) || !double.TryParse(txtProductPrice.Text, out double productPrice))
            {
                MessageBox.Show("A terméknév és ár megadása kötelező.");
                return;
            }

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "INSERT INTO products (Name, Description, Price, IsItInStock, CategoryId, PictureUrl, StorageStock) VALUES (@Name, @Description, @Price, @IsItInStock, @CategoryId, @PictureUrl, @StorageStock)";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@Name", txtProductName.Text);
                    command.Parameters.AddWithValue("@Description", txtProductDescription.Text);
                    command.Parameters.AddWithValue("@Price", productPrice);
                    command.Parameters.AddWithValue("@IsItInStock", chkIsInStock.IsChecked);
                    command.Parameters.AddWithValue("@CategoryId", int.Parse(txtCategoryId.Text));
                    command.Parameters.AddWithValue("@PictureUrl", txtPictureUrl.Text);
                    command.Parameters.AddWithValue("@StorageStock", int.Parse(txtStorageStock.Text));

                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show("A termék hozzáadása sikeresen megtörtént.");
                        ClearFields();
                    }
                    else
                    {
                        MessageBox.Show("A termék hozzáadása sikertelen.");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a termék hozzáadása közben: " + ex.Message);
            }
        }

        private void Clear_Button_Click(object sender, RoutedEventArgs e)
        {
            ClearFields();
        }

        private void ClearFields()
        {
            txtProductName.Clear();
            txtProductDescription.Clear();
            txtProductPrice.Clear();
            chkIsInStock.IsChecked = false;
            txtCategoryId.Clear();
            txtPictureUrl.Clear();
            txtStorageStock.Clear();
        }

        private void Window_Closed(object sender, System.EventArgs e)
        {
            
            if (DialogResult == true)
            {
                if (Owner is Products productsWindow)
                {
                    productsWindow.LoadProductsData();
                }
            }
        }
    }
}
