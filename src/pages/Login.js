import 'pages/Login.scss'
import React from 'react'
import { 
  auth 
} from 'lib/firebase'
import { 
  useForm 
} from 'react-hook-form'
import { 
  useHistory 
} from 'react-router-dom'

export default function Login() {
  const form = useForm()
  const history = useHistory()
  const [error, setError] = React.useState('')

  function onLogin(data) {
    auth.signInWithEmailAndPassword(data.email, data.password).then(cred => {
      history.push('/adverts')
    }).catch(err => setError(err.message))
  }
  
  return (
    <form className='login' onSubmit={form.handleSubmit(onLogin)}>
      <div className='login__email'>
        <label>Email</label>
        <input type='text' {...form.register("email")}></input>
      </div>
      <div className='login__password'>
        <label>Password</label>
        <input type='password' {...form.register("password")}></input>
      </div>
      {error ? <p className='login__error'>{error}</p> : null}
      <input 
        type='submit' 
        className='login__submit' 
        value='Login'>
      </input>
    </form>
  )
}