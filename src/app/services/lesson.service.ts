import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Lesson, LessonId } from '../models/lesson';

@Injectable()
export class LessonService {

  collection: AngularFirestoreCollection<Lesson>;

  lesson$: BehaviorSubject<Lesson>;

  constructor(private afs: AngularFirestore) {

  }

  getLessons(moduleId: string): Observable<any> {

    console.log(`[lesson-service::getLessons] sending`);

    const collection: AngularFirestoreCollection<Lesson> =
      this.afs.collection<Lesson>('lessons', ref => ref.where('moduleId', '==', moduleId).orderBy('order', 'asc'));

    return this.collection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Lesson;
        const id = a.payload.doc.id;

        return {id, ...data};
      });
    });

  }

  getLesson(lessonId: string): Observable<LessonId> {

    console.log(`[lesson-service::getLesson] Starting`);

    const document: AngularFirestoreDocument<LessonId> = this.afs.doc(`lessons/${lessonId}`);
    return document.valueChanges();

  }

}
