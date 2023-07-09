import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../../services/api';
import gameApi from '../../services/GameApi';
import brasao from './../../Images/brasaoleao.png';
import ButtonMenu from '../Dropdown Menu';
import './style.css';


function Navbar(){

    const redirect = useNavigate()

    const [username, setUsername] = useState(null)
    const [search, setSearch] = useState(null)
    const [slug, setSlug] = useState(null)

    const [searchList, setList] = useState([])
    const [searchSlug, setSSlug] = useState([])
    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function sleep(time){
      await delay(time)
    }

    useEffect(() => {
    
        const config = {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        };
    
        async function handleUser(user_id){
    
          await api.get(`/auth/${user_id}`, config).then(res => {
            console.log('User is logged in');
            setUsername(localStorage.getItem('name'));
          }).catch(error => {
            setUsername(null)
          })
        }
    
        if (localStorage.getItem('user')) {
          let user_id = localStorage.getItem('user');
          handleUser(user_id);
        }
      },[])

      useEffect(() => {
        async function getGames(){
            await gameApi.get(`/games?key=403d2c92ec8046dbb1a78e702f2e6ccb&search=${search}&search_exact=true&ordering=-metacritic`) //&page_size=6
            .then(res => {
              console.log(res.data)
              setSlug(res.data.results['0'].slug)
              
              setList([res.data.results['0'].name,
              res.data.results['1'].name,
              res.data.results['2'].name])

              setSSlug([res.data.results['0'].slug,
              res.data.results['1'].slug,
              res.data.results['2'].slug])
            }).catch(error => {
                
            })
        }
        if(search) getGames()
      }, [search])

    return(
        <>
            <div className="tudaokrl">
                <div className="conteudo">
                    <div className="left-box">
                        
                        <ButtonMenu  />
                        
                    </div>

                    <div className="brasao">
                        <a href="/"  >
                            <img src={brasao} alt="logofeudo"/>
                        </a>
                    </div>

                    <div className="right-box">
                        <div className="rb-input">
                            <input className='searchBarr' type="text"  placeholder="Pesquisar.."  onChange={(e) => setSearch(e.target.value)} onKeyPress={e => {if(e.key === 'Enter') {
                              sleep(4000)
                              redirect(`/game/${slug}`)
                              window.location.reload();
                              }}}
                              onBlur={()=> setTimeout(()=>{setSearch('');setList([])}, 500)}
                            />
                        </div>
                        {searchList.length > 0 && (
                          <div className='searchList'>
                          <ul className='listonha'>
                            <li className='searchItem'>
                            <a href="" onClick={() => {redirect(`/game/${searchSlug['0']}`)}}>
                                {searchList['0']}  
                              </a>
                            </li>
                            <li className='searchItem'>
                            <a href="" onClick={() => {redirect(`/game/${searchSlug['1']}`)}}>
                                {searchList['1']}  
                              </a>
                            </li>
                            <li>
                              <a href="" onClick={() => {redirect(`/game/${searchSlug['2']}`)}}>
                                {searchList['2']}  
                              </a>
                            </li>
                            {/* {searchList.map((slug, i) => <li className='searchItem'>
                            <a key={i} href="" onClick={() => {redirect(`/game/${slug}`)}}>
                                {searchList[i.toString()]}  
                              </a>
                            </li>)} */}
                          </ul>
                        </div>  
                        )}

                        <div className="rb-button">
                            {username ?
                            <button type="button" onClick={() => {redirect('/profile')}} >{username}</button>
                              :
                            <button type="button" onClick={() => {redirect('/login')}} >Login</button>
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default Navbar;