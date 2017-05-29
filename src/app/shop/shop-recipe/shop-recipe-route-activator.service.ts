import { Injectable } from '@angular/core';

import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { ShopRecipeComponent } from '../shop-recipe/shop-recipe.component';
import { ShopRecipesService } from '../shop-recipes/shop-recipes.service';

@Injectable()
export class ShopRecipeRouteActivatorService implements CanActivate {

  constructor(private _shopRecipesService: ShopRecipesService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this._shopRecipesService
      .getItem(+route.params['id'])
      .map(item => {
        if (!item) {
          this._router.navigate(['/404']);
        }

        return !!item;
      });
  }
}

export function checkRemovingRecipe(component: ShopRecipeComponent) {
  if (!component.itemToBeRemoved) {
    return true;
  }
  return component.openRemoveConfirmationDialog().afterClosed();
}
