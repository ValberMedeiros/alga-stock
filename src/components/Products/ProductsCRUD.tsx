import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Table, { TableHeader } from '../shared/Table'
import { Product } from '../shared/Table/Table.mockdata';
import ProductForm, { ProductCreator } from './ProductForm';
import { connect, useDispatch } from 'react-redux'
import * as ProductActions from '../../redux/Products/Products.actions';
import { RootState } from '../../redux';


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
  const dispatch = useDispatch()
  //const [products, setProducts] = useState<Product[]>([]);
  const [updateProducts, setUpdateProducts] = useState<Product | undefined>(undefined)
  
  async function fetchData() {
    try {
      await dispatch(ProductActions.getProducts())
    } catch (error) {
      Swal.fire('Oops!', error.message, 'error')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleProductSubmit = async (product: ProductCreator) => {
    try {
      dispatch(ProductActions.insertNewProduct(product))
    } catch (error) {
      Swal.fire('Oops!', error.message, 'error')
    }
  }

  const handleProductUpdate = async (newProduct: Product) => {
    try {
      await dispatch(ProductActions.updateProduct(newProduct))
      setUpdateProducts(undefined)
    } catch (error) {
      Swal.fire('Oops!', error.message, 'error')
    }
  }

  const handleProductEdit = (product: Product) => {
    setUpdateProducts(product)
  }

  const handleProductDetail = (product: Product) => {
    Swal.fire(
      'Product details',
      `${product.name} costs $${product.price} and we have ${product.stock} available in stock.`,
      'info'
    )
  }

  const deleteProduct = async (_id: string) => {
    try {
      await dispatch(ProductActions.deleteProduct(_id))
      Swal.fire('Uhul!', 'Product successgully deleted', 'success')
    } catch (error) {
      Swal.fire('Oops!', error.message, 'error')
    }
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
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product._id);
      }
    })
  }

  return <>
    <Table 
      headers={ headers }
      data={ props.products }
      enableActions
      onDelete={ handleProductDelete }
      onDetail={ handleProductDetail }
      onEdit={ handleProductEdit }
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