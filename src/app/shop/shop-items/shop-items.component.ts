import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { AddNewItemComponent } from './dialogs/add-new-item/add-new-item.component';
import { IShopItem } from '../shop-item/shop-item';
import { ShopItemsService } from '../shop-items/shop-items.service';

@Component({
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.scss']
})
export class ShopItemsComponent implements OnInit {
  items: IShopItem[];
  errorMessage: string;

  constructor(private _shopItemsService: ShopItemsService,
              private _activatedRoute: ActivatedRoute,
              public _dialogService: MdDialog) {
  }

  ngOnInit() {
    this.items = this._activatedRoute.snapshot.data['items'].sort(this._shopItemsService.sortAlphabeticallyDesc);
  }

  openAddItemDialog() {
    const dialogRef: MdDialogRef<AddNewItemComponent> = this._dialogService.open(AddNewItemComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe((item: IShopItem) => {
      this.items.push(item);
    });
  }

}
