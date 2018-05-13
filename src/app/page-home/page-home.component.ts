import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { Module } from '../models/module';
import { ModuleService } from '../services/module.service';

import {ModuleEvent} from '../cp-module-summary/cp-module-summary.component';

import { MatDialog, MatDialogConfig } from '@angular/material';

import { ModuleDialogComponent} from '../dialogs/module-dialog/module-dialog.component';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  modules: Module[];

  animal: string;

  constructor(private readonly moduleService: ModuleService,
              private router: Router,
              private matDialog: MatDialog,
              private messageService: MessageService,
              ) { }

  ngOnInit() {
    this.moduleService.getModules().subscribe((data: Module[]) => {
      console.log(`[app-page-home::ngInit] Received:`, data);
      this.modules = data;
    });
  }

  readMoreClicked(module: Module) {
    this.router.navigate(['module', module.id]);
  }

  onModuleChanged (event: ModuleEvent) {
    console.log(`[onModuleChanged] `, event);
    switch (event.type) {
      case 'READ' : this.readMoreClicked(event.module); break;
      case 'NEW': this.moduleNew(); break;
      case 'EDIT': this.moduleChanged(event.module); break;
      case 'DELETE' : this.moduleDelete(event.module); break;

    }
  }

  moduleNew () {
    console.log(`[moduleNew]`, module);
    this.moduleChanged(null as Module);
  }

  moduleChanged(module: Module) {
    console.log(`[moduleChanged]`, module);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = module;

    const dialogRef = this.matDialog.open(ModuleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        (data) => {
          console.log('Dialog output:', data);
          if (data) {
            this.moduleService.saveModule(data as Module)
            .then(() => {
                this.messageService.add(
                  {severity: 'success', summary: 'Module Saved'}
                );
              });
          }

        }
    );
  }

  moduleDelete(module: Module) {
    console.log(`[moduleDelete] called`, module);
    this.moduleService.deleteModule(module)
        .then(() => {
          this.messageService.add({severity: 'success', summary: 'module deleted'});
        });
  }


}

