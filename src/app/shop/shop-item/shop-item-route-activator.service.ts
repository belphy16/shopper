import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { ShopItemComponent } from '../shop-item/shop-item.component';
import { ShopItemsService } from '../shop-items/shop-items.service';

@Injectable()
export class ShopItemRouteActivatorService implements CanActivate {

  constructor(private _shopItemsService: ShopItemsService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this._shopItemsService
      .getItem(+route.params['id'])
      .map(item => {
        if (!item) {
          this._router.navigate(['/404']);
        }

        return !!item;
      });
  }
}

export function checkRemovingItem(component: ShopItemComponent) {
  if (!component.itemToBeRemoved) {
    return true;
  }
  return component.openRemoveConfirmationDialog().afterClosed();
}
