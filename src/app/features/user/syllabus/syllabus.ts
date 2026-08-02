import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface Chapter {
  _id: string;
  name: string;
  tuitionCompleted: boolean;
  schoolCompleted: boolean;
  testCompleted: boolean;
}

export interface Subject {
  _id: string;
  subject: string;
  chapters: Chapter[];
}

@Component({
  selector: 'app-syllabus',
  standalone: false,
  templateUrl: './syllabus.html',
  styleUrl: './syllabus.css'
})

export class SyllabusComponent implements OnInit {
  deleteChapter(chapterId: string) {

  if (!confirm('Delete this chapter?')) {
    return;
  }

  this.http.delete(`${environment.apiBaseUrl}/api/syllabus/chapter/${chapterId}`
     ).subscribe({

    next: () => {

      this.selectedSubject.chapters =
        this.selectedSubject.chapters.filter(
          c => c._id !== chapterId
        );

    },

    error: console.error

  });

}

  // ==========================
  // API
  // ==========================

  apiUrl = '/api/syllabus';

  // ==========================
  // DATA
  // ==========================

  subjects: Subject[] = [];

  selectedSubject!: Subject;

  newChapter = '';

  constructor(private http: HttpClient) {}

  

  ngOnInit(): void {
    this.getSubjects();
  }

  // ==========================
  // LOAD SUBJECTS
  // ==========================

  getSubjects() {

    this.http.get<any>(`${environment.apiBaseUrl}/api/syllabus`).subscribe({

      next: (res) => {

        this.subjects = res.data;

        if (this.subjects.length > 0) {

          if (!this.selectedSubject) {

            this.selectedSubject = this.subjects[0];

          } else {

            const updated = this.subjects.find(
              x => x._id === this.selectedSubject._id
            );

            if (updated) {

              this.selectedSubject = updated;

            }

          }

        }

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  // ==========================
  // CHANGE SUBJECT
  // ==========================

  selectSubject(subject: Subject) {

    this.selectedSubject = subject;

  }

  // ==========================
  // ADD CHAPTER
  // ==========================

  addChapter() {

    if (!this.newChapter.trim()) return;

    this.http.post(

      `${this.apiUrl}/${this.selectedSubject._id}/chapter`,

      {

        name: this.newChapter

      }

    ).subscribe({

      next: () => {

        this.newChapter = '';

        this.getSubjects();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  // ==========================
  // UPDATE CHECKBOX
  // ==========================

  updateChapter(

    chapter: Chapter,

    field: 'tuitionCompleted' | 'schoolCompleted' | 'testCompleted'

  ) {

    this.http.patch(

      `${this.apiUrl}/chapter/${chapter._id}`,

      {

        [field]: chapter[field]

      }

    ).subscribe({

      next: () => {

        console.log('Updated');

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  // ==========================
  // PROGRESS
  // ==========================

  get completedCount(): number {

    if (!this.selectedSubject) return 0;

    return this.selectedSubject.chapters.filter(ch =>

      ch.tuitionCompleted &&
      ch.schoolCompleted &&
      ch.testCompleted

    ).length;

  }

  get progress(): number {

    if (!this.selectedSubject) return 0;

    if (this.selectedSubject.chapters.length === 0) return 0;

    return Math.round(

      (this.completedCount /
        this.selectedSubject.chapters.length) * 100

    );

  }

}