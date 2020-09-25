import { Action } from "..";
import Products, { Product } from "../../components/shared/Table/Table.mockdata";

export default function (state = Products, action: Action): Product[] {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return [...action.payload]
    default:
      return state;
  }
}