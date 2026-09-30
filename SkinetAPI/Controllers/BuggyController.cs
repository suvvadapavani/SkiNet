using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkinetAPI.Dtos;
using SkinetAPI.Errors;
using SkinetCore.Entities;
using System.Diagnostics;
using System.Security.Claims;

namespace SkinetAPI.Controllers
{
   
    public class BuggyController : BaseApiController
    {
        [HttpGet("Unauthorized")]
        public IActionResult GetUnauthorized()
        {
            return Unauthorized(
                "You are not authorized"
               );
        }
        
        [HttpGet("BadRequest")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("Your request is invalid");
        }
        [HttpGet("Notfound")]
        public IActionResult GetNotFound()
        {
            return NotFound("The requested resource was not found");
        }
        [HttpGet("InternalError")]
        public IActionResult GetInternalError()
        {
            throw new Exception("This is a test exception");
        }
        [HttpPost("validationError")]
        public IActionResult GetValidationError(CreateProductDto product)
        {
            return Ok();
        }
        [Authorize]
        [HttpGet("secrete")]
        public IActionResult Getsecrete()
        {
            var name = User.FindFirst(ClaimTypes.Name)?.Value;//email 
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;//user id

            return Ok("hello " + name + " with Id:" + id);
        }

    }
}
