import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from '../../services/authservice.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  SignUpForm: FormGroup;
  errorMsg: string;

  constructor(private auth: AuthserviceService,
              private router: Router) {
    this.SignUpForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'displayName': new FormControl('', Validators.required)
    });

  }

  ngOnInit() {}

  signUp() {
    const email = this.SignUpForm.value.email;
    const password = this.SignUpForm.value.password;
    const displayName = this.SignUpForm.value.displayName;
    this.auth.signUp(email, password, displayName)
      .then(resolve => this.router.navigate(['chat']))
      .catch(error => this.errorMsg = error.message);
  }
}
