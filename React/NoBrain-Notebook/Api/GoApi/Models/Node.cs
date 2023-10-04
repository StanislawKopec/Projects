using System.ComponentModel.DataAnnotations;

namespace GoApi.Models
{
    public class Node
    {
        [Key]
        public int ID { get; set; } 
        public string Name { get; set; }
        public string Notes { get; set; }
        public string NodeAbove { get; set; }
        public string User { get; set; }
    }
}
