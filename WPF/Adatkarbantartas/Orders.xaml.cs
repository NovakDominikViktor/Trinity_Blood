using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media.Imaging;

namespace Adatkarbantartas
{
    public partial class Orders : Window
    {
        private string connectionString = "Server=localhost;Port=3306;Database=auth;Uid=root;Pwd=;";

        public Orders()
        {
            InitializeComponent();
            LoadOrdersData();
        }

        public void LoadOrdersData()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM orders";

                MySqlCommand command = new MySqlCommand(query, connection);
                MySqlDataAdapter adapter = new MySqlDataAdapter(command);
                DataTable dataTable = new DataTable();

                try
                {
                    connection.Open();
                    adapter.Fill(dataTable);
                    dtg_Orders.ItemsSource = dataTable.DefaultView;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error: " + ex.Message);
                }
            }
        }

        private void AddOrder_MouseEnter(object sender, System.Windows.Input.MouseEventArgs e)
        {
            AddOrder.Source = new BitmapImage(new Uri("PlusActive.png", UriKind.Relative));
        }

        private void AddOrder_MouseLeave(object sender, System.Windows.Input.MouseEventArgs e)
        {
            AddOrder.Source = new BitmapImage(new Uri("Plus.png", UriKind.Relative));
        }

        private void AddOrder_MouseLeftButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {
            AddOrder addOrder = new AddOrder();
            addOrder.Show();
        }

        private void OrderDelete_MouseLeave(object sender, System.Windows.Input.MouseEventArgs e)
        {
            OrderDelete.Source = new BitmapImage(new Uri("Delete Trash.png", UriKind.Relative));
        }

        private void OrderDelete_MouseEnter(object sender, System.Windows.Input.MouseEventArgs e)
        {
            OrderDelete.Source = new BitmapImage(new Uri("Close.png", UriKind.Relative));
        }

        private void OrderDelete_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (dtg_Orders.SelectedItem == null)
            {
                MessageBox.Show("Nincs kiválasztott elem a törléshez.");
                return;
            }

            if (dtg_Orders.SelectedItem is DataRowView selectedRow)
            {
                int orderId = Convert.ToInt32(selectedRow["Id"]);

                try
                {
                    using (MySqlConnection connection = new MySqlConnection(connectionString))
                    {
                        connection.Open();
                        string query = "DELETE FROM orders WHERE Id = @OrderId";
                        MySqlCommand command = new MySqlCommand(query, connection);
                        command.Parameters.AddWithValue("@OrderId", orderId);

                        int rowsAffected = command.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            MessageBox.Show("A rendelés törlése sikeresen megtörtént.");
                            LoadOrdersData();
                        }
                        else
                        {
                            MessageBox.Show("A rendelés törlése sikertelen.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Hiba történt a rendelés törlése közben: " + ex.Message);
                }
            }
        }

    }
}
