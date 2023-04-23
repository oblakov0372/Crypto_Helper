using ApplicationService.DTOs;
using Data.Context;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApplicationService.implementations
{
    public class CoinManagementService
    {
        private readonly ProjectDBContext _context;
        public CoinManagementService()
        {
            _context = new ProjectDBContext();
        }
        //GetAll
        public async Task<List<CoinDto>> Get()
        {
            List<CoinDto> coinsDto = new List<CoinDto>();

            foreach (var item in await _context.Coins.ToListAsync())
            {
                coinsDto.Add(new CoinDto()
                {
                    Id = item.Id,
                    Price = item.Price,
                    Name = item.Name
                });
            }
            return coinsDto;
        }
        //GetByID
        public async Task<CoinDto> GetById(int id)
        {
            CoinEntity coin = await _context.Coins.Where(c => c.Id == id).FirstOrDefaultAsync();

            CoinDto coinDto = new CoinDto()
            {
                Id = coin.Id,
                Name = coin.Name,
                Price = coin.Price
            };
            return coinDto;
        }
        //Save
        public async Task<bool> Save(CoinDto coinDto)
        {
            var coin = new CoinEntity()
            {
                Id = coinDto.Id,
                Name = coinDto.Name,
                Price = coinDto.Price,
            };

            try
            {
                await _context.Coins.AddAsync(coin);
                await _context.SaveChangesAsync();
                return true;
            }
            catch 
            {
                return false;
            }
        }
        //Delete
        public async Task<bool> Delete(int id)
        {
            try
            {
                var coin = new CoinEntity() { Id = id };
                _context.Coins.Remove(coin);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
