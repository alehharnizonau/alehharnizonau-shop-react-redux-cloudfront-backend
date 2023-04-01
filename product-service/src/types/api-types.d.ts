export interface Product {
  description: string,
  id: string,
  price: number,
  title: string,
}

export type Products = Product[]

export interface DataError<T> {
  message: string;
  data: T;
}