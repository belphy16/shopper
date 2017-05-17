import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { SharedSpacerComponent } from './shared-spacer/shared-spacer.component';

import { UtilsService } from './utils.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    SharedSpacerComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SharedSpacerComponent,
  ],
  providers: [
    UtilsService
  ]
})
export class SharedModule { }
