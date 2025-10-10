using Microsoft.AspNetCore.Mvc;
using MyWebSite.Admin.Application.Models.Auth;
using MyWebSite.Admin.Application.Services.Auth;

namespace MyWebSite.Admin.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var response = await _authService.LoginAsync(request);
                
                // Set token in cookie
                Response.Cookies.Append("X-Access-Token", response.AccessToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.Now.AddMinutes(response.ExpiresIn)
                });

                return Ok(response);
            }
            catch (AuthenticationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var response = await _authService.RegisterAsync(request);
                
                // Set token in cookie
                Response.Cookies.Append("X-Access-Token", response.AccessToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.Now.AddMinutes(response.ExpiresIn)
                });

                return Ok(response);
            }
            catch (AuthenticationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("X-Access-Token");
            return Ok();
        }
    }
}