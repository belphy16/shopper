import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { AddItemToCartComponent } from './dialogs/add-item-to-cart/add-item-to-cart.component';
import { AddRecipeToCartComponent } from './dialogs/add-recipe-to-cart/add-recipe-to-cart.component';
import { ClearCartComponent } from './dialogs/clear-cart/clear-cart.component';
import { AddCartItemCommentComponent } from './dialogs/add-cart-item-comment/add-cart-item-comment.component';

import { IShopItem } from '../shop-item/shop-item';
import { IShopItemCategory } from '../shop-item/shop-item-category';
import { ShopCartsService } from '../shop-carts/shop-carts.service';

@Component({
  templateUrl: './shop-carts.component.html',
  styleUrls: ['./shop-carts.component.scss']
})
export class ShopCartsComponent implements OnInit {
  cartItems: IShopItem[] = [];
  categories: IShopItemCategory[];
  cartItemsPerCategory: Object;
  isShopping = false;

  constructor(public _dialogService: MdDialog,
              private _shopCartsService: ShopCartsService) { }

  ngOnInit() {
    this._shopCartsService
    .getCartItems()
    .subscribe((items: IShopItem[]) => {
      this.cartItems = items;
      this.sortByCategory(this.cartItems);
    });
  }

  toggleShopMode() {
    if (!this.isShopping) {
      this._shopCartsService
      .saveCartItems(this.cartItems)
      .subscribe((items: IShopItem[]) => {
        this.cartItems = items;
        this.sortByCategory(this.cartItems);
      });
    }

    this.isShopping = !this.isShopping;
  }

  clearCart() {
    const dialogRef: MdDialogRef<ClearCartComponent> = this._dialogService.open(ClearCartComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(status => {
      if (status === 200) {
        this.cartItems = [];
        this.sortByCategory(this.cartItems);
      }
    });
  }

  openItemsDialog() {
    const dialogRef: MdDialogRef<AddItemToCartComponent> = this._dialogService.open(AddItemToCartComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(items => {
      this.addItemToCart(items);
    });
  }

  openRecipesDialog() {
    const dialogRef: MdDialogRef<AddRecipeToCartComponent> = this._dialogService.open(AddRecipeToCartComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(items => {
      this.addItemToCart(items);

    });
  }

  openCommentsDialog(itemId: number) {
    const cartItem: IShopItem = this.cartItems.find(item => item.id === itemId);
    const dialogRef: MdDialogRef<AddCartItemCommentComponent> = this._dialogService.open(AddCartItemCommentComponent, {
      width: '600px',
      data: cartItem
    });
    // dialogRef.afterClosed().subscribe((comment: string) => {
    //   if (comment) {
    //     cartItem.comment = comment;
    //   }
    // });
  }

  addItemToCart(items) {
    if (!items) return this.cartItems;

    items.forEach((item: IShopItem) => {
      const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);

      if (cartItem) {
        cartItem.count += item.count;
      } else {
        item.comment = '';
        this.cartItems.push(item);
      }
    });

    this.sortByCategory(this.cartItems);
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

    this.sortByCategory(this.cartItems);
  }

  toggleAddedToCart(item: IShopItem) {
    if (this.isShopping) {
      item.addedToCart = !item.addedToCart;
    }
  }

  sortByCategory(items: IShopItem[]) {
    const categoriesUnsorted = _.uniqBy(this.cartItems, item => item.category.id).map(item => item.category);
    this.categories = _.sortBy(categoriesUnsorted, [(category: IShopItemCategory) => category.name.toLowerCase()]);
    this.cartItemsPerCategory = _.groupBy(this.cartItems, 'category.name');
  }

}
