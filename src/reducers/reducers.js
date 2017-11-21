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

    if(action.type == 'EMPTY_CURRENT_SHOW') {
        state = Object.assign({}, state, {
            currentShow: action.emptyShow
            })

        console.log('state after we empty everything: ',state );
    }

    if(action.type == 'ADD_SHOW_TO_PROPS') {
        state = Object.assign({}, state, {
            shows: [...state.shows, action.currentShow]
        })
    }

    return state;
}

//
// if(action.type == 'RECEIVE_USERS') {
//     state = Object.assign({}, state, {
//         friendships: action.friendships
//     })
// }
//
//
// if(action.type == 'END_FRIENDSHIP') {
//     state = Object.assign({}, state, {
//         friendships: state.friendships.map((user) => {
//             if(user.id != action.user.id) {
//                 return user
//             }
//             return Object.assign({}, user, {
//                 status: 'terminated'
//             })
//         })
//     })
// }

// if(action.type == 'INCOMING_MESSAGE') {
//     console.log(action.message);
//     state = Object.assign({}, state, {
//         messages: [...state.messages, action.message]
//     })
// }
