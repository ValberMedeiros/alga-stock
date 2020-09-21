import React from 'react';
import Button from '../shared/Button';
import Header from '../Header';
import Container from '../shared/Container';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header title="AlgaStock" />
      <Container>
        <Button content="Click me">
        </Button>
      </Container>

    </div>
  );
}

export default App;
