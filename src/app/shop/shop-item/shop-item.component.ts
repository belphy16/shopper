import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { IShopItem } from './shop-item';
import { IShopItemCategory } from '../shop-item/shop-item-category';
import { ShopItemsService } from '../shop-items/shop-items.service';

import { RemoveShopItemConfirmComponent } from '../shop-item/dialogs/remove-shop-item-confirm/remove-shop-item-confirm.component';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {
  nameFormControl: FormControl;
  categoryFormControl: FormControl;
  activeItem: IShopItem;
  itemToBeRemoved: IShopItem;
  items: IShopItem[] = [];
  editItemForm: FormGroup;
  errorMessage: string;
  isEditing = false;
  categories: IShopItemCategory[];
  filteredCategories: Observable<IShopItemCategory[]>;

  constructor(private _router: Router,
                private _route: ActivatedRoute,
                public _dialogService: MdDialog,
                private _shopItemsService: ShopItemsService) { }

  ngOnInit() {
    this._shopItemsService
      .getItems()
      .subscribe((items: IShopItem[]) => {
        this.items = items;
      },
      error => this.errorMessage = <any>error);

    this._shopItemsService
      .getItem(+this._route.snapshot.params['id'])
      .subscribe((item) => {
        this.activeItem = item;

        this.nameFormControl = new FormControl(this.activeItem.name, [Validators.required, this.itemExists.bind(this)]);
        this.categoryFormControl = new FormControl(this.activeItem.category.name, [Validators.required]);
        this.editItemForm = new FormGroup({
          name: this.nameFormControl,
          category: this.categoryFormControl
        });
        this._shopItemsService
          .getItemCategories()
          .subscribe(categories => this.categories = categories);

        this.filteredCategories = this.categoryFormControl.valueChanges
           .startWith(null)
           .map(val => {
             if (val) {
               return this.filter(val);
             } else if (this.categories) {
               return this.categories.filter(category => category.id === this.activeItem.category.id);
             }
           });
      },
      error => this.errorMessage = <any>error); ;
  }

  itemExists(control: FormControl): { [ key: string ]: any } {
    if (control.value.trim().toLowerCase() === this.activeItem.name.trim().toLowerCase()) {
      return null;
    }

    const itemFound = this.items.find(item => item.name.trim().toLowerCase() === control.value.trim().toLowerCase());
    return itemFound ? { 'itemExists': 'Item already exists' } : null;
   }

  editItem(formValues) {
    this.activeItem.name = formValues.name;
    if (this.activeItem.category.name !== formValues.category) {
      const categoryFound = this.categories.find(category => category.name === formValues.category);
      if (categoryFound) {
        this.activeItem.category = categoryFound;
      } else {
        this.activeItem.category.name = formValues.category;
        this.activeItem.category.id = Math.max(...this.categories.map(category => category.id)) + 1;
      }
    }

    this._shopItemsService
      .editItem(this.activeItem)
      .subscribe((item: IShopItem) => this.isEditing = false);
  }

  filter(val: string): IShopItemCategory[] {
    return this.categories.filter(category => new RegExp(`^${val}`, 'gi').test(category.name));
  }

  removeItem() {
    this.itemToBeRemoved = this.activeItem;
    this._router.navigate(['/items']);
  }

  openRemoveConfirmationDialog(): MdDialogRef<RemoveShopItemConfirmComponent> {
    return this._dialogService.open(RemoveShopItemConfirmComponent, {
      width: '600px',
      data: this
    });
  }
}
