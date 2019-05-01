import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { tap, take } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap(isLoggedIn => {
        console.log('TCL: AuthGuard -> constructor -> isLoggedIn', isLoggedIn)
        if (!isLoggedIn) {
          this.router.navigate(['/tabs/login'], {
            queryParams: {
              targetUrl: state.url
            }
          })
        }
      }),
      take(1)
    )
  }
}
