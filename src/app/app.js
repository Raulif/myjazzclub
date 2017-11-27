import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Navbar from '../navbar/navbar'
import axios from 'axios';
import { getAllCurrentShows } from '../actions/actions';
import ShowsContainer from '../shows-list/shows-container';
import Footer from '../footer/footer'


class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //on mount we retrieve the list of shows from db
        this.props.getAllCurrentShows()
    }

    render() {
        if(!this.props.shows) {
            return (
                <div>LOADING SHOWS</div>
            )
        }

        return (
            <div>
                <Navbar />
                <ShowsContainer shows={this.props.shows}/>
                <Footer />
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return({
        getAllCurrentShows: () => dispatch(getAllCurrentShows())
    })
}

const mapStateToProps = state => {
    return {
        shows: state.shows && state.shows
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
