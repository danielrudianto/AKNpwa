import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post(global.url + "/reportMaterial", materialReport)
  }

  submitProgressReport(formData: FormData) {
    return this.http.post(global.url + "/reportStatus", formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  deleteReport(id: number) {
    return this.http.delete(global.url + '/reportFeed/' + id);
  }

  fetchTodayWorker(projectId: number) {
    return this.http.get(global.url + "/reportWorker/getToday/" + projectId.toString());
  }

  downloadDailyReport(date: Date, projectId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(global.url + '/reportDaily', {
      params: {
        date: date.toISOString(),
        projectId: projectId
      },
      responseType: 'blob',
      headers: headers
    })
  }

  submitRFI(formData: FormData) {
    return this.http.post(global.url + "/rfi", formData, {
      reportProgress: true,
      responseType: 'json'
    })
  }

  editWorkerReport(workerReport: WorkerReportForm) {
    return this.http.put(global.url + "/reportWorker", workerReport)
  }

  editToolReport(toolReport: ToolReportForm) {
    return this.http.put(global.url + "/reportTool", toolReport);
  }

  editMaterialReport(materialReport: MaterialReportForm) {
    return this.http.put(global.url + "/reportMaterial", materialReport);
  }

  editRFI(formData: FormData) {
    return this.http.put(global.url + "/rfi", formData, {
      reportProgress: true,
      responseType: 'json'
    })
  }
}
