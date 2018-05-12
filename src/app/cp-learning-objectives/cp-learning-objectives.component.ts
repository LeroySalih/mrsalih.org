import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LearningObjective } from '../models/learning-objective';
import { LessonProgress } from '../models/lesson-progress';
import { LearningObjectiveFeedback } from '../models/learning-objective-feedback';
import { OnStatusChangeEvent } from '../cp-learning-objective/cp-learning-objective.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cp-learning-objectives',
  templateUrl: './cp-learning-objectives.component.html',
  styleUrls: ['./cp-learning-objectives.component.css']
})
export class CpLearningObjectivesComponent implements OnInit {

  @Input()
  los: LearningObjective[];

  @Input()
  lessonProgress: LessonProgress[];

  @Input()
  loProgress: { [id: string]:  LearningObjectiveFeedback}  = {};

  @Output()
  statusChange: EventEmitter<OnStatusChangeEvent>;

  constructor() {
    this.statusChange = new EventEmitter<OnStatusChangeEvent>();
  }


  ngOnInit() {
    console.log(this.loProgress);
  }

  getLoFeedback(lo): string {
    return (this.loProgress[lo.id]) ? this.loProgress[lo.id].status : '';
  }

  onStatusChange(event) {
    this.statusChange.emit(event);
  }

}
