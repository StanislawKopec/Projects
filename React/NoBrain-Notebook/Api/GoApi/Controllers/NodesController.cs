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
    public class NodesController : ControllerBase
    {
        private readonly GoApiDbContext dbContext;

        public NodesController(GoApiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet("GetNodes")]
        public async Task<ActionResult<List<Node>>> GetNodes(string user)
        {
            return Ok(await dbContext.Nodes.Where(e=> e.User == user).ToListAsync());
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Node>> GetNode(int id)
        {
            var node = await dbContext.Nodes.FindAsync(id);
            if (node == null)
            {
                return BadRequest("Nodes not found");
            }
            return Ok(node);
        }
        [HttpPost("CreateNode")]
        public async Task<ActionResult> CreateNode(CreateNodeJson nodeData)
        {
            Node node = new Node() { Name = nodeData.Name, Notes = nodeData.Notes, NodeAbove = nodeData.NodeAbove, User = nodeData.User };
            await dbContext.Nodes.AddAsync(node);
            dbContext.SaveChanges();
            return Ok();
        }
        [HttpPut("EditNodeName")]
        public async Task<ActionResult> EditNodeName([FromBody] EditNodeNameDto dto)
        {
            var existingNode = await dbContext.Nodes.FindAsync(dto.Id);

            if (existingNode == null)
            {
                return NotFound();
            }

            existingNode.Name = dto.Name;

            await dbContext.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("CreateNewNote")]
        public async Task<ActionResult> CreateNewNote([FromBody] CreateNewNoteDto dto)
        {
            var existingNode = await dbContext.Nodes.FindAsync(dto.NodeId);

            if (existingNode == null)
            {
                return NotFound();
            }

            existingNode.Notes = existingNode.Notes + "," +dto.NoteId;

            await dbContext.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("DeleteNote")]
        public async Task<ActionResult> DeleteNote([FromBody] CreateNewNoteDto dto)
        {
            var existingNode = await dbContext.Nodes.FindAsync(dto.NodeId);

            if (existingNode == null)
            {
                return NotFound();
            }

            string[] NotesIds = existingNode.Notes.Split(',');
            int[] numbers = new int[NotesIds.Length];

            for (int i = 0; i < NotesIds.Length; i++)
            {
                if (int.TryParse(NotesIds[i].Trim(), out int parsedNumber))
                {
                    numbers[i] = parsedNumber;
                }
            }

            int indexToDelete = Array.FindIndex(numbers, num => num == dto.NoteId);

            if (indexToDelete != -1)
            {
                // If the number was found, remove it by copying the rest of the array
                Array.Copy(numbers, indexToDelete + 1, numbers, indexToDelete, numbers.Length - indexToDelete - 1);
                Array.Resize(ref numbers, numbers.Length - 1);
            }
            else
            {
                return BadRequest();
            }
            existingNode.Notes = "";

            for(int i =0; i < numbers.Length; i++)
            {
                if (i + 1 != numbers.Length)
                {
                    existingNode.Notes += numbers[i] + ",";
                }
                else // last index
                {
                    existingNode.Notes += numbers[i];
                }
            }

            await dbContext.SaveChangesAsync();

            return Ok(existingNode.Notes);
        }
        [HttpDelete("Delete/{id:int}")]
        public async Task<ActionResult<Node>> DeleteNode(int id)
        {
            var node = await dbContext.Nodes.FindAsync(id);
            if (node == null)
            {
                return BadRequest("Nodes not found");
            }
            dbContext.Nodes.Remove(node);
            await dbContext.SaveChangesAsync();
            return Ok(node);
        }
 
    }
}
