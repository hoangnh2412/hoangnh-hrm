using Hrm.Domain.Repositories;
using Jarvis.DDD.Domain.DataStorages;
using Jarvis.DDD.Domain.Services;
using Jarvis.ORM.EntityFramework.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Hrm.Infrastructure.Persistence;

public sealed class AppUnitOfWork(
  IServiceProvider services,
  IDbContextFactory<AppDbContext> factory,
  ITenantIdResolverFactory tenantIdResolverFactory,
  ICurrentTenantAccessor currentTenantAccessor)
  : BaseUnitOfWork<AppDbContext>(services, factory, tenantIdResolverFactory, currentTenantAccessor),
    IAppUnitOfWork;
