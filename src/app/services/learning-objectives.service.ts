import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LearningObjective, LearningObjectiveId } from '../models/learning-objective';

@Injectable()
export class LearningObjectivesService {

  collection: AngularFirestoreCollection<LearningObjective>;
  learningObjectives: Observable<LearningObjectiveId[]>;
  learningObjectives$: BehaviorSubject<LearningObjectiveId[]>;

  lesson$: BehaviorSubject<LearningObjective>;

  constructor(private afs: AngularFirestore) {
    this.learningObjectives$ = new BehaviorSubject<LearningObjectiveId[]>(null);
    this.lesson$ = new BehaviorSubject<LearningObjective>(null);
  }

  getLearningObjectives(lessonId: string): Observable<LearningObjective[]> {

    console.log(`[learning-objective-service::getLessons] Starting with lessonId:`, lessonId);

    this.collection = this.afs.collection<LearningObjective>
          ('learningObjectives', ref => ref.where('lessonId', '==', lessonId).orderBy('order', 'asc'));

    return this.collection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as LearningObjective;
        const id = a.payload.doc.id;

        return {id, ...data};
      });
    });

  }

}
