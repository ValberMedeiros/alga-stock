import React from 'react'
import Header from '../components/Header';
import ProductsCRUD from '../components/Products/ProductsCRUD';
import Container from '../components/shared/Container';

const HomeView = () => {
  return <>
    <Header title="AlgaStock" />
    <Container>
      <ProductsCRUD />
    </Container>
    </>
}

export default HomeView;