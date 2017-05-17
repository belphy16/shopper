import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Subject, Observable } from 'rxjs/Rx';

import { IShopRecipe } from '../shop-recipe/shop-recipe';
import { IShopItem } from '../shop-item/shop-item';

@Injectable()
export class ShopRecipesService {

  private _url = 'api/shop-list-recipes.json';

    constructor(private _http: Http) { }

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
      const subject = new Subject<IShopRecipe>();
      const newItem: IShopRecipe = {
        "id": 0,
        "name": name,
        "popularity": 0,
        "items": items
      };

      setTimeout(() => {
        subject.next(newItem);
        subject.complete();
      }, 100);

      return subject;
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
