namespace backend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public int Ratings { get; set; }
        public string Comments { get; set; }
        public DateTime ReviewDate { get; set; } 

        //public ApplicationUser User { get; set; }
        //public Products Product { get; set; }
    }

}
