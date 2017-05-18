import { IShopItem } from '../shop-item/shop-item'

export interface IShopRecipe {
  id: number;
  name: string;
  items: IShopItem[];
  count?: number;
}
