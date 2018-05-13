import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LessonSection, LessonSectionId } from '../models/lesson-section';

@Injectable()
export class LessonSectionService {


  constructor(private afs: AngularFirestore) {
  }

  getLessonSections(lessonId: string): Observable<LessonSection[]> {

    const collection = this.afs.collection<LessonSection>
          ('lesson-sections', ref => ref.where('lessonId', '==', lessonId).orderBy('order', 'asc'));

    return collection.valueChanges();

  }

  getLessonSection(lessonId: string): Observable<LessonSection> {

    const document: AngularFirestoreDocument<LessonSectionId> = this.afs.doc(`lessons/${lessonId}`);
    return document.valueChanges();

  }

}
