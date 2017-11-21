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
            this.setState({error: true})
        }
        axios.post('/auth/login', {
            username: this.username,
            password: this.password
        })

        .then(({data}) => {
            if (data.success) {
                console.log('auth/login/query came with: ', data.success);
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
                <input type="text" name="username" onChange={e => this.inputHandler(e)} placeholder="username: 'admin'"/>
                <input type="password" name="password" onChange={e => this.inputHandler(e)} placeholder="password: '1234'"/>
                <button onClick={ () => this.submit() }>Login!</button>
            </div>
        )
    }
}
