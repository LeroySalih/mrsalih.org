import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLessonComponent } from './page-lesson.component';

describe('PageLessonComponent', () => {
  let component: PageLessonComponent;
  let fixture: ComponentFixture<PageLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
