using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CryptoHelpers.API.Controllers
{
    public abstract class BaseContoller:Controller
    {
        protected int GetUserId()
        {
            return Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
