import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LessonService } from '../services/lesson.service';
import { LessonSectionService } from '../services/lesson-section.service';

import { LessonId, Lesson } from '../models/lesson';
import { LearningObjective } from '../models/learning-objective';
import { LearningObjectivesService } from '../services/learning-objectives.service';
import { LessonSection } from '../models/lesson-section';
import { UserService } from '../services/user.service';
import { UserProfile } from '../models/user-profile';
import { LessonProgressService } from '../services/lesson-progress.service';
import { LessonProgress } from '../models/lesson-progress';

@Component({
  selector: 'app-page-lesson',
  templateUrl: './page-lesson.component.html',
  styleUrls: ['./page-lesson.component.css']
})
export class PageLessonComponent implements OnInit {

  lessonId = 'Not Set';
  lesson: Lesson;
  learningObjectives: LearningObjective[];
  lessonProgresses: any = {};
  sections: LessonSection[];
  userProfile: UserProfile;

  constructor(private route: ActivatedRoute,
              private lessonService: LessonService,
              private learningObjectiveService: LearningObjectivesService,
              private lessonSectionService: LessonSectionService,
              private userService: UserService,
              private lessonProgressService: LessonProgressService
            ) { }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.lessonId = paramMap['params']['id'];

      this.userService.currentUser$.subscribe((userProfile) => {
        this.userProfile = userProfile;

          this.lessonService.getLesson(this.lessonId).subscribe((lesson) => {
            this.lesson = lesson;

            this.learningObjectiveService
            .getLearningObjectives(this.lessonId)
            .subscribe((los) => {this.learningObjectives = los; });


          this.lessonSectionService
            .getLessonSections(this.lessonId)
            .subscribe((lessonSections) => {
                this.sections = lessonSections;
            });


          this.lessonProgressService.getLessonProgressForUser(
              this.userProfile.authenticationId,
              this.lessonId
            ).subscribe((lps) => {
              lps.forEach((lp) => { this.lessonProgresses[lp.sectionId] = lp.completed; } );
            });

          });
      });


    });
  }

  onStatusChange(data) {
    console.log(`Selection Change detected`);
    console.log(`${this.userProfile.name}::${this.userProfile.className}`);
    console.log(`Data: `, data);
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

}
