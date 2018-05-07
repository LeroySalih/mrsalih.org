import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';


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
import { CpSectionNotesComponent } from './cp-section-notes/cp-section-notes.component';
import { SectionNotesService } from './services/section-notes.service';
import { CpEmbedVideoComponent } from './cp-embed-video/cp-embed-video.component';
import { CpLearningObjectivesComponent } from './cp-learning-objectives/cp-learning-objectives.component';
import { CpEmbedLocalVideoComponent } from './cp-embed-local-video/cp-embed-local-video.component';
import { CpEmbedTextContentComponent } from './cp-embed-text-content/cp-embed-text-content.component';

import { MaterialModule } from './material.module';
import { PrimeNGModule } from './primeng.module';

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
    CpLearningObjectiveComponent,
    CpSectionNotesComponent,
    CpEmbedVideoComponent,
    CpEmbedLocalVideoComponent,
    CpLearningObjectivesComponent,
    CpEmbedTextContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
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
    LessonProgressService,
    SectionNotesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
