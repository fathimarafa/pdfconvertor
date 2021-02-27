import { Component, OnInit } from '@angular/core';
import { ModuleMetadataService } from '../../../services/module-metadata/module.metadata.service';

@Component({
  selector: 'app-module-default',
  templateUrl: './module-default.component.html',
  styleUrls: ['./module-default.component.css']
})
export class ModuleDefaultComponent implements OnInit {
  
  module;

  constructor(private moduleMetadataService: ModuleMetadataService) {}

  ngOnInit(): void {
    this.moduleMetadataService.getModuleMetadata().then(res => {
      this.module = res;
    });
  }
  
}
