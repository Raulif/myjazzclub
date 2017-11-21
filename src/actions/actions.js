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

    console.log('about to return action inside empty currenty state');
    return {
        type: 'EMPTY_CURRENT_SHOW',
        emptyShow
    }
}

export function createNewShow(showInfo) {

    return axios.post('/admin/new-show', showInfo )

    .then( ({data}) => {
        if(data.success) {
            //In order to update state.currentShow we use the 'newShow' returned from the server inside the 'data' obj, instead of the 'showInfo' we passed to the server with the POST query. Reason for this is, the 'newShow' returned from the server after the query includes property 'id' as created by the DB when inserting the new row.
            console.log('data.newShow: ', data.newShow);
            return {
                type: 'SET_CURRENT_SHOW',
                currentShow: data.newShow
            }
        }
    })

    .catch(err => console.log('error on // ACTIONS // QUERY POST NEW SHOW: ',err));
}

export function updateShow(showInfo) {

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

export function addShowToProps(currentShow) {
    return {
        type: 'ADD_SHOW_TO_PROPS',
        currentShow
    }
}

//
// export function storeUserInfo(user) {
//     return{
//         type: 'STORE_USER_INFO',
//         user
//     }
// }
