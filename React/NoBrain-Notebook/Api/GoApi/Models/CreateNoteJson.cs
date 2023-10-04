using System.Diagnostics.CodeAnalysis;

namespace GoApi.Models
{
    public class CreateNoteJson
    {
        public string Name { get; set; }
        [AllowNull]
        public string Note { get; set; }
        public int Node { get; set; }
        public string User { get; set; }
    }
}
