import { ErrorMessage, Status } from "../constants";

export interface Product {
  description: string,
  id: string,
  price: number,
  title: string,
}

export interface ProductFull extends Product {
  count: number
}

export interface Stock {
  product_id: string,
  count: number
}

export interface ProductWithCount {
  description: string,
  count: number,
  price: number,
  title: string,
}

export interface CreationStatus {
  message: ErrorMessage | string,
  statusCode: Status
}