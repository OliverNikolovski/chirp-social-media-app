import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) {
    this.loginForm = this.buildLoginForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const username = this.usernameControl.value;
    const password = this.passwordControl.value;
    this.authService.login(username, password)
      .subscribe({
        next: () => this.router.navigate(['home']),
        error: error => this.notificationService.error(error.error.message)
      });
  }

  private buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get usernameControl(): AbstractControl {
    return this.loginForm.get('username')!;
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.get('password')!;
  }

}
