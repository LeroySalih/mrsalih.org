
import { NgModule } from '@angular/core';
import { RatingModule} from 'primeng/rating';
import { ButtonModule} from 'primeng/button';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {GrowlModule} from 'primeng/growl';
import {InplaceModule} from 'primeng/inplace';
import {EditorModule} from 'primeng/editor';
import {DialogModule} from 'primeng/dialog';
import {SplitButtonModule} from 'primeng/splitbutton';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({

    imports: [RatingModule, ButtonModule, TriStateCheckboxModule, GrowlModule,
      InplaceModule, EditorModule, DialogModule, SplitButtonModule, CheckboxModule
    ],
    exports: [RatingModule, ButtonModule, TriStateCheckboxModule, GrowlModule,
      InplaceModule, EditorModule, DialogModule, SplitButtonModule, CheckboxModule],
  })
  export class PrimeNGModule { }
