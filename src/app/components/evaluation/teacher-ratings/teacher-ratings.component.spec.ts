import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRatingsComponent } from './teacher-ratings.component';

describe('TeacherRatingsComponent', () => {
  let component: TeacherRatingsComponent;
  let fixture: ComponentFixture<TeacherRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherRatingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
