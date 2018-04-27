import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LearningObjective, LearningObjectiveBase } from '../models/learning-objective';

@Injectable()
export class LOService {

  LO_COLLECTION = 'lo';

  constructor(private afs: AngularFirestore) {
  }

  getLearningObjectives(lessonId: string): Observable<LearningObjective[]> {

    const collection = this.afs.collection<LearningObjectiveBase>
          (this.LO_COLLECTION, ref => ref
              .where('lessonId', '==', lessonId)
              .orderBy('order', 'asc'));

    return collection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as LearningObjectiveBase;
        const id = a.payload.doc.id;

        return {id, ...data};
      });
    });

  }

}
