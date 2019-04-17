import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from './angular-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FirebaseModule} from './firebase/firebase.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FirebaseModule
  ],
  exports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    FirebaseModule
  ]
})
export class SharedModule { }
