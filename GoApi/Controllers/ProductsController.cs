using GoApi.Data;
using GoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly GoApiDbContext dbContext;

        public ProductsController(GoApiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return Ok(await dbContext.Products.ToListAsync());
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<Product>>> GetProduct(int id)
        {
            var product = await dbContext.Products.FindAsync(id);
            if (product == null)
            {
                return BadRequest("Product not found");
            }
            return Ok(product);
        }
        [HttpGet("categories")]
        public async Task<ActionResult<List<ProductCategory>>> GetCategories()
        {
            return Ok(await dbContext.ProductCategories.ToListAsync());
        }
        [HttpGet]
        [Route("{category}")]
        public async Task<ActionResult<List<Product>>> GetItemsByCategory(string name)
        {
            var products = await dbContext.Products
                                     //.Include(p => p.category)
                                     .Where(p => p.category == name).ToListAsync();
            return products;
        }
    }
}
