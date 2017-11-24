import React from 'react';



export default function GalleryList(props) {

    const {pictures} = props

    const listOfPictures = props.pictures.map(picture => {

        let { id, title, file_name, description, picture_date } = picture

        let pictureUrl = 'https://s3.amazonaws.com/myjazzclubbucket/'

        return (
            <li key={id} className='gallery-list--list-item'>

                <div className='gallery-list--text-content-wrapper'>
                <div className='gallery-list--text-container'>
                    <p className='gallery-list--text-label'>Title:</p><p className='gallery-list--text-value'>{title}</p>
                </div>

                <div className='gallery-list--text-container'>
                    <p className='gallery-list--text-label'>Description:</p><p className='gallery-list--text-value'>{description}</p>
                </div>

                <div className='gallery-list--text-container'>
                    <p className='gallery-list--text-label'>Date:</p><p className='gallery-list--text-value'>{picture_date}</p>
                </div>
                </div>
                <div className='gallery-list--img-wrapper'>
                    <img className='gallery-list--img' src={`${pictureUrl}${file_name}`}/>
                </div>
            </li>
        )
    })

    return(

        <div classNames='gallery-list--wrapper'>
            <ul className='gallery-list--list'>
                {listOfPictures}
            </ul>
        </div>
    )
}
