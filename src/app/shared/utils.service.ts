import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class UtilsService {

  constructor(@Inject(DOCUMENT) private _document: HTMLDocument) { }

  isOnMobile(): boolean {
    const { width } = this._document.body.getBoundingClientRect();

    return width < 600;
  }

}
