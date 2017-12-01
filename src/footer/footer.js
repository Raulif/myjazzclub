import React from 'react';
import { Link } from 'react-router';

export default function Footer() {

    //mock address
    return(
        <div className='footer-wrapper'>
            <div id='contact-info-wrapper'>
                <p className='contact-info'>My Jazz Club</p>
                <p className='contact-info'>Lichtensteinallee 1, 10787 Berlin</p>
                <p className='contact-info'>Tlf. 0302540070</p>
                <p className='contact-info'>[thejazzclub@jazz.com</p>
            </div>
            <Link to='/login' className='admin-login-btn'>
                <p>ADMIN LOGIN</p>
            </Link>
        </div>
    )
}
