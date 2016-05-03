using System.ComponentModel.DataAnnotations;

namespace AspNetAngularTemplate.Models
{
    public class AccessPoint
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual Facility Facility { get; set; }
    }
}