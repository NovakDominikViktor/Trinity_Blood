using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models;

public partial class Comment
{
    public int Id { get; set; }

    public string UserId { get; set; } = null!;

    public int ProductId { get; set; }

    public double Ratings { get; set; }

    public string Comments { get; set; } = null!;

    public DateTime ReviewDate { get; set; }
    
    public virtual Product Product { get; set; } = null!;
    
    public virtual Aspnetuser User { get; set; } = null!;
}
