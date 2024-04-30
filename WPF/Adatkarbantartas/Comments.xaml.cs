using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Windows;
using System.Windows.Input;

namespace Adatkarbantartas
{
    public partial class Comments : Window
    {
        private string connectionString = "Server=localhost;Port=3306;Database=auth;Uid=root;Pwd=;";

        public Comments()
        {
            InitializeComponent();
            LoadCommentsData();
        }

        public void LoadCommentsData()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM comments";

                MySqlCommand command = new MySqlCommand(query, connection);
                MySqlDataAdapter adapter = new MySqlDataAdapter(command);
                DataTable dataTable = new DataTable();

                try
                {
                    connection.Open();
                    adapter.Fill(dataTable);
                    dtg_Comments.ItemsSource = dataTable.DefaultView;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error: " + ex.Message);
                }
            }
        }

        private void dtg_Comments_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            if (dtg_Comments.SelectedItem != null)
            {
                DataRowView row = dtg_Comments.SelectedItem as DataRowView;
                int commentId = Convert.ToInt32(row["Id"]);
                string userId = row["UserId"].ToString();
                int productId = Convert.ToInt32(row["ProductId"]);
                double ratings = Convert.ToDouble(row["Ratings"]);
                string comments = row["Comments"].ToString();
                DateTime reviewDate = Convert.ToDateTime(row["ReviewDate"]);

                CommentsModifyWindow commentsModifyWindow = new CommentsModifyWindow(commentId, userId, productId, ratings, comments, reviewDate);
                commentsModifyWindow.Show();
            }
        }
    }
}
