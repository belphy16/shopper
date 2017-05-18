import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { IShopRecipe } from './shop-recipe';
import { ShopRecipesService } from '../shop-recipes/shop-recipes.service';
import { IShopItem } from '../shop-item/shop-item';
import { ShopItemsService } from '../shop-items/shop-items.service';

import { RemoveShopRecipeConfirmComponent } from '../shop-recipe/dialogs/remove-shop-recipe-confirm/remove-shop-recipe-confirm.component';

@Component({
  templateUrl: './shop-recipe.component.html',
  styleUrls: ['./shop-recipe.component.scss']
})
export class ShopRecipeComponent implements OnInit {
  itemToBeRemoved: IShopRecipe;
  activeRecipe: IShopRecipe;
  recipes: IShopRecipe[] = [];
  items: IShopItem[] = [];
  editRecipeForm: FormGroup;
  errorMessage: string;
  isEditing: boolean = false;

  constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _shopRecipesService: ShopRecipesService,
                public _dialogService: MdDialog,
                private _shopItemsService: ShopItemsService) { }

  ngOnInit() {
    this._shopRecipesService
      .getItem(+this._route.snapshot.params['id'])
      .subscribe((item) => {
        this.activeRecipe = item

        this.editRecipeForm = new FormGroup({
          recipeName: new FormControl(this.activeRecipe.name, [Validators.required, this.recipeExists.bind(this)])
        });
      },
      error => this.errorMessage = <any>error);

    this._shopItemsService
      .getItems()
      .subscribe((items: IShopItem[]) => {
        this.items = items.map(item => Object.assign({ count: 0 }, item)).sort(this._shopItemsService.sortAlphabeticallyDesc);
        this.activeRecipe.items.forEach(activeItem => {
          this.items.find((item: IShopItem) => activeItem.id === item.id).count = activeItem.count;
        });
      },
      error => this.errorMessage = <any>error);

    this._shopRecipesService
      .getItems()
      .subscribe((items) => this.recipes = items.map(item => Object.assign({ count: 0 }, item)),
      error => this.errorMessage = <any>error);

  }

  recipeExists(control: FormControl): { [ key: string ]: any } {
    if (control.value.trim().toLowerCase() === this.activeRecipe.name.trim().toLowerCase()) {
      return null;
    }

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

  editRecipe(formValues) {
    this.activeRecipe.items = this.items.filter(item => item.count);
    this.activeRecipe.name = formValues.recipeName;

    this._shopRecipesService
      .editItem(this.activeRecipe)
      .subscribe((recipe: IShopRecipe) => this.isEditing = false);
  }

  removeRecipe() {
    this.itemToBeRemoved = this.activeRecipe;
    this._router.navigate(['/recipes']);
  }

  openRemoveConfirmationDialog(): MdDialogRef<RemoveShopRecipeConfirmComponent> {
    return this._dialogService.open(RemoveShopRecipeConfirmComponent, {
      width: '600px',
      data: this
    });
  }
}
