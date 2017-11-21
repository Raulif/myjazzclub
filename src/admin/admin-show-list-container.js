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
        const sortedArrayOfShows = this.props.shows.sort((a, b) => {
            var c = new Date(a.show_date);
            var d = new Date(b.show_date)
            return c - d
        })
        return(
            <div id='admin-shows-container'>
                <div id='admin-shows-container-title'>
                    <h1>LIST OF SHOWS</h1>
                    <p>Currently {this.props.shows.length} shows on the calendar</p>
                </div>
                <AdminShowList shows={sortedArrayOfShows} setCurrentShow={this.props.setCurrentShow}/>

            </div>
        )
    }
}
