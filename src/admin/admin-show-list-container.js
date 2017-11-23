import React from 'react'
import AdminShowList from './admin-show-list'

export default class AdminShowListContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {selectedMonth: ''}
    }

    changeHandler(e) {
        this.setState({selectedMonth: e.target.value})
    }

    render() {
        if(!this.props.shows){
            return (
                <div>LOADING LIST OF SHOWS</div>
            )
        }
        let sortedArrayOfShows = this.props.shows.sort((a, b) => {
            var c = new Date(a.show_date);
            var d = new Date(b.show_date);
            return c - d;
        })
        let finalArray
        if(this.state.selectedMonth !== '') {
            finalArray = sortedArrayOfShows.filter(show => {
                return show.show_date.slice(0, 7) == this.state.selectedMonth

            })
            console.log(finalArray);
        }

        else {
            finalArray = sortedArrayOfShows
        }


        return(
            <div id='admin-shows-container'>
                <div id='admin-shows-container-title'>
                    <h1>LIST OF SHOWS</h1>
                    {this.state.selectedMonth !== '' &&
                    <p>Total amount of shows: {this.props.shows.length}</p>}
                    <p>Shows in the selected period: {finalArray.length}</p>
                    <select id='admin-shows--dropdown' onChange={(e) => this.changeHandler(e)}>
                        <option value=''>All</option>
                        <option value='2017-11'>Nov '17</option>
                        <option value='2017-12'>Dec '17</option>
                        <option value='2018-01'>Jan '18</option>
                    </select>
                </div>
                <AdminShowList shows={finalArray} setCurrentShow={this.props.setCurrentShow}/>

            </div>
        )
    }
}
