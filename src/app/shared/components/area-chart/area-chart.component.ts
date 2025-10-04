import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/angular/standalone'
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexStroke,
  ApexDataLabels,
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexGrid
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  colors: string[];
  grid: ApexGrid;
};

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [CommonModule, IonLabel, IonSegment, IonSegmentButton, NgApexchartsModule],
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent {

  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Expense',
          data: [80, 90, 35, 50, 12, 60, 90]
        },
        {
          name: 'Income',
          data: [40, 55, 80, 40, 100, 55, 10]
        }
      ],
      chart: {
        type: 'area',
        height: 200,
        toolbar: { show: false },
        zoom: { enabled: false },
        background: 'transparent'
      },
      colors: ["#A58CFD", "#6ED0F6"],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 5 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 90, 100]
        }
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          show: true,
          offsetX: 10
        } // اگه روزها رو بخوای نشون بدی اینو true بذار
      },
      yaxis: { show: false },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        width: 200,
        floating: false
      },
      tooltip: {
        theme: 'light',
        enabled: false,
        y: { formatter: (val: any) => `${val}$` }
      }
    };

  }
}
