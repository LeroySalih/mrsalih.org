import { Injectable } from '@angular/core';
import {sprintf } from 'sprintf-js';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { Observable } from 'rxjs/Observable';
import { DbConfig } from '../db.config';
import { QuestionFactory } from '../models/question-factory';


export interface Quiz {
  id: string;
  tag: string;
  questionSpec: QuestionSpec;
}

export interface QuestionSpec {
  units: string;
  inputParamsSpec: string;
  questionLabel: string;

  answerLabel: string;
}



@Injectable()
export class QuestionService {


  constructor(private afs: AngularFirestore) {

   }


  logAnswer (answer: Answer) {
    console.log(`[logAnswer]`);
  }

  createQuizforUser(lessonId: string, userId: string, questionSpecTag: string): Promise<void> {

    console.log(`createQuizforUser lessonId:  ${lessonId}` );
    // const quiz: AngularFirestoreDocument<Quiz> = this.afs.doc(`${DbConfig.QUIZ}/${lessonId}`);

    return new Promise ((reject, resolve) => {

        // subscription = quiz.valueChanges().subscribe((data) => {

        // subscription.unsubscribe();

        // create 5 questions
        const questionFactory: QuestionFactory = new QuestionFactory();
        const questions: Question[] = questionFactory.createQuestions(questionSpecTag, 5);

        // save them to DB
        return this.afs.doc(`${DbConfig.QUIZ}/${lessonId}/userId/${userId}`).set({questions});

      });

  }

  getQuestionsForUser (lessonId: string, userId): Observable<Quiz> {
    const doc: AngularFirestoreDocument<Quiz> = this.afs.doc(`${DbConfig.QUIZ}/${lessonId}/userId/${userId}`);
    return doc.valueChanges();
  }

}
