import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopListsComponent } from './shop-lists/shop-lists.component';
import { ShopRecipesComponent } from './shop-recipes/shop-recipes.component';
import { ShopItemsComponent } from './shop-items/shop-items.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'lists', component: ShopListsComponent },
      { path: 'items', component: ShopItemsComponent },
      { path: 'recipes', component: ShopRecipesComponent },
    ]),
  ],
  declarations: [ShopListsComponent, ShopRecipesComponent, ShopItemsComponent]
})
export class ShopModule { }
