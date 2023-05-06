using Contracts;
using Data.Context;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class UserRepository : GenericRepository<UserEntity>, IUserRepository
    {
        private readonly ProjectDBContext _context;
        public UserRepository(ProjectDBContext context) : base(context)
        {
            _context = context;
        }
        public async Task<UserEntity> GetByEmailAndHashPassword(string email, string hashPassword)
        {
            return await _context.Users.Where(u => u.Email == email && u.PasswordHash == hashPassword).FirstOrDefaultAsync();
        }
    }
}
