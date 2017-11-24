import React from 'react';
import { browserHistory } from 'react-router';
import Navbar from '../navbar/navbar';
import {Link} from 'react-router';
import Footer from '../footer/footer'


export default class HomePage extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {


        return(
            <div className='home-page-container'>
                <Navbar/>
                <div className='logo-wrapper'>
                    <div className='home-page-greeting-wrapper'>
                        <h1 className='home-page-greeting'>WELCOME TO THE JAZZ CLUB</h1>
                    </div>
                </div>



                <div className='home-page-bg-img'>
                    <img src='/public/homeimg.jpg'/>
                </div>

                <Footer />
            </div>
        )
    }
}
