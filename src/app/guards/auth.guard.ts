import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import {AuthserviceService} from '../services/authservice.service';

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * @ignore
   * @param auth
   * @param router
   */
  constructor(private auth: AuthserviceService, private router: Router) {}

  /**
   * check is user signed in
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user.pipe(
    take(1),
      map(user => !!user),
      tap(loggedIn => {
        console.log(loggedIn);
        if (!loggedIn) {
          this.router.navigate(['/sign-in']);
        }
      })
  )
}
}
