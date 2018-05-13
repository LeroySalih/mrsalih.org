import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LessonSection } from '../models/lesson-section';
import { Lesson } from '../models/lesson';
import { SectionPayload } from '../models/section-payload';

export interface SectionEvent {
  type: string;
  section?: LessonSection;
  payload?: any;
}

@Component({
  selector: 'app-cp-section',
  templateUrl: './cp-section.component.html',
  styleUrls: ['./cp-section.component.css']
})
export class CpSectionComponent implements OnInit {

  @Input()
  section: LessonSection;

  @Input()
  payload: SectionPayload;

  @Output()
  sectionEvent: EventEmitter<SectionEvent>;

  @Input()
  index: number;

  constructor() {
    this.sectionEvent = new EventEmitter<SectionEvent>();
  }

  ngOnInit() {
    console.log(`[ngOnInit]`, this.payload);
  }

  onCompleteChange(chk) {
    this.sectionEvent.emit({type: 'COMPLETE_STATUS', section: this.section, payload: chk.checked});
  }

  getCompleted(): boolean {
    return (this.payload) ? this.payload.completed : false;
  }

  onDragStart(event) {
    console.log(`[onDragStart] ${this.index}`);
  }

  onDragEnd(event) {
    console.log(`[onDragEnd] ${this.index}`);
  }

  onDrop(event) {
    if (event.dragData !== this.index) {
      this.sectionEvent.emit({type: 'SWAP_POSITION', payload: {from: event.dragData, to: this.index}});
      console.log(`[onDrop] moving ${event.dragData} to ${this.index}`);
    }
    }

}
