import { Injectable } from '@angular/core';

import { IShopItem } from '../shop-item/shop-item';

@Injectable()
export class ShopCartsService {
  cartItems: IShopItem[] = [];

  constructor() { }

  getCartItems() {
    return this.cartItems;
  }

  addCartItems(items) {
    if (!items) return this.cartItems;

    items.forEach(item => {
      const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);

      if (cartItem) {
        cartItem.count += item.count;
      } else {
        this.cartItems.push(item);
      }
    });

    return this.cartItems
  }

  incrementItem(itemId: number) {
    this.cartItems.find(item => item.id === itemId).count += 1;
  }

  decrementItem(itemId: number) {
    const itemIndex = this.cartItems.findIndex(item => item.id === itemId);
    const item = this.cartItems[itemIndex];

    if (item.count > 1) {
      item.count -= 1;
    } else {
      this.cartItems.splice(itemIndex, 1);
    }
  }

}
