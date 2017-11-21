import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getCurrentShow, setCurrentShow } from '../actions/actions';
import AdminShowListContainer from './admin-show-list-container';



class ShowEditor extends React.Component {
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentShow()
    }


    inputHandler(e) {
        this[e.target.name] = e.target.value;
        console.log(e.target.value);
    }

    clickHandler() {
        this.props.setCurrentShow({})
    }

    submit(dispatch) {

        let {
            title = '' || this.title || this.props.currentShow.title,
            main_artist = '' || this.main_artist || this.props.currentShow.main_artist,
            secondary_artist = '' || this.secondary_artist || this.props.currentShow.secondary_artist,
            line_up = '' || this.line_up || this.props.currentShow.line_up,
            genre = '' || this.genre || this.props.currentShow.genre,
            long_description = '' || this.long_description || this.props.currentShow.long_description,
            external_link = '' || this.external_link || this.props.currentShow.external_link,
            show_date = '' || this.show_date || this.props.currentShow.show_date,
            time_begin = '' || this.time_begin || this.props.currentShow.time_begin,
            time_end = '' || this.time_end || this.props.currentShow.time_end,
            price_pre = '' || this.price_pre || this.props.currentShow.price_pre,
            price_door = '' || this.price_door || this.props.currentShow.price_door,
            tag = '' || this.tag || this.props.currentShow.tag,
        } = this;

        if(!this.props.currentShow.id) {

            axios.post('/admin/new-show', {
                title,
                main_artist,
                secondary_artist,
                line_up,
                genre,
                long_description,
                external_link,
                show_date,
                time_begin,
                time_end,
                price_pre,
                price_door,
                tag,
            })

            .then( ({data}) => {
                if(data.success) {
                    let currentShow = data.newShow;
                    console.log('success on creating a new show');
                    this.props.setCurrentShow(currentShow);
                }
            })

            .catch(err => console.log('error on // ADMIN // SHOW EDITOR // QUERY POST NEW SHOW: ',err));
        }

        else {

            let id = this.props.currentShow.id;

            axios.post('/admin/update-show', {
                title,
                main_artist,
                secondary_artist,
                line_up,
                genre,
                long_description,
                external_link,
                show_date,
                time_begin,
                time_end,
                price_pre,
                price_door,
                tag,
                id
            })

            .then( ({data}) => {
                if(data.success) {
                    console.log('success on updating the show');
                    let currentShow = data.updatedShow
                    this.props.setCurrentShow(currentShow);
                }
            })

            .catch(err => console.log('error on // ADMIN // SHOW EDITOR // QUERY POST UPDATE SHOW: ',err));
        }
    }


    render() {


        if(!this.props.currentShow) {
            return (
                <div>LOADING CURRENT SHOW</div>
            )
        }
        console.log('currentShow in show editor: ', this.props.currentShow);

        return (
            <div>
                <div name='showeditor' className='show-editor--wrapper'>
                <h1>SHOW EDITOR</h1>
                    <textarea type='text' name='picture_name' placeholder='picture-name' onChange={e => this.inputHandler(e)}>{this.props.currentShow.picture_name}</textarea>
                    <textarea type='text' name='title' placeholder='show-title' onChange={e => this.inputHandler(e)}>{this.props.currentShow.title}</textarea>
                    <textarea type='text' name='main_artist' placeholder='main-artist' onChange={e => this.inputHandler(e)}>{this.props.currentShow.main_artist}</textarea>
                    <textarea type='text' name='secondary_artist' placeholder='secondary-artist' onChange={e => this.inputHandler(e)}>{this.props.currentShow.secondary_artist}</textarea>
                    <textarea type='text' name='line_up' placeholder='line-up' onChange={e => this.inputHandler(e)}>{this.props.currentShow.line_up}</textarea>
                    <textarea type='text' name='genre' placeholder='genre' onChange={e => this.inputHandler(e)}>{this.props.currentShow.genre}</textarea>
                    <textarea type='text' name='long_description' placeholder='long-description' onChange={e => this.inputHandler(e)}>{this.props.currentShow.long_description}</textarea>
                    <textarea type='text' name='external_link' placeholder='external-link' onChange={e => this.inputHandler(e)} >{this.props.currentShow.external_link}</textarea>
                    <textarea type='text' name='show_date' placeholder='show-date: YYYY-MM-DD' onChange={e => this.inputHandler(e)} >{this.props.currentShow.show_date}</textarea>
                    <textarea type='text' name='time_begin' placeholder='time_begin' onChange={e => this.inputHandler(e)} >{this.props.currentShow.time_begin}</textarea>
                    <textarea type='text' name='time_end' placeholder='time_end' onChange={e => this.inputHandler(e)} >{this.props.currentShow.time_end}</textarea>
                    <textarea type='text' name='price_pre' placeholder='price-pre' onChange={e => this.inputHandler(e)} >{this.props.currentShow.price_pre}</textarea>
                    <textarea type='text' name='price_door' placeholder='price-door' onChange={e => this.inputHandler(e)} >{this.props.currentShow.price_door}</textarea>
                    <textarea type='text' name='tag' placeholder='tag' onChange={e => this.inputHandler(e)} >{this.props.currentShow.tag}</textarea>

                    <button onClick={ () => this.submit() }>Submit!</button>
                    <button onClick={ () => this.clickHandler()}>Clear form</button>
                </div>
                <AdminShowListContainer setCurrentShow={this.props.setCurrentShow} shows={this.props.shows}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, currentShow) => {
    return({
        getCurrentShow: () => dispatch(getCurrentShow()),
        setCurrentShow: (currentShow) => dispatch(setCurrentShow(currentShow))
    })
}

const mapStateToProps = state => {
    return {
        shows: state.shows && state.shows,
        currentShow: state.currentShow && state.currentShow
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEditor)

// name="firstname" onChange={e => this.inputHandler(e)}
// <textarea type="text" name="lastname" onChange={e => this.inputHandler(e)} placeholder="last name"/>
