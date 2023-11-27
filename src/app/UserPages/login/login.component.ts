import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountDTO } from 'src/app/Models/account-dto';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private spinner: NgxSpinnerService
  ) {
    this.user = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(): void {
    this.spinner.show();
    const account: AccountDTO = {
      email: this.user.value.email,
      password: this.user.value.password,
    };
    this.loginService.login(account).subscribe(
      (data) => {
        this.spinner.hide();
        this.loginService.setLocalStorage(data.token);
        this.router.navigate(['/Dashboard']);
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error.error.message, 'Error');
        this.user.reset();
      }
    );
  }
}
