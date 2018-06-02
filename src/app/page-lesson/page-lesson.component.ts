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
import { SectionPayload } from '../models/section-payload';
import { SectionPayloadService } from '../services/section-payload';

import { LODialogComponent} from '../dialogs/lo-dialog/lo-dialog.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { LOEvent } from '../cp-learning-objective/cp-learning-objective.component';
import { MenuItem} from 'primeng/api';
import { SectionEditDialogComponent } from '../dialogs/section-edit-dialog/section-edit-dialog.component';
import { QuestionService } from '../services/question.service';

import {Quiz} from '../models/quiz';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { QuestionFactory } from '../models/question-factory';
import { QuestionSpec } from '../models/question-spec';
import { QuestionTypes } from '../enums/question-types';
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
  sectionPayloads: { [ id: string]: SectionPayload} = {};
  items: MenuItem[];
  isDragging: boolean;
  questions: Question[];
  currentQuestion = 0;

  // sectionPayloadService: any;

  public myForm: FormGroup; // our form model

  constructor(private route: ActivatedRoute,
              private lessonService: LessonService,
              private loService: LOService,
              private loProgressService: LOProgressService,
              private lessonSectionService: LessonSectionService,
              private userService: UserService,
              private lessonProgressService: LessonProgressService,
              private sectionPayloadService: SectionPayloadService,
              private matDialog: MatDialog,
              private messageService: MessageService,
              private questionService: QuestionService,
              private _fb: FormBuilder,
            ) {

             // this.learningObjectiveFeedback = {'PsfYfc3ag8oGkfOS8hQn': 'Not Yet', 'gG18CK2wQ14STjnyBX9B' : 'Got It'};
            this.isDragging = false;
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
          this.sectionPayloadService.getSectionPayloadsForLesson(this.lessonId, this.userProfile.authenticationId),
          this.questionService.getQuizForUser(this.lessonId, this.userProfile.authenticationId),
           (lesson, sections, progress, los, loProgress, sectionPayloads, quiz) =>
          ({lesson, sections, progress, los, loProgress, sectionPayloads, quiz})
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
            lessonData.sectionPayloads.forEach((sectionPayload: SectionPayload) => {
              this.sectionPayloads[sectionPayload.sectionId] = sectionPayload;
            });

            if (lessonData.quiz) {
              this.questions =  lessonData.quiz.questions;
            }

        });

    });

  }

  getSectionPayload (section: LessonSection) {
    return this.sectionPayloads[section.id];
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


  onNewLO(lo: LO) {
    console.log(`[onLOEvent]`, event);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = lo;
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
      case 'ADD' : return this.onNewLO(event.lo);
      case 'EDIT' : return this.onEditLO(event.lo);
      case 'DELETE': return this.onDeleteLO(event.lo);
      default: console.error(`[onLOEvent] UNKNOWN LOEvent type`); break;
    }
  }

  saveSectionNote(event) {

  }


  onSectionCompletedChange(section: LessonSection, completed: boolean) {
    console.log(`[onSectionCompletedChange]`, section, completed);

    const sectionComplete: SectionPayload = {
        id: `${section.lessonId}-${section.id}-${this.userProfile.authenticationId}`,
        userId: this.userProfile.authenticationId,
        completed: completed,
        lessonId: this.lessonId,
        sectionId: section['id'],
        };

    this.sectionPayloadService.saveSectionPayload(sectionComplete)
          .then(() => {console.log(`onCompletedChange ${section.id} updated to`, completed); } )
          .catch((error) => { console.log('onCompletedChange error: ', error.message); });

  }

  onSectionEvent(event) {
    console.log(`[onSectionEvent]`, event);

    switch (event.type) {
      case 'COMPLETE_STATUS' : return this.onSectionCompletedChange(event.section, event.payload);
      case 'SWAP_POSITION' : return this.onSectionSwapPosition (event.payload.from, event.payload.to);
      case 'DELETE' : return this.onSectionDelete(event.section);
      case 'DRAG_START': this.isDragging = true; break;
      case 'DRAG_END' :  this.isDragging = false; break;
      case 'NEW' : return this.onSectionNew();
      case 'EDIT' : return this.onSectionEdit(event.section);
    }
  }

  onQuestionEvent(event) {
    switch (event.type) {
      case 'CORRECT' : return this.correctQuestion(event.payload);
      case 'INCORRECT' : return this.incorrectQuestion();

    }
  }

  correctQuestion(answer: Answer) {
    answer.userId = this.userProfile.authenticationId;
    this.messageService.add({severity: 'SUCCESS', summary: 'Correct!'});
  }

  incorrectQuestion() {
    this.messageService.add({severity: 'DANGER', summary: 'InCorrect!'});
  }


  onSectionSwapPosition(from, to) {
    console.log('[onSectionSwapPosition]');

      if (from > to) {
        this.sections.forEach((s) => {
          if ((s.order - 1) >= to) {
            s.order = s.order + 1;
          }
        });
        this.sections[from].order = to + 1;
      } else {

        this.sections.forEach((s) => {
          if ((s.order - 1 ) >= to) {
            s.order = s.order - 1;
          }
        });

        this.sections[from].order = to + 1;
      }

      this.lessonSectionService.bulkUpdate(this.sections)
        .then(() => {
          this.messageService.add({severity: 'success', summary: 'Sections reordered'});
        })
        .catch((err) => {
          console.error(err.message);
        });
    }

    onSectionEdit (section: LessonSection) {

      console.log(`[onSectionEdit]`);

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;

      dialogConfig.data = section;
      // dialogConfig.data.order = this.getNextOrder(this.los);

      const dialogRef = this.matDialog.open(SectionEditDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        (dlgSection) => {
          console.log('[edit Section] from dlg: ', section );
            if (dlgSection) {
              this.lessonSectionService.saveLessonSection(dlgSection)
                  .then(() => {
                    this.messageService.add({severity: 'success', summary: 'Lesson Section Saved.'});
                  });
                }
            });
    }

    onSectionDelete (section: LessonSection) {
      console.log(`[onSectionDelete]`, section);

      this.lessonSectionService.deleteLessonSection(section)
        .then(() => {
          this.messageService.add({severity: 'success', summary: 'Section Deleted'});
        });
    }

    onSectionNew() {
      console.log(`[onSectionNew]`);

      let nextOrder = 0;

      this.sections.forEach((s) => {
        nextOrder = Math.max(nextOrder, s.order);
      });

      this.lessonSectionService.saveLessonSection({
            title: 'New Section',
            type: 'text',
            order: nextOrder + 1,
            options : {showComments: false},
            lessonId: this.lessonId,
            content: '<p>New Section</p>'} as LessonSection)
          .then(() => {
            this.messageService.add({severity: 'success', summary: 'Section Created'});
          });
    }

    createQuiz() {
      console.log(`createQuiz`);
      this.questionService.createQuizforUser(
        this.lessonId,
        this.userProfile.authenticationId,
        QuestionTypes.TimeConvertHrsMinsToMins)
        .then(() => { this.messageService.add({severity: 'success', summary: 'Quiz Created'}); })
        .catch((err) => {
          this.messageService.add({severity: 'danger', summary: err.message});
        });
    }
}
