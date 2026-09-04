using Hrm.Application.Features.Ping;

namespace Hrm.Application.Tests;

public class ProbePingHandlerTests
{
  [Fact]
  public async Task HandleAsync_returns_ok_for_hrm()
  {
    var handler = new ProbePingHandler();
    var result = await handler.HandleAsync(new ProbePingCommand());

    Assert.Equal("ok", result.Status);
    Assert.Equal("Hrm", result.Product);
  }
}
