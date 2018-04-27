import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageModuleComponent } from './page-module/page-module.component';
import { PageLessonComponent } from './page-lesson/page-lesson.component';
import { PageLoginComponent} from './page-login/page-login.component';

import { environment } from '../environments/environment';
import { ModuleService } from './services/module.service';
import { LessonService } from './services/lesson.service';

import { LessonSectionService} from './services/lesson-section.service';

import { UserService } from './services/user.service';
import { CpLearningObjectiveComponent } from './cp-learning-objective/cp-learning-objective.component';
import { LessonProgressService } from './services/lesson-progress.service';
import { LOService} from './services/lo.service';
import { LOProgressService } from './services/lo-progress.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: PageHomeComponent},
  {path: 'login', component: PageLoginComponent},
  {path: 'module/:id', component: PageModuleComponent},
  {path: 'lesson/:id', component: PageLessonComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageModuleComponent,
    PageLessonComponent,
    PageLoginComponent,
    CpLearningObjectiveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    ModuleService,
    LessonService,
    UserService,
    LOService,
    LOProgressService,
    LessonSectionService,
    AngularFireAuth,
    LessonProgressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
