import React, { Component } from 'react'
import spinner from './spinner.gif'

export default class Loading extends Component {
    render() {
        return (
            <div className='text-center my-5'>
                <img src={spinner} alt="Loading" width="70px" />
            </div>
        )
    }
}
