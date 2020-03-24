import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'


import '../styles/loginAndReg.css'
import ErrorBlock from './ErrorBlock'

class Login extends React.Component
{
    state  =  {
        username:'',
        password:'' ,
        error:'',
        buttonClicked:false 
    }
     onFormSubmit = (event) =>
    {
       event.preventDefault() // preventDefault method doesn't refresh the page
      
       // Creating new JWT tokens  
       axios.post('http://127.0.0.1:8000/auth/jwt/create/',{
    
               username:this.state.username,
               password:this.state.password,
       }).then(
           response=>{
            // Saving them in localStorage of our browser
            localStorage.setItem('access',response.data.access)
            localStorage.setItem('refresh',response.data.refresh)
            this.setState({buttonClicked:true})
           }
       ).catch(
            error =>
            {
                if(error.response.status===401)
                {
                    this.setState({error:'Username or password is incorrect'})
                }
            }
       )
    
    
      
       
           
       
       
      
      
    }
    render()
    {
        
        if(localStorage.getItem('access') && this.props.location.refreshExpired===false || this.props.location.refreshExpired===undefined)
         {
             return(
                 <Redirect to={`/`}></Redirect>
             )
        }
        else{
            return(
            
                <div className="loginBlock">
                   <ErrorBlock error={this.state.error}></ErrorBlock>
                    <form onSubmit={this.onFormSubmit}>
                        <input  required
                                className="username_input"
                                onChange={(event) =>{this.setState({username:event.target.value})}} 
                                value={this.state.username} placeholder="Username">
                        </input><br></br>
                        
                        <input  required
                                className="password_input"
                                onChange={(event) =>{this.setState({password:event.target.value})}}
                                value={this.state.password}
                                placeholder="Password" 
                                type="password">
                        </input><br></br>

                        <button className="loginButton">LogIn</button><br></br>
                        <a href='/reg'>Dont't have an account?</a>
                    </form>
                </div>
            )
    }
}
  
}
export default Login
