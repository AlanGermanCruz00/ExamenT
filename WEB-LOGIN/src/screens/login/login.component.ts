import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SinginService } from 'src/services/singin.service';
import dictionaryUtils from 'src/utils/dictionary.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passwordFormControl = new FormControl('', [Validators.required])
   dictionaryUtils = dictionaryUtils

  loginForm = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl
  })

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'danger' = 'success';
  passwordVisible = false;

  constructor(
    private router: Router,
    private ainginService: SinginService
  ) { }

  onSubmitl(): void {
    this.ainginService.singIn(this.emailFormControl.value!, this.passwordFormControl.value!).then((res: any) => {
      const emailValue = this.emailFormControl.value!;
      const passwordValue = this.passwordFormControl.value!;
      if (res && res.response && res.response.length > 0) {
        const user = res.response[0];
        if (user.email === emailValue) {
          this.router.navigate(['/animals/table']);
        }
        else if (user.email === emailValue && user.password !== passwordValue) {
          this.showBootstrapToast(dictionaryUtils.messages.invalidPassword, 'danger')
        }
      } else {
        this.showBootstrapToast(dictionaryUtils.messages.invalidUser, 'danger');
      }
    }).catch((err) => {
      this.showBootstrapToast(dictionaryUtils.messages.invalidServe, 'danger');
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