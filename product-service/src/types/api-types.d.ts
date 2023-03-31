export interface Product {
  description: string,
  id: string,
  price: number,
  title: string,
}

export type Products = Product[]

export interface ProductsNotFound {
  message: string,
  data: []
}

export interface ProductNotFound {
  message: string,
  data: {}
}

export interface ServerError {
  message: string,
  data: unknown
}

export type ResponseTypes = Product | Products | ProductsNotFound | ProductNotFound | ServerError