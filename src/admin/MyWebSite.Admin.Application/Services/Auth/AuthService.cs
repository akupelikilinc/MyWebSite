using System;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using MyWebSite.Admin.Core.Entities;
using MyWebSite.Admin.Application.Models.Auth;

namespace MyWebSite.Admin.Application.Services.Auth
{
    public interface IAuthService
    {
        Task<TokenResponse> LoginAsync(LoginRequest request);
        Task<TokenResponse> RegisterAsync(RegisterRequest request);
    }

    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;

        public AuthService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public async Task<TokenResponse> LoginAsync(LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                throw new AuthenticationException("Invalid email or password");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            if (!result.Succeeded)
            {
                throw new AuthenticationException("Invalid email or password");
            }

            return _tokenService.GenerateToken(user);
        }

        public async Task<TokenResponse> RegisterAsync(RegisterRequest request)
        {
            var user = new User
            {
                UserName = request.Email,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Role = "User", // Default role
                IsActive = true
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new AuthenticationException($"Registration failed: {errors}");
            }

            return _tokenService.GenerateToken(user);
        }
    }

    public class AuthenticationException : Exception
    {
        public AuthenticationException(string message) : base(message) { }
    }
}