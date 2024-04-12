using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public double Price { get; set; }

    public bool IsItInStock { get; set; }

    public int CategoryId { get; set; }

    public string PictureUrl { get; set; } = null!;

    public int StorageStock { get; set; }

    public DateTime PostedTime { get; set; }
    
    public virtual Category Category { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
