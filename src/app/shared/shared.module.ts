import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpacerComponent } from './spacer/spacer.component';
import { UtilsService } from './utils.service';


@NgModule({
  imports: [],
  exports: [
    CommonModule,
    FormsModule,
    SpacerComponent,
  ],
  declarations: [
    SpacerComponent
  ],
  providers: [
    UtilsService
  ]
})
export class SharedModule { }
