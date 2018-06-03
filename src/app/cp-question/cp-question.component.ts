import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
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
export class CpQuestionComponent implements OnInit, OnChanges {

  @Input()
  question: Question;
  typedQuestion: Question;

  @Input()
  index: number;

  @Output()
  questionEvent: EventEmitter<QuestionEvent>;

  selectedAnswer = '';
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private questionService: QuestionService
  ) {

    // console.log(sprintf( question[0] as string, question[1], question [2]) );
    this.questionEvent = new EventEmitter<QuestionEvent>();

  }

  ngOnInit() {
    console.log(`ngOnInit`, this.question);
    this.typedQuestion = QuestionFactory.createQuestionFromDB(this.question);
    this.form = this.fb.group({
      answer: ['', []]
    });


    this.form.valueChanges.subscribe((data) => {
      console.log(data);
    });

    console.log('ngInit', this.typedQuestion.displayAnswers());
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`ngOnChanges`, changes);
    // update the display
    this.typedQuestion = QuestionFactory.createQuestionFromDB(this.question);

  }

  checkAnswer() {
    if (this.typedQuestion.checkAnswer(this.form.value['answer'])) {
      this.questionEvent.emit(
        {type: 'CORRECT_ANSWER',
        payload: {currentIndex: this.index, answer: parseFloat(this.form.value['answer'])}});
    } else {
      this.questionEvent.emit(
        {type: 'INCORRECT_ANSWER',
        payload: {currentIndex: this.index, answer: parseFloat(this.form.value['answer'])}});
    }

  }

  nextQuestion () {
    this.questionEvent.emit({type: 'NEXT_QUESTION', payload: null});
  }

  previousQuestion () {
    this.questionEvent.emit({type: 'PREVIOUS_QUESTION', payload: null});
  }

}
