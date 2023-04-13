import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
  createUrlTreeFromSnapshot,
} from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UnloggedGuard implements CanActivate {
  constructor() {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('adviser.token');
    return !token ? true : createUrlTreeFromSnapshot(next, ['/']);
  }
}
