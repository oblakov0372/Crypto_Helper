using Data.Entities;

namespace Contracts
{
    public interface IUserRepository:IGenericRepository<UserEntity>
    {
        Task<UserEntity> GetByEmailAndHashPassword(string email,string hashPassword);
    }
}
