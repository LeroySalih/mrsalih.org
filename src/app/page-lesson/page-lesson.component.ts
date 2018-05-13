import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LessonService } from '../services/lesson.service';
import { LessonSectionService } from '../services/lesson-section.service';

import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Observable} from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { Lesson } from '../models/lesson';
import { LO } from '../models/lo';
import { LOService } from '../services/lo.service';
import { LOProgressService } from '../services/lo-progress.service';

import { MatDialog, MatDialogConfig } from '@angular/material';

import { LessonSection } from '../models/lesson-section';
import { UserService } from '../services/user.service';
import { UserProfile } from '../models/user-profile';
import { LessonProgressService } from '../services/lesson-progress.service';
import { LessonProgress } from '../models/lesson-progress';
import { LOProgress } from '../models/lo-progress';
import { SectionNotes, VideoNote } from '../models/section-notes';
import { SectionNotesService } from '../services/section-notes.service';

import { LODialogComponent} from '../dialogs/lo-dialog/lo-dialog.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { LOEvent } from '../cp-learning-objective/cp-learning-objective.component';


export interface Customer {
  name: string; // required field with minimum 5 characters
  addresses: Address[]; // user can have one or more addresses
}

export interface Address {
  street: string;  // required field
  postcode: string;
}

@Component({
  selector: 'app-page-lesson',
  templateUrl: './page-lesson.component.html',
  styleUrls: ['./page-lesson.component.css']
})
export class PageLessonComponent implements OnInit {

  userProfile: UserProfile;
  lessonId = 'Not Set';
  lesson: Lesson;
  sections: LessonSection[];
  lessonProgresses: any = {};
  los: LO[];
  loProgress: {[id: string]: LOProgress} = {};  // { [id: string]:  string}  = {};
  sectionNotes: { [ id: string]: VideoNote[]} = {};

  public myForm: FormGroup; // our form model

  constructor(private route: ActivatedRoute,
              private lessonService: LessonService,
              private loService: LOService,
              private loProgressService: LOProgressService,
              private lessonSectionService: LessonSectionService,
              private userService: UserService,
              private lessonProgressService: LessonProgressService,
              private sectionNotesService: SectionNotesService,
              private matDialog: MatDialog,
              private messageService: MessageService,
              private _fb: FormBuilder,
            ) {

             // this.learningObjectiveFeedback = {'PsfYfc3ag8oGkfOS8hQn': 'Not Yet', 'gG18CK2wQ14STjnyBX9B' : 'Got It'};

             }

  ngOnInit() {

    const pageParam$: Observable<ParamMap> = this.route.paramMap;
    const user$: Observable<UserProfile> = this.userService.currentUser$;

    const values$ = combineLatest(
      pageParam$,
      user$,
      (page, user) =>  ({page, user})
    );

    values$.subscribe(data => {
      if (!data.page || !data.user) {return; }

      // At this point, we have lessonId and userId.

      this.lessonId = data.page['params']['id'];
      this.userProfile = data.user;

      combineLatest(
          this.lessonService.getLesson(this.lessonId),
          this.lessonSectionService.getLessonSections(this.lessonId),
          this.lessonProgressService.getLessonProgressForUser(this.userProfile.authenticationId, this.lessonId),
          this.loService.getLearningObjectives(this.lessonId),
          this.loProgressService.getLOProgressForUser(this.userProfile.authenticationId, this.lessonId),
          this.sectionNotesService.getSectionNotesForLesson(this.userProfile.authenticationId, this.lessonId),
          (lesson, sections, progress, los, loProgress, sectionNotes) => ({lesson, sections, progress, los, loProgress, sectionNotes})
        ).subscribe((lessonData) => {
            console.log(lessonData);

            this.lesson = lessonData.lesson;
            this.sections = lessonData.sections;

            this.los = lessonData.los;

            // build completion dictionary.
            lessonData.progress.forEach((lp) => {
              this.lessonProgresses[lp.sectionId] = lp.completed;
            } );

            // Build the Learning Objective Progress
           lessonData.loProgress.forEach((loProgress) => {
            this.loProgress[loProgress.learningObjectiveId] = loProgress;
           });

            // build section comments>
            lessonData.sectionNotes.forEach((sectionNote: SectionNotes) => {
              this.sectionNotes[sectionNote.sectionId] = sectionNote.notes;
            });

        });

    });

  }

  onLOStatusChange(event) {
    console.log(`onLOStatusChange`, event);

     const lop: LOProgress = {
      userId: this.userProfile.authenticationId,
      className: this.userProfile.className,
      learningObjectiveId: event.lo.id,
      lessonId: this.lessonId,
      status: event.status
    };

    this.loProgressService.setProgressForUser(lop)
      .then(() => { console.log(`Progress updated.`); })
      .catch((err) => {console.log(`Error Updating Progress`, err); });

  }

  getNextOrder(los: LO[]) {

    let nextOrder = 0;

    los.forEach((lo) => {
      nextOrder = Math.max(nextOrder, lo.order);
    });

    return (los) ? nextOrder + 1 : 0;
  }
  onNewLOEvent(event) {
    console.log(`[onLOEvent]`, event);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = event.lo;
    dialogConfig.data.order = this.getNextOrder(this.los);

    const dialogRef = this.matDialog.open(LODialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        console.log('[newLO] from dlg: ', data);
        if (data) {
           this.loService.saveLO(data as LO)
           .then(() => {
              this.messageService.add(
                {severity: 'success', summary: 'Module Saved'}
              );
            });
        }

      }
  );

  }

  onEditLO(lo: LO) {
    console.log(`onEditLO`, lo);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = lo;
    // dialogConfig.data.order = this.getNextOrder(this.los);

    const dialogRef = this.matDialog.open(LODialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        console.log('[editLO] from dlg: ', data);
        if (data) {
           this.loService.saveLO(data as LO)
           .then(() => {
              this.messageService.add(
                {severity: 'success', summary: 'Module Saved'}
              );
            });
        }

      }
  );
  }

  onDeleteLO (lo: LO) {
    console.log(`onDeleteLO`, lo);

    this.loService.deleteLO(lo)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'LO Deleted'});
      });
  }

  onLOEvent(event: LOEvent) {
    switch (event.type) {
      case 'EDIT' : return this.onEditLO(event.lo);
      case 'DELETE': return this.onDeleteLO(event.lo);
    }
  }

  saveSectionNote(event) {
    console.log('Section Note Event Received');
    console.log(event);
    const sectionNotes: SectionNotes = {
        userId: this.userProfile.authenticationId,
        lessonId: this.lessonId,
        ...event};

    this.sectionNotesService.setSectionNotes(sectionNotes)
      .then(() => { console.log ('[saveSectionNotes] Comments Updated'); })
      .catch((err) => {console.error('[saveSectionNotes] ', err.message); });

  }

  onCompletedChange(section, chk) {

    const lessonProgress: LessonProgress = {
        userId: this.userProfile.authenticationId,
        classId: this.userProfile.className,
        completed: chk['checked'],
        lessonId: this.lessonId,
        sectionId: section['id'],
        };

    this.lessonProgressService.setLessonProgress(lessonProgress)
          .then(() => {console.log(`onCompletedChange ${section.id} updated to`, chk.checked); } )
          .catch((error) => { console.log('onCompletedChange error: ', error.message); });

  }

  checkSectionComplete(sectionId) {
    return this.lessonProgresses[sectionId];
  }

  getNotesForSection (sectionId): VideoNote[] {
    // console.log(this.sectionNotes[sectionId]);
    return this.sectionNotes[sectionId];
  }

}
