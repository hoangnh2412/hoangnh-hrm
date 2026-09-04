using Jarvis.OpenTelemetry.Abstractions;

namespace Hrm.Host.Services;

public sealed class EnrichLogService : IEnrichLogService
{
  public Task<Dictionary<string, string>> ExtractAsync()
    => Task.FromResult(new Dictionary<string, string>());
}
