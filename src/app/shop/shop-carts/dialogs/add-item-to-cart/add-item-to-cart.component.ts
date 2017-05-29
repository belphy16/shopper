import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { IShopItem } from '../../../shop-item/shop-item';
import { IShopItemCategory } from '../../../shop-item/shop-item-category';
import { ShopItemsService } from '../../../shop-items/shop-items.service';

@Component({
  selector: 'shop-add-item-to-cart',
  templateUrl: './add-item-to-cart.component.html',
  styleUrls: ['./add-item-to-cart.component.scss']
})
export class AddItemToCartComponent implements OnInit {
  items: IShopItem[];
  filteredItems: IShopItem[];
  categories: IShopItemCategory[];
  errorMessage: string;

  constructor(public _dialogRef: MdDialogRef<AddItemToCartComponent>, private _shopItemsService: ShopItemsService) { }

  ngOnInit() {
    this._shopItemsService
      .getItemCategories()
      .subscribe(categories => this.categories = categories);

    this._shopItemsService
      .getItems()
      .subscribe((items) => {
        this.items = items.map(item => Object.assign({ count: 0 }, item));
        this.filteredItems = this.items.slice(0).sort(this._shopItemsService.sortAlphabeticallyDesc);
      },
      error => this.errorMessage = <any>error);
  }

  closeDialog() {
    this._dialogRef.close(this.items.filter(item => item.count));
  }

  incrementItem(itemId: number) {
    this.items.find(item => item.id === itemId).count += 1;
  }

  decrementItem(itemId: number) {
    this.items.find(item => item.id === itemId).count -= 1;
  }

  filterById(categoryIdAsString: string) {
    const categoryId: number = parseInt(categoryIdAsString, 10);
    if ( categoryId === -1) { // all
      this.filteredItems = this.items.slice(0).sort(this._shopItemsService.sortAlphabeticallyDesc);
    } else {
      this.filteredItems = this.items.filter(item => item.category.id === categoryId).sort(this._shopItemsService.sortAlphabeticallyDesc);
    }
  }
}
