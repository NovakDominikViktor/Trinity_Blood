namespace backend.Models
{
    public class Products
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public bool IsItInStock { get; set; }

        public int CategoryId { get; set; }

        public string PictureUrl { get; set; }

        public int StrogeStock {  get; set; }

        public Category Category { get; set; }
    }
}
