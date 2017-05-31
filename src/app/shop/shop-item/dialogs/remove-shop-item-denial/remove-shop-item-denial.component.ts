import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

import { IShopRecipe } from '../../../shop-recipe/shop-recipe';

@Component({
  selector: 'app-remove-shop-item-denial',
  templateUrl: './remove-shop-item-denial.component.html',
  styleUrls: ['./remove-shop-item-denial.component.scss']
})
export class RemoveShopItemDenialComponent implements OnInit {
  message: string;
  recipes: IShopRecipe[] = [];

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public _dialogRef: MdDialogRef<RemoveShopItemDenialComponent>) {
    this.message = this.data.message;
    this.recipes = this.data.recipes;
  }

  ngOnInit() {
  }

  agree() {
    this._dialogRef.close(false);
  }
}
