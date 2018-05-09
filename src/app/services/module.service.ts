import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Module, ModuleId } from '../models/module';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ModuleService {

  collection: AngularFirestoreCollection<Module>;
  modules: Observable<ModuleId[]>;
  modules$: BehaviorSubject<ModuleId[]>;
  afs: AngularFirestore;

  constructor(afs: AngularFirestore) {
    this.afs = afs;
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
    //  console.log(`[module-service::constructor] sending`, data);
      this.modules$.next(data);
    });
  }

  saveModule (module: ModuleId): Promise<void> {

    console.log(`[saveModule] received `, module );

    if (module.id === undefined) {
      console.log(`Module Id is undefined, creating new`);
      module.id = uuid();
      module.order = 0;
    }
    return this.afs.doc(`modules/${module.id}`).set(module);
  }

}
