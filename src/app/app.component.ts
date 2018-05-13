import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModuleService } from './services/module.service';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Module} from './models/module';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './services/user.service';
import { UserProfile } from './models/user-profile';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'app';

  userProfile: UserProfile;
  val = 2;
  constructor(private moduleService: ModuleService,
             private firebaseAuth: AngularFireAuth,
             private userService: UserService,
             private messageService: MessageService,
             private router: Router) {
            this.userService.currentUser$.subscribe((user: UserProfile) => {
 //           console.log(`[constructor] New user detected`, user);
            this.userProfile = user;
            console.log('New User Logged in');
            if (!user) {
              this.messageService.add({severity: 'succcess', summary: 'User Logged out'});
            } else {
              this.messageService.add({severity: 'succcess', summary: 'New User Logged in'});
            }

        });
  }

  ngOnInit() {
  //  console.log(`[app-component::ngInit] Called`);
  }



  ngOnDestroy() {

  }

  OnLogOut() {
    this.userService.logOut();
  }

  OnLogIn() {
    this.router.navigate(['/login']);
  }
  toggleSideButton() {
    console.log('CLicked');
  }
}
