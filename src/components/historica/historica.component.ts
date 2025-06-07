import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historica',
  templateUrl: './historica.component.html',
  styleUrls: ['./historica.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HistoricaComponent {
  selectedProfessorId: string | null = null;
  selectedYear: string = '';
  professors: { id: string, name: string }[] = [];

  years: string[] = [];

  ngOnInit() {
    // Extrae los años únicos de las evaluaciones
    const profMap = new Map<string, string>();
    this.allEvaluations.forEach(e => {
      profMap.set(e.professor.id, e.professor.name);
    });
    this.professors = Array.from(profMap, ([id, name]) => ({ id, name }));
    this.years = Array.from(new Set(this.allEvaluations.map(e => e.year)));
  }
  
  
  allEvaluations = [
    {
      id: '1',
      professor: { id: '1', name: 'Rafaela Fuentes', avatar: './assets/images/avatars/1.jpg' },
      course: 'Matemáticas Avanzadas',
      year: '2023',
      average: 6.2,
      metrics: [
        { name: 'Conocimiento', score: 6.5 },
        { name: 'Claridad', score: 5.8 },
        { name: 'Disponibilidad', score: 6.7 },
        { name: 'Materiales', score: 6.0 }
      ],
      comments: 'Excelente dominio del tema, aunque a veces va muy rápido en las explicaciones.'
    },

    {
      id: '2',
      professor: { id: '2', name: 'Tomás Acevedo', avatar: './assets/images/avatars/1.jpg' },
      course: 'Paradigmas de la programacion',
      year: '2022',
      average: 5.8,
      metrics: [
        { name: 'Conocimiento', score: 6.5 },
        { name: 'Claridad', score: 5.8 },
        { name: 'Disponibilidad', score: 6.7 },
        { name: 'Materiales', score: 6.0 }
      ],
      comments: 'Excelente dominio del tema, aunque a veces va muy rápido en las explicaciones.'
    },
    {
      id: '3',
      professor: { id: '3', name: 'Gustavo Mondaca', avatar: './assets/images/avatars/1.jpg' },
      course: 'Paradigmas de la programacion',
      year: '2024',
      average: 5.9,
      metrics: [
        { name: 'Conocimiento', score: 6.5 },
        { name: 'Claridad', score: 5.8 },
        { name: 'Disponibilidad', score: 6.7 },
        { name: 'Materiales', score: 6.0 }
      ],
      comments: 'Excelente dominio del tema, aunque a veces va muy rápido en las explicaciones.'
    },

    {
      id: '4',
      professor: { id: '4', name: 'Fabiola Alvarado', avatar: './assets/images/avatars/1.jpg' },
      course: 'Paradigmas de la programacion',
      year: '2022',
      average: 6.9,
      metrics: [
        { name: 'Conocimiento', score: 6.5 },
        { name: 'Claridad', score: 5.8 },
        { name: 'Disponibilidad', score: 6.7 },
        { name: 'Materiales', score: 6.0 }
      ],
      comments: 'Excelente dominio del tema, aunque a veces va muy rápido en las explicaciones.'
    },
    {
      id: '5',
      professor: { id: '5', name: 'Agatha Ruiz', avatar: './assets/images/avatars/1.jpg' },
      course: 'Paradigmas de la programacion',
      year: '2024',
      average: 2.8,
      metrics: [
        { name: 'Conocimiento', score: 6.5 },
        { name: 'Claridad', score: 5.8 },
        { name: 'Disponibilidad', score: 6.7 },
        { name: 'Materiales', score: 6.0 }
      ],
      comments: 'Excelente dominio del tema, aunque a veces va muy rápido en las explicaciones.'
    },
    {
      id: '6',
      professor: { id: '6', name: 'David Bisbal', avatar: './assets/images/avatars/1.jpg' },
      course: 'Paradigmas de la programacion',
      year: '2022',
      average: 3.4,
      metrics: [
        { name: 'Conocimiento', score: 6.5 },
        { name: 'Claridad', score: 5.8 },
        { name: 'Disponibilidad', score: 6.7 },
        { name: 'Materiales', score: 6.0 }
      ],
      comments: 'Excelente dominio del tema, aunque a veces va muy rápido en las explicaciones.'
    },

  
    
    // Más evaluaciones...
  ];

  
  
  filteredEvaluations = [...this.allEvaluations];

  constructor(private route: ActivatedRoute) {
  this.route.queryParams.subscribe(params => {
    this.selectedProfessorId = params['profesorId'] || null;
    this.applyFilters();
  });
}
  
  applyFilters() {
  this.filteredEvaluations = this.allEvaluations.filter(evaluation => {
    const professorMatch = !this.selectedProfessorId || evaluation.professor.id === this.selectedProfessorId;
    const yearMatch = !this.selectedYear || evaluation.year === this.selectedYear;
    return professorMatch && yearMatch;
  });
}
}