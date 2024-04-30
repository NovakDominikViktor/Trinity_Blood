using System;
using System.Data;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media.Imaging;
using MySql.Data.MySqlClient;

namespace Adatkarbantartas
{
    public partial class User : Window
    {
        private string connectionString = "Server=localhost;Port=3306;Database=auth;Uid=root;Pwd=;";

        public User()
        {
            InitializeComponent();
            LoadUserData();
        }

       

        private void Manage_Users(object sender, MouseButtonEventArgs e)
        {
            UserModule userModule = new UserModule();
            userModule.Show();
        }

        private void User_Role_Up(object sender, MouseButtonEventArgs e)
        {
            UserRoleUp userRoleUp = new UserRoleUp();
            userRoleUp.Show();
        }

        private void LoadUserData()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT u.Id AS UserId, u.FirstName, u.LastName, u.Email, GROUP_CONCAT(r.Name SEPARATOR ', ') AS Roles " +
                               "FROM aspnetusers u " +
                               "INNER JOIN aspnetuserroles ur ON u.Id = ur.UserId " +
                               "INNER JOIN aspnetroles r ON ur.RoleId = r.Id " +
                               "GROUP BY u.Id";

                MySqlCommand command = new MySqlCommand(query, connection);
                MySqlDataAdapter adapter = new MySqlDataAdapter(command);
                DataTable dataTable = new DataTable();

                try
                {
                    connection.Open();
                    adapter.Fill(dataTable);
                    dtg_User.ItemsSource = dataTable.DefaultView;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error: " + ex.Message);
                }
            }
        }

        private void dtg_User_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            if (dtg_User.SelectedItem != null)
            {
                DataRowView selectedRow = (DataRowView)dtg_User.SelectedItem;
                string userId = selectedRow["UserId"].ToString();
                string firstName = selectedRow["FirstName"].ToString();
                string lastName = selectedRow["LastName"].ToString();
                string email = selectedRow["Email"].ToString();

                ModifyUserWindow modifyUserWindow = new ModifyUserWindow(userId, firstName, lastName, email);
                modifyUserWindow.UserDeleted += ModifyUserWindow_UserDeleted;
                modifyUserWindow.ShowDialog();
            }
        }

        private void ModifyUserWindow_UserDeleted(object sender, EventArgs e)
        {
            LoadUserData();
        }

        private void Image_MouseEnter(object sender, MouseEventArgs e)
        {
            AddUser.Source = new BitmapImage(new Uri("Add Administrator.png", UriKind.Relative));
        }

        private void Image_MouseLeave(object sender, MouseEventArgs e)
        {
            AddUser.Source = new BitmapImage(new Uri("Add Role Administrator.png", UriKind.Relative));
        }

        private void RoleUpUser_MouseEnter(object sender, MouseEventArgs e)
        {
            RoleUpUser.Source = new BitmapImage(new Uri("Double Up.png", UriKind.Relative));
        }

        private void RoleUpUser_MouseLeave(object sender, MouseEventArgs e)
        {
            RoleUpUser.Source = new BitmapImage(new Uri("Role Up.png", UriKind.Relative));
        }
    }
}
