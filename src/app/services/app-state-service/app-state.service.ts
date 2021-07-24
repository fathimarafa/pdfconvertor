import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum AppEventType {
  specRegDialogClose = 'specRegDialogClose'
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private state: { [key: string]: any } = {};
  private subject: { [key: string]: any } = {};

  constructor() { }

  getState(moduleId: string) {
    return this.state[moduleId];
  }

  setState(moduleId: string, data: any) {
    this.state[moduleId] = data;
  }

  clear(moduleId: string) {
    delete this.state[moduleId];
  }

  listenChange(eventType: AppEventType): Observable<any> {
    if (!this.subject[eventType]) {
      this.subject[eventType] = new Subject<any>();
    }
    return this.subject[eventType].asObservable();
  }

  emitChange(eventType: AppEventType, data: any) {
    this.subject[eventType].next(data);
  }

}
