import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SigninService } from 'src/services/singin.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AlwaysAuthGuard implements CanActivate {

  constructor(private singinService: SigninService, private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < now) {
        this.singinService.logout();
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    } catch (err) {
      this.singinService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
