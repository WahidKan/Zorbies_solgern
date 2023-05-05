
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Solgen.Core
{
    public class SolgenDbContext : DbContext
    {
        private readonly IConfiguration config;

        public SolgenDbContext()
        {

        }
        public SolgenDbContext(IConfiguration config, DbContextOptions<SolgenDbContext> options) : base(options)
        {
            this.config = config ?? throw new System.ArgumentNullException(nameof(config));
        }

        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<TblMasterNames> TblMasterNames { get; set; }
        public virtual DbSet<TblMasters> TblMasters { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                if (config == null)
                {
                    optionsBuilder.UseSqlServer(CommonSettings.AppSetting["ConnectionStrings:SolgenConnectionString"]);
                }
                else
                {
                    optionsBuilder.UseSqlServer(config.GetConnectionString("SolgenConnectionString"));
                }
            }
        }
    }
}
