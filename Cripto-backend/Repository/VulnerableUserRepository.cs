using Criptografie.Data;
using Criptografie.Models;
using Microsoft.EntityFrameworkCore;

namespace Criptografie.Repository
{
    public class VulnerableUserRepository
    {
        private readonly ApplicationDbContext _context;
        public VulnerableUserRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<User?> GetUserAsync(string username, string password)
        {
            var query = $"SELECT * FROM Users WHERE Username = '{username}' and Password = '{password}'";

            return await _context.Users
                .FromSqlRaw(query)
                .FirstOrDefaultAsync();
        }
    }
}
