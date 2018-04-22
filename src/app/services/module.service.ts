import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Module, ModuleId } from '../models/module';

@Injectable()
export class ModuleService {

  collection: AngularFirestoreCollection<Module>;
  modules: Observable<ModuleId[]>;
  modules$: BehaviorSubject<ModuleId[]>;

  constructor(afs: AngularFirestore) {
    this.modules$ = new BehaviorSubject<ModuleId[]>(null);

   // this.collection = afs.collection<Module>('modules');
    this.collection = afs.collection<Module>('modules', ref => ref.orderBy('order', 'asc'));
    this.modules = this.collection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Module;
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
