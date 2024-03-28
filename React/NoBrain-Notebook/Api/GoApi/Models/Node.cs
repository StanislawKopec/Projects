using System.ComponentModel.DataAnnotations;

namespace GoApi.Models
{
    public class Node
    {
        [Key]
        public int ID { get; set; } 
        public string Name { get; set; }
        public int NodeAbove { get; set; }
        public int UserID { get; set; }
    }
}
