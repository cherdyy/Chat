import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthserviceService} from '../../services/authservice.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * get user info from auth.service
   * @type {Observable<firebase.User>}
   */
  user: Observable<firebase.User>;
  /**
   * check is resolution like handset
   */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  /**
   * @ignore
   * @param breakpointObserver
   * @param auth
   */
  constructor(private breakpointObserver: BreakpointObserver,
              private auth: AuthserviceService) {}
  /**
   * @ignore
   */
  ngOnInit() {
    this.user = this.auth.authUser();
  }

  /**
   * get logged out from site
   */
  logout() {
    this.auth.logout();
  }
}
