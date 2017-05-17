import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { IShopItem } from '../../../shop-item/shop-item';
import { ShopItemsService } from '../../../shop-items/shop-items.service';


@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.scss']
})
export class AddNewItemComponent implements OnInit {

  constructor(public _dialogRef: MdDialogRef<AddNewItemComponent>, private _shopItemsService: ShopItemsService) { }

  ngOnInit() {
  }

  addItem(formValues) {
    this._shopItemsService
      .addItem(formValues.name, formValues.category)
      .subscribe((item: IShopItem) => this._dialogRef.close(item));
  }
}
