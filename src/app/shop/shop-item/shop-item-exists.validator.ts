import { Directive, Input } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

import { IShopItem } from '../shop-item/shop-item';

@Directive({
  selector: '[validate-item-exists]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ShopItemExistsValidator,
    multi: true
  }]
})
export class ShopItemExistsValidator implements Validator {
  @Input('validate-item-exists') items: IShopItem[];
  validate(control: FormControl): { [ key: string ]: any } {
    console.log('validate');
    if (!control || !control.value ) {
      return null;
    }

    const itemNameInput: string = control.value.trim().toLowerCase();
    const itemFound = this.items.find(item => item.name.trim().toLowerCase() === itemNameInput);

    return itemFound ? { 'itemExists': 'Item already exists' } : null;
   }
}
