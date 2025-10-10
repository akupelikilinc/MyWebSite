using System.Net.Http.Json;
using MyWebSite.Admin.Application.Models.Auth;

namespace MyWebSite.Admin.Web.Services
{
    public interface IAuthApiService
    {
        Task<TokenResponse> LoginAsync(LoginRequest request);
        Task<TokenResponse> RegisterAsync(RegisterRequest request);
        Task LogoutAsync();
    }

    public class AuthApiService : IAuthApiService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<AuthApiService> _logger;

        public AuthApiService(HttpClient httpClient, ILogger<AuthApiService> logger)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));

            // Configure base address
            _httpClient.BaseAddress = new Uri("http://localhost:5000/");
        }

        public async Task<TokenResponse> LoginAsync(LoginRequest request)
        {
            try
            {
                if (request == null) throw new ArgumentNullException(nameof(request));
                if (string.IsNullOrWhiteSpace(request.Email)) throw new ArgumentException("Email is required", nameof(request));
                if (string.IsNullOrWhiteSpace(request.Password)) throw new ArgumentException("Password is required", nameof(request));

                var response = await _httpClient.PostAsJsonAsync("api/auth/login", request);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadFromJsonAsync<ErrorResponse>();
                    _logger.LogWarning("Login failed: {ErrorMessage}", error?.Message);
                    throw new AuthenticationException(error?.Message ?? "Login failed");
                }

                var result = await response.Content.ReadFromJsonAsync<TokenResponse>();
                if (result == null) throw new InvalidOperationException("Invalid response from server");

                return result;
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Network error during login");
                throw new AuthenticationException("Could not connect to the authentication server. Please try again later.");
            }
            catch (Exception ex) when (ex is not AuthenticationException)
            {
                _logger.LogError(ex, "Unexpected error during login");
                throw new AuthenticationException("An unexpected error occurred. Please try again later.");
            }
        }

        public async Task<TokenResponse> RegisterAsync(RegisterRequest request)
        {
            try
            {
                if (request == null) throw new ArgumentNullException(nameof(request));
                if (string.IsNullOrWhiteSpace(request.Email)) throw new ArgumentException("Email is required", nameof(request));
                if (string.IsNullOrWhiteSpace(request.Password)) throw new ArgumentException("Password is required", nameof(request));
                if (string.IsNullOrWhiteSpace(request.FirstName)) throw new ArgumentException("First name is required", nameof(request));
                if (string.IsNullOrWhiteSpace(request.LastName)) throw new ArgumentException("Last name is required", nameof(request));

                var response = await _httpClient.PostAsJsonAsync("api/auth/register", request);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadFromJsonAsync<ErrorResponse>();
                    _logger.LogWarning("Registration failed: {ErrorMessage}", error?.Message);
                    throw new AuthenticationException(error?.Message ?? "Registration failed");
                }

                var result = await response.Content.ReadFromJsonAsync<TokenResponse>();
                if (result == null) throw new InvalidOperationException("Invalid response from server");

                return result;
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Network error during registration");
                throw new AuthenticationException("Could not connect to the authentication server. Please try again later.");
            }
            catch (Exception ex) when (ex is not AuthenticationException)
            {
                _logger.LogError(ex, "Unexpected error during registration");
                throw new AuthenticationException("An unexpected error occurred. Please try again later.");
            }
        }

        public async Task LogoutAsync()
        {
            try
            {
                await _httpClient.PostAsync("api/auth/logout", null);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during logout");
                // Don't throw on logout errors
            }
        }
    }

    public class ErrorResponse
    {
        public string Message { get; set; }
    }

    public class AuthenticationException : Exception
    {
        public AuthenticationException(string message) : base(message) { }
        public AuthenticationException(string message, Exception innerException) : base(message, innerException) { }
    }
}