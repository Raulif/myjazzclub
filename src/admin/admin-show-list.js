import React from 'react';

export default function AdminShowList(props){
    const {shows} = props;


    const listOfShows = props.shows.map(show => {
        let {id,
            title,
            main_artist,
        } = show
        let show_date = show.show_date.slice(0, 10)

        const clickHandler = (e) => {
            console.log('e.currentTarget', e.currentTarget);
            console.log(show);
            props.setCurrentShow(show)
        }


        return(
            <li key={id} className='admin-list--list-item' onClick={(e) => clickHandler(e)}>
                <div className='admin-list--show-date'>{show_date}</div>
                <div className='admin-list--show-title'>{title}</div>
                <div className='admin-list--show-main-artist'>{main_artist}</div>
            </li>
        )
    })

    return(
        <ul id='admin-show-list'>
            {listOfShows}
        </ul>

    )
}
