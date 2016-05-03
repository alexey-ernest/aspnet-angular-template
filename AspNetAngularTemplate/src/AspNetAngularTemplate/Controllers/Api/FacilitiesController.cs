using System.Collections.Generic;
using System.Threading.Tasks;
using AspNetAngularTemplate.Models;
using AspNetAngularTemplate.Models.Repositories;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AspNetAngularTemplate.Controllers.Api
{
    [Route("api/[controller]")]
    public class FacilitiesController : Controller
    {
        private readonly IFacilityRepository _repository;

        public FacilitiesController(IFacilityRepository repository)
        {
            _repository = repository;
        }

        // GET: api/facilities
        [HttpGet]
        public async Task<IEnumerable<Facility>> Get()
        {
            return await _repository.GetAllAsync();
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

            return new ObjectResult(item);
        }

        // POST api/facilities
        [HttpPost]
        public async Task Post([FromBody] string name)
        {
            await _repository.AddAsync(new Facility {Name = name});
        }

        // PUT api/facilities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] string name)
        {
            var item = await _repository.FindAsync(id);
            if (item == null)
            {
                return HttpNotFound();
            }

            await _repository.UpdateAsync(new Facility {Id = id, Name = name});
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