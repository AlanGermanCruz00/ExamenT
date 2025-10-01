import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from 'src/services/singin.service';
import dictionaryUtils from 'src/utils/dictionary.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  dictionaryUtils = dictionaryUtils;

  loginForm = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl
  });

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'danger' = 'success';
  passwordVisible = false;

  constructor(
    private router: Router,
    private signinService: SigninService
  ) { }

  onSubmitl(): void {
    if (this.loginForm.invalid) return;

    const emailValue = this.emailFormControl.value!;
    const passwordValue = this.passwordFormControl.value!;

    this.signinService.signIn(emailValue, passwordValue)
      .then((res: any) => {
        this.showBootstrapToast(dictionaryUtils.messages.successLogin, 'success');
        this.router.navigate(['/animals/table']);
      })
      .catch((err: any) => {
        if (err.status === 401) {
          this.showBootstrapToast(dictionaryUtils.messages.invalidEmail, 'danger');
        } else {
          this.showBootstrapToast(dictionaryUtils.messages.invalidServe, 'danger');
        }
      });
  }

  showBootstrapToast(message: string, type: 'success' | 'danger') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  PasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
