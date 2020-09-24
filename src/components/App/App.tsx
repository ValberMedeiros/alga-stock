import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header';
import Container from '../shared/Container';
import Table, { TableHeader } from '../shared/Table';
import { Product } from '../shared/Table/Table.mockdata';
import ProductForm, { ProductCreator } from '../Products/ProductForm';
import Swal from 'sweetalert2'
import { getAllProducts, createSingleProduct, updateSingleProduct, deleteSingleProduct } from '../../services/Product.service';

const headers: TableHeader[] = [
  { key: 'id', value: '#' },
  { key: 'name', value: 'Product' },
  { key: 'price', value: 'Price', right: true },
  { key: 'stock', value: 'Available Stock', right: true }
]

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [updateProducts, setUpdateProducts] = useState<Product | undefined>(products[0])
  
  async function fetchData() {
    const _products = await getAllProducts()
    setProducts(_products)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleProductSubmit = async (product: ProductCreator) => {
    try {
      await createSingleProduct(product)
      fetchData()
    } catch (error) {
      Swal.fire('Oops!', error.message, 'error')
    }
  }

  const handleProductUpdate = async (newProduct: Product) => {
    try {
      await updateSingleProduct(newProduct)
      setUpdateProducts(undefined)
      fetchData()
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
      await deleteSingleProduct(_id)
      fetchData()
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

  return (
    <div className="App">
      <Header title="AlgaStock" />
      <Container>
        <Table 
          headers={ headers }
          data={ products }
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
      </Container>
    </div>
  );
}

export default App;
