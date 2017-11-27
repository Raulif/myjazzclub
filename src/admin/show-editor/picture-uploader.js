import React from 'react'
import axios from 'axios'


export default class PictureUploader extends React.Component {
    constructor(props){
        super(props),
        this.state = {}
    }

    inputHandler(e) {
        this.setState({ pictureFile: e.target.files[0]})
    }

    submit() {
        let formData = new FormData();
        formData.append('file', this.state.pictureFile);

        /*
        Upload show picture to the database on the row with the ID of a show being edited
        currently.
        */

        axios.post(`/admin/upload-picture/${this.props.currentShowId}`, formData )

        .then(({data}) => {

            if(data.success) {

                const showId = this.props.currentShowId;
                const picture_name = data.picture_name;

                //update Redux state of current show with the picture name
                this.props.updateCurrentShowWithPictureName(picture_name);

                //update Redux state of general show list with the picture name
                this.props.updateStateWithPictureName(picture_name, showId);
            }
        })
        .catch(err => console.log("error on // ADMIN // PICTURE UPLOAD // SUBMIT: ", err));
    }

    render() {

        if(this.props.visible == false) {
            return null
        }
        else {
            
            return (
                <div className='picture-uploader-wrapper'>
                    <div className='picture-uploader'>
                        <label className='upload-label' htmlFor='file'>Attach a picture:</label>
                        <input className='file-field' type='file' id='file' onChange={e => this.inputHandler(e)}/>
                        <input className='picture-uploader--hidden-field' type='file'/>
                    </div>
                    <button type='submit' className='picture-uploader--upload-btn' name='button' onClick={() => this.submit()} >upload picture</button>
                </div>
            )
        }
    }
}
