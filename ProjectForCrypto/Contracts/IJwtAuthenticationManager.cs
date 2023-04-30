
using Data.Entities;
using System.Security.Claims;

namespace Contracts
{
    public interface IJwtAuthenticationManager
    {
        string GenerateToken(UserEntity user);
    }
}
