import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ConstantsService } from '../constants.service';
import { IShopItem } from '../shop-item/shop-item';
import { IShopItemCategory } from '../shop-item/shop-item-category';

@Injectable()
export class ShopItemsService {
  private _url = `${this._constantsService.apiUrl}/shop-list-items.json`;
  private _urlPost = `${this._constantsService.apiUrlPost}/items`;

  constructor(private _constantsService: ConstantsService,
              private _http: Http) { }

  getItems(): Observable<IShopItem[]> {
    return this._http.get(this._urlPost)
      .map((response: Response) => <IShopItem[]> response.json())
      .catch(this.handleError);
  }

  getItem(id: number): Observable<IShopItem> {
    return this.getItems()
      .map((items: IShopItem[]) => items.find(item => item.id === id))
      .catch(this.handleError);
  }

  removeItem(item: IShopItem): Observable<IShopItem> {
    console.log('Removing item: ' + item.name);
    // return this._http.delete(this._url, { params: { itemId: item.id } })
    //   .map((response: Response) => <IShopItem[]> response.json().data)
    //   .catch(this.handleError);

    return this.mockItemObservable(item.name, item.category);
  }

  editItem(item: IShopItem): Observable<IShopItem> {
    console.log('editing item: ' + item.name);
    // const headers = new Headers({'Content-Type': 'application/json'});
    // const options = new RequestOptions({ headers })
    // return this._http.put(this._url, item, options)
    //   .map((response: Response) => <IShopItem[]> response.json().data)
    //   .catch(this.handleError);

    return this.mockItemObservable(item.name, item.category);
  }

  addItem(name: string, category: IShopItemCategory): Observable<IShopItem> {
    console.log('adding item: ' + name);

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers })
    return this._http.post(this._urlPost, { name, category }, options)
      .map((response: Response) => <IShopItem[]> response.json())
      .catch(this.handleError);

    // return this.mockItemObservable(name, category);
  }

  mockItemObservable(name: string, category: IShopItemCategory) : Observable<IShopItem> {
    const subject = new Subject<IShopItem>();
    const newItem: IShopItem = {
      'id': 999,
      'name': name,
      'category': category
    };

    setTimeout(() => {
      subject.next(newItem);
      subject.complete();
    }, 100);

    return subject;
  }

  getItemCategories(): Observable<IShopItemCategory[]> {
    return this._http.get(this._url)
      .map((response: Response) => <IShopItem[]> response.json().data)
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
