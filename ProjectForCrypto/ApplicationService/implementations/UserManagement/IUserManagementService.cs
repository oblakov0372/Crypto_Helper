using ApplicationService.Models.UserModels;

namespace ApplicationService.implementations.UserManagement
{
    public interface IUserManagementService
    {
        Task<bool> Registration(RegistrationModel registrationModel);
        Task<string> Authorization(AuthenticateModel authorizationModel);
    }
}
