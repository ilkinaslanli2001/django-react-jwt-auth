import React from 'react'
import {Link} from 'react-router-dom'
import { Redirect} from 'react-router-dom'
import axios from 'axios'
import ErrorBlock from './ErrorBlock'
import '../styles/loginAndReg.css'
class Registration extends React.Component
{
    state = {
        username:'',
        password:'',
        email:'',
        error:'',
        successReg:false
    }


    onRegButtonClicked = (event) =>
    {
        event.preventDefault()
        axios.post('http://127.0.0.1:8000/auth/users/',{
            username:this.state.username,
            password:this.state.password,
            email:this.state.email
        }).then(
            this.setState({successReg:true})
        ).catch(
            error=>{
                if(error.response.data.username)
                {
                    this.setState({error:'This username is already exists'})
                }
            }
        )
    }
    render()
    {
        // If we have access item in our local storage this means that we already 
        // have a user and the copmonent should redirect us to the main page

        if(localStorage.getItem('access'))
        {
            return <Redirect to={`/`}></Redirect>
        }

        if(this.state.successReg)
        {
            return(
                <Redirect to='/login'></Redirect>
            )
        }
        else
        {
        return(
            <div className="regBlock">
                <ErrorBlock error={this.state.error}></ErrorBlock>
                <form onSubmit={this.onRegButtonClicked}>
                    <input 
                        className="username_input"
                        onChange={event=>{this.setState({username:event.target.value})}} 
                        value={this.state.username} 
                        placeholder="username">
                        
                        </input><br></br>
                    <input 
                        className="password_input"
                        onChange={event=>{this.setState({password:event.target.value})}} 
                        value={this.state.password}
                        placeholder="password" 
                        type = "password">
                        
                        </input><br></br>
                    <input 
                        className="email_input"
                        onChange={event=>{this.setState({email:event.target.value})}}
                        value={this.state.email} 
                        placeholder="email" 
                        type = "email">

                        </input><br></br>
                    <button className="regButton">Register User</button>
                </form>
                <Link exact to="/login">Already have an account?</Link>
            </div>

        )
    }
    }
}
export default Registration