
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({

    imports: [MatButtonModule, MatCardModule, MatInputModule, MatDividerModule, MatSelectModule, MatCheckboxModule],
    exports: [MatButtonModule, MatCardModule, MatInputModule, MatDividerModule, MatSelectModule, MatCheckboxModule],
  })
  export class MaterialModule { }
