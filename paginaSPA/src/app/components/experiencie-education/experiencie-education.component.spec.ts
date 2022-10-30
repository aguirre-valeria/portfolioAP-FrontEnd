import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencieEducationComponent } from './experiencie-education.component';

describe('ExperiencieEducationComponent', () => {
  let component: ExperiencieEducationComponent;
  let fixture: ComponentFixture<ExperiencieEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencieEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperiencieEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
