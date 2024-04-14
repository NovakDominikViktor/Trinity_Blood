namespace backend.Models.Dtos
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public double Ratings { get; set; }
        public string Comments { get; set; }
        public DateTime ReviewDate { get; set; }
    }

}
