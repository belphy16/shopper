import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { IShopRecipe } from './shop-recipe';
import { ShopRecipesService } from '../shop-recipes/shop-recipes.service';

@Component({
  selector: 'app-shop-recipe',
  templateUrl: './shop-recipe.component.html',
  styleUrls: ['./shop-recipe.component.scss']
})
export class ShopRecipeComponent implements OnInit {
  item: IShopRecipe;
  errorMessage: string;

  constructor(private _shopRecipesService: ShopRecipesService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._shopRecipesService
      .getItem(+this._route.snapshot.params['id'])
      .subscribe((item) => this.item = item,
                  error => this.errorMessage = <any>error);;
  }

}
