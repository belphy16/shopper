import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Subject, Observable } from 'rxjs/Rx';

import { IShopItem } from '../shop-item/shop-item';

@Injectable()
export class ShopItemsService {
  private _url = 'api/shop-list-items.json';

  constructor(private _http: Http) { }

  getItems(): Observable<IShopItem[]> {
    return this._http.get(this._url)
      .map((response: Response) => <IShopItem[]> response.json().data)
      .catch(this.handleError);
  }

  getItem(id: number): Observable<IShopItem> {
    return this.getItems()
      .map((items: IShopItem[]) => items.find(item => item.id === id))
      .catch(this.handleError);
  }

  addItem(name: string, category: string): Observable<IShopItem> {
    const subject = new Subject<IShopItem>();
    const newItem: IShopItem = {
      "id": 2,
      "name": name,
      "category": category,
      "popularity": 0
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
