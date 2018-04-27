import { Component, OnInit } from '@angular/core';
import { ModuleId } from '../models/module';
import { LessonService } from '../services/lesson.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { LessonId } from '../models/lesson';

@Component({
  selector: 'app-page-module',
  templateUrl: './page-module.component.html',
  styleUrls: ['./page-module.component.css']
})
export class PageModuleComponent implements OnInit {

  moduleId = 'Not Set';
  lessons: LessonId[];

  constructor(
      private route: ActivatedRoute,
      private readonly lessonService: LessonService) { }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.moduleId = paramMap['params']['id'];

      this.lessonService.getLessons(this.moduleId).subscribe((data: LessonId[]) => {
        this.lessons = data;
      });

    });
  }

}
