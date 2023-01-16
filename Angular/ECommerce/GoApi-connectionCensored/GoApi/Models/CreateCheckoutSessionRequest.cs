using System.ComponentModel.DataAnnotations;

namespace GoApi.Models
{
    public class CreateCheckoutSessionRequest
    {
        public int Id { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }
   
    }
}
