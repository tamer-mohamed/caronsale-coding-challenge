import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { AuthService } from "../../shared/services/auth/auth.service";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { SharedModule } from "../shared/shared.module";

const authServiceStub = {
  validateUser(username, password) {
    if (username === "name") {
      return of({ token: "123" });
    } else {
      return throwError("error");
    }
  },
};

describe("LoginComponents", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy;

  beforeEach(async(() => {
    routerSpy = { navigate: jasmine.createSpy("navigate") };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have the form invalid on first load", () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it("should navigate to '/' when login is successful", () => {
    const username = component.loginForm.controls["username"];
    const password = component.loginForm.controls["password"];

    username.setValue("name");
    password.setValue("pass");

    component.submitForm();

    expect(routerSpy.navigate).toHaveBeenCalledWith(["/"]);
  });

  it("should contain error string when there is an APIError", () => {
    const username = component.loginForm.controls["username"];
    const password = component.loginForm.controls["password"];

    username.setValue("namex");
    password.setValue("pass");

    component.submitForm();

    expect(component.error).toBeTruthy();
  });
});
