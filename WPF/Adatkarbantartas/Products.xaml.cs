using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media.Imaging;

namespace Adatkarbantartas
{
    public partial class Products : Window
    {
        private string connectionString = "Server=localhost;Port=3306;Database=auth;Uid=root;Pwd=;";

        public Products()
        {
            InitializeComponent();
            LoadProductsData();
        }

        public void LoadProductsData()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM products";

                MySqlCommand command = new MySqlCommand(query, connection);
                MySqlDataAdapter adapter = new MySqlDataAdapter(command);
                DataTable dataTable = new DataTable();

                try
                {
                    connection.Open();
                    adapter.Fill(dataTable);
                    dtg_Products.ItemsSource = dataTable.DefaultView;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error: " + ex.Message);
                }
            }
        }

        private void dtgProducts_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            if (dtg_Products.SelectedItem != null)
            {
                DataRowView selectedRow = (DataRowView)dtg_Products.SelectedItem;

                int productId = Convert.ToInt32(selectedRow["Id"]);
                string productName = selectedRow["Name"].ToString();
                string productDescription = selectedRow["Description"].ToString();
                double productPrice = Convert.ToDouble(selectedRow["Price"]);
                bool isInStock = Convert.ToBoolean(selectedRow["IsItInStock"]);
                int categoryId = Convert.ToInt32(selectedRow["CategoryId"]);
                string pictureUrl = selectedRow["PictureUrl"].ToString();
                int storageStock = Convert.ToInt32(selectedRow["StorageStock"]);
                

                ModifyProductWindow modifyProductWindow = new ModifyProductWindow(productId, productName, productDescription, productPrice, isInStock, categoryId, pictureUrl, storageStock);
                if (modifyProductWindow.ShowDialog() == true)
                {
                    LoadProductsData();
                }
            }
        }

        private void ProductAdd_MouseLeave(object sender, MouseEventArgs e)
        {
            ProductAdd.Source = new BitmapImage(new Uri("Plus.png", UriKind.Relative));
        }

        private void ProductAdd_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            ProductAddWindow productAdd = new ProductAddWindow();
            productAdd.Show();
        }

        private void ProductAdd_MouseEnter(object sender, MouseEventArgs e)
        {
            ProductAdd.Source = new BitmapImage(new Uri("PlusActive.png", UriKind.Relative));
        }
    }
}
