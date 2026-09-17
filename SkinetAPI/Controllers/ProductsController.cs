using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkinetAPI.RequestHelpers;
using SkinetCore.Entities;
using SkinetCore.Interfaces;
using SkinetCore.Specification;

namespace SkinetAPI.Controllers
{
  
    public class ProductsController(IGenericRepository<Product> repo) : BaseApiController
    {

        [HttpGet]
        //withoiut[ApiController] we need to specify [fromquery] string? sort for each string
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts([FromQuery]ProductSpecParams specParams)
        {
            var spec = new ProductFilterSortPaginationSpecification(specParams);
            return await CreatePagedResult(repo, spec, specParams.PageIndex, specParams.PageSize);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await repo.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            repo.Add(product);
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
            repo.Update(product);
            if (await repo.SaveChangesAsync())
            {
                return NoContent();

            }
            return BadRequest("Problem updating product");

        }
        private bool ProductExists(int id)
        {
            return repo.Exists(id);
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await repo.GetByIdAsync(id);
            if (product == null) { return NotFound(); }
            repo.Remove(product);
            if (await repo.SaveChangesAsync())
            {
                return NoContent();
            }
            return BadRequest("Problem deleting product");
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
        {
           var spec=new BrandListSpecification();
            var brands = await repo.ListAsync(spec);
            return Ok(brands);
        }
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
        {
            var spec = new TypelistSpecification();
            var types = await repo.ListAsync(spec);
            return Ok(types);

        }


    } 
}
