import React from 'react';
import ShowsList from './shows-list';
// import 'shows-list.css';


export default class ShowsContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render(props) {

        return(
            <div id='shows-container'>
                <div id='shows-container-title'>
                    <div>UPCOMING SHOWS</div>
                </div>
                <div id='time-navigation-container'>
                </div>
                <ShowsList shows={this.props.shows}/>

            </div>
        )
    }
}
