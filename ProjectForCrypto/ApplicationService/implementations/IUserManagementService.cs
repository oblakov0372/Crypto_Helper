
using ApplicationService.Models.UserModels;
using Data.Entities;

namespace ApplicationService.implementations
{
    public interface IUserManagementService
    {
        Task<bool> Registration(RegistrationModel registrationModel);
        Task<string> Authorization(AuthenticateModel authorizationModel);
    }
}
