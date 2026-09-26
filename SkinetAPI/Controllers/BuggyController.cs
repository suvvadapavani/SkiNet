using Microsoft.AspNetCore.Mvc;
using SkinetAPI.Dtos;
using SkinetAPI.Errors;
using SkinetCore.Entities;
using System.Diagnostics;

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

    }
}
