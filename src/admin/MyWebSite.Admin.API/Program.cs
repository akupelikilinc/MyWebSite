using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.RateLimiting;
using MyWebSite.Admin.Infrastructure.Data;
using MyWebSite.Admin.Infrastructure.Configuration;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Add configuration
var adminConfig = builder.Configuration.GetSection("AdminUser").Get<AdminConfiguration>();
var youtubeConfig = builder.Configuration.GetSection("YouTube").Get<YouTubeConfiguration>();
builder.Services.AddSingleton(adminConfig);
builder.Services.AddSingleton(youtubeConfig);

// Add services to the container.
// Add rate limiting
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.User.Identity?.Name ?? httpContext.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 100,
                QueueLimit = 0,
                Window = TimeSpan.FromMinutes(1)
            }));
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Entity Framework
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    options.ConfigureWarnings(warnings => warnings.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning));
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseRateLimiter();
app.UseAuthorization();
app.MapControllers();

// Database migration
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated();
}

app.Run();
