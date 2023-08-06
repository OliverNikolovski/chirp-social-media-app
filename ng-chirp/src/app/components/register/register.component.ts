import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {CustomValidators} from "../../validators/custom-validators";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  step: 1 | 2 | 3 = 1;
  formGroup = this.initForm();
  selectedProfilePicture: File | null = null;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.passwordConfirmation.addValidators(CustomValidators.passwordConfirmed(this.password));
  }

  nextStep(): void {
    this.step++;
  }

  cannotGoNextStep(): boolean {
    if (this.step === 1)
      return this.username.invalid || this.password.invalid || this.passwordConfirmation.invalid;

    if (this.step === 2)
      return this.name.invalid;

    return false;
  }

  prevStep(): void {
    this.step--;
  }

  onSubmit(): void {
    const request = this.formGroup.value;
    request.profile_picture = this.selectedProfilePicture;
    this.authService.register(request)
      .subscribe({
        next: _ => this.router.navigate(['home']),
        error: error => this.notificationService.error(error.message)
      })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedProfilePicture = event.target.files[0];
    }
  }


  private initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required]],
      profile_picture: [null],
      bio: [null],
      location: [null],
      website: [null],
      birthdate: [null]
    });
  }

  get username(): AbstractControl {
    return this.formGroup.get('username')!;
  }

  get password(): AbstractControl {
    return this.formGroup.get('password')!;
  }

  get passwordConfirmation(): AbstractControl {
    return this.formGroup.get('password_confirmation')!;
  }

  get name(): AbstractControl {
    return this.formGroup.get('name')!;
  }
}
