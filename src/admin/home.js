import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAllCurrentShows } from '../actions/actions';
import ShowEditor from './show-editor';
import GalleryManager from './gallery-manager/gallery-manager';
import { Button, Icon } from 'semantic-ui-react'


class AdminHome extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            shows: false,
            gallery: true,
            buttonText: 'Go to GALLERY MANAGER'

        }
        this.toggleEditor = this.toggleEditor.bind(this)
    }

    componentDidMount() {
        this.props.getAllCurrentShows();

    }

    toggleEditor() {
        if(this.state.shows) {
            this.setState({
                shows: false,
                gallery: true,
                buttonText: 'Go to SHOW EDITOR'
            })
        }
        else {
            this.setState({
                shows: true,
                gallery: false,
                buttonText: 'Go to GALLERY MANAGER'

            })
        }
    }

    render() {

        if(!this.props.shows) {
            return (
                <div>LOADING SHOWS</div>
            )
        }

        return(
            <div className='admin-home'>
                <div className='admin-home--header'>
                    <div className='admin-home--title'>CLUB DASHBOARD</div>

                    <button className='editor-toggler-btn' onClick={() => this.toggleEditor()}>
                        {this.state.buttonText}
                    </button>

                    <div className='logged-in'>Logged in as:<span className='logged-in--name'>admin</span></div>
                </div>
                <div className='admin-home-working-space'>

                    {this.state.shows && <ShowEditor shows={this.props.shows}/>}
                    {this.state.gallery && <GalleryManager />}
                    {this.props.children}
                </div>
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
