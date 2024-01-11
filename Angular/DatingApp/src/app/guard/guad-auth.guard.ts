import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardComponent implements CanActivate {

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  canActivate(): any {
    try {
      this.toastr.error('You must be logged in to access this page.');
;
    } catch {
      debugger;
      this.toastr.error('You must be logged in to access this page.');
      this.router.navigate(['/auth-error']);
      return false;
    }
  }
}
