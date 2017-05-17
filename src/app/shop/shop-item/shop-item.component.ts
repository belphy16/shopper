import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShopItem } from './shop-item';
import { ShopItemsService } from '../shop-items/shop-items.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {
  item: IShopItem;
  errorMessage: string;

  constructor(private _shopItemsService: ShopItemsService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._shopItemsService
      .getItem(+this._route.snapshot.params['id'])
      .subscribe((item) => this.item = item,
                  error => this.errorMessage = <any>error);;
  }

}
