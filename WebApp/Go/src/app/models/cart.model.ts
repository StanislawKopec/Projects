export interface Cart {
  items: Array<CartItem>;
}
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
