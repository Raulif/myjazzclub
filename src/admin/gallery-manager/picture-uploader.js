import React from 'react';
import axios from 'axios';


export default class PictureUploader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    inputHandler(e) {
        this.setState({pictureFile: e.target.files[0]})
    }

    uploadPicture() {
        let formData = new FormData();
        formData.append('file', this.state.pictureFile);
        console.log('this state pictureFile: ', this.state.pictureFile);

        axios.post(`/admin/gallery/upload-new-picture`, formData)

        .then(({data}) => {
            if(data.success) {

                const newPicture = {
                    file_name: data.file_name,
                    id: data.id
                }

                this.props.setCurrentPictureToState(newPicture)
            }
        })

    }

    render() {

        return (
            <div className='gallery-picture-uploader-wrapper'>
                <label className='upload-label' htmlFor='file'>Choose a picture:</label>
                <input className='file-field' type='file' id='file' onChange={e => this.inputHandler(e)}/>
                <input className='picture-uploader--hidden-field' type='file'/>
                <button type='submit' className='gallery-picture-uploader--upload-btn' id='upload-button' name='button' onClick={() => this.uploadPicture()} >PREVIEW</button>
            </div>
        )

    }
}
