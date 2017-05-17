 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';

/* Feature Modules */
// import { MaterialModule } from './material/material.module';
import { ShopModule } from './shop/shop.module';

// Some ngMaterial components rely on HammerJS for gestures.
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'carts', pathMatch: 'full' },
      { path: '**', redirectTo: 'carts', pathMatch: 'full' }
    ]),
    ShopModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
