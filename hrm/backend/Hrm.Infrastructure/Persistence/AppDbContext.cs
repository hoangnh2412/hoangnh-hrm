using Jarvis.ORM.EntityFramework.DataStorages;
using Microsoft.EntityFrameworkCore;

namespace Hrm.Infrastructure.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options)
  : BaseStorageContext(options)
{
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
  }
}
