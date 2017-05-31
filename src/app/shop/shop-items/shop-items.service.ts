import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ConstantsService } from '../constants.service';
import { IShopItem } from '../shop-item/shop-item';
import { IShopItemCategory } from '../shop-item/shop-item-category';

@Injectable()
export class ShopItemsService {
  private _url = `${this._constantsService.apiUrlPost}/items`;

  constructor(private _constantsService: ConstantsService,
              private _http: Http) { }

  getItems(): Observable<IShopItem[]> {
    return this._http.get(this._url)
      .map((response: Response) => <IShopItem[]> response.json())
      .catch(this.handleError);
  }

  getItem(id: number): Observable<IShopItem> {
    return this.getItems()
      .map((items: IShopItem[]) => items.find(item => item.id === id))
      .catch(this.handleError);
  }

  removeItem(item: IShopItem): Observable<number> {
    return this._http.delete(`${this._url}/${item.id}`)
      .map((response: Response) => <number> response.json().id)
      .catch(this.handleError);
  }

  editItem(item: IShopItem): Observable<IShopItem> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers })
    return this._http.put(`${this._url}/${item.id}`, item, options)
      .map((response: Response) => <IShopItem[]> response.json())
      .catch(this.handleError);
  }

  addItem(id: number, name: string, category: IShopItemCategory): Observable<IShopItem> {
    console.log({ id, name, category });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers })
    return this._http.post(this._url, { id, name, category }, options)
      .map((response: Response) => <IShopItem[]> response.json())
      .catch(this.handleError);
  }

  getItemCategories(): Observable<IShopItemCategory[]> {
    return this.getItems()
      .map((items: IShopItem[]) => <IShopItemCategory[]> items.map(item => item.category))
      .map((categories: IShopItemCategory[]) => <IShopItemCategory[]> _.uniqBy(categories, category => category.id))
      .catch(this.handleError);
  }

  sortAlphabeticallyDesc(a: IShopItem, b: IShopItem): number {
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
