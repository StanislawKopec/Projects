using System.Diagnostics.CodeAnalysis;

namespace GoApi.Models
{
    public class CreateNoteJson
    {
        public string Name { get; set; }
        [AllowNull]
        public string Note { get; set; }
        public int NodeID { get; set; }
        public int UserID { get; set; }
    }
}
