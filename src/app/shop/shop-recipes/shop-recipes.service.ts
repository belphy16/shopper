import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ConstantsService } from '../constants.service';
import { IShopRecipe } from '../shop-recipe/shop-recipe';
import { IShopItem } from '../shop-item/shop-item';

@Injectable()
export class ShopRecipesService {
  private _url = `${this._constantsService.apiUrl}/shop-list-recipes.json`;

    constructor(private _constantsService: ConstantsService,
              private _http: Http) { }

    getItems(): Observable<IShopRecipe[]> {
        return this._http.get(this._url)
            .map((response: Response) => <IShopRecipe[]> response.json().data)
            .catch(this.handleError);
    }

    getItem(id: number): Observable<IShopRecipe> {
        return this.getItems()
            .map((items: IShopRecipe[]) => items.find(item => item.id === id))
            .catch(this.handleError);
    }

    addItem(name: string, items: IShopItem[]): Observable<IShopRecipe> {
      console.log('adding recipe: ' + name);
      // const headers = new Headers({'Content-Type': 'application/json'});
      // const options = new RequestOptions({ headers })
      // return this._http.post(this._url, { name, items }, options)
      //   .map((response: Response) => <IShopRecipe[]> response.json().data)
      //   .catch(this.handleError);

      return this.mockRecipeObservable(name, items);
    }

    removeItem(recipe: IShopRecipe): Observable<IShopRecipe> {
      console.log('removing recipe: ' + recipe.name);
      // return this._http.delete(this._url, { params: { itemId: recipe.id } })
      //   .map((response: Response) => <IShopItem[]> response.json().data)
      //   .catch(this.handleError);

      return this.mockRecipeObservable(recipe.name, recipe.items);
    }

    editItem(recipe: IShopRecipe): Observable<IShopRecipe> {
      console.log('editing recipe: ' + recipe.name);
      // const headers = new Headers({'Content-Type': 'application/json'});
      // const options = new RequestOptions({ headers })
      // return this._http.put(this._url, recipe, options)
      //   .map((response: Response) => <IShopRecipe[]> response.json().data)
      //   .catch(this.handleError);

      return this.mockRecipeObservable(recipe.name, recipe.items);
    }

    mockRecipeObservable(name: string, items: IShopItem[]) : Observable<IShopRecipe> {
      const subject = new Subject<IShopRecipe>();
      const newRecipe: IShopRecipe = {
        'id': 999,
        'name': name,
        'items': items
      };

      setTimeout(() => {
        subject.next(newRecipe);
        subject.complete();
      }, 100);

      return subject;
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
