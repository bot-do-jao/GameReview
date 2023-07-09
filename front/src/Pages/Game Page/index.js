import './style.css';
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import AddLista from '../../Images/AddLista.svg'
import Navbar from '../../Components/NavBar';
import gameApi from '../../services/GameApi';

function GamePage(props) {

    const {slug} = useParams();

    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [developers, setDevelopers] = useState(null)
    const [platforms, setPlatforms] = useState(null)
    const [genres, setGenres] = useState(null)
    const [releaseDate, setReleaseDate] = useState(null)
    const [screenshots, setScreenshots] = useState(null)
    const [metacritic, setMetacritic] = useState(null)

    useEffect(() => {

        async function fetchGameInfo(id){
            // console.log(id)
            await gameApi.get(`/games/${id}?key=403d2c92ec8046dbb1a78e702f2e6ccb`)
                .then(res => {
                    console.log(res)
                    setMetacritic(res.data.metacritic)
                    setPlatforms(res.data.platforms)
                    setGenres(res.data.genres)
                    setDevelopers(res.data.developers)
                    setDescription(res.data.description_raw)
                }).catch(error => {

                }
            )
        }

        async function fetchImages() {
            await gameApi.get(`/games?key=403d2c92ec8046dbb1a78e702f2e6ccb&search=${slug}`)
                .then(res => {
                    let i = 0
                    let images = res.data.results[i.toString()].short_screenshots
                    while(res.data.results[i.toString()].slug !== slug) i += 1
                    console.log(res)
                    let id = res.data.results[i.toString()].id
                    setName(res.data.results[i.toString()].name)
                    setReleaseDate(res.data.results[i.toString()].released)
                    setScreenshots(res.data.results[i.toString()].short_screenshots)
                    fetchGameInfo(id)
                }).catch(error => {
                    console.log(error)
                }
            )
        }
        fetchImages()
    }, [])

    function Main(){
        return(
            <div>           
                <div className='Top-Page'>
                    <div className='Main-Content'>
                        <div className='Game-Title'>
                            <h1>{name}</h1>
                        </div>

                        <div className='Game-Content'>
                            <div className='Game-Trailer'>
                                {/* <p>Trailer do Jogo</p> */}
                                {screenshots && screenshots[0] ? <img src={screenshots[0].image} width="660px" height="417px"/> : <p>Loading...</p>}
                            </div>
                            <div className='Game-Images'>
                                <div className='imageone'>
                                    {screenshots && screenshots[1] ? <img src={screenshots[1].image} width="300px" height="197px"/> : <p>Loading...</p>}
                                </div>

                                <div className='imageone'>
                                    {screenshots && screenshots[2] ? <img src={screenshots[2].image} width="300px" height="197px"/> : <p>Loading...</p>}
                                </div>
                            </div>
                        </div>

                        <div className='Game-Score-List'>
                                <div className='Public-Score'>
                                    <p>Public Rating</p>
                                    <p>{metacritic} / 100</p>
                                </div>

                        </div>
                    </div>
                </div>

                <div className='Bottom-Page'>
                    <div className='Sec-Content'>
                        <div className='Sec-Title'>
                            <p className='titulozo'>About {name}</p>
                        </div>

                        <div className='Sec-Sinopse'>
                            <p className='Sec-Content-Title-Left'>Sinopsis</p>
                            <p className='Sinopse-Text'>{description}</p>
                        </div>

                        <div className='Sec-Rest-Info'>
                            <div className='Sec-Left-Text'>
                                <div className='Topzeira RI-Top-Left'>
                                    <p className='Sec-Content-Title-Left'>Plataforms</p>
                                    {platforms.map((platform, i) => <p className='RI-Left-Text' key={i}>{platform.platform.name}</p>)}
                                </div>

                                <div className='RI-Bottom-Left'>
                                    <p className='Sec-Content-Title-Left'>Developer</p>
                                    {developers.map((developer, i) => <p className='RI-Left-Text' key={i}>{developer.name}</p>)}
                                </div>
                            </div>

                            <div className='Sec-Right-Text'>
                                <div className='Topzeira RI-Top-Right'>
                                    <p className='Sec-Content-Title-Right'>Genre</p>
                                    {genres.map((genre, i) => <p className='RI-Right-Text' key={i}>{genre.name}</p>)}
                                </div>

                                <div className='RI-Bottom-Right'>
                                    <p className='Sec-Content-Title-Right'>Release Date</p>
                                    <p className='RI-Right-Text'>{releaseDate}</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        )
    }

    return (
        <div>
            <Navbar />
            { description && screenshots ?
            <Main />
            :
            <h1 className='loadao'>Loading...</h1>
            }
        </div>
    )
}

export default GamePage;