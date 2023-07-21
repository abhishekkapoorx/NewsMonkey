import React from 'react'
import spinner from './spinner.gif'

export default function Loading() {
    return (
        <div className='text-center my-5'>
            <img src={spinner} alt="Loading" width="70px" />
        </div>
    )
}
