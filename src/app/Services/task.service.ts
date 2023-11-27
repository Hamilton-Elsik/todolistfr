import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import settings from 'src/assets/configuration/settings.json';
import { TaskInsertDTO } from '../Models/task-insert-dto';
import { Observable } from 'rxjs';
import { TaskDTO } from '../Models/task-dto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  myAppUrl: string;
  ApiTask: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
    this.ApiTask = settings.General.Version + settings.APIS.ApiTask;
  }
  saveTask(task: TaskInsertDTO): Observable<any> {
    return this.http.post(this.myAppUrl + this.ApiTask, task);
  }
  editTask(task: TaskDTO): Observable<any> {
    return this.http.put(this.myAppUrl + this.ApiTask, task);
  }

  getTasks(): Observable<any> {
    return this.http.get(this.myAppUrl + this.ApiTask);
  }
  getTaskById(id: string): Observable<any> {
    return this.http.get(this.myAppUrl + this.ApiTask + id);
  }
  deleteTask(id: string): Observable<any> {
    return this.http.delete(this.myAppUrl + this.ApiTask + id);
  }
}
