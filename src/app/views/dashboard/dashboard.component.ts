import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { Router } from '@angular/router';

import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';

interface IUser {
  name: string;
  state: string;
  registered: string;
  usage: number;
  period: string;
  buttonLabel: string;
  avatar: string;
  status: string;
  color: string;
  
}

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    imports: [TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})
export class DashboardComponent implements OnInit {

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);

  public users: IUser[] = [
    {
      name: 'Yiorgia Cifuentes',
      state: 'New',
      registered: 'Jan 1, 2021',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      avatar: './assets/images/avatars/1.jpg',
      status: 'success',
      color: 'success',
      buttonLabel: 'Responder'
    },
    {
      name: 'Abraham Puertas',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      avatar: './assets/images/avatars/2.jpg',
      status: 'danger',
      color: 'info',
      buttonLabel: 'Responder'
    },
    {
      name: 'Quentin Taranchino',
      state: 'New',
      registered: 'Jan 1, 2021',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      avatar: './assets/images/avatars/3.jpg',
      status: 'warning',
      color: 'warning',
      buttonLabel: 'Responder'
    },
    {
      name: 'Enéas Cuevas',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      avatar: './assets/images/avatars/4.jpg',
      status: 'secondary',
      color: 'danger',
      buttonLabel: 'Responder'
    },
    {
      name: 'Agatha Ruiz',
      state: 'New',
      registered: 'Jan 1, 2021',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',     
      avatar: './assets/images/avatars/5.jpg',
      status: 'success',
      color: 'primary',
      buttonLabel: 'Responder'
    },
    {
      name: 'Dávid Bisbal',
      state: 'New',
      registered: 'Jan 1, 2021',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      avatar: './assets/images/avatars/6.jpg',
      status: 'info',
      color: 'dark',
      buttonLabel: 'Responder'
    }
  ];

  public mainChart: IChartProps = { type: 'line' };
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  constructor(private router: Router) {
    // ...otros injects si tienes...
  }

  abrirEncuesta() {
  this.router.navigate(['dashboard', 'encuesta']);
}

  ngOnInit(): void {
    this.initCharts();
    this.updateChartOnColorModeChange();
  }

  initCharts(): void {
    this.mainChart = this.#chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.#chartsData.initMainChart(value);
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
      this.setChartStyles();
    });

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        const scales = this.#chartsData.getScales();
        this.mainChartRef().options.scales = { ...options.scales, ...scales };
        this.mainChartRef().update();
      });
    }
  }
}
