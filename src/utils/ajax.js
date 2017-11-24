import axios from 'axios';
import {createNewShow, addShowToProps} from '../actions/actions'
import {store} from '../start'



export function postNewShow(showInfo) {
    console.log('inside axios post New Show');
    return axios.post('/admin/new-show', showInfo )
            .then(({data}) => {
                console.log('data from query: ', data);
                if(data.success) {
                    //In order to update state.currentShow we use the 'newShow' returned from the server inside the 'data' obj, instead of the 'showInfo' we passed to the server with the POST query. Reason for this is, the 'newShow' returned from the server after the query includes property 'id' as created by the DB when inserting the new row.
                    store.dispatch(createNewShow(data.newShow));
                    store.dispatch(addShowToProps(data.newShow));
                }
            })

            .catch(err => console.log('error on // UTILS // AJAX // QUERY POST NEW SHOW: ',err));

}
