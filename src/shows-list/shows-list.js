import React from 'react';
import { Link } from 'react-router';

export default function ShowsList(props){
    const {shows} = props;
    if(!shows){
        return null
    }

    console.log(props.shows);

    const listOfShows = props.shows.map(show => {
        let {id,
            title,
            time_begin,
            picture_name,
        } = show
        let show_date = show.show_date.slice(0, 10)
        let pictureUrl = 'https://s3.amazonaws.com/myjazzclubbucket/'

        return(
            <li key={id} className='show-list--list-item'>
                <Link to={`/shows/${id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <div className='show-list--show-date'>{show_date}</div>
                    <div className='show-list--img-wrapper'>
                        <img className='show-list--img' src={`${pictureUrl}${picture_name}`}/>
                    </div>
                    <div className='show-list--show-title-wrapper'>
                        <h3 className='show-list--show-title'>{title}</h3>
                    </div>
                    <div className='show-list--ticket-link-wrapper'>
                        <h3 className='show-list--ticket-link'>TICKET & INFO</h3>
                    </div>
                </Link>
            </li>
        )
    })



    return(
        <ul id='shows-list'>
            {listOfShows}
        </ul>

    )
}
