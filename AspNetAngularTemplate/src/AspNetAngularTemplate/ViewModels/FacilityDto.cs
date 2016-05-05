using System.ComponentModel.DataAnnotations;

namespace AspNetAngularTemplate.ViewModels
{
    public class FacilityDto
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}