export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
