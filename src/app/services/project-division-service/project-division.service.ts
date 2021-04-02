import { Injectable } from '@angular/core';
import { DataHandlerService } from '../datahandler/datahandler.service';
import { Observable } from 'rxjs';
import { Block } from '../../modules/crm/components/project-block-registration/definitions/block.definition';
import { Floor } from '../../modules/crm/components/project-floor-registration/definitions/floor.definition';

@Injectable({
  providedIn: 'root'
})
export class ProjectDivisionService {

  rootUrl: string;

  constructor(private datahandler: DataHandlerService) {
    this.rootUrl = 'BuildExeCRM/api/ProjectDivision';
  }

  // returns which controller
  // If return value = 1 , then show project only
  // If return value = 2, then show project and unit
  // If return value = 3 , then show project,block,floor and unit
  // If return value = 4, then show project,block and floor
  getProjectDivisionController(projectId: number) {
    const endPoint = `${this.rootUrl}/${projectId}`;
    return this.datahandler.put<number>(endPoint, {});
    // forkJoin({

    // }).subscribe(val => console.log(val));
  }

  //   To fill Block  Combo
  // "url": "https://localhost:44356/api/ProjectDivision/1007",
  //   "method": "GET",
  // To fill  Floor  Combo
  //   "url": "https://localhost:44356/api/ProjectDivision/1007/4",
  //   "method": "POST",
  // To fill  Unit  Combo
  //  "url": "https://localhost:44356/api/ProjectDivision/1007/4/2",
  //   "method": "GET",


  getBlock(projectId: number) {
    const endPoint = `${this.rootUrl}/${projectId}`;
    return this.datahandler.get<Block[]>(endPoint);
  }

  getFloor(projectId: number, blockId: number) {
    const endPoint = `${this.rootUrl}/${projectId}/${blockId}`;
    return this.datahandler.post<Floor[]>(endPoint, {});
  }

  getUnit(projectId: number, blockId: number, floorId: number): Observable<any[]> {
    const endPoint = `${this.rootUrl}/${projectId}/${blockId}/${floorId}`;
    return this.datahandler.get(endPoint);
  }

  getOwnProjectUnit(projectId: number): Observable<any[]> {
    const endPoint = `BuildExeCRM/api/OwnProject/${projectId}`;
    return this.datahandler.get(endPoint);
  }

}