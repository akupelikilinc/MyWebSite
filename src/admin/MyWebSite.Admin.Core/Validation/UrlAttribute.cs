using System.ComponentModel.DataAnnotations;

namespace MyWebSite.Admin.Core.Validation
{
    public class UrlAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return ValidationResult.Success;
            }

            string url = value.ToString()!;
            if (Uri.TryCreate(url, UriKind.Absolute, out var uri) && 
                (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps))
            {
                return ValidationResult.Success;
            }

            return new ValidationResult("Please enter a valid URL starting with http:// or https://");
        }
    }
}