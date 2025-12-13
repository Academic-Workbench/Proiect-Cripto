using Criptografie.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Criptografie.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : Controller
    {
        public readonly UserRepository _userRepository;
        public RegisterController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Cripto.Models.RegisterRequest request)
        {
            if (request == null)
                return BadRequest("Request is null");

            await _userRepository.CreateUser(request);
            return Ok("User registered successfully.");
        }
    }
}
