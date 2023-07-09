import { useNavigate } from 'react-router-dom'
import menu from './../../Images/Sanduiche.svg';
import './style.css';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

function ButtonMenu(){
    let redirect = useNavigate()

    return(
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                        
                            
                        <button type="menu"> <img src={menu} />Menu</button>
                        
                </DropdownMenu.Trigger>

                    <DropdownMenu.Content sideOffset={5}>

                        <DropdownMenu.Arrow className='flexuda'/>
                        <div className='caixinha'>

                        

                            <DropdownMenu.Item className='menu-option' onClick={() => {redirect('/changepassword')}}> 
                                <p>Change Password</p>
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator className='linha'/>

                            <DropdownMenu.Item className='menu-option' onClick={() => {
                                    localStorage.removeItem('token')
                                    redirect('/')
                                    window.location.reload();
                                }}> 
                                <p>Disconnect</p>
                            </DropdownMenu.Item>

                    
                        </div>

                        
                    </DropdownMenu.Content>
            </DropdownMenu.Root>
        </>
    )
}
 
export default ButtonMenu;