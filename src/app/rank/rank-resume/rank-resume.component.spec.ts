import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankResumeComponent } from './rank-resume.component';

describe('RankResumeComponent', () => {
  let component: RankResumeComponent;
  let fixture: ComponentFixture<RankResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
