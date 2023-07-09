import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './style.css' ;
import brasao from '../../Images/brasaoleao.png'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(true)

  let redirect = useNavigate()

  async function handleForm(event){
    event.preventDefault()

    await api.post('/auth/authenticate', {
      email: email,
      password: password,
    }).then(response => {
      localStorage.setItem('user', response.data.user._id);
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.user.name);
      redirect('/')
      window.location.reload();
    }).catch(error => {
      setSuccess(false);
    });
  }   

  return (
    <div className="Tudo">
      <div className="CaixaLogin">
        <h1 className="tituloLogin">Login</h1>
        <form autoComplete="off"
        onSubmit={handleForm}
        >
          <input
            type='email'
            id='email'
            className='inputinho'
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder='Your email'
          />
          <input
            type='password'
            id='password'
            className='inputinho'
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder='Your password'
          />
          {
          success ?
            null
            :
            <p className='inputError'>Email or password incorrect</p>
          }
          <button className='login-button' type='submit'>Login</button>
        </form>
        <h2 className="Register" 
        onClick={() => {redirect('/register')}} 
        >Register here</h2>

      </div>

      <div className="Brasao">
        <img  className="capiv" src={brasao}  onClick={() => {redirect('/')}}/>
      </div>
    </div>
  );
}

export default Login;