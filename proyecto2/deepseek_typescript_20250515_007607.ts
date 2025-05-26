import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor() { }

  getStudentCourses(): Observable<any[]> {
    // Datos de ejemplo - reemplazar con llamada HTTP real
    return of([
      {
        id: 1,
        name: 'Programación Avanzada',
        code: 'INF-001',
        teacher: 'Juan Pérez',
        teacherId: 1,
        career: 'Ingeniería Informática',
        semester: '2023-1',
        evaluation: null
      },
      {
        id: 2,
        name: 'Bases de Datos',
        code: 'INF-002',
        teacher: 'María Gómez',
        teacherId: 2,
        career: 'Ingeniería Informática',
        semester: '2023-1',
        evaluation: {
          grade: 6