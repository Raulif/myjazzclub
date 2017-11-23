import React from 'react';

export default function Gallery(props) {

    const { pictures } = props;

    const listOfPictures = props.pictures.map(picture => {

        let { id, title, file_name, description, picture_date } = picture

        let pictureUrl = 'https://s3.amazonaws.com/myjazzclubbucket/'

        const clickHandler = (e) => {
            props.setCurrentPicture(picture)
        }

        return (
            <li key={id} className='gallery--list-item' onClick={(e) => clickHandler(e)}>
                <div className='gallery--img-wrapper'>
                    <img className='gallery--img' src={`${pictureUrl}${file_name}`}/>
                </div>
                <p className='gallery--picture-title'>Title: {title}</p>
                <p className='gallery--picture-date'>Date: {picture_date}</p>
            </li>
        )

    })

    return(
        <div id='gallery--wrapper'>
            <h2>GALLERY</h2>
            <ul id='gallery--list'>
                {listOfPictures}
            </ul>
        </div>
    )
}
