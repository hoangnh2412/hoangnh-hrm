using Hrm.Domain.DependencyInjection;
using Hrm.Domain.Repositories;
using Hrm.Infrastructure.Persistence;
using Jarvis.BlobStoring.Extensions;
using Jarvis.Caching.Extensions;
using Jarvis.ORM.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Hrm.Infrastructure.DependencyInjection;

public static class InfrastructureLayerExtension
{
  public static IHostApplicationBuilder AddInfrastructureLayer(this IHostApplicationBuilder builder)
  {
    builder.AddDomainLayer();
    builder.AddJarvisCaching();
    builder.AddCoreBlobStoring();
    builder.AddEntityFramework();

    builder.Services.AddScoped<IAppUnitOfWork, AppUnitOfWork>();

    var connectionString = builder.Configuration.GetConnectionString("AppDbContext")
      ?? "Host=localhost;Port=5432;Username=admin;Password=Admin@123;Database=hrm";

    builder.Services.AddCoreDbContext<AppDbContext>(options =>
      options.UseNpgsql(connectionString));

    return builder;
  }
}
