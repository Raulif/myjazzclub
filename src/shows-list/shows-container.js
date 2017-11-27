import React from 'react';
import ShowsList from './shows-list';


export default class ShowsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state={selectedMonth: ''}
    }

    render(props) {

        if(!this.props.shows) {
            return(
                <div>LOADING CURRENT PROGRAM</div>
            )
        }

        let filteredArrayOfShows;

        if(this.state.selectedMonth !== '') {
            /*
            We filter the array of 'shows' of props according to show_date property
            using the 'selected month' of local state, which is set by the <select>
            tag
            */
            filteredArrayOfShows = this.props.shows.filter(show => {
                return show.show_date.slice(0, 7) == this.state.selectedMonth

            })
        }

        else {
            /*if no month is set to local state, the array of shows to be rendered
            is the array of shows retrieved from db.
            */
            filteredArrayOfShows = this.props.shows
        }

        return(
            <div className='shows-container'>
                <div className='shows-container-title'>
                    <h1 className='show-list-title'>UPCOMING SHOWS</h1>
                    <div className='time-navigation-container'>
                        <h2 name='' className='show-list-title--month' onClick={() => this.setState({selectedMonth: ''})}>ALL</h2>
                        <h2 name='2017-11' onClick={() => this.setState({selectedMonth: '2017-11'})} className='show-list-title--month'>NOV</h2>
                        <h2 name='2017-12' onClick={() => this.setState({selectedMonth: '2017-12'})} className='show-list-title--month'>DEC</h2>
                        <h2 name='2018-01' onClick={() => this.setState({selectedMonth: '2018-01'})} className='show-list-title--month'>JAN</h2>
                    </div>

                </div>
                <ShowsList shows={filteredArrayOfShows}/>

            </div>
        )
    }
}
