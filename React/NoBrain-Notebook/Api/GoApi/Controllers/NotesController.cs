using GoApi.Data;
using GoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe.BillingPortal;


namespace GoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly GoApiDbContext dbContext;
        public NotesController(GoApiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("GetAllNotes")]
        public async Task<ActionResult<List<NoteModel>>> GetAllNotes(string user)
        {
            return Ok(await dbContext.Notes.Where(e=> e.User == user).ToListAsync());
        }
        [HttpGet("GetNotesOfNode/{id:int}")]
        public async Task<ActionResult<NoteModel>> GetNotesOfNode(int id)
        {
            var node = await dbContext.Notes.FindAsync(id);
            if (node == null)
            {
                return BadRequest("Nodes not found");
            }
            return Ok(node);
        }
        [HttpPut("EditNote")]
        public async Task<ActionResult> EditNotes([FromBody] EditNotesDto dto)
        {
            var note = await dbContext.Notes.FindAsync(dto.Id);

            if (note == null)
            {
                return NotFound();
            }

            note.Note = dto.Notes;

            await dbContext.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("EditNoteName")]
        public async Task<ActionResult> EditNoteName([FromBody] EditNoteNameDto dto)
        {
            var note = await dbContext.Notes.FindAsync(dto.Id);

            if (note == null)
            {
                return NotFound();
            }

            note.Name = dto.Name;

            await dbContext.SaveChangesAsync();

            return Ok();
        }
        [HttpPost("CreateNewNote")]
        public async Task<ActionResult> CreateNote(CreateNoteJson noteData)
        {
            NoteModel note = new NoteModel() { Name = noteData.Name, Note = noteData.Note, Node = noteData.Node, User = noteData.User };
            await dbContext.Notes.AddAsync(note);
            dbContext.SaveChanges();
            return Ok(note.ID);
        }
        [HttpDelete("Delete/{id:int}")]
        public async Task<ActionResult<Node>> DeleteNote(int id)
        {
            var note = await dbContext.Notes.FindAsync(id);
            if (note == null)
            {
                return BadRequest("Note not found");
            }
            dbContext.Notes.Remove(note);
            await dbContext.SaveChangesAsync();

            await dbContext.Nodes.ToListAsync();
            return Ok();
        }
    }
}
