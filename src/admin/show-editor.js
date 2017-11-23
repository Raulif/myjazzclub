import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { updateStateWithPictureName,updateCurrentShowWithPictureName, getCurrentShow, setCurrentShow, alterCurrentShow, emptyCurrentShow, createNewShow, updateShow, addShowToProps } from '../actions/actions';
import AdminShowListContainer from './admin-show-list-container';
import PictureUploader from '../../modules/picture-uploader';

class ShowEditor extends React.Component {
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentShow()
    }

    inputHandler(e) {
        this.props.alterCurrentShow(e.target.name, e.target.value)
    }

    clickHandlerEmptyForm(currentShow) {
        this.props.emptyCurrentShow(currentShow)
    }

    submit() {

        const showInfo = {
            title: this.props.currentShow.title || '',
            main_artist: this.props.currentShow.main_artist || '',
            secondary_artist: this.props.currentShow.secondary_artist || '',
            line_up: this.props.currentShow.line_up || '',
            genre: this.props.currentShow.genre || '',
            long_description: this.props.currentShow.long_description || '',
            external_link: this.props.currentShow.external_link || '',
            show_date: this.props.currentShow.show_date || '',
            time_begin: this.props.currentShow.time_begin || '',
            time_end: this.props.currentShow.time_end || '',
            price_pre: this.props.currentShow.price_pre || '',
            price_door: this.props.currentShow.price_door || '',
            tag: this.props.currentShow.tag || '',
            picture_name: this.props.currentShow.picture_name || ''
        }

        if(!this.props.currentShow.id) {
            console.log('we are posting NEW show');
            delete showInfo.picture_name
            this.props.createNewShow(showInfo);
            this.props.addShowToProps(this.props.currentShow)
        }

        else {
            console.log('we are UPDATING show');
            showInfo.id = this.props.currentShow.id;
            this.props.updateShow(showInfo)
        }

    }


    render() {

        if(!this.props.currentShow) {
            return (
                <div>LOADING CURRENT SHOW</div>
            )
        }

        let pictureUrl = 'https://s3.amazonaws.com/myjazzclubbucket/'

        return (
            <div>

                <h1>SHOW EDITOR</h1>

                <button onClick={ (e) => this.clickHandlerEmptyForm(e)}>Clear form</button>
                <div name='showeditor' className='show-editor--wrapper'>
                    <p className='show-editor--field-label'>Show Title</p>
                    <textarea type='text' name='title' placeholder='show-title' onChange={e => this.inputHandler(e)} value={this.props.currentShow.title}/>
                    <p className='show-editor--field-label'>Main Artist</p>
                    <textarea type='text' name='main_artist' placeholder='main-artist' onChange={e => this.inputHandler(e)} value={this.props.currentShow.main_artist}/>
                    <p className='show-editor--field-label'>Secondary Artist</p>
                    <textarea type='text' name='secondary_artist' placeholder='secondary-artist' onChange={e => this.inputHandler(e)} value={this.props.currentShow.secondary_artist}/>
                    <p className='show-editor--field-label'>Line Up</p>
                    <textarea type='text' name='line_up' placeholder='line-up' onChange={e => this.inputHandler(e)} value={this.props.currentShow.line_up}/>
                    <p className='show-editor--field-label'>Genre</p>
                    <textarea type='text' name='genre' placeholder='genre' onChange={e => this.inputHandler(e)} value={this.props.currentShow.genre}/>
                    <p className='show-editor--field-label'>Long Description</p>
                    <textarea type='text' name='long_description' placeholder='long-description' onChange={e => this.inputHandler(e)} value={this.props.currentShow.long_description}/>
                    <p className='show-editor--field-label'>External Link</p>
                    <textarea type='text' name='external_link' placeholder='external-link' onChange={e => this.inputHandler(e)} value={this.props.currentShow.external_link}/>
                    <p className='show-editor--field-label'>Show Date</p>
                    <textarea type='text' name='show_date' placeholder='show-date: YYYY-MM-DD' onChange={e => this.inputHandler(e)} value={this.props.currentShow.show_date}/>
                    <p className='show-editor--field-label'>Time Begin</p>
                    <textarea type='text' name='time_begin' placeholder='time_begin' onChange={e => this.inputHandler(e)} value={this.props.currentShow.time_begin}/>
                    <p className='show-editor--field-label'>Time End</p>
                    <textarea type='text' name='time_end' placeholder='time_end' onChange={e => this.inputHandler(e)} value={this.props.currentShow.time_end}/>
                    <p className='show-editor--field-label'>Price Pre</p>
                    <textarea type='text' name='price_pre' placeholder='price-pre' onChange={e => this.inputHandler(e)} value={this.props.currentShow.price_pre}/>
                    <p className='show-editor--field-label'>Price Door</p>
                    <textarea type='text' name='price_door' placeholder='price-door' onChange={e => this.inputHandler(e)} value={this.props.currentShow.price_door}/>
                    <p className='show-editor--field-label'>Tag</p>
                    <textarea type='text' name='tag' placeholder='tag' onChange={e => this.inputHandler(e)} value={this.props.currentShow.tag}/>


                    <button onClick={ () => this.submit() }>Submit!</button>
                    <PictureUploader updateCurrentShowWithPictureName={this.props.updateCurrentShowWithPictureName} updateStateWithPictureName={this.props.updateStateWithPictureName} currentShowId={this.props.currentShow.id}/>
                    <div className='show-editor--img-wrapper'>
                        <img className='show-editor--img' src={`${pictureUrl}${this.props.currentShow.picture_name}`}/>
                    </div>
                </div>
                <AdminShowListContainer setCurrentShow={this.props.setCurrentShow} shows={this.props.shows}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, currentShow, field, value, showInfo) => {
    return({
        getCurrentShow: () => dispatch(getCurrentShow()),
        setCurrentShow: (currentShow) => dispatch(setCurrentShow(currentShow)),
        emptyCurrentShow: (currentShow) => dispatch(emptyCurrentShow(currentShow)),
        alterCurrentShow: (field, value) => dispatch(alterCurrentShow(field, value)),
        createNewShow: (showInfo) => dispatch(createNewShow(showInfo)),
        updateShow: (showInfo) => dispatch(updateShow(showInfo)),
        addShowToProps: (currentShow) => dispatch(addShowToProps(currentShow)),
        updateCurrentShowWithPictureName: (picture_name) => dispatch(updateCurrentShowWithPictureName(picture_name)),
        updateStateWithPictureName: (picture_name, showId) => dispatch(updateStateWithPictureName(picture_name, showId))
    })
}

const mapStateToProps = state => {
    return {
        shows: state.shows && state.shows,
        currentShow: state.currentShow && state.currentShow
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEditor)
