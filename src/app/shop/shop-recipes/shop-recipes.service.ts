import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ConstantsService } from '../constants.service';
import { IShopRecipe } from '../shop-recipe/shop-recipe';
import { IShopItem } from '../shop-item/shop-item';

@Injectable()
export class ShopRecipesService {
  // private _url = `${this._constantsService.apiUrl}/shop-list-recipes.json`;
  private _url = `${this._constantsService.apiUrlPost}/recipes`;

    constructor(private _constantsService: ConstantsService,
              private _http: Http) { }


    getItems(): Observable<IShopRecipe[]> {
      return this._http.get(this._url)
        .map((response: Response) => <IShopRecipe[]> response.json())
        .catch(this.handleError);
    }

    getItem(id: number): Observable<IShopRecipe> {
        return this.getItems()
            .map((items: IShopRecipe[]) => items.find(item => item.id === id))
            .catch(this.handleError);
    }

    removeItem(recipe: IShopRecipe): Observable<number> {
      return this._http.delete(`${this._url}/${recipe.id}`)
        .map((response: Response) => <number> response.json().id)
        .catch(this.handleError);
    }

    editItem(recipe: IShopRecipe): Observable<IShopRecipe> {
      const headers = new Headers({'Content-Type': 'application/json'});
      const options = new RequestOptions({ headers })
      return this._http.put(`${this._url}/${recipe.id}`, recipe, options)
        .map((response: Response) => <IShopRecipe[]> response.json())
        .catch(this.handleError);
    }

    addItem(id: number, name: string, items: IShopItem[]): Observable<IShopRecipe> {
      const headers = new Headers({'Content-Type': 'application/json'});
      const options = new RequestOptions({ headers })
      return this._http.post(this._url, { id, name, items }, options)
        .map((response: Response) => <IShopRecipe[]> response.json())
        .catch(this.handleError);
    }

    sortAlphabeticallyDesc(a: IShopRecipe, b: IShopRecipe): number {
      if (a.name.toLowerCase() < b.name.toLowerCase())
        return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase())
        return 1;
      return 0;
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
