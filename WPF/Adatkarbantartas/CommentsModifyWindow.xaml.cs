using MySql.Data.MySqlClient;
using System;
using System.Windows;

namespace Adatkarbantartas
{
    public partial class CommentsModifyWindow : Window
    {
        private string connectionString = "Server=localhost;Port=3306;Database=auth;Uid=root;Pwd=;";
        private int commentId;

        public CommentsModifyWindow(int commentId, string userId, int productId, double ratings, string comments, DateTime reviewDate)
        {
            InitializeComponent();

            this.commentId = commentId;
            txtCommentId.Text = commentId.ToString();
            txtUserId.Text = userId;
            txtProductId.Text = productId.ToString();
            txtRatings.Text = ratings.ToString();
            txtComments.Text = comments;
            dpReviewDate.SelectedDate = reviewDate;
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            if (commentId <= 0)
            {
                MessageBox.Show("Nincs érvényes komment azonosító.");
                return;
            }

            if (string.IsNullOrWhiteSpace(txtUserId.Text) || string.IsNullOrWhiteSpace(txtProductId.Text) || string.IsNullOrWhiteSpace(txtRatings.Text) || string.IsNullOrWhiteSpace(txtComments.Text) || dpReviewDate.SelectedDate == null)
            {
                MessageBox.Show("Minden mező kitöltése kötelező.");
                return;
            }

            if (!double.TryParse(txtRatings.Text, out double ratings))
            {
                MessageBox.Show("Érvénytelen értékelés formátum.");
                return;
            }

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "UPDATE comments SET UserId = @UserId, ProductId = @ProductId, Ratings = @Ratings, Comments = @Comments, ReviewDate = @ReviewDate WHERE Id = @Id";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@UserId", txtUserId.Text);
                    command.Parameters.AddWithValue("@ProductId", int.Parse(txtProductId.Text));
                    command.Parameters.AddWithValue("@Ratings", ratings);
                    command.Parameters.AddWithValue("@Comments", txtComments.Text);
                    command.Parameters.AddWithValue("@ReviewDate", dpReviewDate.SelectedDate);
                    command.Parameters.AddWithValue("@Id", commentId);

                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show("A komment módosítása sikeresen megtörtént.");
                        DialogResult = true;
                    }
                    else
                    {
                        MessageBox.Show("A komment módosítása sikertelen.");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a komment módosítása közben: " + ex.Message);
            }
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (commentId <= 0)
            {
                MessageBox.Show("Nincs érvényes komment azonosító.");
                return;
            }

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "DELETE FROM comments WHERE Id = @Id";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@Id", commentId);

                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show("A komment törlése sikeresen megtörtént.");
                        DialogResult = true;
                    }
                    else
                    {
                        MessageBox.Show("A komment törlése sikertelen.");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a komment törlése közben: " + ex.Message);
            }

        }

        private void ClearButton_Click(object sender, RoutedEventArgs e)
        {

            txtUserId.Clear();
            txtProductId.Clear();
            txtRatings.Clear();
            txtComments.Clear();
            dpReviewDate.SelectedDate = null;
        }

    }
}
