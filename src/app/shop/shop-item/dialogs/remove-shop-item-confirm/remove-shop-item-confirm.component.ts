import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ShopItemComponent } from '../../shop-item.component';

import { IShopItem } from '../../shop-item';
import { ShopItemsService } from '../../../shop-items/shop-items.service';

@Component({
  templateUrl: './remove-shop-item-confirm.component.html',
  styleUrls: ['./remove-shop-item-confirm.component.scss']
})
export class RemoveShopItemConfirmComponent implements OnInit, OnDestroy {

  constructor(private _shopItemsService: ShopItemsService,
                @Inject(MD_DIALOG_DATA) public data: ShopItemComponent,
                public _dialogRef: MdDialogRef<RemoveShopItemConfirmComponent>) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.data.itemToBeRemoved = undefined;
  }

  confirm() {
    this._shopItemsService.removeItem(this.data.activeItem)
    .subscribe((itemId: number) => this._dialogRef.close(true));
  }

  cancel() {
    this._dialogRef.close(false);
  }

}
