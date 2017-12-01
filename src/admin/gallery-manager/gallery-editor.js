import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCurrentPicture, alterCurrentPicture, emptyCurrentPicture, createNewPicture, updatePicture, addGalleryPictureToState, setCurrentPicture } from '../../actions/actions';
import PictureUploader from './picture-uploader';


class GalleryEditor extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.setCurrentPictureToState = this.setCurrentPictureToState.bind(this);

    }

    componentDidMount() {
        /*
        on mount we retrieve from the db the last picture uplaoded and set it as
        'current picture'.
        */
        this.props.getCurrentPicture()
    }


    inputHandler(e) {
        //We update the state props of the picture we are editing on each key stroke.
        this.props.alterCurrentPicture(e.target.name, e.target.value)
    }

    clickHandlerEmptyForm() {
        //We clear the form by emptying the state object 'current show'
        this.props.emptyCurrentPicture()
    }

    submit() {

        const pictureInfo = {
            file_name: this.props.currentPicture.file_name || '',
            title: this.props.currentPicture.title || '',
            description: this.props.currentPicture.description || '',
            picture_date: this.props.currentPicture.picture_date || ''
        }

        if(this.props.currentPicture.id) {

            /*If the current picture already has an id (from the db) this means we
            are updating a picture, instead of creating a new one on the db*/
            pictureInfo.id = this.props.currentPicture.id

            this.props.addGalleryPictureToState(pictureInfo)

        }

    }

    setCurrentPictureToState(pictureInfo) {
        //we set the picture uplaoded as 'current picture' through the Picture Uploader
        this.props.setCurrentPicture(pictureInfo);
    }




    render() {

        if(!this.props.currentPicture) {
            return(
                <div>LOADING GALLERY EDITOR</div>
            )
        }

        let pictureUrl = 'https://s3.amazonaws.com/myjazzclubbucket/'

        return(
            <div>
                <div className='gallery-editor--wrapper'>

                <div className='gallery-editor'>

                {!this.props.currentPicture.id &&
                <div>
                    <div className='gallery-editor--fallback'>No picture selected</div>
                    <PictureUploader setCurrentPictureToState={this.setCurrentPictureToState} />
                </div>
                }


                    {this.props.currentPicture.id &&
                        <div>
                        <h1 className='gallery-editor--title'>EDITOR</h1>

                            <button className='gallery-editor--new-pic-btn' onClick={ () => this.clickHandlerEmptyForm()}>New picture</button>
                            <div className='gallery-editor--img-preview-wrapper'>
                                <img className='gallery-editor--img-preview' src={`${pictureUrl}${this.props.currentPicture.file_name}`}/>
                            </div>


                        <div className='gallery-editor--field-label-container'>
                        <p className='gallery-editor--field-label'>File name:</p>
                        <div type='text' className='gallery-editor--field-value'>{this.props.currentPicture.file_name}</div>
                        </div>

                        <div className='gallery-editor--field-label-container'>
                        <p className='gallery-editor--field-label'>Title:</p>
                        <textarea className='gallery-editor--field-value' type='text' name='title' placeholder='picture title' onChange={e => this.inputHandler(e)} value={this.props.currentPicture.title} />
                        </div>

                        <div className='gallery-editor--field-label-container-description'>
                        <p className='gallery-editor--field-label-description'>Description:</p>
                        <textarea className='gallery-editor--field-value-description' type='text' name='description' placeholder='picture description' onChange={e => this.inputHandler(e)} value={this.props.currentPicture.description}/>
                        </div>

                        <div className='gallery-editor--field-label-container'>
                        <p className='gallery-editor--field-label'>Date:</p>
                        <textarea className='gallery-editor--field-value' type='text' name='picture_date' placeholder='date' onChange={e => this.inputHandler(e)} value={this.props.currentPicture.picture_date} />
                        </div>

                        <button className='gallery-editor--new-pic-btn submit-btn' onClick={ () => this.submit() }>UPLOAD</button>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, field, value, currentPicture, pictureInfo) => {
    return({
        getCurrentPicture: () => dispatch(getCurrentPicture()),
        alterCurrentPicture: (field, value) => dispatch(alterCurrentPicture(field, value)),
        emptyCurrentPicture: (currentPicture) => dispatch(emptyCurrentPicture(currentPicture)),
        createNewPicture: (pictureInfo) => dispatch(createNewPicture(pictureInfo)),
        updatePicture: (pictureInfo) => dispatch(updatePicture(pictureInfo)),
        addGalleryPictureToState: (currentPicture) => dispatch(addGalleryPictureToState(currentPicture)),
        setCurrentPicture: (pictureInfo) => dispatch(setCurrentPicture(pictureInfo))
    })
}

const mapStateToProps = state => {
    return{
        currentPicture: state.currentPicture && state.currentPicture
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryEditor)
