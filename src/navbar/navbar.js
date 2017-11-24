import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='navigation-bar'>
                <div id='logo-wrapper'>
                    <Link to='/'>
                        <img src='/public/jazzicon-golden.png'/>
                    </Link>
                </div>
                <div id='navigation-menu-wrapper'>
                    <ul id='site-navigation'>
                        <li className='navigation-menu-item'>About</li>
                        <li className='navigation-menu-item'><Link to='/shows' className='link'>Program</Link></li>
                        <li className='navigation-menu-item' ><Link to='/gallery' className='link'>Gallery</Link></li>
                        <li className='navigation-menu-item' >Contact</li>
                    </ul>
                    <ul id='navigation-social'>
                        <li className='social-item' id='twitter-logo'><i className="fa fa-twitter" style={{ariaHidden: 'true'}}></i></li>
                        <li className='social-item' id='facebook-logo'><i className="fa fa-facebook" style={{ariaHidden: 'true'}}></i></li>
                        <li className='social-item' id='instagram-logo'><i className="fa fa-instagram" style={{ariaHidden: 'true'}}></i></li>
                    </ul>
                </div>
            </div>
        )
    }
}
