using Cripto.Models;
using Criptografie.Models;

namespace Criptografie.Repository
{
    public class UserRepository
    {
        private readonly Data.ApplicationDbContext _context;
        public UserRepository(Data.ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task CreateUser(RegisterRequest request)
        {
            var user = new User
            {
                Username = request.Name,
                Password = request.Parola,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Parola)
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
    }
}
