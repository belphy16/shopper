import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IShopItem } from './shop-item';

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
            .map((products: IShopItem[]) => products.find(item => item.id === id));
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
