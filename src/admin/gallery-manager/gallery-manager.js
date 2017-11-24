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
            <div>
                <div className='gallery-manager'>
                <div className='gallery-manager--header'>


                        <div className='gallery-manager--current-selection'>
                            <p className='gallery-manager--filter-label'>Total amount of pictures: </p><p className='gallery-manager--filter-results'>{arrayOfPictures.length}</p>
                        </div>

                        {this.state.selectedMonth !== '' &&
                        <div className='gallery-manager--current-selection'>
                            <p className='gallery-manager--filter-label'>Pictures in the period selected: </p>
                            <p className='gallery-manager--filter-results'>{this.props.pictures.length}</p>
                        </div>}

                        <select className='gallery-manager--dropdown' onChange={(e) => this.changeHandler(e)}>
                            <option value=''>All</option>
                            <option value='2017-08'>Aug '17</option>
                            <option value='2017-09'>Sep '17</option>
                            <option value='2017-10'>Oct '17</option>
                            <option value='2017-11'>Nov '17</option>
                        </select>
                    </div>
                    <div className='gallery-manager--workspace'>
                        <GalleryEditor />
                        <Gallery pictures={arrayOfPictures} setCurrentPicture={this.props.setCurrentPicture} />
                    </div>
                </div>
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
