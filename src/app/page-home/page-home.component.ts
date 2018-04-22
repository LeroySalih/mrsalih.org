import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { ModuleId } from '../models/module';
import { ModuleService } from '../services/module.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  modules: ModuleId[];

  constructor(private readonly moduleService: ModuleService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.moduleService.modules$.subscribe((data) => {
      console.log(`[app-page-home::ngInit] Received:`, data);
      this.modules = data;
    });
  }

  OnReadMoreClick(data: ModuleId) {
    console.log(`[page-home::OnReadMore] Clicked`, data);
    this.router.navigate(['module', data.id]);
  }

}
