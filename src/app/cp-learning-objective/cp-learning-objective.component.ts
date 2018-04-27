import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LearningObjective } from '../models/learning-objective';

export interface OnStatusChangeEvent {
  lo: LearningObjective;
  status: string;
}

@Component({
  selector: 'app-cp-learning-objective',
  templateUrl: './cp-learning-objective.component.html',
  styleUrls: ['./cp-learning-objective.component.css']
})
export class CpLearningObjectiveComponent implements OnInit {

  @Input()
  lo: LearningObjective;

  @Output()
  statusChange: EventEmitter<OnStatusChangeEvent>;

  @Input()
  status: string;

  constructor() {

    this.statusChange = new EventEmitter<OnStatusChangeEvent>();
  }

  ngOnInit() {
  }

  onStatusChange(selectElem) {
    const event: OnStatusChangeEvent = {lo: this.lo, status: selectElem['value']};
    this.statusChange.emit(event);
  }

}
