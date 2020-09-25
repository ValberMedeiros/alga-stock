import { ProductCreator } from "../../components/Products/ProductForm";
import { getAllProducts } from "../../services/Product.service";
import { Action, Thunk } from "..";
import { Product } from "../../components/shared/Table/Table.mockdata";

export const getProducts = (): Thunk<Product[]> => async (dispatch) => {
  const products = await getAllProducts()
  dispatch({
    type: 'FETCH_PRODUCTS',
    payload: products
  }) 
}

export const insertNewProduct = (payload: ProductCreator): Action<ProductCreator> => {
  return {
    type: 'INSERT_NEW_PRODUCT',
    payload
  }
}