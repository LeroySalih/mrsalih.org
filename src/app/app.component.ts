import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModuleService } from './services/module.service';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Module, ModuleId} from './models/module';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './services/user.service';
import { UserProfile } from './models/user-profile';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'app';
  modulesSub: Subscription;
  modules: ModuleId[];
  userProfile: UserProfile;

  constructor(private moduleService: ModuleService,
             private firebaseAuth: AngularFireAuth,
             private userService: UserService,
             private router: Router) {
            this.userService.currentUser$.subscribe((user: UserProfile) => {
            console.log(`[constructor] New user detected`, user);
            this.userProfile = user;
        });
  }

  ngOnInit() {
    console.log(`[app-component::ngInit] Called`);
  }

  ngOnDestroy() {
    this.modulesSub.unsubscribe();
  }

  OnLogOut() {
    this.userService.logOut();
  }

  OnLogIn() {
    this.router.navigate(['/login']);
  }
}
