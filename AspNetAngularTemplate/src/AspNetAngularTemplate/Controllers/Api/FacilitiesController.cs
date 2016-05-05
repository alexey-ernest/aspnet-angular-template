using System.Linq;
using System.Threading.Tasks;
using AspNetAngularTemplate.Models;
using AspNetAngularTemplate.Models.Repositories;
using AspNetAngularTemplate.ViewModels;
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
        public async Task<IActionResult> Get()
        {
            var items = await _repository.GetAllAsync();
            return new ObjectResult(items.Select(i => new FacilityDto
            {
                Id = i.Id,
                Name = i.Name
            }));
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

            return new ObjectResult(new FacilityDto
            {
                Id = item.Id,
                Name = item.Name
            });
        }

        // POST api/facilities
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FacilityDto facility)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            await _repository.AddAsync(new Facility {Name = facility.Name});
            return Ok();
        }

        // PUT api/facilities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]  FacilityDto facility)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

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