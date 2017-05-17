export interface IShopItem {
  id: number;
  name: string;
  category: string;
  popularity: number;
  count?: number;
  addedToCart?: boolean;
  disabled?: boolean;
}
