using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public int NodeID{ get; set; }
        public int UserID { get; set; }
    }
}
