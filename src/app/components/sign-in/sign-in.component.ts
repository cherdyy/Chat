import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthserviceService} from '../../services/authservice.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private authService: AuthserviceService) {
    this.signInForm = new FormGroup({
      'userPassword': new FormControl('', Validators.required),
      'userLogin': new FormControl('', Validators.required)
    });
  }

  googleLogin() {
    this.authService.googleLogin()
  }

  login() {
    this.authService.login(this.signInForm.value);
  }

  ngOnInit() {}

}
