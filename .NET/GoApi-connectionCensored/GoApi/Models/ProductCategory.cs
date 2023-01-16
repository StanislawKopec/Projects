using System.ComponentModel.DataAnnotations;

namespace GoApi.Models
{
    public class ProductCategory
    {
        public int Id { get; set; }
        [Key]
        public string Name { get; set; }
    }
}
