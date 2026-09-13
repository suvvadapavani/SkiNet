using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkinetCore.Entities;
using SkinetCore.Interfaces;
using SkinetInfrastructure.Data;

namespace SkinetAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController(IProductRepository repo) : Controller
    {

        [HttpGet]
        //withoiut[ApiController] we need to specify [fromquery] string? sort for each string
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts(string? brand, string? type,string? sort)
        {
            return Ok(await repo.GetProductsAsync(brand, type, sort));    
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await repo.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            repo.AddProduct(product);
            if (await repo.SaveChangesAsync())
            {
                return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
            }
            return BadRequest("Failed to create product");
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, Product product)
        {
            if (product.Id != id || !ProductExists(id))
            {
                return BadRequest("Product");
            }
           repo.UpdateProduct(product);
            if(await repo.SaveChangesAsync())
            {
                return NoContent();

            }
            return BadRequest("Problem updating product");
           
        }
        private bool ProductExists(int id)
        {
            return repo.ProductExists(id);
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        { 
            var product = await repo.GetProductByIdAsync(id);
            if(product == null) { return NotFound(); }
            repo.DeleteProduct(product);
            if(await repo.SaveChangesAsync())
            {
                return NoContent();
            }
            return BadRequest("Problem deleting product");
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
        {
            return Ok(await repo.GetBrandsAsync());
        }
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
        {
            return Ok(await repo.GetTypesAsync());
        }


    }
}
