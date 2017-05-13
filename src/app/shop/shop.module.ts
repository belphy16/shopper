import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ShopListsComponent } from './shop-lists/shop-lists.component';
import { ShopRecipesComponent } from './shop-recipes/shop-recipes.component';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import { ShopItemsService } from './shop-items/shop-items.service';

const routes: Routes = [
  { path: 'lists', component: ShopListsComponent },
  { path: 'items', component: ShopItemsComponent },
  { path: 'recipes', component: ShopRecipesComponent },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ShopListsComponent,
    ShopRecipesComponent,
    ShopItemsComponent,
  ],
  providers: [
    ShopItemsService,
  ]
})
export class ShopModule { }

export { routes };
