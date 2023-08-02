import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {
    this.loginForm = this.buildLoginForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const username = this.usernameControl.value;
    const password = this.passwordControl.value;
    this.authService.login(username, password)
      .subscribe({
        next: result => {
          console.log('result',result);
          this.router.navigate(['home']);
        },
        error: error => console.log('error:', error.error.message)
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
