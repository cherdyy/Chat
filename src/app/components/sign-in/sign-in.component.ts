import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthserviceService} from '../../services/authservice.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  /**
   * form controls group of user login data
   * @type {FormGroup}
   */
  signInForm: FormGroup;

  /**
   * @ignore
   * @param authService
   */
  constructor(private authService: AuthserviceService) {
    this.signInForm = new FormGroup({
      'userPassword': new FormControl('', Validators.required),
      'userLogin': new FormControl('', Validators.required)
    });
  }

  /**
   * login with google auth
   */
  googleLogin() {
    this.authService.googleLogin()
  }

  /**
   * login with login and password
   */
  login() {
    this.authService.login(this.signInForm.value);
  }

  /**
   * @ignore
   */
  ngOnInit() {}

}
