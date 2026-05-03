
using Cripto.Repository;
using Cripto.Services;
using Criptografie.Data;
using Criptografie.Repository;
using Criptografie.Services;
using Microsoft.EntityFrameworkCore;

namespace Criptografie
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            ConfigureServices(builder.Services);


            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("AllowFrontend");

            app.MapControllers();

            app.Run();
        }
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite("Data Source = criptografie.db"));
            services.AddScoped<UserRepository>();
            services.AddScoped<VulnerableUserRepository>();
            services.AddScoped<SecuredUserRepository>();
            services.AddScoped<AuthService>();
            services.AddSingleton<EmailService>();
            services.AddScoped<LoginAttemptService>();

            services.AddMemoryCache();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    builder =>
                    {
                        builder.
                            WithOrigins("http://localhost:5173")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

        }
    }
}
