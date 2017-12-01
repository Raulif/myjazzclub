import React from 'react'
import AdminShowList from './admin-show-list';


export default class AdminShowListContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {selectedMonth: ''}
    }

    //'Selected month' is used to filter the list of shows

    changeHandler(e) {

        /*
        The <select> dropdown sets a value to 'selected month' on the local state.
        This value will be used to filter the array of shows displayed.
        */
        this.setState({selectedMonth: e.target.value})
    }

    render() {
        if(!this.props.shows|| !this.props.currentShow ){
            return (
                <div>LOADING LIST OF SHOWS</div>
            )
        }

        /*
        Before rendering we filter the array of shows according to date.
        Show with earliest date comes first.
        */
        let sortedArrayOfShows = this.props.shows.sort((a, b) => {
            var c = new Date(a.show_date);
            var d = new Date(b.show_date);
            return c - d;
        })

        let finalArray
        if(this.state.selectedMonth !== '') {
            finalArray = sortedArrayOfShows.filter(show => {

                /*
                We use the value of 'selected month' of the local state to filter
                the current array of shows which is going to be rendered.
                We slice the value of the date propety (YYYY-MM-DD) down to only
                the first 7 characters (YYYY-MM) and we compare these with the
                value of the option selected in the <select> tag.
                */

                return show.show_date.slice(0, 7) == this.state.selectedMonth

            })
            console.log(finalArray);
        }

        else {

            /*if no month is selected, the array of shows to be displayed is the
            array sorted by date.*/
            finalArray = sortedArrayOfShows
        }


        return(

            <div id='admin-shows-container'>
                <div id='admin-shows-container-title'>
                    <h1>LIST OF SHOWS</h1>

                    <p className='admin-shows--current-selection'>Total shows: <span className='filter-results'>{this.props.shows.length}</span></p>
                    {this.state.selectedMonth !== '' &&
                    <p className='admin-shows--current-selection'>Shows in selection: <span  className='filter-results'>{finalArray.length}</span></p>}
                    <p className='admin-shows--filter-label'>Filter shows:</p>
                    <select className='admin-shows--dropdown' onChange={(e) => this.changeHandler(e)}>
                        <option value=''>All</option>
                        <option value='2017-11'>Nov '17</option>
                        <option value='2017-12'>Dec '17</option>
                        <option value='2018-01'>Jan '18</option>
                    </select>
                </div>
                <AdminShowList currentShow={this.props.currentShow} shows={finalArray} setCurrentShow={this.props.setCurrentShow}/>

            </div>
        )
    }
}
