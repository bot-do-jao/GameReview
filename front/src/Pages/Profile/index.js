import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import BasicButton from '../../Components/basic button';
import logo from './../../Assets/Maicu Neimah 1.png';
import BasicInput from '../../Components/basic input';
import './style.css';
import api from '../../services/api';

function ProfilePage() {

  const redirect = useNavigate()

  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [userId, setUserId] = useState(null)
  const [data, setData] = useState({})

  const config = {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  };

  useEffect(() => {

      if(email !== '' && username !== ''){
        setData({
          name: username,
          email: email
        })
      }
      else if(username !== '' ){
        setData({
          name: username
        })
      }
      else if(email !== ''){
        setData({
          email: email
        })
      }

  }, [username, email])

  useEffect(() => {
    setUserId(localStorage.getItem('user'))
  },[])

  async function handleForm(e){
    e.preventDefault()

    await api.put(`/auth/${userId}`, data, config).then(res => {
      // console.log(res)
      localStorage.setItem('name', res.data.user.name);
      redirect('/')
      window.location.reload();
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="Profile">
        <div className="Conf">
            <h1>Configurações</h1>
        </div>

        <div className="Conteudo"> 
            <div className="Foto">
              <ul className="caixote-esquerdo">
                  <li ><h3>Foto de Perfil</h3></li>
                  <li className="Fotenha" ><a href="#"><img src={logo} /></a></li>
              </ul>
            </div>

              <form className="Entradas" onSubmit={handleForm}>
                <input
                  type='text'
                  id='email'
                  className='inputi'
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  placeholder='Change Username'
                />
                <input
                  type='email'
                  id='email'
                  className='inputi'
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder='Email'
                />
                <button className='register-button' type='submit'>Save Changes</button>
              </form>
                {/* <div className="inputs">
                  <div className="InputUsu">
                  <BasicInput textudo="Alterar Usuário" />
                  </div>

                  <BasicInput className="InputEma" textudo="Alterar Email" />
                </div>
                <div className="Botao">
                    <BasicButton className="salvar" width="314px"  type="submit" title="Salvar Alterações" />
                </div> */}
        </div>
    </div>
  );
}

export default ProfilePage;