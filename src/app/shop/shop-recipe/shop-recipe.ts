import { IShopItem } from '../shop-item/shop-item';

export interface IShopRecipe {
  id: number;
  name: string;
  popularity: number;
  items: IShopItem[];
  count?: number;
}
