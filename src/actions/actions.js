import axios from 'axios';



export function getAllCurrentShows() {

    return axios.get('/api/shows')

        .then(({ data }) => {
            if(data.success) {
                return {
                    type: 'GET_ALL_CURRENT_SHOWS',
                    shows: data.shows
                };
            }
        })
        .catch(err => console.log("error on // ACTIONS // GET ALL CURRENT SHOWS", err));
}

export function getCurrentShow() {
    return axios.get('/admin/current-show')

            .then(({data}) => {
                if(data.success) {
                    return{
                        type: 'GET_CURRENT_SHOW',
                        currentShow: data.currentShow
                    }

                }
            })
}

export function setCurrentShow(currentShow) {
    return {
        type: 'SET_CURRENT_SHOW',
        currentShow
    }
}

export function alterCurrentShow(field, value) {
    return{
        type: 'CURRENT_SHOW_FIELD_CHANGE',
        field,
        value
    }
}

export function alterCurrentPicture(field, value) {
    console.log('in alter current picture with field: ', field, ' and value: ', value);
    return{
        type: 'CURRENT_PICTURE_FIELD_CHANGE',
        field,
        value
    }
}

export function emptyCurrentShow() {
    let emptyShow = {
        title: '',
        main_artist: '',
        secondary_artist: '',
        line_up: '',
        genre: '',
        long_description: '',
        external_link: '',
        show_date: '',
        time_begin: '',
        time_end: '',
        price_pre: '',
        price_door: '',
        tag: '',
        picture_name: ''
    }

    /*
    BY NOT INCLUDING AN EMPTY ID PROPERTY WE ARE CREATING A NEW EMPTY OBJECT WITHOUT AN ID FIELD.
    THE LACK OF ID WILL HELP US DIFFERENTIATE A NEW SHOW FROM AN UPDATED SHOW.
    THE NEW SHOW IS THAT WHICH IS PRECEEDED BY A CLEARING OF THE FORM.*/

    console.log('about to return action inside empty currenty state');
    return {
        type: 'EMPTY_CURRENT_SHOW',
        emptyShow
    }
}

export function emptyCurrentPicture() {
    let emptyPicture = {
        description: '',
        file_name: '',
        picture_date: '',
        title: ''
    }

    /*
    BY NOT INCLUDING AN EMPTY ID PROPERTY WE ARE CREATING A NEW EMPTY OBJECT WITHOUT AN ID FIELD.
    THE LACK OF ID WILL HELP US DIFFERENTIATE A NEW PICTURE FROM AN UPDATED PICTURE.
    THE NEW PICTURE IS THAT WHICH IS PRECEEDED BY A CLEARING OF THE FORM.*/

    return {
        type: 'EMPTY_CURRENT_PICTURE',
        emptyPicture
    }
}

export function createNewShow(showInfo) {
    console.log('inside action createNewShow: ', showInfo);
    return {
        type: 'SET_CURRENT_SHOW',
        currentShow: showInfo
    }
}

export function createNewPicture(pictureInfo) {
    return axios.post('/admin/gallery/new-picture', pictureInfo)

    .then( ({data}) => {
        if(data.success) {
            //In order to update state.currentShow we use the 'newShow' returned from the server inside the 'data' obj, instead of the 'showInfo' we passed to the server with the POST query. Reason for this is, the 'newShow' returned from the server after the query includes property 'id' as created by the DB when inserting the new row.

            return {
                type: 'SET_NEW_PICTURE',
                newPicture: data.newPicture
            }
        }
    })

}

export function updateShow(showInfo) {
    console.log('showinfo: ', showInfo);
    return axios.post('/admin/update-show', showInfo)

    .then( ({data}) => {
        if(data.success) {

            return {
                type: 'SET_CURRENT_SHOW',
                currentShow: data.updatedShow
            }
        }
    })

    .catch(err => console.log('error on // ACTIONS // QUERY POST UPDATE SHOW: ',err));
}


export function updatePicture(pictureInfo) {

    return axios.post('admin/gallery/update-picture', pictureInfo)

            .then(({data}) => {
                if(data.success) {

                    return {
                        type: 'UPDATE_PICTURE_INFO',
                        updatedPicture: data.updatedPicture
                    }
                }
            })
}


export function addShowToProps(currentShow) {
    console.log('inside action addShowToProps: ', currentShow);

    return {
        type: 'ADD_SHOW_TO_PROPS',
        currentShow
    }
}

export function updateCurrentShowWithPictureName(picture_name) {
    return {
        type: 'UPDATE_CURRENT_SHOW_WITH_PICTURE_NAME',
        picture_name
    }
}

export function updateStateWithPictureName(picture_name, showId) {
    return {
        type: 'UPDATE_STATE_WITH_PICTURE_NAME',
        picture_name,
        showId

    }
}

export function getAllPictures() {

    return axios.get('/admin/get-pictures')

    .then(({data}) => {
        if(data.success) {

            return {
                type: 'SET_GALLERY_PICTURES',
                pictures: data.pictures
            }
        }
    })

    .catch(err => console.log('error on // ACTIONS // QUERY GET PICTURES: ',err));
}


export function getCurrentPicture() {

    return axios.get('/admin/current-picture')

    .then(({data}) => {
        if(data.success) {

            return{
                type: 'SET_CURRENT_PICTURE',
                currentPicture: data.currentPicture
            }
        }
    })
}

export function setCurrentPicture(currentPicture) {

    return {
        type: 'SET_CURRENT_PICTURE',
        currentPicture
    }
}

export function addGalleryPictureToState(newPicture) {

    return {
        type: 'ADD_NEW_PICTURE_TO_PICTURES',
        newPicture
    }
}

export function updateStateWithShow(showInfo) {

    return {
        type: 'UPDATE_STATE_WITH_SHOW',
        showInfo
    }
}
