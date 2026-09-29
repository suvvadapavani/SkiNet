using Microsoft.AspNetCore.Mvc;
using SkinetCore.Entities;
using SkinetCore.Interfaces;
using SkinetInfrastructure.Services;

namespace SkinetAPI.Controllers
{
    public class CartController(ICartService cartService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetCartById(string id)
        {
            var cart = await cartService.GetCartAsync(id);

            return Ok(cart ?? new ShoppingCart { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> UpdateCart(ShoppingCart cart)
        {
            var updatedCart = await cartService.SetCartAsync(cart);
            if (updatedCart == null) return BadRequest("Problem with cart");

            return Ok(updatedCart);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCart(string id)
        {
            var result = await cartService.DeleteCartAsync(id);
            if (!result) return BadRequest("Problem dleting cart");
            return Ok();
        }

    }
}
