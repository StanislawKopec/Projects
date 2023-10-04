using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace GoApi.Models
{
    public class NoteModel
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        [AllowNull]
        public string Note { get; set; }
        public int Node{ get; set; }
        public string User { get; set; }
    }
}
