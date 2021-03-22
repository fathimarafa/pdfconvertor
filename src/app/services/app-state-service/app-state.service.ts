import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private state: { [key: string]: any } = {};

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


}
