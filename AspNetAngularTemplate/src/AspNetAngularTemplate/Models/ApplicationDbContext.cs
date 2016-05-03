using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;

namespace AspNetAngularTemplate.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Facility> Facilities { get; set; }

        public DbSet<AccessPoint> AccessPoints { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
