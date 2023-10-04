using System.ComponentModel.DataAnnotations;

namespace GoApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string salt { get; set; }
    }
}
