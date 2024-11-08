import React from 'react';
import './Header.css';

export default function Header({black}) {
    return(
        <header className={black ? 'black' : ''}>
           <div className='header--logo'>
               <a href='/'>
                   <img src='../../public/logo192.png' alt='logo streaming' />
               </a>
           </div>
            <div className='header--user'>
                <a href='/'>
                    <img src='https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png' alt='Ícone de usuário'/>
                </a>
            </div>
        </header>
    )
}
