using System.Collections.Generic;
using System.Threading.Tasks;
using AspNetAngularTemplate.Filters;
using AspNetAngularTemplate.Models;
using AspNetAngularTemplate.Models.Repositories;
using AspNetAngularTemplate.ViewModels;
using AutoMapper;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AspNetAngularTemplate.Controllers.Api
{
    [Route("api/facilities/{fid}/[controller]")]
    public class AccessPointsController : Controller
    {
        private readonly IAccessPointRepository _accessPointRepository;
        private readonly IFacilityRepository _facilityRepository;
        private readonly IMapper _mapper;

        public AccessPointsController(IFacilityRepository facilityRepository,
            IAccessPointRepository accessPointRepository, IMapper mapper)
        {
            _facilityRepository = facilityRepository;
            _accessPointRepository = accessPointRepository;
            _mapper = mapper;
        }

        // GET: api/api/facilities/{fid}/accesspoints
        [HttpGet]
        public async Task<IActionResult> Get(string fid)
        {
            var facility = await _facilityRepository.FindAsync(fid);
            if (facility == null)
            {
                return HttpNotFound();
            }

            var accessPoints = await _accessPointRepository.GetAllAsync(fid);
            return new ObjectResult(_mapper.Map<List<AccessPointDto>>(accessPoints));
        }

        // GET api/facilities/{fid}/accesspoints/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string fid, string id)
        {
            var facility = await _facilityRepository.FindAsync(fid);
            if (facility == null)
            {
                return HttpNotFound();
            }

            var item = await _accessPointRepository.FindAsync(id);
            if (item == null)
            {
                return HttpNotFound();
            }

            return new ObjectResult(_mapper.Map<AccessPointDto>(item));
        }

        // POST api/facilities/{fid}/accesspoints
        [HttpPost]
        [ValidateModelState]
        public async Task<IActionResult> Post(string fid, [FromBody] AccessPointDto accessPoint)
        {
            var facility = await _facilityRepository.FindAsync(fid);
            if (facility == null)
            {
                return HttpNotFound();
            }

            await _accessPointRepository.AddAsync(new AccessPoint {Name = accessPoint.Name, Facility = facility});
            return Ok();
        }

        // PUT api/facilities/{fid}/accesspoints/5
        [HttpPut("{id}")]
        [ValidateModelState]
        public async Task<IActionResult> Put(string fid, string id, [FromBody] AccessPointDto accessPoint)
        {
            var facility = await _facilityRepository.FindAsync(fid);
            if (facility == null)
            {
                return HttpNotFound();
            }

            var item = await _accessPointRepository.FindAsync(id);
            if (item == null)
            {
                return HttpNotFound();
            }

            item.Name = accessPoint.Name;
            await _accessPointRepository.UpdateAsync(item);
            return Ok();
        }

        // DELETE api/facilities/{fid}/accesspoints/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string fid, string id)
        {
            var facility = await _facilityRepository.FindAsync(fid);
            if (facility == null)
            {
                return HttpNotFound();
            }

            var item = await _accessPointRepository.FindAsync(id);
            if (item == null)
            {
                return HttpNotFound();
            }

            await _accessPointRepository.RemoveAsync(id);
            return Ok();
        }
    }
}