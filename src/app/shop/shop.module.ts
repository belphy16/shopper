import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule, MdDialogRef } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { ShopCartsComponent } from './shop-carts/shop-carts.component';
import { AddItemToCartComponent } from './shop-carts/dialogs/add-item-to-cart/add-item-to-cart.component';
import { AddRecipeToCartComponent } from './shop-carts/dialogs/add-recipe-to-cart/add-recipe-to-cart.component';
import { ShopRecipesComponent } from './shop-recipes/shop-recipes.component';
import { ShopRecipeComponent } from './shop-recipe/shop-recipe.component';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ShopItemExistsValidator } from './shop-item/shop-item-exists.validator';
import { PageNotFoundComponent } from './errors/404/404.component';

import { ConstantsService } from './constants.service';
import { ShopItemsService } from './shop-items/shop-items.service';
import { ShopItemsResolverService } from './shop-items/shop-items-resolver.service';
import { ShopRecipesService } from './shop-recipes/shop-recipes.service';
import { ShopCartsService } from './shop-carts/shop-carts.service';
import { AddNewItemComponent } from './shop-items/dialogs/add-new-item/add-new-item.component';
import { AddNewRecipeComponent } from './shop-recipes/dialogs/add-new-recipe/add-new-recipe.component';
import { RemoveShopRecipeConfirmComponent } from './shop-recipe/dialogs/remove-shop-recipe-confirm/remove-shop-recipe-confirm.component';
import { RemoveShopItemConfirmComponent } from './shop-item/dialogs/remove-shop-item-confirm/remove-shop-item-confirm.component';
import { ShopItemRouteActivatorService, checkRemovingItem } from './shop-item/shop-item-route-activator.service';
import { ShopRecipeRouteActivatorService, checkRemovingRecipe } from './shop-recipe/shop-recipe-route-activator.service';
import { ClearCartComponent } from './shop-carts/dialogs/clear-cart/clear-cart.component';
import { RemoveShopItemDenialComponent } from './shop-item/dialogs/remove-shop-item-denial/remove-shop-item-denial.component';
import { AddCartItemCommentComponent } from './shop-carts/dialogs/add-cart-item-comment/add-cart-item-comment.component';

const routes: Routes = [
  { path: 'carts', component: ShopCartsComponent },
  { path: 'items', component: ShopItemsComponent, resolve: { items: ShopItemsResolverService } },
  { path: 'items/:id', component: ShopItemComponent, canActivate: [ ShopItemRouteActivatorService ], canDeactivate: [ 'canDeactivateItemComponent' ] },
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
    ShopItemExistsValidator,
    AddNewRecipeComponent,
    PageNotFoundComponent,
    RemoveShopRecipeConfirmComponent,
    RemoveShopItemConfirmComponent,
    ClearCartComponent,
    RemoveShopItemDenialComponent,
    AddCartItemCommentComponent,
  ],
  providers: [
    ConstantsService,
    ShopItemsService,
    ShopRecipesService,
    ShopCartsService,
    ShopItemRouteActivatorService,
    ShopRecipeRouteActivatorService,
    // ShopItemsResolverService,
    { provide: ShopItemsResolverService, useClass: ShopItemsResolverService }, // longhand
    {
      provide: 'canDeactivateRecipeComponent',
      useValue: checkRemovingItem

    },
    {
      provide: 'canDeactivateItemComponent',
      useValue: checkRemovingRecipe

    }
  ],
  entryComponents: [
    AddItemToCartComponent,
    AddRecipeToCartComponent,
    AddNewItemComponent,
    AddNewRecipeComponent,
    RemoveShopRecipeConfirmComponent,
    RemoveShopItemConfirmComponent,
    ClearCartComponent,
    RemoveShopItemDenialComponent,
    AddCartItemCommentComponent,
  ]
})
export class ShopModule { }

export { routes };
