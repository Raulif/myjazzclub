import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAllCurrentShows } from '../actions/actions';


class AdminHome extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getAllCurrentShows();

    }

    render() {

        if(!this.props.shows) {
            return (
                <div>LOADING SHOWS</div>
            )
        }

        return(
            <div className='admin-home'>
                <div>ADMIN DASHBOARD</div>

                {this.props.children}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return({
        getAllCurrentShows: () => dispatch(getAllCurrentShows()),
    })
}

const mapStateToProps = state => {
    return {
        shows: state.shows && state.shows
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
