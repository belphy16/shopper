import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { IShopItem } from '../../../shop-item/shop-item';
import { IShopRecipe } from '../../../shop-recipe/shop-recipe';
import { ShopRecipesService } from '../../../shop-recipes/shop-recipes.service';

@Component({
  selector: 'app-add-recipe-to-cart',
  templateUrl: './add-recipe-to-cart.component.html',
  styleUrls: ['./add-recipe-to-cart.component.scss']
})
export class AddRecipeToCartComponent implements OnInit {
  recipes: IShopRecipe[];
  errorMessage: string;

  constructor(public _dialogRef: MdDialogRef<AddRecipeToCartComponent>, private _shopRecipesService: ShopRecipesService) { }

  ngOnInit() {
    this._shopRecipesService
      .getItems()
      .subscribe((recipes) => this.recipes = recipes.map(recipe => Object.assign({ count: 0 }, recipe)),
      error => this.errorMessage = <any>error);
  }

  closeDialog() {
    const resultingItems: IShopItem[] = this.recipes
      .filter(recipe => recipe.count)
      .reduce((acc, curr) => {
        curr.items.map(item => {
          return item;
        });
        acc.push(...curr.items);
        return acc;
      }, []);

    this._dialogRef.close(resultingItems);
  }

  incrementRecipe(recipeId: number) {
    this.recipes.find(recipe => recipe.id === recipeId).count += 1;
  }

  decrementRecipe(recipeId: number) {
    this.recipes.find(recipe => recipe.id === recipeId).count -= 1;
  }

}
