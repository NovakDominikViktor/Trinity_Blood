using MySql.Data.MySqlClient;
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
    /// Interaction logic for ModifyProductWindow.xaml
    /// </summary>
    public partial class ModifyProductWindow : Window
    {
        private string connectionString = "Server=localhost;Port=3306;Database=auth;Uid=root;Pwd=;";

        private int productId;

        public ModifyProductWindow(int productId, string productName, string productDescription, double productPrice, bool isInStock, int categoryId, string pictureUrl, int storageStock)
        {
            InitializeComponent();

            this.productId = productId;
            txtProductId.Text = productId.ToString();
            txtProductName.Text = productName;
            txtProductDescription.Text = productDescription;
            txtProductPrice.Text = productPrice.ToString();
            chkIsInStock.IsChecked = isInStock;
            txtCategoryId.Text = categoryId.ToString();
            txtPictureUrl.Text = pictureUrl;
            txtStorageStock.Text = storageStock.ToString();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (productId <= 0)
            {
                MessageBox.Show("Nincs érvényes termékazonosító.");
                return;
            }

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
                    string query = "UPDATE products SET Name = @Name, Description = @Description, Price = @Price, IsItInStock = @IsItInStock, CategoryId = @CategoryId, PictureUrl = @PictureUrl, StorageStock = @StorageStock WHERE Id = @Id";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@Name", txtProductName.Text);
                    command.Parameters.AddWithValue("@Description", txtProductDescription.Text);
                    command.Parameters.AddWithValue("@Price", productPrice);
                    command.Parameters.AddWithValue("@IsItInStock", chkIsInStock.IsChecked);
                    command.Parameters.AddWithValue("@CategoryId", int.Parse(txtCategoryId.Text));
                    command.Parameters.AddWithValue("@PictureUrl", txtPictureUrl.Text);
                    command.Parameters.AddWithValue("@StorageStock", int.Parse(txtStorageStock.Text));
                    command.Parameters.AddWithValue("@Id", productId);

                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show("A termék módosítása sikeresen megtörtént.");
                        DialogResult = true;
                    }
                    else
                    {
                        MessageBox.Show("A termék módosítása sikertelen.");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a termék módosítása közben: " + ex.Message);
            }
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (productId <= 0)
            {
                MessageBox.Show("Nincs érvényes termékazonosító.");
                return;
            }

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "DELETE FROM products WHERE Id = @Id";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@Id", productId);

                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show("A termék törlése sikeresen megtörtént.");
                        DialogResult = true;
                    }
                    else
                    {
                        MessageBox.Show("A termék törlése sikertelen.");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a termék törlése közben: " + ex.Message);
            }
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            txtProductName.Clear();
            txtProductDescription.Clear();
            txtProductPrice.Clear();
            chkIsInStock.IsChecked = false;
            txtCategoryId.Clear();
            txtPictureUrl.Clear();
            txtStorageStock.Clear();
        }
    }
}
