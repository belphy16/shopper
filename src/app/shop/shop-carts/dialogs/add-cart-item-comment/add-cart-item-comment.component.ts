import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

import { IShopItem } from '../../../shop-item/shop-item';

@Component({
  selector: 'app-add-cart-item-comment',
  templateUrl: './add-cart-item-comment.component.html',
  styleUrls: ['./add-cart-item-comment.component.scss']
})
export class AddCartItemCommentComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public item: IShopItem,
              public _dialogRef: MdDialogRef<AddCartItemCommentComponent>) { }

  ngOnInit() {
  }

  confirm() {
    this._dialogRef.close(true);
  }

  clearComment() {
    this.item.comment = '';
  }
}
