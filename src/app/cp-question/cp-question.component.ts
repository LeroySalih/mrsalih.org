import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {sprintf } from 'sprintf-js';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { QuestionFactory, TimeConvertHrsMinsToMins } from '../models/question-factory';
import { Question } from '../models/question';

export interface QuestionEvent {
  type: string;
  payload: any;
  sectionId?: string;
}

@Component({
  selector: 'app-cp-question',
  templateUrl: './cp-question.component.html',
  styleUrls: ['./cp-question.component.css']
})
export class CpQuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  questionEvent: EventEmitter<QuestionEvent>;

  constructor(private fb: FormBuilder,
              private questionService: QuestionService
  ) {

    // console.log(sprintf( question[0] as string, question[1], question [2]) );
    this.questionEvent = new EventEmitter<QuestionEvent>();
    }

  ngOnInit() {

     this.question = QuestionFactory.createQuestionFromDB(this.question);
     console.log('ngInit', this.question.displayAnswers());
  }

}
