
import { NgModule } from '@angular/core';
import { RatingModule} from 'primeng/rating';
import { ButtonModule} from 'primeng/button';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
@NgModule({

    imports: [RatingModule, ButtonModule, TriStateCheckboxModule],
    exports: [RatingModule, ButtonModule, TriStateCheckboxModule],
  })
  export class PrimeNGModule { }
