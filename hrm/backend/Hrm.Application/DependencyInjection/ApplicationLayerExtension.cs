using Hrm.Application.Features.Ping;
using Jarvis.DDD.Application;
using Jarvis.DDD.Application.Contracts.Commands;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Hrm.Application.DependencyInjection;

public static class ApplicationLayerExtension
{
  public static IHostApplicationBuilder AddApplicationLayer(this IHostApplicationBuilder builder)
  {
    builder.AddCoreApplication();
    builder.Services.AddScoped<IAsyncCommandHandler<ProbePingCommand, PingResult>, ProbePingHandler>();
    return builder;
  }
}
