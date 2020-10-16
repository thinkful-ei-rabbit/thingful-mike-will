import React from 'react';
import './Main.css'
import {  Link  } from 'react-router-dom'


function Main(){

    return(
        <div>
    <h1 class="neon">WELCOME</h1>
      <h2>How would you like to party</h2>
      <Link to="Form" class ="req"> Send Request </Link> 
      <Link to="Vote" class ="req">Vote best choices</Link>
      <Link to="Review" class="req"> Send Review</Link>
    </div>
    )
}

export default Main;