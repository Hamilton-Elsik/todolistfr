import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserInsertDTO } from 'src/app/Models/user-insert-dto';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  register: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.register = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: [''],
      },
      { validator: this.checkPassword }
    );
  }
  registerUser(): void {
    const user: UserInsertDTO = {
      firstName: this.register.value.firstName,
      lastName: this.register.value.lastName,
      email: this.register.value.email,
      phoneNumber: this.register.value.phoneNumber,
      password: this.register.value.password,
    };

    this.spinner.show();
    this.userService.saveUser(user).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastr.success(
          'El usuario ' + user.email + ' fue registrado con éxito!',
          'Usuario Registrado!'
        );
        this.router.navigate(['/inicio/login']);
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error.error.message, 'Error!');
        this.register.reset();
      }
    );
  }
  checkPassword(group: UntypedFormGroup): any {
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true };
  }
}
