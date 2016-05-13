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
    [Route("api/[controller]")]
    public class FacilitiesController : Controller
    {
        private readonly IFacilityRepository _repository;
        private readonly IMapper _mapper;

        public FacilitiesController(IFacilityRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/facilities
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var items = await _repository.GetAllAsync();
            return new ObjectResult(_mapper.Map<List<FacilityDto>>(items));
        }

        // GET api/facilities/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var item = await _repository.FindAsync(id);
            if (item == null)
            {
                return HttpNotFound();
            }

            return new ObjectResult(_mapper.Map<FacilityDto>(item));
        }

        // POST api/facilities
        [HttpPost]
        [ValidateModelState]
        public async Task<IActionResult> Post([FromBody] FacilityDto facility)
        {
            await _repository.AddAsync(new Facility {Name = facility.Name});
            return Ok();
        }

        // PUT api/facilities/5
        [HttpPut("{id}")]
        [ValidateModelState]
        public async Task<IActionResult> Put(string id, [FromBody]  FacilityDto facility)
        {
            var item = await _repository.FindAsync(id);
            if (item == null)
            {
                return HttpNotFound();
            }
            item.Name = facility.Name;

            await _repository.UpdateAsync(item);
            return Ok();
        }

        // DELETE api/facilities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var item = await _repository.FindAsync(id);
            if (item == null)
            {
                return HttpNotFound();
            }

            await _repository.RemoveAsync(id);
            return Ok();
        }
    }
}