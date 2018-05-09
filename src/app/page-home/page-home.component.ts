import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { ModuleId } from '../models/module';
import { ModuleService } from '../services/module.service';

import {ModuleEditEvent, ReadMoreEvent} from '../cp-module-summary/cp-module-summary.component';

import { MatDialog, MatDialogConfig } from '@angular/material';

import { ModuleDialogComponent} from '../module-dialog/module-dialog.component';

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
              private matDialog: MatDialog,
              private messageService: MessageService,
              ) { }

  ngOnInit() {
    this.moduleService.modules$.subscribe((data) => {
      console.log(`[app-page-home::ngInit] Received:`, data);
      this.modules = data;
    });
  }

  onReadMoreClicked(readMoreEvent: ReadMoreEvent) {
    this.router.navigate(['module', readMoreEvent.module.id]);
  }

  onNewModule () {
    this.onModuleChanged({ module: null} as ModuleEditEvent);
  }

  onModuleChanged(module: ModuleEditEvent) {
    console.log(`[onModuleChanged]`, module);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = module;

    const dialogRef = this.matDialog.open(ModuleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        (data) => {
          console.log('Dialog output:', data);
          if (data) {
            this.moduleService.saveModule(data as ModuleId)
            .then(() => {
                this.messageService.add(
                  {severity: 'success', summary: 'Module Saved'}
                );
              });
          }

        }
    );
  }


}

