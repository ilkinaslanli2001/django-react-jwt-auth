import React from 'react'
import '../styles/errorBlock.css'
class ErrorBlock extends React.Component
{
    render()
    {
        return(
            <div className="errorBlock">
                        <label>{this.props.error}</label>
            </div>
        )
    }
}
export default ErrorBlock