export interface ProductInStock {
  description: string,
  id: string,
  price: number,
  title: string,
  count?: number
}

export type ProductsInStock = ProductInStock[];

export interface DataError<T> {
  message: string;
  data: T;
}

export interface ProductBody {
  description: string,
  price: number,
  title: string,
  count: number
}