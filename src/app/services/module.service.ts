import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Module } from '../models/module';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ModuleService {

  // collection: AngularFirestoreCollection<Module>;
  // modules: Observable<Module[]>;
  // modules$: BehaviorSubject<Module[]>;

  constructor(private afs: AngularFirestore) {
    /*
    this.modules$ = new BehaviorSubject<Module[]>(null);

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
    */
  }

  getModules(): Observable<Module[]> {
    const collection = this.afs.collection<Module>('modules', ref => ref.orderBy('order', 'asc'));

    return collection.valueChanges();
  }

  saveModule (module: Module): Promise<void> {

    console.log(`[saveModule] received `, module );

    if (module.id === undefined || module.id === null) {
      console.log(`Module Id is undefined, creating new`);
      module.id = uuid();
      module.order = 0;
    }

    return this.afs.doc(`modules/${module.id}`).set(module);
  }

  deleteModule(module: Module): Promise<void> {
    return this.afs.doc(`modules/${module.id}`).delete();
  }

}
