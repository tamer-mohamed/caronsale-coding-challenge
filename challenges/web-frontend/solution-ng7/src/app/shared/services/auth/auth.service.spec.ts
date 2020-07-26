import { AuthService } from "./auth.service";
import { of } from "rxjs";

describe("LoginService", () => {
  const httpClientSpy = { put: of({ token: "123" }) };
  let authService: AuthService;

  beforeEach(async () => {
    authService = new AuthService(<any>httpClientSpy);
  });

  it("should call the API with the hashed password", () => {
    spyOn(httpClientSpy, "put").and.returnValue(of({ token: "123" }));

    authService
      .validateUser("name", "pass")
      .subscribe((res) => expect(res.token).toBe("123"));

    expect(httpClientSpy.put).toHaveBeenCalledWith("authentication/name", {
      password: authService._hashPasswordWithCycles("pass", 5),
    });
  });
});
