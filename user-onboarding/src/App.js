import './App.css';
import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import User from './components/User'
import * as yup from 'yup';
import schema from './validation/formSchema'
import axios from 'axios';

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  tos: undefined,
}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  tos: undefined,
}

const initialFriends = [];
const initialDisabled = false;

function App() {
  const [users, setUsers] = useState(initialFriends)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
    .then(res => {
      setUsers(res.data.data)
    }).catch(err => console.error(err))
  }

  useEffect(() => {
    getUsers()
  }, [])

  


  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      setUsers([res.data, ...users])
      setFormValues(initialFormValues)
    }).catch(err => {
      console.error(err)
      setFormValues(initialFormValues)
    })
  }

  //event handlers go here
    //put validation here later
  const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({ ...formErrors, [name]: '' }))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }
  
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({...formValues, [name]: value })
  }

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos
    }
  postNewUser(newUser);
  }

  useEffect(() => {
    getUsers()
  }, [])

  
  useEffect (() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])


  return (
    <div className="App">
      <header><h1>Users App</h1></header>

      <Form 
      values={formValues}
      change={inputChange}
      submit={formSubmit}
      disabled={disabled}
      errors={formErrors}
      />
      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  );
}

export default App;
