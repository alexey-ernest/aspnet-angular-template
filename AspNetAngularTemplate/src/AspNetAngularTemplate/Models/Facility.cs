using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetAngularTemplate.Models
{
    public class Facility
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<AccessPoint> AccessPoints { get; set; }
    }
}