import { Product } from "../../components/shared/Table/Table.mockdata";
import { Action } from "./Products.reducer";

export const insertNewProduct = (): Action<Product> => {
  return {
    type: 'INSERT_NEW_PRODUCT',
    payload: {
      _id: '1231dasdsa',
      name: 'Cookie',
      price: 0.35,
      stock: 700
    }
  }
}