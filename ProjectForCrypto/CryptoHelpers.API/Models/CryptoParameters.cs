namespace CryptoHelpers.API.Models
{
    public class CryptoParameters:QueryStringParameters
    {
        public CryptoParameters()
        {
            OrderBy = "cmcRank";
        }
    }
}
