import axios from 'axios';

export function getAllCurrentShows() {

    return axios.get('/api/shows/get-all-current-shows')

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
//
// export function storeUserInfo(user) {
//     return{
//         type: 'STORE_USER_INFO',
//         user
//     }
// }
