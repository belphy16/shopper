import { Component, OnInit } from '@angular/core';

import { IShopItem } from './shop-item';
import { ShopItemsService } from './shop-items.service';

@Component({
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.scss']
})
export class ShopItemsComponent implements OnInit {
  items: IShopItem[];
  errorMessage: string;

  constructor(private _shopItemsService: ShopItemsService) { }

  ngOnInit() {
    this._shopItemsService
      .getItems()
      .subscribe((items) => this.items = items,
                  error => this.errorMessage = <any>error);
  }

  showItemId(itemId) {
    console.log(`item id: ${itemId}`);
  }

}
