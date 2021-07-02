import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaterialReportForm, ToolReportForm, WeatherReportForm, Worker, WorkerReportForm } from '../interfaces/report';
import * as global from '../global';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  submitWeatherReport(weatherReport: WeatherReportForm) {
    return this.http.post(global.url + "/reportWeather", weatherReport);
  }

  submitWorkerReport(workerReport: WorkerReportForm) {
    return this.http.post(global.url + "/reportWorker", workerReport)
  }

  submitToolReport(toolReport: ToolReportForm) {
    return this.http.post(global.url + "/reportTool", toolReport) 
  }

  submitMaterialReport(materialReport: MaterialReportForm) {
    return this.http.post(global.url + "/materialReport", materialReport)
  }

  fetchTodayWorker(projectId: number) {
    return this.http.get(global.url + "/reportWorker/getToday/" + projectId.toString());
  }
}
