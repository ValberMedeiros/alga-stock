import React, { useState } from 'react'
import Button from '../shared/Button'
import Form from '../shared/Form'
import Input from '../shared/Input'

const LoginForm = () => {
  const [form, setForm] = useState({
    user: '',
    pass: ''
  })

  const handleLogin = () => {
    console.table(form)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setForm({
      ...form,
      [name]: value
    })
  }

  return <Form title="Login - AlgaStock" onSubmit={ handleLogin }>
    <Input
      label="User"
      name="user"
      value={ form.user }
      onChange={ handleInputChange }
      placeholder="E.g.: your_user_name321"
    />
    <Input 
      type="password"
      name="pass"
      value={ form.pass }
      onChange={ handleInputChange }
      label="Password"
    />
    <Button>
      Login
    </Button>
  </Form>
}

export default LoginForm;