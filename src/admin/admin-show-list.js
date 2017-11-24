import React from 'react';

export default function AdminShowList(props){

    if(!props.shows || !props.currentShow) {
        return(
            <div>LOADING SHOW LIST</div>
        )
    }

    const {shows} = props;


    const listOfShows = props.shows.map(show => {
        let {id,
            title,
            main_artist,
            picture_name
        } = show
        let show_date = show.show_date.slice(0, 10)


        const clickHandler = (e) => {
            console.log(show);
            props.setCurrentShow(show)
        }


        let currentClass =
            id == props.currentShow.id
            ? 'admin-list--list-item admin-list--list-item-active'
            : 'admin-list--list-item'

        let pictureUrl = 'https://s3.amazonaws.com/myjazzclubbucket/'

        return(
            <li key={id} className={currentClass} onClick={(e) => clickHandler(e)}>
                <div className='label-wrapper'>
                    <p className='list-item-label'>Show date:</p>
                    <p className='list-label-content'>{show_date}</p>
                </div>
                <div className='label-wrapper'>
                    <p className='list-item-label'>Show Title:</p>
                    <p className='list-label-content'>{title}</p>
                </div>
                <div className='label-wrapper'>
                    <p className='list-item-label'>Main Artist:</p>
                    <p className='list-label-content'>{main_artist}</p>
                </div>
                <div className='show-list--mini-img-wrapper'>
                    <img className='show-list--mini-img' src={`${pictureUrl}${picture_name}`} />
                </div>
            </li>
        )
    })

    return(
        <ul id='admin-show-list'>

            {listOfShows}
        </ul>

    )
}
