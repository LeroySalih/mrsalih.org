import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LessonSection } from '../models/lesson-section';
import { DbConfig } from '../db.config';

@Injectable()
export class LessonSectionService {


  constructor(private afs: AngularFirestore) {
  }

  getLessonSections(lessonId: string): Observable<LessonSection[]> {

    const collection = this.afs.collection<LessonSection>
          (DbConfig.SECTIONS, ref => ref.where('lessonId', '==', lessonId).orderBy('order', 'asc'));

    return collection.valueChanges();

  }

  bulkUpdate (sections: LessonSection[]): Promise<void> {

    console.log(`[bulkUpdate]`, sections);

    const batch = this.afs.firestore.batch();

    sections.forEach((s) => {
        const docRef = this.afs.firestore.doc(`${DbConfig.SECTIONS}/${s.id}`);
        batch.set(docRef, s);
    });

    return batch.commit();

  }

}
