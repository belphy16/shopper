import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ConstantsService } from '../constants.service';
import { IShopItem } from '../shop-item/shop-item';

@Injectable()
export class ShopCartsService {
  private _url = `${this._constantsService.apiUrlPost}/cart`;

  constructor(private _constantsService: ConstantsService,
              private _http: Http) { }


  getCartItems(): Observable<IShopItem[]> {
    return this._http.get(this._url)
      .map((response: Response) => <IShopItem[]> response.json())
      .catch(this.handleError);
  }

  saveCartItems(items) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers })
    return this._http.post(this._url, items, options)
      .map((response: Response) => {
        return <IShopItem[]> response.json()
      })
      .catch(this.handleError);
  }

  clearCartItems(): Observable<number> {
    return this._http.delete(this._url)
      .map((response: Response) => <number> response.status)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
