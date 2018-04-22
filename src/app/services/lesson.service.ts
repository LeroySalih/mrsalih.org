import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Lesson, LessonId } from '../models/lesson';

@Injectable()
export class LessonService {

  collection: AngularFirestoreCollection<Lesson>;
  modules: Observable<LessonId[]>;
  modules$: BehaviorSubject<LessonId[]>;

  constructor(afs: AngularFirestore) {
    this.modules$ = new BehaviorSubject<LessonId[]>(null);

   // this.collection = afs.collection<Module>('modules');
    this.collection = afs.collection<Lesson>('lessons', ref => ref.orderBy('order', 'asc'));
    this.modules = this.collection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Lesson;
        const id = a.payload.doc.id;

        return {id, ...data};
      });
    });

    this.modules.subscribe((data) => {
      console.log(`[module-service::constructor] sending`, data);
      this.modules$.next(data);
    });
  }

}
