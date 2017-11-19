export default function(state = {}, action) {

    if(action.type == 'GET_ALL_CURRENT_SHOWS') {
        state = Object.assign({}, state, {
            shows: action.shows
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
