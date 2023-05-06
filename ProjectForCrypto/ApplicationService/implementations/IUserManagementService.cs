using ApplicationService.Models.UserModels;

namespace ApplicationService.implementations
{
    public interface IUserManagementService
    {
        Task<bool> Registration(RegistrationModel registrationModel);
        Task<string> Authorization(AuthenticateModel authorizationModel);
    }
}
