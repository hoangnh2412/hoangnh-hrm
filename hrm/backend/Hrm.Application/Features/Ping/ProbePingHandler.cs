using Jarvis.DDD.Application.Contracts.Commands;
using Jarvis.DDD.Domain.Shared.Messaging;

namespace Hrm.Application.Features.Ping;

public sealed record ProbePingCommand : ICommand;

public sealed record PingResult(string Status, string Product);

public sealed class ProbePingHandler : IAsyncCommandHandler<ProbePingCommand, PingResult>
{
  public Task<PingResult> HandleAsync(ProbePingCommand command, CancellationToken cancellationToken = default)
  {
    cancellationToken.ThrowIfCancellationRequested();
    return Task.FromResult(new PingResult("ok", Hrm.Domain.Shared.Constants.ProductConstants.Name));
  }
}
