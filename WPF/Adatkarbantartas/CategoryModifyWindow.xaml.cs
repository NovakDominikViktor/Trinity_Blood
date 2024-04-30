using MySql.Data.MySqlClient;
using System;
using System.Windows;

namespace Adatkarbantartas
{
    public partial class CategoryModifyWindow : Window
    {
        private string connectionString = "Server=localhost;Port=3306;Database=auth;Uid=root;Pwd=;";
        private int categoryId;

        public CategoryModifyWindow(int categoryId, string categoryName)
        {
            InitializeComponent();

            this.categoryId = categoryId;
            txtCategoryId.Text = categoryId.ToString();
            txtCategoryName.Text = categoryName;
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            if (categoryId <= 0)
            {
                MessageBox.Show("Nincs érvényes kategória azonosító.");
                return;
            }

            if (string.IsNullOrWhiteSpace(txtCategoryName.Text))
            {
                MessageBox.Show("A kategória nevének megadása kötelező.");
                return;
            }

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "UPDATE categories SET Name = @Name WHERE Id = @Id";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@Name", txtCategoryName.Text);
                    command.Parameters.AddWithValue("@Id", categoryId);

                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show("A kategória módosítása sikeresen megtörtént.");
                        DialogResult = true;
                    }
                    else
                    {
                        MessageBox.Show("A kategória módosítása sikertelen.");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a kategória módosítása közben: " + ex.Message);
            }
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (categoryId <= 0)
            {
                MessageBox.Show("Nincs érvényes kategória azonosító.");
                return;
            }

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "DELETE FROM categories WHERE Id = @Id";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@Id", categoryId);

                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show("A kategória törlése sikeresen megtörtént.");
                        DialogResult = true;
                    }
                    else
                    {
                        MessageBox.Show("A kategória törlése sikertelen.");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a kategória törlése közben: " + ex.Message);
            }
        }
    }
}
