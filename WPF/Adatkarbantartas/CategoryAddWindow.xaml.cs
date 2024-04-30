using MySql.Data.MySqlClient;
using System;
using System.Windows;

namespace Adatkarbantartas
{
    public partial class CategoryAddWindow : Window
    {
        private string connectionString = "Server=localhost;Port=3306;Database=auth;Uid=root;Pwd=;";

        public CategoryAddWindow()
        {
            InitializeComponent();
        }

        private void Save_Button_Click(object sender, RoutedEventArgs e)
        {
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
                    string query = "INSERT INTO categories (Name) VALUES (@Name)";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@Name", txtCategoryName.Text);

                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show("A kategória hozzáadása sikeresen megtörtént.");        
                        ClearFields();

                        

                    }
                    else
                    {
                        MessageBox.Show("A kategória hozzáadása sikertelen.");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a kategória hozzáadása közben: " + ex.Message);
            }
        }

        private void Clear_Button_Click(object sender, RoutedEventArgs e)
        {
            ClearFields();
        }

        private void ClearFields()
        {
            txtCategoryName.Clear();
        }

        private void Window_Closed(object sender, EventArgs e)
        {
            if (DialogResult == true)
            {
                if (Owner is Categories categoriesWindow)
                {
                    categoriesWindow.LoadCategoriesData();
                }
            }
        }
    }
}
