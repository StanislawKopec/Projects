using GoApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContextPool<GoApiDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("Azure"))
);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policy =>
policy.WithOrigins("http://localhost:4200", "https://localhost:4200",
"https://tubular-melba-d74210.netlify.app", "http://localhost:3000", "https://animated-crumble-efb937.netlify.app", "https://grand-puffpuff-89c8de.netlify.app",
"https://localhost:7249")
.AllowAnyMethod()
.WithHeaders(HeaderNames.ContentType)
);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
