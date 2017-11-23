export default function(state = {}, action) {

    if(action.type == 'GET_ALL_CURRENT_SHOWS') {
        state = Object.assign({}, state, {
            shows: action.shows
        })
    }

    if(action.type == 'GET_CURRENT_SHOW') {
        state = Object.assign({}, state, {
            currentShow: action.currentShow
        })
    }

    if(action.type == 'SET_CURRENT_SHOW') {

        state = Object.assign({}, state, {
            currentShow: action.currentShow
        })
        console.log('action.currentShow in reducer is: ', action.currentShow);

    }

    if(action.type == 'CURRENT_SHOW_FIELD_CHANGE') {
        state = Object.assign({}, state, {
            currentShow: Object.assign({}, state.currentShow, {
                [action.field]: action.value
            })
        })
    }

    if(action.type == 'CURRENT_PICTURE_FIELD_CHANGE') {
        state = Object.assign({}, state, {
            currentPicture: Object.assign({}, state.currentPicture, {
                [action.field]: action.value
            })
        })
    }

    if(action.type == 'EMPTY_CURRENT_SHOW') {
        state = Object.assign({}, state, {
            currentShow: action.emptyShow
            })

        console.log('state after we empty everything: ',state );
    }


    if(action.type == 'EMPTY_CURRENT_PICTURE') {
        state = Object.assign({}, state, {
            currentPicture: action.emptyPicture
        })
    }

    if(action.type == 'ADD_SHOW_TO_PROPS') {
        state = Object.assign({}, state, {
            shows: [...state.shows, action.currentShow]
        })
    }

    if(action.type == 'UPDATE_CURRENT_SHOW_WITH_PICTURE_NAME') {
        state = Object.assign({}, state, {
            currentShow: Object.assign({}, state.currentShow, {
                picture_name: action.picture_name
            })
        })
    }

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

    if(action.type == 'SET_GALLERY_PICTURES') {
        state = Object.assign({}, state, {
            pictures: action.pictures
        })
    }

    if(action.type == 'SET_CURRENT_PICTURE') {
        state = Object.assign({}, state, {
            currentPicture: action.currentPicture
        })
    }

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

    if(action.type == 'ADD_NEW_PICTURE_TO_PICTURES') {
        state = Object.assign({}, state, {
            pictures: [...state.pictures, action.newPicture]
        })
    }

    return state;
}
