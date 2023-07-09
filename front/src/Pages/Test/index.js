import React, {useState, useEffect} from 'react'
import gameApi from '../../services/GameApi'

export default function TestPage(){

    const [bestGames, setBestGames] = useState([])

    async function fetchBestRated(){
        await gameApi.get('/games?key=403d2c92ec8046dbb1a78e702f2e6ccb&metacritic&ordering=-metacritic&page_size=4')
          .then(res => {
            let max = 3
            for(let i = 0; i < max; i++){
                let image = res.data.results[i.toString()].background_image
                while(!image){
                    max += 1
                    i += 1
                    image = res.data.results[i.toString()].background_image 
                }
                let slug = res.data.results[i.toString()].slug
                setBestGames(prevGames => [...prevGames, {slug: slug, image: image}])
            }
          }).catch(error => {
            console.log("error")
          }
        )
    }
    
    useEffect(() => {
        fetchBestRated()
    }, [])

    console.log(bestGames)

    return (
        <h1>{bestGames['0'] ? bestGames['0'].slug : 'loading'}</h1>
    )
}
