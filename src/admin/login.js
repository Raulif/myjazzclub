import React from 'react';
import axios from 'axios';

export default class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: false}
    }

    inputHandler(e) {
        this[e.target.name] = e.target.value;
    }

    submit() {
        if(!this.username || !this.password) {
            /*'error' in local state is set to true if the user forgets to enter
            either user-name or password*/
            this.setState({error: true})
        }
        axios.post('/auth/login', {
            //we send the user input for basic authentification.
            username: this.username,
            password: this.password
        })

        .then(({data}) => {

            if (data.success) {
                //if login has success the user is sent to the Admin Dashboard.
                location.replace('/admin')
            }

            else {
                this.setState({
                    error: true
                })
            }
        })
        .catch(err => console.log("error on // SRC // ADMIN // ADMIN LOGIN // ADMIN LOGIN",err));
    }

    render() {

        return (
            <div className="admin-login-wrapper">
                {this.state.error && <div className="warning">Uh oh, that FAILED</div> }
                <h1 className='login-page-greeting'>THE JAZZ CLUB</h1>

                <div className='login-picture'>
                    <img src='../public/homeimg.jpg'/>
                </div>
                <div className='input-container'>
                    <h1 className='login-title'>LOGIN TO ACCESS THE ADMIN DASHBOARD</h1>
                    <div className='input-form'>
                    <input className='login-input-field' type="text" name="username" onChange={e => this.inputHandler(e)} placeholder="username - use: 'admin'"/>
                    <input className='login-input-field' type="password" name="password" onChange={e => this.inputHandler(e)} placeholder="password - use: '1234'"/>
                    <button className='login-form-btn' onClick={ () => this.submit() }>LOGIN</button>
                    </div>
                </div>
            </div>
        )
    }
}
