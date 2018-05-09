import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModuleId } from '../models/module';

export class  ModuleEditEvent {
  module: ModuleId;
}

export class ReadMoreEvent {
  module: ModuleId;
}

@Component({
  selector: 'app-cp-module-summary',
  templateUrl: './cp-module-summary.component.html',
  styleUrls: ['./cp-module-summary.component.css']
})
export class CpModuleSummaryComponent implements OnInit {

  @Input()
  module: ModuleId;

  @Input()
  readOnly: boolean;

  @Output()
  moduleEdit: EventEmitter<ModuleEditEvent>;

  @Output()
  readMore: EventEmitter<ReadMoreEvent>;

  constructor() {
    this.moduleEdit = new EventEmitter<ModuleEditEvent>();
    this.readMore = new EventEmitter<ReadMoreEvent>();
   }

  ngOnInit() {
  }

  OnReadMoreClick(data: ModuleId) {
    this.readMore.emit({module: this.module});
    console.log('[OnReadMore] sending: ', {module: this.module});
    // this.router.navigate(['module', data.id]);
  }


  OnEditModuleClick(module: ModuleId) {
    this.moduleEdit.emit({module: module});
    console.log('[OnReadMore] sending: ', {module: this.module});
  }

}
