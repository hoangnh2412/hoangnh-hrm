using Hrm.Domain.Shared.Constants;

namespace Hrm.Domain.Tests;

public class ProductConstantsTests
{
  [Fact]
  public void Name_is_Hrm()
  {
    Assert.Equal("Hrm", ProductConstants.Name);
  }
}
