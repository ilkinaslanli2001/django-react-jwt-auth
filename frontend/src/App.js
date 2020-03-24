import React from 'react';
import Routing from './Router'
import './App.css';
import Login from './components/Login'
import HomePage from './components/HomePage'


class App extends React.Component {
 
  render()
  {
   
  return(
    <div className="App">
      <Routing>
        <HomePage></HomePage>
      </Routing>
  </div>)
 
  
}
   


}

export default App