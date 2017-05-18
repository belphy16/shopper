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
import { RemoveShopRecipeConfirmComponent } from './shop-recipe/dialogs/remove-shop-recipe-confirm/remove-shop-recipe-confirm.component';
import { RemoveShopItemConfirmComponent } from './shop-item/dialogs/remove-shop-item-confirm/remove-shop-item-confirm.component';
import { ShopItemRouteActivatorService } from './shop-item/shop-item-route-activator.service';
import { ShopRecipeRouteActivatorService } from './shop-recipe/shop-recipe-route-activator.service';

const routes: Routes = [
  { path: 'carts', component: ShopCartsComponent },
  { path: 'items', component: ShopItemsComponent, resolve: { items: ShopItemsResolverService } },
  { path: 'items/:id', component: ShopItemComponent, canActivate: [ ShopItemRouteActivatorService ] ,canDeactivate: [ 'canDeactivateItemComponent' ] },
  { path: 'recipes', component: ShopRecipesComponent },
  { path: 'recipes/:id', component: ShopRecipeComponent, canActivate: [ ShopRecipeRouteActivatorService ], canDeactivate: [ 'canDeactivateRecipeComponent' ] },
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
    RemoveShopRecipeConfirmComponent,
    RemoveShopItemConfirmComponent,
  ],
  providers: [
    ShopItemsService,
    ShopRecipesService,
    ShopCartsService,
    ShopItemRouteActivatorService,
    ShopRecipeRouteActivatorService,
    ShopItemsResolverService,
    {
      provide: 'canDeactivateRecipeComponent',
      useValue: checkRemovingRecipe

    },
    {
      provide: 'canDeactivateItemComponent',
      useValue: checkRemovingItem

    }
  ],
  entryComponents: [
    AddItemToCartComponent,
    AddRecipeToCartComponent,
    AddNewItemComponent,
    AddNewRecipeComponent,
    RemoveShopRecipeConfirmComponent,
    RemoveShopItemConfirmComponent,
  ]
})
export class ShopModule { }

export { routes };


// Todo: move this out of module
import { MdDialogRef } from '@angular/material';

function checkRemovingRecipe(component: ShopRecipeComponent) {
  if (!component.itemToBeRemoved) {
    return true;
  }
  return component.openRemoveConfirmationDialog().afterClosed();
}

function checkRemovingItem(component: ShopItemComponent) {
  if (!component.itemToBeRemoved) {
    return true;
  }
  return component.openRemoveConfirmationDialog().afterClosed();
}


