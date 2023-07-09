import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api';
import './style.css';
import brasao from '../../Images/brasaoleao.png'

function ChangePassword() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [success, setSuccess] = useState(true)

  const redirect = useNavigate()

  const user = localStorage.getItem('user');
  const header = {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  };

  async function handleForm(event){
    event.preventDefault();

    if(password !== password2){
      setPasswordsMatch(false);
    } else {

      setPasswordsMatch(true);

      await api.put(`/auth/${user}`, {password: password}, header).then(response => {
        redirect('/')
        window.location.reload();
      }).catch(error => {
        setSuccess(false);
      });   

    }

  }

  return (
    <div className="Tudo">
      <div className="CaixaAL">
        <h1 className="tituloAL">Change Password</h1>
        <form autoComplete="off"
        onSubmit={handleForm}
        >
          <input
            type='email'
            id='email'
            className='inputino'
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder='Email'
          />
          <input
            type='password'
            id='password'
            className='inputino'
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder='New Password'
          />
          <input
            type='password'
            id='password2'
            className='inputino'
            value={password2}
            onChange={event => setPassword2(event.target.value)}
            placeholder='Confirm Password'
          />
          {passwordsMatch ? null : <p className='inputError'>Passwords do not match</p>}
          <button className='AL-button' type='submit'>Save Changes</button>
        </form>

      </div>

      <div className="Brasao">
        <img  className="capiv" src={brasao}  onClick={() => {redirect('/')}}/>
      </div>
    </div>
  );
}

export default ChangePassword;