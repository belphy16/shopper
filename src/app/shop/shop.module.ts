import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

import { ShopCartsComponent } from './shop-carts/shop-carts.component';
import { AddItemToCartComponent } from './shop-carts/dialogs/add-item-to-cart/add-item-to-cart.component';
import { AddRecipeToCartComponent } from './shop-carts/dialogs/add-recipe-to-cart/add-recipe-to-cart.component';
import { ShopRecipesComponent } from './shop-recipes/shop-recipes.component';
import { ShopRecipeComponent } from './shop-recipe/shop-recipe.component';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { PageNotFoundComponent } from './errors/404/404.component';

import { ShopItemsService } from './shop-items/shop-items.service';
import { ShopItemsResolverService } from './shop-items/shop-items-resolver.service';
import { ShopRecipesService } from './shop-recipes/shop-recipes.service';
import { ShopCartsService } from './shop-carts/shop-carts.service';
import { AddNewItemComponent } from './shop-items/dialogs/add-new-item/add-new-item.component';
import { AddNewRecipeComponent } from './shop-recipes/dialogs/add-new-recipe/add-new-recipe.component';
import { ShopItemRouteActivatorService } from './shop-item/shop-item-route-activator.service';
import { ShopRecipeRouteActivatorService } from './shop-recipe/shop-recipe-route-activator.service';

const routes: Routes = [
  { path: 'carts', component: ShopCartsComponent },
  { path: 'items', component: ShopItemsComponent, resolve: { items: ShopItemsResolverService } },
  { path: 'items/:id', component: ShopItemComponent, canActivate: [ ShopItemRouteActivatorService ] },
  { path: 'recipes', component: ShopRecipesComponent },
  { path: 'recipes/:id', component: ShopRecipeComponent, canActivate: [ ShopRecipeRouteActivatorService ] },
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ShopCartsComponent,
    ShopRecipesComponent,
    ShopItemsComponent,
    ShopItemComponent,
    AddItemToCartComponent,
    AddRecipeToCartComponent,
    ShopRecipeComponent,
    AddNewItemComponent,
    AddNewRecipeComponent,
    PageNotFoundComponent,
  ],
  providers: [
    ShopItemsService,
    ShopRecipesService,
    ShopCartsService,
    ShopItemRouteActivatorService,
    ShopRecipeRouteActivatorService,
    ShopItemsResolverService,
  ],
  entryComponents: [
    AddItemToCartComponent,
    AddRecipeToCartComponent,
    AddNewItemComponent,
    AddNewRecipeComponent,
  ]
})
export class ShopModule { }

export { routes };
