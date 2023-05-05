import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})     
export class TasklistService {

  public baseUri = `${environment.WebApiBaseUrl}`;
  pagedData: any;
  constructor(private http: HttpClient) { }

  GetTaskList(name: string, userType: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    if (typeof name == "undefined" || name == null) { name = null; }
    else { name = encodeURIComponent((name)); }
 
      return this.http.get(`${this.baseUri}Bank/GetTaskList?name=${name}&userType=${userType}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }
  GetTaskDetails(taskId: string): Observable<any> {
  
    return this.http.get(`${this.baseUri}Task/GetSingleTask?taskID=${taskId}`)
       .pipe(
         map((response: any) => {
          
          return response;
        })
      );
  }
  onDeleteTask(taskId: string): Observable<any> {

    return this.http.get(`${this.baseUri}Task/DeleteTask?taskID=${taskId}`)
      .pipe(
        map((response: any) => {
  

          return true;
        })
      );
  }

  UploadTaskData(task: Task) {  
    // // console.log('task', task);
    return this.http.post(this.baseUri + `Task/AddEditTask`, task);
  }

  GetAssignedUsers() {

    return this.http.get(`${this.baseUri}Task/TaskGetAssignedUsers`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;

          return response;
        })
      );
  }
}
export class Task {
  NewTask: string;
  DueDate: Date;
  DueTime: string;
  AssignedUser: string;
  SendEmail: boolean;
  SendSms: boolean;
  Status: string;
  userId: string;
  taskAutoid: string;
  constructor() {
    this.NewTask = '';
    this.DueDate = new Date();
    this.DueTime = '';
    this.AssignedUser = '';
    this.SendEmail = false;
    this.SendSms = false;
    this.Status = '';
    this.taskAutoid = null;
    this.userId = null;

  }

}
