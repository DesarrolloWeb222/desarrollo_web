import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationService } from './evaluation.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  @ViewChild('careerChart') careerChartRef!: ElementRef;
  @ViewChild('semesterChart') semesterChartRef!: ElementRef;
  @ViewChild('teacherChart') teacherChartRef!: ElementRef;

  // Datos
  courses: any[] = [];
  filteredCourses: any[] = [];
  careers: string[] = [];
  semesters: string[] = [];
  years: number[] = [];
  historicalEvaluations: any[] = [];
  teachersRanking: any[] = [];
  
  // Filtros
  selectedCareer: string = '';
  selectedSemester: string = '';
  selectedYear: number = new Date().getFullYear();
  selectedHistorySemester: string = '1';
  searchTerm: string = '';
  
  // Estado
  hasUnevaluatedCourses: boolean = false;
  selectedCourse: any = null;
  selectedTeacher: any = null;
  evaluationForm: FormGroup;

  // Gráficos
  careerChart!: Chart;
  semesterChart!: Chart;
  teacherChart!: Chart;

  constructor(
    private fb: FormBuilder,
    private evaluationService: EvaluationService
  ) {
    Chart.register(...registerables);
    this.evaluationForm = this.fb.group({
      grade: [null, [Validators.required, Validators.min(1), Validators.max(7)]],
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngAfterViewInit(): void {
    this.initCharts();
  }

  loadInitialData(): void {
    this.evaluationService.getStudentCourses().subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = [...courses];
      this.checkUnevaluatedCourses();
    });

    this.evaluationService.getCareers().subscribe(careers => {
      this.careers = careers;
    });

    this.evaluationService.getSemesters().subscribe(semesters => {
      this.semesters = semesters;
    });

    this.loadYears();
    this.loadTeachersRanking();
  }

  loadYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 5; year--) {
      this.years.push(year);
    }
  }

  loadTeachersRanking(): void {
    this.evaluationService.getTeachersRanking().subscribe(ranking => {
      this.teachersRanking = ranking;
    });
  }

  loadHistory(): void {
    this.evaluationService.getHistoricalEvaluations(
      this.selectedYear,
      this.selectedHistorySemester
    ).subscribe(evaluations => {
      this.historicalEvaluations = evaluations;
    });
  }

  checkUnevaluatedCourses(): void {
    this.hasUnevaluatedCourses = this.courses.some(course => !course.evaluation);
    this.updateCharts();
  }

  initCharts(): void {
    // Gráfico por carrera
    this.careerChart = new Chart(this.careerChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Promedio por carrera',
          data: [],
          backgroundColor: '#4e73df',
          borderColor: '#2e59d9',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 7
          }
        }
      }
    });

    // Gráfico por semestre
    this.semesterChart = new Chart(this.semesterChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            '#36b9cc', '#4e73df', '#1cc88a', '#f6c23e', '#e74a3b'
          ],
          hoverBackgroundColor: [
            '#2c9faf', '#2e59d9', '#17a673', '#dda20a', '#be2617'
          ],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    // Gráfico del docente
    this.teacherChart = new Chart(this.teacherChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Evaluaciones por semestre',
          data: [],
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          borderColor: '#4e73df',
          pointBackgroundColor: '#4e73df',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#4e73df'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 7
          }
        }
      }
    });
  }

  updateCharts(): void {
    const careerData = this.evaluationService.getCareerAverages(this.courses);
    this.careerChart.data.labels = careerData.labels;
    this.careerChart.data.datasets[0].data = careerData.averages;
    this.careerChart.update();

    const semesterData = this.evaluationService.getSemesterAverages(this.courses);
    this.semesterChart.data.labels = semesterData.labels;
    this.semesterChart.data.datasets[0].data = semesterData.averages;
    this.semesterChart.update();
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesCareer = !this.selectedCareer || course.career === this.selectedCareer;
      const matchesSemester = !this.selectedSemester || course.semester === this.selectedSemester;
      const matchesSearch = !this.searchTerm || 
        course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        course.teacher.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        course.code.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesCareer && matchesSemester && matchesSearch;
    });
  }

  openEvaluationModal(course: any): void {
    this.selectedCourse = course;
    if (course.evaluation) {
      this.evaluationForm.patchValue({
        grade: course.evaluation.grade,
        comment: course.evaluation.comment
      });
    } else {
      this.evaluationForm.reset();
    }
  }

  submitEvaluation(): void {
    if (this.evaluationForm.valid && this.selectedCourse) {
      const evaluation = {
        courseId: this.selectedCourse.id,
        grade: this.evaluationForm.value.grade,
        comment: this.evaluationForm.value.comment,
        date: new Date()
      };

      this.evaluationService.saveEvaluation(evaluation).subscribe(() => {
        const courseIndex = this.courses.findIndex(c => c.id === this.selectedCourse.id);
        if (courseIndex !== -1) {
          this.courses[courseIndex].evaluation = evaluation;
          this.filteredCourses = [...this.courses];
          this.checkUnevaluatedCourses();
        }
      });
    }
  }

  showTeacherDetails(teacher: any): void {
    this.selectedTeacher = teacher;
    this.evaluationService.getTeacherDetails(teacher.id).subscribe(details => {
      this.selectedTeacher = {...teacher, ...details};
      this.updateTeacherChart();
    });
  }

  updateTeacherChart(): void {
    if (this.selectedTeacher?.history) {
      this.teacherChart.data.labels = this.selectedTeacher.history.labels;
      this.teacherChart.data.datasets[0].data = this.selectedTeacher.history.averages;
      this.teacherChart.update();
    }
  }

  getTeacherRatingColor(average: number): string {
    if (average < 4) return '#e74a3b';
    if (average < 5) return '#f6c23e';
    return '#1cc88a';
  }
}