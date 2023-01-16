using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models;

public class Product
{
    public int Id { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public string imageUrl { get; set; }
    public decimal price { get; set; }
    public string category { get; set; }

}