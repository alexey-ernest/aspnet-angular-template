using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AspNetAngularTemplate.Exceptions;
using Microsoft.Data.Entity;

namespace AspNetAngularTemplate.Models.Repositories
{
    public class FacilityRepository : IFacilityRepository
    {
        private readonly ApplicationDbContext _db;

        public FacilityRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task AddAsync(Facility item)
        {
            item.Id = Guid.NewGuid().ToString();
            _db.Facilities.Add(item);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Facility>> GetAllAsync()
        {
            return await _db.Facilities.ToListAsync();
        }

        public async Task<Facility> FindAsync(string id)
        {
            return await _db.Facilities.FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task UpdateAsync(Facility item)
        {
            var original = await _db.Facilities.FirstOrDefaultAsync(f => f.Id == item.Id);
            if (original == null)
            {
                throw new NotFoundException($"Could not find facility {item.Id}");
            }

            original.Name = item.Name;
            await _db.SaveChangesAsync();
        }

        public async Task<Facility> RemoveAsync(string id)
        {
            var original = await _db.Facilities.FirstOrDefaultAsync(f => f.Id == id);
            if (original == null)
            {
                throw new NotFoundException($"Could not find facility {id}");
            }

            _db.Facilities.Remove(original);
            await _db.SaveChangesAsync();
            return original;
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}