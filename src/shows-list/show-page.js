import React from 'react';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import Navbar from '../navbar/navbar';
import { Divider } from 'semantic-ui-react';
import {Link} from 'react-router';



class ShowPage extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {

        if(!this.props.shows) {
            return(
                <div>LOADING SHOW PAGE</div>
            )
        }

        const selectedShow = this.props.shows.filter(show => {
            return show.id == this.props.params.id
        })

        let show = selectedShow[0];

        let pictureUrl = 'https://s3.amazonaws.com/myjazzclubbucket/'


        return(
            <div className='show-page-container'>
                <Navbar/>
                <div className='logo-wrapper'>
                <Link to='/'>
                <img src='/public/jazzicon-sand.png' className='navbar-logo'/>
                </Link>
                </div>
                <div className='show-page-wrapper'>
                    <h1 className='show-page--show-title'>{show.title}</h1>
                    <Divider />
                    <div className='show-page--text-wrapper'>
                    <p className='show-page--show-lable'>Event date:</p><p className='show-page--show-value'>{show.show_date}</p>
                    </div>
                    <div className='show-page--text-wrapper'>
                    <p className='show-page--show-lable'>Time:</p><p className='show-page--show-value'>{show.time_begin} hrs</p>
                    </div>
                    <div className='show-page--text-wrapper'>
                    <p className='show-page--show-lable'>Price:</p><p className='show-page--show-value'>{show.price_pre} €</p>
                    <button className='ticket-btn'>Ticket</button>
                    </div>
                    <Divider />
                    <div className='show-page--img-wrapper'>
                    <img className='show-page--img' src={`${pictureUrl}${show.picture_name}`}/>
                    </div>
                    <div className='show-page--artist-wrapper'>
                    <h3 className='show-page--artist-value'>{show.main_artist}</h3>
                    </div>
                    <p className='show-page--description'>{show.long_description}</p>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        shows: state.shows && state.shows
    }
}

export default connect(mapStateToProps)(ShowPage)
