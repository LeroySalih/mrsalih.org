import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModuleService } from './services/module.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Module, ModuleId} from './models/module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'app';
  modulesSub: Subscription;
  modules: ModuleId[];

  constructor(private moduleService: ModuleService) {

  }

  ngOnInit() {
    console.log(`[app-component::ngInit] Called`);
  }

  ngOnDestroy() {
    this.modulesSub.unsubscribe();
  }
}
