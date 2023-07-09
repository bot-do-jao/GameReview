import { useNavigate } from 'react-router-dom';
import './style.css';

function MenuBox(){

    let redirect = useNavigate()
    
    return(
        <div className='Conteudo'>
            <div className='aval'>
                <h2>Avaliações</h2>
            </div>

            <div className='Conf'>
                <h2>Configurações</h2>
            </div>

            <div className='desconect'>
                <h2>Desconectar</h2>
            </div>
        </div>
    );
}

export default MenuBox;