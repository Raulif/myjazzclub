export default function(state = {}, action) {


//---------------------SHOW / SHOW EDITOR REDUCERS----------------------------//

    //set shows from db to Redux state object of 'shows'
    if(action.type == 'GET_ALL_CURRENT_SHOWS') {
        state = Object.assign({}, state, {
            shows: action.shows
        })
    }

    //Set last show added to db, to the Redux state object of 'current show'
    if(action.type == 'GET_CURRENT_SHOW') {
        state = Object.assign({}, state, {
            currentShow: action.currentShow
        })
    }

    //Set show selected as 'current show' on Redux state object
    if(action.type == 'SET_CURRENT_SHOW') {
        state = Object.assign({}, state, {
            currentShow: action.currentShow
        })
    }

    //Change in input in form in Show Editor is set to 'current show' object
    if(action.type == 'CURRENT_SHOW_FIELD_CHANGE') {
        state = Object.assign({}, state, {
            currentShow: Object.assign({}, state.currentShow, {
                [action.field]: action.value
            })
        })
    }

    //set empty object as 'current show' to clear the input form in 'Show Editor'
    if(action.type == 'EMPTY_CURRENT_SHOW') {
        state = Object.assign({}, state, {
            currentShow: action.emptyShow
            })
    }

    //Add new show to Redux state object 'shows'.
    if(action.type == 'ADD_SHOW_TO_PROPS') {
        state = Object.assign({}, state, {
            shows: [...state.shows, action.currentShow]
        })
    }

    //Change 'picture_name' property in 'current show' object.
    if(action.type == 'UPDATE_CURRENT_SHOW_WITH_PICTURE_NAME') {
        state = Object.assign({}, state, {
            currentShow: Object.assign({}, state.currentShow, {
                picture_name: action.picture_name
            })
        })
    }

    //Update show from state object 'shows' with new input
    if(action.type == 'UPDATE_STATE_WITH_SHOW') {
        state = Object.assign({}, state, {
            shows: state.shows.map(show => {
                if(show.id !== action.showInfo.id) {
                    return show
                }

                return action.showInfo
            })
        })
    }

    //Change 'picture_name' property in corresponding show of 'shows' object.
    if(action.type == 'UPDATE_STATE_WITH_PICTURE_NAME') {
        state = Object.assign({}, state, {
            shows: state.shows.map(show => {
                if(show.id !== action.showId) {
                    return show
                }
                return Object.assign({}, show, {
                    picture_name: action.picture_name
                })
            })
        })
    }


//-------------------GALLERY / GALLERY MANAGER REDUCERS-----------------------//

    /*Change in input in form of the Gallery Manager is set as value of a
    corresponding property of 'current picture' object*/
    if(action.type == 'CURRENT_PICTURE_FIELD_CHANGE') {
        state = Object.assign({}, state, {
            currentPicture: Object.assign({}, state.currentPicture, {
                [action.field]: action.value
            })
        })
    }

    /*Set empty object as 'current picture' to clear the input form in 'Gallery
    Manager'*/
    if(action.type == 'EMPTY_CURRENT_PICTURE') {
        state = Object.assign({}, state, {
            currentPicture: action.emptyPicture
        })
    }

    //Set pictures from db to state object 'pictures'
    if(action.type == 'SET_GALLERY_PICTURES') {
        state = Object.assign({}, state, {
            pictures: action.pictures
        })
    }

    //Set picture object as 'current picture'
    if(action.type == 'SET_CURRENT_PICTURE') {
        state = Object.assign({}, state, {
            currentPicture: action.currentPicture
        })
    }

    /*set updated content of input form in Gallery Manager to corresponding
    picture in 'pictures' object*/
    if(action.type == 'UPDATE_PICTURE_INFO') {
        state = Object.assign({}, state, {
            pictures: state.pictures.map(picture => {
                if(picture.id !== action.updatedPicture.id) {
                    return picture
                }

                return Object.assign({}, picture, {
                    file_name: action.updatedPicture.file_name,
                    title: action.updatedPicture.title,
                    description: action.updatedPicture.description,
                    picture_date: action.updatedPicture.picture_date
                })
            })
        })
    }

    //Add new picture to the state object 'pictures'
    if(action.type == 'ADD_NEW_PICTURE_TO_PICTURES') {
        state = Object.assign({}, state, {
            pictures: [...state.pictures, action.newPicture]
        })
    }


    return state;
}
