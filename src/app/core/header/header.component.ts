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

  user: Observable<firebase.User>;
  userEmail: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private auth: AuthserviceService) {}

  ngOnInit() {
    this.user = this.auth.authUser();
    this.user.subscribe(user => {
      if (user) {
        console.log(user);
        this.userEmail = user.email;
      }
    });
  }

  logout(){
    this.auth.logout();
  }


}
