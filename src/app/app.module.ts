import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AuthserviceService} from './services/authservice.service';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import {SharedModule} from './shared/shared.module';
import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
import {AuthGuard} from './guards/auth.guard';
import { MessageTreatmentComponent } from './components/message-treatment/message-treatment.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'sign-in', component: SignInComponent },
  {path: 'sign-up', component: SignUpComponent },
  {path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    ProfileComponent,
    ChatComponent,
    MessageTreatmentComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [AuthserviceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
