import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

import { ShopRecipeComponent } from '../../shop-recipe.component';
import { IShopRecipe } from '../../shop-recipe';
import { ShopRecipesService } from '../../../shop-recipes/shop-recipes.service';

@Component({
  templateUrl: './remove-shop-recipe-confirm.component.html',
  styleUrls: ['./remove-shop-recipe-confirm.component.scss']
})
export class RemoveShopRecipeConfirmComponent implements OnInit, OnDestroy {

  constructor(private _shopRecipesService: ShopRecipesService,
                @Inject(MD_DIALOG_DATA) public data: ShopRecipeComponent,
                public _dialogRef: MdDialogRef<RemoveShopRecipeConfirmComponent>) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.data.itemToBeRemoved = undefined;
  }

  confirm() {
    this._shopRecipesService.removeItem(this.data.activeRecipe)
    .subscribe((recipeId: number) => this._dialogRef.close(true));
  }

  cancel() {
    this._dialogRef.close(false);
  }

}
