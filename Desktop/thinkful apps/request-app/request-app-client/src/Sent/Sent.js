import React from 'react';
import './Sent.css'
import {  Link } from 'react-router-dom'


function Sent(){

    return(
    <div>
        <h1 class="neon">THANK YOU!</h1><br></br>
        <h1 class="neon">THE DJ HAS YOUR REQUEST!</h1> 
        <Link to="Vote" class = "req">Post Request</Link>
        <Link to="Vote" class ="req">Vote</Link>
    </div>
    )


}

export default Sent;