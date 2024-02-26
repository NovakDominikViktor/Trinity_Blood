using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public string OrderStatus { get; set; }

        public DateTime OrderDate { get; set; }
        
        //public ApplicationUser User { get; set; }
        
        //public Products Product { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string ZipCode { get; set; }

        public string PhoneNumber { get; set; }
    }

}
