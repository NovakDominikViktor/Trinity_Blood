using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Order
{
    public int Id { get; set; }

    public string UserId { get; set; } = null!;

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public decimal TotalPrice { get; set; }

    public string OrderStatus { get; set; } = null!;

    public DateTime OrderDate { get; set; }

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string ZipCode { get; set; } = null!;
}
