using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Hrm.Domain.DependencyInjection;

public static class DomainLayerExtension
{
  public static IHostApplicationBuilder AddDomainLayer(this IHostApplicationBuilder builder)
  {
    return builder;
  }
}
