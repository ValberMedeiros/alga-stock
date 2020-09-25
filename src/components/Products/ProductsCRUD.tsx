import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Table, { TableHeader } from '../shared/Table'
import { Product } from '../shared/Table/Table.mockdata';
import ProductForm, { ProductCreator } from './ProductForm';
import { connect, useDispatch } from 'react-redux'
import * as ProductActions from '../../redux/Products/Products.actions';
import { RootState, ThunkDispatch } from '../../redux';


const headers: TableHeader[] = [
  { key: 'id', value: '#' },
  { key: 'name', value: 'Product' },
  { key: 'price', value: 'Price', right: true },
  { key: 'stock', value: 'Available Stock', right: true }
]

declare interface ProductsCRUDProps {
  products: Product[]
}

const ProductsCRUD: React.FC<ProductsCRUDProps> = (props) => {
  const dispatch: ThunkDispatch = useDispatch()
  
  const showErrorAlert = (error: Error) => {
    Swal.fire('Oops!', error.message, 'error')
  }

  const [updateProducts, setUpdateProducts] = useState<Product | undefined>(undefined)
  
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    await dispatch(ProductActions.getProducts())
      .catch(showErrorAlert)

  }

  const handleProductSubmit = async (product: ProductCreator) => {
    dispatch(ProductActions.insertNewProduct(product))
      .catch(showErrorAlert)
  }

  const handleProductUpdate = async (newProduct: Product) => {

      dispatch(ProductActions.updateProduct(newProduct))
      .then(() => setUpdateProducts(undefined))  
      .catch(showErrorAlert)
  }

  const handleProductDetail = (product: Product) => {
    Swal.fire(
      'Product details',
      `${product.name} costs $${product.price} and we have ${product.stock} available in stock.`,
      'info'
    )
  }

  const deleteProduct = async (_id: string) => {
    dispatch(ProductActions.deleteProduct(_id))
      .then(() => {
        Swal.fire('Uhul!', 'Product successgully deleted', 'success')
      })
      .catch(showErrorAlert)
  }

  const handleProductDelete = (product: Product) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09f',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete ${product.name}!`
    }).then(({ value }) => value && deleteProduct(product._id))
  }

  return <>
    <Table 
      headers={ headers }
      data={ props.products }
      enableActions
      onDelete={ handleProductDelete }
      onDetail={ handleProductDetail }
      onEdit={ setUpdateProducts }
    />
    <ProductForm 
      form={ updateProducts }
      onSubmit={ handleProductSubmit } 
      onUpdate={ handleProductUpdate }
    />
  </>
}

const mapStateToProps = (state: RootState) => ({
  products: state.products
})

export default connect(mapStateToProps)(ProductsCRUD);