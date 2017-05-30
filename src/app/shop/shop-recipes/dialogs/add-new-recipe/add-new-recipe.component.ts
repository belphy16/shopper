import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MdDialogRef } from '@angular/material';

import { IShopItem } from '../../../shop-item/shop-item';
import { IShopRecipe } from '../../../shop-recipe/shop-recipe';
import { ShopItemsService } from '../../../shop-items/shop-items.service';
import { ShopRecipesService } from '../../../shop-recipes/shop-recipes.service';

@Component({
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.scss']
})
export class AddNewRecipeComponent implements OnInit {
  recipes: IShopRecipe[] = [];
  items: IShopItem[] = [];
  addRecipeForm: FormGroup;
  errorMessage: string;

  constructor(public _dialogRef: MdDialogRef<AddNewRecipeComponent>,
                private _shopRecipesService: ShopRecipesService,
                private _shopItemsService: ShopItemsService) { }

  ngOnInit() {
    const recipeNameControl = new FormControl('', [Validators.required, this.recipeExists.bind(this)]);

    this.addRecipeForm = new FormGroup({
      recipeName: recipeNameControl
    });

    this._shopItemsService
      .getItems()
      .subscribe((items: IShopItem[]) => this.items = items.map(item => Object.assign({ count: 0 }, item)).sort(this._shopItemsService.sortAlphabeticallyDesc),
      error => this.errorMessage = <any>error);
    this._shopRecipesService
      .getItems()
      .subscribe((items) => this.recipes = items.map(item => Object.assign({ count: 0 }, item)),
      error => this.errorMessage = <any>error);

  }

  recipeExists(control: FormControl): {[key: string]: any} {
    return this.recipes.find(recipe => recipe.name.trim().toLowerCase() === control.value.trim().toLowerCase()) ? { 'recipeExists': 'Recipe already exists' } : null;
  }

  itemSelected(): boolean {
    return !!this.items.filter(item => item.count).length;
  }

  incrementItem(item: IShopItem) {
    item.count += 1;
  }

  decrementItem(item: IShopItem) {
    if (item.count > 0) item.count -= 1;
  }

  addRecipe(formValues) {
    let recipeId = Math.max(...this.recipes.map((recipe: IShopRecipe) => recipe.id)) + 1;
    recipeId = recipeId < 0 ? 1 : recipeId;
    const items: IShopItem[] = this.items.filter(item => item.count);

    this._shopRecipesService
      .addItem(recipeId, formValues.recipeName, items)
      .subscribe((recipe: IShopRecipe) => this._dialogRef.close(recipe));
  }

}
