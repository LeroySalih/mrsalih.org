import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Lesson, LessonId } from '../models/lesson';

import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {

  collection: AngularFirestoreCollection<Lesson>;

  lesson$: BehaviorSubject<Lesson>;

  lessons: LessonId[];


  constructor(private afs: AngularFirestore) {

  }

  getLessons(moduleId: string): Observable<any> {

    console.log(`[getLessons]`, moduleId);
    const collection: AngularFirestoreCollection<Lesson> =
      this.afs.collection<Lesson>('lessons', ref => ref.where('moduleId', '==', moduleId).orderBy('order', 'asc'));

    return collection.snapshotChanges().map(actions => {
      console.log(`[getLessons::snapChanges] updating data`);
      return actions.map(a => {
        const data = a.payload.doc.data() as Lesson;
        const id = a.payload.doc.id;

        return {id, ...data};
      });
    });

  }

  getLesson(lessonId: string): Observable<LessonId> {

    const document: AngularFirestoreDocument<LessonId> = this.afs.doc(`lessons/${lessonId}`);
    return document.valueChanges();

  }

  saveLesson (lesson: LessonId): Promise<void> {
    console.log(`[saveLesson]`, lesson);

    if (lesson.id === undefined || lesson.id === null) {
      console.log(`Lesson Id is undefined, creating new`);
      lesson.id = uuid();
    }
    return this.afs.doc(`lessons/${lesson.id}`).set(lesson);
  }

  deleteLesson (lesson: LessonId): Promise<void> {
    return this.afs.doc(`lessons/${lesson.id}`).delete();
  }

  swapLessonOrder(lesson: LessonId, swapLesson: LessonId): Promise<void> {

    if (lesson === undefined || swapLesson === undefined)  {
      return Promise.reject(new Error('Invalid paramters'));
    }

    console.log(`[demoteLesson]`, [lesson, swapLesson] );

    const batch = this.afs.firestore.batch();

    const lessonRef = this.afs.firestore.doc(`lessons/${lesson.id}`);
    const swapRef = this.afs.firestore.doc(`lessons/${swapLesson.id}`);

    const tmp = swapLesson.order;
    swapLesson.order = lesson.order;
    lesson.order = tmp;

    batch.set(lessonRef, lesson);
    batch.set(swapRef, swapLesson);

    return batch.commit();

  }

}
