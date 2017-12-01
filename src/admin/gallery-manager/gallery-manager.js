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
        //on mount we retrieve all pictures from db
        this.props.getAllPictures()
    }

    changeHandler(e) {
        /*with the <select> tag we set a selected month on the local state.
        We will use this month to filter the list of pictures displayed on the
        Gallery Manager*/
        this.setState({selectedMonth: e.target.value})
    }

    render() {

        if(!this.props.pictures) {
            return(
                <div>LOADING GALLERY MANAGER</div>
            )
        }

        /*We sort the pictures of the gallery according to date. The newest comes
        first.
        */
        let sortedArrayOfPictures = this.props.pictures.sort((a, b) => {
            var c = new Date(a.picture_date)
            var d = new Date(b.picture_date)
            return d - c;
        })

        let finalArray;
        if(this.state.selectedMonth !== '') {
            /*
            if a month is selected, we filter the array of pictures to be displayed
            with the month selected.
            */
            finalArray = sortedArrayOfPictures.filter(picture => {
                return picture.picture_date.slice(0, 7) == this.state.selectedMonth
            })
        }
        else {
            /*
            if no month is selected, the array of pictures to be displayed is
            the array sorted by date.
            */
            finalArray = sortedArrayOfPictures
        }

        return(
            <div>
                <div className='gallery-manager'>
                <div className='gallery-manager--header'>


                        <div className='gallery-manager--current-selection'>
                            <p className='gallery-manager--filter-label'>Total amount of pictures: </p><p className='gallery-manager--filter-results'>{finalArray.length}</p>
                        </div>

                        {this.state.selectedMonth !== '' &&
                        <div className='gallery-manager--current-selection'>
                            <p className='gallery-manager--filter-label'>Pictures in the period selected: </p>
                            <p className='gallery-manager--filter-results'>{finalArray.length}</p>
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
                        <Gallery pictures={finalArray} setCurrentPicture={this.props.setCurrentPicture} />
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
