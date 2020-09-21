import React, { useState } from 'react';
import './App.css';
import Button from '../shared/Button';
import Header from '../Header';
import Container from '../shared/Container';
import Input from '../shared/Input';

function App() {
  const [street, setStreet] = useState('');

  return (
    <div className="App">
      <Header title="AlgaStock" />
      <Container>
        <Button content="Click me">
        </Button>
        <Input
          label="Street"
          placeholder="E.g.: 15th Avenue"
          value={ street }
          onChange={e => setStreet(e.target.value)}
        />
      </Container>

    </div>
  );
}

export default App;
