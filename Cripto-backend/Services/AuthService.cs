using Cripto.Repository;
using Criptografie.Models;
using Criptografie.Repository;

namespace Criptografie.Services
{
    public class AuthService
    {
        private readonly VulnerableUserRepository _vulnRepo;
        private readonly SecuredUserRepository securedRepo;

        public AuthService(VulnerableUserRepository vulnRepo, SecuredUserRepository securedrepo)
        {
            _vulnRepo = vulnRepo;
            securedRepo = securedrepo;
        }
        public async Task<User?> VulnerableLogin(LoginRequest dto)
        {
            var user = await _vulnRepo.GetUserAsync(dto.Username, dto.Password);
            return user;
        }
        public async Task<User?> SecuredLogin(LoginRequest dto)
        {
            var user = await securedRepo.GetUserSecuredAsync(dto.Username, dto.Password);
            return user;
        }

        public async Task<List<User>> GetUsersSecuredAsync()
        {
            return await securedRepo.GetUsersSecuredAsync();
        }
    }
}
