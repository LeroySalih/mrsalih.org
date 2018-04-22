import { Component, OnInit } from '@angular/core';
import { ModuleId } from '../models/module';
import { ModuleService } from '../services/module.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-page-module',
  templateUrl: './page-module.component.html',
  styleUrls: ['./page-module.component.css']
})
export class PageModuleComponent implements OnInit {

  moduleId = 'Not Set';

  constructor(
      private route: ActivatedRoute,
      private readonly moduleService: ModuleService) { }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.moduleId = paramMap['params']['id'];

    });

    /*
    this.moduleService.modules$.subscribe((data) => {
      console.log(`[app-component::ngInit] Received:`, data);
      this.modules = data;
    });
    */
  }

}
