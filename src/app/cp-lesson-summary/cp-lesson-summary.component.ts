import { Component, Input, OnInit , Output, EventEmitter} from '@angular/core';
import { LessonId } from '../models/lesson';

import { MenuItem } from 'primeng/api';

export interface LessonEvent {
  type: string;
  lesson?: LessonId;
}

@Component({
  selector: 'app-cp-lesson-summary',
  templateUrl: './cp-lesson-summary.component.html',
  styleUrls: ['./cp-lesson-summary.component.css']
})
export class CpLessonSummaryComponent implements OnInit {

  @Input()
  lesson: LessonId;

  @Output()
  lessonEvent: EventEmitter<LessonEvent>;

  items: MenuItem[];

  constructor() {
    this.lessonEvent = new EventEmitter<LessonEvent>();

    this.items = [
      {label: 'Edit', icon: 'fa-edit', command: () => {  this.OnEditLessonClick(); }},
      {label: 'Delete', icon: 'fa-trash', command: () => {  this.onDeleteLessonClick(); }},
      {label: 'Demote', icon: 'fa-angle-down', command: () => { this.onDemoteLesson(); }}
    ];
  }

  ngOnInit() {
  }

  onReadMoreClick() {
    this.lessonEvent.emit({type: 'READ', lesson: this.lesson});
  }
  OnEditLessonClick() {
    this.lessonEvent.emit({type: 'EDIT', lesson: this.lesson} as LessonEvent);
  }

  onDeleteLessonClick() {
    this.lessonEvent.emit({type: 'DELETE', lesson: this.lesson} as LessonEvent);
  }

  onDemoteLesson() {
    this.lessonEvent.emit({type: 'DEMOTE', lesson: this.lesson} as LessonEvent);
  }

}
