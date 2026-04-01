using Backend.Data;
using Microsoft.EntityFrameworkCore;

// Build web app
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Enable controllers
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// Enable API docs

// Connect sqlite database
builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

// Allow frontend origins
builder.Services.AddCors(options =>
    options.AddPolicy("AllowREactApp",
    policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:3001",
                "http://localhost:5173",
                "https://white-dune-0a653bc03.1.azurestaticapps.net"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    }));

// Create app pipeline
var app = builder.Build();
// Configure the HTTP request pipeline.

// Apply cors policy
app.UseCors("AllowREactApp");

// Redirect to https
app.UseHttpsRedirection();

// Apply auth middleware
app.UseAuthorization();

// Map api routes
app.MapControllers();

// Start backend app
app.Run();
