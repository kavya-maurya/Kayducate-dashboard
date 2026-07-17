import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTask } from './daily-task';

describe('DailyTask', () => {
  let component: DailyTask;
  let fixture: ComponentFixture<DailyTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyTask],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyTask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
