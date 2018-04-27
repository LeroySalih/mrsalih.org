import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LessonSection, LessonSectionId } from '../models/lesson-section';

@Injectable()
export class LessonSectionService {

  collection: AngularFirestoreCollection<LessonSection>;
  LessonSections: Observable<LessonSectionId[]>;
  LessonSections$: BehaviorSubject<LessonSectionId[]>;

  lesson$: BehaviorSubject<LessonSection>;

  constructor(private afs: AngularFirestore) {
    this.LessonSections$ = new BehaviorSubject<LessonSectionId[]>(null);
    this.lesson$ = new BehaviorSubject<LessonSection>(null);
  }

  getLessonSections(lessonId: string): Observable<LessonSection[]> {

    this.collection = this.afs.collection<LessonSection>
          ('lesson-sections', ref => ref.where('lessonId', '==', lessonId).orderBy('order', 'asc'));
    return this.collection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as LessonSection;
        const id = a.payload.doc.id;

        return {id, ...data};
      });
    });
  }

  getLessonSection(lessonId: string) {

    const document: AngularFirestoreDocument<LessonSectionId> = this.afs.doc(`lessons/${lessonId}`);
    const document$: Observable<LessonSection> = document.valueChanges();

    document$.subscribe((data: LessonSection) => {
        console.log(`[lesson-service::getLessonSection] sending`, data);
        this.lesson$.next(data);
    });

  }

}
