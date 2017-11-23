import React from 'react';
import axios from 'axios';
import { getAllPictures, setCurrentPicture } from '../../actions/actions';
import { connect } from 'react-redux';
import Gallery from './gallery';
import GalleryEditor from './gallery-editor';

class GalleryManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {selectedMonth: ''}
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.props.getAllPictures()
    }

    changeHandler(e) {
        this.setState({selectedMonth: e.target.value})
    }

    render() {

        if(!this.props.pictures) {
            return(
                <div>LOADING GALLERY MANAGER</div>
            )
        }

        let arrayOfPictures;

        if(this.state.selectedMonth !== '') {
            arrayOfPictures = this.props.pictures.filter(picture => {
                return picture.picture_date.slice(0, 7) == this.state.selectedMonth
            })
        }
        else {
            arrayOfPictures = this.props.pictures
        }

        return(
            <div id='gallery-manager'>
                <h1>GALLERY MANAGER</h1>

                {this.state.selectedMonth !== '' &&
                <p>Total amount of pictures: {this.props.pictures.length}</p>}
                <p>Pictures in the selected period: {arrayOfPictures.length}</p>
                <select id='admin-shows--dropdown' onChange={(e) => this.changeHandler(e)}>
                    <option value=''>All</option>
                    <option value='2017-08'>Aug '17</option>
                    <option value='2017-09'>Sep '17</option>
                    <option value='2017-10'>Oct '17</option>
                    <option value='2017-11'>Nov '17</option>
                </select>

                <Gallery pictures={arrayOfPictures} setCurrentPicture={this.props.setCurrentPicture} />
                <GalleryEditor />
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return({
        getAllPictures: () => dispatch(getAllPictures()),
        setCurrentPicture: (currentPicture) => dispatch(setCurrentPicture(currentPicture))
    })
}

const mapStateToProps = state => {
    return {
        pictures: state.pictures && state.pictures
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryManager)
