import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { ModuleId } from '../models/module';
import { ModuleService } from '../services/module.service';

import {ModuleEditEvent, ReadMoreEvent} from '../cp-module-summary/cp-module-summary.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  modules: ModuleId[];

  animal: string;

  constructor(private readonly moduleService: ModuleService,
              private router: Router,
              private messageService: MessageService,
              ) { }

  ngOnInit() {
    this.moduleService.modules$.subscribe((data) => {
      console.log(`[app-page-home::ngInit] Received:`, data);
      this.modules = data;
    });
  }


  onModuleChanged(module: ModuleEditEvent) {
    console.log(`New Module: `);
  }

  onReadMoreClicked(readMoreEvent: ReadMoreEvent) {
    this.router.navigate(['module', readMoreEvent.module.id]);
  }


}

