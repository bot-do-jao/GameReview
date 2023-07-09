import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import GameApi from '../../services/GameApi';
import api from '../../services/api';
import Navbar from '../../Components/NavBar';
import './style.css';

function Homepage() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userTokenChecked, setUserTokenChecked] = useState(false)
  const [link, setLink] = useState('')
  const [slug, setSlug] = useState('')
  const [bestGames, setBestGames] = useState([])
  const [newReleases, setNewReleases] = useState([])


  let redirect = useNavigate()

  async function fetchWitcherImage(){ 
    await GameApi.get('/games?key=403d2c92ec8046dbb1a78e702f2e6ccb&search=The Witcher 3')
    .then(res => {
      setLink(res.data.results['0'].background_image)
      setSlug(res.data.results['0'].slug)
    }).catch(error => {
      console.log("error")
    }
  )
}

//gambiarra primeiro mais bem avaliado
async function fetchBestRated(){
  await GameApi.get('/games?key=403d2c92ec8046dbb1a78e702f2e6ccb&platforms_count=2&ordering=-metacritic&page_size=5')
  .then(res => {
    let max = 3
    for(let i = 0; i < max; i++){
        let image = res.data.results[i.toString()].background_image
        while(!image){
            max += 1
            i += 1
            image = res.data.results[i.toString()].background_image 
        }
        let name = res.data.results[i.toString()].name
        let slug = res.data.results[i.toString()].slug
        setBestGames(prevGames => [...prevGames, {name: name, image: image, slug: slug}])
    }
  }).catch(error => {
    console.log("error")
  }
)
}           

async function fetchNewReleases(){
  await GameApi.get('/games?key=403d2c92ec8046dbb1a78e702f2e6ccb&metacritic=90,100&ordering=-released&page_size=5')
  .then(res => {
    let max = 3
    for(let i = 0; i < max; i++){
        let image = res.data.results[i.toString()].background_image
        while(!image){
            max += 1
            i += 1
            image = res.data.results[i.toString()].background_image 
        }
        let name = res.data.results[i.toString()].name
        let slug = res.data.results[i.toString()].slug
        setNewReleases(prevGames => [...prevGames, {name: name, image: image, slug: slug}])
    }
    }).catch(error => {
      console.log("error")
    }
  )
}

  useEffect(() => { // Called when the function first rendered

    fetchWitcherImage()
    fetchBestRated()
    fetchNewReleases()

  },[])

  useEffect(() => {
    
    const config = {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };

    async function handleUser(user_id){

      setUserTokenChecked(true);

      await api.get(`/auth/${user_id}`, config).then(res => {
        setLoggedIn(true);
        console.log('User is logged in');
      }).catch(error => {
        setLoggedIn(false);
      })
    }

    if (localStorage.getItem('user') && !userTokenChecked) {
      let user_id = localStorage.getItem('user');
      handleUser(user_id);
      setLoggedIn(true);
    }
  },[loggedIn, userTokenChecked])

  function Main(){
    return(
      <div className="degrade">
        <div className="main">
        
          <main>
            <div className="banner-principal">
              <img src={link} onClick={() => {redirect('/game/' + slug)}} alt='main game' />
            </div>
          
          
            <div className="HighLights">
              <h2 className='titulindafiel' >Best Rated</h2>
              <div className="melhores-avaliados">
                <ul className="sem-marcador inline">
                  <li className="banner-pequeno">
                    <a href={'/game/' + bestGames['0'].slug}><img src={bestGames['0'].image} alt='1st game' /></a>
                    <h3 className='game-title' onClick={() => {redirect('/game/' + bestGames['0'].slug)}}>{bestGames['0'] ? bestGames['0'].name : 'Loading'}</h3>
                  </li>
                  <li className="banner-pequeno">
                    <a href={'/game/' + bestGames['1'].slug}><img src={bestGames['1'].image} alt='2nd game' /></a>
                    <h3 className='game-title' onClick={() => {redirect('/game/' + bestGames['1'].slug)}}>{bestGames['1'] ? bestGames['1'].name : 'Loading'}</h3>
                  </li>
                  <li className="banner-pequeno">
                    <a href={'/game/' + bestGames['2'].slug}><img src={bestGames['2'].image} alt='3rd game' /></a>
                    <h3 className='game-title' onClick={() => {redirect('/game/' + bestGames['2'].slug)}}>{bestGames['2'] ? bestGames['2'].name : 'Loading'}</h3>
                  </li>
                </ul>
              </div>

              <div className="lancamentos">
                <h2 className='titulindafiel'>Latest Releases</h2>
                <ul className="sem-marcador inline">
                  <li className="banner-pequeno">
                    <a href={'/game/' + newReleases['0'].slug}><img width='282px' height='168px' src={newReleases['0'].image} alt='1st game' /></a>
                    <h3 className='game-title' onClick={() => {redirect('/game/' + newReleases['0'].slug)}}>{newReleases['0'] ? newReleases['0'].name : ''}</h3>
                  </li>
                  <li className="banner-pequeno">
                    <a href={'/game/' + newReleases['1'].slug}><img src={newReleases['1'].image} alt='2nd game' /></a>
                    <h3 className='game-title' onClick={() => {redirect('/game/' + newReleases['1'].slug)}}>{newReleases['1'] ? newReleases['1'].name : ''}</h3>
                  </li>
                  <li className="banner-pequeno">
                    <a href={'/game/' + newReleases['2'].slug}><img src={newReleases['2'].image} alt='3rd game' /></a>
                    <h3 className='game-title' onClick={() => {redirect('/game/' + newReleases['2'].slug)}}>{newReleases['2'] ? newReleases['2'].name : ''}</h3>
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <> 
      <Navbar />

      { bestGames['2'] && newReleases['2'] ? 
      <Main />
      :
        <h1 className='loadao'>Loading...</h1>
      }
    </>
  );
}

export default Homepage;

