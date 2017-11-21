import React from 'react'
import AdminShowList from './admin-show-list'

export default class AdminShowListContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(!this.props.shows){
            return (
                <div>LOADING LIST OF SHOWS</div>
            )
        }
        return(
            <div id='admin-shows-container'>
                <div id='admin-shows-container-title'>
                    <h1>LIST OF SHOWS</h1>
                    <p>Currently {this.props.shows.length} shows on the calendar</p>
                </div>
                <AdminShowList shows={this.props.shows} setCurrentShow={this.props.setCurrentShow}/>

            </div>
        )
    }
}

// const mapDispatchToProps = dispatch =>
//     return ({
//         setCurrentShow: (currentShow) => dispatch(setCurrentShow(currentShow))
//
//     })
//
// const mapStateToProps = state => {
//     return{
//         currentShow: state.currentShow && state.currentShow
//     }
// }
