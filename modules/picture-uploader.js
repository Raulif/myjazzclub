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
        console.log('this state pictureFile: ', this.state.pictureFile);

        axios.post(`/admin/upload-picture/${this.props.currentShowId}`, formData )

        .then(({data}) => {
            console.log('data: ', data);
            if(data.success) {

                console.log('data on picture-upload: ', data);
                const showId = this.props.currentShowId;
                const picture_name = data.picture_name;
                this.props.updateCurrentShowWithPictureName(picture_name);
                this.props.updateStateWithPictureName(picture_name, showId);
            }
        })
        .catch(err => console.log("error on // ADMIN // PICTURE UPLOAD // SUBMIT: ", err));
    }

    render() {

        if(this.props.visible == false) {
            return null
        } else {
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
