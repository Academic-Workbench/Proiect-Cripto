using Criptografie.Data;
using Criptografie.Models;
using Microsoft.EntityFrameworkCore;

namespace Cripto.Repository
{
    public class SecuredUserRepository
    {
        private readonly ApplicationDbContext _context;
        public SecuredUserRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<User?> GetUserSecuredAsync(string username, string password)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
                return null;
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isPasswordValid)
                return null;
            return user;
        }
        public async Task<List<User>> GetUsersSecuredAsync()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
