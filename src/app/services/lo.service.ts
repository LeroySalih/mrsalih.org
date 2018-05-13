import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LearningObjective } from '../models/learning-objective';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LOService {

  LO_COLLECTION = 'lo';

  constructor(private afs: AngularFirestore) {
  }

  getLearningObjectives(lessonId: string): Observable<LearningObjective[]> {

    const collection = this.afs.collection<LearningObjective>
          (this.LO_COLLECTION, ref => ref
              .where('lessonId', '==', lessonId)
              .orderBy('order', 'asc'));

    return collection.valueChanges();

  }

  saveLO (lo: LearningObjective): Promise<void> {

    console.log(`[saveLO]`, lo);

    if (lo.id === undefined || lo.id === null) {
      lo.id = uuid();
    }

    return this.afs.doc(`${this.LO_COLLECTION}/${lo.id}`).set(lo);
  }

  deleteLO (lo: LearningObjective): Promise<void> {
    return this.afs.doc(`${this.LO_COLLECTION}/${lo.id}`).delete();
  }

}
