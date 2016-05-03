using System.Collections.Generic;
using System.Threading.Tasks;
using AspNetAngularTemplate.Exceptions;
using Microsoft.Data.Entity;

namespace AspNetAngularTemplate.Models.Repositories
{
    public class AccessPointRepository : IAccessPointRepository
    {
        private readonly ApplicationDbContext _db;

        public AccessPointRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task AddAsync(AccessPoint item)
        {
            _db.AccessPoints.Add(item);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<AccessPoint>> GetAllAsync()
        {
            return await _db.AccessPoints.ToListAsync();
        }

        public async Task<AccessPoint> FindAsync(string id)
        {
            return await _db.AccessPoints.FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task UpdateAsync(AccessPoint item)
        {
            var original = await _db.AccessPoints.FirstOrDefaultAsync(f => f.Id == item.Id);
            if (original == null)
            {
                throw new NotFoundException($"Could not find acccess point {item.Id}");
            }

            original.Name = item.Name;
            await _db.SaveChangesAsync();
        }

        public async Task<AccessPoint> RemoveAsync(string id)
        {
            var original = await _db.AccessPoints.FirstOrDefaultAsync(f => f.Id == id);
            if (original == null)
            {
                throw new NotFoundException($"Could not find access point {id}");
            }

            _db.AccessPoints.Remove(original);
            await _db.SaveChangesAsync();
            return original;
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}