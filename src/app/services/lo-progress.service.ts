import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LearningObjectiveFeedback } from '../models/learning-objective-feedback';

@Injectable()
export class LOProgressService {

  LO_PROGRESS_COLLECTION = 'loProgress';

  constructor(private afs: AngularFirestore) { }

  getLOProgressForUser (userId: string, lessonId: string): Observable<LearningObjectiveFeedback[]> {

    const collection: AngularFirestoreCollection<LearningObjectiveFeedback> = this.afs.collection<LearningObjectiveFeedback>
    (this.LO_PROGRESS_COLLECTION, ref => ref
      .where('lessonId', '==', lessonId)
      .where('userId', '==', userId));

    return collection.valueChanges();
  }

  setProgressForUser (loFeedback: LearningObjectiveFeedback) {
    return this.afs
    .doc(`${this.LO_PROGRESS_COLLECTION}/${loFeedback.learningObjectiveId}-${loFeedback.userId}`)
    .set(loFeedback);
  }

}
