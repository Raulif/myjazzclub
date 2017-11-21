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
    console.log(currentShow);
    return {
        type: 'SET_CURRENT_SHOW',
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
