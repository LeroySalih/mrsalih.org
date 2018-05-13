import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LOProgress } from '../models/lo-progress';

@Injectable()
export class LOProgressService {

  LO_PROGRESS_COLLECTION = 'loProgress';

  constructor(private afs: AngularFirestore) { }

  getLOProgressForUser (userId: string, lessonId: string): Observable<LOProgress[]> {

    const collection: AngularFirestoreCollection<LOProgress> = this.afs.collection<LOProgress>
    (this.LO_PROGRESS_COLLECTION, ref => ref
      .where('lessonId', '==', lessonId)
      .where('userId', '==', userId));

    return collection.valueChanges();
  }

  setProgressForUser (loFeedback: LOProgress) {
    return this.afs
    .doc(`${this.LO_PROGRESS_COLLECTION}/${loFeedback.learningObjectiveId}-${loFeedback.userId}`)
    .set(loFeedback);
  }

}
