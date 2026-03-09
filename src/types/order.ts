export interface Item {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderId: string
  value: number
  creationDate: string
  items: Item[]
}