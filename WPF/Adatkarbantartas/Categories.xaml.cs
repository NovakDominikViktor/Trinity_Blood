using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media.Imaging;

namespace Adatkarbantartas
{
    public partial class Categories : Window
    {
        private string connectionString = "Server=localhost;Port=3306;Database=auth;Uid=root;Pwd=;";

        public Categories()
        {
            InitializeComponent();
            LoadCategoriesData();
        }

        public void LoadCategoriesData()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM categories";

                MySqlCommand command = new MySqlCommand(query, connection);
                MySqlDataAdapter adapter = new MySqlDataAdapter(command);
                DataTable dataTable = new DataTable();

                try
                {
                    connection.Open();
                    adapter.Fill(dataTable);
                    dtg_Categories.ItemsSource = dataTable.DefaultView;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error: " + ex.Message);
                }
            }
        }

        private void CategoryAdd_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            CategoryAddWindow categoryAddWindow = new CategoryAddWindow();
            categoryAddWindow.Show();
        }

        private void CategoryAdd_MouseLeave(object sender, MouseEventArgs e)
        {
            CategoryAdd.Source = new BitmapImage(new Uri("Plus.png", UriKind.Relative));
        }

        private void CategoryAdd_MouseEnter(object sender, MouseEventArgs e)
        {
            CategoryAdd.Source = new BitmapImage(new Uri("PlusActive.png", UriKind.Relative));
        }

        private void dtg_Categories_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            if (dtg_Categories.SelectedItem != null)
            {
                DataRowView selectedRow = (DataRowView)dtg_Categories.SelectedItem;

                int categoryId = Convert.ToInt32(selectedRow["Id"]);
                string categoryName = selectedRow["Name"].ToString();

                CategoryModifyWindow categoryModifyWindow = new CategoryModifyWindow(categoryId, categoryName);
                categoryModifyWindow.Owner = this;
                categoryModifyWindow.ShowDialog();
            }
        }

    }
}
