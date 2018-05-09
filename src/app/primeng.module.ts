
import { NgModule } from '@angular/core';
import { RatingModule} from 'primeng/rating';
import { ButtonModule} from 'primeng/button';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {GrowlModule} from 'primeng/growl';
import {InplaceModule} from 'primeng/inplace';
import {EditorModule} from 'primeng/editor';
import {DialogModule} from 'primeng/dialog';

@NgModule({

    imports: [RatingModule, ButtonModule, TriStateCheckboxModule, GrowlModule,
      InplaceModule, EditorModule, DialogModule
    ],
    exports: [RatingModule, ButtonModule, TriStateCheckboxModule, GrowlModule,
      InplaceModule, EditorModule, DialogModule],
  })
  export class PrimeNGModule { }
