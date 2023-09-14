import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private baseUrl = environment.telemetryContext.host;

  constructor(private http: HttpClient) {}

  getStudentScore(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${environment.lessonProgressEndpoint}/student/${studentId}`);
  }

  getLessonsData(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${environment.lessonProgressEndpoint}/lessons/${studentId}`);
  }

  getLessonScore(lessonId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${environment.lessonProgressEndpoint}/lesson/${lessonId}`);
  }

  postLessonScore(studentId: number, lessonId: string, score: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${environment.lessonProgressEndpoint}/${studentId}/${lessonId}`, { score });
  }
}
