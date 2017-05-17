import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { AddNewRecipeComponent } from './dialogs/add-new-recipe/add-new-recipe.component';

import { IShopRecipe } from '../shop-recipe/shop-recipe';
import { ShopRecipesService } from './shop-recipes.service';

@Component({
  templateUrl: './shop-recipes.component.html',
  styleUrls: ['./shop-recipes.component.scss']
})
export class ShopRecipesComponent {
  items: IShopRecipe[];
  errorMessage: string;

  constructor(private _shopRecipesService: ShopRecipesService, public _dialogService: MdDialog) { }

  ngOnInit() {
    this._shopRecipesService
      .getItems()
      .subscribe((items) => this.items = items,
                  error => this.errorMessage = <any>error);
  }

  openAddRecipeDialog() {
    const dialogRef: MdDialogRef<AddNewRecipeComponent> = this._dialogService.open(AddNewRecipeComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe((item: IShopRecipe) => {
      this.items.push(item);
    });
  }
}
