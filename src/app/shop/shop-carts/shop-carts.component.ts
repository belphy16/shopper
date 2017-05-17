import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { AddItemToCartComponent } from './dialogs/add-item-to-cart/add-item-to-cart.component';
import { AddRecipeToCartComponent } from './dialogs/add-recipe-to-cart/add-recipe-to-cart.component';

import { IShopItem } from '../shop-item/shop-item';
import { ShopCartsService } from '../shop-carts/shop-carts.service';

@Component({
  templateUrl: './shop-carts.component.html',
  styleUrls: ['./shop-carts.component.scss']
})
export class ShopCartsComponent implements OnInit {
  cartItems: IShopItem[];
  isShopping: boolean = false;

  constructor(public _dialogService: MdDialog, private _shopCartsService: ShopCartsService) { }

  ngOnInit() {
    this.cartItems = this._shopCartsService.getCartItems();
  }

  toggleShopMode() {
    this.isShopping = !this.isShopping;
  }

  openItemsDialog() {
    const dialogRef: MdDialogRef<AddItemToCartComponent> = this._dialogService.open(AddItemToCartComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(items => {
       this._shopCartsService.addCartItems(items);
    });
  }

  openRecipesDialog() {
    const dialogRef: MdDialogRef<AddRecipeToCartComponent> = this._dialogService.open(AddRecipeToCartComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(items => {
      this._shopCartsService.addCartItems(items);
    });
  }

  incrementItem(itemId: number) {
    this._shopCartsService.incrementItem(itemId);
  }

  decrementItem(itemId: number) {
    this._shopCartsService.decrementItem(itemId);
  }

  toggleAddedToCart(item: IShopItem) {
    if (this.isShopping) {
      item.addedToCart = !item.addedToCart;
    }
  }

}
