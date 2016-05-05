using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AspNetAngularTemplate.Models.Repositories
{
    public interface IAccessPointRepository : IDisposable
    {
        Task AddAsync(AccessPoint item);

        Task<IEnumerable<AccessPoint>> GetAllAsync(string facilityId);

        Task<AccessPoint> FindAsync(string id);

        Task UpdateAsync(AccessPoint item);

        Task<AccessPoint> RemoveAsync(string id);
    }
}