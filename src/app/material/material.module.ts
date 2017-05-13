import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MdButtonModule,
          MdIconModule,
          MdListModule,
          MdMenuModule,
          MdSidenavModule,
          MdToolbarModule
       } from '@angular/material';

@NgModule({
  imports: [],
  exports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdIconModule,
    MdListModule,
    MdMenuModule,
    MdSidenavModule,
    MdToolbarModule,
  ]
})
export class MaterialModule { }
