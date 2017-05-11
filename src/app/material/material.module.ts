import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdIconModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdIconModule,
  ]
})
export class MaterialModule { }
