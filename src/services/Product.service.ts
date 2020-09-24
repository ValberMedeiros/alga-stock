import { Product } from "../components/shared/Table/Table.mockdata";
import http from "../Utils/http";

export const getAllProducts = () => 
  http
    .get<Product[]>('http://localhost:3024/products')
    .then(res => res.data)