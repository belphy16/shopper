import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ShopCartsService } from '../../../shop-carts/shop-carts.service';

@Component({
  selector: 'app-clear-cart',
  templateUrl: './clear-cart.component.html',
  styleUrls: ['./clear-cart.component.scss']
})
export class ClearCartComponent implements OnInit {

  constructor(private _shopCartsService: ShopCartsService,
              public _dialogRef: MdDialogRef<ClearCartComponent>
              ) { }

  ngOnInit() {
  }

  confirm() {
    this._shopCartsService
      .clearCartItems()
      .subscribe((status: number) => this._dialogRef.close(status));
  }

  cancel() {
    this._dialogRef.close(false);
  }
}
