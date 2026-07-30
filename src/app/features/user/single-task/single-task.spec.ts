import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../../environments/environment';

import { SingleTask } from './single-task';

describe('SingleTask', () => {
  let component: SingleTask;
  let fixture: ComponentFixture<SingleTask>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleTask],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'task-123'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleTask);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the selected task and render its full description', () => {
    component.ngOnInit();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/tasks/task-123`);
    expect(req.request.method).toBe('GET');

    req.flush({
      _id: 'task-123',
      title: 'Algebra revision',
      description: 'Complete the revision worksheet and bring questions to class.',
      subject: 'Mathematics',
      priority: 'High',
      status: 'Pending',
      dueDate: '2026-08-10T00:00:00.000Z'
    });

    fixture.detectChanges();

    expect(component.task?.description).toContain('Complete the revision worksheet');
    expect(fixture.nativeElement.textContent).toContain('Complete the revision worksheet');
  });
});
