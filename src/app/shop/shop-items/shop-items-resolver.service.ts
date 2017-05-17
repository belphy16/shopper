import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ShopItemsService } from './shop-items.service';

@Injectable()
export class ShopItemsResolverService implements Resolve<any> {

  constructor(private _shopItemsService: ShopItemsService) { }

  resolve() {
    return this._shopItemsService.getItems().map(items => items);
  }

}
