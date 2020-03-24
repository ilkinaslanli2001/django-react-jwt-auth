import React from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import '../styles/userPage.css'

class HomePage extends React.Component
{
    state = {
        
        redirect:'/',
        username:'',
        email:'',
        logoutClicked:false,
        ACCESS_TOKEN:localStorage.getItem('access'),
        REFRESH_TOKEN:localStorage.getItem('refresh'),
        refreshExpired:false
      }
     
      

      componentDidMount = async()=>
      {
          let ACCESS_TOKEN = localStorage.getItem('access')
          let REFRESH_TOKEN =localStorage.getItem('refresh')

          

          if(ACCESS_TOKEN!==null)
          {
            // refresh our access and refresh token
             axios.post('http://127.0.0.1:8000/auth/jwt/refresh/',{
                 refresh:REFRESH_TOKEN
             }).then(new_access_token =>{
                 localStorage.setItem('access',new_access_token.data.access)
                 ACCESS_TOKEN = new_access_token.data.access 

                 //after getting new tokens we receive data from our api
                 axios.get('http://127.0.0.1:8000/auth/users/me',{
                     headers:
                     {
                         Authorization:'JWT '+ACCESS_TOKEN
                     }
                 }).then(
                     user_data =>{
                         this.setState({username:user_data.data.username})
                         this.setState({email:user_data.data.email})
                     }
                 )
             }).catch(
               
               error => {
                   // if our refresh token expired

                   if(error.response.status===401)
                   {this.setState({refreshExpired:true})}
               })
            
          }
          
      }
      
       
       
        
    onLogoutButtonClick = () =>
    {
        localStorage.clear()
        this.setState({logoutClicked:true}) // Just for refresh the page
    }
    render()
    {
       
      if(!localStorage.getItem('access') || this.state.refreshExpired === true)
      {
          
          return(
              <Redirect to={{pathname:'/login',
                             refreshExpired:this.state.refreshExpired}}></Redirect>
          )
      }
      else
      {
        // If we have data but it is not downloaded return Loading block
        if(this.state.username && this.state.email)
        {
            return(
                <div className="userBlock">
                    <label username>{this.state.username}</label><br></br>
                    <label className="email">{this.state.email}</label><br></br>
                 
                    <button className="logoutButton" onClick={this.onLogoutButtonClick}>LogOut</button>
                </div>
            )
        }
        else
        {
            return (
                <div className="loadingBlock">
                  <label>Loading</label>
                </div>
            )
        }
    }
 }
    
}
export default HomePage