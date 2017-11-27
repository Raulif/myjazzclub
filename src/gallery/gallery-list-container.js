import React from 'react';
import {connect} from 'react-redux';
import GalleryList from './gallery-list';
import { getAllPictures, setCurrentPicture } from '../actions/actions';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

class GalleryListContainer extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        /*on mount we retrieve list of gallery pictures from db and they are
        set to the Redux state object*/
        this.props.getAllPictures()
    }

    render() {
        if(!this.props.pictures) {
            return(
                <div>LOADING GALLERY</div>
            )
        }

        return(
            <div className='gallery-page-container'>
            <Navbar/>

                <div className='gallery-page--title-wrapper'>
                    <h1 className='gallery-page--title'>GALLERY</h1>
                </div>
                <GalleryList pictures={this.props.pictures}/>
                <Footer />

            </div>


        )


    }




}

const mapDispatchToProps = dispatch => {
    return({
        getAllPictures: () => dispatch(getAllPictures())
    })
}

const mapStateToProps = state => {
    return{
        pictures: state.pictures && state.pictures
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryListContainer)
