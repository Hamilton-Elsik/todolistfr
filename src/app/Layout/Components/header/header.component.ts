import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserDTO } from 'src/app/Models/user-dto';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() addSidebar = new EventEmitter<boolean>();
  stateOption = false;

  user: UserDTO;
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.userService.getUser(this.loginService.userId).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error?.error?.message, 'Error!');
        this.router.navigate(['/']);
      }
    );
  }
  ActOption() {
    this.stateOption = !this.stateOption;
  }

  signOff() {
    this.stateOption = false;
    this.loginService.removeLocalStorage();
    this.router.navigate(['/']);
  }
  ActiveSidebar() {
    this.addSidebar.emit(true);
  }
}
