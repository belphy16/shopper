import { IShopItemCategory } from '../shop-item/shop-item-category';

export interface IShopItem {
  id: number;
  name: string;
  category: IShopItemCategory;
  comment?: string;
  count?: number;
  addedToCart?: boolean;
  disabled?: boolean;
}
