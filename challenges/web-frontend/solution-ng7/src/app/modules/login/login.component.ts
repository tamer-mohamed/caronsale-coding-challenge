import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error?: string;
  submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  submitForm() {
    this.error = null;
    this.submitting = true;

    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    this.authService
      .validateUser(
        this.loginForm.value.username,
        this.loginForm.value.password
      )
      .subscribe(
        (res) => {
          this.submitting = false;
          this.router.navigate(["/"]);
        },
        (error) => {
          this.submitting = false;
          this.error = error;
        }
      );

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.validateForm.value));
  }
}
