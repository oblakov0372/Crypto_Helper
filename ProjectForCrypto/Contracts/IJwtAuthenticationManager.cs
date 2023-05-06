using Data.Entities;

namespace Contracts
{
    public interface IJwtAuthenticationManager
    {
        string GenerateToken(UserEntity user);
    }
}
