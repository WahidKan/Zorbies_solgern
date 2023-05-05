using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;

namespace Solgen.WebApi.Models
{
    public class AuthenticationContext : IdentityDbContext<ApplicationUser>
    {
        public AuthenticationContext(DbContextOptions<AuthenticationContext> options):base (options)
        {

        }

        DbSet<ApplicationUser> ApplicationUsers { get; set; }
    }
}
