import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(
    private permissionsService: NgxPermissionsService,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private rolesService: NgxRolesService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('token') != null) {
      var userId = this.loginService.getTokenDecoded()['idUser'];
      var roles = [];
      this.loginService.userId = userId;
      return true;
    } else {
      this.router.navigate(['/']);
      this.toastr.warning('¡Por favor Inicie Sesión!');
      return false;
    }
  }
}
