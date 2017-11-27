import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { updateStateWithPictureName,updateCurrentShowWithPictureName, getCurrentShow, setCurrentShow, alterCurrentShow, emptyCurrentShow, updateShow, updateStateWithShow } from '../../actions/actions';
import {postNewShow} from '../../utils/ajax'
import AdminShowListContainer from './admin-show-list-container';
import PictureUploader from './picture-uploader';

class ShowEditor extends React.Component {
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    componentDidMount() {
        /*on mount we retrieve the show to be displayed as editable*/
        this.props.getCurrentShow()
    }

    inputHandler(e) {
        /*
        the content of the input fields is sent to update Redux state on each
        key stroke. It becomes the content of the 'current show' object.
        */
        this.props.alterCurrentShow(e.target.name, e.target.value)
    }

    clickHandlerEmptyForm(currentShow) {
        /*on click we clear the 'current show' of the Redux state and remove the
        ID field, allowing the creation of a new db entry, next time submit is
        clicked.*/
        this.props.emptyCurrentShow(currentShow)
    }

    submit() {

        /*
        we store all the data of the input fields in an object called showInfo,
        as stored in the 'current show' object of Redux state. If one of these
        fields is empty (no input was entered), the property will be an empty string.
        This way we make sure we always send the same amount of properties to
        update the db.
        */
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

        /*
        If 'current show' on Redux state has no ID property, it means we are
        creating a new show.
        */
        if(!this.props.currentShow.id) {
            delete showInfo.picture_name
            postNewShow(showInfo)
        }

        else {
            /*
            if 'current show' has ID, it means we are updating an existing show.
            we update the db as well as the Redux state array of shows.
            */
            showInfo.id = this.props.currentShow.id;
            this.props.updateShow(showInfo)
            this.props.updateStateWithShow(showInfo)
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
                <div className='show-editor--main-wrapper'>

                    <div name='showeditor' className='show-editor--wrapper'>

                        <h1 className='show-editor--main-title'>SHOW EDITOR</h1>
                        <button className='show-editor--clear-btn' onClick={ (e) => this.clickHandlerEmptyForm(e)}>New show</button>

                        <div className='show-editor--textarea-wrapper'>


                        <p className='show-editor--field-label'>Show Title</p>
                        <textarea type='text' name='title' className='show-editor--textarea title' placeholder='show-title' onChange={e => this.inputHandler(e)} value={this.props.currentShow.title}/>

                        <p className='show-editor--field-label p-main-artist'>Main Artist</p>
                        <p className='show-editor--field-label p-secondary-artist'>Secondary Artist</p>

                        <textarea type='text' name='main_artist' className='show-editor--textarea main-artist' placeholder='main artist' onChange={e => this.inputHandler(e)} value={this.props.currentShow.main_artist}/>

                        <textarea type='text' name='secondary_artist' className='show-editor--textarea secondary-artist' placeholder='secondary artist' onChange={e => this.inputHandler(e)} value={this.props.currentShow.secondary_artist}/>

                        <p className='show-editor--field-label'>Line Up</p>
                        <textarea type='text' name='line_up' className='show-editor--textarea line-up' placeholder='line up' onChange={e => this.inputHandler(e)} value={this.props.currentShow.line_up}/>

                        <p className='show-editor--field-label'> Show description</p>
                        <textarea type='text' name='long_description' className='show-editor--textarea description' placeholder='show description' onChange={e => this.inputHandler(e)} value={this.props.currentShow.long_description}/>


                        <p className='show-editor--field-label p-link'>External Link</p>
                        <p className='show-editor--field-label p-genre'>Genre</p>

                        <textarea type='text' name='external_link' className='show-editor--textarea external-link' placeholder='external link' onChange={e => this.inputHandler(e)} value={this.props.currentShow.external_link}/>


                        <textarea type='text' name='genre' className='show-editor--textarea genre' placeholder='genre' onChange={e => this.inputHandler(e)} value={this.props.currentShow.genre}/>

                        <p className='show-editor--field-label p-date'>Show Date</p>
                        <p className='show-editor--field-label p-begin'>Time Begin</p>
                        <p className='show-editor--field-label p-end'>Time End</p>

                        <textarea type='text' name='show_date' className='show-editor--textarea date' placeholder='YYYY-MM-DD' onChange={e => this.inputHandler(e)} value={this.props.currentShow.show_date}/>

                        <textarea type='text' name='time_begin' className='show-editor--textarea time-begin' placeholder='time begin' onChange={e => this.inputHandler(e)} value={this.props.currentShow.time_begin}/>

                        <textarea type='text' name='time_end' className='show-editor--textarea time-end' placeholder='time end' onChange={e => this.inputHandler(e)} value={this.props.currentShow.time_end}/>

                        <p className='show-editor--field-label p-pre'>Price pre sale</p>

                        <p className='show-editor--field-label p-img'>Show picture</p>

                        <textarea type='text' name='price_pre' className='show-editor--textarea price-pre' placeholder='price pre' onChange={e => this.inputHandler(e)} value={this.props.currentShow.price_pre}/>

                        <div className='show-editor--img-wrapper'>
                            <img className='show-editor--img' src={`${pictureUrl}${this.props.currentShow.picture_name}`} />
                        </div>

                        <p className='show-editor--field-label p-door'>Price at door</p>
                        <textarea type='text' name='price_door' className='show-editor--textarea price-door' placeholder='price door' onChange={e => this.inputHandler(e)} value={this.props.currentShow.price_door}/>

                        <p className='show-editor--field-label p-tag'>Tag</p>
                        <textarea type='text' name='tag' className='show-editor--textarea tag' placeholder='tag' onChange={e => this.inputHandler(e)} value={this.props.currentShow.tag}/>



                        <PictureUploader className='show-editor--picture-uploader' updateCurrentShowWithPictureName={this.props.updateCurrentShowWithPictureName} updateStateWithPictureName={this.props.updateStateWithPictureName} currentShowId={this.props.currentShow.id}/>
                        <button className='show-editor--submit-btn' onClick={ () => this.submit() }>SUBMIT</button>
                    </div>
                </div>
                <AdminShowListContainer currentShow={this.props.currentShow} setCurrentShow={this.props.setCurrentShow} shows={this.props.shows}/>
                </div>
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
        updateShow: (showInfo) => dispatch(updateShow(showInfo)),
        updateStateWithShow: (showInfo) => dispatch(updateStateWithShow(showInfo)),
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
