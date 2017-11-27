import React from 'react';

export default function Gallery(props) {

    const { pictures } = props;

    const listOfPictures = props.pictures.map(picture => {

        let { id, title, file_name, description, picture_date } = picture

        let pictureUrl = 'https://s3.amazonaws.com/myjazzclubbucket/'

        const clickHandler = (e) => {
            //the clicked picture becomes the current picture in the Redux state.
            props.setCurrentPicture(picture)
        }

        return (
            <li key={id} className='gallery--list-item' onClick={(e) => clickHandler(e)}>
                <div className='gallery--img-wrapper'>
                    <img className='gallery--img' src={`${pictureUrl}${file_name}`}/>
                </div>

                <div className='gallery-item--text-container'>
                    <p className='gallery-item--text-label'>Title:</p><p className='gallery-item--text-value'>{title}</p>
                </div>

                <div className='gallery-item--text-container'>
                    <p className='gallery-item--text-label'>Date:</p><p className='gallery-item--text-value'>{picture_date}</p>
                </div>
            </li>
        )

    })

    return(
        <div id='gallery--wrapper'>
            <h1 className='gallery-manager--gallery-list-title'>GALLERY OF PICTURES</h1>
            <ul id='gallery--list'>
                {listOfPictures}
            </ul>
        </div>
    )
}
