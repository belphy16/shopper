import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { IShopItem } from '../../../shop-item/shop-item';
import { IShopItemCategory } from '../../../shop-item/shop-item-category';
import { ShopItemsService } from '../../../shop-items/shop-items.service';


@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.scss']
})
export class AddNewItemComponent implements OnInit {
  nameFormControl: FormControl = new FormControl();
  categoryFormControl: FormControl = new FormControl();
  items: IShopItem[] = [];
  addItemForm: FormGroup;
  categories: IShopItemCategory[];
  filteredCategories: Observable<IShopItemCategory[]>;

  constructor(public _dialogRef: MdDialogRef<AddNewItemComponent>, private _shopItemsService: ShopItemsService) { }

  ngOnInit() {
    this._shopItemsService
      .getItems()
      .subscribe((items: IShopItem[]) => {
        this.items = items;
      });

    this._shopItemsService
      .getItemCategories()
      .subscribe(categories => this.categories = categories);

    this.addItemForm = new FormGroup({
      name: this.nameFormControl,
      category: this.categoryFormControl
    });

    this.filteredCategories = this.categoryFormControl.valueChanges
       .startWith(null)
       .map(val => {
         if (val) {
           return this.filter(val);
         } else if (this.categories) {
           return this.categories.slice();
         }
       });
  }

  addItem(formValues) {
    let itemId = Math.max(...this.items.map((item: IShopItem) => item.id)) + 1;
    itemId = itemId < 0 ? 1 : itemId;
    let category: IShopItemCategory = this.categories.find((category: IShopItemCategory) => formValues.category.trim().toLowerCase() === category.name.trim().toLowerCase());

    if (!category) {
      let categoryId = Math.max(...this.categories.map((category: IShopItemCategory) => category.id)) + 1;
      categoryId = categoryId < 0 ? 1 : categoryId;
      category = {
        id: categoryId,
        name: formValues.category
      };
    }
    this._shopItemsService
      .addItem(itemId, formValues.name, category)
      .subscribe((item: IShopItem) => this._dialogRef.close(item));
  }

  filter(val: string): IShopItemCategory[] {
    return this.categories.filter(category => new RegExp(`^${val}`, 'gi').test(category.name));
  }
}
