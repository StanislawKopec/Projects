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
        public async Task<ActionResult<List<Node>>> GetNodes(int userID)
        {
            return Ok(await dbContext.Nodes.Where(e=> e.UserID == userID).ToListAsync());
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
            Node node = new Node() { Name = nodeData.Name, NodeAbove = nodeData.NodeAbove, UserID = nodeData.UserID };
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
