using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AspNetAngularTemplate.Models.Repositories
{
    public interface IFacilityRepository: IDisposable
    {
        Task AddAsync(Facility item);

        Task<IEnumerable<Facility>> GetAllAsync();

        Task<Facility> FindAsync(string id);

        Task UpdateAsync(Facility item);

        Task<Facility> RemoveAsync(string id);
    }
}