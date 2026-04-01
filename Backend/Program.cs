using Backend.Data;
using Microsoft.EntityFrameworkCore;

// Build web app
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Enable controllers
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// Enable API docs
builder.Services.AddOpenApi();

// Configure database connection
builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("WaterConnection")));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowREactApp",
    policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    }));

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Map docs endpoint
    app.MapOpenApi();
}

// Allow local frontend
app.UseCors("AllowREactApp");

// Redirect to HTTPS
app.UseHttpsRedirection();

// Apply authorization middleware
app.UseAuthorization();

// Map controller routes
app.MapControllers();

// Start backend app
app.Run();
