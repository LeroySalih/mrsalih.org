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

      this.lessonService.lessons$.subscribe((data: LessonId[]) => {
        this.lessons = data;
      });

      this.lessonService.getLessons(this.moduleId);
    });

    /*
    this.moduleService.modules$.subscribe((data) => {
      console.log(`[app-component::ngInit] Received:`, data);
      this.modules = data;
    });
    */
  }

}
